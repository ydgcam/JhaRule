import { useEffect, useState } from "react";
import { StepFE } from "../types/step";
import { readStepsForJha } from "../services/step-service";
import { JhaFE } from "../types/jha";
import StepCard from "./StepCard";
import { isOk, toOk } from "../types/result";
import { Box, Stack, Typography } from "@mui/material";
import StepForm from "./StepForm";
import { CardStyles } from "./Inputs";

export interface StepListProps { jha: JhaFE, refreshCallbackFn: () => unknown }
export const StepList = (props: StepListProps): JSX.Element => {

  const [allSteps, setAllSteps] = useState<StepFE[]>([]);
  
  const getSteps = async (): Promise<StepFE[]> => {
    const documents = await readStepsForJha(props.jha.uid);
    return isOk(documents) ? toOk(documents) : [];
  };

  const refreshStepList = () => { getSteps().then((docs) => { setAllSteps(docs) }); };
  
  useEffect(() => { refreshStepList(); }, []);

  return (
    <Box sx={CardStyles.card}>
      <Stack padding={3} spacing={3} sx={{ bgcolor: 'secondary.main'}}>
        <Typography align='center' variant='h4'>{props.jha.title + ' Steps'}</Typography>
        <StepForm jha={props.jha} refreshCallbackFn={() => { props.refreshCallbackFn(); refreshStepList(); }}/>
      </Stack>
      {
        allSteps.map((step, index) => {
          return (
            <StepCard
              key={index.toString()}
              jha={props.jha}
              step={step}
              refreshCallbackFn={() => {props.refreshCallbackFn(); refreshStepList();}}
            />
          );
        })
      }
    </Box>
  );
}

export default StepList;