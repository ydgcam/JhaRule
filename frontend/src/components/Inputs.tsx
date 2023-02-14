/**************************/
/** TextField Components **/
/**************************/
import { styled } from '@mui/material/styles';
import { ExpandMore } from '@mui/icons-material';
import { Tooltip, TextField, InputAdornment, MenuItem, Button, IconButton, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { Lock, Email, DeleteForever, Edit } from '@mui/icons-material';
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

/*******************************/
/*** Pulldown-menu Component ***/
/*******************************/
/**
 * @property expand: state value controlling whether or not component content is visible
 * @property onClick: function that sets value of 'expand' 
 */
export interface ExpandMoreCompProps { 
  expand: boolean, 
  onClick: React.MouseEventHandler 
}
export const ExpandMoreComp = styled((props: ExpandMoreCompProps): JSX.Element => {
  const { expand, ...other } = props;
  return <ExpandMore {...other} />;
})(({ theme, expand }) => ({ //
  transform: !expand ? 
    'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

/**************************/
/*** Card UI Components ***/
/**************************/

/** NEEDS TO BE FURTHER ABSTRACTED */

//Styling rules for Card components
export const CardStyles = {
  card: { 
    maxWidth: '100%', minWidth: '80%',
    margin: '.5em 1em .5em 1em', padding: '0 1em 0 1em', alignSelf: 'center',
    background: '#F2F2F2',
  },
  collapse: {
    minWidth: '100%',
    background: '#DDDDDD',
    borderRadius: '.25em',
    marginBottom: '1em',
  },
  cardContentCard: { alignItems: 'flex-start', padding: 0, paddingBottom: '0 !important' },
  cardContentCollapse: { padding: '2 !important' },
  gridItem: { alignSelf: 'center' },
  alert: { 
    maxWidth: '100%', minWidth: '80%',
    margin: '.5em 1em .5em 1em', padding: '0 1em 0 1em', alignSelf: 'center'  
  }
};

/***********************************/
/*** Buttons & Switch Components ***/
/***********************************/

/**
 * Buttons that are used throughout the source in various contexts
 * 
 * @property fn: function that executes onClick for this button
 * @property entity: in CreateButtonProps: the label to assign to the button in UI if needed
 */
export interface UserButtonProps { fn: () => unknown; }
export interface CreateButtonProps extends UserButtonProps { entity: string; }

export const CreateButton = (props: CreateButtonProps): JSX.Element => {
  return (
    <Tooltip title={'Add ' + props.entity}>
      <Button onClick={props.fn} color='primary' variant='contained'>
        <Typography variant='button'>Create {props.entity}</Typography>
      </Button>
    </Tooltip> 
  );
};

export const CancelButton = (props: UserButtonProps): JSX.Element => { 
  return ( <Button onClick={props.fn} variant='outlined'><Typography variant='button'>Cancel</Typography></Button> ); 
};

export const EditButton = (props: UserButtonProps): JSX.Element => {
  return (
    <Tooltip title='Edit'>
      <IconButton color='primary' onClick={props.fn}>
        <Edit />
      </IconButton>
    </Tooltip>
  );
};
export const DeleteButton = (props: UserButtonProps): JSX.Element => {
  return (
    <Tooltip title='Delete'>
      <IconButton color='primary' onClick={props.fn}>
        <DeleteForever />
      </IconButton>
    </Tooltip>
  );
};

export interface AlertDialogProps {
  title: string; 
  details: string | null; 
  open: boolean;
  onClose: () => void; 
}
export const AlertDialog = (props: AlertDialogProps): JSX.Element => {
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{props.details || ''}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose} variant='outlined'><Typography variant='button'>Ok</Typography></Button>
      </DialogActions>
    </Dialog>
  );
};