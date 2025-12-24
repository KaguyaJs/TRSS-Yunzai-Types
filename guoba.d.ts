/**
 * 简单支持一下锅巴组件的类型
 * 
 * 具体等后期优化
 */

import type { RuleObject, ObjectPaths, Recordable, PathRecord, VNodeLike } from "./internal/index.d.ts"

export type SupportGuobaFnc<T extends Record<string, any> = Record<string, any>> = () => SupportGuoba<T> | Promise<SupportGuoba<T>>

export interface SupportGuoba<T = Record<string, any>> {
  /** 插件信息 */
  pluginInfo: PluginInfo;
  /** 配置项信息 */
  configInfo?: ConfigInfo<T>;
}


/**
 * 插件信息
 */
export interface PluginInfo {
  /** 插件名称，唯一标识符 */
  name: string;
  /** 插件标题，显示名称 */
  title: string;
  /** 插件描述 */
  description: string;
  /** 插件主页链接 */
  link: string;
  /** 是否支持v3 */
  isV3: boolean;
  /** 是否支持v2 */
  isV2: boolean;
  /** 插件作者名称，一个或多个 */
  author: string | string[];
  /** 插件作者主页链接，与作者名称对应 */
  authorLink: string | string[];
  /** 
   * 图标 
   * 
   * https://icon-sets.iconify.design
   */
  icon?: string;
  /** 图标颜色 */
  iconColor?: string;
  /** 本地图标路径，一个图片的绝对路径 */
  iconPath?: string;
  /** 
   * 是否显示在左侧菜单栏 
   * 
   * 设为 auto 时，如果配置项大于等于 3 个，则显示在左侧菜单
   */
  showInMenu?: boolean | "auto";
}

export interface ConfigInfo<T extends Record<string, any> = Record<string, any>> {
  /** 配置项 */
  schemas?: Schemas<T>;
  /** 
   * 获取配置数据方法 
   * 
   * 用于前端填充显示数据
   */
  getConfigData?: () => T | Promise<T>;
  /**
   * 保存配置数据方法（用于前端提交保存）
   * @param data 数据
   * @param param 参数
   * @param param.Result 返回结果
   * @returns 
  */
  setConfigData?: (data: PathRecord<T> & { [k: string]: any }, param: {
    /** 返回结果 */
    Result: typeof Result
  }) => Result | Promise<Result>
}

export type Schemas<T extends Record<string, any> = Record<string, any>> = Schema<ObjectPaths<T>>[]

export interface Schema<T extends string = string> {
  /** 字段名 */
  field?: T;
  /** 标签名称 */
  label: string;
  /** 渲染组件 */
  component: ComponentType;
  /** 组件参数 */
  componentProps?: object
  /** 辅助文本 */
  subLabel?: string;
  /** 文本右侧的帮助文本 */
  helpMessage?: string | string[] | ((renderCallbackParams: RenderCallbackParams) => string | string[]);
  /** 底部帮助文本 */
  bottomHelpMessage?: string;
  /** BaseHelp 组件属性 */
  helpComponentProps?: Partial<HelpComponentProps>;
  /** 标签宽度，如果传入，由 itemProps 配置的 labelCol 和 wrapperCol 将无效 */
  labelWidth?: string | number;
  /** 禁用使用全局 formModel 设置调整 labelWidth，手动设置 labelCol 和 wrapperCol */
  disabledLabelWidth?: boolean;
  /** 是否必填 */
  required?: boolean | ((renderCallbackParams: RenderCallbackParams) => boolean)
  /** 后缀 */
  suffix?: string | number | ((values: RenderCallbackParams) => string | number)
  /** 验证规则 */
  rule?: Rule[]
  /** 检查信息是否添加到标签 */
  rulesMessageJoinLabel?: boolean;
  /** 默认值 */
  defaultValue?: any;
  /** 是否高级 */
  isAdvanced?: boolean;
  /** 匹配详情组件 */
  span?: number;
  /** 是否显示 */
  ifShow?: boolean | ((renderCallbackParams: RenderCallbackParams) => boolean);
  /** 是否显示 */
  show?: boolean | ((renderCallbackParams: RenderCallbackParams) => boolean);
  /** 在 form-item 标签内渲染内容 */
  render?: (renderCallbackParams: RenderCallbackParams) => VNodeLike | VNodeLike[] | string;
  /** 渲染 col 内容，需要外部 form-item 包装器 */
  renderColContent?: (renderCallbackParams: RenderCallbackParams) => VNodeLike | VNodeLike[] | string;
  /** 渲染组件内容 */
  renderComponentContent?: ((renderCallbackParams: RenderCallbackParams) => any) | VNodeLike | VNodeLike[] | string;
  /** 动态禁用 */
  dynamicDisabled?: boolean | ((renderCallbackParams: RenderCallbackParams) => boolean);
  /** 动态规则 */
  dynamicRules?: (renderCallbackParams: RenderCallbackParams) => Rule[];
  [k: string]: any
}


