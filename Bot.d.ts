import type { EventEmitter } from "events"
import type express from "express"
import type { Server } from "node:http"
import type { WebSocketServer } from "ws"
import type {
  Client as BaseClient,
  User,
  Group,
  Friend,
  Member,
  EventMap,
  FriendInfo,
  MemberInfo,
  GroupInfo,
  Sendable,
  MessageRet,
  ForwardNode,
  Forwardable
} from "./icqq.d.ts"
import type { ToDispose } from "./internal/index.d.ts"

export type {
  Group,
  Friend,
  Member,
  User
}

/** Bot.uin 数组 */
export interface BotUin extends Array<string | number> {
  now?: string | number
  /** 兼容：返回随机一个bot的uin */
  toJSON(): string | number
  /**
   * 随机返回一个uin并转化为string
   * @param raw 是否使用原生数组的 toString
   */
  toString(raw?: boolean, ...args: any[]): string
  includes(value: any): boolean
}

/** 适配器 */
export class Adapter {
  /** 平台标识符 */
  id: string
  /** 适配器名称 */
  name: string
  /** 适配器版本号 */
  version?: string
  [k: string]: any
}

/**
 * 单个 bot 实例
 */
export class Client extends BaseClient {
  /** bot账号 */
  uin: number | string

  /** 
   * 适配器
   * @private
   */
  adapter: Adapter

  /** 版本 */
  version: {
    /** 版本号 */
    id: string
    /** 版本名 */
    name: string
    /** 版本全称 */
    version?: string
    [k: string]: string | undefined
  }
}

/** Yunzai */
export declare class Yunzai extends (EventEmitter as { new(): EventEmitter }) {
  // @ts-ignore
  on: Client["on"];

  /** 运行状态 */
  stat: {
    /** 启动时间 */
    start_time: number;
    /**
     * 启动状态
     * ```
     * 0 - 未启动
     * 1 - 启动中
     * 2 - 已启动
     * ```
     */
    online: 0 | 1 | 2
  }

  bot: this

  // 所有子 bot（key 常为 bot id / uin）
  bots: Record<string, Client>

  /**
   * 机器人uin数组，向下兼容
   * @example
   * ```
   * Bot.uin.toJSON()        // 12345 or "tg_1234"
   * Bot.uin.toString()      // "12345" or "tg_1234"
   * Bot.uin.toString(true)  // "12345,tg_1234"
   * Array.from(Bot.uin)     // [ 12345, "tg_1234" ]
   * ```
   */
  uin: BotUin

  /** 适配器列表 */
  adapter: Adapter[]

  // express app，源码对 express() 做了增强：增加 skip_auth, quiet
  express: express.Application & { skip_auth: string[]; quiet: string[] }

  // http server / https server / websocket server
  server: Server
  httpsServer?: Server
  wss: WebSocketServer
  // wsf: path -> handlers[]
  wsf: Record<string, Array<(...args: any[]) => void>>
  // 临时文件池/映射
  fs: Record<string, any>

  url?: string
  server_listen_time?: number

  constructor()

  // --- HTTP / WS 处理相关 ---
  serverAuth(req: any): any
  serverStatus(req: any): void
  serverHandle(req: any): void
  serverExit(req: any): Promise<void> | void
  wsConnect(req: any, socket: any, head: any): void

  serverEADDRINUSE(err: Error, https?: boolean): Promise<void>
  serverLoad(https?: boolean): Promise<void>
  httpsLoad(): Promise<void>

  /**
   * 启动流程  
   * Yunazi，启动！
   */
  run(): Promise<void>

  /**
   * 把文件映射为可通过 URL 访问
   * @param file 文件路径或Buffer
   * @param opts 参数
   */
  fileToUrll(
    file: string | Buffer | {
      buffer: Buffer | any
      /** 文件名 */
      name?: string
      /** 文件范围次数 */
      times?: number
    },
    opts?: {
      /** 文件名 */
      name?: string
      /** 文件保存时间 */
      time?: number
      /** 文件访问次数 */
      times?: number
    }): Promise<string>


  fileSend(req: any): void

  // 事件处理
  prepareEvent(data: any): void
  em(name?: string, data?: any): void

