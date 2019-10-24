import { parseNowDate } from "../../../utils/xu-moment";

const dutyMixins = {
  methods: {
    setInitTime: function(e) {
      if (e.target.value === "") {
        this.dutyFormdata.dutyrecord = parseNowDate() + ":";
      }
    },
    // 注册键盘keydown事件
    textareaMonitor: function(e) {
      this.dutyFormdata.dutyrecord =
        e.target.value.replace(/[ ]/g, "") + parseNowDate() + ":";
    }
  }
};

export { dutyMixins };
