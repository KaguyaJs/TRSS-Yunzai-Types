/// <reference types="node" />
// icqq@0.6.10
import * as http from 'http';
import * as stream from 'stream';
import { Readable } from 'stream';
import { ToDispose, Trapper, Matcher, Listener } from 'triptrap';
import * as log4js from 'log4js';
import { Configuration } from 'log4js';
import { BinaryLike } from 'crypto';
import { Optional } from './internal/index.js';
import * as zlib from 'zlib';

/** 一个0长buf */
declare const BUF0: Buffer;
/** 4个0的buf */
declare const BUF4: Buffer;
/** 16个0的buf */
declare const BUF16: Buffer;
/** no operation */
declare const NOOP: () => void;
/** promisified unzip */
declare const unzip: typeof zlib.unzip.__promisify__;
/** promisified gzip */
declare const gzip: typeof zlib.gzip.__promisify__;
/** promisified pipeline */
declare const pipeline: typeof stream.pipeline.__promisify__;
/** md5 hash */
declare const md5: (data: BinaryLike) => Buffer;
/** sha hash */
declare const sha: (data: BinaryLike) => Buffer;
declare const randomString: (n: number, template?: string) => string;
declare function formatTime(value: Date | number | string, template?: string): string;
/** unix timestamp (second) */
declare const timestamp: () => number;
/** 数字ip转通用ip */
declare function int32ip2str(ip: number | string): string;
/** 隐藏并锁定一个属性 */
declare function lock(obj: any, prop: string): void;
declare function unlock(obj: any, prop: string): void;
/** 隐藏一个属性 */
declare function hide(obj: any, prop: string): void;

declare const constants_d_BUF0: typeof BUF0;
declare const constants_d_BUF16: typeof BUF16;
declare const constants_d_BUF4: typeof BUF4;
declare const constants_d_NOOP: typeof NOOP;
declare const constants_d_formatTime: typeof formatTime;
declare const constants_d_gzip: typeof gzip;
declare const constants_d_hide: typeof hide;
declare const constants_d_int32ip2str: typeof int32ip2str;
declare const constants_d_lock: typeof lock;
declare const constants_d_md5: typeof md5;
declare const constants_d_pipeline: typeof pipeline;
declare const constants_d_randomString: typeof randomString;
declare const constants_d_sha: typeof sha;
declare const constants_d_timestamp: typeof timestamp;
declare const constants_d_unlock: typeof unlock;
declare const constants_d_unzip: typeof unzip;
declare namespace constants_d {
    export {
        constants_d_BUF0 as BUF0,
        constants_d_BUF16 as BUF16,
        constants_d_BUF4 as BUF4,
        constants_d_NOOP as NOOP,
        constants_d_formatTime as formatTime,
        constants_d_gzip as gzip,
        constants_d_hide as hide,
        constants_d_int32ip2str as int32ip2str,
        constants_d_lock as lock,
        constants_d_md5 as md5,
        constants_d_pipeline as pipeline,
        constants_d_randomString as randomString,
        constants_d_sha as sha,
        constants_d_timestamp as timestamp,
        constants_d_unlock as unlock,
        constants_d_unzip as unzip,
    };
}

/** 性别 */
type Gender = "male" | "female" | "unknown";
/** 群内权限 */
type GroupRole = "owner" | "admin" | "member";
/** 可设置的在线状态 */
declare enum OnlineStatus {
    /** 离线 */
    Offline = 0,
    /** 在线 */
    Online = 11,
    /** 离开 */
    Absent = 31,
    /** 隐身 */
    Invisible = 41,
    /** 忙碌 */
    Busy = 50,
    /** Q我吧 */
    Qme = 60,
    /** 请勿打扰 */
    DontDisturb = 70
}

/** 陌生人资料 */
interface StrangerInfo {
    /** 帐号 */
    user_id: number | string;
    /** 昵称 */
    nickname: string;
}
/** 好友资料 */
interface FriendInfo extends StrangerInfo {
    /** 性别 */
    sex: Gender;
    /** 备注 */
    remark: string;
    /** 分组id */
    class_id: number;
}
/** 群资料 */
interface GroupInfo {
    /** 群号 */
    group_id: number | string;
    /** 群名 */
    group_name: string;
    /** 群员数 */
    member_count: number;
    /** 群员上限 */
    max_member_count: number;
    /** 群主账号 */
    owner_id: number;
    /** 是否为该群管理员 */
    admin_flag: boolean;
    /** 上次入群时间 */
    last_join_time: number;
    /** 上次发言时间 */
    last_sent_time?: number;
    /** 全体禁言时间 */
    shutup_time_whole: number;
    /** 被禁言时间 */
    shutup_time_me: number;
    /** 群创建时间 */
    create_time?: number;
    /** 群活跃等级 */
    grade?: number;
    /** 管理员上限 */
    max_admin_count?: number;
    /** 在线群员数 */
    active_member_count?: number;
    /** 群信息更新时间 */
    update_time: number;
}
/** 群员资料 */
interface MemberInfo {
    /** 所在群号 */
    group_id: number | string;
    /** 群员账号 */
    user_id: number | string;
    /** 昵称 */
    nickname: string;
    /** 性别 */
    sex: Gender;
    /** 群名片 */
    card: string;
    /** 年龄 */
    age: number;
    /** 地区 */
    area?: string;
    /** 入群时间 */
    join_time: number;
    /** 上次发言时间 */
    last_sent_time: number;
    /** 聊天等级 */
    level: number;
    /** 聊天排名 */
    rank?: string;
    /** 群权限 */
    role: GroupRole;
    /** 头衔 */
    title: string;
    /** 头衔到期时间 */
    title_expire_time: number;
    /** 禁言时间 */
    shutup_time: number;
    /** 群员信息更新时间 */
    update_time: number;
}

/** 生成短设备信息 */
declare function generateShortDevice(): {
    "--begin--": string;
    product: string;
    device: string;
    board: string;
    brand: string;
    model: string;
    wifi_ssid: string;
    bootloader: string;
    display: string;
    boot_id: string;
    proc_version: string;
    mac_address: string;
    ip_address: string;
    android_id: string;
    incremental: string;
    "--end--": string;
};
/** 生成完整设备信息 */
declare function generateFullDevice(apk: Apk, d?: ShortDevice): {
    display: string;
    product: string;
    device: string;
    board: string;
    brand: string;
    model: string;
    bootloader: string;
    fingerprint: string;
    boot_id: string;
    proc_version: string;
    baseband: string;
    sim: string;
    os_type: string;
    mac_address: string;
    ip_address: string;
    wifi_bssid: string;
    wifi_ssid: string;
    imei: string;
    android_id: string;
    apn: string;
    version: {
        incremental: string;
        release: string;
        codename: string;
        sdk: number;
    };
    imsi: Buffer;
    guid: Buffer;
};
type ShortDevice = ReturnType<typeof generateShortDevice>;
interface Device extends ReturnType<typeof generateFullDevice> {
    qImei16?: string;
    qImei36?: string;
    mtime?: number;
}
declare class Device {
    apk: Apk;
    private secret;
    private publicKey;
    constructor(apk: Apk, d?: ShortDevice);
    getQIMEI(): Promise<void>;
    genRandomPayloadByDevice(): {
        androidId: string;
        platformId: number;
        appKey: string;
        appVersion: string;
        beaconIdSrc: string;
        brand: string;
        channelId: string;
        cid: string;
        imei: string;
        imsi: string;
        mac: string;
        model: string;
        networkType: string;
        oaid: string;
        osVersion: string;
        qimei: string;
        qimei36: string;
        sdkVersion: string;
        targetSdkVersion: string;
        audit: string;
        userId: string;
        packageId: string;
        deviceType: string;
        sdkName: string;
        reserved: string;
    };
}
/**
 * 支持的登录设备平台
 * * `aPad`和`Watch`协议无法设置在线状态、无法接收某些群事件（包括戳一戳等）
 * * 目前仅`Watch`支持扫码登录，可能会支持`iPad`扫码登录
 */
declare enum Platform {
    /** 安卓手机 */
    Android = 1,
    /** 安卓平板 */
    aPad = 2,
    /** 安卓手表 */
    Watch = 3,
    /** MacOS */
    iMac = 4,
    /** iPad */
    iPad = 5,
    /** Tim */
    Tim = 6
}
/** 登录设备通用属性 */
type Apk = {
    id: string;
    app_key: string;
    name: string;
    version: string;
    ver: string;
    sign: Buffer;
    buildtime: number;
    appid: number;
    subid: number;
    apad_subid?: number;
    bitmap: number;
    main_sig_map: number;
    sub_sig_map: number;
    sdkver: string;
    display: string;
    /** 用于扫码登录 */
    device_type: number;
    qua: string;
    ssover: number;
};
declare function getApkInfoList(p: Platform): Apk[];

declare const FN_NEXT_SEQ: unique symbol;
declare const FN_SEND: unique symbol;
declare const FN_SEND_LOGIN: unique symbol;
declare const HANDLERS: unique symbol;
declare const NET: unique symbol;
declare const ECDH: unique symbol;
declare const IS_ONLINE: unique symbol;
declare const LOGIN_LOCK: unique symbol;
declare const HEARTBEAT: unique symbol;
declare enum VerboseLevel {
    Fatal = 0,
    Mark = 1,
    Error = 2,
    Warn = 3,
    Info = 4,
    Debug = 5
}
declare class ApiRejection {
    code: number;
    message: string;
    constructor(code: number, message?: string);
}
declare enum QrcodeResult {
    OtherError = 0,
    Timeout = 17,
    WaitingForScan = 48,
    WaitingForConfirm = 53,
    Canceled = 54
}
type Packet = {
    cmd: string;
    type: number;
    callbackId?: number;
    body: Buffer;
};
interface BaseClient {
    uin: number | string;
    uid: string;
    /** 收到二维码 */
    on(name: "internal.qrcode", listener: (this: this, qrcode: Buffer) => void): ToDispose<this>;
    /** 收到滑动验证码 */
    on(name: "internal.slider", listener: (this: this, url: string) => void): ToDispose<this>;
    /** 登录保护验证 */
    on(name: "internal.verify", listener: (this: this, url: string, phone: string) => void): ToDispose<this>;
    /** token过期(此时已掉线) */
    on(name: "internal.error.token", listener: (this: this) => void): ToDispose<this>;
    /** 网络错误 */
    on(name: "internal.error.network", listener: (this: this, code: number, message: string) => void): ToDispose<this>;
    /** 密码登录相关错误 */
    on(name: "internal.error.login", listener: (this: this, code: number, message: string) => void): ToDispose<this>;
    /** 扫码登录相关错误 */
    on(name: "internal.error.qrcode", listener: (this: this, code: QrcodeResult, message: string) => void): ToDispose<this>;
    /** 登录成功 */
    on(name: "internal.online", listener: (this: this, token: Buffer, nickname: string, gender: number, age: number) => void): ToDispose<this>;
    /** token更新 */
    on(name: "internal.token", listener: (this: this, token: Buffer) => void): ToDispose<this>;
    /** 服务器强制下线 */
    on(name: "internal.kickoff", listener: (this: this, reason: string) => void): ToDispose<this>;
    /** 业务包 */
    on(name: "internal.sso", listener: (this: this, cmd: string, payload: Buffer, seq: number) => void): ToDispose<this>;
    /** 日志信息 */
    on(name: "internal.verbose", listener: (this: this, verbose: unknown, level: VerboseLevel) => void): ToDispose<this>;
    on(name: string | symbol, listener: (this: this, ...args: any[]) => void): ToDispose<this>;
}
declare class BaseClient extends Trapper {
    config: Required<Config>;
    private [IS_ONLINE];
    private [LOGIN_LOCK];
    private [HEARTBEAT];
    private [ECDH];
    private readonly [NET];
    private readonly [HANDLERS];
    apk: Apk;
    readonly device: Device;
    readonly sig: Record<string, any>;
    readonly pkg: any;
    readonly pskey: {
        [domain: string]: Buffer;
    };
    readonly pt4token: {
        [domain: string]: Buffer;
    };
    /** 心跳间隔(秒) */
    protected interval: number;
    /** token刷新间隔(秒) */
    emp_interval: number;
    /** 随心跳一起触发的函数，可以随意设定 */
    protected heartbeat: () => void;
    /** token登录重试次数 */
    protected token_retry_num: number;
    /** 上线失败重试次数 */
    protected register_retry_num: number;
    protected login_timer: NodeJS.Timeout | null;
    /** 数据统计 */
    protected readonly statistics: {
        start_time: number;
        lost_times: number;
        recv_pkt_cnt: number;
        sent_pkt_cnt: number;
        lost_pkt_cnt: number;
        recv_msg_cnt: number;
        sent_msg_cnt: number;
        msg_cnt_per_min: number;
        remote_ip: string;
        remote_port: number;
        ver: string;
    };
    protected signCmd: string[];
    private ssoPacketList;
    constructor(p: Platform | undefined, d: ShortDevice, config: Required<Config>);
    /** 设置连接服务器，不设置则自动搜索 */
    setRemoteServer(host?: string, port?: number): void;
    setSignServer(addr?: string): Promise<void>;
    once(matcher: Matcher, listener: Listener): Trapper.Dispose;
    off(matcher: Matcher): void;
    emit(matcher: Matcher, ...args: any[]): void;
    /** 是否为在线状态 (可以收发业务包的状态) */
    isOnline(): boolean;
    getApkInfo(platform: Platform, ver?: string): Apk;
    getApkInfoList(platform: Platform): Apk[];
    buildReserveFields(cmd: string, sec_info: any): Buffer;
    switchQQVer(ver?: string): Promise<boolean>;
    updateCmdWhiteList(): Promise<void>;
    getCmdWhiteList(): Promise<never[]>;
    getApiQQVer(): Promise<string>;
    getT544(cmd: string): Promise<Buffer>;
    getSign(cmd: string, seq: number, body: Buffer): Promise<Buffer>;
    generateT544Packet(cmd: String, sign: Buffer): Buffer;
    generateSignPacket(sign: String, token: String, extra: String): Buffer;
    ssoPacketListHandler(list: Packet[] | null): Promise<void>;
    requestToken(): Promise<void>;
    requestSignToken(): Promise<never[]>;
    submitSsoPacket(cmd: string, callbackId: number, body: Buffer): Promise<Packet[]>;
    calcPoW(data: any): Buffer;
    /** 下线 (keepalive: 是否保持tcp连接) */
    logout(keepalive?: boolean): Promise<void>;
    /** 关闭连接 */
    terminate(): void;
    refreshToken(force?: boolean): Promise<boolean | undefined>;
    /** 使用接收到的token登录 */
    tokenLogin(token?: Buffer, cmd?: number): Promise<Buffer>;
    /**
     * 使用密码登录
     * @param uin 登录账号
     * @param md5pass 密码的md5值
     */
    passwordLogin(uin: number, md5pass: Buffer): Promise<void>;
    /** 收到滑动验证码后，用于提交滑动验证码 */
    submitSlider(ticket: string): Promise<void>;
    /** 收到设备锁验证请求后，用于发短信 */
    sendSmsCode(): Promise<void>;
    /** 提交短信验证码 */
    submitSmsCode(code: string): Promise<void>;
    /** 获取登录二维码 */
    fetchQrcode(): Promise<void>;
    /** 扫码后调用此方法登录 */
    qrcodeLogin(): Promise<void>;
    /** 获取扫码结果(可定时查询，retcode为0则调用qrcodeLogin登录) */
    queryQrcodeResult(): Promise<{
        retcode: number;
        uin: number | string | undefined;
        t106: Buffer | undefined;
        t16a: Buffer | undefined;
        t318: Buffer | undefined;
        tgtgt: Buffer | undefined;
    }>;
    private [FN_NEXT_SEQ];
    private [FN_SEND];
    private [FN_SEND_LOGIN];
    /** 发送一个业务包不等待返回 */
    writeUni(cmd: string, body: Uint8Array, seq?: number): Promise<void>;
    /** dont use it if not clear the usage */
    sendOidb(cmd: string, body: Uint8Array, timeout?: number): Promise<Buffer>;
    sendPacket(type: string, cmd: string, body: any): Promise<Buffer>;
    /** 发送一个业务包并等待返回 */
    sendUni(cmd: string, body: Uint8Array, timeout?: number): Promise<Buffer>;
    sendOidbSvcTrpcTcp(cmd: string, body: Uint8Array): Promise<any>;
    register(logout?: boolean, reflush?: boolean): Promise<unknown>;
    syncTimeDiff(): Promise<void>;
    token_expire(data?: any): Promise<void>;
    sendHeartbeat(): Promise<unknown>;
}

