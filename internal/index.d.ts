export type Merge<A, B> = Omit<A, keyof B> & B

export type MergeOpt<A, B> = Merge<Partial<A>, B>

export type Dispose = () => boolean | void;
export type ToDispose<T> = T & Dispose;

export type MatcherFn = (...args: any[]) => boolean;
export type Matcher = string | symbol | RegExp | MatcherFn;

export type Join<K extends string, P extends string> =
  P extends "" ? K : `${K}.${P}`

export type ObjectPaths<T> = {
  [K in keyof T & string]:
    T[K] extends object
      ? Join<K, ObjectPaths<T[K]>>
      : K
}[keyof T & string]

export type Recordable<T = any> = Record<string, T>;


export type { RuleObject } from './rule.d.ts'