import { Hazard } from './hazard'
import { IntRange } from './utils';

/**
 * @see utils.IntRange
 */
export type StepNum = IntRange<1, 26>; 

export type Step = StepBE | StepFE; 
export interface StepBE extends StepBase { 
  step_num: number,
  photo?: File | string
}
export interface StepFE extends StepBase { 
  photo: File | string
  step_num: StepNum, 
  hazards: Hazard[] 
};

export type NewStepData = Omit<StepFE, 'hazards' | 'uid' | 'photo'>;

//Extended and applied by child interfaces
interface StepBase {
  uid: string, //PK
  jha_id: string, //FK
  step_num: StepNum | number,
  title: string, 
  description: string | null,
};