declare function encrypt(data: Buffer, key: Buffer): Buffer;
declare function decrypt(encrypted: Buffer, key: Buffer): Buffer;

declare const tea_d_decrypt: typeof decrypt;
declare const tea_d_encrypt: typeof encrypt;
declare namespace tea_d {
    export {
        tea_d_decrypt as decrypt,
        tea_d_encrypt as encrypt,
    };
}

interface Encodable {
    [tag: number]: any;
}
declare class Proto implements Encodable {
    private encoded;
    [tag: number]: any;
    get length(): number;
    constructor(encoded: Buffer, decoded?: Proto);
    toString(): string;
    toHex(): string;
    toBase64(): string;
    toBuffer(): Buffer;
    toJSON(): any;
    [Symbol.toPrimitive](): string;
}
declare function encode$1(obj: Encodable): Uint8Array;
declare function decode$1(encoded: Buffer): Proto;
declare function decodePb(buffer_data: Buffer): {};

type index_d$2_Encodable = Encodable;
type index_d$2_Proto = Proto;
declare const index_d$2_Proto: typeof Proto;
declare const index_d$2_decodePb: typeof decodePb;
declare namespace index_d$2 {
    export { index_d$2_Proto as Proto, decode$1 as decode, index_d$2_decodePb as decodePb, encode$1 as encode };
    export type { index_d$2_Encodable as Encodable };
}

type JceObject = {
    [tag: number]: any;
};
declare class Struct extends null {
}
declare class Nested {
    data: Buffer;
    constructor(data: Buffer);
}
declare function decode(encoded: Buffer): JceObject;
declare function encode(obj: JceObject | any[]): Buffer;
/** 嵌套结构数据必须调用此函数创建 */
declare function encodeNested(obj: JceObject | any[]): Nested;

declare function decodeWrapper(blob: Buffer): any;
declare function encodeWrapper(map: {
    [k: string]: Buffer;
}, servant: string, func: string, reqid?: number): Buffer;
declare function encodeStruct(nested: JceObject): Buffer;

type index_d$1_JceObject = JceObject;
type index_d$1_Nested = Nested;
declare const index_d$1_Nested: typeof Nested;
type index_d$1_Struct = Struct;
declare const index_d$1_Struct: typeof Struct;
declare const index_d$1_decode: typeof decode;
declare const index_d$1_decodeWrapper: typeof decodeWrapper;
declare const index_d$1_encode: typeof encode;
declare const index_d$1_encodeNested: typeof encodeNested;
declare const index_d$1_encodeStruct: typeof encodeStruct;
declare const index_d$1_encodeWrapper: typeof encodeWrapper;
declare namespace index_d$1 {
    export { index_d$1_Nested as Nested, index_d$1_Struct as Struct, index_d$1_decode as decode, index_d$1_decodeWrapper as decodeWrapper, index_d$1_encode as encode, index_d$1_encodeNested as encodeNested, index_d$1_encodeStruct as encodeStruct, index_d$1_encodeWrapper as encodeWrapper };
    export type { index_d$1_JceObject as JceObject };
}

type Domain = "aq.qq.com" | "buluo.qq.com" | "connect.qq.com" | "docs.qq.com" | "game.qq.com" | "gamecenter.qq.com" | "haoma.qq.com" | "id.qq.com" | "kg.qq.com" | "mail.qq.com" | "mma.qq.com" | "office.qq.com" | "openmobile.qq.com" | "qqweb.qq.com" | "qun.qq.com" | "qzone.qq.com" | "ti.qq.com" | "v.qq.com" | "vip.qq.com" | "y.qq.com" | "";

/** 通常来说只有前两个ip比较稳定，后面的可能距离较远 */
declare function fetchServerList(): Promise<{
    [ip: string]: number;
}>;

type index_d_ApiRejection = ApiRejection;
declare const index_d_ApiRejection: typeof ApiRejection;
type index_d_Apk = Apk;
type index_d_BaseClient = BaseClient;
declare const index_d_BaseClient: typeof BaseClient;
type index_d_Device = Device;
declare const index_d_Device: typeof Device;
type index_d_Domain = Domain;
type index_d_Platform = Platform;
declare const index_d_Platform: typeof Platform;
type index_d_QrcodeResult = QrcodeResult;
declare const index_d_QrcodeResult: typeof QrcodeResult;
type index_d_ShortDevice = ShortDevice;
type index_d_VerboseLevel = VerboseLevel;
declare const index_d_VerboseLevel: typeof VerboseLevel;
declare const index_d_fetchServerList: typeof fetchServerList;
declare const index_d_generateFullDevice: typeof generateFullDevice;
declare const index_d_generateShortDevice: typeof generateShortDevice;
declare const index_d_getApkInfoList: typeof getApkInfoList;
declare namespace index_d {
    export { index_d_ApiRejection as ApiRejection, index_d_BaseClient as BaseClient, index_d_Device as Device, index_d_Platform as Platform, index_d_QrcodeResult as QrcodeResult, index_d_VerboseLevel as VerboseLevel, constants_d as constants, index_d_fetchServerList as fetchServerList, index_d_generateFullDevice as generateFullDevice, index_d_generateShortDevice as generateShortDevice, index_d_getApkInfoList as getApkInfoList, index_d$1 as jce, index_d$2 as pb, tea_d as tea };
    export type { index_d_Apk as Apk, index_d_Domain as Domain, index_d_ShortDevice as ShortDevice };
}

/** 支持的音乐平台 */
type MusicPlatform = 'qq' | '163' | 'migu' | 'kugou' | 'kuwo';
type MusicFullInfo = {
    title: string;
    singer: string;
    jumpUrl: string;
    musicUrl: string;
    preview: string;
};

