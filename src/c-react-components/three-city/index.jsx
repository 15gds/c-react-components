import React, { useEffect, useState } from 'react';
import * as THREE from 'three';
import {
  CSS2DRenderer,
  CSS2DObject,
} from 'three/examples/jsm/renderers/CSS2DRenderer';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
// 轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
import { Water } from 'three/examples/jsm/objects/Water';
import { Sky } from 'three/examples/jsm/objects/Sky';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
import Animations from './utils/animations';
import { makeCycleTextSprite } from './utils/common';
import './index.less';

import waterLoader from '../../static/waternormals.jpg';
import cityModel from '../../static/models/city.fbx';

var container;
var controls;
var stats;
var camera;
var scene;
var renderer;
var labelRenderer;
var light;
var cityMeshes = [];
var interactableMeshes = [];

var mouse = new THREE.Vector2();
var raycaster = new THREE.Raycaster();

var sceneWidth = 910;
var sceneHeight = 520;

var water;
var sky;
const ThreeCity = (props) => {
  let {
    billboardLabel = null,
    city = null,
    cityGroup = new THREE.Group(),
    interactablePoints = [
      { key: '1', value: '大楼', location: { x: -2, y: 5, z: 0 } },
    ],
  } = props;

  useEffect(() => {
    initThree();

    return () => {
      renderer.forceContextLoss();
      renderer.dispose();
      scene.clear();
    };
  }, []);

  const [loadingProcess, setLoadingProcess] = useState(0);

  const initThree = () => {
    init();
    animate();
  };

  const init = () => {
    // 创建GL实例，开启抗锯齿
    renderer = new THREE.WebGLRenderer({ antialias: true });
    // 设置渲染器像素比
    renderer.setPixelRatio(sceneWidth / sceneHeight);
    renderer.setSize(sceneWidth, sceneHeight);
    //使用阴影贴图
    renderer.shadowMap.enabled = true;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;

    container = document.getElementById('container');
    container.appendChild(renderer.domElement);

    //添加2d渲染层
    labelRenderer = new CSS2DRenderer();
    labelRenderer.setSize(sceneWidth, sceneHeight);
    labelRenderer.domElement.style.position = 'absolute';
    labelRenderer.domElement.style.top = '0';
    labelRenderer.domElement.style.pointerEvents = 'none';
    document.body.appendChild(labelRenderer.domElement);

    // 场景
    scene = new THREE.Scene();
    // 透视相机
    camera = new THREE.PerspectiveCamera(
      60,
      sceneWidth / sceneHeight,
      0.1,
      1000,
    );
    camera.position.set(120, 100, 100);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    const waterGeometry = new THREE.PlaneGeometry(10000, 10000);

    water = new Water(waterGeometry, {
      textureWidth: 512,
      textureHeight: 512,
      waterNormals: new THREE.TextureLoader().load(
        waterLoader,
        function (texture) {
          texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        },
      ),
      sunDirection: new THREE.Vector3(),
      sunColor: 0xffffff,
      waterColor: 0x001e0f,
      distortionScale: 3.7,
      fog: scene.fog !== undefined,
    });

    water.rotation.x = -Math.PI / 2;

    scene.add(water);

    sky = new Sky();
    sky.scale.setScalar(10000);
    scene.add(sky);

    const skyUniforms = sky.material.uniforms;

    skyUniforms['turbidity'].value = 10;
    skyUniforms['rayleigh'].value = 2;
    skyUniforms['mieCoefficient'].value = 0.005;
    skyUniforms['mieDirectionalG'].value = 0.8;

    const parameters = {
      elevation: 5,
      azimuth: 180,
    };

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const sun = new THREE.Vector3();
    let renderTarget;
    function updateSun() {
      const phi = THREE.MathUtils.degToRad(90 - parameters.elevation);
      const theta = THREE.MathUtils.degToRad(parameters.azimuth);

      sun.setFromSphericalCoords(1, phi, theta);

      sky.material.uniforms['sunPosition'].value.copy(sun);
      water.material.uniforms['sunDirection'].value.copy(sun).normalize();

      if (renderTarget !== undefined) renderTarget.dispose();

      renderTarget = pmremGenerator.fromScene(sky);

      scene.environment = renderTarget.texture;
    }

    updateSun();

    const cubeGeometry = new THREE.BoxGeometry(0.001, 0.001, 0.001);
    const cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

    // 平行光
    light = new THREE.DirectionalLight(0xb5b1c1, 1);
    //光照强度
    light.intensity = 1;
    light.position.set(20, 20, 5);
    //跟随光线动态阴影
    light.castShadow = true;
    light.target = cube;
    //增加内部阴影数
    light.shadow.mapSize.width = 512 * 12;
    light.shadow.mapSize.height = 512 * 12;
    light.shadow.camera.top = 130;
    light.shadow.camera.bottom = -80;
    light.shadow.camera.left = -70;
    light.shadow.camera.right = 80;
    scene.add(light);

    // 环境光
    var ambientLight = new THREE.AmbientLight(0x605a64);
    scene.add(ambientLight);

    // 网格
    var grid = new THREE.GridHelper(50, 100, 0x000000, 0x000000);
    grid.position.set(0, 0, 0);
    grid.material.opacity = 0;
    grid.material.transparent = true;
    scene.add(grid);

    // 加载模型
    var loader = new FBXLoader();
    loader.load(
      cityModel,
      (mesh) => {
        mesh.traverse(function (child) {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            cityMeshes.push(child);
            if (child.material.length > 1) {
              child.material.map((item) => {
                item.metalness = 0.5;
                item.specular = item.color;
                item.shininess = 50;
                if (/green|pink|cyan|black/i.test(item.name)) {
                  item.emissive = item.color;
                }
                if (item.name.includes('DarkGray')) {
                  item.metalness = 1;
                  item.fog = false;
                  item.emissive = new THREE.Color(0x000000);
                }
              });
            }
          }
        });
        mesh.rotation.y = Math.PI / 2;
        mesh.position.set(40, 0, -50);
        mesh.scale.set(1, 1, 1);
        city = mesh;
        cityGroup.add(mesh);
        // 添加交互点
        interactablePoints.map((item) => {
          let point = makeCycleTextSprite(item.key);
          point.name = item.value;
          point.scale.set(1, 1, 1);
          point.position.set(item.location.x, item.location.y, item.location.z);
          cityGroup.add(point);
          interactableMeshes.push(point);
        });
        scene.add(cityGroup);
      },
      (res) => {
        const resNum = Math.floor((res.loaded / res.total) * 100);
        if (Number.isFinite(resNum) ? resNum : res.total === 0) {
          Animations.animateCamera(
            camera,
            controls,
            { x: 15, y: 12, z: 25 },
            { x: 0, y: 0, z: 0 },
            3000,
            () => {},
          );
        }
        setLoadingProcess(Number.isFinite(resNum) ? resNum : 0);
      },
      (err) => {
        console.log(err);
      },
    );

    controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0, 0);
    //控制器阻尼
    controls.enableDamping = true;

    // GUI

    // const gui = new GUI();

    // const folderSky = gui.addFolder( 'Sky' );
    // folderSky.add( parameters, 'elevation', 0, 90, 0.1 ).onChange( updateSun );
    // folderSky.add( parameters, 'azimuth', - 180, 180, 0.1 ).onChange( updateSun );
    // folderSky.open();

    // const waterUniforms = water.material.uniforms;

    // const folderWater = gui.addFolder( 'Water' );
    // folderWater.add( waterUniforms.distortionScale, 'value', 0, 8, 0.1 ).name( 'distortionScale' );
    // folderWater.add( waterUniforms.size, 'value', 0.1, 10, 0.1 ).name( 'size' );
    // folderWater.open();

    window.addEventListener('resize', onWindowResize, false);

    stats = new Stats();
    document.documentElement.appendChild(stats.dom);

    renderer.domElement.style.touchAction = 'none';
    renderer.domElement.addEventListener('click', handleMouseClick, false);
    renderer.domElement.addEventListener(
      'pointermove',
      handleMouseEnter,
      false,
    );
  };

  const onWindowResize = () => {
    camera.aspect = sceneWidth / sceneHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(sceneWidth, sceneHeight);
    labelRenderer.setSize(sceneWidth, sceneHeight);
  };

  const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    labelRenderer.render(scene, camera);
    stats && stats.update();
    TWEEN && TWEEN.update();
    controls && controls.update();

    water.material.uniforms['time'].value += 1.0 / 60.0;
  };

  const handleMouseClick = (e) => {
    // 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1)
    mouse.x = (e.clientX / sceneWidth) * 2 - 1;
    mouse.y = -(e.clientY / sceneHeight) * 2 + 1;
    // 通过摄像机和鼠标位置更新射线
    raycaster.setFromCamera(mouse, camera);
    // 计算物体和射线的焦点
    const intersects = raycaster.intersectObjects(interactableMeshes);
    if (intersects.length > 0) {
      let mesh = intersects[0].object;
      Animations.animateCamera(
        camera,
        controls,
        { x: mesh.position.x, y: mesh.position.y + 4, z: mesh.position.z + 12 },
        { x: 0, y: 0, z: 0 },
        1200,
        () => {
          let billboardDiv = document.createElement('div');
          billboardDiv.className = 'billboard';
          billboardDiv.textContent = mesh.name;
          billboardDiv.style.marginTop = '1em';
          let tempBillboardLabel = new CSS2DObject(billboardDiv);
          tempBillboardLabel.position.set(0, 0, 0);
          billboardLabel = tempBillboardLabel;
          mesh.add(tempBillboardLabel);
        },
      );
    } else {
      interactableMeshes.map((item) => {
        item.remove(billboardLabel);
      });
    }
  };

  const handleMouseEnter = (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(interactableMeshes, true);
    if (intersects.length > 0) {
      let mesh = intersects[0].object;
      mesh.material.color = new THREE.Color(0x03c03c);
    } else {
      interactableMeshes.map((item) => {
        item.material.color = new THREE.Color(0xffffff);
      });
    }
  };

  return (
    <>
      <div id="container"></div>
    </>
  );
};

export default ThreeCity;
