import api from "../../../utils/xu-axios";
import { correctVehicleReportTableHeader } from "./constants/index";
import { Message } from "element-ui";

const state = {
  correctVehicleReportTableHeader: correctVehicleReportTableHeader,
  correctVehicleReportList: [],
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
  getCorrectVehicleReportList({ commit }, data) {
    return new Promise((resolve, reject) => {
      api.post(
        "report/getReportJZCXList",
        data,
        res => {
          if (res.resultCode === "100") {
            commit("setCorrectVehicleReportList", res.resultData);
            commit("setCorrectVehicleReportTotal", res.resultData.length);
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
  setCorrectVehicleReportList(state, data) {
    state.correctVehicleReportList = data;
  },
  setCorrectVehicleReportCurPage(state, data) {
    state.page.currentPage = data;
  },
  setCorrectVehicleReportSize(state, data) {
    state.page.pageSize = data;
  },
  setCorrectVehicleReportTotal(state, data) {
    state.page.total = data;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
