import { NewStepData, StepBE, StepFE } from '../types/step';
import { StepError } from "../types/errors";
import { isErr, Result, toOk } from "../types/result";
import { readHazardsForStep } from './hazard-service';
import axios, { toFormData } from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { Hazard } from '../types/hazard';

export const createStep = async (data: NewStepData, photo: File | string, callback?: () => unknown): Promise<Result<void, StepError>> => {
  const postData = toFormData(newToStepDb(data, photo));
  axios({ method: 'post', url:'steps/', data: postData, headers: {"Content-Type": "multipart/form-data"}, })
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

export const updateStep = async (data: StepFE, photo: File | string, callback?: () => unknown): Promise<Result<void, StepError>> => {
  const putData = toFormData(toStepDb(data, photo));
  axios({ method: 'put', url:`steps/${data.uid}/`, data: putData, headers: {"Content-Type": "multipart/form-data"},})
  .then(() => { if (callback) { callback(); } })
  .catch((e) => { return new StepError(e, 'put-request-error-step')});
}

export const deleteStep = async (id: string, callback?: () => unknown): Promise<Result<void, StepError>> => { 
  axios.delete(`/steps/${id}/`)
  .then(() => { if (callback) { callback(); } })
  .catch((e) => { return new StepError(e, 'delete-request-error-step'); })
}

export function toStepDb(data: StepFE, photo: File | string): StepBE {
  if (photo instanceof File) {
    return {
      uid: data.uid, 
      jha_id: data.jha_id, 
      step_num: data.step_num, 
      title: data.title, 
      description: data.description || null,  
      photo: photo
    };
  } 
  else {
    return {
      uid: data.uid, 
      jha_id: data.jha_id, 
      step_num: data.step_num, 
      title: data.title, 
      description: data.description || null,  
    };
  } 
}

export function newToStepDb(data: NewStepData, photo: File | string): StepBE {
  if (photo) {
    return {
      uid: uuidv4(), 
      jha_id: data.jha_id, 
      step_num: data.step_num, 
      title: data.title, 
      description: data.description || null,  
      photo: photo
    };
  }
  else {
    return {
      uid: uuidv4(), 
      jha_id: data.jha_id, 
      step_num: data.step_num, 
      title: data.title, 
      description: data.description || null,  
    };
  }
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