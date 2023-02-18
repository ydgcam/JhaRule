import { JhaData, JhaJSON, NewJhaData } from '../types/jha';
import { isErr, isOk, Result, toErr, toOk } from '../types/result';
import { JobHazardAnalysisError } from '../types/errors';
import { fetchStepsForDocument } from './step-service';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { format, parseISO } from 'date-fns';
import { Step } from '../types/step';


export const createJha = async (jhaData: NewJhaData) => {
  const postData = newToJSON(jhaData);
  return axios({ 
    method: 'post', 
    url:'http://localhost:8000/jhas/', 
    data: {...postData}
  });
}

export const deleteJha = async (id: string) => { return axios.delete(`/jhas/${id}`); }

export const updateJha = async (jhaData: JhaData) => {
  const putData = toJSON(jhaData);
  return axios({ 
    method: 'put', 
    url:`http://localhost:8000/jhas/${putData.uid}/`, 
    data: {...putData}
  });
}
/**
 * Fetches all JhaData instances in database mapped to steps converted to front-end context
 * @param noSteps true if no steps are desired
 */
export async function fetchAllDocuments(): Promise<Result<JhaData[], JobHazardAnalysisError>> {
  const ans: JhaData[] = [];
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
    return new JobHazardAnalysisError('fetchAllDocuments', 'document-not-found');
  }
}

export async function fetchDocumentsBy<P extends keyof JhaJSON>(field: P, value: JhaJSON[P]): 
  Promise<Result<JhaData[], JobHazardAnalysisError>> {
  const ans: JhaData[] = [];
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
    return new JobHazardAnalysisError('fetchAllDocuments', 'document-not-found');
  }
}

export async function fetchDocumentById(jha: any): Promise<Result<JhaData, JobHazardAnalysisError>> {
  const stepData = await fetchStepsForDocument(jha.uid);
  return isOk(stepData) ? convertToJhaData(jha, toOk(stepData)) : toErr(stepData);
}

export function convertToJhaData(data: any, steps: Step[]): JhaData {
  return {
    uid: data.uid, 
    title: data.title, 
    company: data.company, 
    activity: data.activity, 
    author: data.author, 
    department: data.department || '',
    supervisor: data.supervisor || '', 
    date_reported: parseISO(data.date_reported),
    last_updated: parseISO(data.last_updated), 
    required_training: data.required_training ? Array.from(JSON.parse(data.required_training)) : [], 
    required_ppe: data.required_ppe ? Array.from(JSON.parse(data.required_ppe)) : [], 
    signatures: data.signatures ? Array.from(JSON.parse(data.signatures)) : [],
    steps: steps
  };
};

export function toJSON(data: JhaData): JhaJSON {
  return {
    uid: data.uid,
    title: data.title,
    company: data.company, 
    activity: data.activity, 
    department: data.department || null,
    author: data.author, 
    supervisor: data.supervisor || null, 
    date_reported: format(new Date(data.date_reported), 'Y-MM-dd'),
    required_training: data.required_training.length > 0 ? JSON.stringify(data.required_training) : null, 
    required_ppe: data.required_ppe.length > 0 ? JSON.stringify(data.required_ppe) : null,
    signatures: data.signatures.length > 0 ? JSON.stringify(data.signatures) : null
  };
}

export function newToJSON(data: NewJhaData): JhaJSON {
  return {
    uid: uuidv4(),
    title: data.title,
    company: data.company, 
    activity: data.activity, 
    department: data.department || null,
    author: data.author, 
    supervisor: data.supervisor || null, 
    date_reported: format(new Date(data.date_reported), 'Y-MM-dd'),
    required_training: data.required_training.length > 0 ? JSON.stringify(data.required_training) : null, 
    required_ppe: data.required_ppe.length > 0 ? JSON.stringify(data.required_ppe) : null,
    signatures: data.signatures.length > 0 ? JSON.stringify(data.signatures) : null
  };
}