---
nav:
  title: 拖拽组件
  path: /drag
group:
  title: 拖拽组件
  order: 4
---

# relative 相对定位

```tsx
import React, { useState } from 'react';
import { DragResizeBox } from 'fast-echarts-drag-resizable-react';

export default () => {
  const [rect, setRect] = useState({
    width: 100,
    height: 100,
    left: 0,
    top: 0,
  });
  return (
    <div
      style={{
        height: '300px',
        maxWidth: '300px',
        border: '1px solid red',
        position: 'relative',
      }}
    >
      <DragResizeBox
        rect={rect}
        relative
        onChange={(newRect) => setRect(newRect)}
        limit={{ left: 0, top: 0, right: 300, bottom: 300 }}
        style={{ backgroundColor: 'rgb(243,235,235)' }}
      >
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

默认相对于 document 移动，如果父容器设置了 position:relative 等定位，则需要将 relative 设置为 true。
此时请按照父盒子的宽高设置 limit。