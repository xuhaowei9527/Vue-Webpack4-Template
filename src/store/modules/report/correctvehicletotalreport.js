import api from "../../../utils/xu-axios";
import { correctVehicleTotalReportTableHeader } from "./constants/index";
import { Message } from "element-ui";

const state = {
  correctVehicleTotalReportTableHeader: correctVehicleTotalReportTableHeader,
  correctVehicleTotalReportList: [],
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
  // 获取稽查纠正车型信息 report/getReportJZCXList
  getCorrectVehicleTotalReportList({ commit }, data) {
    return new Promise((resolve, reject) => {
      api.post(
        "report/selectJCCompanyReportList",
        data,
        res => {
          if (res.resultCode === "100") {
            commit("setCorrectVehicleTotalReportList", res.resultData);
            commit("setCorrectVehicleTotalReportTotal", res.resultData.length);
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
  setCorrectVehicleTotalReportList(state, data) {
    state.correctVehicleTotalReportList = data;
  },
  setCorrectVehicleTotalReportCurPage(state, data) {
    state.page.currentPage = data;
  },
  setCorrectVehicleTotalReportSize(state, data) {
    state.page.pageSize = data;
  },
  setCorrectVehicleTotalReportTotal(state, data) {
    state.page.total = data;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
