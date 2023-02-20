/**
 * Datatype definition for a Job Hazard
 * 
 * A Hazard is a Job Hazard within a Step of a Job Hazard Analysis
 * 
 * stepId - the id of the step this hazard belongs to
 * risk - the risk description of this hazard
 * control - way to mitigate or prevent such risk 
 */
export type Hazard = {
  uid: string, 
  step_id: string, 
  title: string,
  risk: string,
  control: string,
}