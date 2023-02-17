import axios from "axios";
import { HazardError } from "../types/errors";
import { Hazard } from "../types/hazard";
import { Result } from "../types/result";

export async function createHazard(hazardData: Hazard): Promise<Result<void, HazardError>> {
  try {
    await axios.post(`/hazards/`, hazardData);
  } catch(e) {
    return new HazardError('createHazard', 'error-posting-to-db');
  }
}

export async function deleteHazard(id: string): Promise<Result<void, HazardError>> {
  try {
    await axios.delete(`/hazards/${id}`);
  } catch(e) {
    return new HazardError('deleteHazard', 'error-posting-to-db');
  }
}

export async function updateHazard(hazardData: Hazard): Promise<Result<void, HazardError>> {
  try {
    await axios.put(`/hazards/${hazardData.uid}`, hazardData);
  } catch(e) {
    return new HazardError('updateHazard', 'error-posting-to-db');
  }
}

export async function getHazardsForStep(stepId: string): Promise<Result<Hazard[], HazardError>> {
  const ans: Hazard[] = [];
  try {
    const docs = await axios.get(`steps/${stepId}/hazards`);
    for (const doc of docs.data) {
      ans.push(convertToHazard(doc));
    }
    return ans; 
  } catch(e) {
    return new HazardError('Error fetching hazard', 'document-not-found');
  }
}

export function convertToHazard(data: any): Hazard {
  const converted: Hazard = {
    uid: data.uid, 
    stepId: data.step_id, 
    title: data.title,
    risk: data.risk,
    control: data.control
  };
  return converted;
}