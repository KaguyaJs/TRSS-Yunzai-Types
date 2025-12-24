import type {
  segment as BaseSegment,
  AtElem,
  ImageElem,
  PttElem,
  VideoElem,
  FileElem,
  segment
} from "./icqq.d.ts"
import type { MergeOpt } from "./internal/index.d.ts"
import type { Readable } from "node:stream"

interface segment {
  /**
   * 自定义消息段
   * @param type 消息类型
   * @param data 消息内容
   * @returns 合并后的消息段
   */
  custom<T extends string, D>(type: T, data: D): { type: T } & D
  /**
   * raw
   * @param data raw内容
   */
  raw<D>(data: D): { type: "raw", data: D }
  /**
   * Button
   * @param data BUrron消息内容
   */
  button<D>(...data: D[]): { type: "button", data: D }
  /**
   * Markdown
   * @param data Markdown消息内容
   */
  markdown<D extends string = string>(data: D): { type: "markdown", data: D }
  /**
   * 图片消息
   * @param file 图片文件
   * @param name 图片名称
   */
  image<F extends string | Readable | Buffer, N extends string>(file: F, name?: N): MergeOpt<ImageElem, { type: "image", file: F, name?: N }>
  /**
   * 艾特用户
   * @param qq 用户id，`"all"`为全体
   * @param name 用户名称
   */
  at<Q extends number | string, N extends string>(qq: Q, name?: N): MergeOpt<AtElem, { type: "at", qq: Q, name?: N }>
  /**
   * 语音
   * @param file 语音文件
   * @param name 语音名称
   */
  record<F extends string | Buffer, N extends string>(file: F, name?: N): MergeOpt<PttElem, { type: "record", file: F, name?: N }>
  /**
   * 视频消息
   * @param file 视频文件
   * @param name 视频名称
   */
  video<F extends string | Buffer, N extends string>(file: F, name?: N): MergeOpt<VideoElem, { type: "video", file: F, name?: N }>
  /**
   * 文件消息
   * @param file 文件
   * @param name 文件名称
   */
  file<F, N extends string>(file: F, name?: N): MergeOpt<FileElem, { type: "file", file: F, name?: N }>
  /**
   * 回复消息
   * @param id 消息id
   * @param text 文本
   * @param qq 用户id
   * @param time 消息时间戳
   * @param seq 消息序号
   */
  reply<I extends string, T extends string, Q extends number | string, TI extends number, S extends number>(id: I, text?: T, qq?: Q, time?: TI, seq?: S): {
    type: "reply",
    id: I
    text?: T,
    qq?: Q,
    time?: TI,
    seq?: S
  }
}

export type Segment = MergeOpt<typeof BaseSegment, segment>
