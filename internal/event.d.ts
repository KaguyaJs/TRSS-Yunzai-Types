/** 
 * 将字符串 S 按照分隔符 D 分割成段数组。
 * 如果分隔符 D 默认为点（'.'），则将字符串分割为段。
 * @example
 * type Result = Split<'a.b.c'>; // ['a', 'b', 'c']
 * type Result2 = Split<'a-b-c', '-'>; // ['a', 'b', 'c']
 */
type Split<S extends string, D extends string = '.'> =
  S extends '' ? [] :
  S extends `${infer H}${D}${infer T}` ? [H, ...Split<T, D>] : [S];

/** 
 * 根据给定的模式段数组（P）和关键字段数组（K），逐段匹配。如果某个段是 '*'，则匹配任意单段。
 * 返回匹配结果，`true` 或 `false`。
 * @example 
 * type Match = MatchesSegments<['a', '*', 'c'], ['a', 'b', 'c']>; // true
 * type Match2 = MatchesSegments<['a', 'b'], ['a', 'c']>; // false
 */
type MatchesSegments<
  P extends readonly string[],
  K extends readonly string[]
> =
  P extends [infer PH extends string, ...infer PR extends string[]]
    ? K extends [infer KH extends string, ...infer KR extends string[]]
      ? PH extends '*' ? MatchesSegments<PR, KR> : (PH extends KH ? MatchesSegments<PR, KR> : false)
      : false
    : K extends [] ? true : false;

/** 
 * 如果模式 P 是单独的星号 ('*')，则匹配所有的键。如果不是星号，则逐段比较模式和关键字，要求两者段数一致。
 * @example 
 * type Match = MatchesPattern<'a.*.c', 'a.b.c'>; // true
 * type Match2 = MatchesPattern<'a.*.d', 'a.b.c'>; // false
 */
type MatchesPattern<P extends string, K extends string> =
  P extends '*' ? true : (MatchesSegments<Split<P>, Split<K>> extends true ? true : false);

/** 
 * 返回事件映射（EventMap）中所有与模式 P 匹配的键（key）组成的联合类型。
 * @example 
 * type M = { 'a.b.c': string, 'a.d.e': number };
 * type Keys = KeysMatching<M, 'a.*.c'>; // 'a.b.c'
 */
type KeysMatching<M extends Record<string, any>, P extends string> = {
  [K in keyof M & string]: P extends string ? (MatchesPattern<P, K> extends true ? K : never) : never
}[keyof M & string];

/** 
 * 根据模式 P 提取事件映射 M 中匹配到的键的参数类型（即第一个参数的类型）。
 * @example 
 * type M = { 'a.b.c': (x: number) => void, 'a.d.e': (x: string) => void };
 * type Params = EventParamUnion<M, 'a.*.c'>; // number
 */
export type EventParamUnion<M extends Record<string, any>, P extends string> =
  KeysMatching<M, P> extends infer K ? (K extends string ? Parameters<M[K]>[0] : never) : never;

/** 
 * 将段数组重新拼接成字符串，以点（'.'）为分隔符。
 * @example 
 * type JoinResult = Join<['a', 'b', 'c']>; // 'a.b.c'
 */
type Join<T extends readonly string[]> =
  T extends [] ? '' :
  T extends [infer F extends string, ...infer R extends string[]]
    ? R['length'] extends 0 ? F : `${F}.${Join<R>}`
    : string;

/** 
 * 判断一个类型是否为联合类型（即该类型包含至少两个不同的成员）。
 * @example 
 * type IsUnionResult = IsUnion<'a' | 'b'>; // true
 * type IsUnionResult2 = IsUnion<'a'>; // false
 */
type IsUnion<T, U = T> = T extends any ? ([U] extends [T] ? false : true) : never;

/** 
 * 将一个字符串类型（U）转换为由所有原始路径拆分成段的联合类型。
 * @example 
 * type Tuples = TuplesOf<'a.b.c' | 'd.e'>; // ['a', 'b', 'c'] | ['d', 'e']
 */
