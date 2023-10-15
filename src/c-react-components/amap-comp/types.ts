type position = {
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
};

interface BaseAmapCompProps {
  /**
   * @default [116.397428, 39.90923]
   * @description 定位点经纬度
   */
  center?: [number, number];
  /**
   * @description 打开信息窗显示内容
   */
  openInfo?: string[];
  /**
   * @default false
   * @description 是否开启比例尺
   */
  showScaleControl?: boolean;

  /**
   * @default false
   * @description 是否开启工具条
   */
  showToolBar?: boolean;

  /**
   * @default false
   * @description 是否开启方向盘
   */
  showControlBar?: boolean;

  /**
   * @default false
   * @description 是否开启鹰眼
   */
  showOverView?: boolean;
  /**
   * @default false
   * @description 是否开启定位
   */
  showGeoLocation?: boolean;

  /**
   * @default {top:'110px',right:'40px'}
   * @description 工具条位置
   */
  toolBarPosition?: position;

  /**
   * @default  {top:'10px',right:'10px'}
   * @description 方向盘位置
   */
  controlPosition?: position;

  /**
   * @default false
   * @desciption 开启图层切换
   */
  showMapType?: boolean;
  /**
   * @default false
   * @desciption 是否显示实时路况图层
   */
  showTraffic?: boolean;
  /**
   *  @default false
   * @desciption 是否显示路网
   */
  showRoad?: boolean;
  /**
   *  @default false
   * @desciption 是否开启标点
   */
  fixedPoint?: boolean;
  /**
   *  @default []
   * @desciption 点标记，详细参数请参考：https://developer.amap.com/api/javascript-api/reference/overlay#MarkerOptions
   */
  markers?: any[];

  /**
   *  @default false
   * @desciption 是否开启折线编辑器，鼠标右击显示操作
   */
  rightPolyLineEditor?: boolean;

  /**
   *  @default false
   * @desciption 是否开启多边形编辑器，鼠标右击显示操作
   */
  rightPolyGon?: boolean;
  /**
   *  @default false
   * @desciption 是否开启点标记，鼠标右击显示操作
   */
  rightFixedPoint?: boolean;
  /**
   *  @default false
   * @desciption 是否开启测量两点间距，鼠标右击显示操作
   */
  rightMeasure?: boolean;
  [propName: string]: any;
}

export type AmapCompProps = BaseAmapCompProps;
