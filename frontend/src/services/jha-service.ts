import { JhaFE, JhaBE, NewJhaData } from '../types/jha';
import { isErr, isOk, Result, toErr, toOk } from '../types/result';
import { JobHazardAnalysisError } from '../types/errors';
import { readStepsForJha } from './step-service';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { format, parseISO } from 'date-fns';
import { StepFE } from '../types/step';

export const createJha = async (data: NewJhaData, callback?: () => unknown): Promise<Result<void, JobHazardAnalysisError>> => {
  const postData = newToJhaDb(data);
  axios({ method: 'post', url:'jhas/', data: {...postData}})
  .then(() => { if (callback) { callback(); } })
  .catch((e) => { return new JobHazardAnalysisError(e, 'post-request-error-jha')});
}

export async function readAll(): Promise<Result<JhaFE[], JobHazardAnalysisError>> {
  const ans: JhaFE[] = [];
  try {
    const ids = await axios.get('/jhas/uids');
    for (const id of ids.data) {
      const doc = await read(id);
      if (isErr(doc))
        return toErr(doc);
      ans.push(toOk(doc));
    }
    return ans;
  } catch (e) {
    return new JobHazardAnalysisError('readAll', 'get-request-error-jha');
  }
}

export const updateJha = async (data: JhaFE, callback?: () => unknown): Promise<Result<void, JobHazardAnalysisError>> => {
  const postData = toJhaDb(data);
  axios({ method: 'put', url:`/jhas/${data.uid}/`, data: {...postData}})
  .then(() => { if (callback) { callback(); } })
  .catch((e) => { console.log(e); return new JobHazardAnalysisError(e, 'put-request-error-jha')});
}

export const deleteJha = async (id: string, callback?: () => unknown): Promise<Result<void, JobHazardAnalysisError>> => { 
  axios.delete(`/jhas/${id}/`)
  .then(() => { if (callback) { callback(); } })
  .catch((e) => { return new JobHazardAnalysisError(e, 'delete-request-error-jha'); })
}

export async function queryJhasBy<P extends keyof JhaBE>(field: P, value: JhaBE[P]): 
  Promise<Result<JhaFE[], JobHazardAnalysisError>> {
  const ans: JhaFE[] = [];
  try {
    const docs = await axios.get(`/jhas/${field}/${value}`);
    for (const obj of docs.data) {
      const doc = await convert(obj);
      if (isErr(doc))
        return toErr(doc);
      ans.push(toOk(doc));
    }
    return ans.length !== 0 ? ans : new JobHazardAnalysisError('No Jhas found in query', 'get-request-error-jha');
  } catch (e) {
    return new JobHazardAnalysisError('queryJhas', 'get-request-error-jha');
  }
}

export function toJhaDb(data: JhaFE): JhaBE {
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

export function newToJhaDb(data: NewJhaData): JhaBE {
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

async function read(id: string): Promise<Result<JhaFE, JobHazardAnalysisError>> {
  const res = await queryJhasBy('uid', id);
  if (isErr(res))
    return toErr(res); 
  else if (toOk(res).length > 1)
    return new JobHazardAnalysisError('DUPLICATE JHA UIDS', 'uniqueness-constraint-violated'); 
  else
    return toOk(res)[0];
}

async function convert(jha: JhaBE): Promise<Result<JhaFE, JobHazardAnalysisError>> {
  const stepData = await readStepsForJha(jha.uid);
  return isOk(stepData) ? toJha(jha, toOk(stepData)) : toErr(stepData) as JobHazardAnalysisError;
}

function toJha(data: any, steps: StepFE[]): JhaFE {
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