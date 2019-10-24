import api from "../../../utils/xu-axios";
import { videoDraftTableHeader } from "./constants/index";
import { Message } from "element-ui";
const axios = require("axios");

const state = {
  url: {
    add: "NoPaper/centerManager/addVideoTranrec",
    update: "NoPaper/centerManager/updateVideoTranrec",
    delete: "centerManager/delVideoTranrec"
  },
  page: {
    total: 0,
    pageSize: 10,
    currentPage: 1
  },
  // 录像抽调记录列表
  videoDraftList: [],
  // 施工养护表头
  videoDraftTableHeader: videoDraftTableHeader
};

// getters
const getters = {};

// actions
const actions = {
  getVideoDraftList({ commit, state }) {
    api.post(
      "centerManager/getVideoTranrecList",
      {
        currentPage: state.page.currentPage,
        pageSize: state.page.pageSize
      },
      res => {
        if (res.resultCode === "100") {
          commit("setVideoDraftList", res.resultData);
          commit("setTotal", res.page.rows);
        }
      },
      error => {
        Message.error(error.resultMsg);
      }
    );
  },
  // 添加录像抽调信息
  commitVideoDraftInfo({ commit, state, dispatch }, data) {
    return new Promise((resolve, reject) => {
      if (data.methods === "delete") {
        api.post(
          state.url[data.methods],
          data.data,
          res => {
            if (res.resultCode === "100") {
              Message.success(data.label + "成功");
              dispatch("getVideoDraftList");
              resolve();
            }
          },
          error => {
            Message.error(error.resultMsg);
          }
        );
      } else {
        const config = {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        };
        axios.post(state.url[data.methods], data.data, config).then(
          res => {
            if (res.data.resultCode === "100") {
              Message.success(data.label + "成功");
              dispatch("getVideoDraftList");
              resolve();
            }
          },
          error => {
            Message.error(error.resultMsg);
          }
        );
      }
    });
  }
};

// mutations
const mutations = {
  // 设置机构信息
  setVideoDraftList(state, data) {
    state.videoDraftList = data;
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
