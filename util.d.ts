import type { Stats, StatOptions, MakeDirectoryOptions, RmOptions, GlobOptions } from "node:fs"
import type { ChildProcess } from "child_process"
import type { Level } from "level"

export interface ExecResult {
  error: Error | null
  stdout: string
  stderr: string
  raw: { stdout: Buffer; stderr: Buffer }
}

export interface DownloadResult {
  url: string
  file: string
  buffer: Buffer | string
}

export interface FileTypeResult {
  url?: string
  name: string
  buffer?: Buffer | string
  type?: { ext?: string; mime?: string }
  md5?: string
}

export type BufferOptions = {
  http?: boolean;
  file?: boolean;
  size?: number;
  [k: string]: any
}

/**
 * Utils
 */
export declare class Utils {
  /** 用于 sleep 的 symbol */
  sleepTimeout: symbol
  /** 用于 debounce 的 symbol */
  debounceTime: symbol

  /** 
   * 格式化日志 ID
   * @param id 日志标识符 不填则使用配置内ID
   * @returns 格式化之后的字符串
   */
  makeLogID(id?: any): string

  /**
   * 打印日志
   * @param level 日志等级（如 "error","mark","debug","trace" 等）
   * @param msg 字符串或任意对象/数组（将被格式化）
   * @param id 若为 false 则不打印 id；否则可传 id 或使用默认对齐
   * @param force 强制使用传入的 id（不格式化）
   */
  makeLog(level: string, msg: any | any[], id?: string | number | false, force?: any): void

  /** 
   * 构造 Error
   * @param msg 错误信息
   * @param obj 其他信息
   */
  makeError(msg: string, ...obj: any[]): Error

  /** 
   * 获取文件/目录状态，出错返回 false 
   * @param path 文件路径
   * @param opts 可选参数
   */
  fsStat(path: string, opts?: StatOptions): Promise<Stats | false>

  /** 
   * 创建目录（递归），返回是否成功 
   * @param dir 路径
   * @param opts 可选参数
   */
  mkdir(dir: string, opts?: MakeDirectoryOptions): Promise<boolean>

  /** 
   * 删除文件/目录
   * @param file 文件或目录路径
   * @param opts 可选参数
  */
  rm(file: string, opts?: RmOptions): Promise<boolean>

  /** 
   * glob 匹配（如果 node:fs/promises 中无 glob 则返回 []）
   * @param path 路径
   * @param opts 可选参数
   * */
  glob(path: string, opts?: GlobOptions): Promise<string[]>

  /**
  * 下载（或把 buffer 写入文件）
  * 返回 { url, file, buffer }
  * @param url 要下载的 URL 或要写入文件的 Buffer
  * @param file 写入文件的路径（可选，如果提供了 url 是 Buffer，则必须提供）
  * @param opts 选项（可选）
  */
  download(url: string | Buffer, file?: string, opts?: BufferOptions): Promise<DownloadResult>

  /**
   * 将 Map 包装成带自动持久化的 Map（会把 set/delete 覆写为异步）
   * parent_map: 一般为从 getMap 返回的 map
   * @param parent_map 一般为从 getMap 返回的 map，Map 上会附加 db 属性
   * @param parent_key 在 parent_map 中用于存储当前 map 的键
   * @param map 要包装的 Map
   */
  makeMap(parent_map: Map<any, any> & { db?: any }, parent_key: string, map: Map<any, any>): Map<any, any>

  /** 
   * 将值写入 map（支持 value 为 Map），并持久化到 map.db
   * @param map 要操作的 Map（必须包含 db 属性）
   * @param set Map 默认的 set 方法（传入 set 是为了支持 makeMap 包装的 Map）
   * @param key 要设置的键
   * @param value 要设置的值
   */
  setMap(map: Map<any, any> & { db?: any }, set: (k: any, v: any) => any, key: any, value: any): Promise<Map<any, any>>

  /** 
   * 从 map 中删除并同时删除 db 中的键
   * @param map 要操作的 Map（必须包含 db 属性）
   * @param del Map 默认的 delete 方法（传入 del 是为了支持 makeMap 包装的 Map）
   * @param key 要删除的键
   * @returns 删除是否成功
   */
  delMap(map: Map<any, any> & { db?: any }, del: (k: any) => boolean, key: any): Promise<boolean>

  /** 
   * 从目录导入数据到 Map（用于初始化），并删除源文件
   * @param dir 包含要导入数据的目录路径
   * @param map 导入数据的目标 Map
   * @returns 导入数据后的 Map
   */
  importMap(dir: string, map: Map<any, any>): Promise<Map<any, any>>

  /**
   * 打开或创建 leveldb 并返回 Map（Map 上会附加 db 属性）
   * 返回值类型为 Map 并附带 db: Level
   * @param dir leveldb 存储的目录路径
   * @returns  包含 db 属性的 Map
   */
  getMap(dir: string): Promise<Map<any, any> & { db: Level }>

