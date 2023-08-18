function _extends() {
  _extends = Object.assign
    ? Object.assign.bind()
    : function (target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
  return _extends.apply(this, arguments);
}
function _toConsumableArray(arr) {
  return (
    _arrayWithoutHoles(arr) ||
    _iterableToArray(arr) ||
    _unsupportedIterableToArray(arr) ||
    _nonIterableSpread()
  );
}
function _nonIterableSpread() {
  throw new TypeError(
    'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
  );
}
function _iterableToArray(iter) {
  if (
    (typeof Symbol !== 'undefined' && iter[Symbol.iterator] != null) ||
    iter['@@iterator'] != null
  )
    return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _slicedToArray(arr, i) {
  return (
    _arrayWithHoles(arr) ||
    _iterableToArrayLimit(arr, i) ||
    _unsupportedIterableToArray(arr, i) ||
    _nonIterableRest()
  );
}
function _nonIterableRest() {
  throw new TypeError(
    'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
  );
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === 'string') return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === 'Object' && o.constructor) n = o.constructor.name;
  if (n === 'Map' || n === 'Set') return Array.from(o);
  if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit(arr, i) {
  var _i =
    null == arr
      ? null
      : ('undefined' != typeof Symbol && arr[Symbol.iterator]) ||
        arr['@@iterator'];
  if (null != _i) {
    var _s,
      _e,
      _x,
      _r,
      _arr = [],
      _n = !0,
      _d = !1;
    try {
      if (((_x = (_i = _i.call(arr)).next), 0 === i)) {
        if (Object(_i) !== _i) return;
        _n = !1;
      } else
        for (
          ;
          !(_n = (_s = _x.call(_i)).done) &&
          (_arr.push(_s.value), _arr.length !== i);
          _n = !0
        );
    } catch (err) {
      (_d = !0), (_e = err);
    } finally {
      try {
        if (!_n && null != _i.return && ((_r = _i.return()), Object(_r) !== _r))
          return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly &&
      (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })),
      keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2
      ? ownKeys(Object(source), !0).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(
          target,
          Object.getOwnPropertyDescriptors(source),
        )
      : ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(
            target,
            key,
            Object.getOwnPropertyDescriptor(source, key),
          );
        });
  }
  return target;
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, 'string');
  return _typeof(key) === 'symbol' ? key : String(key);
}
function _toPrimitive(input, hint) {
  if (_typeof(input) !== 'object' || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || 'default');
    if (_typeof(res) !== 'object') return res;
    throw new TypeError('@@toPrimitive must return a primitive value.');
  }
  return (hint === 'string' ? String : Number)(input);
}
function _typeof(obj) {
  '@babel/helpers - typeof';
  return (
    (_typeof =
      'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
        ? function (obj) {
            return typeof obj;
          }
        : function (obj) {
            return obj &&
              'function' == typeof Symbol &&
              obj.constructor === Symbol &&
              obj !== Symbol.prototype
              ? 'symbol'
              : typeof obj;
          }),
    _typeof(obj)
  );
}
import React, { useState, useEffect } from 'react';
import funcCode from '../../data/func.code';
import _ from 'lodash';
import Icon, { DownOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import * as icons from '@ant-design/icons';
import { Button, Dropdown, Popconfirm } from 'antd';
// 按钮是否隐藏
var btnIsHide = function btnIsHide(isHide) {
  var params =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  if (!isHide) return false;
  var paramsArr = [];
  if (_typeof(params) === 'object') {
    Object.keys(params).map(function (item) {
      paramsArr.push(params[item]);
    });
  }
  if (typeof isHide === 'function') {
    return isHide.apply(void 0, paramsArr); // 表格列返回的是方法
  }

  return isHide;
};
var removeNoPermission = function removeNoPermission(array, codes, params) {
  return (
    Array.isArray(array) &&
    array
      .filter(function (item) {
        if (item.children) {
          item.children = removeNoPermission(item.children, codes, params);
        }
        if (item.hasOwnProperty('isHide')) {
          // 判断是否包含 'isHide'字段，如果包含则先过滤 isHide 为false
          return !btnIsHide(item.isHide, params);
        }
        return true;
      })
      .map(function (resultItem) {
        // 与codes进行对比，相应的 code匹配以对应的name,icon,code返回
        // 如果有配置code，则使用func.code.js里面配置的名称
        if (codes && resultItem['code']) {
          var matchIndex = _.findIndex(codes, function (btnItem) {
            return btnItem.code === resultItem['code'];
          });
          if (matchIndex !== -1) {
            // 如果有配置code，则使用func.code.js里面配置的名称
            resultItem = _objectSpread(
              _objectSpread({}, resultItem),
              codes[matchIndex],
            );
          }
        }
        return resultItem;
      })
  );
};
var ButtonGroup = function ButtonGroup(props) {
  var _props$type = props.type,
    type = _props$type === void 0 ? 'button' : _props$type,
    _props$options = props.options,
    options = _props$options === void 0 ? [] : _props$options,
    _props$rowParams = props.rowParams,
    rowParams =
      _props$rowParams === void 0
        ? {
            rowText: undefined,
            record: undefined,
            rowIndex: undefined,
          }
        : _props$rowParams,
    _props$codes = props.codes,
    codes = _props$codes === void 0 ? funcCode.btnFuncCodes : _props$codes;
  var _props$min = props.min,
    min = _props$min === void 0 ? 3 : _props$min;
  var _useState = useState([]),
    _useState2 = _slicedToArray(_useState, 2),
    resetList = _useState2[0],
    setResetList = _useState2[1];
  var _useState3 = useState(-1),
    _useState4 = _slicedToArray(_useState3, 2),
    popVisibleIndex = _useState4[0],
    setPopVisibleIndex = _useState4[1];
  var _useState5 = useState({}),
    _useState6 = _slicedToArray(_useState5, 2),
    popRow = _useState6[0],
    setPopRow = _useState6[1];
  useEffect(
    function () {
      // isHide 为true的数据
      setResetList(
        _toConsumableArray(removeNoPermission(options, codes, rowParams)) || [],
      );
      return function () {
        setResetList([]);
      };
    },
    [options, codes],
  );

  // 渲染按钮多层级形式 (用于筛选)
  var buttonMenu = function buttonMenu(group) {
    var returnArr = group.map(function (item, index) {
      return {
        key: item.code + '_' + index,
        label: item.hasOwnProperty('confirmText')
          ? /*#__PURE__*/ React.createElement(
              'a',
              {
                disabled: btnIsHide(item.disabled, rowParams),
                onClick: item.fn
                  ? function () {
                      setPopVisibleIndex(rowParams.rowIndex);
                      setPopRow(item);
                    }
                  : null,
              },
              /*#__PURE__*/ React.createElement(Icon, {
                component: icons[item.icon],
                style: {
                  marginRight: '6px',
                },
              }),
              item.render
                ? item.render.apply(
                    item,
                    _toConsumableArray(
                      Object.keys(rowParams).map(function (pItem) {
                        return rowParams[pItem];
                      }),
                    ),
                  )
                : item.exName || item.name,
            )
          : /*#__PURE__*/ React.createElement(
              'a',
              {
                onClick: function onClick() {
                  return item.fn(item);
                },
              },
              /*#__PURE__*/ React.createElement(Icon, {
                component: icons[item.icon],
                style: {
                  marginRight: '2px',
                },
              }),
              ' ',
              item.exName || item.name,
            ),
        disabled: btnIsHide(item.disabled, rowParams),
      };
    });
    return returnArr;
  };

  // 渲染按钮形式 (用于筛选)
  var RenderButtonList = function RenderButtonList(item) {
    return /*#__PURE__*/ React.createElement(
      Button,
      {
        type: item.type ? item.type : 'text',
        danger: item.danger,
        disabled: btnIsHide(item.disabled, rowParams),
        onClick: function onClick() {
          return item.fn(item);
        },
      },
      /*#__PURE__*/ React.createElement(Icon, {
        component: icons[item.icon],
      }),
      ' ',
      item.exName || item.name,
    );
  };

  // 渲染文本形式 列表（用于表格）
  var RenderTextList = function RenderTextList(item) {
    return /*#__PURE__*/ React.createElement(
      React.Fragment,
      null,
      item.hasOwnProperty('confirmText')
        ? /*#__PURE__*/ React.createElement(
            Popconfirm,
            {
              placement: 'topRight',
              okText: '\u786E\u5B9A',
              cancelText: '\u53D6\u6D88',
              title: item.confirmText
                ? item.confirmText.apply(
                    item,
                    _toConsumableArray(
                      Object.keys(rowParams).map(function (pItem) {
                        return rowParams[pItem];
                      }),
                    ),
                  )
                : '',
              icon: /*#__PURE__*/ React.createElement(
                QuestionCircleOutlined,
                null,
              ),
              onConfirm: item.fn
                ? function () {
                    return item.fn.apply(
                      item,
                      _toConsumableArray(
                        Object.keys(rowParams).map(function (pItem) {
                          return rowParams[pItem];
                        }),
                      ),
                    );
                  }
                : null,
            },
            /*#__PURE__*/ React.createElement(
              'a',
              {
                key: item.code + '_' + item.index,
                title: item.exName || item.name,
                disabled: btnIsHide(item.disabled, rowParams),
              },
              ' ',
              item.render
                ? item.render.apply(
                    item,
                    _toConsumableArray(
                      Object.keys(rowParams).map(function (pItem) {
                        return rowParams[pItem];
                      }),
                    ),
                  )
                : item.exName || item.name,
            ),
          )
        : /*#__PURE__*/ React.createElement(
            'a',
            {
              key: item.code + '_' + item.index,
              title: item.exName || item.name,
              disabled: btnIsHide(item.disabled, rowParams),
              onClick: function onClick() {
                return item.fn.apply(
                  item,
                  _toConsumableArray(
                    Object.keys(rowParams).map(function (pItem) {
                      return rowParams[pItem];
                    }),
                  ),
                );
              },
            },
            item.render
              ? item.render.apply(
                  item,
                  _toConsumableArray(
                    Object.keys(rowParams).map(function (pItem) {
                      return rowParams[pItem];
                    }),
                  ),
                )
              : item.exName || item.name,
          ),
    );
  };

  // 渲染展示的按钮列表
  var renderDisplayButton = function renderDisplayButton(item, index) {
    if (item.render) {
      return typeof item.render === 'function'
        ? item.render.apply(
            item,
            _toConsumableArray(
              Object.keys(rowParams).map(function (pItem) {
                return rowParams[pItem];
              }),
            ),
          )
        : item.render;
    }
    if (type === 'button') {
      /*渲染按钮形式*/
      return /*#__PURE__*/ React.createElement(
        RenderButtonList,
        _extends(
          {
            key: index,
          },
          item,
        ),
      );
    }
    /*渲染文本形式*/
    return /*#__PURE__*/ React.createElement(
      RenderTextList,
      _extends(
        {
          key: index,
        },
        item,
      ),
    );
  };
  if (min < 2) min = 2;
  if (resetList.length === 0) return type !== 'button' ? '-' : null;
  if (resetList.length > min) {
    var forGroup = resetList.slice(0, min - 1);
    var forDrop = resetList.slice(min - 1);
    return /*#__PURE__*/ React.createElement(
      'span',
      null,
      forGroup.map(function (item, index) {
        return index < min - 1 ? renderDisplayButton(item, index) : null;
      }),
      type === 'button'
        ? /*#__PURE__*/ React.createElement(
            Dropdown,
            {
              menu: {
                items: buttonMenu(forDrop),
              },
              placement: 'bottomRight',
            },
            /*#__PURE__*/ React.createElement(
              Button,
              {
                style: {
                  marginLeft: '8px',
                },
                type: 'primary',
              },
              '\u66F4\u591A ',
              /*#__PURE__*/ React.createElement(DownOutlined, null),
            ),
          )
        : /*#__PURE__*/ React.createElement(
            Popconfirm,
            {
              placement: 'topRight',
              okText: '\u786E\u5B9A',
              cancelText: '\u53D6\u6D88',
              open: popVisibleIndex === rowParams.rowIndex,
              onCancel: function onCancel() {
                return setPopVisibleIndex(false);
              },
              icon: /*#__PURE__*/ React.createElement(
                QuestionCircleOutlined,
                null,
              ),
              title: popRow.confirmText
                ? popRow.confirmText.apply(
                    popRow,
                    _toConsumableArray(
                      Object.keys(rowParams).map(function (pItem) {
                        return rowParams[pItem];
                      }),
                    ),
                  )
                : '',
              onConfirm: popRow.fn
                ? function () {
                    popRow.fn.apply(
                      popRow,
                      _toConsumableArray(
                        Object.keys(rowParams).map(function (pItem) {
                          return rowParams[pItem];
                        }),
                      ),
                    );
                    setPopVisibleIndex('');
                  }
                : null,
              trigger: 'click',
            },
            /*#__PURE__*/ React.createElement(
              Dropdown,
              {
                menu: {
                  items: buttonMenu(forDrop),
                },
                placement: 'bottomRight',
              },
              /*#__PURE__*/ React.createElement(
                'a',
                {
                  style: {
                    marginLeft: '8px',
                  },
                },
                '\u66F4\u591A ',
                /*#__PURE__*/ React.createElement(DownOutlined, null),
              ),
            ),
          ),
    );
  }
  return /*#__PURE__*/ React.createElement(
    React.Fragment,
    null,
    resetList.map(function (item, index) {
      return renderDisplayButton(item, index);
    }),
  );
};
export default ButtonGroup;
