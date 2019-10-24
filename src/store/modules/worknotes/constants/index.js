const dutyTableHeader = [
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
const weatherList = [
  "晴 ",
  "多云",
  "阴",
  "阵雨",
  "雷阵雨",
  "雨夹雪",
  "小雨",
  "中雨",
  "大雨",
  "暴雨",
  "大暴雨",
  "小雪",
  "中雪",
  "大雪",
  "雾 ",
  "沙尘暴",
  "霾"
];
const changeShiftTableHeader = [
  {
    propkey: "submitfalg",
    proplabel: "当班情况",
    wh: "90"
  },
  {
    propkey: "curworkusername",
    proplabel: "交班负责人",
    wh: "120"
  },
  {
    propkey: "nextworkusername",
    proplabel: "接班负责人",
    wh: "120"
  },
  {
    propkey: "workdesc",
    proplabel: "交接班事宜",
    wh: "700"
  },
  {
    propkey: "curworknotes",
    proplabel: "当班情况记录",
    wh: "500"
  },
  {
    propkey: "inspectnotes",
    proplabel: "上级机关检查情况",
    wh: "500"
  },
  {
    propkey: "username",
    proplabel: "记录人员",
    wh: "200"
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
const constructionMaintenanceTableHeader = [
  {
    propkey: "begindate",
    proplabel: "开始时间",
    wh: "200"
  },
  {
    propkey: "enddate",
    proplabel: "结束时间",
    wh: "200"
  },
  {
    propkey: "eventtypedesc",
    proplabel: "事件类型",
    wh: "90"
  },
  {
    propkey: "isreport",
    proplabel: "是否上报",
    wh: "90"
  },
  {
    propkey: "iscomplete",
    proplabel: "是否完成",
    wh: "90"
  },
  {
    propkey: "worksituation",
    proplabel: "工作情况",
    wh: "500"
  },
  {
    propkey: "username",
    proplabel: "记录人员",
    wh: "90"
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
const videoDraftTableHeader = [
  {
    propkey: "transfername",
    proplabel: "抽调人员",
    wh: "120"
  },
  {
    propkey: "transferdepartment",
    proplabel: "所属单位/部门",
    wh: "120"
  },
  {
    propkey: "transferinfo",
    proplabel: "抽调录像内容",
    wh: "400"
  },
  {
    propkey: "transferpurdesc",
    proplabel: "抽调目的描述",
    wh: "400"
  },
  {
    propkey: "username",
    proplabel: "记录人员",
    wh: "100"
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
const complaintTableHeader = [
  {
    propkey: "complaintname",
    proplabel: "投诉人员姓名",
    wh: "120"
  },
  {
    propkey: "complaintphone",
    proplabel: "联系方式",
    wh: "120"
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
    wh: "150"
  }
];
const leaveRecordTableHeader = [
  {
    propkey: "outworkusername",
    proplabel: "离岗人员",
    wh: "90"
  },
  {
    propkey: "replacelanedesc",
    proplabel: "车道号",
    wh: "90"
  },
  {
    propkey: "outworkdate",
    proplabel: "离岗时间",
    wh: "200"
  },
  {
    propkey: "returnworktime",
    proplabel: "归岗时间",
    wh: "200"
  },
  {
    propkey: "outworkduration",
    proplabel: "离岗时长",
    wh: "90"
  },
  {
    propkey: "remark",
    proplabel: "离岗原因",
    wh: "400"
  },
  {
    propkey: "username",
    proplabel: "记录人员",
    wh: "90"
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
const tollDisciplineTableHeader = [
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
    propkey: "begintime",
    proplabel: "开始时间",
    wh: "200"
  },
  {
    propkey: "endtime",
    proplabel: "结束时间",
    wh: "200"
  },
  {
    propkey: "disciplinedesc",
    proplabel: "违纪内容描述",
    wh: "500"
  },
  {
    propkey: "username",
    proplabel: "记录人员",
    wh: "90"
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
const tollerLineTableHeader = [
  {
    propkey: "tollname",
    proplabel: "收费员",
    wh: "500"
  },
  {
    propkey: "lanedesc",
    proplabel: "车道号",
    wh: "500"
  },
  {
    propkey: "redate",
    proplabel: "记录时间",
    wh: "500"
  }
];
export {
  dutyTableHeader,
  weatherList,
  changeShiftTableHeader,
  constructionMaintenanceTableHeader,
  videoDraftTableHeader,
  complaintTableHeader,
  leaveRecordTableHeader,
  tollDisciplineTableHeader,
  tollerLineTableHeader
};
