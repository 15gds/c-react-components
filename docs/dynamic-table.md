---
nav:
  title: 动态表格组件
  path: /tables
  order: 4
group:
  title: 表格组件
---

# 动态表格

## 动态表格基本使用

```tsx
import React, { useRef } from 'react';
import { DynamicTable } from 'c-react-components';
import { Space, Table, Tag, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';

export default () => {
  interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
  }

  const onClick = (type, rowText) => {
    console.log(type, rowText);
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: '操作',
      type: 'action',
      width: 120,
      buttonGroup: (rowText) => {
        return [
          {
            code: 'codeBtnDetail',
            fn: (text) => onClick('detail', text),
          },
          {
            code: 'codeBtnCreate',
            fn: (text) => onClick('create', text),
          },
          {
            code: 'codeBtnDelete',
            fn: (text) => onClick('delete', text),
            confirmText: (text) => `确定要删除吗？`,
          },
        ];
      },
    },
  ];

  const data: DataType[] = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];

  return (
    <>
      <DynamicTable columns={columns} dataSource={data} />
    </>
  );
};
```

## 动态表格编辑单元格(组件显示状态)

```tsx
import React, { useRef } from 'react';
import { DynamicTable } from 'c-react-components';
import { Space, Table, Tag, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { UploadOutlined } from '@ant-design/icons';
import moment from 'moment';

export default () => {
  interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    dataIndex: string;
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

  const onClick = (type, rowText) => {
    console.log(type, rowText);
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      editable: true,
      required: true,
      type: 'input',
      normalShow: false,
      render: (text) => <a>{text || '-'}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      required: true,
      type: 'inputNumber',
      editable: true,
      normalShow: false,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      required: true,
      type: 'cascader',
      fieldOptions: {
        options: areaOptions,
        placeholder: '请选择',
      },
      editable: true,
      normalShow: false,
    },
    {
      title: 'Tag',
      dataIndex: 'tag',
      key: 'tag',
      type: 'tag',
      editable: true,
      normalShow: false,
    },
    {
      title: 'Select',
      dataIndex: 'select',
      key: 'select',
      type: 'select',
      editable: true,
      normalShow: false,
      fieldOptions: {
        options: fruitOptions,
      },
    },
    {
      title: 'Checkbox',
      dataIndex: 'checkbox',
      key: 'checkbox',
      type: 'checkbox',
      editable: true,
      normalShow: false,
      fieldOptions: {
        options: fruitOptions,
      },
    },
    {
      title: 'StartDatePicker',
      dataIndex: 'startDatePicker',
      key: 'startDatePicker',
      type: 'datePicker',
      editable: true,
      normalShow: false,
    },
    {
      title: 'IntervalDatePicker',
      dataIndex: 'intervalDatePicker',
      key: 'intervalDatePicker',
      type: 'dateRangePicker',
      editable: true,
      normalShow: false,
    },
    {
      title: 'TimePicker',
      dataIndex: 'timePicker',
      key: 'timePicker',
      type: 'timePicker',
      editable: true,
      normalShow: false,
    },
    {
      title: 'TimeRangePicker',
      dataIndex: 'timeRangePicker',
      key: 'timeRangePicker',
      type: 'timeRangePicker',
      editable: true,
      normalShow: false,
    },
    {
      title: 'Rate',
      dataIndex: 'rate',
      key: 'rate',
      type: 'rate',
      editable: true,
      normalShow: false,
    },
    {
      title: 'Radio',
      dataIndex: 'radio',
      key: 'radio',
      type: 'radio',
      editable: true,
      normalShow: false,
      fieldOptions: {
        options: fruitOptions,
      },
    },
    {
      title: 'Switch',
      dataIndex: 'switch',
      key: 'switch',
      type: 'switch',
      editable: true,
      normalShow: false,
    },
    {
      title: 'TreeSelect',
      dataIndex: 'treeSelect',
      key: 'treeSelect',
      type: 'treeSelect',
      fieldOptions: {
        treeData: treeData,
        treeDefaultExpandAll: true,
        allowClear: true,
        showSearch: true,
      },
      editable: true,
      normalShow: false,
    },
    {
      title: 'Upload',
      dataIndex: 'upload',
      key: 'upload',
      type: 'upload',
      fieldOptions: {
        // listType: 'picture',
        name: 'uploadFile',
      },
      valuePropName: 'fileList',
      icon: <UploadOutlined />,
      editable: true,
      normalShow: false,
    },
    {
      title: '操作',
      type: 'action',
      width: 120,
      buttonGroup: (rowText) => {
        return [
          {
            code: 'codeBtnDetail',
            fn: (text) => onClick('detail', text),
          },
          {
            code: 'codeBtnCreate',
            fn: (text) => onClick('create', text),
          },
          {
            code: 'codeBtnDelete',
            fn: (text) => onClick('delete', text),
            confirmText: (text) => `确定要删除吗？`,
          },
        ];
      },
    },
  ];

  const data: DataType[] = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tag: ['nice', 'developer'],
      select: 'Apple',
      checkbox: ['Apple'],
      startDatePicker: moment('2015/01/01', dateFormat),
      intervalDatePicker: [
        moment('2015/01/01', dateFormat),
        moment('2015/01/01', dateFormat),
      ],
      timePicker: moment('12:08:23', 'HH:mm:ss'),
      timeRangePicker: [
        moment('12:08:23', 'HH:mm:ss'),
        moment('13:08:23', 'HH:mm:ss'),
      ],
      treeSelect: 'parent 1-1',
      rate: 2,
      radio: 'Apple',
      switch: true,
      upload: [
        {
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          type: 'picture',
        },
      ],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tag: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tag: ['cool', 'teacher'],
    },
  ];

  return (
    <>
      <DynamicTable
        columns={columns}
        data={data}
        editableMode="cell"
        tableSave={true}
      />
    </>
  );
};
```

