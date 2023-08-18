---
nav:
  title: 拖拽组件
  path: /drag
  order: 2
group:
  title: 拖拽组件
---

# 拖拽缩放盒子

## base 拖拽缩放盒子基本使用

```tsx
import React, { useState } from 'react';
import { DragResizeBox } from 'c-react-components';

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

## adsorb 吸附效果、guides 辅助线

```tsx
import React from 'react';
import { DragResizeBox } from 'c-react-components';

export default () => {
  return (
    <div style={{ height: '300px', maxWidth: '700px' }}>
      <DragResizeBox
        rect={{ width: 100, height: 100 }}
        style={{ backgroundColor: 'rgb(243,235,235)' }}
      >
        <div>move me!</div>
      </DragResizeBox>
      <div style={{ height: 150 }}></div>
      <DragResizeBox
        rect={{ width: 150, height: 150 }}
        style={{ backgroundColor: 'rgb(243,235,235)' }}
      >
        <div>move me!</div>
      </DragResizeBox>
    </div>
  );
};
```

辅助线/吸附效果，请将 adsorb 设置为 false

## relative 相对定位

```tsx
import React, { useState } from 'react';
import { DragResizeBox } from 'c-react-components';

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
        limit={{ left: -1, top: -1, right: 300, bottom: 299 }}
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

<API src='src/c-react-components/drag-resize-box/index'>
