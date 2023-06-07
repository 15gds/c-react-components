---
nav:
  title: 图表组件
  path: /charts
group:
  title: 图表组件
  order: 1
---

# 图表组件 基本使用

```tsx
import React from 'react';
import { ChartsComp } from 'fast-echarts-drag-resizable-react';
import * as echarts from 'echarts';
let base = +new Date(2016, 9, 3);
let oneDay = 24 * 3600 * 1000;
let valueBase = Math.random() * 300;
let valueBase2 = Math.random() * 50;
let data = [];
let data2 = [];
for (var i = 1; i < 10; i++) {
  var now = new Date((base += oneDay));
  var dayStr = [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('-');
  valueBase = Math.round((Math.random() - 0.5) * 20 + valueBase);
  valueBase <= 0 && (valueBase = Math.random() * 300);
  data.push([dayStr, valueBase]);
  valueBase2 = Math.round((Math.random() - 0.5) * 20 + valueBase2);
  valueBase2 <= 0 && (valueBase2 = Math.random() * 50);
  data2.push([dayStr, valueBase2]);
}

let option = {
  title: {
    left: 'center',
    text: 'Tootip and dataZoom on Mobile Device'
  },
  legend: {
    top: 'bottom',
    data: ['Intention']
  },
  tooltip: {
    triggerOn: 'none',
    position: function (pt) {
      return [pt[0], 130];
    }
  },
  toolbox: {
    left: 'center',
    itemSize: 25,
    top: 55,
    feature: {
      dataZoom: {
        yAxisIndex: 'none'
      },
      restore: {}
    }
  },
  xAxis: {
    type: 'time',
    axisPointer: {
      value: '2016-10-7',
      snap: true,
      lineStyle: {
        color: '#7581BD',
        width: 2
      },
      label: {
        show: true,
        formatter: function (params) {
          return echarts.format.formatTime('yyyy-MM-dd', params.value);
        },
        backgroundColor: '#7581BD'
      },
      handle: {
        show: true,
        color: '#7581BD'
      }
    },
    splitLine: {
      show: false
    }
  },
  yAxis: {
    type: 'value',
    axisTick: {
      inside: true
    },
    splitLine: {
      show: false
    },
    axisLabel: {
      inside: true,
      formatter: '{value}\n'
    },
    z: 10
  },
  grid: {
    top: 110,
    left: 15,
    right: 15,
    height: 160
  },
  dataZoom: [
    {
      type: 'inside',
      throttle: 50
    }
  ],
  series: [
    {
      name: 'Fake Data',
      type: 'line',
      smooth: true,
      symbol: 'circle',
      symbolSize: 5,
      sampling: 'average',
      itemStyle: {
        color: '#0770FF'
      },
      stack: 'a',
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgba(58,77,233,0.8)'
          },
          {
            offset: 1,
            color: 'rgba(58,77,233,0.3)'
          }
        ])
      },
      data: data
    },
    {
      name: 'Fake Data',
      type: 'line',
      smooth: true,
      stack: 'a',
      symbol: 'circle',
      symbolSize: 5,
      sampling: 'average',
      itemStyle: {
        color: '#F2597F'
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgba(213,72,120,0.8)'
          },
          {
            offset: 1,
            color: 'rgba(213,72,120,0.3)'
          }
        ])
      },
      data: data2
    }
  ]
};

export default () => {
  return (
    <div style={{ height: '300px', maxWidth: '300px' }}>
            <ChartsComp style={{ width: '800px', height: '330px' }} option={option}/>
    </div>
  );
};
```

```tsx
import React from 'react';
import { ChartsComp } from 'fast-echarts-drag-resizable-react';

let option =  {
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['40%', '70%'],
      center: ['50%', '70%'],
      // adjust the start angle
      startAngle: 180,
      label: {
        show: true,
        formatter(param) {
          // correct the percentage
          return param.name + ' (' + param.percent * 2 + '%)';
        }
      },
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' },
        {
          // make an record to fill the bottom 50%
          value: 1048 + 735 + 580 + 484 + 300,
          itemStyle: {
            // stop the chart from rendering this piece
            color: 'none',
            decal: {
              symbol: 'none'
            }
          },
          label: {
            show: false
          }
        }
      ]
    }
  ],
  xAxis:{
    show:false
  },
  yAxis:{
    show:false
  }
}
export default () => {
  return (
    <div style={{ height: '300px', maxWidth: '300px' }}>
            <ChartsComp style={{ width: '800px', height: '330px' }} option={option}/>
    </div>
  );
};
```

基于ECharts库进行复用封装，减少引入冗余代码，属性配置请参考https://echarts.apache.org/zh/index.html