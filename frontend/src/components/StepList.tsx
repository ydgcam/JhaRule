import { useEffect, useState } from "react";
import { Step } from "../types/step";
import { fetchStepsForDocument } from "../services/step-service";
import { JobHazardDocument } from "../types/jha";
import StepDataView from "./StepDataView";
import { isOk, toOk } from "../types/result";

export interface StepListProps { jha: JobHazardDocument }
export const StepList = (props: StepListProps): JSX.Element => {

  const [allSteps, setAllSteps] = useState<Step[]>([]);
  
  const getSteps = async (): Promise<Step[]> => {
    const documents = await fetchStepsForDocument(props.jha.uid);
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