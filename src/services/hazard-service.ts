import { HazardError } from "../types/errors";
import { Hazard } from "../types/hazard";
import { isOk, Result, toErr, toOk } from "../types/result";

export async function toHazards(data: string[]): Promise<Result<Hazard[], HazardError>> {
  const ans: Hazard[] = [];
  for (const hz of data) {
    const res = await getHazard(hz);
    if (isOk(res)) {
      ans.push(toOk(res));
    }
    else {
      return toErr(res);
    }
  }
  return ans;
}

export async function getHazard(hazardId: string): Promise<Result<Hazard, HazardError>> {
  try {
    const fet = await fetch(`http://localhost:8000/api/hazard/${hazardId}`);
    const resJson = await fet.json(); 
    const res = JSON.parse(resJson);
    return toHazard(res);
  } catch(e) {
    return new HazardError('Error fetching hazard', 'document-not-found');
  }
}

export function toHazard(data: any): Hazard {
  return (
    {
      uid: data.uid, 
      stepId: data.step_id, 
      title: data.title,
      risk: data.risk,
      control: data.control
    } as Hazard
  );
}