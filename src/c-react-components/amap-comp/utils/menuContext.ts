import '../index.less';
import TYPE from './const';

export const MenuContextFn = (map, AMap, type) => {
  var menu = new ContextMenu(map, AMap);

  function ContextMenu(map, AMap) {
    var me = this;
    this.mouseTool = new AMap.MouseTool(map);
    this.contextMenuPositon = null;
    this.contextMenu = new AMap.ContextMenu();

    var polylineEditorObj = new AMap.PolylineEditor(map);

    var polyEditorObj = new AMap.PolygonEditor(map);

    if (type.indexOf(TYPE.RIGHT_POLY_LINE_EDITOR) > -1) {
      this.contextMenu.addItem('新建Polyline', () => {
        //右键菜单创建折线编辑器

        polylineEditorObj.on('add', (data) => {
          let polyline = data.target;
          polyline.on('dblclick', () => {
            polylineEditorObj.close();
          });
          polyline.on('click', () => {
            polylineEditorObj.setTarget(polyline);
            polylineEditorObj.open();
          });
        });

        polylineEditorObj.close();
        polylineEditorObj.open();

        this.contextMenu.close();
      });
    }
    if (type.indexOf(TYPE.RIGHT_POLY_GON) > -1) {
      this.contextMenu.addItem('新建PolyGeo', () => {
        //右键菜单创建折线编辑器
        polyEditorObj.on('add', (data) => {
          let polygon = data.target;
          polygon.on('dblclick', () => {
            polyEditorObj.close();
          });
          polygon.on('click', () => {
            polyEditorObj.setTarget(polygon);
            polyEditorObj.open();
          });
        });
        polyEditorObj.close();
        polyEditorObj.setTarget();
        polyEditorObj.open();

        this.contextMenu.close();
      });
    }
    if (type.indexOf(TYPE.RIGHT_MEASURE) > -1) {
      this.contextMenu.addItem('距离量测', () => {
        //右键菜单距离量测
        this.mouseTool.rule();
        this.contextMenu.close();
      });
    }
    if (type.indexOf(TYPE.RIGHT_FIXED_POINT) > -1) {
      this.contextMenu.addItem('标记点', () => {
        //右键菜单标记点
        this.mouseTool.close();
        let marker = new AMap.Marker({
          map: map,
          position: this.contextMenuPositon, //基点位置
        });
        marker.on('click', (e) => {
          map.remove(marker);
        });
        this.contextMenu.close();
      });
    }

    map.on('rightclick', function (e) {
      me.contextMenu.open(map, e.lnglat);
      me.contextMenuPositon = e.lnglat; //右键菜单位置
    });
  }
};
