import { Formik } from "formik";
import { JobHazardDocument } from "../types/jha";
import * as Yup from 'yup';
import { StringFunctions } from "../types/utils";
import { useState } from "react";
import { DoButton, EditButton } from "./Inputs";
import { Autocomplete, Button, Chip, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Stack, TextField, TextFieldProps, Typography } from "@mui/material";
import { DatePicker } from "@mui/lab";
import { v4 as uuidv4 } from 'uuid';
import { createJobHazardDocument, updateJobHazardDocument } from "../services/jha-service";

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
  supervisor: Yup.string()
    .test('Valid Name', 'a first and last name must be entered', function (item) {
      if (item && item !== '') {
        return StringFunctions.isValidName(item);
      }
      return true;
    }
  ),
  dateReported: Yup.date()
    .required('a date recorded is required'),
}); 

interface DocumentDataEditProps {
  jha?: JobHazardDocument;   
  refreshCallBackFn: () => void;
}

const DocumentDataForm = (props: DocumentDataEditProps): JSX.Element => {

  const [modalOpen, setModalOpen] = useState(false);
  const [submitErr, setSubmitErr] = useState('');

  const toggleDialog = () => setModalOpen(!modalOpen);
  const submit = (formInfo: any) => { props.jha ? edit(formInfo) : create(formInfo); };
  const create = (data: any) => { createJobHazardDocument(data).then(res => props.refreshCallBackFn()); };
  const edit = (newData: any) => { updateJobHazardDocument(newData).then(res => props.refreshCallBackFn() ); };
  
  const jhaValues = props.jha ? 
  {
    uid: props.jha.uid,
    title: props.jha.title,
    company: props.jha.company, 
    department: props.jha.department,
    activity: props.jha.activity,
    author: props.jha.author, 
    supervisor: props.jha.supervisor,
    dateReported: props.jha.dateReported,
    requiredTraining: props.jha.requiredTraining, 
    requiredPpe: props.jha.requiredPpe, 
    signatures: props.jha.signatures,
  }
  :
  {
    uid: uuidv4(),
    title: '',
    company: '', 
    department: 'N/A',
    activity: '',
    author: '', 
    supervisor: 'N/A',
    dateReported: new Date(),
    requiredTraining: [], 
    requiredPpe: [], 
    signatures: [],
  }

  const renderButton = (): JSX.Element => {
    return props.jha ?
      <EditButton text='this document' fn={toggleDialog} /> :
      <DoButton text='Create New Document' fn={toggleDialog} />;
  };

  const renderErrorMessage = (): JSX.Element => { return <Typography color='error'>{submitErr}</Typography>; };
  const renderTitle = (): string => { return (props.jha ? 'Edit ' : 'Create ') + 'Document'; };

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
              setSubmitErr('');
              setSubmitting(true);
              submit(values);
              setSubmitting(false);
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
              <form onSubmit={handleSubmit}>
                <DialogContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField required name="title" label="Title" variant="filled" color="primary"
                          value={values.title} onChange={handleChange} onBlur={handleBlur}
                          helperText={(errors.title && touched.title) && errors.title} FormHelperTextProps={{ error: true }} />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField required name="author" label="Author" variant="filled" color="primary"
                          value={values.author} onChange={handleChange} onBlur={handleBlur}
                          helperText={(errors.author && touched.author) && errors.author} FormHelperTextProps={{ error: true }} />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField required name="company" label="Company" variant="filled" color="primary"
                          value={values.company} onChange={handleChange} onBlur={handleBlur}
                          helperText={(errors.company && touched.company) && errors.company} FormHelperTextProps={{ error: true }} />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField required name="department" label="Department" variant="filled" color="primary"
                          value={values.department} onChange={handleChange} onBlur={handleBlur}
                          helperText={(errors.department && touched.department) && errors.department} FormHelperTextProps={{ error: true }} />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField required name="activity" label="Activity" variant="filled" color="primary"
                          value={values.department} onChange={handleChange} onBlur={handleBlur}
                          helperText={(errors.activity && touched.activity) && errors.activity} FormHelperTextProps={{ error: true }} />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField required name="supervisor" label="Supervisor" variant="filled" color="primary"
                          value={values.supervisor} onChange={handleChange} onBlur={handleBlur}
                          helperText={(errors.supervisor && touched.supervisor) && errors.supervisor} FormHelperTextProps={{ error: true }} />
                    </Grid>
                    <Grid item xs={12}>
                      <DatePicker name='date' allowSameDateSelection views={['month', 'day']} label='Date Reported' value={values.dateReported} onChange={handleChange} onBlur={handleBlur} 
                          renderInput={(params: JSX.IntrinsicAttributes & TextFieldProps) => <TextField {...params} inputProps={{...params.inputProps, readOnly: true}}/>}
                          helperText={(errors.dateReported && touched.dateReported) && errors.dateReported} formHelperTextProps={{error: true}}/>
                    </Grid>
                    <Grid item xs={12}>
                      <Autocomplete multiple id="signatures" options={values.signatures} freeSolo onChange={handleChange} getOptionLabel={(option) => option} 
                        renderInput={(params) => (<TextField {...params} variant="standard" label="Signatures" placeholder="Signatures"/>)}
                        renderTags={(value: readonly string[], getTagProps) =>
                          value.map((option: string, index: number) => (
                            <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                          ))
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Autocomplete multiple id="ppe" options={values.requiredPpe} freeSolo onChange={handleChange} getOptionLabel={(option) => option} 
                        renderInput={(params) => (<TextField {...params} variant="standard" label="Protective Equipment" placeholder="Equipment"/>)}
                        renderTags={(value: readonly string[], getTagProps) =>
                          value.map((option: string, index: number) => (
                            <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                          ))
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Autocomplete multiple id="training" options={values.requiredTraining} freeSolo onChange={handleChange} getOptionLabel={(option) => option} 
                        renderInput={(params) => (<TextField {...params} variant="standard" label="Training Required" placeholder="Training"/>)}
                        renderTags={(value: readonly string[], getTagProps) =>
                          value.map((option: string, index: number) => (
                            <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                          ))
                        }
                      />
                    </Grid>
                    <Grid item container justifyContent='center' xs={12}>
                      {renderErrorMessage()}
                    </Grid>
                  </Grid>
                </DialogContent>
                <DialogActions>
                  <Grid item xs={12} paddingLeft={10} paddingBottom={2}>
                    <Stack direction="row" justifyContent="center" spacing={4}>
                      <Button disabled={!isValid || isSubmitting} type='submit' variant="contained">
                        <Typography variant='button'>Submit</Typography>
                      </Button>
                      <Button disabled={isSubmitting} variant="outlined" onClick={toggleDialog}>
                        <Typography variant='button'>Cancel</Typography>
                      </Button>
                      <CircularProgress sx={{visibility: isSubmitting ? 'visible' : 'hidden'}} 
                        variant='indeterminate' color='primary'/>
                    </Stack>
                  </Grid>
                </DialogActions>
              </form>
            )}
        </Formik>
      </Dialog>
    </>
  );
}

export default DocumentDataForm; 