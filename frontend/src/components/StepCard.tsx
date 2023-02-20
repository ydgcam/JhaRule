import { Card, CardActions, CardContent, CardHeader, Collapse, Grid, ImageList, ImageListItem, Typography } from "@mui/material";
import { StepFE } from "../types/step";
import { deleteStep } from "../services/step-service";
import { isOk } from "../types/result";
import { CardStyles, DeleteButton, DoButton, ConfirmationDialog, AlertDialog, ExpandMoreComp } from "./Inputs";
import { useState } from "react";
import StepForm from "./StepForm";
import HazardList from "./HazardList";
import { JhaFE } from "../types/jha";

export interface StepCardProps { jha: JhaFE, step: StepFE, refreshCallbackFn: () => void }

export const StepCard = (props: StepCardProps): JSX.Element => {

  const [dataExpanded, setdataExpanded] = useState(false);
  const [hazardsExpanded, setHazardsExpanded] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [alertDetails, setAlertDetails] = useState<string | null>(null);
  
  const handleDelete = () => { setOpenDeleteModal(true); }

  const renderImage = (): JSX.Element => {
    return (
        <ImageList sx={{ width: '100%', height: 164, border: '1px solid black' }} cols={1} rowHeight={164}> 
        { 
          props.step.photo ? 
          <ImageListItem key={props.step.photo?.toString()}>
            <img 
              src={`media/${props.step.photo}`}
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
            <Grid container>
              {
                props.step.photo ? 
                <>
                  <Grid item xs={4}> {renderImage()} </Grid>
                  <Grid item xs={2}/>
                </>
                : <></>
              }
              <Grid item xs={6}>
                <Typography sx={{textDecoration: 'underline'}}>{'Description: '}</Typography>
                <Typography>{props.step.description}</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Collapse>
        <CardActions>
          <StepForm jha={props.jha} step={props.step} refreshCallbackFn={props.refreshCallbackFn}/>
          <DeleteButton fn={handleDelete} text={'this step'}/>
          <DoButton text={hazardsExpanded ? 'Hide Hazards' : 'Show Hazards'} fn={() => setHazardsExpanded(!hazardsExpanded)}/>
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