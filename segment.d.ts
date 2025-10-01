import { segment as BaseSegment, AtElem, ImageElem, PttElem, VideoElem, FileElem, segment } from "icqq"

type Merge<A, B> = Partial<Omit<A, keyof B>> & B

// type RequiredSeg = Pick<typeof Segment, "at" | "image" | "json" >

interface segment {
  /**
   * 自定义消息段
   * @param type 消息类型
   * @param data 消息内容
   * @returns 合并后的消息段
   */
  custom<T extends string, D extends object>(type: T, data: D): { type: T } & D
  /**
   * raw
   * @param data raw内容
   */
  raw<D extends object>(data: D): { type: "raw", data: D }
  /**
   * Button
   * @param data BUrron消息内容
   */
  button<D>(...data: D[]): { type: "button", data: D }
  /**
   * Markdown
   * @param data Markdown消息内容
   */
  markdown<D>(data: D): { type: "markdown", data: D }
  /**
   * 图片消息
   * @param file 图片文件
   * @param name 图片名称
   */
  image<F extends string, N extends string>(file: F, name?: N): Merge<ImageElem, { type: "image", file: F, name?: N }>
  /**
   * 艾特用户
   * @param qq 用户id，`"all"`为全体
   * @param name 用户名称
   */
  at<Q extends number | string, N extends string>(qq: Q, name?: N): Merge<AtElem, { type: "at", qq: Q, name?: N }>
  /**
   * 语音
   * @param file 语音文件
   * @param name 语音名称
   */
  record<F extends string, N extends string>(file: F, name?: N): Merge<PttElem, { type: "record", file: F, name?: N }>
  /**
   * 视频消息
   * @param file 视频文件
   * @param name 视频名称
   */
  video<F extends string, N extends string>(file: F, name?: N): Merge<VideoElem, { type: "video", file: F, name?: N }>
  /**
   * 文件消息
   * @param file 文件
   * @param name 文件名称
   */
  file<F extends string, N extends string>(file: F, name?: N): Merge<FileElem, { type: "file", file: F, name?: N }>
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
    time?: T,
    seq?: S
  }
}

export type Segment = Merge<typeof BaseSegment, segment>
