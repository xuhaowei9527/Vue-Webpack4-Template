import api from "../../../utils/xu-axios";
import { changeShiftTableHeader } from "./constants/index";
import { Message } from "element-ui";

const state = {
  url: {
    add: "centerManager/addChangeShifts",
    off: "centerManager/offChangeShifts"
  },
  // 交接班表头
  changeShiftTableHeader: changeShiftTableHeader,
  // 当前交接班记录
  curChangeShift: {},
  // 交接班分页数据
  changeShiftList: [],
  curworkUseridList: []
};

// getters
const getters = {};

// actions
const actions = {
  // 获取当前交接班信息 centerManager/getCurChangeShifts
  getChangeShift({ commit }) {
    api.post(
      "centerManager/getCurChangeShifts",
      {},
      res => {
        if (res.resultCode === "100") {
          commit("setCurChangeShift", res.resultData);
        }
      },
      error => {
        Message.error(error.resultMsg);
      }
    );
  },
  // 获取交班负责人 centerManager/getCurworkUseridList
  getCurworkUseridList({ commit }) {
    api.post(
      "dutyRecord/getDutyUseridList",
      {},
      res => {
        if (res.resultCode === "100") {
          commit("setCurworkUseridList", res.resultData);
        }
      },
      error => {
        Message.error(error.resultMsg);
      }
    );
  },
  // 获取交接班记录列表
  getChangeShiftList({ commit }) {
    api.post(
      "centerManager/getChangeShiftsList",
      {},
      res => {
        if (res.resultCode === "100") {
          commit("setChangeShiftList", res.resultData);
        }
      },
      error => {
        if (error.resultCode === "103") {
          Message.error("无值班人员信息，请先进行值班信息录入后操作");
        }
      }
    );
  },
  commitChangeShift({ commit, state, dispatch }, data) {
    return new Promise((resolve, reject) => {
      api.post(
        "centerManager/addChangeShifts",
        data.data,
        res => {
          if (res.resultCode === "103") {
            Message.info("无值班人员信息，请先进行值班信息录入后操作");
          } else {
            if (res.resultCode === "100") {
              Message.success(data.label + "成功");
              dispatch("getChangeShiftList");
              resolve();
            }
          }
        },
        error => {
          Message.error(error.resultMsg);
        }
      );
    });
  },
  offChangeShifts({ commit, state, dispatch }, data) {
    return new Promise((resolve, reject) => {
      api.post(
        "centerManager/offChangeShifts",
        data.data,
        res => {
          if (res.resultCode === "100") {
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
  // setDutyRecordList (state, data) {
  //   state.dutyRecordList = data
  // },
  setCurChangeShift(state, data) {
    state.curChangeShift = data;
  },
  setChangeShiftList(state, data) {
    state.changeShiftList = data;
  },
  setCurworkUseridList(state, data) {
    state.curworkUseridList = data;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
