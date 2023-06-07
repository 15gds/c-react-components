import React from 'react';
import { render } from 'react-dom';
import { DragResizeBox } from 'fast-echarts-drag-resizable-react';

const App = () => (
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
render(<App />, document.getElementById('root'));
