import { Step } from "./step"; 

/**
 * Type definition for a Job Hazard Analysis document
 * Contains general metadata as well as a list of Step objects.
 */

export type JobHazardDocument = JobHazardDocumentDataForView | JobHazardDocumentDataFromDb;

interface JobHazardDocumentDataBase {
  title: string, company: string, activity: string, department: string,
  authorFirst: string, authorLast: string, supervisorFirst: string, supervisorLast: string
}

export interface JobHazardDocumentDataFromDb extends JobHazardDocumentDataBase {
  requiredTraining: string, requiredPpe: string, signatures: string, 
  uid: string, lastUpdated: string, dateReported: string,
  steps: string
}

export interface JobHazardDocumentDataForView extends JobHazardDocumentDataBase {
  requiredTraining: string[], requiredPpe: string[], signatures: string[],
  lastUpdated: string, dateReported: string,
  steps: Step[]
}