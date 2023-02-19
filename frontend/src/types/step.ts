import { Hazard } from './hazard'
import { IntRange } from './utils';

/**
 * @see utils.IntRange
 */
type StepNum = IntRange<1, 26>; 

export type Step = StepBE | StepFE; 
export interface StepBE extends StepBase { step_num: number, photo: File | null }
export interface StepFE extends StepBase { step_num: StepNum, hazards: Hazard[] };

export type NewStepData = Omit<StepFE, 'hazards' | 'uid'>;

//Extended and applied by child interfaces
interface StepBase {
  uid: string, //PK
  jha_id: string, //FK
  step_num: StepNum | number,
  title: string, 
  description: string | null,
  photo: File | string | null
};