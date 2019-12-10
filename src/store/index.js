import Vue from "vue";
import Vuex from "vuex";
import global from "./modules/global";
import test from "./modules/test/index";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    global,
    test
  }
});
