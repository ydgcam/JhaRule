import { Step } from "./step"; 

/**
 * Type definition for a Job Hazard Analysis document
 * Contains general metadata as well as a list of Step objects.
 */
export type JobHazardDocument = {
  uid: string, 
  title: string, 
  company: string, 
  activity: string, 
  department: string,
  author: string, 
  supervisor: string,
  requiredTraining: string[], 
  requiredPpe: string[], 
  signatures: string[],
  lastUpdated: Date, 
  dateReported: Date,
  steps: Step[]
}