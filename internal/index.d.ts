export type Merge<A, B> = Omit<A, keyof B> & B

export type MergeOpt<A, B> = Merge<Partial<A>, B>

export type Dispose = () => boolean | void;
export type ToDispose<T> = T & Dispose;

export type MatcherFn = (...args: any[]) => boolean;
export type Matcher = string | symbol | RegExp | MatcherFn;