import api from "../../../utils/xu-axios";
import { freeCarTableHeader } from "./constants/index";
import { Message } from "element-ui";

const state = {
  url: {
    add: "vehicle/AddFreeCar",
    update: "vehicle/updateFreeCar",
    delete: "vehicle/delFreeCar"
  },
  freeCarTableHeader: freeCarTableHeader,
  freeCarList: [],
  freeTypeList: [],
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
  // 获取免费车列表信息 vehicle/getAbnormalCarList
  getFreeCarList({ commit }) {
    api.post(
      "vehicle/getFreeCarList",
      {
        currentPage: state.page.currentPage,
        pageSize: state.page.pageSize
      },
      res => {
        if (res.resultCode === "100") {
          commit("setFreeCarList", res.resultData);
          commit("setTotal", res.page.rows);
        }
      },
      error => {
        Message.error(error.resultMsg);
      }
    );
  },
  // 获取免费车类型列表 dutyRecord/getFreeTypeList
  getFreeTypeList({ commit }) {
    api.post(
      "dutyRecord/getFreeTypeList",
      {},
      res => {
        if (res.resultCode === "100") {
          const result = Array.from(res.resultData);
          result.unshift({
            freetypeid: "0",
            freetypedesc: "全部"
          });
          commit("setFreeTypeList", result);
        }
      },
      error => {
        Message.error(error.resultMsg);
      }
    );
  },
  // 提交非正常车信息
  commitFreeCarInfo({ commit, state, dispatch }, data) {
    return new Promise((resolve, reject) => {
      api.post(
        state.url[data.methods],
        data.data,
        res => {
          if (res.resultCode === "100") {
            Message.success(data.label + "成功");
            dispatch("getFreeCarList");
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
  // 设置免费车列表信息
  setFreeCarList(state, data) {
    state.freeCarList = data;
  },
  setFreeTypeList(state, data) {
    state.freeTypeList = data;
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
