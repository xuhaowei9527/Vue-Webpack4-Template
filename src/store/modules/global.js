import menus from "../../dynamic/index";
const global = {
  namespaced: true,
  state: {
    isPlay: true,
    menus: menus
  },
  getters: {},
  actions: {},
  mutations: {
    setIsPlay(state, payload) {
      state.isPlay = payload;
    }
  }
};

export default global;
