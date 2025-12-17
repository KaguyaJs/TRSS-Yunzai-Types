/**
 * Copy for ant-design-vue
 * 
 * @see https://pkg-size.dev/ant-design-vue@3.2.20
 */
import type { VNode } from "vue";

export declare type RuleType = 'string' | 'number' | 'boolean' | 'method' | 'regexp' | 'integer' | 'float' | 'object' | 'enum' | 'date' | 'url' | 'hex' | 'email';

type VNodeChildAtom = VNode | string | number | boolean | null | undefined | void
type VueNode = VNodeChildAtom | VNodeChildAtom[]
interface BaseRule {
    warningOnly?: boolean;
    enum?: any[]; // StoreValue[] 类型
    len?: number;
    max?: number;
    message?: string | VueNode;
    min?: number;
    pattern?: RegExp;
    required?: boolean;
    transform?: (value: any) => any; // StoreValue 类型
    type?: RuleType;
    whitespace?: boolean;
    validateTrigger?: string | string[];
    trigger?: 'blur' | 'change' | Array<'change' | 'blur'>;
}

declare type AggregationRule = BaseRule & Partial<ValidatorRule>;

interface ArrayRule extends Omit<AggregationRule, 'type'> {
    type: 'array';
    defaultField?: RuleObject;
}
declare type Validator = (rule: RuleObject, value: any, callback: (error?: string) => void) => Promise<void> | void;
export interface ValidatorRule {
    warningOnly?: boolean;
    message?: string | VueNode;
    /** custom validate function (Note: callback must be called) */
    validator: Validator;
}

export declare type RuleObject = AggregationRule | ArrayRule;