## 动态表格编辑单元格(正常显示状态)

```tsx
import React, { useRef } from 'react';
import { DynamicTable } from 'c-react-components';
import { Space, Table, Tag, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { UploadOutlined } from '@ant-design/icons';
import moment from 'moment';

export default () => {
  interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    dataIndex: string;
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

  const onClick = (type, rowText) => {
    console.log(type, rowText);
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      editable: true,
      required: true,
      type: 'input',
      render: (text) => <a>{text || '-'}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      required: true,
      type: 'inputNumber',
      editable: true,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      required: true,
      type: 'cascader',
      fieldOptions: {
        options: areaOptions,
        placeholder: '请选择',
      },
      editable: true,
    },
    {
      title: 'Tag',
      dataIndex: 'tag',
      key: 'tag',
      type: 'tag',
      editable: true,
    },
    {
      title: 'Select',
      dataIndex: 'select',
      key: 'select',
      type: 'select',
      editable: true,
      fieldOptions: {
        options: fruitOptions,
      },
    },
    {
      title: 'Checkbox',
      dataIndex: 'checkbox',
      key: 'checkbox',
      type: 'checkbox',
      editable: true,
      fieldOptions: {
        options: fruitOptions,
      },
    },
    {
      title: 'StartDatePicker',
      dataIndex: 'startDatePicker',
      key: 'startDatePicker',
      type: 'datePicker',
      editable: true,
    },
    {
      title: 'IntervalDatePicker',
      dataIndex: 'intervalDatePicker',
      key: 'intervalDatePicker',
      type: 'dateRangePicker',
      editable: true,
    },
    {
      title: 'TimePicker',
      dataIndex: 'timePicker',
      key: 'timePicker',
      type: 'timePicker',
      editable: true,
    },
    {
      title: 'TimeRangePicker',
      dataIndex: 'timeRangePicker',
      key: 'timeRangePicker',
      type: 'timeRangePicker',
      editable: true,
    },
    {
      title: 'Rate',
      dataIndex: 'rate',
      key: 'rate',
      type: 'rate',
      editable: true,
    },
    {
      title: 'Radio',
      dataIndex: 'radio',
      key: 'radio',
      type: 'radio',
      editable: true,
      fieldOptions: {
        options: fruitOptions,
      },
    },
    {
      title: 'Switch',
      dataIndex: 'switch',
      key: 'switch',
      type: 'switch',
      editable: true,
    },
    {
      title: 'TreeSelect',
      dataIndex: 'treeSelect',
      key: 'treeSelect',
      type: 'treeSelect',
      fieldOptions: {
        treeData: treeData,
        treeDefaultExpandAll: true,
        allowClear: true,
        showSearch: true,
      },
      editable: true,
    },
    {
      title: 'Upload',
      dataIndex: 'upload',
      key: 'upload',
      type: 'upload',
      fieldOptions: {
        // listType: 'picture',
        name: 'uploadFile',
      },
      valuePropName: 'fileList',
      icon: <UploadOutlined />,
      editable: true,
    },
    {
      title: '操作',
      type: 'action',
      width: 120,
      buttonGroup: (rowText) => {
        return [
          {
            code: 'codeBtnDetail',
            fn: (text) => onClick('detail', text),
          },
          {
            code: 'codeBtnCreate',
            fn: (text) => onClick('create', text),
          },
          {
            code: 'codeBtnDelete',
            fn: (text) => onClick('delete', text),
            confirmText: (text) => `确定要删除吗？`,
          },
        ];
      },
    },
  ];

  const data: DataType[] = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tag: ['nice', 'developer'],
      select: 'Apple',
      checkbox: ['Apple'],
      startDatePicker: moment('2015/01/01', dateFormat),
      intervalDatePicker: [
        moment('2015/01/01', dateFormat),
        moment('2015/01/01', dateFormat),
      ],
      timePicker: moment('12:08:23', 'HH:mm:ss'),
      timeRangePicker: [
        moment('12:08:23', 'HH:mm:ss'),
        moment('13:08:23', 'HH:mm:ss'),
      ],
      treeSelect: 'parent 1-1',
      rate: 2,
      radio: 'Apple',
      switch: true,
      upload: [
        {
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          type: 'picture',
        },
      ],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tag: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tag: ['cool', 'teacher'],
    },
  ];

  return (
    <>
      <DynamicTable
        columns={columns}
        data={data}
        editableMode="cell"
        tableSave={true}
      />
    </>
  );
};
```

