import { Stack, Grid, Typography } from "@mui/material";
import { format } from "date-fns";
import { JhaFE } from "../types/jha";
import { StringFunctions } from "../types/utils";

/**
 * Renders the JhaFEData within the DocumentCard
 * @property values: the JhaFE object instance to display
 */
export interface DocumentDataViewProps {values: JhaFE};
export const DocumentDataView = (props: {values: JhaFE}): JSX.Element => {
  return (
    <Stack>
      <Grid container id={'Dates'}>
        <Grid item id={'Date Reported'} xs={6}>
          <Typography sx={{textDecoration: 'underline'}}>{'Date Reported: '}</Typography>
          <Typography>{format(props.values.date_reported, 'MM/dd/Y')}</Typography>
        </Grid>
        <Grid item id={'Last Updated'} xs={6}>
          <Typography sx={{textDecoration: 'underline'}}>{'Last Edit: '}</Typography>
          <Typography>{format(props.values.last_updated, 'MM/dd/Y h:mm:ss aa')}</Typography>
        </Grid>
      </Grid>
      <Grid container id={'Leadership'}>
        <Grid item id={'Company'} xs={6}>
          <Typography sx={{textDecoration: 'underline'}}>{'Company: '}</Typography>
          <Typography>{props.values.company}</Typography>
        </Grid>
        <Grid item id={'Supervisor'} xs={6}>
          <Typography sx={{textDecoration: 'underline'}}>{'Supervisor: '}</Typography>
          <Typography>{(StringFunctions.formatName(props.values.supervisor) || 'N/A')}</Typography>
        </Grid>
      </Grid>
      <Grid container id={'Job Details'}>
        <Grid item id={'Department'} xs={6}>
          <Typography sx={{textDecoration: 'underline'}}>{'Department: '}</Typography>
          <Typography>{props.values.department}</Typography>
        </Grid>
        <Grid item id={'Activity'} xs={6}>
          <Typography sx={{textDecoration: 'underline'}}>{'Activity: '}</Typography>
          <Typography>{props.values.activity}</Typography>
        </Grid>
      </Grid>
      <Grid container id={'Training/Protection'}>
        <Grid item id={'Training'} xs={6}>
          <Typography sx={{textDecoration: 'underline'}}>{'Required Training: '}</Typography>
          <Typography>{(props.values.required_training.toString() || 'None Listed')}</Typography>
        </Grid>
        <Grid item id={'Protection'} xs={6}>
          <Typography sx={{textDecoration: 'underline'}}>{'Protection Equipment: '}</Typography>
          <Typography>{(props.values.required_ppe.toString() || 'None Listed')}</Typography>
        </Grid>
      </Grid>
      <Grid container id={'Signatures'}>
        <Grid item id={'Names'} xs={12}>
          <Typography sx={{textDecoration: 'underline'}}>{'Signatures: '}</Typography>
          <Typography>{(props.values.signatures.toString() || 'None Listed')}</Typography>
        </Grid>
      </Grid>
    </Stack>
  );
}
export default DocumentDataView;