import { JobHazardDocument } from '../types/jha';
import { isErr, isOk, Result, toOk } from '../types/result';
import { JobHazardDocumentError } from '../types/errors';
import { getSteps } from './step-service';

/**
 * Needs work
 * @returns 
 */
export async function fetchAllDocuments(): 
  Promise<Result<JobHazardDocument[], JobHazardDocumentError>> {
    const ans: JobHazardDocument[] = [];
    try {
      const res = await fetch('http://localhost:8000/api/jha/');
      const jhasObj = await res.json();
      const jhasDocs = JSON.parse(jhasObj);
      for (const obj of jhasDocs) {
        ans.push(obj as JobHazardDocument);
      }
      return ans; 
    } catch (e) {
      return new JobHazardDocumentError('fetchAllJhas', 'document-not-found');
    }
}

export function toJobHazardDocumentList(data: any): JobHazardDocument {
  return (
    {
      uid: data.uid, title: data.title, company: data.company, activity: data.activity, department: data.department,
      authorFirst: data.author_first, authorLast: data.author_last, supervisorFirst: data.supervisor_first, supervisorLast: data.supervisor_last,
      requiredTraining: data.required_training.split(','), requiredPpe: data.required_ppe.split(','), signatures: data.signatures.split(','),
      lastUpdated: data.last_updated, dateReported: data.date_reported, steps: data.steps
    } as JobHazardDocument
  );
}

export async function getJobHazardDocumentForView(jhaId: string): Promise<Result<JobHazardDocument, JobHazardDocumentError>> {
  try {
    const fet = await fetch(`http://localhost:8000/api/jha/${jhaId}`);
    const resJson = await fet.json(); 
    const res = JSON.parse(resJson);
    const stepRes = await toJobHazardDocumentForView(res);
    return isOk(stepRes) ? toOk(stepRes) : new JobHazardDocumentError('Error fetching steps', 'bad-foreign-reference');
  } catch(e) {
    return new JobHazardDocumentError('Error fetching document', 'document-not-found');
  }
}

export async function toJobHazardDocumentForView(data: any): Promise<Result<JobHazardDocument, JobHazardDocumentError>> {
  const stepArr = await getSteps(data.steps.split(','));
  if (isErr(stepArr)) {
    return new JobHazardDocumentError('Error converting steps', 'bad-foreign-reference');
  }
  return (
    {
      uid: data.uid, title: data.title, company: data.company, activity: data.activity, department: data.department,
      authorFirst: data.author_first, authorLast: data.author_last, supervisorFirst: data.supervisor_first, supervisorLast: data.supervisor_last,
      requiredTraining: data.required_training.split(','), requiredPpe: data.required_ppe.split(','), signatures: data.signatures.split(','),
      lastUpdated: data.last_updated, dateReported: data.date_reported, steps: stepArr
    } as JobHazardDocument
  );
}
