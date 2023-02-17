import { Grid, Stack, Typography } from "@mui/material";
import { Step } from "../types/step";

export interface StepDataViewProps { step: Step, refreshCallbackFn: () => void }
export const StepDataView = (props: StepDataViewProps): JSX.Element => {
  return (
    <Stack>
      <Grid container id={'Title'}>
        <Grid item xs={12}>
          <Typography>{props.step.stepNum + '. ' + props.step.title}</Typography>
        </Grid>
      </Grid>
    </Stack>
  );
}

export default StepDataView;