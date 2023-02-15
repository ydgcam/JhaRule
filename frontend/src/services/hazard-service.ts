import axios from "axios";
import { HazardError } from "../types/errors";
import { Hazard } from "../types/hazard";
import { Result } from "../types/result";

export async function getHazardsForStep(stepId: string): Promise<Result<Hazard[], HazardError>> {
  const ans: Hazard[] = [];
  try {
    const docs = await axios.get(`hazards/'${stepId}'`);
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