import api from "../../../utils/xu-axios";
import { dutyReportTableHeader } from "./constants/index";
import { Message } from "element-ui";

const state = {
  dutyReportTableHeader: dutyReportTableHeader,
  dutyRecordReportList: [],
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
  // 获取值班日志报表信息 report/selectDutyRecordList
  getDutyRecordReportList({ commit }, data) {
    return new Promise((resolve, reject) => {
      api.post(
        "report/selectDutyRecordList",
        data,
        res => {
          if (res.resultCode === "100") {
            commit("setDutyRecordReportList", res.resultData);
            commit("setDutyRecordReportTotal", res.resultData.length);
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
  setDutyRecordReportList(state, data) {
    state.dutyRecordReportList = data;
  },
  setDutyRecordReportCurPage(state, data) {
    state.page.currentPage = data;
  },
  setDutyRecordReportSize(state, data) {
    state.page.pageSize = data;
  },
  setDutyRecordReportTotal(state, data) {
    state.page.total = data;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