/** TEXT (此元素可使用字符串代替) */
interface TextElem {
    type: "text";
    /** 文字内容 */
    text: string;
}
/** AT */
interface AtElem {
    type: "at";
    qq: number | string;
    id?: string | string;
    /** AT后跟的字符串，接收消息时有效 */
    text?: string;
    /** 假AT */
    dummy?: boolean;
}
/** 表情 */
interface FaceElem {
    type: "face" | "sface";
    /** face为0~348，sface不明 */
    id: number;
    /** 表情说明，接收消息时有效 */
    text?: string;
    /** @todo 未知属性 */
    qlottie?: string;
}
/** 原创表情 */
interface BfaceElem {
    type: "bface";
    /** 暂时只能发收到的file */
    file: string;
    /** 表情说明 */
    text: string;
}
/** 魔法表情 */
interface MfaceElem {
    /** `rps`表示石头剪刀布，`dice`表示骰子 */
    type: "rps" | "dice";
    /** @todo 待添加属性说明 */
    id?: number;
}
/** 图片 */
interface ImageElem {
    type: "image";
    /**
     * @type {string} 本地图片文件路径，例如`"/tmp/1.jpg"`
     * @type {Buffer} 图片`Buffer`
     * @type {Readable} 可读的图片数据流
     */
    file: string | Buffer | stream.Readable;
    /** 网络图片是否使用缓存 */
    cache?: boolean;
    /** 流的超时时间，默认60(秒) */
    timeout?: number;
    headers?: http.OutgoingHttpHeaders;
    /** 图片url地址，接收时有效 */
    url?: string;
    /** 是否作为表情发送 */
    asface?: boolean;
    /** 是否显示下载原图按钮 */
    origin?: boolean;
    /** 图片概要 */
    summary?: string;
    /** 图片fid，接收时有效(QQNT) */
    fid?: string;
    /** 图片md5，接收时有效 */
    md5?: string;
    /** 图片高度，接收时有效 */
    height?: number;
    /** 图片宽度，接收时有效 */
    width?: number;
    /** 图片大小，接收时有效 */
    size?: number;
}
/** 闪照 */
interface FlashElem extends Omit<ImageElem, "type"> {
    type: "flash";
}
/** 语音 */
interface PttElem {
    type: "record";
    /**
     * 支持`raw silk`和`amr`文件
     * @type {string} 本地语音文件路径，例如`"/tmp/1.slk"`
     * @type {Buffer} ptt buffer (silk or amr)
     */
    file: string | Buffer;
    /** 语音url地址，接收时有效 */
    url?: string;
    md5?: string;
    /** 文件大小，接收时有效 */
    size?: number;
    /** 语音时长（秒） */
    seconds?: number;
}
/** 视频 */
interface VideoElem {
    type: "video";
    /**
     * 需要`ffmpeg`和`ffprobe`
     * @type {string} 本地视频文件路径，例如`"/tmp/1.mp4"`
     * @type {Buffer} video buffer
     */
    file: string | Buffer;
    /** 视频名，接收时有效 */
    name?: string;
    /** 作为文件的文件id，接收时有效 */
    fid?: string;
    md5?: string;
    /** 文件大小，接收时有效 */
    size?: number;
    /** 视频时长（秒），接收时有效 */
    seconds?: number;
    /** 发送完成后是否删除文件 */
    temp?: boolean;
}
/** 地点分享 */
interface LocationElem {
    type: "location";
    /** 地址描述 */
    address: string;
    /** 纬度 */
    lat: number;
    /** 经度 */
    lng: number;
    /** @todo 未知属性 */
    name?: string;
    /** @todo 未知属性 */
    id?: string;
}
/** 链接分享 */
interface ShareElem {
    type: "share";
    /** 链接地址 */
    url: string;
    /** 链接标题 */
    title: string;
    /** 链接内容，接收时有效 */
    content?: string;
    /** 链接配图，接收时有效 */
    image?: string;
}
/** JSON */
interface JsonElem {
    type: "json";
    data: any;
}
/** XML */
interface XmlElem {
    type: "xml";
    data: string;
    id?: number;
}
/** 戳一戳 */
interface PokeElem {
    type: "poke";
    /** 0~6 */
    id: number;
    /** 动作描述 */
    text?: string;
}
/** Markdown消息 */
interface MarkdownElem {
    type: "markdown";
    content: string;
}
interface MarkdownElem$1 {
    type: "markdown";
    data: string;
}
/** Button消息 */
interface ButtonElem {
    type: "button";
    content: {
        /** 机器人appid */
        appid: number;
        /** rows 数组的每个元素表示每一行按钮 */
        rows: {
            buttons: Button[];
        }[];
    };
}
interface Button {
    /** 按钮ID：在一个keyboard消息内设置唯一 */
    id?: string;
    render_data: {
        /** 按钮上的文字 */
        label: string;
        /** 点击后按钮的上文字 */
        visited_label: string;
        /** 按钮样式：0 灰色线框，1 蓝色线框 */
        style: number;
    };
    action: {
        /** 设置 0 跳转按钮：http 或 小程序 客户端识别 scheme，设置 1 回调按钮：回调后台接口, data 传给后台，设置 2 指令按钮：自动在输入框插入 @bot data */
        type: number;
        permission: {
            /** 0 指定用户可操作，1 仅管理者可操作，2 所有人可操作 */
            type: number;
            /** 有权限的用户 id 的列表 */
            specify_user_ids?: Array<string>;
        };
        /** 操作相关的数据 */
        data: string;
        /** 指令按钮可用，指令是否带引用回复本消息，默认 false。支持版本 8983 */
        reply?: boolean;
        /** 指令按钮可用，点击按钮后直接自动发送 data，默认 false。支持版本 8983 */
        enter?: boolean;
        /** 本字段仅在指令按钮下有效，设置后后会忽略 action.enter 配置。
        设置为 1 时 ，点击按钮自动唤起启手Q选图器，其他值暂无效果。
        （仅支持手机端版本 8983+ 的单聊场景，桌面端不支持） */
        anchor?: number;
        /** 客户端不支持本action的时候，弹出的toast文案 */
        unsupport_tips: string;
    };
}
/** 特殊 (官方客户端无法解析此消息) */
interface MiraiElem {
    type: "mirai";
    data: string;
}
/** 文件，只支持接收，发送请使用文件专用API */
interface FileElem {
    type: "file";
    /** 文件名 */
    name: string;
    /** 文件id */
    fid: string;
    md5: string;
    /** 文件大小 */
    size: number;
    /** 存在时间 */
    duration: number;
}
interface FileElem$1 extends Partial<FileElem> {
    type: "file"
    file: string
    name?: string
}
/** 引用回复 */
interface ReplyElem {
    type: "reply";
    text?: string;
    id: string;
}
/** 分享音乐 */
interface MusicElem extends Partial<MusicFullInfo> {
    type: 'music';
    /** 音乐id */
    id: string;
    /** 音乐平台 */
    platform: MusicPlatform;
}
/** 可引用回复的消息 */
interface Quotable {
    /** 消息发送方账号 */
    user_id: number | string;
    time: number;
    seq: number;
    /** 私聊回复必须包含此属性 */
    rand: number;
    /** 收到的引用回复永远是字符串 */
    message: Sendable;
}
/** 引用回复消息 */
interface QuoteElem extends Quotable {
    type: 'quote';
}
/** 可转发的消息 */
interface Forwardable {
    /** 消息发送方账号 */
    user_id: number | string;
    /** 发送的消息 */
    message: Sendable;
    /** 发送方昵称，接收时有效 */
    nickname?: string;
    /** 发送时间，接收时有效 */
    time?: number;
}
/** 可转发节点 */
interface ForwardNode extends Forwardable {
    type: 'node';
}
/** 转发节点消息 */
interface ForwardElem {
    type: 'node';
    data: Optional<Forwardable, 'user_id'>[]
}
interface RawElem {
    type: 'raw';
    data: any
}
/** 按钮基类 */
export interface AButton {
  /** 按钮上的文字 */
  text: string
  /** 按钮点击后的文字 */
  
  clicked_text?: string
  /** 谁能点按钮 */
  permission?: string | string[]
  /** 平台额外字段，[平台名: 内容]，非目标平台忽略 */
  [key: string]: unknown
}
/** 链接按钮 */
export interface ButtonLink extends AButton {
  link: string
}
/** 输入按钮 */
export interface ButtonInput extends AButton {
  input: string
  /** 是否直接发送 */
  send?: boolean
}
/** 回调按钮 */
export interface ButtonCallback extends AButton {
  callback: string
}
export type ButtonType = ButtonLink | ButtonInput | ButtonCallback
/** 按钮消息 */
interface ButtonElem$1 {
  type: "button"
  /** 按钮[行][列] */
  data: ButtonType[][]
}
/** 注意：只有`ChainElem`中的元素可以组合发送，其他元素只能单独发送 */
type MessageElem =
    | TextElem
    | FaceElem
    | BfaceElem
    | MfaceElem
    | ImageElem
    | AtElem
    | MiraiElem
    | ReplyElem
    | FlashElem
    | PttElem
    | VideoElem
    | JsonElem
    | XmlElem
    | PokeElem
    | LocationElem
    | ShareElem
    | MusicElem
    | ForwardNode
    | ForwardElem
    | QuoteElem
    | MarkdownElem
    | MarkdownElem$1
    | FileElem
    | FileElem$1
    | ButtonElem
    | ButtonElem$1
    | RawElem;
/** 可通过`sendMsg`发送的类型集合 (字符串、元素对象，或它们的数组) */
type Sendable = string | MessageElem | (string | MessageElem)[];
/** 用于构造消息元素 */
declare const segment: {
    /** @deprecated 文本，建议直接使用字符串 */
    text(text: string): TextElem;
    /** 经典表情(id=0~324) */
    face(id: number): FaceElem;
    /** 小表情(id规则不明) */
    sface(id: number, text?: string): FaceElem;
    /** 原创表情(file规则不明) */
    bface(file: string, text: string): BfaceElem;
    /** 猜拳(id=1~3) */
    rps(id?: number): MfaceElem;
    /** 骰子(id=1~6) */
    dice(id?: number): MfaceElem;
    /** mention@提及
     * @param qq 全体成员:"all"
     */
    at(qq: number | "all" | string, text?: string, dummy?: boolean): AtElem;
    /** 图片，支持http://,base64:// */
    image(file: ImageElem["file"], cache?: boolean, timeout?: number, headers?: http.OutgoingHttpHeaders): ImageElem;
    /** 闪照，支持http://,base64:// */
    flash(file: ImageElem["file"], cache?: boolean, timeout?: number, headers?: http.OutgoingHttpHeaders): FlashElem;
    /** 语音，支持http://,base64:// */
    record(file: string | Buffer, data?: any): PttElem;
    /** 视频，支持http://,base64:// */
    video(file: string | Buffer, data?: any): VideoElem;
    json(data: any): JsonElem;
    xml(data: string, id?: number): XmlElem;
    markdown(content: string): MarkdownElem;
    button(content: ButtonElem["content"]): ButtonElem;
    /** 一种特殊消息(官方客户端无法解析) */
    mirai(data: string): MiraiElem;
    /** 音乐 */
    music(id: string, platform?: MusicPlatform): Promise<JsonElem>;
    fake(user_id: number, message: Sendable, nickname?: string, time?: number): ForwardNode;
    /** 链接分享 */
    share(url: string, title: string, image?: string, content?: string): ShareElem;
    /** 位置分享 */
    location(lat: number, lng: number, address: string, id?: string): LocationElem;
    /** id 0~6 */
    poke(id: number): PokeElem;
    /** @deprecated 将CQ码转换为消息链 */
    fromCqcode(str: string): MessageElem[];
};

/** 消息解析器 */
declare class Parser {
    private uin?;
    message: MessageElem[];
    brief: string;
    content: string;
    /** 匿名情报 */
    anon?: Proto;
    /** 额外情报 */
    extra?: Proto;
    /** 引用回复 */
    quotation?: Proto;
    atme: boolean;
    atall: boolean;
    newImg: boolean;
    imgprefix: any;
    private exclusive;
    private it?;
    constructor(rich: Proto | Proto[], uin?: number | undefined);
    /** 获取下一个节点的文本 */
    private getNextText;
    /** 解析: xml, json, ptt, video, flash, file, shake, poke */
    private parseExclusiveElem;
    /** 解析: text, at, face, bface, sface, image, mirai */
    private parsePartialElem;
    private parseElems;
    private parseNewImgElem;
    private parseImgElem;
}
declare function getGroupImageUrl(md5: string): string;

/** 匿名情报 */
interface Anonymous {
    /** 是否可以匿名发言 */
    enable: boolean;
    flag: string;
    id: number;
    id2: number;
    name: string;
    expire_time: number;
    color: string;
}
/** @cqhttp 生成私聊消息id */
declare function genDmMessageId(uid: number | string, seq: number, rand: number, time: number, flag?: number): string;
/** @cqhttp 解析私聊消息id */
declare function parseDmMessageId(msgid: string): {
    user_id: number | string;
    seq: number;
    rand: number;
    time: number;
    flag: number;
};
/** @cqhttp 生成群消息id */
declare function genGroupMessageId(gid: number | string, uid: number | string, seq: number, rand: number, time: number, pktnum?: number): string;
/** @cqhttp 解析群消息id */
declare function parseGroupMessageId(msgid: string): {
    group_id: number | string;
    user_id: number | string;
    seq: number;
    rand: number;
    time: number;
    pktnum: number;
};
/** 一条消息 */
declare abstract class Message implements Quotable, Forwardable {
    protected proto: Proto;
    protected readonly parsed: Parser;
    /**
     * 该值永远指向消息发送者。
     * 对于私聊消息，请使用`from_id`和`to_id`来确定发送者和接收者。
     * 建议使用 `sender.user_id`
     * @deprecated 未来会改为访问器，仅供内部转发消息时使用。
     */
    user_id: number | string;
    /** 发送方昵称，仅供内部转发消息时使用 */
    get nickname(): string;
    post_type: "message";
    /** 消息时间 */
    time: number;
    /** 消息元素数组 */
    message: MessageElem[];
    /** 字符串形式的消息 */
    raw_message: string;
    font: string;
    /** @cqhttp cqhttp方法用 */
    message_id: string;
    /** 消息编号，在群消息中是唯一的 (私聊消息建议至少使用time,seq,rand中的两个判断唯一性) */
    seq: number;
    /** 消息随机数 */
    rand: number;
    /** 发送方 */
    sender?: {
        [k: string]: any;
    };
    /** 引用回复 */
    source?: Quotable;
    pktnum: number;
    index: number;
    div: number;
    /** 反序列化一条消息 (私聊消息需要你的uin) */
    static deserialize(serialized: Buffer, uin?: number): GroupMessage | PrivateMessage;
    /** 组合分片消息(通常仅内部使用) */
    static combine(msgs: Message[]): Message;
    constructor(proto: Proto);
    /** 将消息序列化保存 */
    serialize(): Buffer;
    /** 以适合人类阅读的形式输出 */
    toString(): string;
    toJSON(keys: string[]): Record<string, any>;
    /** @deprecated 转换为CQ码 */
    toCqcode(): string;
}
/** 一条私聊消息 */
declare class PrivateMessage extends Message {
    message_type: "private";
    /**
     * @type {"friend"} 好友
     * @type {"group"} 群临时会话
     * @type {"other"} 其他途径的临时会话
     * @type {"self"} 我的设备
     */
    sub_type: "friend" | "group" | "other" | "self";
    /** 发送方账号 */
    from_id: number | string;
    /** 接收方账号 */
    to_id: number | string;
    /** 是否为自动回复 */
    auto_reply: boolean;
    /** 发送方信息 */
    sender: {
        /** 账号 */
        user_id: number | string;
        /** 昵称 */
        nickname: string;
        /** 群号，当消息来自群聊时有效 */
        group_id: number | string | undefined;
    };
    /** 反序列化一条私聊消息，你需要传入你的`uin`，否则无法知道你是发送者还是接收者 */
    static deserialize(serialized: Buffer, uin?: number): PrivateMessage;
    constructor(proto: Proto, uin?: number);
}
/** 一条群消息 */
declare class GroupMessage extends Message {
    message_type: "group";
    /**
     * @type {"normal"} 普通消息
     * @type {"anonymous"} 匿名消息
     */
    sub_type: "normal" | "anonymous";
    /** 群号 */
    group_id: number | string;
    /** 群名 */
    group_name: string;
    /** 匿名信息，{@link sub_type} 为`"anonymous"`时该属性有效 */
    anonymous: Anonymous | null;
    /** @todo 未知属性 */
    block: boolean;
    /** 是否AT我 */
    atme: boolean;
    /** 是否AT全体成员 */
    atall: boolean;
    /** 发送方信息 */
    sender: {
        /** 账号 */
        user_id: number | string;
        /** 昵称 */
        nickname: string;
        /** @todo 未知属性 */
        sub_id: string;
        /** 名片 */
        card: string;
        /** 性别，@deprecated */
        sex: Gender;
        /** 年龄，@deprecated */
        age: number;
        /** 地区，@deprecated */
        area: string;
        /** 等级 */
        level: number;
        /** 权限 */
        role: GroupRole;
        /** 头衔 */
        title: string;
    };
    /** 反序列化一条群消息 */
    static deserialize(serialized: Buffer): GroupMessage;
    constructor(proto: Proto);
}
/** 一条转发消息 */
declare class ForwardMessage implements Forwardable {
    protected proto: Proto;
    /** @todo 未知属性 */
    private parsed;
    /** 账号 */
    user_id: number | string;
    /** 昵称 */
    nickname: string;
    /** 若转自群聊，则表示群号 */
    group_id?: number | string;
    /** 发送时间 */
    time: number;
    /** 发送序号 */
    seq: number;
    /** 消息内容 */
    message: MessageElem[];
    raw_message: string;
    /** 反序列化一条转发消息 */
    static deserialize(serialized: Buffer): ForwardMessage;
    constructor(proto: Proto);
    /** 将转发消息序列化保存 */
    serialize(): Buffer;
    /** 以适合人类阅读的形式输出 */
    toString(): string;
    /** @deprecated 转换为CQ码 */
    toCqcode(): string;
}

