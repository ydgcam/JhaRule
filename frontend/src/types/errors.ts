export type ErrorCode = 
  'pw-mismatch' |
  'email-in-use' |
  'bad-foreign-reference' |
  'document-not-found' |
  'uniqueness-constraint-violated' | 
  'error-posting-to-db';

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

  export class JobHazardDocumentError extends CodedError {
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