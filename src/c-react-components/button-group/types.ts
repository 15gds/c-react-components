import { btnFuncCodesProps } from '@/data/func.code';

export interface rowParamsProps {
  rowText: any;
  record: object | undefined;
  rowIndex: number | undefined;
}

interface BaseButtonGroupProps {
  type?: string;
  options: any[];
  min: number;
  rowParams: rowParamsProps;
  codes?: btnFuncCodesProps[];
}

export type ButtonGroupProps = BaseButtonGroupProps;
