import api from "../../../utils/xu-axios";
import { bulkyCarTableHeader } from "./constants/index";
import { Message } from "element-ui";

const state = {
  url: {
    add: "vehicle/AddBulkyCar",
    update: "vehicle/updateBulkyCar",
    delete: "vehicle/delBulkyCar"
  },
  bulkyCarTableHeader: bulkyCarTableHeader,
  bulkyCarList: [],
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
  // 获取大件车列表信息 vehicle/getAbnormalCarList
  getBulkyCarList({ commit }) {
    api.post(
      "vehicle/getBulkyCarList",
      {
        currentPage: state.page.currentPage,
        pageSize: state.page.pageSize
      },
      res => {
        if (res.resultCode === "100") {
          commit("setBulkyCarList", res.resultData);
          commit("setTotal", res.page.rows);
        }
      },
      error => {
        Message.error(error.resultMsg);
      }
    );
  },
  // 提交非正常车信息
  commitBulkyCarInfo({ commit, state, dispatch }, data) {
    return new Promise((resolve, reject) => {
      api.post(
        state.url[data.methods],
        data.data,
        res => {
          if (res.resultCode === "100") {
            Message.success(data.label + "成功");
            dispatch("getBulkyCarList");
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
  // 设置大件车列表信息
  setBulkyCarList(state, data) {
    state.bulkyCarList = data;
  },
  setCurPage(state, data) {
    state.page.currentPage = data;
  },
  setSize(state, data) {
    state.page.pageSize = data;
  },
  setTotal(state, data) {
    state.page.total = data;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
