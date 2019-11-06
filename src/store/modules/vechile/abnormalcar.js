import api from "../../../utils/xu-axios";
import { abnormalCarTableHeader } from "./constants/index";
import { Message } from "element-ui";

const state = {
  url: {
    add: "vehicle/AddAbnormalCar",
    update: "vehicle/updateAbnormalCar",
    delete: "vehicle/delAbnormalCar"
  },
  abnormalCarTableHeader: abnormalCarTableHeader,
  abnormalCarList: [],
  improperTypeList: [],
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
  // 获取非正常车列表信息 vehicle/getAbnormalCarList
  getAbnormalCarList({ commit }) {
    api.post(
      "vehicle/getAbnormalCarList",
      {
        currentPage: state.page.currentPage,
        pageSize: state.page.pageSize
      },
      res => {
        if (res.resultCode === "100") {
          commit("setAbnormalCarList", res.resultData);
          commit("setTotal", res.page.rows);
        }
      },
      error => {
        Message.error(error.resultMsg);
      }
    );
  },
  // 获取非正常车业务类型 dutyRecord/getImproperTypeList
  getImproperTypeList({ commit }, data) {
    api.post(
      "dutyRecord/getImproperTypeList",
      data,
      res => {
        if (res.resultCode === "100") {
          const result = Array.from(res.resultData);
          result.unshift({
            impropertypeid: "0",
            impropertypedesc: "全部"
          });
          commit("setImproperTypeList", result);
        }
      },
      error => {
        Message.error(error.resultMsg);
      }
    );
  },
  // 提交非正常车信息
  commitAbnormalCarInfo({ commit, state, dispatch }, data) {
    return new Promise((resolve, reject) => {
      api.post(
        state.url[data.methods],
        data.data,
        res => {
          if (res.resultCode === "100") {
            Message.success(data.label + "成功");
            dispatch("getAbnormalCarList");
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
  // 设置非正常车列表信息
  setAbnormalCarList(state, data) {
    state.abnormalCarList = data;
  },
  setImproperTypeList(state, data) {
    state.improperTypeList = data;
  },
  setCurPage(state, data) {
    state.page.currentPage = data;
  },
  setSize(state, data) {
    state.page.pageSize = data;
  },
  setTotal(state, data) {
    state.page.total = data;
  },
  resetPage(state, data) {
    state.page = {
      total: 0,
      pageSize: 10,
      currentPage: 1
    };
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
