function _extends() {
  _extends = Object.assign
    ? Object.assign.bind()
    : function (target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
  return _extends.apply(this, arguments);
}
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
function _toConsumableArray(arr) {
  return (
    _arrayWithoutHoles(arr) ||
    _iterableToArray(arr) ||
    _unsupportedIterableToArray(arr) ||
    _nonIterableSpread()
  );
}
function _nonIterableSpread() {
  throw new TypeError(
    'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
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
function _iterableToArray(iter) {
  if (
    (typeof Symbol !== 'undefined' && iter[Symbol.iterator] != null) ||
    iter['@@iterator'] != null
  )
    return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
import React, { useState, useEffect } from 'react';
import styles from './index.less';
import { Button, Progress, Table, Tag, Upload, message } from 'antd';
import { CheckCircleOutlined, SyncOutlined } from '@ant-design/icons';
var Dragger = Upload.Dragger;
var UploadTable = function UploadTable(props) {
  var _props$tableList = props.tableList,
    tableList = _props$tableList === void 0 ? [] : _props$tableList,
    _props$columns = props.columns,
    columns =
      _props$columns === void 0
        ? [
            {
              title: '文件名',
              dataIndex: 'fileName',
              render: function render(text, record, index) {
                return /*#__PURE__*/ React.createElement(
                  'a',
                  {
                    href: record.fileURL + '?fileId='.concat(record._id),
                    target: 'downloadFile',
                    download: true,
                  },
                  text,
                );
              },
            },
            {
              title: '类型',
              dataIndex: 'fileType',
            },
            {
              title: '大小',
              dataIndex: 'fileSize',
              render: function render(text) {
                return (Number(text) / 1024 / 1024).toFixed(2) + 'M';
              },
            },
            {
              title: '状态',
              dataIndex: 'uploadStatus',
              render: function render(text, record) {
                return typeof text !== 'boolean'
                  ? /*#__PURE__*/ React.createElement(
                      'div',
                      null,
                      /*#__PURE__*/ React.createElement(Progress, {
                        percent: Number(text),
                        format: function format(percent) {
                          return percent
                            ? percent + '%'
                            : /*#__PURE__*/ React.createElement(SyncOutlined, {
                                spin: true,
                              });
                        },
                      }),
                    )
                  : /*#__PURE__*/ React.createElement(
                      Tag,
                      {
                        color: text ? 'success' : 'error',
                      },
                      text ? '已上传' : '上传失败',
                    );
              },
            },
            {
              title: '操作',
              key: 'action',
              render: function render(text, record, index) {
                return /*#__PURE__*/ React.createElement(
                  React.Fragment,
                  null,
                  /*#__PURE__*/ React.createElement(
                    Button,
                    {
                      type: 'link',
                      onClick: function onClick() {
                        if (record._id) {
                          // dispatch({
                          //   type: 'upload/delete',
                          //   payload: [record._id],
                          //   callback: (res) => {
                          //     if (res.code === 200) {
                          //       refreshFetching();
                          //     }
                          //   },
                          // });
                          var tempTableList = JSON.parse(
                            JSON.stringify(testTableList),
                          );
                          tempTableList.splice(index, 1);
                          setTestTableList(tempTableList);
                        } else {
                          if (record.xhr) {
                            record.xhr.abort();
                          }
                          // } else {
                          var _tempTableList = JSON.parse(
                            JSON.stringify(tableList),
                          );
                          _tempTableList.splice(index, 1);
                          // dispatch({
                          //   type: 'upload/saveData',
                          //   payload: {
                          //     tableList: [...tempTableList],
                          //   },
                          // });
                          // }
                        }
                      },
                    },
                    record.xhr ? '取消上传' : '删除',
                  ),
                );
              },
            },
          ]
        : _props$columns,
    _props$selectFile = props.selectFile,
    selectFile =
      _props$selectFile === void 0
        ? {
            name: 'file',
            multiple: true,
            showUploadList: false,
            beforeUpload: function beforeUpload(file, fileList) {
              var isLtM = file.size / 1024 / 1024 < 300;
              if (!isLtM) {
                message.error('上传文件超出300M');
              } else {
                setTestTableList(function (prev) {
                  prev.push({
                    _id: Number(prev[prev.length - 1]._id) + 1,
                    fileName: file.name,
                    fileType: file.type,
                    fileSize: file.size,
                    uploadStatus: 0,
                    fileURL:
                      'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg',
                  });
                  return prev;
                });
              }
            },
            onChange: function onChange(_ref) {
              var file = _ref.file,
                fileList = _ref.fileList;
              var status = file.status;
              if (status === 'done') {
                Promise.all(
                  // uploadMethod(item.originFileObj as RcFile)
                  fileList.map(function (item) {
                    return new Promise(function (resolve, reject) {
                      resolve('操作了');
                    });
                  }),
                ).then(function (data) {
                  var tempData = data.filter(function (item) {
                    return item !== 'other uploading or uploaded';
                  });
                  setUploadList(
                    [].concat(
                      _toConsumableArray(uploadList),
                      _toConsumableArray(tempData),
                    ),
                  );
                });
              } else if (status === 'error') {
                if (tableList && tableList.length) {
                  tableList[tableList.length - 1].uploadStatus = false;
                }
                message.error(
                  ''.concat(
                    fileList.map(function (item, index) {
                      return (
                        item.name + (index !== fileList.length - 1 ? '、' : '')
                      );
                    }),
                    '\u4E0A\u4F20\u5931\u8D25',
                  ),
                );
              }
            },
          }
        : _props$selectFile;
  var _useState = useState(tableList),
    _useState2 = _slicedToArray(_useState, 2),
    testTableList = _useState2[0],
    setTestTableList = _useState2[1];
  var _useState3 = useState([]),
    _useState4 = _slicedToArray(_useState3, 2),
    uploadList = _useState4[0],
    setUploadList = _useState4[1];
  useEffect(
    function () {
      if (
        uploadList &&
        uploadList.length === tableList.length
        // &&
        // uploadList.every((item) => item.code === 200)
      ) {
        // refreshFetching();--刷新页面
      }
    },
    [uploadList],
  );

  // const uploadMethod = (file: RcFile) => {
  //   return new Promise(async (resolve, reject) => {
  //     if (!file) {
  //       return;
  //     }

  //     const formData = new FormData();
  //     const findIndex = tableList.findIndex(
  //       (item: any) => item.uid === file.uid && item.uploadStatus === 0,
  //     );
  //     if (findIndex > -1) {
  //       formData.append('file', file);
  //       const res = await xhrRequest({
  //         method: 'POST',
  //         url: '/api/upload',
  //         onUploadProgress: ({ loaded, total, xhr }) => {
  //           const data = {
  //             ...tableList[findIndex],
  //             file: file,
  //             uploadStatus: Math.round((loaded * 100) / total),
  //             xhr: xhr,
  //           };

  //           dispatch({
  //             type: 'upload/tableUploadProcess',
  //             payload: {
  //               index: findIndex,
  //               data,
  //               // uploadStatus: Math.round((loaded * 100) / total),
  //             },
  //           });
  //         },
  //         data: formData,
  //       });
  //       console.log(res);
  //       if (res) resolve(res);
  //       // }
  //     } else {
  //       resolve('other uploading or uploaded');
  //     }
  //   });
  // };

  return /*#__PURE__*/ React.createElement(
    'div',
    {
      className: styles.uploadFilesTable,
    },
    /*#__PURE__*/ React.createElement(
      Dragger,
      _extends({}, selectFile, {
        directory: true,
      }),
      /*#__PURE__*/ React.createElement(
        'p',
        {
          className: 'ant-upload-text',
        },
        '\u5C06\u76EE\u5F55\u6216\u591A\u4E2A\u6587\u4EF6\u62D6\u62FD\u5230\u6B64\u8FDB\u884C\u626B\u63CF',
      ),
      /*#__PURE__*/ React.createElement(
        'p',
        {
          className: 'ant-upload-text',
        },
        '\u652F\u6301\u6587\u4EF6\u7C7B\u578B\uFF1A\u6587\u4EF6\u3001\u56FE\u7247\u3001\u89C6\u9891',
      ),
      /*#__PURE__*/ React.createElement(
        'p',
        {
          className: 'ant-upload-hint',
        },
        '\u6BCF\u4E2A\u6587\u4EF6\u8FD0\u884C\u7684\u6700\u5927\u5C3A\u5BF8\uFF1A300M',
      ),
    ),
    /*#__PURE__*/ React.createElement(
      'div',
      {
        className: 'blockSpacing',
        style: {
          display: 'flex',
        },
      },
      /*#__PURE__*/ React.createElement(
        Upload,
        selectFile,
        /*#__PURE__*/ React.createElement(
          Button,
          {
            type: 'primary',
          },
          '\u9009\u62E9\u6587\u4EF6',
        ),
      ),
      /*#__PURE__*/ React.createElement(
        Upload,
        _extends({}, selectFile, {
          directory: true,
        }),
        /*#__PURE__*/ React.createElement(
          Button,
          {
            type: 'primary',
            style: {
              marginLeft: '10px',
            },
          },
          '\u9009\u62E9\u6587\u4EF6\u5939',
        ),
      ),
    ),
    /*#__PURE__*/ React.createElement(
      'div',
      {
        className: 'blockSpacing',
      },
      /*#__PURE__*/ React.createElement(Table, {
        rowKey: function rowKey(record) {
          var index =
            arguments.length > 1 && arguments[1] !== undefined
              ? arguments[1]
              : 0;
          return index + '_' + record.fileName;
        },
        columns: columns,
        dataSource: _toConsumableArray(testTableList),
      }),
    ),
    /*#__PURE__*/ React.createElement(
      'div',
      {
        className: 'blockSpacing',
      },
      /*#__PURE__*/ React.createElement(
        Tag,
        null,
        '\u6587\u4EF6\u6570\u91CF\uFF1A',
        testTableList && testTableList.length ? testTableList.length : 0,
      ),
      /*#__PURE__*/ React.createElement(
        Tag,
        {
          icon: /*#__PURE__*/ React.createElement(CheckCircleOutlined, null),
          color: 'success',
        },
        '\u6210\u529F\u4E0A\u4F20\uFF1A',
        testTableList && testTableList.length
          ? testTableList.filter(function (item) {
              return item.uploadStatus === true;
            }).length
          : 0,
      ),
    ),
  );
};
export default UploadTable;
