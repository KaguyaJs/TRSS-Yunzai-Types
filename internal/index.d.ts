/** 
 * 将类型 A 与类型 B 进行合并，B 的属性会覆盖 A 中相同的属性。
 * @example 
 * type A = { foo: string, bar: number };
 * type B = { bar: string, baz: boolean };
 * type C = Merge<A, B>; // { foo: string, bar: string, baz: boolean }
 */
export type Merge<A, B> = Omit<A, keyof B> & B;

/** 
 * 将 A 的属性转为可选之后与 B 合并，B 的属性会覆盖 A 中相同的属性。
 * @example 
 * type A = { foo: string, bar: number };
 * type B = { bar: string, baz: boolean };
 * type C = MergeOpt<A, B>; // { foo?: string, bar: string, baz: boolean }
 */
export type MergeOpt<A, B> = Merge<Partial<A>, B>;

/**
 * 将 T 中的 K 属性转化为可选
 */
export type Optional<T, K extends keyof T> =
  Omit<T, K> & Partial<Pick<T, K>>

/** 
 * 表示一个不返回值的函数类型，通常用于清理、释放资源等操作。
 * @returns 返回一个布尔值或不返回值，表示操作的成功或失败。
 */
export type Dispose = () => boolean | void;

/** 
 * 为类型 T 添加 Dispose 方法，表示该类型具有清理或释放资源的能力。
 * @example 
 * type MyType = { prop: string } & Dispose;
 */
export type ToDispose<T> = T & Dispose;

/** 
 * 匹配函数类型，接受任意数量的参数，返回一个布尔值。
 * 用于自定义的匹配逻辑，可以是普通函数、正则表达式等。
 * @param args - 匹配所需的参数。
 * @returns 如果匹配成功则返回 true，否则返回 false。
 */
export type MatcherFn = (...args: any[]) => boolean;

/** 
 * 表示匹配器类型，可以是字符串、符号、正则表达式或自定义匹配函数。
 * 用于进行条件匹配。
 */
export type Matcher = string | symbol | RegExp | MatcherFn;

/** 
 * 表示一个可记录的对象类型，键是字符串，值可以是任何类型。
 * @example 
 * type MyRecord = Recordable<number>; // { [key: string]: number }
 */
export type Recordable<T = any> = Record<string, T>;

/** 
 * 将两个字符串 K 和 P 合并成一个字符串，中间用点（.）分隔。
 * @example 
 * type A = Join<'a', 'b'>; // 'a.b'
 */
export type Join<K extends string, P extends string> =
  P extends "" ? K : `${K}.${P}`;

/** 
 * 获取对象 T 中所有属性路径的联合类型（递归），如果是数组类型则不处理。
 * 适用于提取对象的深层属性路径。
 * @example 
 * type Paths = ObjectPaths<{ a: { b: { c: number } } }>; // 'a.b.c'
 */
export type ObjectPaths<T> =
  T extends readonly any[] 
    ? never 
    : {
        [K in keyof T & string]:
          T[K] extends readonly any[] 
            ? K 
            : T[K] extends object 
              ? Join<K, ObjectPaths<T[K]>>
              : K
      }[keyof T & string];

/** 
 * 根据路径字符串 P 获取对象 T 中对应路径的值类型（递归）。
 * @example 
 * type Value = PathValue<{ a: { b: { c: number } } }, 'a.b.c'>; // number
 */
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
      : never;

/** 
 * 将对象 T 的所有属性路径展平成一个以路径为键、属性值为值的对象类型。
 * 生成的路径是以点（.）分隔的字符串。
 * @example 
 * type Flattened = PathRecord<{ a: { b: number, c: string } }>; 
 * // { 'a.b': number, 'a.c': string }
 */
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
}[keyof T & string];

/** 
 * 移植自 ant-design-vue，供 Guoba 组件类型使用
 */
export type { RuleObject, VNodeLike } from './rule.d.ts';

/** 
 * 事件类型工具
 */
export type * as EventTool  from './event.d.ts';
