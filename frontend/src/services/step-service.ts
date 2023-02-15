import { Step } from '../types/step';
import { StepError } from "../types/errors";
import { isErr, Result, toErr, toOk } from "../types/result";
import { getHazardsForStep } from './hazard-service';
import axios from 'axios';
import { Hazard } from '../types/hazard';

export function convertToStep(data: any, hazs: Hazard[]): Step {
  const converted = {
    uid: data.uid, 
    jhaId: data.jha_id, 
    stepNum: data.step_num, 
    title: data.title, 
    description: data.description,  
    hazards: hazs,
  }
  return converted;
}

export async function fetchStepsForDocument(jha: string): Promise<Result<Step[], StepError>> {
  const ans: Step[] = [];
  try {
    const docs = await axios.get(`steps/'${jha}'`);
    for (const doc of docs.data) {
      const hazList = await getHazardsForStep(doc.uid);
      if (isErr(hazList)) {
        return toErr(hazList);
      }
      ans.push(convertToStep(doc, toOk(hazList)));
    }
    return ans;
  } catch(e) {
    return new StepError('Error fetching steps', 'document-not-found');
  }
}