/** 从图片的file中解析出图片属性参数 */
declare function parseImageFileParam(file: string): {
    md5: string;
    size: number;
    width: number;
    height: number;
    ext: string;
};
declare class Image {
    private dm;
    private cachedir?;
    /** 最终用于发送的对象 */
    proto: {
        [tag: number]: any;
    };
    /** 用于上传的文件流 */
    readable?: Readable;
    /** 实例化后必须等待此异步任务完成后才能上传图片 */
    task: Promise<void>;
    /** 从服务端拿到fid后必须设置此值，否则图裂 */
    set fid(val: any);
    private _fid?;
    /** 图片属性 */
    md5: Buffer;
    size: number;
    width: number;
    height: number;
    type: number;
    origin?: boolean;
    private asface?;
    summary?: string;
    /** 缓存文件路径 */
    private cachefile?;
    /** 临时文件路径 */
    private tmpfile?;
    /** @param elem
     * @param cachedir
     @param dm 是否私聊图片 */
    constructor(elem: ImageElem | FlashElem, dm?: boolean, cachedir?: string | undefined);
    private setProperties;
    private parseFileParam;
    private fromProbeSync;
    private fromReadable;
    private fromWeb;
    private fromLocal;
    private setProto;
    /** 服务端图片失效时建议调用此函数 */
    deleteCacheFile(): void;
    /** 图片上传完成后建议调用此函数(文件存在系统临时目录中) */
    deleteTmpFile(): void;
}

interface ConverterExt {
    /** 是否是私聊(default:false) */
    dm?: boolean;
    /** 网络图片缓存路径 */
    cachedir?: string;
    /** 群员列表(用于AT时查询card) */
    mlist?: Map<number, {
        card?: string;
        nickname?: string;
    }>;
}
/** 将消息元素转换为protobuf */
declare class Converter {
    private ext?;
    is_chain: boolean;
    elems: Encodable[];
    /** 用于最终发送 */
    rich: Encodable;
    /** 长度(字符) */
    length: number;
    /** 包含的图片(可能需要上传) */
    imgs: Image[];
    /** 预览文字 */
    brief: string;
    /** 分片后 */
    private fragments;
    constructor(content: Sendable, ext?: ConverterExt | undefined);
    private _convert;
    private _text;
    private text;
    private at;
    private face;
    private sface;
    private bface;
    private dice;
    private rps;
    private image;
    private flash;
    private record;
    private video;
    private location;
    private node;
    private music;
    private share;
    private json;
    private xml;
    private poke;
    private markdown;
    private button;
    private mirai;
    private file;
    private reply;
    /** 转换为分片消息 */
    toFragments(): Uint8Array[];
    private _divideText;
    private _pushFragment;
    /** 匿名化 */
    anonymize(anon: Omit<Anonymous, "flag">): void;
    /** 引用回复 */
    quote(source: Quotable): void;
}

/** 所有可选参数，默认为QQ浏览器 */
interface ShareConfig {
    appid?: number;
    appname?: string;
    /** app签名hash */
    appsign?: string;
}
/** 分享链接 */
interface ShareContent {
    /** 跳转链接, 没有则发不出 */
    url: string;
    /** 链接标题 */
    title: string;
    /** 从消息列表中看到的文字，默认为 `"[分享]"+title` */
    content?: string;
    /** 预览图网址, 默认为QQ浏览器图标，似乎对域名有限制 */
    image?: string;
    summary?: string;
    audio?: string;
}

/** 调用API时可能出现的错误 */
declare enum ErrorCode {
    /** 客户端离线 */
    ClientNotOnline = -1,
    /** 发包超时未收到服务器回应 */
    PacketTimeout = -2,
    /** 用户不存在 */
    UserNotExists = -10,
    /** 群不存在(未加入) */
    GroupNotJoined = -20,
    /** 群员不存在 */
    MemberNotExists = -30,
    /** 发消息时传入的参数不正确 */
    MessageBuilderError = -60,
    /** 群消息被风控发送失败 */
    RiskMessageError = -70,
    /** 群消息有敏感词发送失败 */
    SensitiveWordsError = -80,
    /** 上传图片/文件/视频等数据超时 */
    HighwayTimeout = -110,
    /** 上传图片/文件/视频等数据遇到网络错误 */
    HighwayNetworkError = -120,
    /** 没有上传通道 */
    NoUploadChannel = -130,
    /** 不支持的file类型(没有流) */
    HighwayFileTypeError = -140,
    /** 文件安全校验未通过不存在 */
    UnsafeFile = -150,
    /** 离线(私聊)文件不存在 */
    OfflineFileNotExists = -160,
    /** 群文件不存在(无法转发) */
    GroupFileNotExists = -170,
    /** 获取视频中的图片失败 */
    FFmpegVideoThumbError = -210,
    /** 音频转换失败 */
    FFmpegPttTransError = -220
}
/** 登录时可能出现的错误，不在列的都属于未知错误，暂时无法解决 */
declare enum LoginErrorCode {
    /** 密码错误 */
    WrongPassword = 1,
    /** 账号被冻结 */
    AccountFrozen = 40,
    /** 发短信太频繁 */
    TooManySms = 162,
    /** 短信验证码错误 */
    WrongSmsCode = 163,
    /** 滑块ticket错误 */
    WrongTicket = 237
}

/** 发消息的返回值 */
interface MessageRet {
    /** 消息id */
    message_id: string;
    seq: number;
    rand: number;
    time: number;
}
/** 所有消息共通属性 */
interface MessageEvent {
    /**
     * 快速回复
     * @param content 消息内容
     * @param quote 引用这条消息(默认false)
     */
    reply(content: Sendable, quote?: boolean): Promise<MessageRet>;
}
/** 私聊消息 */
interface PrivateMessageEvent extends PrivateMessage, MessageEvent {
    /** 是否为私聊 */
    isPrivate: true
    /** 好友对象 */
    friend: Friend;
}
/** 群消息 */
interface GroupMessageEvent extends GroupMessage, MessageEvent {
    /** 快速撤回 */
    recall(): Promise<boolean>;
    /** 是否为群聊 */
    isGroup: true;
    /** 群对象 */
    group: Group;
    /** 发送者群员对象 */
    member: Member;
}
/** 所有申请共通属性 */
interface RequestEvent {
    post_type: "request";
    /** 账号 */
    user_id: number | string;
    /** 昵称 */
    nickname: string;
    /** @cqhttp cqhttp方法用 */
    flag: string;
    seq: number;
    time: number;
    /** 快速操作方法 */
    approve(yes?: boolean): Promise<boolean>;
}
/** 好友申请 */
interface FriendRequestEvent extends RequestEvent {
    request_type: "friend";
    /** 为single时对方已将你加为单向好友 */
    sub_type: "add" | "single";
    /** 请求消息 */
    comment: string;
    /** 申请来源 */
    source: string;
    /** 年龄 */
    age: number;
    /** 性别 */
    sex: Gender;
}
/** 群申请 */
interface GroupRequestEvent extends RequestEvent {
    request_type: "group";
    sub_type: "add";
    /** 群号 */
    group_id: number | string;
    /** 群名 */
    group_name: string;
    /** 群简介 */
    comment: string;
    /** 如果被邀请进群，则显示邀请者账号 */
    inviter_id?: number;
    /** 申请提示 @todo 不确定的注释 */
    tips: string;
}
/** 群邀请 */
interface GroupInviteEvent extends RequestEvent {
    request_type: "group";
    sub_type: "invite";
    /** 群号 */
    group_id: number | string;
    /** 群名 */
    group_name: string;
    /** 邀请者在群里的权限 @todo 不确定的注释 */
    role: GroupRole;
}
/** 好友通知共通属性 */
interface FriendNoticeEvent {
    post_type: "notice";
    notice_type: "friend";
    /** 对方账号 */
    user_id: number | string;
    /** 好友对象 */
    friend: Friend;
}
/** 好友增加 */
interface FriendIncreaseEvent extends FriendNoticeEvent {
    sub_type: "increase";
    /** 好友昵称 */
    nickname: string;
}
/** 好友减少 */
interface FriendDecreaseEvent extends FriendNoticeEvent {
    sub_type: "decrease";
    /** 好友昵称 */
    nickname: string;
}
/** 好友消息撤回 */
interface FriendRecallEvent extends FriendNoticeEvent {
    sub_type: "recall";
    /** 好友账号 */
    operator_id: number;
    /** @cqhttp cqhttp方法用 */
    message_id: string;
    seq: number;
    rand: number;
    time: number;
}
/** 好友戳一戳 */
interface FriendPokeEvent extends FriendNoticeEvent {
    sub_type: "poke";
    /** 好友账号 */
    operator_id: number | string;
    /** 目标账号 */
    target_id: number | string;
    /** 戳一戳动作 */
    action: string;
    /** @todo 未知字段 */
    suffix: string;
}
/** 群通知共通属性 */
interface GroupNoticeEvent {
    post_type: "notice";
    notice_type: "group";
    /** 群号 */
    group_id: number | string;
    /** 群对象 */
    group: Group;
}
/** 群打卡 */
interface GroupSignEvent extends GroupNoticeEvent {
    sub_type: "sign";
    /** 群号 */
    group_id: number | string;
    /** 打卡者账号 */
    user_id: number | string;
    /** 打卡者昵称 */
    nickname: string;
    /** 打卡提示 */
    sign_text: string;
}
/** 群员增加 */
interface MemberIncreaseEvent extends GroupNoticeEvent {
    sub_type: "increase";
    /** 群员账号 */
    user_id: number | string;
    /** 群员昵称 */
    nickname: string;
}
/** 群员减少 */
interface MemberDecreaseEvent extends GroupNoticeEvent {
    sub_type: "decrease";
    /** 主动退群为群员账号，被管理员/群主踢出为管理员/群主账号 */
    operator_id: number | string;
    /** 群员账号 */
    user_id: number | string;
    /** 如果是群主退群，则群解散 */
    dismiss: boolean;
    /** 退群的群员信息 */
    member?: MemberInfo;
}
/** 群消息撤回 */
interface GroupRecallEvent extends GroupNoticeEvent {
    sub_type: "recall";
    /** 群员账号 */
    user_id: number | string;
    /** 撤回消息的群员账号 */
    operator_id: number | string;
    /** @cqhttp cqhttp方法用 */
    message_id: string;
    seq: number;
    rand: number;
    time: number;
}
/** 群戳一戳 */
interface GroupPokeEvent extends GroupNoticeEvent {
    sub_type: "poke";
    /** @deprecated 群中该值永远等于target_id */
    user_id: number | string;
    /** 群员账号 */
    operator_id: number | string;
    /** 目标账号 */
    target_id: number | string;
    /** 戳一戳动作 */
    action: string;
    /** @todo 未知字段 */
    suffix: string;
}
/** 管理员变更 */
interface GroupAdminEvent extends GroupNoticeEvent {
    sub_type: "admin";
    /** 变更的群员账号 */
    user_id: number | string;
    /** 是否设置为管理员 */
    set: boolean;
}
/** 群禁言 */
interface GroupMuteEvent extends GroupNoticeEvent {
    sub_type: "ban";
    /** 禁言的群员账号 */
    operator_id: number | string;
    /** 被禁言的群员账号 */
    user_id: number | string;
    /** 禁言时长 */
    duration: number;
    /** 匿名禁言才有此属性 */
    nickname?: string;
}
/** 群转让 */
interface GroupTransferEvent extends GroupNoticeEvent {
    sub_type: "transfer";
    /** 转让群的群员账号 */
    operator_id: number | string;
    /** 被转让为群主的账号 */
    user_id: number | string;
}
type PushStrToNextStr<S extends string, NS extends string> = NS extends `${infer L}.${infer R}` ? `${L}.${S}.${R}` : `${NS}.${S}`;
type MessageEventMap = {
    "message"(event: PrivateMessageEvent | GroupMessageEvent): void;
} & {
    [P in keyof PrivateMessageEventMap as PushStrToNextStr<"private", P>]: PrivateMessageEventMap[P];
} & {
    [P in keyof GroupMessageEventMap as PushStrToNextStr<"group", P>]: GroupMessageEventMap[P];
};
type NoticeEventMap = {
    "notice"(...event: Parameters<MergeEventMap["notice.friend"]> | Parameters<MergeEventMap["notice.group"]>): void;
} & {
    [P in keyof FriendNoticeEventMap as PushStrToNextStr<"friend", P>]: FriendNoticeEventMap[P];
} & {
    [P in keyof GroupNoticeEventMap as PushStrToNextStr<"group", P>]: GroupNoticeEventMap[P];
};
type RequestEventMap = {
    "request"(...event: Parameters<MergeEventMap["request.friend"]> | Parameters<MergeEventMap["request.group"]>): void;
} & {
    [P in keyof FriendRequestEventMap as PushStrToNextStr<"friend", P>]: FriendRequestEventMap[P];
} & {
    [P in keyof GroupRequestEventMap as PushStrToNextStr<"group", P>]: GroupRequestEventMap[P];
};
type YunzaiEventMap = {
    /** 框架上线事件 */
    'online': (Yz: typeof import('./Bot.d.ts')['Yunzai']) => void;
    /** 账号连接事件 */
    'connect': (bot: typeof import('./Bot.d.ts')['Client']) => void;
} & {
    /** 单个账号连接事件 */
    [key in `connect.${string}`]: (bot: typeof import('./Bot.d.ts')['Client']) => void
}
type MergeEventMap = MessageEventMap & NoticeEventMap & RequestEventMap & YunzaiEventMap;
/** 事件字典 */
interface EventMap extends MergeEventMap {
    /** 收到二维码 */
    "system.login.qrcode": (event: {
        image: Buffer;
    }) => void;
    /** 收到滑动验证码 */
    "system.login.slider": (event: {
        url: string;
    }) => void;
    /** 设备锁验证事件 */
    "system.login.device": (event: {
        url: string;
        phone: string;
    }) => void;
    /** 登录遇到错误 */
    "system.login.error": (event: {
        code: LoginErrorCode | number;
        message: string;
    }) => void;
    /** 上线事件 */
    "system.online": (event: undefined) => void;
    /** 下线事件（网络原因，默认自动重连） */
    "system.offline.network": (event: {
        message: string;
    }) => void;
    /** 下线事件（服务器踢） */
    "system.offline.kickoff": (event: {
        message: string;
    }) => void;
    /** 下线事件 */
    "system.offline": (event: {
        message: string;
    }) => void;
    /** 私聊同步 */
    "sync.message": (event: PrivateMessage) => void;
    /** 私聊消息已读同步 */
    "sync.read.private": (event: {
        user_id: number;
        time: number;
    }) => void;
    /** 群聊消息已读同步 */
    "sync.read.group": (event: {
        group_id: number;
        seq: number;
    }) => void;
    /** 消息已读同步 */
    "sync.read": (event: {
        user_id: number;
        time: number;
    } | {
        group_id: number;
        seq: number;
    }) => void;
    /** 隐藏事件: 监听所有收到的包 */
    "internal.sso": (cmd: string, payload: Buffer, seq: number) => void;
    /** 隐藏事件: 对方正在输入 */
    "internal.input": (event: {
        user_id: number;
        end: boolean;
    }) => void;
    /** @todo 未知事件 */
    "send": (messageRet: MessageRet) => void;
}

