import api from "../../../utils/xu-axios";
import { complaintReportTableHeader } from "./constants/index";
import { Message } from "element-ui";

const state = {
  complaintReportTableHeader: complaintReportTableHeader,
  complaintReportList: [],
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
  // 获取投诉处理报表信息 report/selectComplaintHandlingList
  getComplaintReportList({ commit }, data) {
    return new Promise((resolve, reject) => {
      api.post(
        "report/selectComplaintHandlingList",
        data,
        res => {
          if (res.resultCode === "100") {
            commit("setComplaintReportList", res.resultData);
            commit("setComplaintReportTotal", res.resultData.length);
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
  setComplaintReportList(state, data) {
    state.complaintReportList = data;
  },
  setComplaintReportCurPage(state, data) {
    state.page.currentPage = data;
  },
  setComplaintReportSize(state, data) {
    state.page.pageSize = data;
  },
  setComplaintReportTotal(state, data) {
    state.page.total = data;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
