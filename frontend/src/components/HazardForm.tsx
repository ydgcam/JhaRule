import { useState } from 'react';
import { Hazard } from '../types/hazard';
import * as Yup from 'yup';
import { createHazard, updateHazard } from '../services/hazard-service';
import { StepFE } from '../types/step';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Stack, TextField, Typography } from '@mui/material';
import { EditButton, DoButton, CancelButton, LoadingWheel } from './Inputs';
import { Formik, Form} from 'formik';

const FormValidator = Yup.object().shape({
  title: Yup.string()
    .required('A title is required')
    .min(2, 'title must be at least 2 characters')
    .max(255, 'title cannot exceed 255 characters'),
  risk: Yup.string()
    .required('A risk is required')
    .min(2, 'risk must be at least 2 characters')
    .max(500, 'risk cannot exceed 500 characters'),
  control: Yup.string()
    .required('A control is required')
    .min(2, 'control must be at least 2 characters')
    .max(500, 'control cannot exceed 500 characters'),
}); 

interface HazardFormProps { step: StepFE, refreshCallbackFn: () => unknown, hazard?: Hazard };

const HazardForm = (props: HazardFormProps) => {

  const [modalOpen, setModalOpen] = useState(false);

  const toggleDialog = () => setModalOpen(!modalOpen);

  const submit = (formInfo: any) => { return props.hazard ? edit(formInfo) : create(formInfo); };
  const create = (data: any) => { return createHazard(data, props.refreshCallbackFn); }; 
  const edit = (data: any) => { return updateHazard(data, props.refreshCallbackFn); }; 

  const hazVals = props.hazard ? 
  { 
    uid: props.hazard.uid, step_id: props.hazard.step_id, title: props.hazard.title, 
    risk: props.hazard.risk, control: props.hazard.control 
  } 
  : 
  { 
    step_id: props.step.uid, title: '', risk: '', control: '' 
  };
  
  const renderButton = (): JSX.Element => {
    return props.hazard ?
      <EditButton text='this hazard' fn={toggleDialog} /> :
      <DoButton text='Add Hazard' fn={toggleDialog} />;
  };

  const renderTitle = (): string => { return (props.hazard ? 'Edit ' : 'Create ') + 'Hazard'; };

  return (
    <>
      {renderButton()}
      <Dialog open={modalOpen} onClose={toggleDialog} maxWidth='sm' fullWidth>
        <DialogTitle>
          {<div><Typography variant='h4' align='center'>{renderTitle()}</Typography></div>}
        </DialogTitle>
        <Formik
          initialValues={hazVals}
          validationSchema={FormValidator}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
            submit(values).then((res) => { setSubmitting(false); setModalOpen(false); })
          }}
        >
          {({
            values,
            touched,
            errors,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
            isValid
          }) => (
            <Form onSubmit={handleSubmit}>
              <DialogContent>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField fullWidth required name="title" label="Title" variant="filled" color="primary"
                      value={values.title} onChange={handleChange} onBlur={handleBlur}
                      helperText={(errors.title && touched.title) && errors.title} FormHelperTextProps={{ error: true }} 
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth multiline required name="risk" label="Risk" variant="filled" color="primary"
                      value={values.risk} onChange={handleChange} onBlur={handleBlur}
                      helperText={(errors.risk && touched.risk) && errors.risk} FormHelperTextProps={{ error: true }} 
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth multiline required name="control" label="Control" variant="filled" color="primary"
                      value={values.control} onChange={handleChange} onBlur={handleBlur}
                      helperText={(errors.control && touched.control) && errors.control} FormHelperTextProps={{ error: true }} 
                    />
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                  <Grid item xs={12} paddingLeft={10} paddingBottom={2}>
                    <Stack direction="row" justifyContent="center" spacing={4}>
                      <Button disabled={!isValid || isSubmitting} type='submit' variant="contained">
                        <Typography variant='button'>Submit</Typography>
                      </Button>
                      <CancelButton isSubmitting={isSubmitting} fn={toggleDialog}/>
                      <LoadingWheel show={isSubmitting}/>
                    </Stack>
                  </Grid>
                </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </>
  );
};

export default HazardForm;