declare class OcrResult {
    language: string;
    wordslist: Array<{
        words: string;
        confidence: number;
        polygon: Array<{
            x: number;
            y: number;
        }>;
    }>;
    constructor(proto: Proto);
    toString(): string;
}

type Client$5 = Client;
/** 所有用户和群的基类 */
declare abstract class Contactable {
    protected readonly c: Client$5;
    /** 对方QQ号 */
    protected uid?: number | string;
    /** 对方群号 */
    protected gid?: number | string;
    get target(): number | string;
    get dm(): boolean;
    /** 返回所属的客户端对象 */
    get client(): Client;
    protected constructor(c: Client$5);
    get [Symbol.unscopables](): {
        c: boolean;
    };
    private _offPicUp;
    private _groupPicUp;
    /** 上传一批图片以备发送(无数量限制)，理论上传一次所有群和好友都能发 */
    uploadImages(imgs: Image[] | ImageElem[]): Promise<PromiseRejectedResult[]>;
    private _uploadImage;
    /** 发送网址分享 */
    shareUrl(content: ShareContent, config?: ShareConfig): Promise<void>;
    /** 发送音乐分享 */
    shareMusic(platform: MusicPlatform, id: string): Promise<void>;
    /** 发消息预处理 */
    protected _preprocess(content: Sendable, source?: Quotable): Promise<Converter>;
    private _downloadFileToTmpDir;
    private _saveFileToTmpDir;
    /** 上传一个视频以备发送(理论上传一次所有群和好友都能发) */
    uploadVideo(elem: VideoElem): Promise<VideoElem>;
    /** 上传一个语音以备发送(理论上传一次所有群和好友都能发) */
    uploadPtt(elem: PttElem, transcoding?: boolean, brief?: string): Promise<PttElem>;
    private _newUploadMultiMsg;
    private _uploadMultiMsg;
    /**
     * 制作一条合并转发消息以备发送（制作一次可以到处发）
     * 需要注意的是，好友图片和群图片的内部格式不一样，对着群制作的转发消息中的图片，发给好友可能会裂图，反过来也一样
     * 支持4层套娃转发（PC仅显示3层）
     */
    makeForwardMsg(msglist: Forwardable[] | Forwardable, nt?: boolean): Promise<JsonElem>;
    /** 下载并解析合并转发 */
    getForwardMsg(resid: string, fileName?: string, nt?: boolean): Promise<ForwardMessage[]>;
    private _newDownloadMultiMsg;
    private _downloadMultiMsg;
    /** 获取视频下载地址 */
    getVideoUrl(fid: string, md5: string | Buffer): Promise<string>;
}
type Client$4 = Client;
interface User {
    /** 撤回消息 */
    recallMsg(msg: PrivateMessage): Promise<boolean>;
    recallMsg(msgid: string): Promise<boolean>;
    recallMsg(seq: number, rand: number, time: number): Promise<boolean>;
}
/** 用户 */
declare class User extends Contactable {
    readonly uid: number | string;
    /** 对方QQ号 */
    get user_id(): number | string;
    static as(this: Client$4, uid: number): User;
    protected constructor(c: Client$4, uid: number);
    /** 返回作为好友的实例 */
    asFriend(strict?: boolean): Friend;
    /** 返回作为某群群员的实例 */
    asMember(gid: number | string, strict?: boolean): Member;
    /**
     * 获取头像url
     * @param size 头像大小，默认`0`
     * @returns 头像的url地址
     */
    getAvatarUrl(size?: 0 | 40 | 100 | 140): string;
    getAddFriendSetting(): Promise<number>;
    /**
     * 点赞，支持陌生人点赞
     * @param times 点赞次数，默认1次
     */
    thumbUp(times?: number): Promise<boolean>;
    /** 查看资料 */
    getSimpleInfo(): Promise<{
        /** 账号 */
        user_id: number | string;
        /** 昵称 */
        nickname: string;
        /** 性别 */
        sex: Gender;
        /** 年龄 */
        age: number;
        /** 地区 */
        area: string;
    }>;
    /**
     * 获取`time`往前的`cnt`条聊天记录
     * @param time 默认当前时间，为时间戳的分钟数（`Date.now() / 1000`）
     * @param cnt 聊天记录条数，默认`20`，超过`20`按`20`处理
     * @returns 私聊消息列表，服务器记录不足`cnt`条则返回能获取到的最多消息记录
     */
    getChatHistory(time?: number, cnt?: number): Promise<PrivateMessage[]>;
    /**
     * 标记`time`之前为已读
     * @param time 默认当前时间，为时间戳的分钟数（`Date.now() / 1000`）
     */
    markRead(time?: number): Promise<void>;
    /**
     * 撤回消息，cqhttp方法用
     */
    recallMsg(param: number, rand: number, time: number): Promise<boolean>;
    /**
     * 撤回消息
     * @param message_id 消息id
     */
    recallMsg(message_id: string): Promise<boolean>;
    /**
     * 撤回消息
     * @param message 私聊消息对象
     */
    recallMsg(message: PrivateMessage): Promise<boolean>;
    private _getRouting;
    /**
     * 发送一条消息
     * @param content 消息内容
     * @param source 引用回复的消息
     */
    sendMsg(content: Sendable, source?: Quotable): Promise<MessageRet>;
    protected _sendMsg(proto3: Encodable, brief: string, file?: boolean): Promise<MessageRet>;
    /**
     * 回添双向好友
     * @param seq 申请消息序号
     * @param remark 好友备注
     */
    addFriendBack(seq: number, remark?: string): Promise<boolean>;
    /**
     * 处理好友申请
     * @param seq 申请消息序号
     * @param yes 是否同意
     * @param remark 好友备注
     * @param block 是否屏蔽来自此用户的申请
     */
    setFriendReq(seq: number, yes?: boolean, remark?: string, block?: boolean): Promise<boolean>;
    /**
     * 处理入群申请
     * @param gid 群号
     * @param seq 申请消息序号
     * @param yes 是否同意
     * @param reason 若拒绝，拒绝的原因
     * @param block 是否屏蔽来自此用户的申请
     */
    setGroupReq(gid: number | string, seq: number, yes?: boolean, reason?: string, block?: boolean): Promise<boolean>;
    /**
     * 处理群邀请
     * @param gid 群号
     * @param seq 申请消息序号
     * @param yes 是否同意
     * @param block 是否屏蔽来自此群的邀请
     */
    setGroupInvite(gid: number | string, seq: number, yes?: boolean, block?: boolean): Promise<boolean>;
    /**
     * 获取文件信息
     * @param fid 文件id
     */
    getFileInfo(fid: string): Promise<Omit<FileElem, "type"> & Record<"url", string>>;
    /**
     * 获取离线文件下载地址
     * @param fid 文件id
     */
    getFileUrl(fid: string): Promise<string>;
    /**
     * 获取用户信息
     */
    getInfo: () => Promise<FriendInfo | MemberInfo | undefined>

}
/** 私聊消息事件 */
interface PrivateMessageEventMap {
    "message"(event: PrivateMessageEvent): void;
    /** 好友的消息 */
    "message.friend"(event: PrivateMessageEvent): void;
    /** 群临时对话 */
    "message.group"(event: PrivateMessageEvent): void;
    /** 其他途径 */
    "message.other"(event: PrivateMessageEvent): void;
    /** 我的设备 */
    "message.self"(event: PrivateMessageEvent): void;
}
/** 好友通知事件 */
interface FriendNoticeEventMap {
    "notice"(event: FriendIncreaseEvent | FriendDecreaseEvent | FriendRecallEvent | FriendPokeEvent): void;
    /** 新增好友 */
    "notice.increase"(event: FriendIncreaseEvent): void;
    /** 好友减少 */
    "notice.decrease"(event: FriendDecreaseEvent): void;
    /** 撤回消息 */
    "notice.recall"(event: FriendRecallEvent): void;
    /** 戳一戳 */
    "notice.poke"(event: FriendPokeEvent): void;
}
/** 好友申请事件 */
interface FriendRequestEventMap {
    "request"(event: FriendRequestEvent): void;
    /** 群邀请 */
    "request.invite"(event: GroupInviteEvent): void;
    /** 添加好友 */
    "request.add"(event: FriendRequestEvent): void;
    /** 单向好友 */
    "request.single"(event: FriendRequestEvent): void;
}
/** 好友 */
declare class Friend extends User {
    private _info?;
    static as(this: Client$4, uid: number | string, strict?: boolean): Friend;
    /** 好友资料 */
    get info(): FriendInfo | undefined;
    /** 昵称 */
    get nickname(): string | undefined;
    /** 性别 */
    get sex(): Gender | undefined;
    /** 备注 */
    get remark(): string | undefined;
    /** 分组id */
    get class_id(): number | undefined;
    /** 分组名 */
    get class_name(): string | undefined;
    protected constructor(c: Client$4, uid: number | string, _info?: FriendInfo | undefined);
    /** 设置备注 */
    setRemark(remark: string): Promise<void>;
    /** 设置分组(注意：如果分组id不存在也会成功) */
    setClass(id: number): Promise<void>;
    /** 戳一戳 */
    poke(self?: boolean): Promise<boolean>;
    /**
     * 删除好友
     * @param block 屏蔽此好友的申请，默认为`true`
     */
    delete(block?: boolean): Promise<boolean>;
    /**
     * 发送离线文件
     * @param file `string`表示从该本地文件路径获取，`Buffer`表示直接发送这段内容
     * @param filename 对方看到的文件名，`file`为`Buffer`时，若留空则自动以md5命名
     * @param callback 监控上传进度的回调函数，拥有一个"百分比进度"的参数
     * @returns 文件id(撤回时使用)
     */
    sendFile(file: string | Buffer | Uint8Array, filename?: string, callback?: (percentage: string) => void): Promise<string>;
    /**
     * 撤回离线文件
     * @param fid 文件id
     */
    recallFile(fid: string): Promise<boolean>;
    /**
     * 转发离线文件
     * @param fid 文件fid
     * @param group_id 群号，转发群文件时填写
     * @returns 转发成功后新文件的id
     */
    forwardFile(fid: string, group_id?: number): Promise<string>;
    /**
     * 查找机器人与这个人的共群
     * @returns
     */
    searchSameGroup(): Promise<any>;
    /** 获取好友信息 */
    getInfo: () => Promise<FriendInfo | undefined>;
}

