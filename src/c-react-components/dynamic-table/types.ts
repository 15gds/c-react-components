import type { TablePaginationConfig } from 'antd/es/table';

export type Type =
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
  | 'tag';

export interface columnsProps {
  /**
   * @description	列头显示文字
   */
  title: string;
  /**
   * @description 列数据在数据项中对应的路径，支持通过数组查询嵌套路径
   */
  dataIndex: string | string[];
  /**
   * @description	React 需要的 key，如果已经设置了唯一的 dataIndex，可以忽略这个属性
   */
  key?: string;
  /**
   * @description 开启编辑单元格
   * @default false
   */
  editable?: boolean;
  /**
   * @description 控制设置编辑单元格时是否必填
   * @default false
   */
  required?: boolean;
  /**
   * @description 单元格显示形式
   * @default true
   */
  normalShow?: boolean;
  /**
   * @default cascader/checkbox/datePicker/dateRangePicker/input/inputNumber/radio/rate/select/switch/timePicker/timeRangePicker/treeSelect/upload
   * @description 控件类型
   */
  type?: Type;
  /**
   * 控件传参，对应参数需参看https://4x.ant.design/index-cn
   */
  fieldoptions: object;
  /**
   * @description 配置描述，具体项见https://4x.ant.design/components/table-cn/#Column
   */
  [propsName: string]: any;
}

interface BaseDynamicTablesProps {
  /**
   * @description 表格行 key 的取值，可以是字符串或一个函数
   * @default id
   */
  rowKey: string | ((record: any) => string);
  /**
   * @description 表格行是否可选择
   */
  rowSelection: object;
  /**
   * @description 配置请查看ColumnsProps
   */
  columns: columnsProps[];
  /**
   * @description 数据数组
   */
  data: object[];
  /**
   * @description 分页配置，具体项见https://4x.ant.design/components/pagination-cn/#API
   */
  pagination?: TablePaginationConfig;
  /**
   * @description 数据为空时展示文字
   */
  emptyText: string;
  /**
   * @description 编辑模式。编辑单元格：cell，编辑行：row
   */
  editableMode?: 'cell' | 'row';
  /**
   * @description 其他参数请查看https://4x.ant.design/components/form-cn/#API Form-API
   */
  [propName: string]: any;
}

export type DynamicTablesProps = BaseDynamicTablesProps;
