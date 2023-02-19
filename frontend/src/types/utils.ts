
/**
 * Tail recursive evaluation of conditional number values... 
 * Enumerated type for a later specified range of numbers! 
 * 
 * Allows us to type-check that a number is within a given range 
 * without having to hardcode a Union of number values :)
 */
type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>

export type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>

/**
 * Houses general common utility functions 
 */
export abstract class StringFunctions {
  public static alpha(str: string): string | true { return /[a-zA-Z]/.test(str) || str.replaceAll(/^[a-zA-Z]/, ''); }
  public static alphaList(str: string): string | true { return /[a-zA-Z, ]/.test(str) || str.replaceAll(/^[a-zA-Z, ]/, ''); }
  public static alnum(str: string): string | true { return /[a-zA-Z0-9]/.test(str) || str.replaceAll(/^[a-zA-Z0-9]/, ''); }
  public static alnumList(str: string): string | true { return /[a-zA-Z0-9, ]/.test(str) || str.replaceAll(/^[a-zA-Z0-9, ]/, ''); }

  public static allowedSpecials = (): string => { return '!()-.+=?{}_^`~:;*@#$!%&'; }
  public static specials(str: string): string | true { return /[a-zA-Z0-9!()-.+=?{}_^`~:;*@#$!%&]/.test(str) || str.replaceAll(/^[a-zA-Z0-9!()-.+=?{}_^`~:;*@#$!%&]/, ''); }
  
  public static isTwoStrings(str: string): boolean { return /[a-zA-Z]+(?: [a-zA-Z]+)?$/.test(str); }
  public static isValidName(str: string): boolean { return StringFunctions.isTwoStrings(str) && str.trim().split(' ').length === 2; }
  public static formatName(str: string): string | false { 
    return (
      (str !== undefined && str !== null) &&
      (StringFunctions.isValidName(str)) && 
      (StringFunctions.nameToInitial(str.trim().split(' ') as [string, string]))
    );
  }
  public static nameToInitial(name: [string, string]): string { return StringFunctions.toInitial(name[0]) + ' ' + StringFunctions.toInitial(name[1]); }
  public static toInitial(str: string): string { return str && str.length <= 1 ? str.toUpperCase() : str && str.charAt(0) + str.substring(1).toLowerCase(); }
}