import type { EventMap, GroupMessageEvent, PrivateMessageEvent, FileElem, MessageRet, Sendable } from "icqq"
import type { Group, Friend, Client } from "./Bot.d.ts"

export interface PluginRule {
  /** 正则或命令匹配 */
  reg: string | RegExp
  /** 执行函数名 */
  fnc: string
  /** 可覆盖事件类型 */
  event?: string
  /** 是否显示执行日志 */
  log?: boolean
  /** 触发者所需权限 */
  permission?: 'master' | 'owner' | 'admin' | 'all'
  [k: string]: any
}

export interface PluginTask {
  /** 定时任务名称 */
  name?: string
  /** 触定时任务方法 */
  fnc: Function
  /** 定时任务corn表达式 */
  cron: string
  /** 是否输出日志 */
  log?: boolean
}

export interface HandlerConfig {
  /** handler 支持的 key（可为字符串或字符串数组） */
  key?: string | string[]
  /** 处理函数 */
  fn?: (...args: any[]) => any
}

export interface PluginOptions<T extends keyof EventMap> {
  /** 插件名称 */
  name?: string
  /** 插件描述 */
  dsc?: string
  /** handler配置 */
  handler?: HandlerConfig | Record<string, any>
  /** namespace，设置handler时建议设置 */
  namespace?: string
  /** 监听事件（默认 message） */
  event?: T
  /** 优先级（数字，越小优先级越高） */
  priority?: number
  /** 定时任务（或数组） */
  task?: PluginTask | PluginTask[]
  /** 命令规则数组 */
  rule?: PluginRule[]
}

export interface BaseEvent {
  /** 发送者id */
  user_id: number | string
  /** 收到事件的机器人id */
  self_id: number | string
  /** 收到事件的Bot对象 */
  bot: Client
  /** 文本消息 */
  msg?: string
  /** 被艾特者id */
  at?: number | string
  /** 是否at机器人 */
  atBot?: true
  /** 图片消息数组 */
  img?: string[]
  /** 触发者是否为主人 */
  isMaster?: true
  /** 日志用户字符串 */
  logText: string
  /** 是否为私聊 */
  isPrivate?: true
  /** 是否为群聊 */
  isGroup?: true
  /** 日志方法字符串 */
  logFnc: string
  /** 接收到的文件 */
  file?: FileElem
  /** 是否包含别名 */
  hasAlias?: true
  /** 撤回消息 */
  recall?: (Group | Friend)['recallMsg']
  /**
 * 回复消息
 * @param msg 支持字符串或 segment
 * @param quote 是否引用回复
 * @param data 额外配置
 */
  reply(msg: Sendable, quote?: boolean, data?: {
    /** 是否提及用户 */
    at?: boolean
    /** 多久之后撤回消息，0-120秒，0不撤回 */
    recallMsg?: number
  }): Promise<MessageRet & { error?: any[] }>
  /** 聊天平台名称，同一个平台唯一 */
  adapter_id: string
  /** 适配器名称 */
  adapter_name: string
}

/** 群聊事件 */
// @ts-ignore
export interface GroupEvent extends BaseEvent, GroupMessageEvent {
  group_id: number | string
  isGroup: true
  isPrivate: false
  group: Group
}

/** 私聊事件 */
// @ts-ignore
export interface PrivateEvent extends BaseEvent, PrivateMessageEvent {
  isPrivate: true
  isGroup: false
  friend: Friend
}

export type MessageEvent = GroupEvent | PrivateEvent

export type Event<T extends keyof EventMap> = Omit<Parameters<EventMap[T]>[0], "reply" | "user_id"> & BaseEvent

/**
 * Plugin
 */
declare global {
  class plugin<T extends keyof EventMap = keyof EventMap> {
    constructor(options?: PluginOptions<T>)

    /** 插件名称 */
    name: PluginOptions<T>["name"]
    /** 插件描述 */
    dsc: PluginOptions<T>["dsc"]
    /** 监听事件（默认 message） */
    event: PluginOptions<T>["event"]
    /** 优先级（数字越小越高） */
    priority: PluginOptions<T>["priority"]
    /** 定时任务（或数组） */
    task: PluginOptions<T>["task"]
    /** 命令规则数组 */
    rule: PluginOptions<T>["rule"]
    /** 可选的 handler 配置（如果有） */
    handler?: PluginOptions<T>["handler"]
    /** handler 命名空间 */
    namespace?: PluginOptions<T>["namespace"]

    /** 消息事件 */
    e:
      [T] extends [keyof EventMap]
        ? [keyof EventMap] extends [T]
            ? MessageEvent
            : Event<T>
        : MessageEvent

    reply: BaseEvent["reply"]

    /**
     * 构造用于存储上下文的 key
     * @param isGroup 是否群聊
     */
    conKey(isGroup?: boolean): string

    /**
     * setContext：设置上下文
     * @param type 自定义类型字符串
     * @param isGroup 是否群聊
     * @param time 过期时间（秒）
     * @param timeout 超时提示文本
     */
    setContext(type: string, isGroup?: boolean, time?: number, timeout?: string): any

    /**
     * getContext：获取上下文（不传 type 则返回整个 key 的对象）
     */
    getContext(type?: string, isGroup?: boolean): any

    /**
     * finish：结束上下文并清理（会 clearTimeout）
     */
    finish(type?: string, isGroup?: boolean): void

    /**
     * awaitContext：等待上下文
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
    [k: string]: any
  }
}

export type Plugin<T extends keyof EventMap = keyof EventMap> = plugin<T>
