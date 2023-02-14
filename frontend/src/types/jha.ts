import { Step } from "./step"; 

/**
 * Type definition for a Job Hazard Analysis document
 * Contains general metadata as well as a list of Step objects.
 */

export type JobHazardDocument = JobHazardDocumentData | JhaFront;

interface JobHazardDocumentData {
  uid: string, 
  title: string, 
  company: string, 
  activity: string, 
  department: string,
  authorFirst: string, 
  authorLast: string, 
  supervisorFirst: string, 
  supervisorLast: string,
  requiredTraining: null | string[], 
  requiredPpe: null | string[], 
  signatures: null | string[],
  lastUpdated: Date, 
  dateReported: Date,
}

export interface JhaFront extends JobHazardDocumentData {
  requiredTraining: string[], 
  requiredPpe: string[], 
  signatures: string[],
  steps: Step[]
}