/**
 * 组件类型
 *
 * https://github.com/guoba-yunzai/guoba-plugin-web/blob/master/src/components/Form/src/types/index.ts#L83-L83
 */
export type ComponentType =
  | 'SOFT_GROUP_BEGIN'
  | 'GSubForm'
  | 'GColorPicker'
  | 'EasyCron'
  | 'GTags'
  | 'GButtons'
  | 'GSelectFriend'
  | 'GSelectGroup'
  | 'Input'
  | 'InputGroup'
  | 'InputPassword'
  | 'InputSearch'
  | 'InputTextArea'
  | 'InputNumber'
  | 'InputCountDown'
  | 'Select'
  | 'ApiSelect'
  | 'TreeSelect'
  | 'ApiTree'
  | 'ApiTreeSelect'
  | 'ApiRadioGroup'
  | 'RadioButtonGroup'
  | 'RadioGroup'
  | 'Checkbox'
  | 'CheckboxGroup'
  | 'AutoComplete'
  | 'ApiCascader'
  | 'Cascader'
  | 'DatePicker'
  | 'MonthPicker'
  | 'RangePicker'
  | 'WeekPicker'
  | 'TimePicker'
  | 'Switch'
  | 'StrengthMeter'
  | 'Upload'
  | 'IconPicker'
  | 'Render'
  | 'Slider'
  | 'Rate'
  | 'Divider'
  | 'ApiTransfer';

export interface HelpComponentProps {
  /** 最大宽度 */
  maxWidth: string;
  /** 是否显示序列号 */
  showIndex: boolean;
  /** 文本列表 */
  text: any;
  /** 颜色 */
  color: string;
  /** 字体大小 */
  fontSize: string;
  /** 图标 */
  icon: string;
  /** 绝对定位 */
  absolute: boolean;
  /** 定位 */
  position: any;
}

/**
 * 返回结果
 */
export class Result<T = any> {
  code: number;
  result: T | null;
  message: string;
  httpStatus: number;

  /** 无返回值 */
  static VOID: symbol;

  /** 尚未实现错误码 */
  static ERR_CODE_501: symbol;

  constructor(code: number, result: T | null, message: string, httpStatus?: number);

  /**
   * 成功
   * @static
   * @param result 返回结果
   * @param message 返回消息
   * @returns {Result}
   */
  static ok<T = any>(result: T, message?: string): Result<T>;

  /**
   * 错误
   * @static
   * @returns {Result}
   */
  static error<T = any>(...args: [number | string, (T | null)?, string?, number?]): Result<T>;

  /**
   * 尚未登录
   * @static
   * @returns {Result}
   */
  static noLogin(): Result<null>;

  /**
   * 尚未授权
   * @static
   * @returns {Result}
   */
  static noAuth(): Result<null>;

  /**
   * 404未找到
   * @static
   * @returns {Result}
   */
  static notFound(): Result<null>;

  /**
   * 功能尚未实现
   * @static
   * @returns {Result}
   */
  static unrealized(): Result<null>;

  /** 是否成功 */
  get isOk(): boolean;

  /** 转换为 JSON 对象 */
  toJSON(): { ok: boolean; code: number; result: T | null; message: string };
}

export interface RenderCallbackParams {
  schema: Schema;
  values: Recordable;
  model: Recordable;
  field: string;
}

export type Rule = RuleObject & {
  trigger?: 'blur' | 'change' | ['change', 'blur'];
};