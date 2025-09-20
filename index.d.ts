type _EventEmitter = import("events").EventEmitter
import type { RedisClientType } from "redis"
import type { Yunzai } from "./Bot"
import type { LoggerMethods } from "./logger"
import type Plugin from "./plugin"

export {}

declare global {
  var Bot: Yunzai
  var redis: RedisClientType
  var segment: typeof import("oicq")["segment"]
  var logger: LoggerMethods
  var plugin: typeof Plugin
}
