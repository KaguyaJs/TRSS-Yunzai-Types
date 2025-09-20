// types/index.d.ts
/**
 * 为 JS 版 plugin 提供的 TypeScript 声明
 * 对应源码（export default class plugin）
 */

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
  permission?: 'master' | 'owner' | 'admin' | 'all' | string
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
  [k: string]: any
}

export interface HandlerConfig {
  /** handler 支持的 key（可为字符串或字符串数组） */
  key?: string | string[]
  /** 处理函数 */
  fn?: (...args: any[]) => any
  [k: string]: any
}

// export interface PluginOptions {
//   /** 插件名称 */
//   name?: string
//   /** 插件描述 */
//   dsc?: string
//   /** handler配置 */
//   handler?: HandlerConfig | Record<string, any>
//   /** namespace，设置handler时建议设置 */
//   namespace?: string
//   /** 监听事件（默认 message） */
//   event?: string
//   /** 优先级（数字，越小优先级越高） */
//   priority?: number
//   /** 定时任务（或数组） */
//   task?: PluginTask | PluginTask[]
//   /** 命令规则数组 */
//   rule?: PluginRule[]
//   [k: string]: any
// }

/**
 * 事件对象的最小类型（根据源码使用到的字段）
 * e.reply(...) | e.self_id | e.group_id | e.user_id
 * 根据你的实际平台可以把它扩展成更精确的类型
 */
export interface PluginEvent {
  /** 机器人自身ID */
  self_id: number
  /** 用户ID */
  user_id: number
  /** 群组ID */
  group_id: number
  /** 消息ID */
  message: string
  /** 快速回复 */
  reply: (msg?: any, quote?: boolean, data?: Record<string, any>) => any
  [k: string]: any
}

/**
 * 默认导出的插件类（JS 中 export default class plugin）
 * 在继承时，this.e 将有类型提示，this.reply 等也有类型提示
 */
export default class plugin {
  /**
   * 构造参数参考：name/dsc/handler/namespace/event/priority/task/rule
   */
  constructor(options?: {
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
  [k: string]: any
}
)

  /** 插件名称 */
  name: string
  /** 插件描述 */
  dsc: string
  /** 监听事件（默认 message） */
  event: string
  /** 优先级（数字，越小越高） */
  priority: number
  /** 定时任务（或数组） */
  task: PluginTask | PluginTask[]
  /** 命令规则数组 */
  rule: PluginRule[]
  /** 可选的 handler 配置（如果有） */
  handler?: HandlerConfig | Record<string, any>
  /** handler 命名空间 */
  namespace?: string

  /**
   * 当前触发事件对象（在事件触发时会有）
   * this.e.reply(...) / this.e.group_id / this.e.user_id 等
   */
  e?: PluginEvent

  /** 有时会直接在插件实例上设置这些 id，源码中会读取 this.self_id / this.e.self_id */
  self_id?: number | string
  user_id?: number | string
  group_id?: number | string

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
