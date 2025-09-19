import type { EventEmitter } from "events"
import type { RedisClientType } from "redis"
import type { Yunzai } from "./Bot"
import type { segment as SegmentType } from "oicq"
import type { LoggerMethods } from "./logger"

export {}

declare global {
  type _EventEmitter = EventEmitter
  var Bot: Yunzai
  var redis: RedisClientType
  var segment: typeof SegmentType
  var logger: LoggerMethods
}
