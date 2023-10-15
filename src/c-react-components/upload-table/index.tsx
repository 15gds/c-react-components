import React, { FC, useState, useEffect } from 'react';
import styles from './index.less';
import { UploadTableProps } from './types';
import { Button, Progress, Table, Tag, Upload, message } from 'antd';
import { CheckCircleOutlined, SyncOutlined } from '@ant-design/icons';
const { Dragger } = Upload;
import type { RcFile } from 'antd/es/upload/interface';

interface Item {
  _id: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  uploadStatus: string | number | boolean;
  fileURL?: string | undefined;
  xhr?: any;
}

const UploadTable: FC<UploadTableProps> = (props) => {
  const {
    tableList = [],
    columns = [
      {
        title: '文件名',
        dataIndex: 'fileName',
        render: (text: any, record: Item, index: number) => {
          return (
            <a
              href={record.fileURL + `?fileId=${record._id}`}
              target="downloadFile"
              download
            >
              {text}
            </a>
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
        render: (text: any) => {
          return (Number(text) / 1024 / 1024).toFixed(2) + 'M';
        },
      },
      {
        title: '状态',
        dataIndex: 'uploadStatus',
        render: (text: any, record: Item) =>
          typeof text !== 'boolean' ? (
            <div>
              <Progress
                percent={Number(text)}
                format={(percent) =>
                  percent ? percent + '%' : <SyncOutlined spin />
                }
              />
            </div>
          ) : (
            <Tag color={text ? 'success' : 'error'}>
              {text ? '已上传' : '上传失败'}
            </Tag>
          ),
      },
      {
        title: '操作',
        key: 'action',
        render: (text: any, record: Item, index: number) => (
          <>
            <Button
              type="link"
              onClick={() => {
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
                  const tempTableList = JSON.parse(
                    JSON.stringify(testTableList),
                  );
                  tempTableList.splice(index, 1);
                  setTestTableList(tempTableList);
                } else {
                  if (record.xhr) {
                    record.xhr.abort();
                  }
                  // } else {
                  const tempTableList = JSON.parse(JSON.stringify(tableList));
                  tempTableList.splice(index, 1);
                  // dispatch({
                  //   type: 'upload/saveData',
                  //   payload: {
                  //     tableList: [...tempTableList],
                  //   },
                  // });
                  // }
                }
              }}
            >
              {record.xhr ? '取消上传' : '删除'}
            </Button>
            {/* <Button
            type="link"
            onClick={() => {
              uploadMethod(record.file);
            }}
          >
            {record.xhr && '重新上传'}
          </Button> */}
          </>
        ),
      },
    ],
    selectFile = {
      name: 'file',
      multiple: true,
      showUploadList: false,

      beforeUpload(file, fileList) {
        const isLtM = file.size / 1024 / 1024 < 300;
        if (!isLtM) {
          message.error('上传文件超出300M');
        } else {
          setTestTableList((prev) => {
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
      onChange: ({ file, fileList }) => {
        const { status } = file;
        if (status === 'done') {
          Promise.all(
            // uploadMethod(item.originFileObj as RcFile)
            fileList.map((item) => {
              return new Promise((resolve, reject) => {
                resolve('操作了');
              });
            }),
          ).then((data) => {
            let tempData = data.filter(
              (item) => item !== 'other uploading or uploaded',
            );
            setUploadList([...uploadList, ...tempData]);
          });
        } else if (status === 'error') {
          if (tableList && tableList.length) {
            tableList[tableList.length - 1].uploadStatus = false;
          }
          message.error(
            `${fileList.map(
              (item, index) =>
                item.name + (index !== fileList.length - 1 ? '、' : ''),
            )}上传失败`,
          );
        }
      },
    },
  } = props;

  const [testTableList, setTestTableList] = useState(tableList);
  const [uploadList, setUploadList] = useState<any>([]);

  useEffect(() => {
    if (
      uploadList &&
      uploadList.length === tableList.length
      // &&
      // uploadList.every((item) => item.code === 200)
    ) {
      // refreshFetching();--刷新页面
    }
  }, [uploadList]);

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

  return (
    <div className={styles.uploadFilesTable}>
      <Dragger {...selectFile} directory={true}>
        <p className="ant-upload-text">将目录或多个文件拖拽到此进行扫描</p>
        <p className="ant-upload-text">支持文件类型：文件、图片、视频</p>
        <p className="ant-upload-hint">每个文件运行的最大尺寸：300M</p>
      </Dragger>
      <div className="blockSpacing" style={{ display: 'flex' }}>
        <Upload {...selectFile}>
          <Button type="primary">选择文件</Button>
        </Upload>
        <Upload {...selectFile} directory={true}>
          <Button type="primary" style={{ marginLeft: '10px' }}>
            选择文件夹
          </Button>
        </Upload>
      </div>
      <div className="blockSpacing">
        <Table
          rowKey={(record, index = 0) => {
            return index + '_' + record.fileName;
          }}
          columns={columns}
          dataSource={[...testTableList]}
        />
      </div>
      <div className="blockSpacing">
        <Tag>
          文件数量：
          {testTableList && testTableList.length ? testTableList.length : 0}
        </Tag>
        <Tag icon={<CheckCircleOutlined />} color="success">
          成功上传：
          {testTableList && testTableList.length
            ? testTableList.filter((item: any) => item.uploadStatus === true)
                .length
            : 0}
        </Tag>
        {/* <Tag>总大小：</Tag> */}
      </div>
    </div>
  );
};

export default UploadTable;
