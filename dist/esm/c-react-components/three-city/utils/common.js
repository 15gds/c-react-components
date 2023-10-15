import * as THREE from 'three';

// 创建圆形文字
export var makeCycleTextSprite = function makeCycleTextSprite(text) {
  var color =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'black';
  var borderColor =
    arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'white';
  var textColor =
    arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'white';
  var W =
    arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 100;
  var H =
    arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 100;
  var borderWidth =
    arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 6;
  var canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  var ctx = canvas.getContext('2d');
  ctx.beginPath();
  ctx.arc(
    (W + borderWidth) / 2,
    (H + borderWidth) / 2,
    40,
    0,
    Math.PI * 2,
    true,
  );
  ctx.closePath();
  // 填充背景颜色
  ctx.fillStyle = color;
  ctx.fill();
  // 填充边框颜色
  ctx.lineWidth = borderWidth;
  ctx.lineCap = 'round';
  ctx.strokeStyle = borderColor;
  ctx.stroke();
  // 填充文字颜色
  ctx.font = '64px Arial';
  ctx.fillStyle = textColor;
  ctx.textAlign = 'center';
  var metrics = ctx.measureText(text);
  ctx.fillText(
    text,
    (W + borderWidth) / 2,
    (H + borderWidth * 2) / 2 +
      metrics.fontBoundingBoxDescent +
      metrics.actualBoundingBoxDescent * 4,
  );
  var texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;
  var spriteMaterial = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    opacity: 0.8,
  });
  var sprite = new THREE.Sprite(spriteMaterial);
  return sprite;
};
