/// <reference types="react" />
export interface BaseChartsCompPropsProps {
    /**
     * @default --
     * @description 样式
     */
    style?: React.CSSProperties | undefined;
    /**
     * @description 配置项，请参考
     * @link https://echarts.apache.org/zh/option.html#title
     */
    option: {
        [propName: string]: any;
    };
}
export type ChartsCompProps = BaseChartsCompPropsProps;
