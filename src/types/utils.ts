/**
 * Houses general common utility functions 
 */

export class StringFunctions {

  static toInital(str: string): string {
    return str.charAt(0) + str.substring(1).toLowerCase();
  }

  static toAlphaUpper(str: string): string {
    return str.replaceAll(/[^a-zA-Z\d:]/, '').toUpperCase();
  }

  static toUpperAndSpecial(str: string): string {
    return str.replaceAll(/[^a-zA-Z\d\s.&-/!$:]/, '').toUpperCase();
  }

  static trimTrailingAndLeading(str: string): string {
    return str.trimStart().trimEnd();
  }
}
