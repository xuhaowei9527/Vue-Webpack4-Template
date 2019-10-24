import api from "../../../utils/xu-axios";
import { freeCarReportTableHeader } from "./constants/index";
import { Message } from "element-ui";

const state = {
  freeCarReportTableHeader: freeCarReportTableHeader,
  freeCarReportList: [],
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
  // 获取免费车报表信息 report/selectGetFreeCarInfo
  getFreeCarReportList({ commit }, data) {
    return new Promise((resolve, reject) => {
      api.post(
        "report/selectGetFreeCarInfo",
        data,
        res => {
          if (res.resultCode === "100") {
            commit("setFreeCarReportList", res.resultData);
            commit("setFreeCarReportTotal", res.resultData.length);
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
  setFreeCarReportList(state, data) {
    state.freeCarReportList = data;
  },
  setFreeCarReportCurPage(state, data) {
    state.page.currentPage = data;
  },
  setFreeCarReportSize(state, data) {
    state.page.pageSize = data;
  },
  setFreeCarReportTotal(state, data) {
    state.page.total = data;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
