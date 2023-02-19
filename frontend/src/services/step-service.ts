import { NewStepData, StepBE, StepFE } from '../types/step';
import { StepError } from "../types/errors";
import { isErr, Result, toOk } from "../types/result";
import { readHazardsForStep } from './hazard-service';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { Hazard } from '../types/hazard';

export const createStep = async (data: NewStepData, callback?: () => unknown): Promise<Result<void, StepError>> => {
  const postData = newToStepDb(data);
  axios({ method: 'post', url:'steps/', data: {...postData}})
  .then(() => { if (callback) { callback(); } })
  .catch((e) => { return new StepError(e, 'post-request-error-step')});
}

export async function readStepsForJha(jha_id: string): Promise<Result<StepFE[], StepError>> {
  const ans: StepFE[] = [];
  try {
    const docs = await axios.get(`jhas/${jha_id}/steps`);
    for (const doc of docs.data) {
      const hazList = await readHazardsForStep(doc.uid);
      if (isErr(hazList))
        return new StepError('fetchStepsForJha', 'get-request-error-hazard');
      ans.push(toStep(doc, toOk(hazList)));
    }
    return ans;
  } catch(e) {
    return new StepError(`fetchStepsFor: ${jha_id}`, 'get-request-error-step');
  }
}

export const updateStep = async (data: StepFE, callback?: () => unknown): Promise<Result<void, StepError>> => {
  const putData = toStepDb(data);
  axios({ method: 'post', url:`steps/${data.uid}/`, data: {...putData}})
  .then(() => { if (callback) { callback(); } })
  .catch((e) => { return new StepError(e, 'put-request-error-step')});
}

export const deleteJha = async (id: string, callback?: () => unknown): Promise<Result<void, StepError>> => { 
  axios.delete(`/steps/${id}/`)
  .then(() => { if (callback) { callback(); } })
  .catch((e) => { return new StepError(e, 'delete-request-error-step'); })
}

export function toStepDb(data: StepFE): StepBE {
  const img = data.photo instanceof File ? data.photo : null;
  return {
    uid: data.uid, 
    jha_id: data.jha_id, 
    step_num: data.step_num, 
    title: data.title, 
    description: data.description || null,  
    photo: img
  };
}

export function newToStepDb(data: NewStepData): StepBE {
  const img = data.photo instanceof File ? data.photo : null;
  return {
    uid: uuidv4(), 
    jha_id: data.jha_id, 
    step_num: data.step_num, 
    title: data.title, 
    description: data.description || null,  
    photo: img
  };
}

function toStep(data: any, hazs: Hazard[]): StepFE {
  return {
    uid: data.uid, 
    jha_id: data.jha_id, 
    step_num: data.step_num, 
    title: data.title, 
    description: data.description,  
    hazards: hazs,
    photo: data.photo
  };
}