import { Card, CardActions, CardContent, CardHeader, Collapse, ImageList, ImageListItem, Typography } from "@mui/material";
import { StepFE } from "../types/step";
import { deleteStep } from "../services/step-service";
import { isOk } from "../types/result";
import { CardStyles, DeleteButton, DoButton, ConfirmationDialog, AlertDialog, ExpandMoreComp } from "./Inputs";
import { useState } from "react";
import StepForm from "./StepForm";
import HazardList from "./HazardList";

export interface StepCardProps { step: StepFE, refreshCallbackFn: () => void }

export const StepCard = (props: StepCardProps): JSX.Element => {

  const [dataExpanded, setdataExpanded] = useState(false);
  const [hazardsExpanded, setHazardsExpanded] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [alertDetails, setAlertDetails] = useState<string | null>(null);
  
  const handleDelete = () => { setOpenDeleteModal(true); }

  const renderImage = (): JSX.Element => {
    return (
        <ImageList sx={{ width: 500, height: 450 }} cols={1} rowHeight={164}> 
        { 
          props.step.photo ? 
          <ImageListItem key={props.step.photo?.toString()}>
            <img 
              src={`${props.step.photo}?w=164&h=164&fit=crop&auto=format`}
              srcSet={`${props.step.photo}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              alt={props.step.title}
              loading="lazy"
            />
          </ImageListItem>
          :
          <></>
        }
      </ImageList>
    );
  }

  return (
    <>
      <Card sx={CardStyles.card}>
        <CardHeader title={props.step.step_num + '. ' + props.step.title}
          action={<ExpandMoreComp expand={dataExpanded} onClick={() => setdataExpanded(!dataExpanded)}/>}
        />
        <Collapse in={dataExpanded} timeout='auto' unmountOnExit sx={CardStyles.collapse}>
          <CardContent sx={CardStyles.cardContentCard}>
            {renderImage()}
            <Typography>{'Description: ' + props.step.description}</Typography>
          </CardContent>
        </Collapse>
        <CardActions>
          <StepForm step={props.step} refreshCallbackFn={props.refreshCallbackFn}/>
          <DeleteButton fn={handleDelete} text={'this step'}/>
          <DoButton text='Show Hazards' fn={() => setHazardsExpanded(!hazardsExpanded)}/>
        </CardActions>
        <Collapse in={hazardsExpanded} timeout='auto' unmountOnExit sx={CardStyles.collapse}>
          <CardContent sx={CardStyles.cardContentCollapse}>
            <HazardList step={props.step} fn={props.refreshCallbackFn}/>
          </CardContent>
        </Collapse>
      </Card>

      <ConfirmationDialog 
        title={'Delete ' + props.step.title}
        text={'Are you sure you want to delete this step?'}
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