import React, { FC, useEffect, useContext, useRef, useState } from 'react';
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
  Table,
  Tag,
} from 'antd';
import type { PaginationProps, InputRef } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { FormInstance } from 'antd/es/form';
import type {
  ColumnsType,
  TablePaginationConfig,
  TableProps,
} from 'antd/es/table';
import { DynamicTablesProps, Type } from './types';
import ButtonGroup from '../button-group';

interface DataTypeProps {
  key: number | string;
  editable?: boolean;
  [propName: string]: any;
}

interface EditableRowProps {
  index: number;
}

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex?: any;
  record?: any;
  required?: boolean;
  type?: string;
  fieldOptions?: object;
  icon?: React.ReactNode;
  btnContext?: string;
  valuePropName?: string;
  normalShow?: boolean;
  handleSave: (record: any) => void;
}

const EditableContext = React.createContext<FormInstance<any> | null>(null);

const DynamicTable: FC<DynamicTablesProps> = (props) => {
  const {
    rowKey,
    rowSelection,
    columns,
    data,
    pagination,
    emptyText,
    editableMode,
    tableSave,
    normalShow = true,
    ...other
  } = props;

  const [dataSource, setDataSource] = useState(data || []);
  const [count, setCount] = useState(data && data.length ? data.length + 1 : 1);

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const showTotal: PaginationProps['showTotal'] = (total, range) =>
    `${range[0]}-${range[1]}条 共${total}条`;

  const paginationProps = {
    showSizeChanger: true,
    pageSizeOptions: ['5', '10', '15', '20', '30', '50'],
    showTotal: showTotal,
    ...pagination,
  };

  const handleTableChange: TableProps<any>['onChange'] = (
    pagination,
    filters,
    sorter,
  ) => {
    const { onChange } = props;
    if (onChange) {
      onChange(pagination, filters, sorter);
    }
  };

  const handleAdd = () => {
    const newData = columns.reduce((prev: any, cur: DataTypeProps) => {
      prev['key'] = count;
      prev[cur.key] = '';
      return prev;
    }, {});
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  const handleSave = (row: DataTypeProps) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item: any) => item.key === row.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };

  if (columns && columns.length > 0) {
    columns.map((item: any) => {
      if (item.type === 'action') {
        item.width = item.width || (item.ButtonGroup.length > 1 ? 120 : 80);
        item.align = item.align || 'center';
        item.title = item.title || '操作';
        (item.key = 'controlOperation'),
          (item.render = (
            rowText: string | number | undefined,
            record: object | undefined,
            rowIndex: number | undefined,
          ) => {
            const renderTableButtonGroup = (buttonGroup: any) => {
              if (!buttonGroup) return '-';
              let recombinationGroup = []; // 重组数据
              // if(Array.isArray(buttonGroup)) recombinationGroup = buttonGroup
              if (typeof buttonGroup === 'function') {
                recombinationGroup = buttonGroup(rowText, record, rowIndex);
                if (recombinationGroup.length === 0) return '-';
                return (
                  <ButtonGroup
                    type="text"
                    min={item.min || 2} // 配置按钮展示最少数量，其他的将会被折叠
                    options={recombinationGroup}
                    rowParams={{ rowText, record, rowIndex }}
                  />
                );
              }
            };
            const handleDelete = (text: DataTypeProps) => {
              const newData = dataSource.filter(
                (item: any) => item.key !== text.key,
              );
              setDataSource(newData);
            };
            return (
              <>
                {renderTableButtonGroup(
                  editableMode
                    ? (rowText: DataTypeProps) => {
                        return [
                          {
                            code: 'codeBtnDelete',
                            fn: (text: DataTypeProps) => handleDelete(text),
                            confirmText: (text: DataTypeProps) =>
                              `确定要删除吗？`,
                          },
                        ];
                      }
                    : item.buttonGroup,
                )}
              </>
            );
          });
      } else if (!item.render) {
        item.render = (
          rowText: string | number | undefined,
          record: object | undefined,
          rowIndex: number | undefined,
        ) => (rowText || rowText === 0 ? rowText : '-');
        return item;
      }
      return item;
    });
  }

  const editableColumns = columns.map((col: any) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataTypeProps) => ({
        record,
        normalShow: col.normalShow,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        required: col?.required,
        type: col?.type,
        fieldOptions: col?.fieldOptions,
        icon: col?.icon,
        btnContext: col?.btnContextm,
        valuePropName: col?.valuePropName,
        handleSave,
      }),
    };
  });

  return (
    <>
      {editableMode ? (
        // <div style={{display:'flex',justifyContent:'space-between',marginBottom: 16}}>
        <Button onClick={handleAdd} type="primary">
          添加
        </Button>
      ) : // </div>
      null}

      <Table
        rowKey={rowKey || 'key'}
        rowSelection={
          rowSelection ? { ...rowSelection, columnWidth: 30 } : rowSelection
        }
        components={editableMode && components}
        columns={editableMode ? editableColumns : columns}
        dataSource={dataSource}
        pagination={paginationProps}
        onChange={handleTableChange}
        scroll={{ x: 'max-content' }}
        locale={{
          emptyText: emptyText || '暂无数据',
        }}
        {...other}
      />
      {editableMode && tableSave ? (
        <div style={{ textAlign: 'right' }}>
          <Button onClick={() => {}}>保存</Button>
        </div>
      ) : null}
    </>
  );
};

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell: React.FC<EditableCellProps> = (props) => {
  const {
    normalShow = true,
    title,
    editable,
    children,
    dataIndex,
    record,
    required,
    type,
    fieldOptions,
    icon,
    btnContext,
    handleSave,
    valuePropName,
    ...restProps
  } = props;
  const [editing, setEditing] = useState(false);
  const componentRef = useRef(null);
  const form = useContext(EditableContext)!;

  // useEffect(() => {
  //   if (editing && componentRef && componentRef.current) {
  //       componentRef.current?.focus();
  //   }
  // }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      let values = await form.validateFields();
      if (typeof values['tag'] == 'string' && type === 'tag') {
        values[type] = values[type].split(',');
      }
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: required,
            message: `${title}不能为空`,
          },
        ]}
        valuePropName={valuePropName}
      >
        {type === 'upload' ? (
          <Upload
            {...fieldOptions}
            ref={componentRef}
            onChange={() => toggleEdit()}
          >
            <Button icon={icon ? icon : <UploadOutlined />}>
              Click to upload
            </Button>
          </Upload>
        ) : type === 'input' || type === 'tag' ? (
          <Input
            {...fieldOptions}
            ref={componentRef}
            onPressEnter={save}
            onBlur={save}
          />
        ) : type === 'inputNumber' ? (
          <InputNumber
            {...fieldOptions}
            ref={componentRef}
            onPressEnter={save}
            onBlur={save}
          />
        ) : type === 'select' ? (
          <Select
            {...fieldOptions}
            ref={componentRef}
            onChange={save}
            onBlur={save}
          />
        ) : type === 'cascader' ? (
          <Cascader
            {...fieldOptions}
            ref={componentRef}
            onChange={save}
            onBlur={save}
          />
        ) : type === 'checkbox' ? (
          <Checkbox.Group
            {...fieldOptions}
            value={record[dataIndex]}
            ref={componentRef}
            onChange={save}
          />
        ) : type === 'radio' ? (
          <Radio.Group
            {...fieldOptions}
            value={record[dataIndex]}
            ref={componentRef}
            onChange={save}
          />
        ) : type === 'datePicker' ? (
          <DatePicker
            {...fieldOptions}
            value={record[dataIndex]}
            ref={componentRef}
            onChange={save}
            onBlur={save}
          />
        ) : type === 'dateRangePicker' ? (
          <DatePicker.RangePicker
            {...fieldOptions}
            value={record[dataIndex]}
            ref={componentRef}
            onChange={save}
            onBlur={save}
          />
        ) : type === 'rate' ? (
          <Rate
            {...fieldOptions}
            value={record[dataIndex]}
            ref={componentRef}
            onChange={save}
            onBlur={save}
          />
        ) : type === 'switch' ? (
          <Switch
            {...fieldOptions}
            defaultChecked={record[dataIndex]}
            ref={componentRef}
            onChange={save}
          />
        ) : type === 'timePicker' ? (
          <TimePicker
            {...fieldOptions}
            value={record[dataIndex]}
            ref={componentRef}
            onChange={save}
            onBlur={save}
          />
        ) : type === 'timeRangePicker' ? (
          <TimePicker.RangePicker
            {...fieldOptions}
            value={record[dataIndex]}
            ref={componentRef}
            onChange={save}
            onBlur={save}
          />
        ) : type === 'treeSelect' ? (
          <TreeSelect
            {...fieldOptions}
            value={record[dataIndex]}
            ref={componentRef}
            onChange={save}
            onBlur={save}
          />
        ) : null}
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={toggleEdit}
      >
        {normalShow && Array.isArray(children) && type !== 'upload' ? (
          typeof children[1] === 'boolean' ? (
            children[1] + ''
          ) : Array.isArray(children[1]) ? (
            children[1].join(',')
          ) : (
            children
          )
        ) : type === 'upload' &&
          record &&
          Array.isArray(record[dataIndex]) &&
          record[dataIndex].length > 0 ? (
          record[dataIndex].map((item: any, index: number) =>
            item.type === 'picture' ? (
              <img
                key={item.uid + '_' + item.name}
                style={{ width: '80px', height: '80px' }}
                src={item.url}
                alt={item.name}
              />
            ) : (
              <a key={item.uid + '_' + item.name}>
                {item.name +
                  (index === record[dataIndex].length - 1 ? '' : '、')}
              </a>
            ),
          )
        ) : type === 'tag' &&
          record &&
          Array.isArray(record[dataIndex]) &&
          record[dataIndex].length > 0 ? (
          record[dataIndex].map((item: any, index: number) => {
            let color = index > 4 ? 'geekblue' : 'green';
            if (item === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={item + '_' + index}>
                {item.toUpperCase()}
              </Tag>
            );
          })
        ) : type === 'select' ? (
          <Select {...fieldOptions} value={record[dataIndex]} />
        ) : type === 'checkbox' ? (
          <Checkbox.Group {...fieldOptions} value={record[dataIndex]} />
        ) : type === 'cascader' ? (
          <Cascader {...fieldOptions} value={record[dataIndex]} />
        ) : type === 'radio' ? (
          <Radio.Group {...fieldOptions} value={record[dataIndex]} />
        ) : type === 'datePicker' ? (
          <DatePicker {...fieldOptions} value={record[dataIndex]} />
        ) : type === 'dateRangePicker' ? (
          <DatePicker.RangePicker {...fieldOptions} value={record[dataIndex]} />
        ) : type === 'rate' ? (
          <Rate {...fieldOptions} value={record[dataIndex]} />
        ) : type === 'switch' ? (
          <Switch {...fieldOptions} defaultChecked={record[dataIndex]} />
        ) : type === 'timePicker' ? (
          <TimePicker {...fieldOptions} value={record[dataIndex]} />
        ) : type === 'timeRangePicker' ? (
          <TimePicker.RangePicker {...fieldOptions} value={record[dataIndex]} />
        ) : type === 'treeSelect' ? (
          <TreeSelect {...fieldOptions} value={record[dataIndex]} />
        ) : (
          children
        )}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

export default DynamicTable;
