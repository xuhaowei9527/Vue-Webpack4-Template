import api from "../../../utils/xu-axios";
import { tollerLineTableHeader } from "./constants/index";
import { Message } from "element-ui";

const state = {
  url: {
    add: "dutyRecord/addLaneDutyRecord",
    update: "dutyRecord/updateLaneDutyRecord",
    delete: "dutyRecord/deleteLaneDutyRecord"
  },
  tollerLineTableHeader: tollerLineTableHeader,
  tollLaneList: [],
  laneInfoList: [],
  page: {
    total: 0,
    pageSize: 10,
    currentPage: 1
  }
};

// getters
const getters = {};

// actions
const actions = {
  // 获取车道号 dutyRecord/getLaneInfoList
  getLaneInfoList({ commit }) {
    api.post(
      "dutyRecord/getLaneInfoList",
      {},
      res => {
        if (res.resultCode === "100") {
          commit("setLaneInfoList", res.resultData);
        }
      },
      error => {
        Message.error(error.resultMsg);
      }
    );
  },
  // 获取收费车道信息 dutyRecord/refreshLaneDutyRecord
  getTollLaneList({ commit }) {
    api.post(
      "dutyRecord/refreshLaneDutyRecord",
      {},
      res => {
        if (res.resultCode === "100") {
          commit("setTollLaneList", res.resultData);
        }
      },
      error => {
        Message.error(error.resultMsg);
      }
    );
  },
  // 提交投诉处理
  commitTollLaneInfo({ commit, state, dispatch }, data) {
    return new Promise((resolve, reject) => {
      api.post(
        state.url[data.methods],
        data.data,
        res => {
          if (res.resultCode === "100") {
            Message.success(data.label + "成功");
            dispatch("getTollLaneList");
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
  // 设置收费车道列表信息
  setTollLaneList(state, data) {
    state.tollLaneList = data;
  },
  setLaneInfoList(state, data) {
    state.laneInfoList = data;
  },
  setCurPage(state, data) {
    state.page.currentPage = data;
  },
  setSize(state, data) {
    state.page.pageSize = data;
  },
  setTotal(state, data) {
    state.page.total = data;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