<API src='src/c-react-components/dynamic-table/index'>

## ColumnsProps

| Name         | Description                                                        | Type                                                                                                       | Default | required |
| ------------ | ------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------- | ------- | -------- |
| title        | 列头显示文字                                                       | `string`&#124;`string[]`                                                                                   | false   | true     |
| dataIndex    | 列数据在数据项中对应的路径，支持通过数组查询嵌套路径               | `string`                                                                                                   | false   | true     |
| key          | React 需要的 key，如果已经设置了唯一的 dataIndex，可以忽略这个属性 | `string`                                                                                                   | false   | false    |
| editable     | 开启编辑单元格                                                     | `boolean`                                                                                                  | false   | false    |
| required     | 控制设置编辑单元格时是否必填                                       | `boolean`                                                                                                  | false   | false    |
| normalShow   | 单元格显示形式                                                     | `boolean`                                                                                                  | false   | false    |
| type         | 表单控件类型                                                       | cascader/datePicker/input/inputNumber/radio/<br>rate/select/switch/timePicker/treeSelect/<br>upload/custom | --      | true     |
| fieldOptions | 控件传参，对应参数需参看https://4x.ant.design/index-cn             | `object`                                                                                                   | --      | false    |
| rules        | 是否必填                                                           | `boolean`                                                                                                  | false   | false    |
