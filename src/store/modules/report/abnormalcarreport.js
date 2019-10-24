import api from "../../../utils/xu-axios";
import { abnormalCarReportTableHeader } from "./constants/index";
import { Message } from "element-ui";

const state = {
  abnormalCarReportTableHeader: abnormalCarReportTableHeader,
  abnormalCarReportList: [],
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
  // 获取非正常车报表信息 vehicle/getAbnormalCarList
  getAbnormalCarReportList({ commit }, data) {
    return new Promise((resolve, reject) => {
      api.post(
        "report/selectImpropertypeCarList",
        data,
        res => {
          if (res.resultCode === "100") {
            commit("setAbnormalCarReportList", res.resultData);
            commit("setAbnormalCarReportTotal", res.resultData.length);
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
  setAbnormalCarReportList(state, data) {
    state.abnormalCarReportList = data;
  },
  setAbnormalCarReportCurPage(state, data) {
    state.page.currentPage = data;
  },
  setAbnormalCarReportSize(state, data) {
    state.page.pageSize = data;
  },
  setAbnormalCarReportTotal(state, data) {
    state.page.total = data;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
