import { Step } from '../types/step';
import { StepError } from "../types/errors";
import { isOk, Result, toErr, toOk } from "../types/result";
import { toHazards } from './hazard-service';


export async function getSteps(stepIds: string[]): Promise<Result<Step[], StepError>> {
  const ans: Step[] = [];
  for (const str of stepIds) {
    const step = await getStep(str);
    if (isOk(step)) {
      ans.push(toOk(step));
    }
    else {
      return new StepError(`Error fetching ${str}`, 'document-not-found');
    }
  }
  return ans; 
}

export async function getStep(stepId: string): Promise<Result<Step, StepError>> {
  try {
    const fet = await fetch(`http://localhost:8000/api/step/${stepId}`);
    const resJson = await fet.json(); 
    const res = JSON.parse(resJson);
    const ans = await toStep(res);
    if (isOk(ans)) {
      return toOk(ans);
    }
    else {
      return toErr(ans) as StepError;
    }
  } catch(e) {
    return new StepError('Error fetching Step', 'document-not-found');
  }
}

export async function toStep(data: any): Promise<Result<Step, StepError>> {
  const hazArr = await toHazards(data.hazards.split(','));
  if (isOk(hazArr)) {
    return ({
      uid: data.uid, 
      jhaId: data.jha_id, 
      stepNum: data.step_num, 
      title: data.title, 
      description: data.description,
      hazards: toOk(hazArr)
    } as Step);
  }
  else {
    return toErr(hazArr) as StepError;
  }
}