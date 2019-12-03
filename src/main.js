import Vue from "vue";
import App from "./app.vue";
import store from "./store/index";
import router from "./router/index";
require("./element/element");

const vm = new Vue({
  el: "#app",
  store,
  router,
  components: { App },
  template: "<App/>"
});

Vue.use(vm);
export default {
  vm
};
