import { useEffect, useState } from "react";
import { Step } from "../types/step";
import { readStepsForJha } from "../services/step-service";
import { JhaFE } from "../types/jha";
import StepDataView from "./StepDataView";
import { isOk, toOk } from "../types/result";

export interface StepListProps { jha: JhaFE }
export const StepList = (props: StepListProps): JSX.Element => {

  const [allSteps, setAllSteps] = useState<Step[]>([]);
  
  const getSteps = async (): Promise<Step[]> => {
    const documents = await readStepsForJha(props.jha.uid);
    return isOk(documents) ? toOk(documents) : [];
  };

  const refreshStepList = () => { getSteps().then((docs) => { setAllSteps(docs) }); };
  
  useEffect(() => { refreshStepList(); }, []);

  return (
    <>
      {
        allSteps.map((step, index) => {
          return (
            <StepDataView
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