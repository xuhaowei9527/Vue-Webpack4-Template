import api from "../../../utils/xu-axios";
import { constructionMaintenanceTableHeader } from "./constants/index";
import { Message } from "element-ui";

const state = {
  url: {
    add: "centerManager/addTrafficEvent",
    update: "centerManager/updateTrafficEvent",
    delete: "centerManager/delTrafficEvent"
  },
  // 施工养护表头
  constructionMaintenanceTableHeader: constructionMaintenanceTableHeader,
  constructionMaintenanceList: [],
  eventTypeList: []
};

// getters
const getters = {};

// actions
const actions = {
  getConstructionMaintenanceList({ commit }) {
    api.post(
      "centerManager/refreshTrafficEvent",
      {},
      res => {
        if (res.resultCode === "100") {
          commit("setConstructionMaintenanceList", res.resultData);
        }
      },
      error => {
        Message.error(error.resultMsg);
      }
    );
  },
  // 获取施工养护事件类型 centerManager/getEventType
  getEventTypeList({ commit }) {
    api.post(
      "centerManager/getEventType",
      {},
      res => {
        if (res.resultCode === "100") {
          commit("setEventTypeList", res.resultData);
        }
      },
      error => {
        Message.error(error.resultMsg);
      }
    );
  },
  // 提交施工用户记录 centerManager/addTrafficEvent
  commitConstructionMaintenanceInfo({ commit, state, dispatch }, data) {
    return new Promise((resolve, reject) => {
      api.post(
        state.url[data.methods],
        data.data,
        res => {
          if (res.resultCode === "100") {
            Message.success(data.label + "成功");
            dispatch("getConstructionMaintenanceList");
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
  // 设置施工养护列表信息
  setConstructionMaintenanceList(state, data) {
    state.constructionMaintenanceList = data;
  },
  // 获取事件类型列表
  setEventTypeList(state, data) {
    state.eventTypeList = data;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
