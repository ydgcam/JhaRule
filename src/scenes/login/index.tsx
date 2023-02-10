import React from 'react';
import { Grid } from '@mui/material';
import LoginForm from '../../components/LoginForm';

/**
 * Wrapper for login page and for all contents within it, exported component for this file. 
 */
const LoginPage = (): JSX.Element => {
  return (
    <Grid container id='contents' bgcolor='primary.light' style={{ minHeight: '100vh' }}
      spacing={0} direction='column' alignItems='center' justifyContent='center'>
      <Grid item xs={3} id="form">
        <LoginForm />
      </Grid>
    </Grid>
  );
};
export default LoginPage; 