import Vue from "vue";
import App from "./app.vue";
import store from "./store/index";
import router from "./router/index";
import { parseNowDate, parseNowDateTotal } from "./utils/xu-moment";
require("./element/element");

const vm = new Vue({
  el: "#app",
  store,
  router,
  components: { App },
  template: "<App/>"
});

Vue.use(vm);
Vue.prototype.parseNowDate = parseNowDate;
Vue.prototype.parseNowDateTotal = parseNowDateTotal;
// 待用
export default {
  vm
};
