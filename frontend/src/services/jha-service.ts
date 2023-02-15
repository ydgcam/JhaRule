import { JobHazardDocument } from '../types/jha';
import { isErr, isOk, Result, toErr, toOk } from '../types/result';
import { JobHazardDocumentError } from '../types/errors';
import { fetchStepsForDocument } from './step-service';
import axios from 'axios';
import { Step } from '../types/step';

/**
 * Fetches all JobHazardDocument instances in database mapped to steps converted to front-end context
 * @param noSteps true if no steps are desired
 */
export async function fetchAllDocuments(): Promise<Result<JobHazardDocument[], JobHazardDocumentError>> {
  const ans: JobHazardDocument[] = [];
  try {
    const docs = await axios.get('/jha/');
    for (const obj of docs.data) {
      const doc = await fetchDocument(obj);
      if (isErr(doc)) { 
        return toErr(doc);
      }
      ans.push(toOk(doc));
    }
    return ans;
  } catch (e) {
    return new JobHazardDocumentError('fetchAllDocuments', 'document-not-found');
  }
}

export async function fetchDocument(jha: any): Promise<Result<JobHazardDocument, JobHazardDocumentError>> {
  const stepData = await fetchStepsForDocument(jha.uid);
  return isOk(stepData) ? convert(jha, toOk(stepData)) : toErr(stepData);
}

function convert(data: any, steps: Step[]): JobHazardDocument {
  const update: Date = new Date(data.last_updated)
  const reported: Date = new Date(data.date_reported)
  const training: string[] = data.required_training === null ? [] : data.required_training;
  const ppe: string[] = data.required_ppe === null ? [] : data.required_ppe;
  const sigs: string[] = data.signatures === null ? [] : data.signatures;
  return {
    uid: data.uid, 
    title: data.title, 
    company: data.company, 
    activity: data.activity, 
    department: data.department,
    author: data.author, 
    supervisor: data.supervisor, 
    lastUpdated: update, 
    dateReported: reported,
    requiredTraining: training, 
    requiredPpe: ppe, 
    signatures: sigs,
    steps: steps
  };
}
