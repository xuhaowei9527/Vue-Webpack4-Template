import { parseNowDate } from "../../../utils/xu-moment";

const complaintMixins = {
  methods: {
    setOneTime: function(e) {
      if (e.target.value === "") {
        this.complaintFormdata.complaintinfo = parseNowDate() + ":";
      }
    },
    setTwoTime: function(e) {
      if (e.target.value === "") {
        this.complaintFormdata.handlingdesc = parseNowDate() + ":";
      }
    },
    setThreeTime: function(e) {
      if (e.target.value === "") {
        this.complaintFormdata.feedbackinfo = parseNowDate() + ":";
      }
    },
    // 注册键盘keydown事件
    complaintinfoMonitor: function(e) {
      this.complaintFormdata.complaintinfo =
        e.target.value.replace(/[ ]/g, "") + parseNowDate() + ":";
    },
    // 注册键盘keydown事件
    handlingdescMonitor: function(e) {
      this.complaintFormdata.handlingdesc =
        e.target.value.replace(/[ ]/g, "") + parseNowDate() + ":";
    },
    // 注册键盘keydown事件
    feedbackinfoMonitor: function(e) {
      this.complaintFormdata.feedbackinfo =
        e.target.value.replace(/[ ]/g, "") + parseNowDate() + ":";
    }
  }
};

export { complaintMixins };
