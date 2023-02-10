import { Step } from "./step"; 
import { CodedError, ErrorCode } from '../types/errors';

/**
 * Type definition for a Job Hazard Analysis document
 * Contains general metadata as well as a list of Step objects.
 */
export type JobHazardDocument = JobHazardDocumentData; 
export interface JobHazardDocumentData {
  uid: string, 
  title: string, 
  author: string,
  dateRecorded: Date,
  datePosted: Date,
  steps: Step[],
};

export class JobHazardDocumentError extends CodedError {
  constructor(message: string, code: ErrorCode) {
    super(message, code);
    this.name = 'JobHazardDocumentError';
  }
}