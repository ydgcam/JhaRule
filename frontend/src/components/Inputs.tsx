import { styled } from "@mui/material/styles";
import { ExpandMore, PhotoCamera } from "@mui/icons-material";
import {
  Tooltip,
  TextField,
  InputAdornment,
  MenuItem,
  Button,
  IconButton,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
} from "@mui/material";
import { Lock, Email, DeleteForever, Edit } from "@mui/icons-material";
import React from "react";
import THEME from './Theme';

/**************************/
/** Wrapper Components **/
/**************************/
/**
 * Small wrappers for reoccuring MUI component implementations in source
 */
export const LoadingWheel = (props: { show: boolean }): JSX.Element => {
  return (
    <CircularProgress
      sx={{ visibility: props.show ? "visible" : "hidden" }}
      variant="indeterminate"
      color="primary"
    />
  );
};

/**************************/
/** TextField Components **/
/**************************/
/**
 * Password/Email Input components
 * @property stateValue: the value in state that this textfield's input corresponds to
 * @property stateFunction: the function that sets the state of stateValue
 */
interface AuthTextFieldPropTypes {
  stateValue: string;
  stateFunction: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PasswordTextField = (
  props: AuthTextFieldPropTypes
): JSX.Element => {
  return (
    <Tooltip title="Enter your password.">
      <TextField
        fullWidth
        color="secondary"
        label="Password"
        name="password"
        size="small"
        type="password"
        variant="outlined"
        value={props.stateValue}
        onChange={props.stateFunction}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Lock />
            </InputAdornment>
          ),
        }}
      />
    </Tooltip>
  );
};

export const EmailTextField = (props: AuthTextFieldPropTypes): JSX.Element => {
  return (
    <Tooltip title="Enter your email.">
      <TextField
        fullWidth
        label="Email"
        name="email"
        size="small"
        variant="outlined"
        color="secondary"
        value={props.stateValue}
        onChange={props.stateFunction}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Email />
            </InputAdornment>
          ),
        }}
        inputProps={{ "data-testid": "email" }}
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
    <TextField
      select
      style={{ width: "15%" }}
      disabled={props.disabled}
      name={props.identity}
      label={props.identity}
      value={props.value}
      onChange={(event) => props.setValue(event.target.value)}
      color="primary"
    >
      <MenuItem key={"approveAll"} value={"all"}>
        {"All"}
      </MenuItem>
      {props.items.map((val) => (
        <MenuItem key={val + props.items.indexOf(val)} value={val}>
          {val.substring(0, 1).toUpperCase() + val.substring(1)}
        </MenuItem>
      ))}
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
  expand: boolean;
  onClick: React.MouseEventHandler;
}
export const ExpandMoreComp = styled(
  (props: ExpandMoreCompProps): JSX.Element => {
    const { expand, ...other } = props;
    return <ExpandMore {...other} aria-label="show more" />;
  }
)(({ theme, expand }) => ({
  //
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

/**************************/
/*** Card Styling ***/
/**************************/
export const CardStyles = {
  card: {
    maxWidth: "100%",
    minWidth: "80%",
    alignSelf: "center",
    background: THEME.palette.primary.light,
    border: '1px solid black', 
  },
  collapse: {
    minWidth: "100%",
    background:THEME.palette.secondary.main,
    borderRadius: ".25em",
    marginBottom: "1em",
  },
  cardContentCard: {
    alignItems: "flex-start",
    background: THEME.palette.secondary.main
  },
  cardContentCollapse: { background: THEME.palette.container.main },
  gridItem: { alignSelf: "center", background: THEME.palette.secondary.main },
  alert: {
    maxWidth: "100%",
    minWidth: "80%",
    margin: ".5em 1em .5em 1em",
    padding: "0 1em 0 1em",
    alignSelf: "center",
  },
};

/***********************************/
/*** Button Components ***/
/***********************************/
/**
 * Buttons that are used throughout the source in various contexts
 *
 * @property fn: function that executes onClick for this button
 * @property text: describes the action peformed by the button
 */
export interface UserButtonProps {
  fn: () => unknown;
  text: string;
  isSubmitting?: boolean;
}
export type CancelButtonProps = Omit<UserButtonProps, "text">;

export const UploadButton = (props: UserButtonProps): JSX.Element => {
  return (
    <IconButton color="primary" aria-label="upload picture" component="label">
      <input hidden accept="image/*" type="file" />
      <PhotoCamera />
    </IconButton>
  );
};

export const DoButton = (props: UserButtonProps): JSX.Element => {
  return (
    <Button
      disabled={props.isSubmitting}
      onClick={props.fn}
      color="primary"
      variant="contained"
    >
      <Typography variant="button">{props.text}</Typography>
    </Button>
  );
};
export const InfoButton = (props: UserButtonProps): JSX.Element => {
  return (
    <Button onClick={props.fn} variant="outlined" color="info">
      <Typography variant="button">{props.text}</Typography>
    </Button>
  );
};
export const CancelButton = (props: CancelButtonProps): JSX.Element => {
  return (
    <Button
      disabled={props.isSubmitting}
      color="primary"
      onClick={props.fn}
      variant="outlined"
    >
      <Typography variant="button">Cancel</Typography>
    </Button>
  );
};
export const EditButton = (props: UserButtonProps): JSX.Element => {
  return (
    <Tooltip title={"Edit " + props.text}>
      <IconButton color="primary" onClick={props.fn}>
        <Edit />
      </IconButton>
    </Tooltip>
  );
};
export const DeleteButton = (props: UserButtonProps): JSX.Element => {
  return (
    <Tooltip title={"Delete " + props.text}>
      <IconButton color="error" onClick={props.fn}>
        <DeleteForever />
      </IconButton>
    </Tooltip>
  );
};

/***********************************/
/*** Dialog Components ***/
/***********************************/
/**
 * Dialogs or Modals that are used throughout the source in various contexts
 *
 * @property title: Header text of the dialog box
 * @property details: a description to be provided by this dialog
 * @property open: an external state value controlling this components visibility
 * @property onClose: a function to execute immediately before this component dismounts
 */
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
        <DialogContentText>{props.details || ""}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <InfoButton fn={props.onClose} text={"Ok"} />
      </DialogActions>
    </Dialog>
  );
};

export interface ConfirmationDialogProps {
  title: string;
  text: string;
  open: boolean;
  isSubmitting?: boolean;
  action: () => void;
  closeFn: () => void;
}

export const ConfirmationDialog = (
  props: ConfirmationDialogProps
): JSX.Element => {
  return (
    <Dialog open={props.open} onClose={props.closeFn}>
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{props.text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <CancelButton fn={props.closeFn} />
        <DoButton fn={props.action} text="Confirm" />
        <CircularProgress
          sx={{ visibility: props.isSubmitting ? "visible" : "hidden" }}
          variant="indeterminate"
          color="primary"
        />
      </DialogActions>
    </Dialog>
  );
};
