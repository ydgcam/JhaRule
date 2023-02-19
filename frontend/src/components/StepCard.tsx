import { Card, CardActions, CardContent, CardHeader, Collapse, Typography } from "@mui/material";
import { StepFE } from "../types/step";
import { deleteStep } from "../services/step-service";
import { isOk } from "../types/result";
import { CardStyles, DeleteButton, DoButton, ConfirmationDialog, AlertDialog } from "./Inputs";
import { useState } from "react";
import StepForm from "./StepForm";
import HazardForm from "./HazardForm";

export interface StepCardProps { step: StepFE, refreshCallbackFn: () => void }

export const StepCard = (props: StepCardProps): JSX.Element => {

  const [expanded, setExpanded] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [alertDetails, setAlertDetails] = useState<string | null>(null);
  
  const handleDelete = () => { setOpenDeleteModal(true); }

  return (
    <>
    <Card sx={CardStyles.card}>
        <CardHeader title={props.step.step_num + '. ' + props.step.title}/>
        <CardContent sx={CardStyles.cardContentCard}>
          <Typography>{'Description: ' + props.step.description}</Typography>
          {props.step.photo ? <img alt={props.step.description || props.step.title} src={props.step.photo.toString()}></img> : <></>}
        </CardContent>
        <CardActions>
          <StepForm step={props.step} refreshCallbackFn={props.refreshCallbackFn}/>
          <DeleteButton fn={handleDelete} text={'this job hazard analysis document'}/>
          <DoButton text='Add Hazards' fn={() => setExpanded(!expanded)}/>
        </CardActions>
        <Collapse in={expanded} timeout='auto' unmountOnExit sx={CardStyles.collapse}>
          <CardContent sx={CardStyles.cardContentCollapse}>
            {
              props.step.hazards.map((haz, index) => {
                return (
                  <HazardForm
                    key={index}
                    hazard={haz}
                    refreshCallbackFn={() => {}}
                  />
                )
              })
            }
          </CardContent>
        </Collapse>
      </Card>
      <ConfirmationDialog 
        title={'Delete ' + props.step.title}
        text={'Are you sure you want to delete this Step?'}
        isSubmitting={isSubmitting}
        open={openDeleteModal}
        closeFn={() => setOpenDeleteModal(false)}
        action={() => { 
          setSubmitting(true);
          deleteStep(props.step.uid).then((res) => {
            setSubmitting(false);
            if (isOk(res)) {
              props.refreshCallbackFn(); 
            }
            setOpenDeleteModal(false);
          });
        }}/>
      <AlertDialog
        title={'Error occured deleting step'} 
        details={alertDetails || ''} 
        open={alertDetails !== null} 
        onClose={() => setAlertDetails(null)}
      />
    </>
  );
}

export default StepCard;