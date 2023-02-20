import { Stack, Typography } from "@mui/material";
import { StepFE } from "../types/step";
import HazardForm from "./HazardForm";
import HazardCard from "./HazardCard";

export interface HazardListProps { step: StepFE, fn: () => unknown };
export const HazardList = (props: HazardListProps): JSX.Element => {
  return (
    <>
      <Stack padding={3} spacing={3} sx={{ bgcolor: 'container.light'}}>
        <Typography align='center' variant='h2'>{'Hazards for ' + props.step.title}</Typography>
        <HazardForm step={props.step} refreshCallbackFn={props.fn}/>
      </Stack>
      {
        props.step.hazards.map((haz, index) => {
          return ( <HazardCard key={index} step={props.step} hazard={haz} refreshCallbackFn={props.fn}/>)
        })
      }
    </>
  );
}; 

export default HazardList