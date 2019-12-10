import Vue from "vue";
import App from "./app.vue";
import store from "./store/index";
import router from "./router/index";

import Three3D from "./pages/test/sdk/index";
// 全局注册组件，组件重复创建会导致gpu内存不断增加
// import VThree from "./components/vthree/index";
// Vue.use(VThree);

require("./element/element");

const vm = new Vue({
  el: "#app",
  store,
  router,
  components: { App },
  template: "<App/>"
});
Vue.use(vm);
// 将模型挂载到window上
// 交通灯
// "model3D/traffic_light__animation/scene.gltf"
// 城市模型
// "model3D/map_lviv_ukraine/scene.gltf"
// tokyo
// "model3D/littlest_tokyo/scene.gltf"
// city_block 参数设置

// "model3D/city_block/scene.gltf"
// camera = new Three.PerspectiveCamera(45, 1108 / 691, 0.1, 20000);
// camera.position.set(2000, 2000, 2000);
const url = [
  "model3D/city_block/scene.gltf",
  "model3D/fan_light._wake_up_henry.../scene.gltf"
];

const th = new Three3D();
console.log(store.state.global.isPlay);
window.th = th;
window.three = th.init(url, store.state.global.isPlay);
export default {
  vm
};
