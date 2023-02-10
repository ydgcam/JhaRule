import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, CircularProgress, Typography} from '@mui/material';

export interface ConfirmationDialogProps {
  title: string,
  text: string,
  open: boolean,
  isSubmitting?: boolean, 
  action: () => void,
  closeFn: () => void;
}

export const ConfirmationDialog = (props: ConfirmationDialogProps): JSX.Element => {
  return(
    <Dialog 
      open={props.open} 
      onClose={props.closeFn}>
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {props.text}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button disabled={props.isSubmitting} variant='contained' onClick={props.action} autoFocus>
          <Typography variant='button'>Confirm</Typography>
        </Button>
        <Button disabled={props.isSubmitting} variant='outlined' onClick={props.closeFn}>
          <Typography variant='button'>Cancel</Typography>
        </Button>
        <CircularProgress sx={{ visibility: props.isSubmitting ? 'visible' : 'hidden' }} variant='indeterminate' color='primary'/>
      </DialogActions>
    </Dialog>
  );
};