type Client$3 = Client;
/** @ts-ignore ts(2417) 群员 */
declare class Member extends User {
    readonly gid: number | string;
    private _info?;
    static as(this: Client$3, gid: number | string, uid: number, strict?: boolean): Member;
    /** 群员资料 */
    get info(): MemberInfo | undefined;
    /** {@link gid} 的别名 */
    get group_id(): number | string;
    /** 名片 */
    get card(): string | undefined;
    /** 头衔 */
    get title(): string | undefined;
    /** 是否是我的好友 */
    get is_friend(): boolean;
    /** 是否是群主 */
    get is_owner(): boolean;
    /** 是否是管理员 */
    get is_admin(): boolean;
    /** 禁言剩余时间 */
    get mute_left(): number;
    /** 返回所在群的实例 */
    get group(): Group;
    protected constructor(c: Client$3, gid: number | string, uid: number | string, _info?: MemberInfo | undefined);
    /** 强制刷新群员资料 */
    renew(): Promise<MemberInfo>;
    /**
     * 设置/取消管理员
     * @param yes 是否设为管理员
     */
    setAdmin(yes?: boolean): Promise<boolean>;
    /**
     * 设置头衔
     * @param title 头衔名
     * @param duration 持续时间，默认`-1`，表示永久
     */
    setTitle(title?: string, duration?: number): Promise<boolean>;
    /**
     * 修改名片
     * @param card 名片
     */
    setCard(card?: string): Promise<boolean>;
    /**
     * 踢出群
     * @param msg @todo 未知参数
     * @param block 是否屏蔽群员
     */
    kick(msg?: string, block?: boolean): Promise<boolean>;
    /**
     * 禁言
     * @param duration 禁言时长（秒），默认`1800`
     */
    mute(duration?: number): Promise<void>;
    /** 戳一戳 */
    poke(): Promise<boolean>;
    /**
     * 是否屏蔽该群成员消息
     * @param isScreen
     */
    setScreenMsg(isScreen?: boolean): Promise<boolean>;
    /**
     * 加为好友
     * @param comment 申请消息
     */
    addFriend(comment?: string): Promise<boolean>;
    /** 获取群员信息 */
    getInfo: () => Promise<MemberInfo | undefined>;
}

type Client$2 = Client;
/** 群聊消息事件 */
interface GroupMessageEventMap {
    "message"(event: GroupMessageEvent): void;
    /** 普通消息 */
    "message.normal"(event: GroupMessageEvent): void;
    /** 匿名消息 */
    "message.anonymous"(event: GroupMessageEvent): void;
}
/** 群聊通知事件 */
interface GroupNoticeEventMap {
    "notice"(event: MemberIncreaseEvent | GroupSignEvent | MemberDecreaseEvent | GroupRecallEvent | GroupAdminEvent | GroupMuteEvent | GroupTransferEvent | GroupPokeEvent): void;
    /** 群员新增 */
    "notice.increase"(event: MemberIncreaseEvent): void;
    /** 群员减少 */
    "notice.decrease"(event: MemberDecreaseEvent): void;
    /** 消息撤回 */
    "notice.recall"(event: GroupRecallEvent): void;
    /** 管理员变更 */
    "notice.admin"(event: GroupAdminEvent): void;
    /** 群禁言 */
    "notice.ban"(event: GroupMuteEvent): void;
    /** 群打卡 */
    "notice.sign"(event: GroupSignEvent): void;
    /** 群转让 */
    "notice.transfer"(event: GroupTransferEvent): void;
    /** 戳一戳 */
    "notice.poke"(event: GroupPokeEvent): void;
}
/** 群聊申请事件 */
interface GroupRequestEventMap {
    "request"(event: GroupRequestEvent | GroupInviteEvent): void;
    /** 加群申请 */
    "request.add"(event: GroupRequestEvent): void;
    /** 群邀请 */
    "request.invite"(event: GroupInviteEvent): void;
}
/** 群 */
interface Group {
    /** 撤回消息 */
    recallMsg(msg: GroupMessage): Promise<boolean>;
    recallMsg(msgid: string): Promise<boolean>;
    recallMsg(seq: number, rand: number, pktnum?: number): Promise<boolean>;
}
/** 群 */
declare class Group extends Contactable {
    private _info?;
    static as(this: Client$2, gid: number | string, strict?: boolean): Group;
    /** 群资料 */
    get info(): GroupInfo | undefined;
    /** 群名 */
    get name(): string | undefined;
    /** 我是否是群主 */
    get is_owner(): boolean;
    /** 我是否是管理 */
    get is_admin(): boolean;
    /** 是否全员禁言 */
    get all_muted(): boolean;
    /** 我的禁言剩余时间 */
    get mute_left(): number;
    /** 群号 */
    get group_id(): number | string;

    /** 群文件系统 */
    readonly fs: Gfs;
    protected constructor(c: Client$2, gid: number | string, _info?: GroupInfo | undefined);
    /**
     * 获取群员实例
     * @param uid 群员账号
     * @param strict 严格模式，若群员不存在会抛出异常
     */
    pickMember(uid: number | string, strict?: boolean): Member;
    /**
     * 获取群头像url
     * @param size 头像大小，默认`0`
     * @param history 历史头像记录，默认`0`，若要获取历史群头像则填写1,2,3...
     * @returns 头像的url地址
     */
    getAvatarUrl(size?: 0 | 40 | 100 | 140, history?: number): string;
    /** 强制刷新群资料 */
    renew(): Promise<GroupInfo>;
    private _fetchMembers;
    /** 获取群员列表 */
    getMemberMap(no_cache?: boolean): Promise<Map<number | string, MemberInfo>>;
    /**
     * 添加精华消息
     * @param seq 消息序号
     * @param rand 消息的随机值
     */
    addEssence(seq: number, rand: number): Promise<string>;
    /**
     * 移除精华消息
     * @param seq 消息序号
     * @param rand 消息的随机值
     */
    removeEssence(seq: number, rand: number): Promise<string>;
    /**
     * 发送一个文件
     * @param file `string`表示从该本地文件路径上传，`Buffer`表示直接上传这段内容
     * @param pid 上传的目标目录id，默认根目录
     * @param name 上传的文件名，`file`为`Buffer`时，若留空则自动以md5命名
     * @param callback 监控上传进度的回调函数，拥有一个"百分比进度"的参数
     * @returns 上传的文件属性
     */
    sendFile(file: string | Buffer | Uint8Array, pid?: string, name?: string, callback?: (percentage: string) => void): Promise<GfsFileStat>;
    /**
     * 发送一条消息
     * @param content 消息内容
     * @param source 引用回复的消息
     * @param anony 是否匿名
     */
    sendMsg(content: Sendable, source?: Quotable, anony?: Omit<Anonymous, "flag"> | boolean): Promise<MessageRet>;
    private _sendMsgByFrag;
    /**
     * 设置当前群成员消息屏蔽状态
     * @param member_id
     * @param isScreen
     */
    setScreenMemberMsg(member_id: number | string, isScreen?: boolean): Promise<boolean>;
    /**
     * 撤回消息，cqhttp方法用
     */
    recallMsg(param: number, rand: number, pktnum: number): Promise<boolean>;
    /**
     * 撤回消息
     * @param message_id 消息id
     */
    recallMsg(message_id: string): Promise<boolean>;
    /**
     * 撤回消息
     * @param message 群聊消息对象
     */
    recallMsg(message: GroupMessage): Promise<boolean>;
    /** 设置群名 */
    setName(name: string): Promise<boolean>;
    /** 全员禁言 */
    muteAll(yes?: boolean): Promise<boolean>;
    /** 发送简易群公告 */
    announce(content: string): Promise<boolean>;
    private _setting;
    /** 允许/禁止匿名 */
    allowAnony(yes?: boolean): Promise<boolean>;
    /** 设置群备注 */
    setRemark(remark?: string): Promise<void>;
    /** 禁言匿名群员，默认1800秒 */
    muteAnony(flag: string, duration?: number): Promise<void>;
    /** 获取自己的匿名情报 */
    getAnonyInfo(): Promise<Omit<Anonymous, "flag">>;
    /** 获取 @全体成员 的剩余次数 */
    getAtAllRemainder(): Promise<number>;
    private _getLastSeq;
    /**
     * 标记`seq`之前的消息为已读
     * @param seq 消息序号，默认为`0`，表示标记所有消息
     */
    markRead(seq?: number): Promise<void>;
    /**
     * 获取`seq`之前的`cnt`条聊天记录，默认从最后一条发言往前，`cnt`默认20不能超过20
     * @param seq 消息序号，默认为`0`，表示从最后一条发言往前
     * @param cnt 聊天记录条数，默认`20`，超过`20`按`20`处理
     * @returns 群聊消息列表，服务器记录不足`cnt`条则返回能获取到的最多消息记录
     */
    getChatHistory(seq?: number, cnt?: number): Promise<GroupMessage[]>;
    /**
     * 获取群文件下载地址
     * @param fid 文件id
     */
    getFileUrl(fid: string): Promise<string>;
    /** 设置群头像 */
    setAvatar(file: ImageElem["file"]): Promise<void>;
    /**
     * 邀请好友入群
     * @param uid 好友账号
     */
    invite(uid: number | string): Promise<boolean>;
    /** 打卡 */
    sign(): Promise<{
        result: number;
    }>;
    /** 退群，若为群主则解散该群 */
    quit(): Promise<boolean>;
    /**
     * 设置管理员，use {@link Member.setAdmin}
     * @param uid 群员账号
     * @param yes 是否设为管理员
     */
    setAdmin(uid: number | string, yes?: boolean): Promise<boolean>;
    /**
     * 设置头衔，use {@link Member.setTitle}
     * @param uid 群员账号
     * @param title 头衔名
     * @param duration 持续时间，默认`-1`，表示永久
     */
    setTitle(uid: number | string, title?: string, duration?: number): Promise<boolean>;
    /**
     * 设置名片，use {@link Member.setCard}
     * @param uid 群员账号
     * @param card 名片
     */
    setCard(uid: number | string, card?: string): Promise<boolean>;
    /**
     * 踢出此群，use {@link Member.kick}
     * @param uid 群员账号
     * @param msg @todo 未知参数
     * @param block 是否屏蔽群员
     */
    kickMember(uid: number | string, msg?: string, block?: boolean): Promise<boolean>;
    /**
     * 禁言群员，use {@link Member.mute}
     * @param uid 群员账号
     * @param duration 禁言时长（秒），默认`600`
     */
    muteMember(uid: number | string, duration?: number): Promise<void>;
    /**
     * 戳一戳
     * @param uid 群员账号
     */
    pokeMember(uid: number | string): Promise<boolean>;
    /**
     * 获取群内被禁言人
     * @returns
     */
    getMuteMemberList(): Promise<({
        uin: number | string | null;
        unMuteTime: string | null;
    } | null)[]>;
    /** 获取群信息 */
    getInfo: () => Promise<GroupInfo>;
}

