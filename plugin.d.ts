import type { Message } from "icqq"

export interface PluginRule {
  /** 正则或命令匹配 */
  reg: string | RegExp
  /** 执行函数名 */
  fnc: string
  /** 可覆盖事件类型（默认 message） */
  event?: string
  /** 是否在日志中显示 */
  log?: boolean
  /** 权限 master|owner|admin|all */
  permission?: 'master' | 'owner' | 'admin' | 'all'
  [k: string]: any
}

export interface PluginTask {
  /** 定时任务名称 */
  name?: string
  /** 触定时任务方法 */
  fnc?: string | Function
  /** 定时任务corn表达式 */
  cron?: string
  /** 是否输出日志 */
  log?: boolean
}

export interface HandlerConfig {
  /** handler 支持的 key（可为字符串或字符串数组） */
  key?: string | string[]
  /** 处理函数 */
  fn?: (...args: any[]) => any
}

export interface PluginOptions {
  /** 插件名称 */
  name?: string
  /** 插件描述 */
  dsc?: string
  /** handler配置 */
  handler?: HandlerConfig | Record<string, any>
  /** namespace，设置handler时建议设置 */
  namespace?: string
  /** 监听事件（默认 message） */
  event?: string
  /** 优先级（数字，越小优先级越高） */
  priority?: number
  /** 定时任务（或数组） */
  task?: PluginTask | PluginTask[]
  /** 命令规则数组 */
  rule?: PluginRule[]
}

/**
 * 事件对象的最小类型（根据源码使用到的字段）
 * e.reply(...) | e.self_id | e.group_id | e.user_id
 * 根据你的实际平台可以把它扩展成更精确的类型
 */
export interface PluginEvent extends Message {
  /** 提及者id */
  at?: number | string
  /** 消息内容 */
  msg: string
  /** 机器人自身ID */
  self_id: number | string
  /** 用户ID */
  user_id: number | string
  /** 群组ID */
  group_id: number | string
  /** 消息ID */
  message: string
  /** 回复消息 */
  reply: (msg?: any, quote?: boolean, data?: Record<string, any>) => any
  [k: string]: any
}

/**
 * Plugin
 */
export class Plugin {
  constructor(options?: PluginOptions)

  /** 插件名称 */
  name: PluginOptions["name"]
  /** 插件描述 */
  dsc: PluginOptions["dsc"]
  /** 监听事件（默认 message） */
  event: PluginOptions["event"]
  /** 优先级（数字，越小越高） */
  priority: PluginOptions["priority"]
  /** 定时任务（或数组） */
  task: PluginOptions["task"]
  /** 命令规则数组 */
  rule: PluginOptions["rule"]
  /** 可选的 handler 配置（如果有） */
  handler?: PluginOptions["handler"]
  /** handler 命名空间 */
  namespace?: PluginOptions["namespace"]

  /** 消息事件 */
  // TODO 支持泛型
  e?: PluginEvent

  /**
   * 发送回复（会调用 this.e.reply）
   * @param msg 支持字符串或 segment/object
   * @param quote 是否引用回复
   * @param data 额外数据（如 recallMsg / at 等）
   */
  reply(msg?: any, quote?: boolean, data?: Record<string, any>): any

  /**
   * 构造用于存储上下文的 key
   * @param isGroup 是否群聊
   */
  conKey(isGroup?: boolean): string

  /**
   * setContext：设置上下文（源码返回设置的上下文对象）
   * @param type 自定义类型字符串
   * @param isGroup 是否群聊
   * @param time 过期时间（秒）
   * @param timeout 超时提示文本
   */
  setContext(type: string, isGroup: boolean, time?: number, timeout?: string): any

  /**
   * getContext：获取上下文（不传 type 则返回整个 key 的对象）
   */
  getContext(type?: string, isGroup?: boolean): any

  /**
   * finish：结束上下文并清理（会 clearTimeout）
   */
  finish(type?: string, isGroup?: boolean): void

  /**
   * awaitContext：等待上下文（源码返回 Promise）
   */
  awaitContext(...args: any[]): Promise<any>

  /**
   * resolveContext：触发 resolve 并结束上下文
   */
  resolveContext(context: any): void

  /**
   * renderImg：调用 Common.render 生成/渲染图片（源码 import "#miao" 的 Common）
   * @param plugin 渲染器所属 plugin 名
   * @param tpl 模板名
   * @param data 模板数据
   * @param cfg 额外配置，会把 e 注入到 cfg
   */
  renderImg(plugin: string, tpl: string, data?: any, cfg?: Record<string, any>): Promise<any>
}

export default Plugin
