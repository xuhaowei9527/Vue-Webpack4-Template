import api from "../../../utils/xu-axios";
import { potralNotesReportTableHeader } from "./constants/index";
import { Message } from "element-ui";

const state = {
  potralNotesReportTableHeader: potralNotesReportTableHeader,
  potralNotesReportList: [],
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
  // 获取异常处理报表信息 report/selectPatrolNotesList
  getPotralNotesReportList({ commit }, data) {
    return new Promise((resolve, reject) => {
      api.post(
        "report/selectPatrolNotesList",
        data,
        res => {
          if (res.resultCode === "100") {
            commit("setPotralNotesReportList", res.resultData);
            commit("setPotralNotesReportTotal", res.resultData.length);
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
  setPotralNotesReportList(state, data) {
    state.potralNotesReportList = data;
  },
  setPotralNotesReportCurPage(state, data) {
    state.page.currentPage = data;
  },
  setPotralNotesReportSize(state, data) {
    state.page.pageSize = data;
  },
  setPotralNotesReportTotal(state, data) {
    state.page.total = data;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