type Client$1 = Client;
/** 群文件/目录共通属性 */
interface GfsBaseStat {
    /** 文件/目录的id (目录以/开头) */
    fid: string;
    /** 父目录id */
    pid: string;
    /** 文件/目录名 */
    name: string;
    /** 创建该文件/目录的群员账号 */
    user_id: number | string;
    /** 创建时间 */
    create_time: number;
    /** 最近修改时间 */
    modify_time: number;
    /** 是否为目录 */
    is_dir: boolean;
}
/** 文件属性 */
interface GfsFileStat extends GfsBaseStat {
    /** 文件大小 */
    size: number;
    busid: number;
    md5: string;
    sha1: string;
    /** 文件存在时间 */
    duration: number;
    /** 下载次数 */
    download_times: number;
}
/** 目录属性 */
interface GfsDirStat extends GfsBaseStat {
    /** 目录包含的文件数 */
    file_count: number;
}
/**
 * 群文件系统
 * `fid`表示一个文件或目录的id，`pid`表示它所在目录的id
 * 根目录的id为"/"
 * 只能在根目录下创建目录
 * 删除一个目录会删除下面的全部文件
 */
declare class Gfs {
    /** 群号 */
    get group_id(): number | string;
    /** 返回所在群的实例 */
    get group(): Group;
    /** 返回所属的客户端对象 */
    get client(): Client;
    constructor(c: Client$1, gid: number | string);
    /** 获取使用空间和文件数 */
    df(): Promise<{
        /** 总空间 */
        total: number;
        /** 已使用的空间 */
        used: number;
        /** 剩余空间 */
        free: number;
    } & {
        /** 文件数 */
        file_count: number;
        /** 文件数量上限 */
        max_file_count: number;
    }>;
    private _resolve;
    /**
     * 获取文件或目录属性
     * @param fid 目标文件id
     */
    stat(fid: string): Promise<GfsFileStat | GfsDirStat>;
    /**
     * 列出`pid`目录下的所有文件和目录
     * @param pid 目标目录，默认为根目录，即`"/"`
     * @param start @todo 未知参数
     * @param limit 文件/目录上限，超过此上限就停止获取，默认`100`
     * @returns 文件和目录列表
     */
    dir(pid?: string, start?: number, limit?: number): Promise<(GfsFileStat | GfsDirStat)[]>;
    /** {@link dir} 的别名 */
    ls(pid?: string, start?: number, limit?: number): Promise<(GfsFileStat | GfsDirStat)[]>;
    /** 创建目录(只能在根目录下创建) */
    mkdir(name: string): Promise<GfsDirStat>;
    /** 删除文件/目录(删除目录会删除下面的所有文件) */
    rm(fid: string): Promise<void>;
    /**
     * 重命名文件/目录
     * @param fid 文件id
     * @param name 新命名
     */
    rename(fid: string, name: string): Promise<void>;
    /**
     * 移动文件
     * @param fid 要移动的文件id
     * @param pid 目标目录id
     */
    mv(fid: string, pid: string): Promise<void>;
    private _feed;
    /**
     * 上传一个文件
     * @param file `string`表示从该本地文件路径上传，`Buffer`表示直接上传这段内容
     * @param pid 上传的目标目录id，默认根目录
     * @param name 上传的文件名，`file`为`Buffer`时，若留空则自动以md5命名
     * @param callback 监控上传进度的回调函数，拥有一个"百分比进度"的参数
     * @returns 上传的文件属性
     */
    upload(file: string | Buffer | Uint8Array, pid?: string, name?: string, callback?: (percentage: string) => void): Promise<GfsFileStat>;
    /**
     * 将文件转发到当前群
     * @param stat 另一个群中的文件属性
     * @param pid 转发的目标目录，默认根目录
     * @param name 转发后的文件名，默认不变
     * @returns 转发的文件在当前群的属性
     */
    forward(stat: GfsFileStat, pid?: string, name?: string): Promise<GfsFileStat>;
    /**
     * 将离线(私聊)文件转发到当前群
     * @param fid 私聊文件fid
     * @param name 转发后的文件名，默认不变
     * @returns 转发的文件在当前群的属性
     */
    forwardOfflineFile(fid: string, name?: string): Promise<GfsFileStat>;
    /**
     * 获取文件下载地址
     * @param fid 文件id
     */
    download(fid: string): Promise<Omit<FileElem, "type"> & {
        url: string;
    }>;
}

