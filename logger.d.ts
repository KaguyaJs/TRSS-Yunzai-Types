import { type ChalkInstance } from "chalk"
import log4js from "log4js"


export interface LoggerMethods extends ChalkInstance{
  defaultLogger: log4js.Logger
  commandLogger: log4js.Logger
  errorLogger: log4js.Logger
  /** 输出TRACE日志 */
  trace: (...args: any[]) => void
  /** 输出DEGUB日志 */
  debug: (...args: any[]) => void
  /** 输出INFO日志 */
  info: (...args: any[]) => void
  /** 输出WARN日志 */
  warn: (...args: any[]) => void
  /** 输出ERROR日志 */
  error: (...args: any[]) => void
  /** 输出FATAL日志 */
  fatal: (...args: any[]) => void
  /** 输出MARK日志 */
  mark: (...args: any[]) => void
}