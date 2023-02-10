export type ErrorCode = 
  'pw-mismatch' |
  'email-in-use' |
  'bad-foreign-reference' |
  'document-not-found' |
  'uniqueness-constraint-violated';

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