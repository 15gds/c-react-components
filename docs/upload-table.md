---
nav:
  title: 文件上传组件
  path: /upload
  order: 5
group:
  title: 上传组件
---

# 文件上传

```tsx
import React from 'react';
import { UploadTable } from 'c-react-components';

export default () => {
  const tableList = [
    {
      _id: '453',
      fileName: '一人之下·1',
      fileType: 'image/png',
      fileSize: '2097152',
      uploadStatus: '50',
      fileURL:
        'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg',
    },
    {
      _id: '454',
      fileName: '一人之下·2',
      fileType: 'image/png',
      fileSize: '2097152',
      uploadStatus: true,
      fileURL:
        'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg',
    },
    {
      _id: '455',
      fileName: '一人之下·3',
      fileType: 'image/png',
      fileSize: '2097152',
      uploadStatus: false,
      fileURL:
        'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg',
    },
  ];

  return (
    <>
      <UploadTable tableList={tableList} />
    </>
  );
};
```

基于 AntDesign4.x 库 Upload 组件进行二次封装，可实现多文件\文件夹上传并可监控上传进度，可通过点击文件名对文件进行下载，该组件暂不支持对大文件分片上传以及断点续传功能，可通过配置或者后端实现上传数量控制（建议通过计算全部文件大小进行控制），属性配置请参考https://4x.ant.design/components/upload-cn/#API

<API src='src/c-react-components/upload-table/index'>
