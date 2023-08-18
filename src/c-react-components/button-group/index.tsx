import React, { FC, useState, useEffect, MouseEventHandler } from 'react';
import funcCode from '@/data/func.code';
import { btnFuncCodesProps } from '@/data/func.code';
import _ from 'lodash';
import Icon, { DownOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import * as icons from '@ant-design/icons';
import { Button, Divider, Dropdown, Menu, Popconfirm } from 'antd';
import type { MenuProps } from 'antd';
import { ButtonGroupProps, rowParamsProps } from './types';
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

export interface buttonGroupItemProps {
  code: string;
  icon?: any;
  name?: string;
  exName?: string;
  fn?: any;
  confirmText?: void;
  disabled?: boolean;
  render?: void;
}

// 按钮是否隐藏
const btnIsHide = (isHide: any, params = {}) => {
  if (!isHide) return false;
  const paramsArr: any[] = [];
  if (typeof params === 'object') {
    Object.keys(params).map((item) => {
      paramsArr.push(params[item as keyof typeof params]);
    });
  }
  if (typeof isHide === 'function') {
    return isHide(...paramsArr); // 表格列返回的是方法
  }
  return isHide;
};

const removeNoPermission = (
  array: object[],
  codes: btnFuncCodesProps[],
  params: rowParamsProps,
) => {
  return (
    Array.isArray(array) &&
    array
      .filter((item: any) => {
        if (item.children) {
          item.children = removeNoPermission(item.children, codes, params);
        }
        if (item.hasOwnProperty('isHide')) {
          // 判断是否包含 'isHide'字段，如果包含则先过滤 isHide 为false
          return !btnIsHide(item.isHide, params);
        }
        return true;
      })
      .map((resultItem) => {
        // 与codes进行对比，相应的 code匹配以对应的name,icon,code返回
        // 如果有配置code，则使用func.code.js里面配置的名称
        if (codes && resultItem['code' as keyof typeof resultItem]) {
          const matchIndex = _.findIndex(
            codes,
            (btnItem) =>
              btnItem.code === resultItem['code' as keyof typeof resultItem],
          );
          if (matchIndex !== -1) {
            // 如果有配置code，则使用func.code.js里面配置的名称
            resultItem = { ...resultItem, ...codes[matchIndex] };
          }
        }
        return resultItem;
      })
  );
};

const ButtonGroup: FC<ButtonGroupProps> = (props) => {
  const {
    type = 'button',
    options = [],
    rowParams = { rowText: undefined, record: undefined, rowIndex: undefined },
    codes = funcCode.btnFuncCodes,
  } = props;
  let { min = 3 } = props;
  const [resetList, setResetList] = useState<any[]>([]);
  const [popVisibleIndex, setPopVisibleIndex] = useState(-1);
  const [popRow, setPopRow] = useState({});

  useEffect(() => {
    // isHide 为true的数据
    setResetList([...removeNoPermission(options, codes, rowParams)] || []);
    return () => {
      setResetList([]);
    };
  }, [options, codes]);

  // 渲染按钮多层级形式 (用于筛选)
  const buttonMenu = (group: buttonGroupItemProps[]) => {
    const returnArr = group.map((item, index) => {
      return {
        key: item.code + '_' + index,
        label: item.hasOwnProperty('confirmText') ? (
          <a
            disabled={btnIsHide(item.disabled, rowParams)}
            onClick={
              item.fn
                ? () => {
                    setPopVisibleIndex(rowParams.rowIndex);
                    setPopRow(item);
                  }
                : null
            }
          >
            <Icon component={icons[item.icon]} style={{ marginRight: '6px' }} />
            {item.render
              ? item.render(
                  ...Object.keys(rowParams).map((pItem) => rowParams[pItem]),
                )
              : item.exName || item.name}
          </a>
        ) : (
          <a onClick={() => item.fn(item)}>
            <Icon component={icons[item.icon]} style={{ marginRight: '2px' }} />{' '}
            {item.exName || item.name}
          </a>
        ),
        disabled: btnIsHide(item.disabled, rowParams),
      };
    });
    return returnArr;
  };

  // 渲染按钮形式 (用于筛选)
  const RenderButtonList = (item) => {
    return (
      <Button
        type={item.type ? item.type : 'text'}
        danger={item.danger}
        disabled={btnIsHide(item.disabled, rowParams)}
        onClick={() => item.fn(item)}
      >
        <Icon component={icons[item.icon]} /> {item.exName || item.name}
      </Button>
    );
  };

  // 渲染文本形式 列表（用于表格）
  const RenderTextList = (item) => {
    return (
      <>
        {item.hasOwnProperty('confirmText') ? (
          <Popconfirm
            placement="topRight"
            okText="确定"
            cancelText="取消"
            title={
              item.confirmText
                ? item.confirmText(
                    ...Object.keys(rowParams).map((pItem) => rowParams[pItem]),
                  )
                : ''
            }
            icon={<QuestionCircleOutlined />}
            onConfirm={
              item.fn
                ? () =>
                    item.fn(
                      ...Object.keys(rowParams).map(
                        (pItem) => rowParams[pItem],
                      ),
                    )
                : null
            }
          >
            <a
              key={item.code + '_' + item.index}
              title={item.exName || item.name}
              disabled={btnIsHide(item.disabled, rowParams)}
            >
              {' '}
              {item.render
                ? item.render(
                    ...Object.keys(rowParams).map((pItem) => rowParams[pItem]),
                  )
                : item.exName || item.name}
            </a>
          </Popconfirm>
        ) : (
          <a
            key={item.code + '_' + item.index}
            title={item.exName || item.name}
            disabled={btnIsHide(item.disabled, rowParams)}
            onClick={() =>
              item.fn(
                ...Object.keys(rowParams).map((pItem) => rowParams[pItem]),
              )
            }
          >
            {item.render
              ? item.render(
                  ...Object.keys(rowParams).map((pItem) => rowParams[pItem]),
                )
              : item.exName || item.name}
          </a>
        )}
      </>
    );
  };

  // 渲染展示的按钮列表
  const renderDisplayButton = (item: any, index: number) => {
    if (item.render) {
      return typeof item.render === 'function'
        ? item.render(
            ...Object.keys(rowParams).map((pItem) => rowParams[pItem]),
          )
        : item.render;
    }

    if (type === 'button') {
      /*渲染按钮形式*/
      return <RenderButtonList key={index} {...item}></RenderButtonList>;
    }
    /*渲染文本形式*/
    return <RenderTextList key={index} {...item}></RenderTextList>;
  };

  if (min < 2) min = 2;
  if (resetList.length === 0) return type !== 'button' ? '-' : null;
  if (resetList.length > min) {
    const forGroup = resetList.slice(0, min - 1);
    const forDrop = resetList.slice(min - 1);
    return (
      <span>
        {forGroup.map((item, index) =>
          index < min - 1 ? renderDisplayButton(item, index) : null,
        )}
        {type === 'button' ? (
          <Dropdown
            menu={{ items: buttonMenu(forDrop) }}
            placement="bottomRight"
          >
            <Button style={{ marginLeft: '8px' }} type="primary">
              更多 <DownOutlined />
            </Button>
          </Dropdown>
        ) : (
          <Popconfirm
            placement="topRight"
            okText="确定"
            cancelText="取消"
            open={popVisibleIndex === rowParams.rowIndex}
            onCancel={() => setPopVisibleIndex(false)}
            icon={<QuestionCircleOutlined />}
            title={
              popRow.confirmText
                ? popRow.confirmText(
                    ...Object.keys(rowParams).map((pItem) => rowParams[pItem]),
                  )
                : ''
            }
            onConfirm={
              popRow.fn
                ? () => {
                    popRow.fn(
                      ...Object.keys(rowParams).map(
                        (pItem) => rowParams[pItem],
                      ),
                    );
                    setPopVisibleIndex('');
                  }
                : null
            }
            trigger="click"
          >
            <Dropdown
              menu={{ items: buttonMenu(forDrop) }}
              placement="bottomRight"
            >
              <a style={{ marginLeft: '8px' }}>
                更多 <DownOutlined />
              </a>
            </Dropdown>
          </Popconfirm>
        )}
      </span>
    );
  }

  return (
    <>{resetList.map((item, index) => renderDisplayButton(item, index))}</>
  );
};

export default ButtonGroup;
