import { type ChalkInstance } from "chalk"
import log4js from "log4js"


export interface Logger extends ChalkInstance {
  /** Logger原始方法 */
  logger: {
    defaultLogger: log4js.Logger
    commandLogger: log4js.Logger
    errorLogger: log4js.Logger
    /** 打印 TRACE 日志 */
    trace: (...args: any[]) => void
    /** 打印 DEGUB 日志 */
    debug: (...args: any[]) => void
    /** 打印 INFO 日志 */
    info: (...args: any[]) => void
    /** 打印 WARN 日志 */
    warn: (...args: any[]) => void
    /** 打印 ERROR 日志 */
    error: (...args: any[]) => void
    /** 打印 FATAL 日志 */
    fatal: (...args: any[]) => void
    /** 打印 MARK 日志 */
    mark: (...args: any[]) => void
  }
  trace: this["logger"]["trace"]
  debug: this["logger"]["debug"]
  info: this["logger"]['info']
  warn: this["logger"]["warn"]
  error: this["logger"]["error"]
  fatal: this["logger"]['fatal']
  mark: this["logger"]["mark"]
}
