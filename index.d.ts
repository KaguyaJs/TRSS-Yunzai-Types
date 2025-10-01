import type { RedisClientType as Redis } from "redis"
import type { Yunzai, Client } from "./Bot.d.ts"
import type { Logger } from "./logger.d.ts"
import type { Plugin } from "./plugin.d.ts"
import type { Utils } from "./util.d.ts"
import type { Segment } from "./segment.d.ts"


declare global {
  var Bot: Yunzai & Utils & {
    [key: string]: Client | undefined
  }
  var redis: Redis
  var segment: Segment
  var logger: Logger
  var plugin: typeof Plugin
}

export type * from "./Bot.d.ts"
export type * from "./logger.d.ts"
export type * from "./plugin.d.ts"
export type * from "./util.d.ts"
// export type * from "icqq"