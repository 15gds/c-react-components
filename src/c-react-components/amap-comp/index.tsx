import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';
import AMapLoader from '@amap/amap-jsapi-loader';
import './index.less';
import { AmapCompProps } from './types';
import { Spin, Button } from 'antd';
import { MenuContextFn } from './utils/menuContext';

const generateRandom = () => {
  return Math.random().toString(16).slice(2);
};

const AmapComp: React.FC<AmapCompProps> = forwardRef((props, ref) => {
  const {
    center = [116.397428, 39.90923],
    openInfo,
    showScaleControl = false,
    showToolBar = false,
    showControlBar = false,
    showOverView = false,
    showGeoLocation = false,
    toolBarPosition = {
      top: '110px',
      right: '40px',
    },
    controlPosition = {
      top: '10px',
      right: '10px',
    },
    showMapType = false,
    showTraffic = false,
    showRoad = false,
    fixedPoint = false,
    markers = [],
    rightPolyLineEditor = false,
    rightFixedPoint = false,
    rightMeasure = false,
    rightPolyGon = false,

    onComplete,
    onClick,
    onDblClick,
    onMouseMove,
    onMoveStart,
    onMapMove,
    onMoveEnd,
    onZoomStart,
    onZoomChange,
    onZoomEnd,
    onDragStart,
    onDragging,
    onDragEnd,
    onMouseOver,
    onMouseOut,
    onRightClick,
  } = props;

  let amap = null;

  let infoWindow = null;

  const mapRef = useRef();

  const [onlyId, setOnlyId] = useState(generateRandom());
  const [mapLoad, setMapLoad] = useState(false);

  useEffect(() => {
    // 初始化能力
    init();

    return () => {
      amap?.destroy();
    };
  }, []);

  useImperativeHandle(ref, () => {
    return {
      addMarker,
    };
  });

  const init = () => {
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
      .then((AMap) => {
        amap = new AMap.Map(`container_${onlyId}`, {
          //设置地图容器id
          viewMode: '3D', //是否为3D地图模式
          zoom: 16.8, //初始化地图级别
          doubleClickZoom: false, //阻止双击放大
          center: center || [116.397428, 39.90923], //初始化地图中心点位置
        });

        if (showScaleControl) {
          let scale = new AMap.Scale();
          amap.addControl(scale);
        }

        if (showToolBar) {
          let toolBar = new AMap.ToolBar({
            position: toolBarPosition,
          });
          amap.addControl(toolBar);
        }
        if (showControlBar) {
          let controlBar = new AMap.ControlBar({
            position: controlPosition,
          });
          amap.addControl(controlBar);
        }
        if (showOverView) {
          let overView = new AMap.HawkEye({
            opened: false,
          });
          amap.addControl(overView);
        }

        if (showGeoLocation) {
          let geolocation = new AMap.Geolocation({
            enableHighAccuracy: true, //是否使用高精度定位，默认:true
            timeout: 60000, //超过10秒后停止定位，默认：无穷大
            maximumAge: 0, //定位结果缓存0毫秒，默认：0
            convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
            showButton: true, //显示定位按钮，默认：true
            buttonPosition: 'LB', //定位按钮停靠位置，默认：'LB'，左下角
            buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            showMarker: true, //定位成功后在定位到的位置显示点标记，默认：true
            showCircle: true, //定位成功后用圆圈表示定位精度范围，默认：true
            panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
            zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          });
          amap.addControl(geolocation);
          geolocation.getCurrentPosition((status, result) => {
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
            let marker = new AMap.Marker({
              icon: item.icon,
              position: [item.position[0], item.position[1]],
              offset: new AMap.Pixel(-13, -30),
            });
            marker.on('click', (e) => {
              amap.remove(marker);
            });
            amap.add(marker);
          });

        if (fixedPoint) {
          amap.on('click', (e) => {
            let marker = new AMap.Marker({
              icon: '//vdata.amap.com/icons/b18/1/2.png',
              position: [e.lnglat.lng, e.lnglat.lat],
              offset: new AMap.Pixel(-13, -30),
            });
            marker.on('click', (e) => {
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
          amap.on('complete', (e) => {
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
          amap.on('click', (e) => {
            infoWindow = new AMap.InfoWindow({
              content: openInfo.join('<br/>'),
            });

            infoWindow.open(amap, e.lnglat);
          });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const addMarker = () => {};

  return (
    <>
      {mapLoad ? null : (
        <div className="map">
          <Spin />
        </div>
      )}
      <div ref={mapRef} id={`container_${onlyId}`} className="map" />
    </>
  );
});

export default AmapComp;
