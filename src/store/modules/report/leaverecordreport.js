import api from "../../../utils/xu-axios";
import { leaveRecordReportTableHeader } from "./constants/index";
import { Message } from "element-ui";

const state = {
  leaveRecordReportTableHeader: leaveRecordReportTableHeader,
  leaveRecordReportList: [],
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
  // 获取离岗记录报表信息 report/selectLeaveRecordList
  getLeaveRecordReportList({ commit }, data) {
    return new Promise((resolve, reject) => {
      api.post(
        "report/selectLeaveRecordList",
        data,
        res => {
          if (res.resultCode === "100") {
            commit("setLeaveRecordReportList", res.resultData);
            commit("setLeaveRecordReportTotal", res.resultData.length);
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
  setLeaveRecordReportList(state, data) {
    state.leaveRecordReportList = data;
  },
  setLeaveRecordReportCurPage(state, data) {
    state.page.currentPage = data;
  },
  setLeaveRecordReportSize(state, data) {
    state.page.pageSize = data;
  },
  setLeaveRecordReportTotal(state, data) {
    state.page.total = data;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
