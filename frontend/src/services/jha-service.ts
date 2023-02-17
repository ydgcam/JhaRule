import { JobHazardDocument, JobHazardDocumentData } from '../types/jha';
import { isErr, isOk, Result, toErr, toOk } from '../types/result';
import { JobHazardDocumentError } from '../types/errors';
import { fetchStepsForDocument } from './step-service';
import axios from 'axios';
import { parseISO, parseJSON } from 'date-fns';
import { Step } from '../types/step';

export async function createJobHazardDocument(jhaData: JobHazardDocumentData): Promise<Result<void, JobHazardDocumentError>> {
  try {
    await axios.post(`/jhas/`, jhaData);
  } catch(e) {
    return new JobHazardDocumentError('createJobHazardDocument', 'error-posting-to-db');
  }
}

export async function deleteJobHazardDocument(id: string): Promise<Result<void, JobHazardDocumentError>> {
  try {
    await axios.delete(`/jhas/${id}`);
  } catch(e) {
    return new JobHazardDocumentError('deleteJobHazardDocument', 'error-posting-to-db');
  }
}

export async function updateJobHazardDocument(jhaData: JobHazardDocumentData): Promise<Result<void, JobHazardDocumentError>> {
  try {
    await axios.put(`/jhas/${jhaData.uid}`, jhaData);
  } catch(e) {
    return new JobHazardDocumentError('updateJobHazardDocument', 'error-posting-to-db');
  }
}
/**
 * Fetches all JobHazardDocument instances in database mapped to steps converted to front-end context
 * @param noSteps true if no steps are desired
 */
export async function fetchAllDocuments(): Promise<Result<JobHazardDocument[], JobHazardDocumentError>> {
  const ans: JobHazardDocument[] = [];
  try {
    const docs = await axios.get('/jhas/');
    for (const obj of docs.data) {
      const doc = await fetchDocumentById(obj);
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

export async function fetchDocumentsBy<P extends keyof JobHazardDocumentData>(field: P, value: JobHazardDocumentData[P]): 
  Promise<Result<JobHazardDocument[], JobHazardDocumentError>> {
  const ans: JobHazardDocument[] = [];
  try {
    const docs = await axios.get(`/jhas/${field.toString()}/${value}`);
    for (const obj of docs.data) {
      const doc = await fetchDocumentById(obj);
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

export async function fetchDocumentById(jha: any): Promise<Result<JobHazardDocument, JobHazardDocumentError>> {
  const stepData = await fetchStepsForDocument(jha.uid);
  return isOk(stepData) ? convertToJobHazardDocument(jha, toOk(stepData)) : toErr(stepData);
}

export function convertToJobHazardDocument(data: any, steps: Step[]): JobHazardDocument {
  return {
    uid: data.uid, 
    title: data.title, 
    company: data.company, 
    activity: data.activity, 
    department: data.department || '',
    author: data.author, 
    supervisor: data.supervisor || '', 
    lastUpdated: parseISO(data.last_updated), 
    dateReported: parseISO(data.date_reported),
    requiredTraining: data.required_training || [], 
    requiredPpe: data.required_ppe || [], 
    signatures: data.signatures || [],
    steps: steps
  };
};

export function convertToJobHazardDocumentData(data: JobHazardDocument): JobHazardDocumentData {
  return {
    uid: data.uid, 
    title: data.title, 
    company: data.company, 
    activity: data.activity, 
    department: data.department || null,
    author: data.author, 
    supervisor: data.supervisor || null, 
    date_reported: data.dateReported,
    required_training: data.requiredTraining || null, 
    required_ppe: data.requiredPpe || null,
    signatures: data.signatures || null,
  };
};