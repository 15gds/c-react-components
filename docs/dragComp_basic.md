---
nav:
  title: 拖拽组件
  path: /drag
group:
  title: 拖拽组件
  order: 5
---

# base 拖拽缩放盒子基本使用

```tsx
import React, { useState } from 'react';
import { DragResizeBox } from 'fast-echarts-drag-resizable-react';

export default () => {
  return (
    <div style={{ height: '300px', maxWidth: '300px' }}>
      <DragResizeBox style={{ backgroundColor: 'rgb(243,235,235)' }}>
        <div
          style={{
            padding: '10px',
            width: '100%',
          }}
        >
          move me!
        </div>
      </DragResizeBox>
    </div>
  );
};
```

使用非常简单，默认根据内容自动伸缩，你也可以指定 rect 属性控制大小和位置。
