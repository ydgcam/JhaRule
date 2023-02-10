//React Imports
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router';
import { Formik } from 'formik';
import * as Yup from 'yup';
//MUI imports
import { Button, Grid, Typography, Stack, Container, TextField, InputAdornment } from '@mui/material';
import { Email, Face, Lock, LockOpen } from '@mui/icons-material/';
//Internal imports 
import { Link } from 'react-router-dom';

/**
 * Manages state data for login page functionality and returns contents of form to render onto page
 * @returns Component containing markup and logic for the form on the login page.
 */
const CreateAccountForm = (): JSX.Element => {

  // State
  const [loggedIn, setLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const FormValidator = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string()
      .required('Email is required')
      .email('Email is invalid')
      .test('email', 'This email is already in use', function (email) {

      }),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d\s:]).*$/, {
        message: 'Password needs 1 uppercase, 1 lowercase, 1 digit, and one special character'
      }),
    confirm: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password')], 'Confirm Password does not match'),
  });

  return (loggedIn ? <Navigate to={'/documents'}/> :
    <Container sx={{ bgcolor: 'container.light', padding: 5, borderRadius: 'calc(3px + 1vmin)' }}>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirm: ''
        }}
        validationSchema={FormValidator}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          const payload = {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password,
          };
          /*createAccount(payload).then(res => {
            if (isOk(res)) {
              setSubmitting(false);
            } else {
              setErrorMessage('There was an issue creating your account.');
            }
          });*/
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
            <Stack spacing={2} alignItems='center' justifyContent='center' id='form-contents'>
              <img src={""} width='100vw' height='100vh' alt='logo' />
              <TextField required fullWidth label="First Name" name='firstName' size="small" variant="outlined" color="primary"
                value={values.firstName} onChange={handleChange} onBlur={handleBlur}
                helperText={(errors.firstName && touched.firstName) && errors.firstName}
                FormHelperTextProps={{ error: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Face />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField required fullWidth label="Last Name" name="lastName" size="small" variant="outlined" color="primary"
                value={values.lastName} onChange={handleChange} onBlur={handleBlur}
                helperText={(errors.lastName && touched.lastName) && errors.lastName}
                FormHelperTextProps={{ error: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Face />
                    </InputAdornment>
                  ),
                }} />
              <TextField required fullWidth label="Email" name="email" size="small" variant="outlined" color="primary"
                value={values.email} onChange={handleChange} onBlur={handleBlur}
                helperText={(errors.email && touched.email) && errors.email}
                FormHelperTextProps={{ error: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  ),
                }} />
              <TextField required fullWidth color='primary' label="Password" name="password" size="small" type="password" variant="outlined"
                value={values.password} onChange={handleChange} onBlur={handleBlur}
                helperText={(errors.password && touched.password) && errors.password}
                FormHelperTextProps={{ error: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOpen />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField required fullWidth color='primary' label="Confirm Password" name="confirm" size="small" type="password" variant="outlined"
                value={values.confirm} onChange={handleChange} onBlur={handleBlur}
                helperText={(errors.confirm && touched.confirm) && errors.confirm}
                FormHelperTextProps={{ error: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
                }}
              />
              <Typography id='error' variant='caption' color='error'>{errorMessage}</Typography>
              <Button fullWidth disabled={!isValid || isSubmitting} 
                color="primary" name='submit' type="submit" variant="contained" data-testid='submit-button'>
                Create Account
              </Button>
              <Link to='/'>Login</Link>
            </Stack>
          </form>
        )}
      </Formik>
    </Container >
  );
};

const CreateAccountPage = (): JSX.Element => {
  return (
    <Grid container id='contents' bgcolor='primary.light' style={{ minHeight: '100vh' }}
      spacing={0} direction='column' alignItems='center' justifyContent='center'>
      <Grid item xs={3} id="form">
        <CreateAccountForm />
      </Grid>
    </Grid>
  );
};

export default CreateAccountPage;