type TuplesOf<U extends string> = U extends string ? Split<U> : never;

/** 
 * 判断一个模式（Pattern）能否匹配一个原始路径（Orig）。
 * 模式中的每一段与原始路径中的段逐一匹配，星号 ('*') 匹配任意单段。
 * @example 
 * type Match = Matches<['a', '*', 'c'], ['a', 'b', 'c']>; // true
 * type Match2 = Matches<['a', 'b'], ['a', 'c']>; // false
 */
type Matches<
  Pattern extends readonly string[],
  Orig extends readonly string[]
> = Pattern extends [infer PH extends string, ...infer PR extends string[]]
  ? Orig extends [infer OH extends string, ...infer OR extends string[]]
    ? PH extends '*' ? Matches<PR, OR> : (PH extends OH ? Matches<PR, OR> : false)
  : false
  : Orig extends [] ? true : false;

/** 
 * 从一个段数组（Segs）生成所有可能的模式变体，每个段可以是原始段或者是通配符 ('*')。
 * @example 
 * type Variants = BuildVariantsFromTuple<['a', 'b']>; // ['a', 'b'] | ['a', '*']
 */
type BuildVariantsFromTuple<
  Segs extends readonly string[],
  Acc extends readonly string[] = []
> = Segs extends [infer F extends string, ...infer R extends string[]]
  ? BuildVariantsFromTuple<R, [...Acc, F]> | BuildVariantsFromTuple<R, [...Acc, '*']>
  : Acc;

/** 
 * 对所有原始路径的并集生成候选模式（pattern）的并集，其中每个段可以替换为原始段或通配符 ('*')。
 * @example 
 * type CandidatePatterns = CandidatePatternsFromUnion<'a.b.c' | 'd.e'>; // ['a.b.c', 'a.*', '*.c', '*.b.c']
 */
type CandidatePatternsFromUnion<U extends string> =
  TuplesOf<U> extends infer T ? (T extends readonly string[] ? BuildVariantsFromTuple<T> : never) : never;

/** 
 * 给定一个模式（Pattern）和原始路径的联合（TuplesUnion），返回所有匹配该模式的原始路径的并集。
 * @example 
 * type MatchesResult = MatchesUnionForPattern<['a', '*'], 'a.b' | 'a.c'>; // ['a.b', 'a.c']
 */
type MatchesUnionForPattern<
  Pattern extends readonly string[],
  U extends string
> = TuplesOf<U> extends infer T ? (T extends readonly string[] ? (Matches<Pattern, T> extends true ? T : never) : never) : never;

/** 
 * 如果模式（Pattern）能够匹配至少两个不同的原始路径，则返回拼接后的模式字符串。
 * 否则返回 `never`。
 * @example 
 * type FilteredPattern = FilteredPatternToStringIfMeaningful<['a', '*'], 'a.b' | 'a.c'>; // 'a.*'
 */
type FilteredPatternToStringIfMeaningful<
  P extends readonly string[],
  U extends string
> = IsUnion<MatchesUnionForPattern<P, U>> extends true ? Join<P> : never;

/** 
 * 对于输入的原始路径联合（U），生成：
 * 1. 原始路径本身（U）。
 * 2. 只有在匹配 >=2 条原始路径时，才包含有意义的通配符模式（*）。
 * 3. 仅当原始路径集合有 >=2 条时，才包括单独的星号模式 ('*')。
 * @example 
 * type Expanded = ExpandMeaningfulAnyStars<'a.b.c' | 'a.b.d'>; // 'a.b.c' | 'a.*' | '*'
 */
export type ExpandMeaningfulAnyStars<U extends string> =
  U
  | (CandidatePatternsFromUnion<U> extends infer P ? (P extends readonly string[] ? FilteredPatternToStringIfMeaningful<P, U> : never) : never)
  | (IsUnion<TuplesOf<U>> extends true ? '*' : never);
