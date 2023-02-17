import { parseJSON, format } from "date-fns";
import { Step } from "./step"; 

/**
 * Type definition for a Job Hazard Analysis document
 * Contains general metadata as well as a list of Step objects.
 */

export type JHA = JobHazardDocument | JobHazardDocumentData;

interface JobHazardDocumentBase {
  uid: string, 
  title: string, 
  company: string, 
  activity: string, 
  department: string | null,
  author: string, 
  supervisor: string | null,
  signatures: string[] | null,
};

export interface JobHazardDocument extends JobHazardDocumentBase {
  department: string,
  supervisor: string,
  lastUpdated: Date, 
  dateReported: Date,
  requiredTraining: string[], 
  requiredPpe: string[], 
  signatures: string[],
  steps: Step[]
};

export interface JobHazardDocumentData extends JobHazardDocumentBase {
  date_reported: Date,
  required_training: string[] | null, 
  required_ppe: string[] | null
};