import type { RedisClientType } from "redis"
import type { ChildProcess } from "node:child_process"

export type Redis = (RedisClientType & {
  class?: any, // TODO 完善
  process?: ChildProcess & { exit?: boolean }
})

