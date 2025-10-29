import { FriendInfo, MemberInfo, GroupInfo } from "icqq"

declare module "icqq" {
  interface User {
    /** 用户id */
    // @ts-ignore
    user_id: number | string
    /** 获取用户信息 */
    getInfo: () => Promise<FriendInfo | MemberInfo | undefined>
  }

  /** 群成员对象 */
  interface Member {
    /** 群成员所在的群号 */
    // @ts-ignore
    group_id: string | number
    /** 获取群员信息 */
    getInfo: () => Promise<MemberInfo | undefined>
  }

  /** 群对象 */
  export interface Group {
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
  interface Friend {
    /** 获取好友信息 */
    getInfo: () => Promise<FriendInfo | undefined>
  }
}

export type * from "icqq"
