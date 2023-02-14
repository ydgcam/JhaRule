import { JhaFront, JobHazardDocument, JobHazardDocumentData } from '../types/jha';
import { isOk, Result, toErr, toOk } from '../types/result';
import { JobHazardDocumentError } from '../types/errors';
import { getStepsForDocument } from './step-service';
import axios from 'axios';
import { Step } from '../types/step';

/**
 * Needs work
 * @returns 
 */
export async function fetchAllDocuments(): 
  Promise<Result<JobHazardDocument[], JobHazardDocumentError>> {
    const ans: JobHazardDocument[] = [];
    try {
      const docs = await axios.get('/jha/');
      for (const obj of docs.data) {
        ans.push(convertToJha(obj));
      }
      return ans;
    } catch (e) {
      return new JobHazardDocumentError('fetchAllDocuments', 'document-not-found');
    }
}

export function convertToJha(data: any): JobHazardDocument {
  const update: Date = new Date(data.last_updated)
  const reported: Date = new Date(data.date_reported)
  return (
    {
      uid: data.uid, title: data.title, company: data.company, activity: data.activity, department: data.department,
      authorFirst: data.author_first, authorLast: data.author_last, supervisorFirst: data.supervisor_first, supervisorLast: data.supervisor_last,
      requiredTraining: data.required_training, requiredPpe: data.required_ppe, signatures: data.signatures,
      lastUpdated: update, dateReported: reported
    } as JobHazardDocumentData
  );
}

export function convertToJhaForView(data: JobHazardDocumentData, stps: Step[]): JobHazardDocument {
  const update: Date = new Date(data.lastUpdated)
  const reported: Date = new Date(data.dateReported)
  const training: string[] = data.requiredTraining === null ? [] : data.requiredTraining;
  const ppe: string[] = data.requiredPpe === null ? [] : data.requiredPpe;
  const sigs: string[] = data.signatures === null ? [] : data.signatures;
  return (
    {
      uid: data.uid, title: data.title, company: data.company, activity: data.activity, department: data.department,
      authorFirst: data.authorFirst, authorLast: data.authorLast, supervisorFirst: data.supervisorFirst, supervisorLast: data.supervisorLast,
      requiredTraining: training, requiredPpe: ppe, signatures: sigs,
      lastUpdated: update, dateReported: reported, steps: stps,
    } as JhaFront
  );
}

export async function getJobHazardDocumentForView(jha: JobHazardDocument): Promise<Result<JobHazardDocument, JobHazardDocumentError>> {
  const steps = await getStepsForDocument(jha.uid);
  return isOk(steps) ? convertToJhaForView(jha, toOk(steps)) : toErr(steps);
}
