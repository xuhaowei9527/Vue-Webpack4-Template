import Vue from "vue";
import Vuex from "vuex";
import global from "./modules/global";
import test from "./modules/test/index";
console.log(global);
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    global,
    test
  }
});
