import api from "../../../utils/xu-axios";
import { vehicleDetailsReportTableHeader } from "./constants/index";
import { Message } from "element-ui";

const state = {
  vehicleDetailsReportTableHeader: vehicleDetailsReportTableHeader,
  vehicleDetailsReportList: [],
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
  // 获取车辆详细信息报表信息 report/selectEnclosureReportTwo
  getVehicleDetailsReportList({ commit }, data) {
    return new Promise((resolve, reject) => {
      api.post(
        "report/selectEnclosureReportTwo",
        data,
        res => {
          if (res.resultCode === "100") {
            commit("setVehicleDetailsReportList", res.resultData);
            commit("setVehicleDetailsReportTotal", res.resultData.length);
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
  setVehicleDetailsReportList(state, data) {
    state.vehicleDetailsReportList = data;
  },
  setVehicleDetailsReportCurPage(state, data) {
    state.page.currentPage = data;
  },
  setVehicleDetailsReportSize(state, data) {
    state.page.pageSize = data;
  },
  setVehicleDetailsReportTotal(state, data) {
    state.page.total = data;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
