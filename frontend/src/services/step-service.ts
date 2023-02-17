import { Step, StepData } from '../types/step';
import { StepError } from "../types/errors";
import { isErr, Result, toErr, toOk } from "../types/result";
import { getHazardsForStep } from './hazard-service';
import axios from 'axios';
import { Hazard } from '../types/hazard';

export async function createStep(stepData: StepData): Promise<Result<void, StepError>> {
  try {
    await axios.post(`/steps/`, stepData);
  } catch(e) {
    return new StepError('createStep', 'error-posting-to-db');
  }
}

export async function deleteStep(id: string): Promise<Result<void, StepError>> {
  try {
    await axios.delete(`/steps/${id}`);
  } catch(e) {
    return new StepError('deleteStep', 'error-posting-to-db');
  }
}

export async function updateStep(stepData: StepData): Promise<Result<void, StepError>> {
  try {
    await axios.put(`/steps/${stepData.uid}`, stepData);
  } catch(e) {
    return new StepError('updateStep', 'error-posting-to-db');
  }
}

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

export function convertToStepData(data: any, hazs: Hazard[]): StepData {
  const converted = {
    uid: data.uid, 
    jha_id: data.jhaId, 
    step_num: data.stepNum, 
    title: data.title, 
    description: data.description,  
  }
  return converted;
}

export async function fetchStepsForDocument(jha: string): Promise<Result<Step[], StepError>> {
  const ans: Step[] = [];
  try {
    const docs = await axios.get(`/jhas/${jha}/steps`);
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