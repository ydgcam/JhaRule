import { Container, Stack, Typography, Button } from "@mui/material"
import React, { useState } from "react";
import { Navigate } from 'react-router';
import { PasswordTextField, EmailTextField } from "./Inputs";

const LoginForm = (): JSX.Element => {

  // State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Event-handlers
  const updateEmail = (event: React.ChangeEvent<HTMLInputElement>) => { setEmail(event.target.value); };
  const updatePassword = (event: React.ChangeEvent<HTMLInputElement>) => { setPassword(event.target.value); };

  const handleLogin = () => {};

  // Component rendering logic
  const renderTextField = (pass: boolean): JSX.Element => {
    return (pass ? 
      <PasswordTextField stateValue={password} stateFunction={updatePassword} />
      : <EmailTextField stateValue={email} stateFunction={updateEmail} />);
  };

  return (loggedIn ?
    <Navigate to={'/'}/> :

    <Container sx={{ bgcolor: 'container.light', padding: 5, borderRadius: 'calc(3px + 1vmin)' }}>
      <Stack spacing={2} alignItems='center' justifyContent='center' id='form-contents'>
        <img src={""} width='100vw' height='100vh' alt='JhaRule Logo' />
        {renderTextField(false)}
        {renderTextField(true)}
        <Typography id='error' variant='caption' color='error'>{errorMessage}</Typography>
        <Button fullWidth color='primary' name='submit' type='submit' variant='contained' onClick={handleLogin} data-testid='submit-button'>
          {<Typography>Login</Typography>}
        </Button>
      </Stack>
    </Container>
  );
};
export default LoginForm;