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
import React, { useRef, useEffect, useCallback } from 'react';
import * as echarts from 'echarts';
var myChart = null;
var ChartsComp = function ChartsComp(props) {
  var style = props.style,
    option = props.option;
  var chartRef = useRef(null);
  var renderChart = useCallback(
    function () {
      myChart = echarts.init(chartRef.current, undefined);
      myChart.setOption(
        _objectSpread(
          _objectSpread(
            {
              grid: {
                left: '6%',
                right: 40,
                bottom: 30,
                top: 30,
              },
            },
            option,
          ),
          {},
          {
            tooltip: _objectSpread(
              {
                textStyle: {
                  fontSize: 16,
                },
              },
              (option === null || option === void 0
                ? void 0
                : option.tooltip) || {},
            ),
            legend: _objectSpread(
              {
                textStyle: {
                  color: '#000',
                  fontSize: 16,
                },
              },
              (option === null || option === void 0 ? void 0 : option.legend) ||
                {},
            ),
            xAxis: _objectSpread(
              {
                axisLine: {
                  show: true,
                },
                axisLabel: {
                  color: '#000',
                  fontWeight: 400,
                  fontSize: 16,
                },
              },
              (option === null || option === void 0 ? void 0 : option.xAxis) ||
                {},
            ),
            yAxis: _objectSpread(
              {
                splitLine: {
                  show: false,
                },
                axisLine: {
                  show: true,
                },
                axisLabel: {
                  color: '#000',
                  fontWeight: 400,
                  fontSize: 16,
                },
              },
              (option === null || option === void 0 ? void 0 : option.yAxis) ||
                {},
            ),
          },
        ),
      );
    },
    [option],
  );
  useEffect(
    function () {
      renderChart();
    },
    [renderChart],
  );
  useEffect(function () {
    return function () {
      myChart && myChart.dispose();
    };
  }, []);
  return /*#__PURE__*/ React.createElement(
    React.Fragment,
    null,
    /*#__PURE__*/ React.createElement('div', {
      style: _objectSpread({}, style),
      ref: chartRef,
    }),
  );
};
export default ChartsComp;
