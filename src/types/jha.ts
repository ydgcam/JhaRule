import { Step } from "./step"; 

/**
 * Type definition for a Job Hazard Analysis document
 * Contains general metadata as well as a list of Step objects.
 */
export type JobHazardDocument = JobHazardDocumentData; 
export interface JobHazardDocumentData {
  uid: string, 
  title: string, 
  author: string,
  dateRecorded: Date | string,
  datePosted: Date | string,
  steps: Step[],
};