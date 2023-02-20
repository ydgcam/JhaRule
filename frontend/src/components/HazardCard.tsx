import { Card, CardActions, CardContent, CardHeader, Grid, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { deleteHazard } from "../services/hazard-service";
import { Hazard } from "../types/hazard";
import { isOk } from "../types/result";
import { StepFE } from "../types/step";
import HazardForm from "./HazardForm";
import { CardStyles, DeleteButton, ConfirmationDialog, AlertDialog } from "./Inputs";

interface HazardCardProps { hazard: Hazard, step: StepFE, refreshCallbackFn: () => void }
const HazardCard = (props: HazardCardProps): JSX.Element => {

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [alertDetails, setAlertDetails] = useState<string | null>(null);
  
  const handleDelete = () => { setOpenDeleteModal(true); }
  const doDelete = () => { 
    setSubmitting(true);
    deleteHazard(props.hazard.uid, props.refreshCallbackFn).then((res) => {
      setSubmitting(false);
      setOpenDeleteModal(false);
    });
  }

  return (
    <>
      <Card sx={CardStyles.card}>
        <CardHeader title={props.hazard.title}/>
        <CardContent sx={CardStyles.cardContentCard}>
          <Stack>
            <Grid container>
              <Grid item>
                <Typography variant='h6'>{'Risk: '}</Typography>
                <Typography>{props.hazard.risk}</Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item>
                <Typography variant='h6'>{'Control: '}</Typography>
                <Typography>{props.hazard.control}</Typography>
              </Grid>
            </Grid>
          </Stack>
        </CardContent>
        <CardActions>
          <HazardForm step={props.step} hazard={props.hazard} refreshCallbackFn={props.refreshCallbackFn}/>
          <DeleteButton fn={handleDelete} text={'this hazard'}/>
        </CardActions>
      </Card>

      <ConfirmationDialog 
        title={'Delete ' + props.hazard.title}
        text={'Are you sure you want to delete this hazard?'}
        isSubmitting={isSubmitting}
        open={openDeleteModal}
        closeFn={() => setOpenDeleteModal(false)}
        action={doDelete}/>
      <AlertDialog
        title={'Error occured deleting hazard'} 
        details={alertDetails || ''} 
        open={alertDetails !== null} 
        onClose={() => setAlertDetails(null)}
      />
    </>
  );
}

export default HazardCard;