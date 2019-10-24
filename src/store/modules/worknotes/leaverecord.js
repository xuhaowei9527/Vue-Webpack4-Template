import api from "../../../utils/xu-axios";
import { leaveRecordTableHeader } from "./constants/index";
import { Message } from "element-ui";

const state = {
  url: {
    add: "centerManager/addLeaveRecord",
    update: "centerManager/updateLeaveRecord",
    delete: "centerManager/delLeaveRecord"
  },
  leaveRecordTableHeader: leaveRecordTableHeader,
  leaveRecordList: [],
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
  // 获取收费员违纪列表信息
  getLeaveRecordList({ commit }) {
    api.post(
      "centerManager/getLeaveRecordList",
      {
        currentPage: state.page.currentPage,
        pageSize: state.page.pageSize
      },
      res => {
        if (res.resultCode === "100") {
          commit("setLeaveRecordList", res.resultData);
          commit("setTotal", res.page.rows);
        }
      },
      error => {
        Message.error(error.resultMsg);
      }
    );
  },
  // 提交离岗记录
  commitLeaveRecordInfo({ commit, state, dispatch }, data) {
    return new Promise((resolve, reject) => {
      api.post(
        state.url[data.methods],
        data.data,
        res => {
          if (res.resultCode === "100") {
            Message.success(data.label + "成功");
            dispatch("getLeaveRecordList");
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
  setLeaveRecordList(state, data) {
    state.leaveRecordList = data;
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
