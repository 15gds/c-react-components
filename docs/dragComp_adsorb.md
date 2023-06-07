---
nav:
  title: 拖拽组件
  path: /drag
group:
  title: 拖拽组件
  order: 4
---

# adsorb 吸附效果、guides 辅助线

```tsx
import React from 'react';
import { DragResizeBox } from 'fast-echarts-drag-resizable-react';

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