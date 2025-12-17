export type Merge<A, B> = Omit<A, keyof B> & B

export type MergeOpt<A, B> = Merge<Partial<A>, B>

export type Dispose = () => boolean | void;
export type ToDispose<T> = T & Dispose;

export type MatcherFn = (...args: any[]) => boolean;
export type Matcher = string | symbol | RegExp | MatcherFn;
export type Recordable<T = any> = Record<string, T>;

export type Join<K extends string, P extends string> =
  P extends "" ? K : `${K}.${P}`

export type ObjectPaths<T> = {
  [K in keyof T & string]:
    T[K] extends object
      ? Join<K, ObjectPaths<T[K]>>
      : K
}[keyof T & string]


export type PathValue<
  T,
  P extends string
> =
  P extends `${infer K}.${infer Rest}`
    ? K extends keyof T
      ? PathValue<T[K], Rest>
      : never
    : P extends keyof T
      ? T[P]
      : never

export type PathRecord<T, Prefix extends string = ""> = {
  [K in keyof T & string]:
    T[K] extends object
      ? PathRecord<
          T[K],
          Prefix extends "" ? K : `${Prefix}.${K}`
        >
      : {
          [P in Prefix extends "" ? K : `${Prefix}.${K}`]: T[K]
        }
}[keyof T & string]

export type { RuleObject } from './rule.d.ts'