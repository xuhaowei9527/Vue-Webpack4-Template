import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import DragControls from "drag-controls";
const Three = require("three");
const OrbitControls = require("three-orbitcontrols");
const Stats = require("stats.js");
export default class Three3D {
  constructor() {
    this.action = null;
    console.log(this.action); // 42
  }

  play() {
    this.action.paused = false;
    this.action.play();
  }

  pause() {
    this.action.paused = true;
  }

  init(url, isPlay) {
    const self = this;
    let renderer, camera, scene, stats, ambientLight, directionalLight, control;
    let middle;
    var raycaster = new Three.Raycaster();
    var mouse = new Three.Vector2();
    var clock = new Three.Clock();

    function onMouseMove(event) {
      // 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1)

      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }
    function renderRaycaster() {
      raycaster.setFromCamera(mouse, camera);

      // 计算物体和射线的焦点
      var intersects = raycaster.intersectObjects(scene.children);

      for (var i = 0; i < intersects.length; i++) {
        intersects[i].object.material.color.set(0xff0000);
      }
    }
    window.addEventListener("mousemove", onMouseMove, false);
    window.requestAnimationFrame(renderRaycaster);
    function initRender() {
      renderer = new Three.WebGLRenderer({ antialias: true });
      // 通过摄像机和鼠标位置更新射线

      renderer.render(scene, camera);
      renderer.setSize(1108, 600);
      // 告诉渲染器需要阴影效果
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = Three.PCFSoftShadowMap;
      return renderer.domElement;
    }
    function initCamera() {
      camera = new Three.PerspectiveCamera(45, 1108 / 600, 0.1, 20000);
      camera.position.set(100, 100, 100);
      camera.lookAt(new Three.Vector3(0, 0, 0));
    }
    function initScene() {
      scene = new Three.Scene();
    }
    function initLight() {
      ambientLight = new Three.AmbientLight("#000000");
      scene.add(ambientLight);
      directionalLight = new Three.DirectionalLight("#ffffff");
      directionalLight.position.set(200, 300, 100);
      directionalLight.shadow.camera.near = 1; // 产生阴影的最近距离
      directionalLight.shadow.camera.far = 400; // 产生阴影的最远距离
      directionalLight.shadow.camera.left = -50; // 产生阴影距离位置的最左边位置
      directionalLight.shadow.camera.right = 50; // 最右边
      directionalLight.shadow.camera.top = 50; // 最上边
      directionalLight.shadow.camera.bottom = -50; // 最下面
      // 这两个值决定生成阴影密度 默认512
      directionalLight.shadow.mapSize.height = 1024;
      directionalLight.shadow.mapSize.width = 1024;
      // 告诉平行光需要开启阴影投射
      directionalLight.castShadow = true;
      scene.add(directionalLight);
    }
    let mixer;
    let object;
    let animations;

    function initModel() {
      // 创建gltf加载器
      const loader = new GLTFLoader();
      console.log(this);
      // loader.load(url[0], function(gltf) {
      //   gltf.scene.scale.set(0.1, 0.1, 0.1);
      //   console.log("city");
      //   console.dir(gltf);
      //   scene.add(gltf.scene);
      // });
      loader.load(url[1], function(gltf) {
        gltf.scene.scale.set(1, 1, 1);
        console.log("light");
        console.dir(gltf);
        object = gltf.scene;
        animations = gltf.animations;
        if (animations && animations.length) {
          mixer = new Three.AnimationMixer(object);

          for (var i = 0; i < animations.length; i++) {
            var animation = animations[i];

            animation.duration = 9;

            self.action = mixer.clipAction(animation);
          }
        }
        scene.add(gltf.scene);
      });
    }
    function initStats() {
      stats = new Stats();
      // document.body.appendChild(stats.dom);
    }
    function initControl() {
      control = new OrbitControls(camera, renderer.domElement);
      control.enableRotate = true;
      control.zoomSpeed = 2;
      control.keyPanSpeed = 14;
    }
    function render() {
      control.update();
      renderer.render(scene, camera);
    }
    function onWindowResize() {
      camera.aspect = 1108 / 600;
      camera.updateProjectionMatrix();
      renderer.setSize(1108, 600);
    }
    function animate() {
      // 更新控制器
      render();
      // 更新性能插件
      if (mixer) mixer.update(clock.getDelta());
      stats.update();
      requestAnimationFrame(animate);
    }
    function draw() {
      initScene();
      initCamera();
      initLight();
      initModel();
      initStats();
      middle = initRender();
      initControl();
      animate();
      window.onresize = onWindowResize;
    }
    draw();
    return middle;
  }
}
