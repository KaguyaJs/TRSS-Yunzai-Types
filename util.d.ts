// types/util.d.ts
/**
 * 工具单例的类型声明（对应 `export default new (class { ... })()` 的导出）
 *
 * 使用方法：
 * import utils from './util.js'
 * utils.makeLogID(...) // 编辑器自动补全
 */

import type { Stats } from "fs"
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

/**
 * Utils 单例的类定义（导出为默认实例）
 */
export declare class Utils {
  /** 用于 sleep 的 symbol */
  sleepTimeout: symbol
  /** 用于 debounce 的 symbol */
  debounceTime: symbol
  /** 可选的运行时状态（代码中用于 getTimeDiff） */
  // stat?: { start_time?: number }

  /** 根据 cfg.bot.log_align 格式化日志 ID */
  makeLogID(id?: any): string

  /**
   * 打印日志
   * @param level 日志等级（如 "error","mark","debug","trace" 等）
   * @param msg 字符串或任意对象/数组（将被格式化）
   * @param id 若为 false 则不打印 id；否则可传 id 或使用默认对齐
   * @param force 强制使用传入的 id（不格式化）
   */
  makeLog(level: string, msg: any | any[], id?: string | number | false, force?: any): void

  /** 构造 Error，并 merge 其它对象 */
  makeError(msg: string, ...obj: any[]): Error

  /** 获取文件/目录状态，出错返回 false */
  fsStat(path: string, opts?: any): Promise<Stats | false>

  /** 创建目录（递归），返回是否成功 */
  mkdir(dir: string, opts?: any): Promise<boolean>

  /** 删除文件/目录（force, recursive），返回是否成功 */
  rm(file: string, opts?: any): Promise<boolean>

  /** glob 匹配（如果 node:fs/promises 中无 glob 则返回 []） */
  glob(pattern: string, opts?: any): Promise<string[]>

  /**
   * 下载（或把 buffer 写入文件）
   * 返回 { url, file, buffer }
   */
  download(url: string, file?: string, opts?: any): Promise<DownloadResult>

  /**
   * 将 Map 包装成带自动持久化的 Map（会把 set/delete 覆写为异步）
   * parent_map: 一般为从 getMap 返回的 map
   */
  makeMap(parent_map: Map<any, any> & { db?: any }, parent_key: string, map: Map<any, any>): Map<any, any>

  /** 将值写入 map（支持 value 为 Map），并持久化到 map.db */
  setMap(map: Map<any, any> & { db?: any }, set: (k: any, v: any) => any, key: any, value: any): Promise<Map<any, any>>

  /** 从 map 中删除并同时删除 db 中的键 */
  delMap(map: Map<any, any> & { db?: any }, del: (k: any) => boolean, key: any): Promise<boolean>

  /** 从目录导入数据到 Map（用于初始化），并删除源文件 */
  importMap(dir: string, map: Map<any, any>): Promise<Map<any, any>>

  /**
   * 打开或创建 leveldb 并返回 Map（Map 上会附加 db 属性）
   * 返回值类型为 Map 并附带 db: Level
   */
  getMap(dir: string): Promise<Map<any, any> & { db: Level }>

  /** 把任意值转换为字符串，特殊处理 Buffer/Error 等 */
  StringOrNull(data: any): string

  /** 将 buffer 转为安全显示的字符串或返回原 buffer（根据是否包含不可显示字符） */
  StringOrBuffer(data: any, base64?: boolean): string | Buffer

  /** 用于 JSON.stringify 的循环引用替换器 */
  getCircularReplacer(): (this: any, key: string, value: any) => any

  /** 将数据转为字符串（可选传入 JSON.stringify 选项） */
  String(data: any, opts?: any): string

  /** 格式化并截断日志对象（util.inspect） */
  Loging(data: any, opts?: any): string

  /**
   * 将传入 data 解析为 Buffer（支持 base64://、http(s) URL、file://、Buffer）
   * 若 opts.http 为真返回 URL 字符串，若 opts.file 为真返回 file:// 路径
   */
  Buffer(data: any, opts?: { http?: boolean; file?: boolean; size?: number } & Record<string, any>): Promise<Buffer | string>

  /**
   * 检测文件类型并返回对象 { name, url?, buffer?, type?, md5? }
   * 参数 data 形如 { file: Buffer|string, name?: string }
   */
  fileType(data: { file: Buffer | string; name?: string }, opts?: any): Promise<FileTypeResult>

  /**
   * 执行外部命令（支持字符串或数组）
   * 返回 { error, stdout, stderr, raw }
   */
  exec(cmd: string | string[], opts?: any): Promise<ExecResult>

  /** 查找命令路径（where/command -v），失败返回 false */
  cmdPath(cmd: string, opts?: any): Promise<string | false>

  /** 以独立进程启动命令（windows 会用 cmd /c start） */
  cmdStart(cmd: string, args?: string[], opts?: any): ChildProcess

  /** 按时间差格式化时间差（返回中文格式如 '1天2时3分'） */
  getTimeDiff(time1?: number, time2?: number): string

  /**
   * 将一次性事件包装为 Promise（使用 event.once）
   * event: 任意 EventEmitter-like 对象，resolve/reject 为事件名
   */
  promiseEvent(event: any, resolve: string | symbol, reject?: string | symbol, timeout?: number): Promise<any>

  /**
   * 睡眠（如果传入 promise 则与 promise.race）
   * 返回 timers.promises.setTimeout 返回的 Promise
   */
  sleep(time: number, promise?: Promise<any>): Promise<any>

  /**
   * 防抖：返回包装后的函数（返回值为 Promise）
   * func: 被包装的函数
   */
  debounce<T extends (...args: any[]) => any>(func: T, time?: number): (...args: Parameters<T>) => Promise<ReturnType<T>>
}

// export default Utils
