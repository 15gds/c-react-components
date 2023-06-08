import React, { useRef, useCallback, useEffect, useState } from 'react';
import { init } from 'echarts';

function _iterableToArrayLimit(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s,
      _e,
      _x,
      _r,
      _arr = [],
      _n = !0,
      _d = !1;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = !1;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
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
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}

var myChart = null;
var ChartsComp = /*#__PURE__*/React.memo(function (props) {
  var style = props.style,
    option = props.option;
  var chartRef = useRef(null);
  var renderChart = useCallback(function () {
    myChart = init(chartRef.current, undefined);
    myChart.setOption(_objectSpread2(_objectSpread2({
      grid: {
        left: '6%',
        right: 40,
        bottom: 30,
        top: 30
      }
    }, option), {}, {
      tooltip: _objectSpread2({
        textStyle: {
          fontSize: 16
        }
      }, (option === null || option === void 0 ? void 0 : option.tooltip) || {}),
      legend: _objectSpread2({
        textStyle: {
          color: '#000',
          fontSize: 16
        }
      }, (option === null || option === void 0 ? void 0 : option.legend) || {}),
      xAxis: _objectSpread2({
        axisLine: {
          show: true
        },
        axisLabel: {
          color: '#000',
          fontWeight: 400,
          fontSize: 16
        }
      }, (option === null || option === void 0 ? void 0 : option.xAxis) || {}),
      yAxis: _objectSpread2({
        splitLine: {
          show: false
        },
        axisLine: {
          show: true
        },
        axisLabel: {
          color: '#000',
          fontWeight: 400,
          fontSize: 16
        }
      }, (option === null || option === void 0 ? void 0 : option.yAxis) || {})
    }));
  }, [option]);
  useEffect(function () {
    renderChart();
  }, [renderChart]);
  useEffect(function () {
    return function () {
      myChart && myChart.dispose();
    };
  }, []);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: _objectSpread2({}, style),
    ref: chartRef
  }));
});

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = "* {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n}\n.dragResizeBox {\n  box-sizing: border-box;\n  position: absolute;\n  border: 1px solid transparent;\n  z-index: 1;\n  cursor: move;\n}\n.dragResizeBox:hover {\n  border-color: #09f;\n}\n.dragResizeBox .rect {\n  width: 8px;\n  height: 8px;\n  position: absolute;\n  border: 1px solid #067bef;\n  background-color: white;\n  z-index: 10;\n}\n.dragResizeBox .rect_left_top {\n  left: 0;\n  top: 0;\n  transform: translate(-50%, -50%);\n  cursor: nwse-resize;\n}\n.dragResizeBox .rect_left_bottom {\n  left: 0;\n  bottom: 0;\n  transform: translate(-50%, 50%);\n  cursor: nesw-resize;\n}\n.dragResizeBox .rect_right_top {\n  right: 0;\n  top: 0;\n  transform: translate(50%, -50%);\n  cursor: nesw-resize;\n}\n.dragResizeBox .rect_right_bottom {\n  right: 0;\n  bottom: 0;\n  transform: translate(50%, 50%);\n  cursor: nwse-resize;\n}\n.dragResizeBox .rect_top {\n  right: 50%;\n  top: 0;\n  cursor: ns-resize;\n  transform: translate(50%, -50%);\n}\n.dragResizeBox .rect_right {\n  right: 0;\n  top: 50%;\n  cursor: ew-resize;\n  transform: translate(50%, -50%);\n}\n.dragResizeBox .rect_bottom {\n  left: 50%;\n  bottom: 0;\n  cursor: ns-resize;\n  transform: translate(-50%, 50%);\n}\n.dragResizeBox .rect_left {\n  left: 0;\n  top: 50%;\n  cursor: ew-resize;\n  transform: translate(-50%, -50%);\n}\n.checked {\n  border-color: #09f;\n}\n.content {\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n  cursor: move;\n}\n.line {\n  position: absolute;\n  z-index: 99999;\n}\n";
styleInject(css_248z);

