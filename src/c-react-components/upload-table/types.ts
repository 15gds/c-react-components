import type {
  UploadChangeParam,
  UploadFile,
  RcFile,
} from 'antd/es/upload/interface';

type BeforeUploadValueType = void | boolean | string | Blob | File;

interface selectFileProps<T = any> {
  name: string;
  multiple: boolean;
  showUploadList: boolean;
  beforeUpload: (
    file: RcFile,
    FileList: RcFile[],
  ) => BeforeUploadValueType | Promise<BeforeUploadValueType>;
  onChange?: (info: UploadChangeParam<UploadFile<T>>) => void;
  [propsName: string]: any;
}

interface BaseUploadTableProps {
  /**
   * @description 列表数据
   */
  tableList: any;
  /**
   * @description 表格列的配置描述
   */
  columns?: any;
  /**
   * @description 可选文件参数，具体项见https://4x.ant.design/components/upload-cn/#API
   */
  selectFile?: selectFileProps;
}

export type UploadTableProps = BaseUploadTableProps;
