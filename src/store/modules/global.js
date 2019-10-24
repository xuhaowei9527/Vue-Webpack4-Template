import api from "../../utils/xu-axios";
import router from "../../router/index";
import { stationMenu, centerMenu } from "../../dynamic/index";
import { Message } from "element-ui";

const state = {
  // 收费站列表对象
  orgList: [],
  // 值班班次列表
  workShiftList: [],
  // 当前机构班组成员
  curWorkGroupMember: [],
  // 班组列表
  workGroupList: [],
  // 车型
  vehicleTypeList: [],
  // 车种
  vehicleDescList: [],
  // 收费员
  tollorList: [],
  // 收费站列表
  stationList: [],
  // 当前登录人员信息对象
  loginInfo: {},
  // 用户列表
  loginUserList: [],
  menus: [],
  height: 1000,
  canmotify: false
};

// Object.assign(state, menu)
// getters
const getters = {};

// actions
const actions = {
  // 获取登录页机构列表
  getOrgList({ commit }) {
    api.post(
      "sysMgt/getOrganizationList",
      {},
      res => {
        if (res.resultCode === "100") {
          commit("setOrgList", res.resultData);
          window.localStorage.setItem(
            "orgList",
            JSON.stringify(res.resultData)
          );
        }
      },
      error => {
        Message.error(error.resultMsg);
      }
    );
  },
  // 获取收费员 sysMgt/GetStationUserlist
  getTollorList({ commit }) {
    api.post(
      "sysMgt/GetStationUserlist",
      {},
      res => {
        if (res.resultCode === "100") {
          commit("setTollorList", res.resultData);
        }
      },
      error => {
        Message.error(error.resultMsg);
      }
    );
  },
  // 当前班组值班人员列表 dutyRecord/getAllUserGrouptByOrgId
  getAllUserGrouptByOrgId({ commit }) {
    return new Promise((resolve, reject) => {
      api.post(
        "dutyRecord/getAllUserGrouptByOrgId",
        {},
        res => {
          if (res.resultCode === "100") {
            commit("setCurWorkGroupMember", res.resultData);
            resolve();
          }
        },
        error => {
          Message.error(error.resultMsg);
        }
      );
    });
  },
  // 获取值班班次列表 dutyRecord/getUserWorkShiftList
  getWorkShiftList({ commit }) {
    api.post(
      "dutyRecord/getUserWorkShiftList",
      {},
      res => {
        if (res.resultCode === "100") {
          commit("setWorkShiftList", res.resultData);
          window.localStorage.setItem(
            "workShiftList",
            JSON.stringify(res.resultData)
          );
        }
      },
      error => {
        Message.error(error.resultMsg);
      }
    );
  },
  // 获取班组信息列表 dutyRecord/getUserWordGroup
  getWorkGroupList({ commit }) {
    api.post(
      "dutyRecord/getUserWordGroup",
      {},
      res => {
        if (res.resultCode === "100") {
          commit("setWorkGroupList", res.resultData);
          window.localStorage.setItem(
            "workGroupList",
            JSON.stringify(res.resultData)
          );
        }
      },
      error => {
        Message.error(error.resultMsg);
      }
    );
  },
  // 获取车辆类型列表 dutyRecord/getVehicleTypeList
  getVehicleTypeList({ commit }) {
    api.post(
      "dutyRecord/getVehicleTypeList",
      {},
      res => {
        if (res.resultCode === "100") {
          commit("setVehicleTypeList", res.resultData);
          window.localStorage.setItem(
            "vehicleTypeList",
            JSON.stringify(res.resultData)
          );
        }
      },
      error => {
        Message.error(error.resultMsg);
      }
    );
  },
  // 获取车辆类型列表 dutyRecord/getVehicleTypeList
  getVehicleDescList({ commit }) {
    api.post(
      "dutyRecord/getVehicleDescList",
      {},
      res => {
        if (res.resultCode === "100") {
          commit("setVehicleDescList", res.resultData);
          window.localStorage.setItem(
            "vehicleDescList",
            JSON.stringify(res.resultData)
          );
        }
      },
      error => {
        Message.error(error.resultMsg);
      }
    );
  },
  // 获取收费站列表 vehicle/getStationInfo
  getStationList({ commit }) {
    api.post(
      "vehicle/getStationInfo",
      {},
      res => {
        if (res.resultCode === "100") {
          commit("setStationList", res.resultData);
          window.localStorage.setItem(
            "stationList",
            JSON.stringify(res.resultData)
          );
        }
      },
      error => {
        Message.error(error.resultMsg);
      }
    );
  },
  getLoginUserList({ commit }) {
    api.post(
      "login/getAllUser",
      {},
      res => {
        if (res.resultCode === "100") {
          commit("setLoginUserList", res.resultData);
        }
      },
      error => {
        Message.error(error.resultMsg);
      }
    );
  },
  getMenus({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      const loginI = JSON.parse(window.localStorage.getItem("loginInfo"));
      if (loginI && loginI.postid === "5") {
        Message.info("该用户无登录权限");
        router.push("/");
        return;
      }
      if (loginI && loginI.jkorgid !== "1101") {
        commit("setMenus", stationMenu);
        dispatch("getStationList");
      } else {
        commit("setMenus", centerMenu);
      }
      resolve();
    });
  },
  toLogin({ commit, dispatch }, data) {
    return new Promise((resolve, reject) => {
      api.post(
        "login/login",
        data,
        res => {
          if (res.resultCode === "100") {
            // 登录成功记录cookie
            commit("setLoginInfo", res.resultData);
            window.localStorage.setItem(
              "loginInfo",
              JSON.stringify(res.resultData)
            );
            // 渲染列表
            // dispatch('getMenus').then(r => {
            //   // 路由跳转
            //   router.push('/MainLayout/WorkNotes/DutyRecord')
            //   resolve(res.resultData)
            // })
            // 用户操作权限
            if (res.resultData.roleid === "3") {
              commit("setCanMotify", true);
            } else {
              commit("setCanMotify", false);
            }
            dispatch("getAllUserGrouptByOrgId");
            router.push("/MainLayout/WorkNotes/DutyRecord");
            resolve(res.resultData);
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
  setOrgList(state, data) {
    state.orgList = data;
  },
  // 设置值班班次信息
  setWorkShiftList(state, data) {
    state.workShiftList = data;
  },
  setTollorList(state, data) {
    state.tollorList = data;
  },
  // 设置班组信息
  setWorkGroupList(state, data) {
    state.workGroupList = data;
  },
  // 设置登录人员信息
  setLoginInfo(state, data) {
    state.loginInfo = data;
  },
  // 设置当前机构班组成员信息
  setCurWorkGroupMember(state, data) {
    state.curWorkGroupMember = data;
  },
  setVehicleTypeList(state, data) {
    state.vehicleTypeList = data;
  },
  setVehicleDescList(state, data) {
    state.vehicleDescList = data;
  },
  setStationList(state, data) {
    state.stationList = data;
  },
  setLoginUserList(state, data) {
    state.loginUserList = data;
  },
  setMenus(state, data) {
    state.menus = data;
  },
  setHeight(state, data) {
    state.height = data;
  },
  setCanMotify(state, data) {
    state.canmotify = data;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
