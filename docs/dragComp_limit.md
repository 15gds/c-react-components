---
nav:
  title: 拖拽组件
  path: /drag
group:
  title: 拖拽组件
  order: 3
---

# limit 控制界限

即使放大了也不会超出界限

Even if you zoom in, it doesn't go out of bounds

```tsx
import React, { useState } from 'react';
import { DragResizeBox } from 'fast-echarts-drag-resizable-react';

export default () => {
  return (
    <div
      style={{ height: '300px', maxWidth: '300px', border: '1px solid red' }}
    >
      <DragResizeBox
        rect={{ width: 100, height: 100, left: 450, top: 350 }}
        limit={{ left: 375, top: 312, right: 675, bottom: 613 }}
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

瞧，你已经让它出不了红色边框了，不过这还不够，也许你还需要在父组件上拿到最新的位置、大小信息，我们可以使用 onChange 获取。
