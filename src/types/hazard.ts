/**
 * Type definition for a Job Hazard
 * contains unique identifiers for it's corresponding JobHazardDocument and respective Step it belongs to
 * as well as a description of the risk involved and the proper control techniques. 
 */
export type Hazard = JobStepHazard; 
export interface JobStepHazard {
  uid: string, 
  stepId: string,
  jhaId: string, 
  risk: string,
  control: string,
};