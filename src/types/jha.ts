import Step from "./step"; 

export interface JHA {
  UID: string, 
  JobTaskTitle: string, 
  Author: string,
  Company: string,
  Occupation: string,
  DateRecorded: Date,
  DatePosted: Date,
  JobTaskSteps: Step[], 
}