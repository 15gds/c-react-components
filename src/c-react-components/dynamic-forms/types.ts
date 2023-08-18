import { ReactNode } from 'react';
import type { FormInstance, FormProps, FormItemProps } from 'antd/es/form';

export type Type =
  | 'button'
  | 'icon'
  | 'cascader'
  | 'checkbox'
  | 'datePicker'
  | 'dateRangePicker'
  | 'input'
  | 'inputNumber'
  | 'radio'
  | 'rate'
  | 'select'
  | 'switch'
  | 'timePicker'
  | 'timeRangePicker'
  | 'treeSelect'
  | 'upload'
  | 'custom';

type colProps = {
  span: number;
  offset?: number;
};

type footerForm = {
  /**
   * @default false
   * @desciption 是否隐藏底部操作按钮
   */
  hidden: boolean;
  /**
   * @default 8
   * @description 控件标签布局
   */
  wrapperCol?: colProps;
  /**
   * @description 其他参数请查看https://4x.ant.design/components/form-cn/#API Form-API
   */
  [propName: string]: any;
};

export interface formOptionsProps {
  /**
   * @default 8
   * @description label标签布局
   */
  labelCol?: undefined | number | colProps;

  /**
   * @default 8
   * @description 控件标签布局
   */
  wrapperCol?: undefined | number | colProps;

  /**
   * @description 表单默认值
   */
  initialValues?: object;

  /**
   * @default true
   * @description 表示是否显示 label 后面的冒号
   */
  colon?: boolean;

  /**
   * @default false
   * @description 设置表单组件禁用
   */
  disabled?: boolean;

  /**
   * @description 表单操作
   */
  footer?: footerForm;
  /**
   * @description 提交表单且数据验证成功后回调事件
   */
  onFinish?: (values: any) => void;

  /**
   * @description 重置表单
   */
  onReset?: (values: any, form: object) => any;
  /**
   * @description 其他参数请查看https://4x.ant.design/components/form-cn/#API Form-API
   */
  [propName: string]: any;
}

export interface formItemOptionsProps extends FormItemProps {
  /**
   * @default button/icon/cascader/checkbox/datePicker/dateRangePicker/input/inputNumber/radio/rate/select/switch/timePicker/timeRangePicker/treeSelect/upload/self
   * @description 控件类型
   * @require true
   */
  type: Type;
  /**
   * 控件传参，对应参数需参看https://4x.ant.design/index-cn
   */
  fieldoptions: object;
  /**
   * @description 其他参数请查看https://4x.ant.design/components/form-cn/#API FormItem-API
   */
  [propName: string]: any;
}

export interface BaseDynamicFormsProps extends formOptionsProps {
  formItemOptions: formItemOptionsProps[];
}

export type DynamicFormsProps = BaseDynamicFormsProps;
