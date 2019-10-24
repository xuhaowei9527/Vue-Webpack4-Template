import api from "../../../utils/xu-axios";
import { videoTranrecReportTableHeader } from "./constants/index";
import { Message } from "element-ui";

const state = {
  videoTranrecReportTableHeader: videoTranrecReportTableHeader,
  videoTranrecReportList: [],
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
  // 获取录像抽调报表信息 report/selectVideoTranrecList
  getVideoTranrecReportList({ commit }, data) {
    api.post("report/selectVideoTranrecList", data, res => {
      return new Promise(
        (resolve, reject) => {
          if (res.resultCode === "100") {
            commit("setVideoTranrecReportList", res.resultData);
            commit("setVideoTranrecReportTotal", res.resultData.length);
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
  setVideoTranrecReportList(state, data) {
    state.videoTranrecReportList = data;
  },
  setVideoTranrecReportCurPage(state, data) {
    state.page.currentPage = data;
  },
  setVideoTranrecReportSize(state, data) {
    state.page.pageSize = data;
  },
  setVideoTranrecReportTotal(state, data) {
    state.page.total = data;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