  /**
   * 获取好友列表数组
   */
  getFriendArray(): Array<FriendInfo & {
    bot_id: string | number
  }>
  /** 获取好友列表 (id) */
  getFriendList(): Array<number | string>
  /** 获取好友列表Map */
  getFriendMap(): Map<number | string, FriendInfo & {
    /** 对应的机器人账号 */
    bot_id: string | number
  }>
  /** 
   * 好友列表
   */
  readonly fl: ReturnType<this["getFriendMap"]>

  /** 获取群列表数组 */
  getGroupArray(): Array<GroupInfo & {
    bot_id: string | number
  }>
  /** 获取群列表 (id) */
  getGroupList(): Array<number | string>
  /** 获取群列表Map */
  getGroupMap(): Map<number | string, GroupInfo & {
    bot_id: string | number
  }>
  /** 群列表 */
  readonly gl: ReturnType<this['getGroupMap']>

  /** 群成员列表Map */
  get gml(): Map<string | number, Map<string | number, MemberInfo> & {
    bot_id: string | number
  }>

  /** 
   * 获得一个好友对象 
   * @param user_id 好友账号
   * @param strict 严格模式
  */
  pickFriend(user_id: string | number): Friend
  pickFriend(user_id: string | number, strict?: false): Friend
  pickFriend(user_id: string | number, strict: true): Friend | false
  pickFriend(user_id: string | number, strict?: boolean): Friend | false

  /** 
   * 获得一个用户对象 
   * @deprecated 已弃用，请使用 {@link pickFriend}
   */
  readonly pickUser: this["pickFriend"]

  /**
   * 获得一个群对象
   * @param group_id 群号
   * @param strict 严格模式
   */
  pickGroup(group_id: string | number): Group
  pickGroup(group_id: string | number, strict?: false): Group
  pickGroup(group_id: string | number, strict: true): Group | false
  pickGroup(group_id: string | number, strict?: boolean): Group | false

  /**
   * 获得一个群成员对象
   * @param group_id 群号
   * @param user_id 群员id
   */
  pickMember(group_id: string | number, user_id: string | number): Member

  /**
   * 发送一条好友消息 (如果机器人不在线则会等待上线)
   * @param bot_id 机器人账号
   * @param user_id 用户id
   * @param args 消息内容及其他参数（传递给sendMsg)
   */
  sendFriendMsg(bot_id: string | number | undefined | null, user_id: string | number, ...args: any[]): ReturnType<Friend["sendMsg"]>

  /**
   * 发送一条群消息 (如果机器人不在线则会等待上线)
   * @param bot_id 机器人账号
   * @param group_id 群号
   * @param args 消息内容及其他参数（传递给sendMsg)
   */
  sendGroupMsg(bot_id: string | number | undefined | null, group_id: string | number, ...args: any[]): Promise<ReturnType<Group["sendMsg"]>>

  /**
   * 监听文本消息
   * @param fnc 自定义过滤逻辑
   */
  getTextMsg(fnc?: ((data: EventMap["message"]) => boolean) | { self_id: string | number; user_id: string | number }): Promise<string>

  /** 捕获主人发送的下一条消息 */
  getMasterMsg(): Promise<string>

  /**
   * 发送全部主人消息
   * @param msg 消息内容
   * @param bot_array 迭代的bot或列表
   * @param sleep 发送间隔
   */
  sendMasterMsg(msg: Sendable, bot_array?: (string | number) | (string | number)[], sleep?: number): Promise<{
    /** bot */
    [bot_uin: string]: {
      /** 消息返回 */
      [user_id: string]: MessageRet
    }
  } | {}>

  /**
   * 构造转发消息段
   * @param msg 消息内容
   */
  makeForwardMsg(msg: Forwardable[]): ForwardNode

  /**
   * 制作转发消息
   * @param msg 消息内容
   * @param node 转发节点内容
   */
  makeForwardArray(msg?: Sendable | Sendable[], node?: Partial<Omit<Forwardable, 'message'>>): ForwardNode

  /**
   * 发送转发消息
   * @param send 发送消息函数
   * @param msg 消息内容
   */
  sendForwardMsg(send: (msg: any) => Promise<any> | any, msg: any): Promise<any[]>

  /** 保存Redis数据并关闭 */
  redisExit(): Promise<boolean>
  /** 
   * 退出进程
   * @param code 状态码
   */
  exit(code?: number): Promise<void> | void
  /** 重启 */
  restart(): Promise<void>
}
