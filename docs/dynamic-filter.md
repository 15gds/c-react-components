---
nav:
  title: 动态表单组件
  path: /forms
  order: 3
group:
  title: 表单组件
---

# 过滤表单

```tsx
import React from 'react';
import { DynamicFilter } from 'c-react-components';
import { HomeOutlined, UploadOutlined, InboxOutlined } from '@ant-design/icons';
import { Select, Form } from 'antd';
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
    },
    {
      type: 'select',
      name: 'gender',
      label: '性别',
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
  ];
  return (
    <>
      <DynamicFilter
        formItemOptions={formItem}
        labelCol={null}
        wrapperCol={null}
        // footer={{ hidden: true }}
        onFilterSearch={(values: any) => {
          console.log(values);
        }}
        onFilterReset={(values: any, form) => {
          console.log(values);
        }}
      />
    </>
  );
};
```

用于条件搜索时进行使用，建议搭配动态表格一同使用。

<API src='src/c-react-components/dynamic-filter/index'>
