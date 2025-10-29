import type { Redis } from "./redis.d.ts"
import type { Yunzai, Client } from "./Bot.d.ts"
import type { Logger } from "./logger.d.ts"
import type { Utils } from "./util.d.ts"
import type { Segment } from "./segment.d.ts"


declare global {
  /** Bot */
  var Bot: Yunzai & Utils & Record<string, Client | undefined>
  /** Redis */
  var redis: Redis
  /** 构造消息段 */
  var segment: Segment
  /** 日志工具 */
  var logger: Logger
}

export type * from "./Bot.d.ts"
export type * from "./logger.d.ts"
export type * from "./plugin.d.ts"
export type * from "./util.d.ts"
export type * as icqq from "./icqq.d.ts"
