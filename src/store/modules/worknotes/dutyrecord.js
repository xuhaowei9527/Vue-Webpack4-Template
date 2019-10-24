import api from "../../../utils/xu-axios";
import { dutyTableHeader, weatherList } from "./constants/index";
import { Message } from "element-ui";

const state = {
  // 值班记录页表格站
  dutyTableLabel: dutyTableHeader,
  weatherLabel: weatherList,
  // 当前值班记录
  curDutyRecord: {},
  // 值班记录分页数据
  dutyRecordList: [],
  // 班长数组
  classMonitorList: []
};

// getters
const getters = {};

// actions
const actions = {
  // 获取值班记录列表
  getDutyRecordList({ commit }) {
    api.post(
      "dutyRecord/getDutyRecordList",
      {},
      res => {
        if (res.resultCode === "100") {
          const arr = JSON.parse(JSON.stringify(res.resultData)) || [];
          arr.forEach(j => {
            Object.keys(j).forEach(i => {
              if (j[i] === null) {
                j[i] = "";
              }
            });
          });
          commit("setDutyRecordList", arr);
        }
      },
      error => {
        Message.error(error.resultMsg);
      }
    );
  },
  // 获取值班记录列表
  getClassMonitorList({ commit }) {
    api.post(
      "dutyRecord/getMonitorByOrgId",
      {},
      res => {
        if (res.resultCode === "100") {
          commit("setClassMonitorList", res.resultData);
        }
      },
      error => {
        Message.error(error.resultMsg);
      }
    );
  },
  // 获取当前值班记录 dutyRecord/getCurDutyRecord
  getCurDutyRecord({ commit }) {
    return new Promise((resolve, reject) => {
      api.post(
        "dutyRecord/getCurDutyRecord",
        {},
        res => {
          if (res.resultCode === "100") {
            const obj = JSON.parse(JSON.stringify(res.resultData)) || {};
            Object.keys(obj).forEach(i => {
              if (obj[i] === null) {
                obj[i] = "";
              }
            });
            commit("setCurDutyRecord", obj);
            resolve(obj);
          }
        },
        error => {
          Message.error(error.resultMsg);
        }
      );
    });
  },
  // 保存当前值班记录 dutyRecord/addDutyRecord
  saveDutyRecord({ commit, dispatch }, data) {
    api.post(
      "dutyRecord/addDutyRecord",
      data,
      res => {
        if (res.resultCode === "100") {
          Message.success("保存成功");
          dispatch("getCurDutyRecord");
          dispatch("getDutyRecordList");
        }
      },
      error => {
        Message.error(error.resultMsg);
      }
    );
  }
};

// mutations
const mutations = {
  // 设置机构信息
  setDutyRecordList(state, data) {
    state.dutyRecordList = data;
  },
  // 设置班长列表信息
  setClassMonitorList(state, data) {
    state.classMonitorList = data;
  },
  setCurDutyRecord(state, data) {
    state.curDutyRecord = data;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
