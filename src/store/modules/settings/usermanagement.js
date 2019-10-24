import api from "../../../utils/xu-axios";
import { userListTableHeader } from "./constants/index";
import { Message } from "element-ui";

const state = {
  url: {
    add: "sysMgt/addUser",
    update: "sysMgt/updateUser",
    delete: "sysMgt/delUser"
  },
  userListTableHeader: userListTableHeader,
  userList: [],
  roleList: [],
  workGroupList: [],
  postList: [],
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
  // 获取用户列表
  getUserList({ commit }) {
    return new Promise((resolve, reject) => {
      api.post(
        "sysMgt/GetUserlist",
        {},
        res => {
          if (res.resultCode === "100") {
            commit("setUserList", res.resultData);
            commit("setTotal", res.resultData.length);
            resolve();
          }
        },
        error => {
          Message.error(error.resultMsg);
        }
      );
    });
  },
  // 获取角色
  getRoleList({ commit }) {
    api.post(
      "sysMgt/getRolelist",
      {},
      res => {
        if (res.resultCode === "100") {
          commit("setRoleList", res.resultData);
        }
      },
      error => {
        Message.error(error.resultMsg);
      }
    );
  },
  // 获取班组列表
  getWorkGroupList({ commit }) {
    api.post(
      "sysMgt/getUserWorkGrouplist",
      {},
      res => {
        if (res.resultCode === "100") {
          commit("setWorkGroupList", res.resultData);
        }
      },
      error => {
        Message.error(error.resultMsg);
      }
    );
  },
  // 获取岗位列表
  getPostList({ commit }) {
    api.post(
      "sysMgt/getPostInfoList",
      {},
      res => {
        if (res.resultCode === "100") {
          commit("setPostList", res.resultData);
        }
      },
      error => {
        Message.error(error.resultMsg);
      }
    );
  },
  // 提交用户信息
  commitUserInfo({ commit, state, dispatch }, data) {
    return new Promise((resolve, reject) => {
      api.post(
        state.url[data.methods],
        data.data,
        res => {
          if (res.resultCode === "100") {
            Message.success(data.label + "成功");
            dispatch("getUserList");
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
  setUserList(state, data) {
    state.userList = data;
  },
  setRoleList(state, data) {
    state.roleList = data;
  },
  setPostList(state, data) {
    state.postList = data;
  },
  setWorkGroupList(state, data) {
    state.workGroupList = data;
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
