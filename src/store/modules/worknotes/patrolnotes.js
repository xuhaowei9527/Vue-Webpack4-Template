import api from "../../../utils/xu-axios";
import { Message } from "element-ui";

const state = {
  url: {
    add: "centerManager/addPatrolNotes"
  },
  patroNotes: {}
};

// getters
const getters = {};

// actions
const actions = {
  // 获取巡查异常信息 centerManager/refreshPatrolNotes
  getPatrolNotes({ commit }) {
    api.post(
      "centerManager/refreshPatrolNotes",
      {},
      res => {
        if (res.resultCode === "100") {
          commit("setPatrolNotes", res.resultData);
        }
      },
      error => {
        Message.error(error.resultMsg);
      }
    );
  },
  // 提交异常处理信息 centerManager/addPatrolNotes
  commitPatrolNotesInfo({ commit, state, dispatch }, data) {
    return new Promise((resolve, reject) => {
      api.post(
        state.url[data.methods],
        data.data,
        res => {
          if (res.resultCode === "100") {
            Message.success(data.label + "成功");
            dispatch("getPatrolNotes");
            resolve();
          }
        },
        error => {
          Message.error(error.resultMsg);
        }
      );
    });
  }
};

// mutations
const mutations = {
  // 设置机构信息
  setPatrolNotes(state, data) {
    state.patroNotes = data;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
