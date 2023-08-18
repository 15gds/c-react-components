import React, { useRef, useEffect, useCallback } from 'react';
import { ChartsCompProps } from './types';
import * as echarts from 'echarts';

let myChart: any = null;

const ChartsComp: React.FC<ChartsCompProps> = (props) => {
  const { style, option } = props;
  const chartRef = useRef(null);

  const renderChart = useCallback(() => {
    myChart = echarts.init(
      chartRef.current as unknown as HTMLDivElement,
      undefined,
    );
    myChart.setOption({
      grid: {
        left: '6%',
        right: 40,
        bottom: 30,
        top: 30,
      },
      ...option,
      tooltip: {
        textStyle: {
          fontSize: 16,
        },
        ...(option?.tooltip || {}),
      },
      legend: {
        textStyle: {
          color: '#000',
          fontSize: 16,
        },
        ...(option?.legend || {}),
      },
      xAxis: {
        axisLine: { show: true },
        axisLabel: {
          color: '#000',
          fontWeight: 400,
          fontSize: 16,
        },
        ...(option?.xAxis || {}),
      },
      yAxis: {
        splitLine: { show: false },
        axisLine: { show: true },
        axisLabel: {
          color: '#000',
          fontWeight: 400,
          fontSize: 16,
        },
        ...(option?.yAxis || {}),
      },
    });
  }, [option]);

  useEffect(() => {
    renderChart();
  }, [renderChart]);

  useEffect(() => {
    return () => {
      myChart && myChart.dispose();
    };
  }, []);

  return (
    <>
      <div style={{ ...style }} ref={chartRef} />
    </>
  );
};

export default ChartsComp;
