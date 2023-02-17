import { Stack, Grid, Typography } from "@mui/material";
import { format } from "date-fns";
import { JobHazardDocument } from "../types/jha";
import { StringFunctions } from "../types/utils";

/**
 * Renders the JobHazardDocumentData within the DocumentCard
 * @property values: the JobHazardDocument object instance to display
 */
export interface DocumentDataViewProps {values: JobHazardDocument};
export const DocumentDataView = (props: {values: JobHazardDocument}): JSX.Element => {
  return (
    <Stack>
      <Grid container id={'Dates'}>
        <Grid item id={'Date Reported'} xs={6}>
          <Typography>{'Date Reported: ' + format(props.values.dateReported, 'MM/dd/Y')}</Typography>
        </Grid>
        <Grid item id={'Last Updated'} xs={6}>
          <Typography>{'Last Edit: ' + format(props.values.lastUpdated, 'MM/dd/Y h:mm:ss aa')}</Typography>
        </Grid>
      </Grid>
      <Grid container id={'Leadership'}>
        <Grid item id={'Company'} xs={6}>
          <Typography>{'Company: ' + StringFunctions.toInitial(props.values.company)}</Typography>
        </Grid>
        <Grid item id={'Supervisor'} xs={6}>
          <Typography>{'Supervisor: ' + (StringFunctions.formatName(props.values.supervisor) || 'N/A')}</Typography>
        </Grid>
      </Grid>
      <Grid container id={'Job Details'}>
        <Grid item id={'Department'} xs={6}>
          <Typography>{'Department: ' + StringFunctions.toInitial(props.values.department)}</Typography>
        </Grid>
        <Grid item id={'Activity'} xs={6}>
          <Typography>{'Activity: ' + StringFunctions.toInitial(props.values.activity) }</Typography>
        </Grid>
      </Grid>
      <Grid container id={'Training/Protection'}>
        <Grid item id={'Training'} xs={6}>
          <Typography>{'Required Training: ' + (props.values.requiredTraining.toString() || 'None Listed')}</Typography>
        </Grid>
        <Grid item id={'Protection'} xs={6}>
          <Typography>{'Protection Equipment: ' + (props.values.requiredPpe.toString() || 'None Listed')}</Typography>
        </Grid>
      </Grid>
      <Grid container id={'Signatures'}>
        <Grid item id={'Names'} xs={12}>
          <Typography>{'Signatures: ' + (props.values.signatures.toString() || 'None Listed')}</Typography>
        </Grid>
      </Grid>
    </Stack>
  );
}
export default DocumentDataView;