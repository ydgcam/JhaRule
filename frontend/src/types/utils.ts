/**
 * Houses general common utility functions 
 */
export class StringFunctions {

  //Python-esque methods
  static alpha(str: string): string | false { return /[a-zA-Z]/.test(str) && str.replaceAll(/^[a-zA-Z]/, ''); }
  static alnum(str: string): string | false { return /[a-zA-Z0-9]/.test(str) && str.replaceAll(/^[a-zA-Z0-9]/, ''); }
  static alphaSpace(str: string): string | false { return /[a-zA-Z ]/.test(str) && str.replaceAll(/^[a-zA-Z ]/, ''); }
  static alnumSpace(str: string): string | false { return /[a-zA-Z0-9 ]/.test(str) && str.replaceAll(/^[a-zA-Z0-9 ]/, ''); }
  static alnumSpecial(str: string): string | false { return /[a-zA-Z0-9/!+=-?$: ]/.test(str) && str.replaceAll(/^[a-zA-Z0-9\d&/!+=-?$: ]/, ''); }

  //Name asserts
  static isTwoStrings(str: string): boolean { return /[a-zA-Z]+(?: [a-zA-Z]+)?$/.test(str); }
  static isValidName(str: string): boolean { return this.isTwoStrings(str) && str.trim().split(' ').length === 2; }  
  
  //Name formatting
  static formatName(str: string): string | false { return this.isValidName(str) && this.nameToInitial(str.trim().split(' ') as [string, string]); }
  static nameToInitial(name: [string, string]): string { return this.toInitial(name[0]) + ' ' + this.toInitial(name[1]); }
  static toInitial(str: string): string { return str.length <= 1 ? str ? str.toUpperCase() : str : str.charAt(0) + str.substring(1).toLowerCase(); }

}
