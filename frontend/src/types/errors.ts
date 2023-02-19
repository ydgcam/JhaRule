export type ErrorCode = 
  'uniqueness-constraint-violated' |
  'get-request-error-hazard' |
  'get-request-error-step' | 
  'get-request-error-jha' |
  'post-request-error-jha' |
  'post-request-error-step' |
  'post-request-error-hazard' |
  'put-request-error-jha' |
  'put-request-error-hazard' |
  'put-request-error-step' |
  'delete-request-error-jha' |
  'delete-request-error-step' |
  'delete-request-error-hazard';

  export class CodedError extends Error {
    code: ErrorCode;

    constructor(message: string, code: ErrorCode) {
      super(message);
      this.message =  message;
      this.code = code;
    }
  }

  interface CodedErrorConstructor<T extends CodedError> {
    new (message: string, code: ErrorCode) : T;
  }

  export class JobHazardAnalysisError extends CodedError {
    constructor(message: string, code: ErrorCode) {
      super(message, code);
      this.name = 'JobHazardDocumentError';
    }
  }

  export class StepError extends CodedError {
    constructor(message: string, code: ErrorCode) {
      super(message, code);
      this.name = 'StepError';
    }
  }

  export class HazardError extends CodedError {
    constructor(message: string, code: ErrorCode) {
      super(message, code);
      this.name = 'HazardError';
    }
  }