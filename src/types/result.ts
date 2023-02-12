/**
 * AUTHOR CREDIT -- Jordan Seiler
 * 
 * A fellow Radford alumn and former colleague.
 * 
 */

/**
 * Result<T, E> is a generic union type of two variants. A result
 * is either "Ok" (and of type T) or "Err" (and of type E).
 * 
 * Result is deliberately designed to make you check whether the value is
 * Ok or Err before you can use it.
 * 
 */
export type Result<T, E extends Error> = NonNullable<T> | E;

export function isErr<T, E extends Error>(R: Result<T, E>): boolean {
  return R instanceof Error;
}

export function isOk<T, E extends Error>(R: Result<T, E>): boolean {
  return !isErr(R);
}

/**
 * "unwraps" the Result with the expectation it is Ok, returning inner value
 * @param R the result to unwrap
 * @returns the inner value
 * @throws if R is Err
 */
export function toOk<T, E extends Error>(R: Result<T, E>): T {
  // Using isOk would be great here but TS can't figure out the types
  if (!(R instanceof Error)) {
    return R;
  } else {
    throw R;
  }
}

/**
 * @param R the result to unwrap
 * @param ifErr the value to return if R is Err
 * @returns the inner value if R is Ok, or the provided default value
 */
export function toOkOr<T, E extends Error>(R: Result<T, E>, ifErr: T): T {
  if (!(R instanceof Error)) {
    return R;
  } else {
    return ifErr;
  }
}

/**
 * "unwraps" the Result with the expectation it is Err, returning the inner value 
 * @param R the result to unwrap
 * @returns the inner error
 * @throws if R is Ok
 */
export function toErr<T, E extends Error>(R: Result<T, E>): E {
  if (R instanceof Error) {
    return R;
  } else {
    throw new Error('Unwrap Err on Ok');
  }
}