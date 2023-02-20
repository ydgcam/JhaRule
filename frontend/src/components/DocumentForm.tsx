import { Grid, TextField, Stack, Button, Typography, Autocomplete, Chip, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useState } from "react";
import { JhaFE, NewJhaData } from "../types/jha";
import { DoButton, EditButton } from "./Inputs";
import { StringFunctions } from "../types/utils";
import * as Yup from 'yup';
import { DatePicker } from "@mui/x-date-pickers";
import { Form, Formik } from "formik";
import { updateJha, createJha } from "../services/jha-service";
import dayjs, { Dayjs }  from "dayjs";
import { LoadingWheel } from "./Inputs";
import { CancelButton } from "./Inputs";

const FormValidator = Yup.object().shape({
  title: Yup.string()
    .required('A title is required')
    .min(2, 'title must be at least 2 characters')
    .max(255, 'title cannot exceed 255 characters'),
  company: Yup.string()
    .required('A company is required')
    .min(2, 'company must be at least 2 characters')
    .max(20, 'company cannot exceed 100 characters'),
  activity: Yup.string()
    .required('An activity is requried')
    .min(2, 'activity must be at least 2 characters')
    .max(20, 'activity cannot exceed 255 characters'),
  author: Yup.string()
    .required('An author is required')
    .max(70, "author cannot exceed 70 characters")
    .test('Valid Name', 'a first and last name must be entered', StringFunctions.isValidName),
  date_reported: Yup.date()
    .required('a date recorded is required'),
}); 

interface DocumentFormProps {
  jha?: JhaFE;   
  refreshCallbackFn: () => void;
}

const DocumentForm = (props: DocumentFormProps): JSX.Element => {

  const [modalOpen, setModalOpen] = useState(false);
  const [date, setDate] = useState<Dayjs | null>(dayjs(props.jha ? props.jha.date_reported : new Date()));

  const toggleDialog = () => setModalOpen(!modalOpen);

  const submit = (formInfo: any) => { return props.jha ? edit(formInfo) : create(formInfo); };
  const create = (data: any) => { return createJha(data, props.refreshCallbackFn); }; 
  const edit = (data: any) => { return updateJha(data, props.refreshCallbackFn); }; 
  
  const jhaValues = props.jha ? 
  {
    uid: props.jha.uid,
    title: props.jha.title,
    company: props.jha.company, 
    department: props.jha.department,
    activity: props.jha.activity,
    author: props.jha.author, 
    supervisor: props.jha.supervisor,
    date_reported: props.jha.date_reported,
    required_training: props.jha.required_training, 
    required_ppe: props.jha.required_ppe, 
    signatures: props.jha.signatures,
  }
  :
  {
    title: '',
    company: '', 
    department: '',
    activity: '',
    author: '', 
    supervisor: '',
    date_reported: new Date(),
    required_training: [], 
    required_ppe: [], 
    signatures: [],
  } as NewJhaData

  const renderButton = (): JSX.Element => {
    return props.jha ?
      <EditButton text='this document' fn={toggleDialog} /> :
      <DoButton text='Create New Document' fn={toggleDialog} />;
  };

  const renderTitle = (): string => { return (props.jha ? 'Edit ' : 'Create ') + 'Job Hazard Analysis'; };

  return (
    <>
      {renderButton()}
      <Dialog open={modalOpen} onClose={toggleDialog} maxWidth='md' fullWidth>
        <DialogTitle>
          {<div><Typography variant='h4' align='center'>{renderTitle()}</Typography></div>}
        </DialogTitle>
        <Formik
            initialValues={jhaValues}
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
                    <Grid item xs={6}>
                      <TextField fullWidth required name="title" label="Title" variant="filled" color="primary"
                          value={values.title} onChange={handleChange} onBlur={handleBlur}
                          helperText={(errors.title && touched.title) && errors.title} FormHelperTextProps={{ error: true }} />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField fullWidth required name="author" label="Author" variant="filled" color="primary"
                          value={values.author} onChange={handleChange} onBlur={handleBlur}
                          helperText={(errors.author && touched.author) && errors.author} FormHelperTextProps={{ error: true }} />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField fullWidth required name="company" label="Company" variant="filled" color="primary"
                          value={values.company} onChange={handleChange} onBlur={handleBlur}
                          helperText={(errors.company && touched.company) && errors.company} FormHelperTextProps={{ error: true }} />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField fullWidth name="department" label="Department" variant="filled" color="primary"
                          value={values.department} onChange={handleChange} onBlur={handleBlur}
                          helperText={(errors.department && touched.department) && errors.department} FormHelperTextProps={{ error: true }} />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField required fullWidth name="activity" label="Activity" variant="filled" color="primary"
                          value={values.activity} onChange={handleChange} onBlur={handleBlur}
                          helperText={(errors.activity && touched.activity) && errors.activity} FormHelperTextProps={{ error: true }} />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField fullWidth name="supervisor" label="Supervisor" variant="filled" color="primary"
                          value={values.supervisor} onChange={handleChange} onBlur={handleBlur}
                          helperText={(errors.supervisor && touched.supervisor) && errors.supervisor} FormHelperTextProps={{ error: true }} />
                    </Grid>
                    <Grid item xs={6}>
                      <DatePicker openTo="day" value={date} onChange={(newValue) => { setDate(newValue); }} 
                        renderInput={(params) => <TextField {...params} required variant="filled" color='primary'/>}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Autocomplete multiple defaultValue={values.signatures} id="signatures" options={values.signatures} freeSolo onChange={(e, val) => values.signatures = val} getOptionLabel={(option) => option} 
                        renderInput={(params) => (<TextField {...params} variant="filled" label="Signatures" placeholder="Signatures"/>)}
                        renderTags={(value: readonly string[], getTagProps) =>
                          value.map((option: string, index: number) => (
                            <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                          ))
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Autocomplete multiple defaultValue={values.required_ppe} id="ppe" options={values.required_ppe} freeSolo onChange={(e, val) => values.required_ppe = val} getOptionLabel={(option) => option} 
                        renderInput={(params) => (<TextField {...params} variant="filled" label="Protective Equipment" placeholder="Equipment"/>)}
                        renderTags={(value: readonly string[], getTagProps) =>
                          value.map((option: string, index: number) => (
                            <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                          ))
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Autocomplete defaultValue={values.required_training} multiple id="training" options={values.required_training} freeSolo onChange={(e, val) => values.required_training = val} getOptionLabel={(option) => option} 
                        renderInput={(params) => (<TextField {...params} variant="filled" label="Training Required" placeholder="Training"/>)}
                        renderTags={(value: readonly string[], getTagProps) =>
                          value.map((option: string, index: number) => (
                            <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                          ))
                        }
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
}
export default DocumentForm;