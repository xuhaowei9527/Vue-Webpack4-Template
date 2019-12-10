<template>
  <div ref="three"></div>
</template>

<script>
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
const Three = require("three");
const OrbitControls = require("three-orbitcontrols");
// const Stats = require("stats.js");
// stats,
let renderer, camera, scene, ambientLight, directionalLight, control;
export default {
  name: "VThree",
  props: {
    gltf: {
      type: String,
      default: function() {
        return "";
      }
    }
  },
  data() {
    return {
      gltfObj: {}
    };
  },
  beforeMount() {},
  mounted() {
    console.log("挂载");
    this.init();
  },
  activated() {
    this.$refs.three.appendChild(renderer.domElement);
  },
  methods: {
    init() {
      this.initRender();
      this.initScene();
      this.initCamera();
      this.initLight();
      this.initModel();
      this.initStats();
      this.initControl();
      this.animate();
      window.onresize = this.onWindowResize;
    },
    // 渲染器
    initRender() {
      renderer = new Three.WebGLRenderer({ antialias: true });
      console.dir(renderer);
      renderer.setSize(1108, 691);
      // 告诉渲染器需要阴影效果
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = Three.PCFSoftShadowMap;
    },
    // 相机
    initCamera() {
      camera = new Three.PerspectiveCamera(45, 1108 / 691, 0.1, 1000);
      console.dir(camera);
      camera.position.set(100, 100, 100);
      camera.lookAt(new Three.Vector3(0, 0, 0));
    },
    // 场景
    initScene() {
      console.log("diyici", scene);
      scene = new Three.Scene();
      console.dir("finish", scene);
    },
    // 灯光
    initLight() {
      ambientLight = new Three.AmbientLight("#404040");
      scene.add(ambientLight);
      directionalLight = new Three.DirectionalLight("#ffffff");
      directionalLight.position.set(20, 30, 10);
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
    },
    initModel() {
      // 创建gltf加载器
      const loader = new GLTFLoader();
      console.dir(loader);
      // gltf
      // "model3D/traffic_light__animation/scene.gltf"
      loader.load(this.gltf, function(gltf) {
        gltf.scene.scale.set(1, 1, 1);
        scene.add(gltf.scene);
      });
    },
    initStats() {
      // stats = new Stats();
    },
    initControl() {
      control = new OrbitControls(camera, renderer.domElement);
      console.dir(control);
    },
    render() {
      control.update();
      renderer.render(scene, camera);
    },
    onWindowResize() {
      camera.aspect = 1108 / 691;
      camera.updateProjectionMatrix();
      renderer.setSize(1108, 691);
    },
    animate() {
      // 更新控制器
      this.render();
      // 更新性能插件
      // stats.update();
      requestAnimationFrame(this.animate);
    }
  },
  destroyed() {
    console.log("模板销毁");
    console.log(scene);
    renderer.dispose();
    control.dispose();
  }
};
</script>

<style></style>
