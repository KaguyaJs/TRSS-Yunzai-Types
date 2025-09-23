type _EventEmitter = import("events").EventEmitter
import type { RedisClientType as Redis } from "redis"
import type { Yunzai } from "./Bot"
import type { Logger } from "./logger"
import type { Plugin } from "./plugin"
import type { Utils } from "./util"


declare global {
  var Bot: Yunzai & Utils
  var redis: Redis
  var segment: typeof import("oicq")["segment"]
  var logger: Logger
  var plugin: typeof Plugin
}

export type * from "./Bot"
export type * from "./logger"
export type * from "./plugin"
export type * from "./util"
export type * from "icqq"