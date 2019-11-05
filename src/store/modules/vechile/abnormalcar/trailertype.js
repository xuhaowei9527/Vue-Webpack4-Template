import api from "../../../../utils/xu-axios";
import FormatArray from "../../../../utils/xu-arrayto4";
import { Message } from "element-ui";
import config from "./config";
const TableHeader = [
  {
    propkey: "impropertypedesc",
    proplabel: "业务类型",
    wh: "120"
  },
  {
    propkey: "jcflag",
    proplabel: "是否稽查数据",
    wh: "150"
  },
  {
    propkey: "platenumber",
    proplabel: "车牌号",
    wh: "120"
  },
  {
    propkey: "vehicletypedesc",
    proplabel: "车种",
    wh: "90"
  },
  {
    propkey: "enterstation",
    proplabel: "入口站",
    wh: "120"
  },
  {
    propkey: "exitstation",
    proplabel: "出口站",
    wh: "120"
  },
  {
    propkey: "exitdate",
    proplabel: "出口时间",
    wh: "200"
  },
  {
    propkey: "tollname",
    proplabel: "收费员",
    wh: "90"
  },
  {
    propkey: "lanedesc",
    proplabel: "车道号",
    wh: "90"
  },
  {
    propkey: "payment",
    proplabel: "收费金额",
    wh: "90"
  },
  {
    propkey: "handledesc",
    proplabel: "处理说明",
    wh: "300"
  },
  {
    propkey: "username",
    proplabel: "记录人员",
    wh: "120"
  },
  {
    propkey: "redate",
    proplabel: "记录时间",
    wh: "200"
  },
  {
    propkey: "orgname",
    proplabel: "机构",
    wh: "150"
  }
];
// 显示录入项
const TransferName = [
  "jkorgid",
  "platenumber",
  "tollid",
  "laneid",
  "exitstation",
  "exitroad",
  "exitorgan",
  "exitdate",
  "enterstation",
  "enterroad",
  "enterorgan",
  "payment",
  "vehicletypeid",
  "jcflag",
  "handledesc"
];
// 格式录入项数组
const FormArr = FormatArray(config, TransferName);

const TrailerType = {
  namespaced: true,
  state: {
    name: "拖车/被拖车",
    FormArr: FormArr,
    TransferName: TransferName,
    url: {
      add: "vehicle/AddAbnormalCar",
      update: "vehicle/updateAbnormalCar",
      delete: "vehicle/delAbnormalCar"
    },
    defaultVehicleValue: {
      impropertypeid: "23",
      vehicletypeid: "11",
      handledesc: "",
      jcflag: "1"
    },
    VehicleList: [],
    VehicleData: {},
    TableHeader: TableHeader,
    page: {
      total: 0,
      pageSize: 10,
      currentPage: 1
    }
  },
  getters: {},
  actions: {
    // 获取非正常车列表信息 vehicle/getAbnormalCarList
    getVehicleList({ commit, state }) {
      api.post(
        "vehicle/getAbnormalCarList",
        {
          impropertypeid: state.defaultVehicleValue.impropertypeid,
          currentPage: state.page.currentPage,
          pageSize: state.page.pageSize
        },
        res => {
          if (res.resultCode === "100") {
            commit("setVehicleList", res.resultData);
            commit("setVehicleTotal", res.page.rows);
          }
        },
        error => {
          Message.error(error.resultMsg);
        }
      );
    },
    commitVehicleInfo({ commit, state, dispatch }, data) {
      return new Promise((resolve, reject) => {
        api.post(
          state.url[data.methods],
          data.data,
          res => {
            if (res.resultCode === "100") {
              Message.success(data.label + "成功");
              dispatch("getVehicleList");
              resolve();
            }
          },
          error => {
            Message.error(error.resultMsg);
          }
        );
      });
    }
  },
  mutations: {
    setVehicleList(state, data) {
      state.VehicleList = data;
    },
    setVehicleData(state, data) {
      TransferName.forEach(i => {
        state.VehicleData[i] = data[i];
      });
    },
    setVehiclePage(state, data) {
      state.page.currentPage = data;
    },
    setVehicleSize(state, data) {
      state.page.pageSize = data;
    },
    setVehicleTotal(state, data) {
      state.page.total = data;
    }
  }
};

export default {
  TrailerType
};
