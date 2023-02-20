import { Stack, Typography } from "@mui/material";
import { StepFE } from "../types/step";
import HazardForm from "./HazardForm";
import HazardCard from "./HazardCard";
import { readHazardsForStep } from "../services/hazard-service";
import { useState, useEffect } from "react";
import { Hazard } from "../types/hazard";
import { isOk, toOk } from "../types/result";

export interface HazardListProps { step: StepFE, fn: () => unknown };
export const HazardList = (props: HazardListProps): JSX.Element => {

  const [allHazards, setAllHazards] = useState<Hazard[]>([]);
  
  const getHazards = async (): Promise<Hazard[]> => {
    const documents = await readHazardsForStep(props.step.uid);
    return isOk(documents) ? toOk(documents) : [];
  };

  const refreshHazardList = () => { getHazards().then((docs) => { setAllHazards(docs) }); };
  
  useEffect(() => { refreshHazardList(); }, []);

  return (
    <>
      <Stack padding={3} spacing={1} sx={{ bgcolor: 'secondary.main', border: '1px solid black'}}>
        <Typography align='center' variant='h5'>{'Hazards for ' + props.step.title}</Typography>
        <HazardForm step={props.step} refreshCallbackFn={refreshHazardList}/>
      </Stack>
      {
        allHazards.map((haz, index) => {
          return ( <HazardCard key={index} step={props.step} hazard={haz} refreshCallbackFn={refreshHazardList}/>)
        })
      }
    </>
  );
}; 

export default HazardList