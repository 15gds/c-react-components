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
import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';
import AMapLoader from '@amap/amap-jsapi-loader';
import './index.less';
import { Spin } from 'antd';
import { MenuContextFn } from './utils/menuContext';
var generateRandom = function generateRandom() {
  return Math.random().toString(16).slice(2);
};
var AmapComp = /*#__PURE__*/ forwardRef(function (props, ref) {
  var _props$center = props.center,
    center = _props$center === void 0 ? [116.397428, 39.90923] : _props$center,
    openInfo = props.openInfo,
    _props$showScaleContr = props.showScaleControl,
    showScaleControl =
      _props$showScaleContr === void 0 ? false : _props$showScaleContr,
    _props$showToolBar = props.showToolBar,
    showToolBar = _props$showToolBar === void 0 ? false : _props$showToolBar,
    _props$showControlBar = props.showControlBar,
    showControlBar =
      _props$showControlBar === void 0 ? false : _props$showControlBar,
    _props$showOverView = props.showOverView,
    showOverView = _props$showOverView === void 0 ? false : _props$showOverView,
    _props$showGeoLocatio = props.showGeoLocation,
    showGeoLocation =
      _props$showGeoLocatio === void 0 ? false : _props$showGeoLocatio,
    _props$toolBarPositio = props.toolBarPosition,
    toolBarPosition =
      _props$toolBarPositio === void 0
        ? {
            top: '110px',
            right: '40px',
          }
        : _props$toolBarPositio,
    _props$controlPositio = props.controlPosition,
    controlPosition =
      _props$controlPositio === void 0
        ? {
            top: '10px',
            right: '10px',
          }
        : _props$controlPositio,
    _props$showMapType = props.showMapType,
    showMapType = _props$showMapType === void 0 ? false : _props$showMapType,
    _props$showTraffic = props.showTraffic,
    showTraffic = _props$showTraffic === void 0 ? false : _props$showTraffic,
    _props$showRoad = props.showRoad,
    showRoad = _props$showRoad === void 0 ? false : _props$showRoad,
    _props$fixedPoint = props.fixedPoint,
    fixedPoint = _props$fixedPoint === void 0 ? false : _props$fixedPoint,
    _props$markers = props.markers,
    markers = _props$markers === void 0 ? [] : _props$markers,
    _props$rightPolyLineE = props.rightPolyLineEditor,
    rightPolyLineEditor =
      _props$rightPolyLineE === void 0 ? false : _props$rightPolyLineE,
    _props$rightFixedPoin = props.rightFixedPoint,
    rightFixedPoint =
      _props$rightFixedPoin === void 0 ? false : _props$rightFixedPoin,
    _props$rightMeasure = props.rightMeasure,
    rightMeasure = _props$rightMeasure === void 0 ? false : _props$rightMeasure,
    _props$rightPolyGon = props.rightPolyGon,
    rightPolyGon = _props$rightPolyGon === void 0 ? false : _props$rightPolyGon,
    onComplete = props.onComplete,
    onClick = props.onClick,
    onDblClick = props.onDblClick,
    onMouseMove = props.onMouseMove,
    onMoveStart = props.onMoveStart,
    onMapMove = props.onMapMove,
    onMoveEnd = props.onMoveEnd,
    onZoomStart = props.onZoomStart,
    onZoomChange = props.onZoomChange,
    onZoomEnd = props.onZoomEnd,
    onDragStart = props.onDragStart,
    onDragging = props.onDragging,
    onDragEnd = props.onDragEnd,
    onMouseOver = props.onMouseOver,
    onMouseOut = props.onMouseOut,
    onRightClick = props.onRightClick;
  var amap = null;
  var infoWindow = null;
  var mapRef = useRef();
  var _useState = useState(generateRandom()),
    _useState2 = _slicedToArray(_useState, 2),
    onlyId = _useState2[0],
    setOnlyId = _useState2[1];
  var _useState3 = useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    mapLoad = _useState4[0],
    setMapLoad = _useState4[1];
  useEffect(function () {
    // 初始化能力
    init();
    return function () {
      var _amap;
      (_amap = amap) === null || _amap === void 0 ? void 0 : _amap.destroy();
    };
  }, []);
  useImperativeHandle(ref, function () {
    return {
      addMarker: addMarker,
    };
  });
  var init = function init() {
    AMapLoader.load({
      key: 'aaa825dbbdba9e52064a253bbeda2854',
      version: '2.0',
      plugins: [
        'AMap.PlaceSearch',
        'AMap.InfoWindow',
        'AMap.Scale',
        'AMap.ToolBar',
        'AMap.ControlBar',
        'AMap.HawkEye',
        'AMap.MapType',
        'AMap.TileLayer',
        'AMap.Marker',
        'AMap.Pixel',
        'AMap.Polygon',
        'AMap.PolygonEditor',
        'AMap.PolyEditor',
        'AMap.Polyline',
        'AMap.PolylineEditor',
        'AMap.MouseTool',
        'AMap.ContextMenu',
        'AMap.Text',
        'AMap.Geolocation',
      ],
    })
      .then(function (AMap) {
        amap = new AMap.Map('container_'.concat(onlyId), {
          //设置地图容器id
          viewMode: '3D',
          //是否为3D地图模式
          zoom: 16.8,
          //初始化地图级别
          doubleClickZoom: false,
          //阻止双击放大
          center: center || [116.397428, 39.90923], //初始化地图中心点位置
        });

        if (showScaleControl) {
          var scale = new AMap.Scale();
          amap.addControl(scale);
        }
        if (showToolBar) {
          var toolBar = new AMap.ToolBar({
            position: toolBarPosition,
          });
          amap.addControl(toolBar);
        }
        if (showControlBar) {
          var controlBar = new AMap.ControlBar({
            position: controlPosition,
          });
          amap.addControl(controlBar);
        }
        if (showOverView) {
          var overView = new AMap.HawkEye({
            opened: false,
          });
          amap.addControl(overView);
        }
        if (showGeoLocation) {
          var geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,
            //是否使用高精度定位，默认:true
            timeout: 60000,
            //超过10秒后停止定位，默认：无穷大
            maximumAge: 0,
            //定位结果缓存0毫秒，默认：0
            convert: true,
            //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
            showButton: true,
            //显示定位按钮，默认：true
            buttonPosition: 'LB',
            //定位按钮停靠位置，默认：'LB'，左下角
            buttonOffset: new AMap.Pixel(10, 20),
            //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            showMarker: true,
            //定位成功后在定位到的位置显示点标记，默认：true
            showCircle: true,
            //定位成功后用圆圈表示定位精度范围，默认：true
            panToLocation: true,
            //定位成功后将定位到的位置作为地图中心点，默认：true
            zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          });

          amap.addControl(geolocation);
          geolocation.getCurrentPosition(function (status, result) {
            if (status === 'complete') {
            } else {
              console.log('定位失败', result);
            }
          });
        }
        if (showMapType) {
          amap.addControl(
            new AMap.MapType({
              showTraffic: showTraffic,
              showRoad: showRoad,
            }),
          );
        }
        markers &&
          markers.length &&
          markers.forEach(function (item, index) {
            var marker = new AMap.Marker({
              icon: item.icon,
              position: [item.position[0], item.position[1]],
              offset: new AMap.Pixel(-13, -30),
            });
            marker.on('click', function (e) {
              amap.remove(marker);
            });
            amap.add(marker);
          });
        if (fixedPoint) {
          amap.on('click', function (e) {
            var marker = new AMap.Marker({
              icon: '//vdata.amap.com/icons/b18/1/2.png',
              position: [e.lnglat.lng, e.lnglat.lat],
              offset: new AMap.Pixel(-13, -30),
            });
            marker.on('click', function (e) {
              amap.remove(marker);
            });
            amap.add(marker);
          });
        }
        if (
          rightPolyLineEditor ||
          rightMeasure ||
          rightFixedPoint ||
          rightPolyGon
        ) {
          MenuContextFn(amap, AMap, [
            rightPolyLineEditor ? 'rightPolyLineEditor' : '',
            rightMeasure ? 'rightMeasure' : '',
            rightFixedPoint ? 'rightFixedPoint' : '',
            rightPolyGon ? 'rightPolyGon' : '',
          ]);
        }
        onComplete &&
          amap.on('complete', function (e) {
            onComplete(e);
            setMapLoad(true);
          });
        onClick && amap.on('click', onClick);
        onDblClick && amap.on('dblclick', onDblClick);
        onMouseMove && amap.on('mousemove', onMouseMove);
        onMoveStart && amap.on('movestart', onMoveStart);
        onMapMove && amap.on('mapmove', onMapMove);
        onMoveEnd && amap.on('moveend', onMoveEnd);
        onZoomStart && amap.on('zoomstart', onZoomStart);
        onZoomChange && amap.on('zoomchange', onZoomChange);
        onZoomEnd && amap.on('zoomend', onZoomEnd);
        onDragStart && amap.on('dragstart', onDragStart);
        onDragging && amap.on('dragging', onDragging);
        onDragEnd && amap.on('dragend', onDragEnd);
        onMouseOver && amap.on('mouseover', onMouseOver);
        onMouseOut && amap.on('mouseout', onMouseOut);
        onRightClick && amap.on('rightclick', onRightClick);
        onClick &&
          openInfo &&
          amap.on('click', function (e) {
            infoWindow = new AMap.InfoWindow({
              content: openInfo.join('<br/>'),
            });
            infoWindow.open(amap, e.lnglat);
          });
      })
      .catch(function (e) {
        console.log(e);
      });
  };
  var addMarker = function addMarker() {};
  return /*#__PURE__*/ React.createElement(
    React.Fragment,
    null,
    mapLoad
      ? null
      : /*#__PURE__*/ React.createElement(
          'div',
          {
            className: 'map',
          },
          /*#__PURE__*/ React.createElement(Spin, null),
        ),
    /*#__PURE__*/ React.createElement('div', {
      ref: mapRef,
      id: 'container_'.concat(onlyId),
      className: 'map',
    }),
  );
});
export default AmapComp;
