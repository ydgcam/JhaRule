import { useEffect, useState } from "react";
import { StepFE } from "../types/step";
import { readStepsForJha } from "../services/step-service";
import { JhaFE } from "../types/jha";
import StepCard from "./StepCard";
import { isOk, toOk } from "../types/result";
import { Stack, Typography } from "@mui/material";

export interface StepListProps { jha: JhaFE }
export const StepList = (props: StepListProps): JSX.Element => {

  const [allSteps, setAllSteps] = useState<StepFE[]>([]);
  
  const getSteps = async (): Promise<StepFE[]> => {
    const documents = await readStepsForJha(props.jha.uid);
    return isOk(documents) ? toOk(documents) : [];
  };

  const refreshStepList = () => { getSteps().then((docs) => { setAllSteps(docs) }); };
  
  useEffect(() => { refreshStepList(); }, []);

  return (
    <>
      <Stack padding={3} spacing={3} sx={{ bgcolor: 'container.light'}}>
        <Typography align='center' variant='h2'>{props.jha.activity + ' steps'}</Typography>
      </Stack>
      {
        allSteps.map((step, index) => {
          return (
            <StepCard
              key={index.toString()}
              step={step}
              refreshCallbackFn={refreshStepList}
            />
          );
        })
      }
    </>
  );
}

export default StepList;