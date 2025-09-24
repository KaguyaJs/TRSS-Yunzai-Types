import type { EventEmitter } from "events"
import type express from "express"
import type http from "node:http"
import type { WebSocketServer } from "ws"
import type {
  Client as BaseClient,
  User as BaseUser,
  Group as BaseGroup,
  Friend as BaseFriend,
  Member as BaseMember
} from "icqq"

// TODO 等待类型补全

/**
 * uin 的特殊数组行为
 */
interface BotUin extends Array<string | number> {
  now?: string | number
  toJSON(): string | number
  toString(raw?: boolean, ...args: any[]): string
  includes(value: any): boolean
}

/**
 * Friend / Group / Member 的基础类型（根据源码拓展常用字段/方法）
 * 这些对象在源码中会被赋予 sendMsg / sendFile / makeForwardMsg / sendForwardMsg / getInfo 等方法
 */
interface User extends BaseUser {
  uid: number | string
  /** 用户id */
  user_id: number | string
  // sendMsg: (...args: any[]) => any
  getInfo: () => any
  // [k: string]: any
}

/** 群成员对象 */
interface Member extends User, BaseMember { }

/** 群对象 */
interface Group extends User, BaseGroup {
  group_id?: number | string
}

/** 好友对象 */
interface Friend extends User, BaseFriend { }

interface Adapter {
  /** 适配器标识符 */
  id: string
  /** 适配器名称 */
  name: string
  [k: string]: any
}

/**
 * 单个 bot 实例（this.bots[bot_id]）
 */
interface Client extends BaseClient {
  /** 返回好友列表 Map */
  fl: Map<number | string, Friend>
  /** 返回群聊列表 Map */
  gl: Map<number | string, Group>
  /** 返回群成员列表 Map */
  gml: Map<number | string, Member>

  /** 获得一个好友对象 */
  pickFriend: (user_id: number | string, strict?: boolean) => Friend
  /** 获得一个群对象 */
  pickGroup: (group_id: number | string, strict?: boolean) => Group
  /** 获得一个群友对象 */
  pickMember: (group_id: number | string, user_id: number | string) => Member

  /** 适配器信息 */
  adapter: Adapter

  // 其它任意字段/方法
  // [k: string]: any
}

export declare class Yunzai extends (EventEmitter as { new(): EventEmitter }) {
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
   * Bot账号数组   
   * 默认返回单个账号
   * */
  uin: BotUin

  /** 适配器列表 */
  adapter: Adapter[]

  // express app，源码对 express() 做了增强：增加 skip_auth, quiet
  express: express.Application & { skip_auth: string[]; quiet: string[] }

  // http server / https server / websocket server
  server: http.Server
  httpsServer?: http.Server
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
   * @param file 路径
   * @param opts 参数
   */
  fileToUrl(file: any, opts?: { name?: string; time?: boolean | number; times?: number }): Promise<string>
  fileSend(req: any): void

  // 事件处理
  prepareEvent(data: any): void
  em(name?: string, data?: any): void

  // 好友/群/成员 列表/检索工具
  getFriendArray(): Array<any>
  getFriendList(): Array<any>
  getFriendMap(): Map<any, any>
  readonly fl: Map<any, any>

  getGroupArray(): Array<any>
  getGroupList(): Array<any>
  getGroupMap(): Map<any, any>
  readonly gl: Map<any, any>

  get gml(): Map<any, any>

  pickFriend(user_id: string | number, strict?: boolean): Friend
  readonly pickUser: (user_id: string | number, strict?: boolean) => User

  pickGroup(group_id: string | number, strict?: boolean): Group
  pickMember(group_id: string | number, user_id: string | number): Member

  sendFriendMsg(bot_id: string | number | undefined | null, user_id: string | number, ...args: any[]): any
  sendGroupMsg(bot_id: string | number | undefined | null, group_id: string | number, ...args: any[]): any

  getTextMsg(fnc?: ((data: any) => boolean) | { self_id?: any; user_id?: any }): Promise<string>
  getMasterMsg(): Promise<string>
  /** 发送全部主人消息 */
  sendMasterMsg(msg: any, bot_array?: string | string[], sleep?: number): Promise<Record<string, any>>

  // 转发消息相关
  makeForwardMsg(msg: any): any
  makeForwardArray(msg?: any | any[], node?: object): any
  sendForwardMsg(send: (msg: any) => Promise<any> | any, msg: any): Promise<any[]>

  redisExit(): Promise<boolean>
  /** 
   * 退出进程
   * @param code 状态码
   */
  exit(code?: number): Promise<void> | void
  /** 重启 */
  restart(): Promise<void>


  [key: string]: Client | undefined
}