var directionArr = ['left_top', 'left_bottom', 'right_top', 'right_bottom', 'top', 'bottom', 'left', 'right'];
var initCollector = {
  left: 0,
  top: 0,
  width: 0,
  height: 0,
  right: 0,
  bottom: 0,
  pointX: 0,
  pointY: 0,
  shiftX: 0,
  shiftY: 0
};
/**
 * 获取当前方位坐标
 * @param el
 * @returns
 */
var getCoords = function getCoords(el) {
  var rect = el.getBoundingClientRect();
  var left = window.pageXOffset + rect.left;
  var right = window.pageXOffset + rect.right;
  var top = window.pageYOffset + rect.top;
  var bottom = window.pageYOffset + rect.bottom;
  return {
    left: left,
    right: right,
    top: top,
    bottom: bottom
  };
};
var DragResizeBox = /*#__PURE__*/React.memo(function (props) {
  var children = props.children,
    rect = props.rect,
    className = props.className,
    style = props.style,
    relative = props.relative,
    _props$minWidth = props.minWidth,
    minWidth = _props$minWidth === void 0 ? 20 : _props$minWidth,
    _props$minHeight = props.minHeight,
    minHeight = _props$minHeight === void 0 ? 20 : _props$minHeight,
    _props$guides = props.guides,
    guides = _props$guides === void 0 ? true : _props$guides,
    _props$adsorb = props.adsorb,
    adsorb = _props$adsorb === void 0 ? true : _props$adsorb,
    _props$diff = props.diff,
    diff = _props$diff === void 0 ? 3 : _props$diff,
    onChange = props.onChange,
    limit = props.limit,
    _props$guidesColor = props.guidesColor,
    guidesColor = _props$guidesColor === void 0 ? 'rgb(0, 120, 212)' : _props$guidesColor;
  var box = useRef(null);
  // 用来记录鼠标点下去时元素的属性值
  var collector = useRef(initCollector);
  var allBoxRectCollector = useRef([]);
  // 方向
  var direction = useRef('left');
  // 辅助线
  var line_n = useRef(null);
  var line_e = useRef(null);
  var line_s = useRef(null);
  var line_w = useRef(null);
  var line_mdx = useRef(null);
  var line_mdy = useRef(null);
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    allowResize = _useState2[0],
    setAllowResize = _useState2[1];
  var _useState3 = useState({}),
    _useState4 = _slicedToArray(_useState3, 2),
    rectAttr = _useState4[0],
    setRectAttr = _useState4[1];
  var onMouseUp = useCallback(function () {
    hiddenLine();
    document.removeEventListener('mousemove', onMouseMove);
  }, []);
  var onCancelChecked = useCallback(function (e) {
    var isChild = box.current.contains(e.target);
    if (!isChild) {
      setAllowResize(false);
    }
  }, []);
  var onChecked = useCallback(function () {
    return setAllowResize(true);
  }, []);
  /**
   * 判断是否接近
   */
  var isNearly = useCallback(function (value1, value2) {
    return Math.abs(value1 - value2) <= diff;
  }, [diff]);
  var _showLine = useCallback(function (whichLine) {
    whichLine.current.hidden = false;
  }, []);
  var hiddenLine = useCallback(function () {
    [line_n, line_e, line_s, line_w, line_mdx, line_mdy].forEach(function (line) {
      line.current.hidden = true;
    });
  }, []);
  var handleLines = useCallback(function (curCalcRect) {
    allBoxRectCollector.current.forEach(function (elementRect) {
      var top = elementRect.top,
        left = elementRect.left,
        width = elementRect.width,
        height = elementRect.height,
        bottom = elementRect.bottom,
        right = elementRect.right;
      var halfX = top + height / 2;
      var halfY = left + width / 2;
      var conditions = {
        top: [{
          isNearly: isNearly(top, curCalcRect.top),
          lineNode: line_n.current,
          showLine: function showLine() {
            return _showLine(line_n);
          },
          lineStyle: {
            width: curCalcRect.left > left ? curCalcRect.left + curCalcRect.width - left : right - curCalcRect.left,
            left: curCalcRect.left > left ? left : curCalcRect.left,
            top: top,
            height: 2
          },
          adsorbNum: top
        }, {
          isNearly: isNearly(bottom, curCalcRect.top),
          lineNode: line_s.current,
          showLine: function showLine() {
            return _showLine(line_s);
          },
          lineStyle: {
            width: curCalcRect.left > left ? curCalcRect.left + curCalcRect.width - left : right - curCalcRect.left,
            left: curCalcRect.left > left ? left : curCalcRect.left,
            top: bottom,
            height: 2
          },
          adsorbNum: bottom
        }, {
          isNearly: isNearly(bottom, curCalcRect.top + curCalcRect.height),
          lineNode: line_s.current,
          showLine: function showLine() {
            return _showLine(line_s);
          },
          lineStyle: {
            width: curCalcRect.left > left ? curCalcRect.left + curCalcRect.width - left : right - curCalcRect.left,
            left: curCalcRect.left > left ? left : curCalcRect.left,
            top: bottom,
            height: 2
          },
          adsorbNum: bottom - curCalcRect.height
        }, {
          isNearly: isNearly(top, curCalcRect.top + curCalcRect.height),
          lineNode: line_s.current,
          showLine: function showLine() {
            return _showLine(line_s);
          },
          lineStyle: {
            width: curCalcRect.left > left ? curCalcRect.left + curCalcRect.width - left : right - curCalcRect.left,
            left: curCalcRect.left > left ? left : curCalcRect.left,
            top: top,
            height: 2
          },
          adsorbNum: top - curCalcRect.height
        },
        //我的中间跟别人的中间：x轴
        {
          isNearly: isNearly(halfX, curCalcRect.top + curCalcRect.height / 2),
          lineNode: line_mdx.current,
          showLine: function showLine() {
            return _showLine(line_mdx);
          },
          lineStyle: {
            width: curCalcRect.left > left ? curCalcRect.left + curCalcRect.width - left : right - curCalcRect.left,
            left: curCalcRect.left > left ? left : curCalcRect.left,
            top: halfX,
            height: 2
          },
          adsorbNum: halfX - curCalcRect.height / 2
        }],
        left: [
        //我的左边跟别人的左边
        {
          isNearly: isNearly(left, curCalcRect.left),
          lineNode: line_w.current,
          showLine: function showLine() {
            return _showLine(line_w);
          },
          lineStyle: {
            width: 2,
            left: left,
            top: curCalcRect.top > top ? top : curCalcRect.top,
            height: curCalcRect.top > top ? Math.abs(curCalcRect.top - top + collector.current.height) : Math.abs(bottom - curCalcRect.top)
          },
          adsorbNum: left
        }, {
          isNearly: isNearly(left, curCalcRect.left + curCalcRect.width),
          lineNode: line_w.current,
          showLine: function showLine() {
            return _showLine(line_w);
          },
          lineStyle: {
            width: 2,
            left: left,
            top: curCalcRect.top > top ? top : curCalcRect.top,
            height: curCalcRect.top > top ? Math.abs(curCalcRect.top - top + collector.current.height) : Math.abs(bottom - curCalcRect.top)
          },
          adsorbNum: left - curCalcRect.width
        },
        //我的右边跟别人的右边
        {
          isNearly: isNearly(right, curCalcRect.left + curCalcRect.width),
          lineNode: line_w.current,
          showLine: function showLine() {
            return _showLine(line_w);
          },
          lineStyle: {
            width: 2,
            left: right,
            top: curCalcRect.top > top ? top : curCalcRect.top,
            height: curCalcRect.top > top ? Math.abs(curCalcRect.top - top + collector.current.height) : Math.abs(bottom - curCalcRect.top)
          },
          adsorbNum: right - curCalcRect.width
        },
        //我的左边跟别人的右边
        {
          isNearly: isNearly(right, curCalcRect.left),
          lineNode: line_w.current,
          showLine: function showLine() {
            return _showLine(line_w);
          },
          lineStyle: {
            width: 2,
            left: right,
            top: curCalcRect.top > top ? top : curCalcRect.top,
            height: curCalcRect.top > top ? Math.abs(curCalcRect.top - top + collector.current.height) : Math.abs(bottom - curCalcRect.top)
          },
          adsorbNum: right
        },
        //我的 中间跟别人的中间：y 轴
        {
          isNearly: isNearly(halfY, curCalcRect.left + curCalcRect.width / 2),
          lineNode: line_mdy.current,
          showLine: function showLine() {
            return _showLine(line_mdy);
          },
          lineStyle: {
            width: 2,
            left: halfY,
            top: curCalcRect.top > top ? top : curCalcRect.top,
            height: curCalcRect.top > top ? Math.abs(curCalcRect.top - top + collector.current.height) : Math.abs(bottom - curCalcRect.top)
          },
          adsorbNum: halfY - curCalcRect.width / 2
        }]
      };
      Object.keys(conditions).forEach(function (key) {
        conditions[key].forEach(function (_ref) {
          var isNearly = _ref.isNearly,
            lineStyle = _ref.lineStyle,
            lineNode = _ref.lineNode,
            adsorbNum = _ref.adsorbNum,
            showLine = _ref.showLine;
          if (isNearly) {
            showLine();
            Object.keys(lineStyle).forEach(function (key) {
              return lineNode.style[key] = lineStyle[key] + 'px';
            });
            // 允许磁吸效果
            if (adsorb) {
              curCalcRect[key] = adsorbNum;
            }
          }
        });
      });
    });
  }, [adsorb]);
  /**
   * 计算移动后点位数据
   */
  var handleCalcRect = useCallback(function (collectorRect, offsetInfo, e) {
    var left = collectorRect.left,
      top = collectorRect.top,
      width = collectorRect.width,
      height = collectorRect.height;
    var offsetX = offsetInfo.offsetX,
      offsetY = offsetInfo.offsetY,
      shiftX = offsetInfo.shiftX,
      shiftY = offsetInfo.shiftY;
    switch (direction.current) {
      case 'left_top':
        left = Math.min(left + width - minWidth, left - offsetX);
        top = Math.min(top + height - minHeight, top - offsetY);
        width = width + offsetX;
        height = height + offsetY;
        break;
      case 'left_bottom':
        left = Math.min(left + width - minWidth, left - offsetX);
        width = width + offsetX;
        height = height - offsetY;
        break;
      case 'right_top':
        top = Math.min(top + height - minHeight, top - offsetY);
        width = width - offsetX;
        height = height + offsetY;
        break;
      case 'right_bottom':
        width = width - offsetX;
        height = height - offsetY;
        break;
      case 'top':
        top = Math.min(top + height - minHeight, top - offsetY);
        height = height + offsetY;
        break;
      case 'bottom':
        height = height - offsetY;
        break;
      case 'left':
        left = Math.min(left + width - minWidth, left - offsetX);
        width = width + offsetX;
        break;
      case 'right':
        width = width - offsetX;
        break;
      case 'content':
        left = e.pageX - shiftX;
        top = e.pageY - shiftY;
        break;
    }
    return {
      width: width,
      height: height,
      left: left,
      top: top
    };
  }, []);
  /**
   * 收集所有相同移动盒子的 rect 属性
   */
  var collectAllBoxRect = useCallback(function () {
    var _box$current;
    allBoxRectCollector.current = [];
    //其他所有相同的移动盒子
    var allBoxes = Array.from((relative ? (_box$current = box.current) === null || _box$current === void 0 ? void 0 : _box$current.parentElement : document).querySelectorAll('.dragResizeBox'));
    for (var _i = 0, _allBoxes = allBoxes; _i < _allBoxes.length; _i++) {
      var boxItem = _allBoxes[_i];
      if (boxItem === box.current) {
        continue;
      }
      var _boxItem$getBoundingC = boxItem.getBoundingClientRect(),
        width = _boxItem$getBoundingC.width,
        height = _boxItem$getBoundingC.height;
      var position = {};
      if (relative) {
        Object.assign(position, {
          left: boxItem.offsetLeft,
          top: boxItem.offsetTop,
          bottom: boxItem.offsetTop + height,
          right: boxItem.offsetLeft + width
        });
      } else {
        position = getCoords(boxItem);
      }
      allBoxRectCollector.current.push(_objectSpread2({
        width: width,
        height: height
      }, position));
    }
  }, [relative]);
  var handleLimit = useCallback(function (rect, limit) {
    var left = rect.left,
      top = rect.top,
      width = rect.width,
      height = rect.height;
    switch (direction.current) {
      case 'content':
        if (left < limit.left) {
          left = limit.left;
        }
        if (left > limit.right - width) {
          left = limit.right - width;
        }
        if (top < limit.top) {
          top = limit.top;
        }
        if (top > limit.bottom - height) {
          top = limit.bottom - height;
        }
        break;
      case 'left_top':
        if (top < limit.top) {
          top = limit.top;
        }
        if (left < limit.left) {
          left = limit.left;
        }
        break;
      case 'top':
        if (top < limit.top) {
          top = limit.top;
        }
        break;
      case 'right_top':
        if (top < limit.top) {
          top = limit.top;
        }
        if (width + left > limit.right) {
          left = Math.max(limit.left, left - (width + left - limit.right));
        }
        break;
      case 'right':
        if (left + width > limit.right) {
          left = Math.max(limit.left, left - (left + width - limit.right));
        }
        break;
      case 'right_bottom':
        if (left + width > limit.right) {
          left = Math.max(limit.left, left - (left + width - limit.right));
        }
        if (top + height > limit.bottom) {
          top = Math.max(limit.top, top - (top + height - limit.bottom));
        }
        break;
      case 'bottom':
        if (top + height > limit.bottom) {
          top = Math.max(limit.top, top - (top + height - limit.bottom));
        }
        break;
      case 'left_bottom':
        if (left < limit.left) {
          left = limit.left;
        }
        if (top + height > limit.bottom) {
          top = Math.max(limit.top, top - (top + height - limit.bottom));
        }
        break;
      case 'left':
        if (left < limit.left) {
          left = limit.left;
        }
        break;
    }
    if (width > limit.right - limit.left) {
      width = limit.right - limit.left;
    }
    if (height > limit.bottom - limit.top) {
      height = limit.bottom - limit.top;
    }
    return {
      width: width,
      height: height,
      left: left,
      top: top
    };
  }, []);
  var onMouseMove = useCallback(function (e) {
    var _collector$current = collector.current,
      left = _collector$current.left,
      top = _collector$current.top,
      width = _collector$current.width,
      height = _collector$current.height,
      pointX = _collector$current.pointX,
      pointY = _collector$current.pointY,
      shiftX = _collector$current.shiftX,
      shiftY = _collector$current.shiftY;
    var offsetX = pointX - e.pageX;
    var offsetY = pointY - e.pageY;
    var curCalcRect = handleCalcRect({
      left: left,
      top: top,
      width: width,
      height: height
    }, {
      offsetX: offsetX,
      offsetY: offsetY,
      shiftX: shiftX,
      shiftY: shiftY
    }, e);
    // 移动时处理辅助线
    if (direction.current === 'content' && guides) {
      hiddenLine();
      handleLines(curCalcRect);
    }
    if (limit) {
      curCalcRect = handleLimit(curCalcRect, limit);
    }
    onChange ? onChange(_objectSpread2(_objectSpread2({}, curCalcRect), {}, {
      width: Math.max(minWidth, curCalcRect.width),
      height: Math.max(minHeight, curCalcRect.height)
    })) : setRectAttr(_objectSpread2(_objectSpread2({}, curCalcRect), {}, {
      width: Math.max(minWidth, curCalcRect.width),
      height: Math.max(minHeight, curCalcRect.height)
    }));
  }, [guides]);
  var _onMouseDown = useCallback(function (e, currentDirection) {
    var _box$current4, _box$current5, _box$current6;
    e.stopPropagation();
    collectAllBoxRect();
    //只有左键才有效
    if (e.button !== 0) return;
    // 获取元素在盒子中的rect属性
    var left, top, right, bottom;
    if (relative) {
      var _box$current2, _box$current3;
      left = (_box$current2 = box.current) === null || _box$current2 === void 0 ? void 0 : _box$current2.offsetLeft;
      top = (_box$current3 = box.current) === null || _box$current3 === void 0 ? void 0 : _box$current3.offsetTop;
    } else {
      left = getCoords(box.current).left;
      top = getCoords(box.current).top;
    }
    right = left + ((_box$current4 = box.current) === null || _box$current4 === void 0 ? void 0 : _box$current4.offsetWidth);
    bottom = top + ((_box$current5 = box.current) === null || _box$current5 === void 0 ? void 0 : _box$current5.offsetHeight);
    // 获取元素矩阵大小
    var _box$current$getBound = (_box$current6 = box.current) === null || _box$current6 === void 0 ? void 0 : _box$current6.getBoundingClientRect(),
      width = _box$current$getBound.width,
      height = _box$current$getBound.height;
    // 存下鼠标点击后的鼠标坐标
    var pointX = e.pageX,
      pointY = e.pageY;
    var shiftX = pointX - left,
      shiftY = pointY - top;
    // 将所有属性都记录下来
    Object.assign(collector.current, {
      left: left,
      top: top,
      width: width,
      height: height,
      pointX: pointX,
      pointY: pointY,
      shiftX: shiftX,
      shiftY: shiftY,
      right: right,
      bottom: bottom
    });
    direction.current = currentDirection;
    document.addEventListener('mousemove', onMouseMove);
  }, []);
  useEffect(function () {
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('click', onCancelChecked);
    return function () {
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('click', onCancelChecked);
    };
  }, []);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    ref: box,
    style: _objectSpread2(_objectSpread2(_objectSpread2({}, style), rect), rectAttr),
    className: "dragResizeBox ".concat(allowResize ? 'checked' : '', " ").concat(className),
    onClick: onChecked
  }, directionArr.map(function (item) {
    return /*#__PURE__*/React.createElement("span", {
      key: item,
      className: allowResize ? "rect rect_".concat(item) : '',
      onMouseDown: function onMouseDown(e) {
        return _onMouseDown(e, item);
      }
    });
  }), /*#__PURE__*/React.createElement("div", {
    className: 'content',
    onMouseDown: function onMouseDown(e) {
      return _onMouseDown(e, 'content');
    }
  }, children)), [{
    className: 'n',
    ref: line_n
  }, {
    className: 'e',
    ref: line_e
  }, {
    className: 's',
    ref: line_s
  }, {
    className: 'w',
    ref: line_w
  }, {
    className: 'mdx',
    ref: line_mdx
  }, {
    className: 'mdy',
    ref: line_mdy
  }].map(function (_ref2) {
    var className = _ref2.className,
      ref = _ref2.ref;
    return /*#__PURE__*/React.createElement("div", {
      key: className,
      style: {
        backgroundColor: guidesColor
      },
      className: "line line_".concat(className),
      ref: ref
    });
  }));
});

export { ChartsComp, DragResizeBox };
