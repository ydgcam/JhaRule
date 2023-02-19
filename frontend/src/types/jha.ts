import { Step } from "./step"; 

/**
 * Type definition for a Job Hazard Analysis Document
 */
export type JobHazardAnalysis = JhaFE | JhaBE;
export type NewJhaData = Omit<JhaFE, 'uid' | 'steps' | 'last_updated'>;

interface JhaBase {
  uid: string, 
  title: string, 
  company: string, 
  activity: string, 
  author: string, 
  signatures: string | string[] | null,
  department: string | null,
  supervisor: string | null,
  required_training: string | string[] | null,
  required_ppe: string | string[] | null,
  date_reported: Date | string,
};

//All possible data within a JobHazardDocument instance
export interface JhaFE extends JhaBase {
  department: string,
  supervisor: string,
  date_reported: Date,
  last_updated: Date,
  required_training: string[], 
  required_ppe: string[],
  signatures: string[],
  steps: Step[]
};

//Data that can be sent to backend
export interface JhaBE extends JhaBase {
  date_reported: string,
  required_training: string | null, 
  required_ppe: string | null, 
  signatures: string | null, 
};