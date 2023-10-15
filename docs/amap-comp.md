---
nav:
  title: 地图组件
  path: /amap
  order: 7
group:
  title: 地图组件
---

# 高德地图

## 基础 Map 组件(显示坐标弹窗信息)

```tsx
import React from 'react';
import { AmapComp } from 'c-react-components';

export default () => {
  let info = [];
  info.push(
    '<div><div><img style="float:left;" src=" https://webapi.amap.com/images/autonavi.png "/></div> ',
  );
  info.push('<div style="padding:0px 0px 0px 4px;"><b>高德软件</b>');
  info.push('电话 : 010-84107000   邮编 : 100102');
  info.push('地址 :北京市朝阳区望京阜荣街10号首开广场4层</div></div>');
  return (
    <div style={{ height: '500px' }}>
      <AmapComp
        onComplete={() => {
          // console.log('地图加载完成');
        }}
        onClick={(e) => {
          console.log('click', e);
        }}
        openInfo={info}
      />
    </div>
  );
};
```

## 比例尺、工具条、方向盘、鹰眼控件、定位

```tsx
import React from 'react';
import { AmapComp } from 'c-react-components';

export default () => {
  return (
    <div style={{ height: '500px' }}>
      <AmapComp
        onComplete={() => {
          // console.log('地图加载完成');
        }}
        onClick={(e) => {
          console.log('click', e);
        }}
        showScaleControl
        showToolBar
        showControlBar
        showOverView
        showGeoLocation
      />
    </div>
  );
};
```

## 图层切换

```tsx
import React from 'react';
import { AmapComp } from 'c-react-components';

export default () => {
  return (
    <div style={{ height: '500px' }}>
      <AmapComp
        onComplete={() => {
          // console.log('地图加载完成');
        }}
        onClick={(e) => {
          console.log('click', e);
        }}
        showToolBar
        showMapType
        showTraffic
        showRoad
      />
    </div>
  );
};
```

## 点标记

```tsx
import React, { useState, useEffect, useRef } from 'react';
import { AmapComp } from 'c-react-components';

export default () => {
  const [markers, setMarkers] = useState([
    {
      icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-1.png',
      position: [116.205467, 39.907761],
    },
    {
      icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-2.png',
      position: [116.368904, 39.913423],
    },
    {
      icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-3.png',
      position: [116.305467, 39.807761],
    },
  ]);
  const amapCompRef = useRef();
  return (
    <div style={{ height: '500px' }}>
      <AmapComp
        ref={amapCompRef}
        onComplete={() => {
          // console.log('地图加载完成');
        }}
        fixedPoint
        markers={markers}
      />
    </div>
  );
};
```

## 右键菜单（折线编辑器、多边形编辑器、生成标记点、测量间距）

编辑器使用：单击重启编辑态、双击关闭编辑态

```tsx
import React, { useState, useEffect, useRef } from 'react';
import { AmapComp } from 'c-react-components';

export default () => {
  const amapCompRef = useRef();
  return (
    <div style={{ height: '500px' }}>
      <AmapComp
        onComplete={() => {
          // console.log('地图加载完成');
        }}
        rightPolyLineEditor
        rightPolyGon
        rightFixedPoint
        rightMeasure
      />
    </div>
  );
};
```

图形编辑器使用：单击重启编辑态、双击关闭编辑态

<API src='src/c-react-components/amap-comp/index'>

## Position

| Name   | Description |
| ------ | ----------- |
| top    | 绝对位置上  |
| right  | 绝对位置右  |
| bottom | 绝对位置下  |
| left   | 绝对位置左  |

## Event

| Name         | Description                                                                                  |
| ------------ | -------------------------------------------------------------------------------------------- |
| onComplete   | 地图资源加载完成后触发事件                                                                   |
| onMouseMove  | 鼠标在地图上移动时触发                                                                       |
| onZoomChange | 地图缩放级别更改后触发                                                                       |
| onMapMove    | 地图平移时触发事件                                                                           |
| onZoomStart  | 缩放开始时触发                                                                               |
| onMouseOver  | 鼠标移入地图容器内时触发                                                                     |
| onMouseOut   | 鼠标移出地图容器时触发                                                                       |
| onDblClick   | 鼠标左键双击事件                                                                             |
| onClick      | 鼠标左键单击事件                                                                             |
| onZoomEnd    | 缩放结束时触发                                                                               |
| onMoveEnd    | 地图移动结束后触发，包括平移，以及中心点变化的缩放。如地图有拖拽缓动效果，则在缓动结束后触发 |
| onMoveStart  | 地图平移开始时触发                                                                           |
| onDragStart  | 开始拖拽地图时触发                                                                           |
| onDragging   | 拖拽地图过程中触发                                                                           |
| onDragEnd    | 停止拖拽地图时触发。如地图有拖拽缓动效果，则在拽停止，缓动开始前触发                         |

|onRightClick|鼠标右键单击事件|
