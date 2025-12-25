import type { Group, Friend, Client } from "./Bot.d.ts"
import type { EventTool, Drop } from './internal/index.d.ts'
import type {
  EventMap,
  GroupMessageEvent as BaseGroupMessageEvent,
  PrivateMessageEvent as BasePrivatMessageEvent,
  FileElem,
  MessageRet as BaseMessageRet,
  Sendable,
  PrivateMessage,
  GroupMessage
} from "./icqq.d.ts"

/** 插件命令处理规则 */
export interface PluginRule {
  /** 正则或命令匹配 */
  reg?: string | RegExp
  /** 执行函数名 */
  fnc: string
  /** 可覆盖事件类型 */
  event?: EventKeys
  /** 是否显示执行日志 */
  log?: boolean
  /** 触发者所需权限 */
  permission?: 'master' | 'owner' | 'admin' | 'all'
  [k: string]: any
}

/** 定时任务参数 */
export interface PluginTask {
  /** 定时任务名称 */
  name?: string
  /** 触定时任务方法 */
  fnc: () => void | Promise<void>
  /** 
   * 定时任务corn表达式 
   * 
   * `秒 分 时 日 月 星期`
   * 
   * @example
    * * * * * * *
      │ │ │ │ │ │
      │ │ │ │ │ └─ 星期 (0–7)
      │ │ │ │ └─── 月 (1–12)
      │ │ │ └───── 日 (1–31)
      │ │ └─────── 时 (0–23)
      │ └───────── 分 (0–59)
      └─────────── 秒 (0–59)
   */
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

/** 发送消息的返回值 */
export interface MessageRet extends BaseMessageRet {
  /** 失败信息 */
  error?: any[]
}

/** 构造函数参数 */
export interface PluginOptions<T extends EventKeys> {
  /** 插件名称 */
  name?: string
  /** 插件描述 */
  dsc?: string
  /** handler配置 */
  handler?: HandlerConfig | Record<string, any>
  /** namespace，设置handler时建议设置 */
  namespace?: string
  /** 
   * 监听事件 
   *
   * @default "message"
   */
  event?: T
  /** 
   * 优先级
   *
   * 数字越小优先级越高
  */
  priority?: number
  /** 定时任务 */
  task?: PluginTask | PluginTask[]
  /** 命令规则数组 */
  rule?: PluginRule[]
}

/** 消息事件自定义字段 */
export interface CustomEvent {
  /** 发送者id */
  user_id: number | string
  /** 收到事件的机器人id */
  self_id: number | string
  /** 收到事件的Bot对象 */
  bot: Client
  /** 文本消息内容 */
  msg: string
  /** 被艾特者id */
  at?: number | string
  /** 是否at机器人 */
  atBot?: true
  /** 图片消息数组 */
  img?: string[]
  /** 触发者是否为主人 */
  isMaster?: boolean
  /** 日志用户字符串 */
  logText: string
  /** 日志方法字符串 */
  logFnc: string
  /** 接收到的文件 */
  file?: FileElem
  /** 消息是否包含别名 */
  hasAlias?: true
  /** 引用消息ID */
  reply_id?: string
  /** 快速获取引用消息 */
  getReply?: () => Promise<GroupMessage | PrivateMessage>
  /** Miao 的 runtime */
  runtime?: any
  /** Miao 的 user */
  user?: any
  /** 聊天平台名称，同平台唯一 */
  adapter_id: string
  /** 适配器名称 */
  adapter_name: string
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
  }): Promise<MessageRet>
}

/** 群聊事件 */
export interface GroupMessageEvent extends CustomEvent, Omit<BaseGroupMessageEvent, keyof CustomEvent | 'group_id'> {
  /** 群号 */
  group_id: number | string
  group: Group
}

/** 私聊事件 */
export interface PrivateMessageEvent extends CustomEvent, Omit<BasePrivatMessageEvent, keyof CustomEvent> {
  friend: Friend
}

/**
 * 群聊消息事件类型收窄，`isGroup` 为` true`
 */
interface GroupEvent extends GroupMessageEvent {
  /** 是否为群聊 */
  isGroup: true
  isPrivate?: never
}

/**
 * 私聊消息事件收窄，`isPrivate` 为 `true`
 */
interface PrivateEvent extends PrivateMessageEvent {
  /** 是否为私聊 */
  isPrivate: true
  isGroup?: never
}

/** 默认消息事件类型，可通过 `isGroup` `isPrivate`等关键字进行类型收窄 */
export type MessageEvent = GroupEvent | PrivateEvent

/** ICQQ 事件类型 */
export type Event<T extends EventKeys> = Omit<EventTool.EventParamUnion<EventMap, T>, keyof CustomEvent> & CustomEvent

/** 支持的事件名称，支持通匹 */
export type EventKeys = EventTool.ExpandMeaningfulAnyStars<keyof EventMap>

/**
 * Plugin
 */
declare global {
  class plugin<T extends EventKeys = EventKeys> {
    constructor(options?: PluginOptions<T>)

    /** 插件名称 */
    name: PluginOptions<T>["name"]
    /** 插件描述 */
    dsc: PluginOptions<T>["dsc"]
    /** 
     * 监听事件
     *  
     * @default "message"
     */
    event: PluginOptions<T>["event"]
    /** 
     * 优先级
     * 
     * 数字越小优先级越高 
     */
    priority: PluginOptions<T>["priority"]
    /** 
     * 定时任务
     * 
     * 可以定时任务对象数组
     */
    task: PluginOptions<T>["task"]
    /** 
     * 命令规则数组 
     */
    rule: PluginOptions<T>["rule"]
    /** handler 配置 */
    handler?: PluginOptions<T>["handler"]
    /** handler 命名空间 */
    namespace?: PluginOptions<T>["namespace"]

    /** 消息事件 */
    e:
      [T] extends [EventKeys]
        ? [EventKeys] extends [T]
          ? MessageEvent
          : [T] extends ['message']
            ? MessageEvent
            : Event<T>
        : MessageEvent

    reply: CustomEvent["reply"]

    /**
     * 构造用于存储上下文的 key
     * @param isGroup 是否群聊
     */
    conKey(isGroup?: boolean): string

    /**
     * 设置上下文
     * @param type 执行方法
     * @param isGroup 是否群聊
     * @param time 过期时间（秒）
     * @param timeout 超时提示文本
     */
    setContext(type: string, isGroup?: boolean, time?: number, timeout?: string): typeof this.e

    /**
     * 获取上下文
     *
     * 不传 type 则返回整个 key 的对象
     */
    getContext(type: undefined, isGroup?: boolean): {} | undefined | Record<string, typeof this.e>
    getContext(type?: string, isGroup?: boolean): typeof this.e

    /**
     * 结束上下文
     */
    finish(type?: string, isGroup?: boolean): void

    /**
     * 等待上下文
     */
    awaitContext(...args: Drop<Parameters<typeof this.setContext>, 1>): Promise<typeof this.e>

    /**
     * 触发 resolve 并结束上下文
     */
    resolveContext(context: MessageEvent): void

    /**
     * renderImg：调用 Common.render 生成/渲染图片（import "#miao" 的 Common）
     * @param plugin 渲染器所属 plugin 名
     * @param tpl 模板名
     * @param data 模板数据
     * @param cfg 额外配置，会把 e 注入到 cfg
     */
    renderImg(plugin: string, tpl: string, data?: any, cfg?: Record<string, any>): Promise<any>

    [k: string]: any
  }
}

export { plugin as Plugin }
