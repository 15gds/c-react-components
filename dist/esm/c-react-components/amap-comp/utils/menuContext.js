import '../index.less';
import TYPE from './const';
export var MenuContextFn = function MenuContextFn(map, AMap, type) {
  var menu = new ContextMenu(map, AMap);
  function ContextMenu(map, AMap) {
    var _this = this;
    var me = this;
    this.mouseTool = new AMap.MouseTool(map);
    this.contextMenuPositon = null;
    this.contextMenu = new AMap.ContextMenu();
    var polylineEditorObj = new AMap.PolylineEditor(map);
    var polyEditorObj = new AMap.PolygonEditor(map);
    if (type.indexOf(TYPE.RIGHT_POLY_LINE_EDITOR) > -1) {
      this.contextMenu.addItem('新建Polyline', function () {
        //右键菜单创建折线编辑器

        polylineEditorObj.on('add', function (data) {
          var polyline = data.target;
          polyline.on('dblclick', function () {
            polylineEditorObj.close();
          });
          polyline.on('click', function () {
            polylineEditorObj.setTarget(polyline);
            polylineEditorObj.open();
          });
        });
        polylineEditorObj.close();
        polylineEditorObj.open();
        _this.contextMenu.close();
      });
    }
    if (type.indexOf(TYPE.RIGHT_POLY_GON) > -1) {
      this.contextMenu.addItem('新建PolyGeo', function () {
        //右键菜单创建折线编辑器
        polyEditorObj.on('add', function (data) {
          var polygon = data.target;
          polygon.on('dblclick', function () {
            polyEditorObj.close();
          });
          polygon.on('click', function () {
            polyEditorObj.setTarget(polygon);
            polyEditorObj.open();
          });
        });
        polyEditorObj.close();
        polyEditorObj.setTarget();
        polyEditorObj.open();
        _this.contextMenu.close();
      });
    }
    if (type.indexOf(TYPE.RIGHT_MEASURE) > -1) {
      this.contextMenu.addItem('距离量测', function () {
        //右键菜单距离量测
        _this.mouseTool.rule();
        _this.contextMenu.close();
      });
    }
    if (type.indexOf(TYPE.RIGHT_FIXED_POINT) > -1) {
      this.contextMenu.addItem('标记点', function () {
        //右键菜单标记点
        _this.mouseTool.close();
        var marker = new AMap.Marker({
          map: map,
          position: _this.contextMenuPositon, //基点位置
        });

        marker.on('click', function (e) {
          map.remove(marker);
        });
        _this.contextMenu.close();
      });
    }
    map.on('rightclick', function (e) {
      me.contextMenu.open(map, e.lnglat);
      me.contextMenuPositon = e.lnglat; //右键菜单位置
    });
  }
};
