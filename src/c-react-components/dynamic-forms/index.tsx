import React, { FC } from 'react';
import {
  Form,
  Input,
  Select,
  Button,
  Cascader,
  Checkbox,
  DatePicker,
  InputNumber,
  Radio,
  Rate,
  Switch,
  TimePicker,
  TreeSelect,
  Upload,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { DynamicFormsProps, Type } from './types';

const DynamicForms: FC<DynamicFormsProps> = (props) => {
  const {
    labelCol = 8,
    wrapperCol = 16,
    formItemOptions,
    onFinish,
    onReset,
    footer = {
      hidden: false,
      submitText: '提交',
      resetText: '重置',
    },
    ...other
  } = props;

  const [form] = Form.useForm();

  const transform: (type: Type) => any = (type) => {
    switch (type) {
      case 'button':
        return Button;
      case 'cascader':
        return Cascader;
      case 'checkbox':
        return Checkbox.Group;
      case 'datePicker':
        return DatePicker;
      case 'dateRangePicker':
        return DatePicker.RangePicker;
      case 'input':
        return Input;
      case 'inputNumber':
        return InputNumber;
      case 'radio':
        return Radio.Group;
      case 'rate':
        return Rate;
      case 'select':
        return Select;
      case 'switch':
        return Switch;
      case 'timePicker':
        return TimePicker;
      case 'timeRangePicker':
        return TimePicker.RangePicker;
      case 'treeSelect':
        return TreeSelect;
      case 'upload':
        return Upload;
      default:
        return 'div';
    }
  };

  return (
    <Form
      {...other}
      form={form}
      labelCol={
        other?.layout === 'inline'
          ? undefined
          : typeof labelCol == 'number'
          ? { span: labelCol }
          : labelCol
      }
      wrapperCol={
        other?.layout === 'inline'
          ? undefined
          : typeof wrapperCol == 'number'
          ? { span: wrapperCol }
          : wrapperCol
      }
      onFinish={onFinish}
    >
      {formItemOptions &&
        formItemOptions.length > 0 &&
        formItemOptions.map((item, index) => {
          const formItem = Object.assign({}, item);
          delete formItem.customRender;
          delete formItem.fieldOptions;
          delete formItem.btnContext;
          return (
            <Form.Item
              {...formItem}
              key={item.name + '_' + index}
              style={{ marginBottom: (other.layout = 'inline' ? 12 : '') }}
            >
              {item.type === 'custom' ? (
                item.customRender(form, item)
              ) : item.type === 'icon' ? (
                item.icon
              ) : item.type === 'upload' ? (
                <Upload {...item.fieldOptions}>
                  <Button icon={item.icon ? item.icon : <UploadOutlined />}>
                    Click to upload
                  </Button>
                </Upload>
              ) : (
                React.createElement(
                  transform(item.type as Type),
                  { placeholder: '请输入', ...item.fieldOptions },
                  item.type === 'button' ? item.btnContext : null,
                )
              )}
            </Form.Item>
          );
        })}
      {footer.hidden ? null : (
        <Form.Item
          labelCol={
            other?.layout === 'inline'
              ? undefined
              : typeof labelCol == 'number'
              ? { span: labelCol }
              : labelCol
          }
          wrapperCol={
            other?.layout === 'inline'
              ? undefined
              : typeof wrapperCol == 'number'
              ? { offset: labelCol, span: wrapperCol }
              : wrapperCol
          }
          {...footer.itemOptions}
        >
          <Button type="primary" htmlType="submit">
            {footer.submitText}
          </Button>
          <Button
            htmlType="button"
            onClick={() => {
              form.resetFields();
              onReset && onReset(form.getFieldsValue(), form);
            }}
            style={{ marginLeft: '12px' }}
          >
            {footer.resetText}
          </Button>
        </Form.Item>
      )}
    </Form>
  );
};

export default DynamicForms;
