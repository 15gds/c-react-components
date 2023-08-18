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
var _excluded = [
  'labelCol',
  'wrapperCol',
  'formItemOptions',
  'onFinish',
  'onReset',
  'footer',
];
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
function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
import React from 'react';
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
var DynamicForms = function DynamicForms(props) {
  var _props$labelCol = props.labelCol,
    labelCol = _props$labelCol === void 0 ? 8 : _props$labelCol,
    _props$wrapperCol = props.wrapperCol,
    wrapperCol = _props$wrapperCol === void 0 ? 16 : _props$wrapperCol,
    formItemOptions = props.formItemOptions,
    onFinish = props.onFinish,
    onReset = props.onReset,
    _props$footer = props.footer,
    footer =
      _props$footer === void 0
        ? {
            hidden: false,
            submitText: '提交',
            resetText: '重置',
          }
        : _props$footer,
    other = _objectWithoutProperties(props, _excluded);
  var _Form$useForm = Form.useForm(),
    _Form$useForm2 = _slicedToArray(_Form$useForm, 1),
    form = _Form$useForm2[0];
  var transform = function transform(type) {
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
  return /*#__PURE__*/ React.createElement(
    Form,
    _extends({}, other, {
      form: form,
      labelCol:
        (other === null || other === void 0 ? void 0 : other.layout) ===
        'inline'
          ? undefined
          : typeof labelCol == 'number'
          ? {
              span: labelCol,
            }
          : labelCol,
      wrapperCol:
        (other === null || other === void 0 ? void 0 : other.layout) ===
        'inline'
          ? undefined
          : typeof wrapperCol == 'number'
          ? {
              span: wrapperCol,
            }
          : wrapperCol,
      onFinish: onFinish,
    }),
    formItemOptions &&
      formItemOptions.length > 0 &&
      formItemOptions.map(function (item, index) {
        var formItem = Object.assign({}, item);
        delete formItem.customRender;
        delete formItem.fieldOptions;
        delete formItem.btnContext;
        return /*#__PURE__*/ React.createElement(
          Form.Item,
          _extends({}, formItem, {
            key: item.name + '_' + index,
            style: {
              marginBottom: (other.layout = 'inline' ? 12 : ''),
            },
          }),
          item.type === 'custom'
            ? item.customRender(form, item)
            : item.type === 'icon'
            ? item.icon
            : item.type === 'upload'
            ? /*#__PURE__*/ React.createElement(
                Upload,
                item.fieldOptions,
                /*#__PURE__*/ React.createElement(
                  Button,
                  {
                    icon: item.icon
                      ? item.icon
                      : /*#__PURE__*/ React.createElement(UploadOutlined, null),
                  },
                  'Click to upload',
                ),
              )
            : /*#__PURE__*/ React.createElement(
                transform(item.type),
                _objectSpread(
                  {
                    placeholder: '请输入',
                  },
                  item.fieldOptions,
                ),
                item.type === 'button' ? item.btnContext : null,
              ),
        );
      }),
    footer.hidden
      ? null
      : /*#__PURE__*/ React.createElement(
          Form.Item,
          _extends(
            {
              labelCol:
                (other === null || other === void 0 ? void 0 : other.layout) ===
                'inline'
                  ? undefined
                  : typeof labelCol == 'number'
                  ? {
                      span: labelCol,
                    }
                  : labelCol,
              wrapperCol:
                (other === null || other === void 0 ? void 0 : other.layout) ===
                'inline'
                  ? undefined
                  : typeof wrapperCol == 'number'
                  ? {
                      offset: labelCol,
                      span: wrapperCol,
                    }
                  : wrapperCol,
            },
            footer.itemOptions,
          ),
          /*#__PURE__*/ React.createElement(
            Button,
            {
              type: 'primary',
              htmlType: 'submit',
            },
            footer.submitText,
          ),
          /*#__PURE__*/ React.createElement(
            Button,
            {
              htmlType: 'button',
              onClick: function onClick() {
                form.resetFields();
                onReset && onReset(form.getFieldsValue(), form);
              },
              style: {
                marginLeft: '12px',
              },
            },
            footer.resetText,
          ),
        ),
  );
};
export default DynamicForms;
