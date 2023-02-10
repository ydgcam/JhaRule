/**************************/
/** TextField Components **/
/**************************/

import { Tooltip, TextField, InputAdornment, MenuItem } from "@mui/material";
import { Lock, Email } from '@mui/icons-material';
import React from "react";

/**
 * Password/Email Input components
 * @property stateValue: the value in state that this textfield's input corresponds to
 * @property stateFunction: the function that sets the state of stateValue
 */
interface AuthTextFieldPropTypes { 
  stateValue: string; 
  stateFunction: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export const PasswordTextField = (props: AuthTextFieldPropTypes): JSX.Element => {
  return (
    <Tooltip title='Enter your password.'>
      <TextField fullWidth color='secondary' label="Password" name="password" size="small" type="password" variant="outlined" 
        value={props.stateValue} onChange={props.stateFunction}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start"><Lock /></InputAdornment>
          ),
        }}
      />
    </Tooltip>
  );
};
export const EmailTextField = (props: AuthTextFieldPropTypes): JSX.Element => {
  return (
    <Tooltip title='Enter your email.'>
      <TextField fullWidth label="Email" name="email"  size="small" variant="outlined" color="secondary" 
        value={props.stateValue} onChange={props.stateFunction}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start"><Email /></InputAdornment>
          ),
        }}
        inputProps={{'data-testid': 'email'}}
      />
    </Tooltip>
  );
};
/**
 * TextField Select compenent
 * 
 * @property identity: the name to give to the source and the label in the UI for this component.
 * @property disabled: a (most-likely) state-full value to give to this component that will dynamically 
 *                     control whether this component can be interacted with.
 * @property value: the state value this component modulates and controls.
 * @property setValue: the function that sets this state value following an event.
 * @property items: the set of values for 'value a user can select.
 * @property callback: an optional function that will be called after an event occurs in this component.
 */
export interface TextFieldSelectProps {
  identity: string;
  disabled: boolean; 
  value: string; 
  setValue: React.Dispatch<React.SetStateAction<string>>; 
  items: string[];
  callback?: () => unknown; 
}

export const TextFieldSelect = (props: TextFieldSelectProps): JSX.Element => {
  return (
    <TextField select style={{width: '15%'}} disabled={props.disabled} name={props.identity} label={props.identity}
      value={props.value} onChange={(event) => props.setValue(event.target.value)} color="primary">
      <MenuItem key={'approveAll'} value={'all'}>{'All'}</MenuItem>
      {
        props.items.map( val => (
          <MenuItem key={val + props.items.indexOf(val)} value={val}>
            {val.substring(0,1).toUpperCase() + val.substring(1)}
          </MenuItem>
        )) 
      }
    </TextField>
  );
};