/** 通知类型 */
declare enum NotifyType {
    /** 未知类型 */
    Unknown = 0,
    /** 所有消息 */
    AllMessages = 1,
    /** 不通知 */
    Nothing = 2
}
/** 事件接口 */
interface Client extends BaseClient {
    on<T extends keyof EventMap>(event: T, listener: EventMap[T]): ToDispose<this>;
    on<S extends Matcher>(event: S & Exclude<S, keyof EventMap>, listener: Listener): ToDispose<this>;
    once<T extends keyof EventMap>(event: T, listener: EventMap[T]): ToDispose<this>;
    once<S extends Matcher>(event: S & Exclude<S, keyof EventMap>, listener: Listener): ToDispose<this>;
    trap<T extends keyof EventMap>(event: T, listener: EventMap[T]): ToDispose<this>;
    trap<S extends Matcher>(event: S & Exclude<S, keyof EventMap>, listener: Listener): ToDispose<this>;
    trip<E extends keyof EventMap>(event: E, ...args: Parameters<EventMap[E]>): boolean;
    trip<S extends string | symbol>(event: S & Exclude<S, keyof EventMap>, ...args: any[]): boolean;
    trapOnce<T extends keyof EventMap>(event: T, listener: EventMap[T]): ToDispose<this>;
    trapOnce<S extends Matcher>(event: S & Exclude<S, keyof EventMap>, listener: Listener): ToDispose<this>;
    off<T extends keyof EventMap>(event: T): void;
    off<S extends Matcher>(event: S & Exclude<S, keyof EventMap>): void;
}
/** 一个客户端 */
declare class Client extends BaseClient {
    /**
     * 得到一个群对象, 通常不会重复创建、调用
     * @param gid 群号
     * @param strict 严格模式，若群不存在会抛出异常
     * @returns 一个`Group`对象
     */
    readonly pickGroup: (gid: number | string, strict?: boolean | undefined) => Group;
    /**
     * 得到一个好友对象, 通常不会重复创建、调用
     * @param uid 好友账号
     * @param strict 严格模式，若好友不存在会抛出异常
     * @returns 一个`Friend`对象
     */
    readonly pickFriend: (uid: number | string, strict?: boolean | undefined) => Friend;
    /**
     * 得到一个群员对象, 通常不会重复创建、调用
     * @param gid 群员所在的群号
     * @param uid 群员的账号
     * @param strict 严格模式，若群员不存在会抛出异常
     * @returns 一个`Member`对象
     */
    readonly pickMember: (gid: number | string, uid: number | string, strict?: boolean | undefined) => Member;
    /**
     * 创建一个用户对象
     * @param uid 用户的账号
     * @returns 一个`User`对象
     */
    readonly pickUser: (uid: number | string) => User;
    /** 日志记录器，初始情况下是`log4js.Logger` */
    logger: Logger | log4js.Logger;
    /** 账号本地数据存储目录 */
    readonly dir: string;
    /** 配置 */
    readonly config: Required<Config>;
    protected readonly _cache: Map<number, Set<string>>;
    protected _sync_cookie?: Uint8Array;
    /** 密码的md5值，调用 {@link login} 后会保存在这里，用于`token`过期时恢复登录 */
    password_md5?: Buffer;
    get [Symbol.toStringTag](): string;
    /** 好友列表 */
    readonly fl: Map<number | string, FriendInfo>;
    /** 陌生人列表 */
    readonly sl: Map<number | string, StrangerInfo>;
    /** 群列表 */
    readonly gl: Map<number | string, GroupInfo>;
    /** 群员列表缓存 */
    readonly gml: Map<number | string, Map<number | string, MemberInfo>>;
    /** 黑名单列表 */
    readonly blacklist: Set<number | string>;
    /** 好友分组 */
    readonly classes: Map<number | string, string>;
    /** 勿手动修改这些属性 */
    /** 在线状态 */
    status: OnlineStatus;
    /** 昵称 */
    nickname: string;
    /** 性别 */
    sex: Gender;
    /** 年龄 */
    age: number;
    /** @todo 未知属性 */
    bid: string;
    /** 漫游表情缓存 */
    stamp: Set<string>;
    /** csrf token */
    get bkn(): number;
    /** @todo 未知属性 */
    readonly cookies: {
        [domain in Domain]: string;
    };
    /** 数据统计 */
    get stat(): {
        start_time: number;
        lost_times: number;
        recv_pkt_cnt: number;
        sent_pkt_cnt: number;
        lost_pkt_cnt: number;
        recv_msg_cnt: number;
        sent_msg_cnt: number;
        msg_cnt_per_min: number;
        remote_ip: string;
        remote_port: number;
        ver: string;
    };
    /** 修改日志级别 */
    set log_level(level: LogLevel);
    /**
     * 继承原版`oicq`的构造方式，建议使用另一个构造函数
     * @param uin 账号
     * @param conf 配置
     */
    constructor(uin: number | string, conf?: Config);
    /**
     * 账号在调用 {@link login} 时传入
     * @param conf 配置
     */
    constructor(conf?: Config);
    /**
     * 只能在初始化Client时传了`uin`或扫码登录，才能调用
     * * 传了`password`则尝试密码登录
     * * 不传`password`则尝试扫码登录
     * 未传任何参数 则尝试扫码登录
     * 掉线重连时也是自动调用此函数，走相同逻辑
     * 你也可以在配置中修改`reconn_interval`，关闭掉线重连并自行处理
     * @param password 可以为密码原文，或密码的md5值
     */
    login(password?: string | Buffer): Promise<void>;
    /**
     * 传了`uin`，未传`password`
     * 会优先尝试使用token登录 (token在上次登录成功后存放在`this.dir`的`${uin}_token`中)
     * 传了`uin`无token或token失效时：
     * * 传了`password`则尝试密码登录
     * * 不传`password`则尝试扫码登录
     * 未传任何参数 则尝试扫码登录
     * 掉线重连时也是自动调用此函数，走相同逻辑
     * 你也可以在配置中修改`reconn_interval`，关闭掉线重连并自行处理
     * @param uin 登录账号
     * @param password 可以为密码原文，或密码的md5值
     */
    login(uin?: number, password?: string | Buffer): Promise<void>;
    /** 设置在线状态 */
    setOnlineStatus(status?: OnlineStatus.Online | OnlineStatus.Absent | OnlineStatus.Invisible | OnlineStatus.Busy | OnlineStatus.Qme | OnlineStatus.DontDisturb): Promise<boolean>;
    /** 设置昵称 */
    setNickname(nickname: string): Promise<boolean>;
    /**
     * 设置性别
     * @param gender 0：未知，1：男，2：女
     */
    setGender(gender: 0 | 1 | 2): Promise<boolean>;
    /**
     * 设置生日
     * @param birthday `YYYYMMDD`格式的`string`（会过滤非数字字符）或`number`
     * */
    setBirthday(birthday: string | number): Promise<boolean>;
    /** 设置个人说明 */
    setDescription(description?: string): Promise<boolean>;
    /** 设置个性签名 */
    setSignature(signature?: string): Promise<boolean>;
    /** 获取个性签名 */
    getSignature(): Promise<string>;
    /** 设置头像 */
    setAvatar(file: ImageElem["file"]): Promise<void>;
    /** 获取漫游表情 */
    getRoamingStamp(no_cache?: boolean): Promise<string[]>;
    /** 删除表情(支持批量) */
    deleteStamp(id: string | string[]): Promise<void>;
    /** 获取系统消息 */
    getSystemMsg(): Promise<(FriendRequestEvent | GroupInviteEvent | GroupRequestEvent)[]>;
    /** 添加好友分组 */
    addClass(name: string): Promise<void>;
    /** 删除好友分组 */
    deleteClass(id: number): Promise<void>;
    /** 重命名好友分组 */
    renameClass(id: number, name: string): Promise<void>;
    /** 重载好友列表 */
    reloadFriendList(): Promise<void>;
    /** 重载陌生人列表 */
    reloadStrangerList(): Promise<void>;
    /** 重载群列表 */
    reloadGroupList(): Promise<void>;
    /** 重载黑名单 */
    reloadBlackList(): Promise<void>;
    /** 清空缓存文件 fs.rm need v14.14 */
    cleanCache(): void;
    /**
     * 获取视频下载地址
     * use {@link Friend.getVideoUrl}
     */
    getVideoUrl(fid: string, md5: string | Buffer): Promise<string>;
    /**
     * 获取转发消息
     * use {@link Friend.getForwardMsg}
     */
    getForwardMsg(resid: string, fileName?: string, nt?: boolean): Promise<ForwardMessage[]>;
    /**
     * 制作转发消息
     * use {@link Friend.makeForwardMsg} or {@link Group.makeForwardMsg}
     */
    makeForwardMsg(fake: Forwardable[], dm?: boolean, nt?: boolean): Promise<JsonElem>;
    /** Ocr图片转文字 */
    imageOcr(file: ImageElem["file"]): Promise<OcrResult>;
    /** @cqhttp (cqhttp遗留方法) use {@link cookies[domain]} */
    getCookies(domain?: Domain): string;
    /** @cqhttp use {@link bkn} */
    getCsrfToken(): number;
    /** @cqhttp use {@link fl} */
    getFriendList(): Map<number | string, FriendInfo>;
    /** @cqhttp use {@link gl} */
    getGroupList(): Map<number | string, GroupInfo>;
    /**
     * 添加群精华消息
     * use {@link Group.addEssence}
     * @param message_id 消息id
     */
    setEssenceMessage(message_id: string): Promise<string>;
    /**
     * 移除群精华消息
     * use {@link Group.removeEssence}
     * @param message_id 消息id
     */
    removeEssenceMessage(message_id: string): Promise<string>;
    /** @cqhttp use {@link sl} */
    getStrangerList(): Map<number, StrangerInfo>;
    /** @cqhttp use {@link User.getSimpleInfo} */
    getStrangerInfo(user_id: number): Promise<{
        user_id: number; /** 黑名单列表 */
        nickname: string;
        sex: Gender;
        age: number;
        area: string; /** 漫游表情缓存 */
    }>;
    /** @cqhttp use {@link Group.info} or {@link Group.renew} */
    getGroupInfo(group_id: number | string, no_cache?: boolean): Promise<GroupInfo>;
    /** @cqhttp use {@link Group.getMemberMap} */
    getGroupMemberList(group_id: number | string, no_cache?: boolean): Promise<Map<number | string, MemberInfo>>;
    /** @cqhttp use {@link Member.info} or {@link Member.renew} */
    getGroupMemberInfo(group_id: number | string, user_id: number | string, no_cache?: boolean): Promise<MemberInfo>;
    /** @cqhttp use {@link Friend.sendMsg} */
    sendPrivateMsg(user_id: number | string, message: Sendable, source?: Quotable): Promise<MessageRet>;
    /** @cqhttp use {@link Group.sendMsg} */
    sendGroupMsg(group_id: number | string, message: Sendable, source?: Quotable): Promise<MessageRet>;
    /** @cqhttp use {@link Group.sign} */
    sendGroupSign(group_id: number | string): Promise<{
        result: number;
    }>;
    /** @cqhttp use {@link Member.sendMsg} */
    sendTempMsg(group_id: number | string, user_id: number | string, message: Sendable): Promise<MessageRet>;
    /** @cqhttp use {@link User.recallMsg} or {@link Group.recallMsg} */
    deleteMsg(message_id: string): Promise<boolean>;
    /** @cqhttp use {@link User.markRead} or {@link Group.markRead} */
    reportReaded(message_id: string): Promise<void>;
    /** @cqhttp use {@link User.getChatHistory} or {@link Group.getChatHistory} */
    getMsg(message_id: string): Promise<GroupMessage | PrivateMessage | undefined>;
    /** @cqhttp use {@link User.getChatHistory} or {@link Group.getChatHistory} */
    getChatHistory(message_id: string, count?: number): Promise<PrivateMessage[] | GroupMessage[]>;
    /** @cqhttp use {@link Group.muteAnony} */
    setGroupAnonymousBan(group_id: number | string, flag: string, duration?: number): Promise<void>;
    /** @cqhttp use {@link Group.allowAnony} */
    setGroupAnonymous(group_id: number | string, enable?: boolean): Promise<boolean>;
    /** @cqhttp use {@link Group.muteAll} */
    setGroupWholeBan(group_id: number | string, enable?: boolean): Promise<boolean>;
    /**
     * 设置当前群成员消息屏蔽状态
     * @param group_id {number} 群号
     * @param member_id {number} 成员QQ号
     * @param isScreen {boolean} 是否屏蔽 默认true
     */
    setGroupMemberScreenMsg(group_id: number | string, member_id: number | string, isScreen?: boolean): Promise<boolean>;
    /** @cqhttp use {@link Group.setName} */
    setGroupName(group_id: number | string, name: string): Promise<boolean>;
    /** @cqhttp use {@link Group.announce} */
    sendGroupNotice(group_id: number | string, content: string): Promise<boolean>;
    /** @cqhttp use {@link Group.setAdmin} or {@link Member.setAdmin} */
    setGroupAdmin(group_id: number | string, user_id: number | string, enable?: boolean): Promise<boolean>;
    /** @cqhttp use {@link Group.setTitle} or {@link Member.setTitle} */
    setGroupSpecialTitle(group_id: number | string, user_id: number | string, special_title: string, duration?: number): Promise<boolean>;
    /** @cqhttp use {@link Group.setCard} or {@link Member.setCard} */
    setGroupCard(group_id: number | string, user_id: number | string, card: string): Promise<boolean>;
    /** @cqhttp use {@link Group.kickMember} or {@link Member.kick} */
    setGroupKick(group_id: number | string, user_id: number | string, reject_add_request?: boolean, message?: string): Promise<boolean>;
    /** @cqhttp use {@link Group.muteMember} or {@link Member.mute} */
    setGroupBan(group_id: number | string, user_id: number | string, duration?: number): Promise<void>;
    /** @cqhttp use {@link Group.quit} */
    setGroupLeave(group_id: number | string): Promise<boolean>;
    /** @cqhttp use {@link Group.pokeMember} or {@link Member.poke} */
    sendGroupPoke(group_id: number | string, user_id: number | string): Promise<boolean>;
    /** @cqhttp use {@link Member.addFriend} */
    addFriend(group_id: number | string, user_id: number | string, comment?: string): Promise<boolean>;
    /** @cqhttp use {@link Friend.delete} */
    deleteFriend(user_id: number | string, block?: boolean): Promise<boolean>;
    /** @cqhttp use {@link Group.invite} */
    inviteFriend(group_id: number | string, user_id: number | string): Promise<boolean>;
    /** @cqhttp use {@link Friend.thumbUp} */
    sendLike(user_id: number | string, times?: number): Promise<boolean>;
    /** @cqhttp use {@link setAvatar} */
    setPortrait(file: Parameters<Client["setAvatar"]>[0]): Promise<void>;
    /** @cqhttp use {@link Group.setAvatar} */
    setGroupPortrait(group_id: number | string, file: Parameters<Group["setAvatar"]>[0]): Promise<void>;
    /** @cqhttp use {@link Group.fs} */
    acquireGfs(group_id: number | string): Gfs;
    /** @cqhttp use {@link User.setFriendReq} or {@link User.addFriendBack} */
    setFriendAddRequest(flag: string, approve?: boolean, remark?: string, block?: boolean): Promise<boolean>;
    /** @cqhttp use {@link User.setGroupInvite} or {@link User.setGroupReq} */
    setGroupAddRequest(flag: string, approve?: boolean, reason?: string, block?: boolean): Promise<boolean>;
    /**
     * 监听群邀请/消息事件
     * @param group_ids 监听群的群号
     * @returns 事件处理
     */
    group(...group_ids: number[]): (listener: (event: GroupInviteEvent | GroupMessageEvent) => void) => ToDispose<this>;
    /**
     * 监听用户私聊/群聊事件
     * @param user_ids 监听的用户账号
     * @returns 事件处理
     */
    user(...user_ids: number[]): (listener: (event: PrivateMessageEvent | GroupMessageEvent) => void) => ToDispose<this>;
    /** emit an event */
    em(name?: string, data?: any): void;
    protected _msgExists(from: number, type: number, seq: number, time: number): boolean;
    protected _calcMsgCntPerMin(): number;
    private _setProfile;
    /** @deprecated use {@link submitSlider} */
    sliderLogin(ticket: string): Promise<void>;
    /** @deprecated use {@link sendSmsCode} */
    sendSMSCode(): Promise<void>;
    /** @deprecated use {@link submitSmsCode} */
    submitSMSCode(code: string): Promise<void>;
    /** @deprecated use {@link status} */
    get online_status(): OnlineStatus;
}
/** 日志等级 */
type LogLevel = "trace" | "debug" | "info" | "warn" | "error" | "fatal" | "mark" | "off";
type LoggerFn = {
    [key in LogLevel]: (...args: any[]) => any;
};
interface Logger extends LoggerFn {
    level?: LogLevel;
}
/** 配置项 */
interface Config {
    /**
     * 日志等级，默认`info`
     * 打印日志会降低性能，若消息量巨大建议修改此参数
     */
    log_level?: LogLevel;
    /** 登录设备，默认为安卓手机 */
    platform?: Platform;
    /** 使用版本，仅在对应platform中有多个版本是有效，不填则使用最新版本 */
    ver?: string;
    /** log4js配置 */
    log_config?: Configuration | string;
    /** 过滤自己的消息，默认`true` */
    ignore_self?: boolean;
    /** 被风控时是否尝试用分片发送，默认`true` */
    resend?: boolean;
    /** 数据存储文件夹，需要可写权限，默认主模块下的data文件夹 */
    data_dir?: string;
    /**
     * 触发`system.offline.network`事件后的重新登录间隔秒数，默认5(秒)，不建议设置过低
     * 设置为0则不会自动重连，然后你可以监听此事件自己处理
     */
    reconn_interval?: number;
    /**
     * 签名服务器地址，未配置可能会导致登录失败和无法收发消息
     */
    sign_api_addr?: string;
    /** 是否缓存群员列表(默认true)，群多的时候(500~1000)会多占据约100MB+内存，关闭后进程只需不到20MB内存 */
    cache_group_member?: boolean;
    /** 自动选择最优服务器(默认true)，关闭后会一直使用`msfwifi.3g.qq.com:8080`进行连接 */
    auto_server?: boolean;
    /** ffmpeg */
    ffmpeg_path?: string;
    ffprobe_path?: string;
}
/** 数据统计 */
type Statistics = Client["stat"];
/** 创建一个客户端 (=new Client) */
declare function createClient(config?: Config): Client;

export {
    ApiRejection,
    Client,
    Converter,
    Device,
    ErrorCode,
    ForwardMessage,
    Friend,
    Gfs,
    Group,
    GroupMessage,
    Image,
    LoginErrorCode,
    Member,
    Message,
    NotifyType,
    OcrResult,
    OnlineStatus,
    Parser,
    Platform,
    PrivateMessage,
    User,
    index_d as core,
    createClient,
    genDmMessageId,
    genGroupMessageId,
    getGroupImageUrl,
    parseDmMessageId,
    parseGroupMessageId,
    parseImageFileParam,
    segment
};

export type {
    Anonymous,
    Apk,
    AtElem,
    BfaceElem,
    Config,
    ConverterExt,
    Domain,
    EventMap,
    FaceElem,
    FileElem,
    FlashElem,
    ForwardNode,
    Forwardable,
    FriendDecreaseEvent,
    FriendIncreaseEvent,
    FriendInfo, FriendNoticeEvent,
    FriendPokeEvent,
    FriendRecallEvent,
    FriendRequestEvent,
    Gender,
    GfsDirStat,
    GfsFileStat,
    GroupAdminEvent,
    GroupInfo,
    GroupInviteEvent,
    GroupMessageEvent,
    GroupMuteEvent,
    GroupNoticeEvent,
    GroupPokeEvent,
    GroupRecallEvent,
    GroupRequestEvent,
    GroupRole,
    GroupSignEvent,
    GroupTransferEvent,
    ImageElem,
    JsonElem,
    LocationElem,
    LogLevel,
    MemberDecreaseEvent,
    MemberIncreaseEvent,
    MemberInfo,
    MessageElem,
    MessageEvent,
    MessageRet,
    MfaceElem,
    MiraiElem,
    MusicElem,
    MusicPlatform,
    PokeElem,
    PrivateMessageEvent,
    PttElem,
    Quotable,
    QuoteElem,
    ReplyElem,
    RequestEvent,
    Sendable,
    ShareConfig,
    ShareContent,
    ShareElem,
    Statistics,
    StrangerInfo,
    TextElem,
    VideoElem,
    XmlElem,
    ForwardElem
};
