const abnormalCarReportTableHeader = [
  {
    propkey: "platenumber",
    proplabel: "车牌号",
    wh: "120"
  },
  {
    propkey: "cartrucktype",
    proplabel: "车型",
    wh: "90"
  },
  {
    propkey: "vehicletypedesc",
    proplabel: "车种",
    wh: "90"
  },
  {
    propkey: "vehicleweight",
    proplabel: "实际车重",
    wh: "120"
  },
  {
    propkey: "overweightratio",
    proplabel: "超限比例",
    wh: "120"
  },
  {
    propkey: "enterstation",
    proplabel: "入口站",
    wh: "120"
  },
  {
    propkey: "enterroad",
    proplabel: "入口所属路段",
    wh: "120"
  },
  {
    propkey: "enterorgan",
    proplabel: "入口管理单位",
    wh: "120"
  },
  {
    propkey: "enterdate",
    proplabel: "入口时间",
    wh: "200"
  },
  {
    propkey: "exitstation",
    proplabel: "出口站",
    wh: "120"
  },
  {
    propkey: "exitroad",
    proplabel: "出口所属路段",
    wh: "120"
  },
  {
    propkey: "exitorgan",
    proplabel: "出口管理单位",
    wh: "120"
  },
  {
    propkey: "exitdate",
    proplabel: "出口时间",
    wh: "200"
  },
  {
    propkey: "revpayment",
    proplabel: "应缴金额",
    wh: "120"
  },
  {
    propkey: "payment",
    proplabel: "实缴金额",
    wh: "120"
  },
  {
    propkey: "afterpayment",
    proplabel: "补缴金额",
    wh: "120"
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
    propkey: "impropertypedesc",
    proplabel: "业务类型",
    wh: "120"
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
const dutyReportTableHeader = [
  {
    propkey: "onduty",
    proplabel: "值班标志",
    wh: "90"
  },
  {
    propkey: "workshiftdesc",
    proplabel: "班次",
    wh: "180"
  },
  {
    propkey: "workgroupdesc",
    proplabel: "班组",
    wh: "70"
  },
  {
    propkey: "jkworkgroupmember",
    proplabel: "班组成员",
    wh: "300"
  },
  {
    propkey: "jkmonitorname",
    proplabel: "班长",
    wh: "70"
  },
  {
    propkey: "dutyweather",
    proplabel: "天气",
    wh: "70"
  },
  {
    propkey: "dutyrecord",
    proplabel: "监控记录",
    wh: "700"
  },
  {
    propkey: "redate",
    proplabel: "记录时间",
    wh: "200"
  },
  {
    propkey: "dutydate",
    proplabel: "更新时间",
    wh: "200"
  },
  {
    propkey: "orgname",
    proplabel: "机构",
    wh: "200"
  }
];
const freeCarReportTableHeader = [
  {
    propkey: "platenumber",
    proplabel: "车牌号",
    wh: "120"
  },
  {
    propkey: "cartrucktype",
    proplabel: "车型",
    wh: "90"
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
    propkey: "freetypedesc",
    proplabel: "免费类型",
    wh: "120"
  },
  {
    propkey: "freemoney",
    proplabel: "免费金额",
    wh: "120"
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
    propkey: "freetypedesc",
    proplabel: "免费类型",
    wh: "120"
  },
  {
    propkey: "handledesc",
    proplabel: "处理说明",
    wh: "220"
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
const bulkyCarReportTableHeader = [
  {
    propkey: "certificate",
    proplabel: "大件车运输证号",
    wh: "120"
  },
  {
    propkey: "platenumber",
    proplabel: "车牌号",
    wh: "120"
  },
  {
    propkey: "enterstation",
    proplabel: "入口站",
    wh: "120"
  },
  {
    propkey: "enterroad",
    proplabel: "入口站所属路段",
    wh: "150"
  },
  {
    propkey: "enterorgan",
    proplabel: "入口站管理单位",
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
    propkey: "exitroad",
    proplabel: "出口站所属路段",
    wh: "150"
  },
  {
    propkey: "exitorgan",
    proplabel: "出口站管理单位",
    wh: "120"
  },
  {
    propkey: "declareweight",
    proplabel: "申报重量",
    wh: "120"
  },
  {
    propkey: "vehicleweight",
    proplabel: "计重吨位",
    wh: "120"
  },
  {
    propkey: "payment",
    proplabel: "实收金额",
    wh: "120"
  },
  {
    propkey: "dispayment",
    proplabel: "减免金额",
    wh: "120"
  },
  {
    propkey: "goodsdesc",
    proplabel: "货物名称",
    wh: "120"
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
const vehicleDetailsReportTableHeader = [
  {
    propkey: "date",
    proplabel: "日期",
    wh: "120"
  },
  {
    propkey: "time",
    proplabel: "时间",
    wh: "120"
  },
  {
    propkey: "platenumber",
    proplabel: "车牌",
    wh: "120"
  },
  {
    propkey: "enterstation",
    proplabel: "入口站",
    wh: "200"
  },
  {
    propkey: "cardnumber",
    proplabel: "卡号",
    wh: "100"
  },
  {
    propkey: "cartrucktype",
    proplabel: "车型",
    wh: "100"
  },
  {
    propkey: "vehicletypedesc",
    proplabel: "车种",
    wh: "100"
  },
  {
    propkey: "impropertypedesc",
    proplabel: "缴费类型",
    wh: "150"
  },
  {
    propkey: "payment",
    proplabel: "补缴金额(元)",
    wh: "120"
  },
  {
    propkey: "remark",
    proplabel: "备注",
    wh: "300"
  },
  {
    propkey: "orgname",
    proplabel: "机构",
    wh: "200"
  }
];
const correctVehicleReportTableHeader = [
  {
    propkey: "redate",
    proplabel: "日期",
    wh: "120"
  },
  {
    propkey: "platenumber",
    proplabel: "车牌",
    wh: "120"
  },
  {
    propkey: "exitdate",
    proplabel: "出口时间",
    wh: "200"
  },
  {
    propkey: "enterdate",
    proplabel: "入口时间",
    wh: "200"
  },
  {
    propkey: "enterstation",
    proplabel: "入口站及编码",
    wh: "150"
  },
  {
    propkey: "enterlaneid",
    proplabel: "入口车道",
    wh: "200"
  },
  {
    propkey: "enterroad",
    proplabel: "入口单位",
    wh: "150"
  },
  {
    propkey: "cardnumber",
    proplabel: "卡号",
    wh: "100"
  },
  {
    propkey: "cartrucktype",
    proplabel: "车型",
    wh: "100"
  },
  {
    propkey: "vehicletypedesc",
    proplabel: "车种",
    wh: "100"
  },
  {
    propkey: "impropertypedesc",
    proplabel: "逃费方式",
    wh: "100"
  },
  {
    propkey: "payment",
    proplabel: "补缴金额(元)",
    wh: "120"
  },
  {
    propkey: "remark",
    proplabel: "备注",
    wh: "300"
  },
  {
    propkey: "orgname",
    proplabel: "机构",
    wh: "150"
  }
];
const leaveRecordReportTableHeader = [
  {
    propkey: "outworkusername",
    proplabel: "离岗人员",
    wh: "90"
  },
  {
    propkey: "outworkdate",
    proplabel: "离岗时间",
    wh: "220"
  },
  {
    propkey: "returnworktime",
    proplabel: "归岗时间",
    wh: "220"
  },
  {
    propkey: "outworkduration",
    proplabel: "离岗时长",
    wh: "150"
  },
  {
    propkey: "remark",
    proplabel: "离岗原因",
    wh: "400"
  },
  {
    propkey: "replacelanedesc",
    proplabel: "车道号",
    wh: "120"
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
    wh: "200"
  }
];
const changeShiftsReportTableHeader = [
  {
    propkey: "curworkusername",
    proplabel: "交班负责人",
    wh: "200"
  },
  {
    propkey: "nextworkusername",
    proplabel: "接班负责人",
    wh: "150"
  },
  {
    propkey: "workdesc",
    proplabel: "交接班事宜",
    wh: "300"
  },
  {
    propkey: "curworknotes",
    proplabel: "当班情况记录",
    wh: "300"
  },
  {
    propkey: "inspectnotes",
    proplabel: "上级机关检查情况",
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
    wh: "120"
  }
];
const videoTranrecReportTableHeader = [
  {
    propkey: "transfername",
    proplabel: "抽调人员",
    wh: "200"
  },
  {
    propkey: "transferdepartment",
    proplabel: "所属单位/部门",
    wh: "200"
  },
  {
    propkey: "transferinfo",
    proplabel: "抽调录像内容",
    wh: "300"
  },
  {
    propkey: "transferpurdesc",
    proplabel: "抽调目的描述",
    wh: "300"
  },
  {
    propkey: "username",
    proplabel: "记录人员",
    wh: "150"
  },
  {
    propkey: "redate",
    proplabel: "记录时间",
    wh: "220"
  },
  {
    propkey: "orgname",
    proplabel: "机构",
    wh: "200"
  }
];
const complaintReportTableHeader = [
  {
    propkey: "complaintname",
    proplabel: "投诉人员姓名",
    wh: "120"
  },
  {
    propkey: "complaintphone",
    proplabel: "联系方式",
    wh: "150"
  },
  {
    propkey: "complaintdate",
    proplabel: "接到投诉时间",
    wh: "200"
  },
  {
    propkey: "leadname",
    proplabel: "负责人",
    wh: "120"
  },
  {
    propkey: "complaintinfo",
    proplabel: "投诉事件内容",
    wh: "500"
  },
  {
    propkey: "handlingdesc",
    proplabel: "处理方式及结果",
    wh: "500"
  },
  {
    propkey: "feedbackinfo",
    proplabel: "反馈情况",
    wh: "500"
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
    wh: "120"
  }
];
const potralNotesReportTableHeader = [
  {
    propkey: "roomtemp",
    proplabel: "室温",
    wh: "200"
  },
  {
    propkey: "roomhum",
    proplabel: "湿度",
    wh: "200"
  },
  {
    propkey: "redate",
    proplabel: "记录时间",
    wh: "220"
  },
  {
    propkey: "remark",
    proplabel: "值班记录",
    wh: "500"
  },
  {
    propkey: "username",
    proplabel: "记录人员",
    wh: "200"
  },
  {
    propkey: "orgname",
    proplabel: "机构",
    wh: "200"
  }
];
const correctVehicleTotalReportTableHeader = [];
export {
  abnormalCarReportTableHeader,
  dutyReportTableHeader,
  freeCarReportTableHeader,
  bulkyCarReportTableHeader,
  vehicleDetailsReportTableHeader,
  correctVehicleReportTableHeader,
  leaveRecordReportTableHeader,
  changeShiftsReportTableHeader,
  videoTranrecReportTableHeader,
  complaintReportTableHeader,
  potralNotesReportTableHeader,
  correctVehicleTotalReportTableHeader
};
