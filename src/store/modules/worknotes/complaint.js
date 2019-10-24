import api from "../../../utils/xu-axios";
import { complaintTableHeader } from "./constants/index";
import { Message } from "element-ui";

const state = {
  url: {
    add: "centerManager/addComplaintHandLing",
    update: "centerManager/updateComplaintHandLing",
    delete: "centerManager/delComplaintHandLing"
  },
  // 投诉处理表头
  complaintTableHeader: complaintTableHeader,
  complaintList: [],
  leaderList: [],
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
  // 获取值班领导dutyRecord/getCenterLeaderList
  getLeaderList({ commit }) {
    api.post(
      "dutyRecord/getCenterLeaderList",
      {},
      res => {
        if (res.resultCode === "100") {
          commit("setLeaderList", res.resultData);
        }
      },
      error => {
        Message.error(error.resultMsg);
      }
    );
  },
  getComplaintList({ commit }) {
    return new Promise((resolve, reject) => {
      api.post(
        "centerManager/refreshComplaintHandLing",
        {
          currentPage: state.page.currentPage,
          pageSize: state.page.pageSize
        },
        res => {
          if (res.resultCode === "100") {
            commit("setComplaintList", res.resultData);
            commit("setTotal", res.resultData.length || 0);
            resolve();
          }
        },
        error => {
          Message.error(error.resultMsg);
        }
      );
    });
  },
  // 提交投诉处理
  commitComplaintInfo({ commit, state, dispatch }, data) {
    return new Promise((resolve, reject) => {
      api.post(
        state.url[data.methods],
        data.data,
        res => {
          if (res.resultCode === "100") {
            Message.success(data.label + "成功");
            dispatch("getComplaintList");
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
  // 设置机构信息
  setComplaintList(state, data) {
    state.complaintList = data;
  },
  setLeaderList(state, data) {
    state.leaderList = data;
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
