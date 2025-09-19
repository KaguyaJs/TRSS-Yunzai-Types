// 本部分由ai生成，内容可能存在不准确性
import type { EventEmitter } from "events"
import type express from "express"
import type http from "node:http"
import type { WebSocketServer } from "ws"

/**
 * uin 的特殊数组行为（源码实现了 toJSON/toString/includes/now 等）
 */
interface UinArray extends Array<string | number> {
  now?: string | number
  toJSON(): string | number
  toString(raw?: boolean, ...args: any[]): string
  includes(value: any): boolean
}

/**
 * Friend / Group / Member 的基础类型（根据源码拓展常用字段/方法）
 * 这些对象在源码中会被赋予 sendMsg / sendFile / makeForwardMsg / sendForwardMsg / getInfo 等方法
 */
interface ChatUser {
  user_id?: number | string
  id?: number | string
  name?: string
  nickname?: string
  card?: string
  bot_id?: string
  // 运行时可能被动态注入的方法
  sendMsg?: (...args: any[]) => any
  sendFile?: (file: any, name?: string) => any
  makeForwardMsg?: (msg: any) => any
  sendForwardMsg?: (msg: any) => any
  getInfo?: () => any
  [k: string]: any
}

interface Group extends ChatUser {
  group_id?: number | string
  group_name?: string
  pickMember?: (user_id: number | string) => ChatUser | undefined
}

interface Friend extends ChatUser {}

/**
 * 单个 bot 实例（this.bots[bot_id]）
 * 源码中 bots[*] 至少有 fl (friend list), gl (group list), gml 等字段
 */
interface BotClient {
  // maps: id -> data
  fl?: Map<number | string, Friend>
  gl?: Map<number | string, Group>
  // gml 结构在源码中是可迭代的：存放某种映射（例：Map 或数组），保守类型为 Map<number, any>
  gml?: Map<number | any, any>

  // 常见方法（源码会调用这些方法）
  pickFriend?: (user_id: number | string, strict?: boolean) => Friend | false | undefined
  pickGroup?: (group_id: number | string, strict?: boolean) => Group | false | undefined
  pickMember?: (group_id: number | string, user_id: number | string) => any
  sendMsg?: (...args: any[]) => any

  // 适配器信息
  adapter?: {
    id?: string
    name?: string
    [k: string]: any
  }

  // 其它任意字段/方法
  [k: string]: any
}

  export declare class Yunzai extends (EventEmitter as { new (): EventEmitter }) {
    // 状态
    stat: { start_time: number; online: number }
    bot: this
    // 所有子 bot（key 常为 bot id / uin）
    bots: Record<string, BotClient>

    // uin（特殊数组）——源码实现了自定义 toJSON/toString/includes/now 等
    uin: UinArray

    // 适配器数组
    adapter: any[]

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

    // 运行时可能被设置
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

    // 启动流程
    run(): Promise<void>

    // 文件服务：把文件映射为可通过 URL 访问
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

    pickFriend(user_id: string | number, strict?: boolean): any
    readonly pickUser: (user_id: string | number, strict?: boolean) => any

    pickGroup(group_id: string | number, strict?: boolean): any
    pickMember(group_id: string | number, user_id: string | number): any

    // 发送消息（源码对未在线 bot 有等待逻辑，因此返回值可能是 Promise）
    sendFriendMsg(bot_id: string | number | undefined | null, user_id: string | number, ...args: any[]): any
    sendGroupMsg(bot_id: string | number | undefined | null, group_id: string | number, ...args: any[]): any

    // 等待/获取文本消息工具
    getTextMsg(fnc?: ((data: any) => boolean) | { self_id?: any; user_id?: any }): Promise<string>
    getMasterMsg(): Promise<string>
    sendMasterMsg(msg: any, bot_array?: string | string[], sleep?: number): Promise<Record<string, any>>

    // 转发消息相关
    makeForwardMsg(msg: any): any
    makeForwardArray(msg?: any | any[], node?: object): any
    sendForwardMsg(send: (msg: any) => Promise<any> | any, msg: any): Promise<any[]>

    // redis / 进程控制
    redisExit(): Promise<boolean>
    exit(code?: number): Promise<void> | void
    restart(): Promise<void>

    // 任意索引签名：源码中构造了 Proxy(this.bots, get: (target, prop) => { ... })
    // 这里声明允许以任意字段读取（读取到的值类型不可知，故为 any）
    [key: string]: any
  }