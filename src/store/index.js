import Vue from "vue";
import Vuex from "vuex";
import GlobalState from "./modules/global";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    GlobalState
  }
});
