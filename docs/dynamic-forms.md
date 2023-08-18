---
nav:
  title: 动态表单组件
  path: /forms
  order: 3
group:
  title: 表单组件
---

# 动态表单

```tsx
import React from 'react';
import { DynamicForms } from 'c-react-components';
import { HomeOutlined, UploadOutlined, InboxOutlined } from '@ant-design/icons';
import { Select, Form, Upload } from 'antd';
import moment from 'moment';

interface Option {
  value: string | number;
  label: string;
  children?: Option[];
}

const areaOptions: Option[] = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];

const fruitOptions = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange' },
];

const dateFormat = 'YYYY-MM-DD';

const treeData = [
  {
    value: 'parent 1',
    title: 'parent 1',
    children: [
      {
        value: 'parent 1-0',
        title: 'parent 1-0',
        children: [
          {
            value: 'leaf1',
            title: 'leaf1',
          },
          {
            value: 'leaf2',
            title: 'leaf2',
          },
        ],
      },
      {
        value: 'parent 1-1',
        title: 'parent 1-1',
        children: [
          {
            value: 'leaf3',
            title: <b style={{ color: '#08c' }}>leaf3</b>,
          },
        ],
      },
    ],
  },
];

export default () => {
  const formItem = [
    {
      type: 'input',
      label: '用户名',
      name: 'username',
      rules: [{ required: true, message: 'Please input your username!' }],
    },
    {
      type: 'select',
      name: 'gender',
      label: '性别',
      rules: [{ required: true }],
      fieldOptions: {
        options: [
          {
            value: 'man',
            label: '男',
          },
          {
            value: 'female',
            label: '女',
          },
        ],
        allowClear: true,
      },
      initialValue: 'female',
    },
    {
      type: 'button',
      name: 'confrimBtn',
      label: '按钮',
      btnContext: 'Button',
    },
    {
      type: 'icon',
      name: 'icon',
      label: '图标',
      icon: <HomeOutlined />,
    },
    {
      type: 'cascader',
      name: 'areaCascader',
      label: '省市区',
      fieldOptions: {
        options: areaOptions,
        placeholder: '请选择',
      },
      initialValue: ['zhejiang', 'hangzhou', 'xihu'],
    },
    {
      type: 'checkbox',
      name: 'fruitCheckbox',
      label: '多选框',
      fieldOptions: {
        options: fruitOptions,
      },
      initialValue: ['Apple'],
    },
    {
      type: 'datePicker',
      name: 'startDatePicker',
      label: '开始日期',
      initialValue: moment('2015/01/01', dateFormat),
    },
    {
      type: 'dateRangePicker',
      name: 'intervalDatePicker',
      label: '区间日期',
      initialValue: [
        moment('2015/01/01', dateFormat),
        moment('2015/01/01', dateFormat),
      ],
    },
    {
      type: 'inputNumber',
      name: 'price',
      label: '金额',
      fieldOptions: {
        formatter: (value) =>
          `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
        parser: (value) => value!.replace(/\$\s?|(,*)/g, ''),
      },
      initialValue: 1000,
    },
    {
      type: 'radio',
      name: 'fruitRadio',
      label: '单选框',
      fieldOptions: {
        options: fruitOptions,
      },
      initialValue: 'Apple',
    },
    {
      type: 'rate',
      name: 'rate',
      label: '评分',
      initialValue: 2,
    },
    {
      type: 'switch',
      name: 'switch',
      label: '开关',
      valuePropName: 'checked',
      fieldOptions: {
        defaultChecked: true,
      },
    },
    {
      type: 'timePicker',
      name: 'time',
      label: '时间',
      initialValue: moment('12:08:23', 'HH:mm:ss'),
    },
    {
      type: 'timeRangePicker',
      name: 'intervalTime',
      label: '区间时间',
      initialValue: [
        moment('12:08:23', 'HH:mm:ss'),
        moment('13:08:23', 'HH:mm:ss'),
      ],
    },
    {
      type: 'treeSelect',
      name: 'treeSelect',
      label: '树形选择',
      fieldOptions: {
        treeData: treeData,
        treeDefaultExpandAll: true,
        allowClear: true,
        showSearch: true,
      },
      initialValue: 'parent 1-1',
    },
    {
      type: 'upload',
      name: 'uploadFile',
      label: '上传',
      fieldOptions: {
        valuePropName: 'fileList',
        listType: 'picture',
        name: 'uploadFile',
      },
      icon: <UploadOutlined />,
    },
    {
      type: 'custom',
      name: 'dragger',
      label: 'Dragger',
      customRender: (form, item) => {
        console.log(form, item);
        return (
          <Form.Item name="dragger" valuePropName="fileList" noStyle>
            <Upload.Dragger name="files" action="/upload.do">
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload.
              </p>
            </Upload.Dragger>
          </Form.Item>
        );
      },
    },
  ];
  return (
    <>
      <DynamicForms
        formItemOptions={formItem}
        // footer={{ hidden: true }}
        onFinish={(values: any) => {
          console.log(values);
        }}
      />
    </>
  );
};
```

<API src='src/c-react-components/dynamic-forms/index'>

## formItemOptionsProps

## formItemOptionsProps

| Name         | Description                                            | Type                                                                                                                   | Default | required |
| ------------ | ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------- | ------- | -------- |
| type         | 表单控件类型                                           | button/icon/cascader/datePicker/input/<br>inputNumber/radio/rate/select/switch/<br>timePicker/treeSelect/upload/custom | --      | true     |
| fieldOptions | 控件传参，对应参数需参看https://4x.ant.design/index-cn | `object`                                                                                                               | --      | false    |
| rules        | 是否必填                                               | `boolean`                                                                                                              | false   | false    |
