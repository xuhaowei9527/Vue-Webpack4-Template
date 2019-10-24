import { parseNowDate } from "../../../utils/xu-moment";

const constructionmaintenanceMixins = {
  methods: {
    setInitTime: function(e) {
      if (e.target.value === "") {
        this.constructionMaintenanceFormdata.worksituation =
          parseNowDate() + ":";
      }
    },
    // 注册键盘keydown事件
    textareaMonitor: function(e) {
      this.constructionMaintenanceFormdata.worksituation =
        e.target.value.replace(/[ ]/g, "") + parseNowDate() + ":";
    }
  }
};

export { constructionmaintenanceMixins };
