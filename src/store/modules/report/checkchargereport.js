import api from "../../../utils/xu-axios";
import { Message } from "element-ui";

const state = {
  checkChargeReportList: [],
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
  // 获取收费稽查报表信息 report/selectEnclosureReportOne
  getCheckChargeReportList({ commit }, data) {
    return new Promise((resolve, reject) => {
      api.post(
        "report/selectEnclosureReportOne",
        data,
        res => {
          if (res.resultCode === "100") {
            commit("setCheckChargeReportList", res.resultData);
            commit("setCheckChargeReportTotal", res.resultData.length);
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
  setCheckChargeReportList(state, data) {
    state.checkChargeReportList = data;
  },
  setCheckChargeReportCurPage(state, data) {
    state.page.currentPage = data;
  },
  setCheckChargeReportSize(state, data) {
    state.page.pageSize = data;
  },
  setCheckChargeReportTotal(state, data) {
    state.page.total = data;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
