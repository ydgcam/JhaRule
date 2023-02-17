import { Hazard } from './hazard'
/**
 * Type definition for a Step
 * 
 * contains unique identifieres, 
 * sequential order relative to the job it pertains to,
 * descriptions about work involved in this step, 
 * as well as a list of Hazards for this step. 
 */
export type Step = {
  uid: string, 
  jhaId: string, 
  stepNum: number, 
  title: string, 
  description: string,
  hazards: Hazard[]
};

export type StepData = {
  uid: string, 
  jha_id: string, 
  step_num: number, 
  title: string, 
  description: string,
};