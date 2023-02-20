import { useState } from 'react';
import * as Yup from 'yup';
import { createStep, updateStep } from '../services/step-service';
import { StepFE } from '../types/step';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Stack, TextField, Typography } from '@mui/material';
import { EditButton, DoButton, CancelButton, LoadingWheel } from './Inputs';
import { Formik, Form } from 'formik';
import { JhaFE } from '../types/jha';
import { PhotoCamera } from '@mui/icons-material';

const FormValidator = Yup.object().shape({
  title: Yup.string()
    .required('A title is required')
    .min(2, 'title must be at least 2 characters')
    .max(255, 'title cannot exceed 255 characters'),
  step_num: Yup.number()
    .required('Step number is required')
    .min(1, 'Step number must be a positive number')
    .max(25, 'Maximum amount of steps is 25'),
}); 

interface StepFormProps { jha: JhaFE, refreshCallbackFn: () => unknown, step?: StepFE};

const StepForm = (props: StepFormProps) => {

  const [modalOpen, setModalOpen] = useState(false);
  const [photo, setPhoto] = useState<File | string>(props.step?.photo || '');
  const toggleDialog = () => setModalOpen(!modalOpen);

  const submit = (formInfo: any, photo: File | string) => { return props.step ? edit(formInfo, photo) : create(formInfo, photo); };
  const create = (data: any, photo: File | string) => { return createStep(data, photo, props.refreshCallbackFn); }; 
  const edit = (data: any, photo: File | string) => { return updateStep(data, photo, props.refreshCallbackFn); }; 

  const stepVals = props.step ? 
  { 
    uid: props.step.uid, jha_id: props.jha.uid, title: props.step.title, 
    step_num: props.step.step_num, description: props.step.description || '',
  } 
  : 
  { 
    jha_id: props.jha.uid, title: '', step_num: props.jha.steps.length + 1, description: ''
  };
  
  const renderButton = (): JSX.Element => {
    return props.step ?
      <EditButton text='this step' fn={toggleDialog} /> :
      <DoButton text='Add Step' fn={toggleDialog} />;
  };

  const renderTitle = (): string => { return (props.step ? 'Edit ' : 'Create ') + 'Step'; };

  return (
    <>
      {renderButton()}
      <Dialog open={modalOpen} onClose={toggleDialog} maxWidth='sm'>
        <DialogTitle>
          {<div><Typography variant='h4' align='center'>{renderTitle()}</Typography></div>}
        </DialogTitle>
        <Formik
          initialValues={stepVals}
          validationSchema={FormValidator}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
            submit(values, photo).then((res) => { setSubmitting(false); setModalOpen(false); })
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
                  <Grid item xs={6}>
                    <TextField fullWidth required name="title" label="Title" variant="filled" color="primary"
                      value={values.title} onChange={handleChange} onBlur={handleBlur}
                      helperText={(errors.title && touched.title) && errors.title} FormHelperTextProps={{ error: true }} 
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField fullWidth type='number' required name="step_num" label="Step Number" variant="filled" color="primary"
                      value={values.step_num} onChange={handleChange} onBlur={handleBlur} InputLabelProps={{shrink: true}}
                      InputProps={{ inputProps: { min: 1, max: 25 } }}
                      helperText={(errors.step_num && touched.step_num) && errors.step_num} FormHelperTextProps={{ error: true }} 
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth multiline name="description" label="Description" variant="filled" color="primary"
                      value={values.description} onChange={handleChange} onBlur={handleBlur}
                      helperText={(errors.description && touched.description) && errors.description} FormHelperTextProps={{ error: true }} 
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <IconButton color="primary" aria-label="upload picture" component="label">
                      <input id="photo" name="photo" type="file" accept="image/*" 
                        onChange={(event) => { 
                          if (event.currentTarget.files) 
                            setPhoto(event.currentTarget.files[0]); 
                        }}
                      />
                      <PhotoCamera />
                    </IconButton>
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

export default StepForm;