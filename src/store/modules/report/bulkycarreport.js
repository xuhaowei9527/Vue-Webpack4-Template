import api from "../../../utils/xu-axios";
import { bulkyCarReportTableHeader } from "./constants/index";
import { Message } from "element-ui";

const state = {
  bulkyCarReportTableHeader: bulkyCarReportTableHeader,
  bulkyCarReportList: [],
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
  getBulkyCarReportList({ commit }, data) {
    return new Promise((resolve, reject) => {
      api.post(
        "report/selectGetBulkyCarInfo",
        data,
        res => {
          if (res.resultCode === "100") {
            commit("setBulkyCarReportList", res.resultData);
            commit("setBulkyCarReportTotal", res.resultData.length);
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
  setBulkyCarReportList(state, data) {
    state.bulkyCarReportList = data;
  },
  setBulkyCarReportCurPage(state, data) {
    state.page.currentPage = data;
  },
  setBulkyCarReportSize(state, data) {
    state.page.pageSize = data;
  },
  setBulkyCarReportTotal(state, data) {
    state.page.total = data;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
