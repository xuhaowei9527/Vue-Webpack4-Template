import api from "../../../utils/xu-axios";
import { changeShiftsReportTableHeader } from "./constants/index";
import { Message } from "element-ui";

const state = {
  changeShiftsReportTableHeader: changeShiftsReportTableHeader,
  changeShiftsReportList: [],
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
  // 获取交接班报表信息 report/selectChangeShiftsList
  getChangeShiftsReportList({ commit }, data) {
    return new Promise((resolve, reject) => {
      api.post(
        "report/selectChangeShiftsList",
        data,
        res => {
          if (res.resultCode === "100") {
            commit("setChangeShiftsReportList", res.resultData);
            commit("setChangeShiftsReportTotal", res.resultData.length);
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
  setChangeShiftsReportList(state, data) {
    state.changeShiftsReportList = data;
  },
  setChangeShiftsReportCurPage(state, data) {
    state.page.currentPage = data;
  },
  setChangeShiftsReportSize(state, data) {
    state.page.pageSize = data;
  },
  setChangeShiftsReportTotal(state, data) {
    state.page.total = data;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
