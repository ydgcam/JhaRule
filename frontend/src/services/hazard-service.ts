import axios from "axios";
import { HazardError } from "../types/errors";
import { Hazard, NewHazardData } from "../types/hazard";
import { Result } from "../types/result";
import { v4 as uuidv4 } from 'uuid';

export const createHazard = async (newHaz: NewHazardData, callBack?: () => unknown): Promise<Result<void, HazardError>> => {
  const postData = convert(newHaz);
  axios({ method: 'post', url:'hazards/', data: {...postData}})
  .then(() => { if (callBack) { callBack(); } })
  .catch((e) => { return new HazardError(e, 'post-request-error-hazard')});
}

export async function readHazardsForStep(step_id: string): Promise<Result<Hazard[], HazardError>> {
  const ans: Hazard[] = [];
  try {
    const docs = await axios.get(`steps/${step_id}/hazards`);
    for (const doc of docs.data) {
      ans.push(convert(doc));
    }
    return ans; 
  } catch(e) {
    return new HazardError('readHazardsForStep', 'get-request-error-hazard');
  }
}

export const updateHazard = async (haz: Hazard, callBack?: () => unknown): Promise<Result<void, HazardError>> => {
  axios({ method: 'put', url:`hazards/${haz.uid}/`, data: {...haz}})
  .then(() => { if (callBack) { callBack(); } })
  .catch((e) => { return new HazardError(e, 'put-request-error-hazard')});
}

export const deleteHazard = async (id: string, callback?: () => unknown): Promise<Result<void, HazardError>> => { 
  axios.delete(`hazards/${id}/`)
  .then(() => { if (callback) { callback(); }})
  .catch((e) => { return new HazardError(e, 'delete-request-error-hazard') });
}

function convert(data: NewHazardData): Hazard {
  return {
    uid: uuidv4(), 
    step_id: data.step_id, 
    title: data.title,
    risk: data.risk,
    control: data.control
  };
}