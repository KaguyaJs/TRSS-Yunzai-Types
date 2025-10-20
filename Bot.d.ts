import type { EventEmitter } from "events"
import type express from "express"
import type { Server } from "node:http"
import type { WebSocketServer } from "ws"
import type {
  Client as BaseClient,
  User as BaseUser,
  Group as BaseGroup,
  Friend as BaseFriend,
  Member as BaseMember,
  EventMap,
  FriendInfo,
  MemberInfo,
  GroupInfo,
  Sendable,
  MessageRet
} from "icqq"
import type { ToDispose } from "./internal/index.d.ts"


interface BotUin extends Array<string | number> {
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

// @ts-ignore
export interface User extends BaseUser {
  /** 用户id */
  user_id: number | string
  /** 获取用户信息 */
  getInfo: () => Promise<FriendInfo | MemberInfo | undefined>
  /** 获取头像链接 */
  getAvatarUrl: (...args: any[]) => Promise<string>
}

/** 群成员对象 */
// @ts-ignore
export interface Member extends BaseMember, User {
  /** 群成员所在的群号 */
  group_id: string | number
  /** 获取群员信息 */
  getInfo: () => Promise<MemberInfo | undefined>
}

/** 群对象 */
// @ts-ignore
export interface Group extends BaseGroup, User {
  /** 群号 */
  group_id: number | string
  /** 获取群信息 */
  getInfo: () => Promise<GroupInfo>
  pickMember(uin: number | string, strict?: boolean): Member
  setAdmin(uin: number | string, yes?: boolean): Promise<boolean>
  setTitle(uin: number | string, title?: string, duration?: number): Promise<boolean>
  setCard(uin: number | string, card?: string): Promise<boolean>
  kickMember(uin: number | string, msg?: string, block?: boolean): Promise<boolean>
  muteMember(uin: number | string, duration?: number): Promise<boolean>
  pokeMember(uin: number | string): Promise<boolean>
  getMuteMemberList(): Promise<({
    uin: number | string | null
    unMuteTime: string | null
  } | null)[]>
  getMemberMap(no_cache?: boolean): Promise<Map<number | string, MemberInfo>>
}

/** 好友对象 */
// @ts-ignore
export interface Friend extends BaseFriend, User {
  /** 获取好友信息 */
  getInfo: () => Promise<FriendInfo | undefined>
}


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
// @ts-ignore
export interface Client extends BaseClient {
  /** bot账号 */
  uin: number | string
  /** 返回好友列表 Map */
  fl: Map<number | string, FriendInfo>
  /** 返回群聊列表 Map */
  gl: Map<number | string, GroupInfo>
  /** 返回群成员列表 Map */
  gml: Map<number | string, MemberInfo>

  /** 获得一个好友对象 */
  pickFriend: (user_id: number | string, strict?: boolean) => Friend
  /** 获得一个群对象 */
  pickGroup: (group_id: number | string, strict?: boolean) => Group
  /** 获得一个群成员对象 */
  pickMember: (group_id: number | string, user_id: number | string) => Member

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

  [k: string]: any
}

export declare class Yunzai extends (EventEmitter as { new(): EventEmitter }) {
  on: ((name: `connect.${string}`, listener: (data: { self_id: number | string, bot: Client }) => void) => ToDispose<this>)
    & ((name: "connect", listener: (bot: Client) => void) => ToDispose<this>)
    & ((name: "online", listener: (Yz: Yunzai) => void) => ToDispose<this>)
    & Client["on"];
  // @ts-ignore
  once: Client["once"]
  trap: Client["trap"]
  trip: Client["trip"]

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
  pickFriend(user_id: string | number, strict: false): Friend
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
  pickGroup(group_id: string | number, strict: false): Group
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
  sendFriendMsg(bot_id: string | number | undefined | null, user_id: string | number, ...args: any[]): ReturnType<Friend["sendMsg"]> | undefined

  /**
   * 发送一条群消息 (如果机器人不在线则会等待上线)
   * @param bot_id 机器人账号
   * @param group_id 群号
   * @param args 消息内容及其他参数（传递给sendMsg)
   */
  sendGroupMsg(bot_id: string | number | undefined | null, group_id: string | number, ...args: any[]): Promise<ReturnType<Friend["sendMsg"]>>

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
    [k: string]: {
      /** 消息返回 */
      [k: string]: MessageRet
    }
  } | {}>

  /**
   * 构造转发消息段
   * @param msg 消息内容
   */
  makeForwardMsg<T>(msg: T): { type: "node", data: T }

  /**
   * 制作转发消息
   * @param msg 消息内容
   * @param node
   */
  makeForwardArray<M = [], N extends object = {}>(msg?: M | M[], node?: N): {
    type: "node", data: (N & {
      message: M
    })[]
  }

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
