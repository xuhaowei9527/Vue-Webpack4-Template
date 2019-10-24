import api from "../../../utils/xu-axios";
import { tollDisciplineTableHeader } from "./constants/index";
import { Message } from "element-ui";

const state = {
  url: {
    add: "centerManager/addDutyDiscipline",
    update: "centerManager/updateDutyDiscipline",
    delete: "centerManager/delDutyDiscipline"
  },
  tollDisciplineTableHeader: tollDisciplineTableHeader,
  tollDisciplineList: [],
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
  // 获取收费员违纪列表信息
  getTollDisciplineList({ commit }) {
    api.post(
      "centerManager/getDutyDisciplineList",
      {
        currentPage: state.page.currentPage,
        pageSize: state.page.pageSize
      },
      res => {
        if (res.resultCode === "100") {
          commit("setTollDisciplineList", res.resultData);
          commit("setTotal", res.page.rows);
        }
      },
      error => {
        Message.error(error.resultMsg);
      }
    );
  },
  // 提交投诉处理
  commitTollDisciplineInfo({ commit, state, dispatch }, data) {
    return new Promise((resolve, reject) => {
      api.post(
        state.url[data.methods],
        data.data,
        res => {
          if (res.resultCode === "100") {
            Message.success(data.label + "成功");
            dispatch("getTollDisciplineList");
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
  // 设置收费员违纪列表信息
  setTollDisciplineList(state, data) {
    state.tollDisciplineList = data;
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
