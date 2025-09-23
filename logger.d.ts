import { type ChalkInstance } from "chalk"
import log4js from "log4js"


export interface Logger extends ChalkInstance{
  defaultLogger: log4js.Logger
  commandLogger: log4js.Logger
  errorLogger: log4js.Logger
  /** 输出 TRACE 日志 */
  trace: (...args: any[]) => void
  /** 输出 DEGUB 日志 */
  debug: (...args: any[]) => void
  /** 输出 INFO 日志 */
  info: (...args: any[]) => void
  /** 输出 WARN 日志 */
  warn: (...args: any[]) => void
  /** 输出 ERROR 日志 */
  error: (...args: any[]) => void
  /** 输出 FATAL 日志 */
  fatal: (...args: any[]) => void
  /** 输出 MARK 日志 */
  mark: (...args: any[]) => void
}