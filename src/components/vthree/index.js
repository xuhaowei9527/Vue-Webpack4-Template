import VThree from "./index.vue";

VThree.install = function(Vue) {
  Vue.component(VThree.name, VThree);
};

export default VThree;