  /** 
   * 把任意值转换为字符串，特殊处理 Buffer/Error 等 
   * @param data 任意类型的值
   * @returns 转换后的字符串
   */
  StringOrNull(data: any): string

  /** 
   * 将 buffer 转为安全显示的字符串或返回原 buffer（根据是否包含不可显示字符）
   * @param data 任意类型的值
   * @param base64 如果 buffer 包含不可显示字符，是否转为 base64 字符串（默认为 false）
   * @returns 转换后的字符串或原 Buffer
   */
  StringOrBuffer(data: any, base64?: boolean): string | Buffer

  /** 
   * 用于 JSON.stringify 的循环引用替换器 
   * @returns  循环引用替换函数
   */
  getCircularReplacer(): (this: any, key: string, value: any) => any

  /** 
   * 将数据转为字符串（可选传入 JSON.stringify 选项）
   * @param data 任意类型的值
   * @param opts JSON.stringify 的选项（如 { replacer, space }）
   * @returns  转换后的字符串
   */
  String(data: any, opts?: any): string

  /** 
   * 格式化并截断日志对象（util.inspect）
   * @param data 要格式化和检查的对象
   * @param opts util.inspect 的选项
   * @returns 格式化后的字符串
   */
  Loging(data: any, opts?: any): string

  /**
   * 将传入 data 解析为 Buffer（支持 base64://、http(s) URL、file://、Buffer）
   * 若 opts.http 为真返回 URL 字符串，若 opts.file 为真返回 file:// 路径
   * @param data 数据内容
   * @param opts 选项
   * @returns 解析后的 Buffer、URL 字符串或 file:// 路径
   */
  Buffer(data: any, opts?: BufferOptions): Promise<Buffer | string>

  /**
   * 检测文件类型并返回对象 { name, url?, buffer?, type?, md5? }
   * 参数 data 形如 { file: Buffer|string, name?: string }
   * @param data 包含文件内容（Buffer 或路径/URL 字符串）和可选名称的对象
   * @param opts 选项（可选）
   * @returns 文件类型检测结果对象
   */
  fileType(data: { file: Buffer | string; name?: string }, opts?: BufferOptions): Promise<FileTypeResult>

  /**
   * 执行外部命令（支持字符串或数组）
   * 返回 { error, stdout, stderr, raw }
   * @param cmd 要执行的命令（字符串或包含命令及参数的数组）
   * @param opts Node.js child_process.exec 或 child_process.spawn 的选项（可选）
   * @returns 命令执行结果对象
   */
  exec(cmd: string | string[], opts?: any): Promise<ExecResult>

  /** 查找命令路径（where/command -v），失败返回 false
   * @param cmd 要查找的命令名
   * @param opts 选项（可选）
   * @returns 命令的绝对路径或 false
   */
  cmdPath(cmd: string, opts?: any): Promise<string | false>

  /** 以独立进程启动命令（windows 会用 cmd /c start）
   * @param cmd 要启动的命令
   * @param args 命令参数数组（可选）
   * @param opts Node.js child_process.spawn 的选项（可选）
   * @returns 启动的子进程对象
   */
  cmdStart(cmd: string, args?: string[], opts?: any): ChildProcess

  /** 按时间差格式化时间差（返回中文格式如 '1天2时3分'）
   * @param time1 第一个时间戳（可选，默认为当前时间）
   * @param time2 第二个时间戳（可选，如果只传入 time1，则计算 time1 与当前时间的差）
   * @returns 格式化后的时间差字符串
   */
  getTimeDiff(time1?: number, time2?: number): string

  /**
   * 将一次性事件包装为 Promise（使用 event.once）
   * event: 任意 EventEmitter-like 对象，resolve/reject 为事件名
   * @param event 任意 EventEmitter-like 对象
   * @param resolve 触发 resolve 的事件名（字符串或 Symbol）
   * @param reject 触发 reject 的事件名（字符串或 Symbol，可选）
   * @param timeout 超时时间（毫秒，可选）
   * @returns 事件触发时 resolve 的 Promise
   */
  promiseEvent(event: any, resolve: string | symbol, reject?: string | symbol, timeout?: number): Promise<any>

  /**
   * 睡眠（如果传入 promise 则与 promise.race）
   * 返回 timers.promises.setTimeout 返回的 Promise
   * @param time 睡眠时间（毫秒）
   * @param promise 可选，与睡眠 Promise 竞争的 Promise
   * @returns 一个 Promise，在指定时间后 resolve 或在 promise resolve/reject 时 resolve/reject
   */
  sleep(time: number, promise?: Promise<any>): Promise<any>

  /**
   * 防抖：返回包装后的函数（返回值为 Promise）
   * func: 被包装的函数
   * @param func 要进行防抖处理的函数
   * @param time 防抖的等待时间（毫秒，默认为 300ms）
   * @returns 返回一个包装后的函数，调用该函数会返回一个 Promise
   */
  debounce<T extends (...args: any[]) => any>(func: T, time?: number): (...args: Parameters<T>) => Promise<ReturnType<T>>
}