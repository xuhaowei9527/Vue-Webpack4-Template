const stationMenu = [
  {
    title: "工作记录",
    hasChild: true,
    routekey: "MainLayout/WorkNotes",
    iconClass: "el-icon-document",
    child: [
      {
        title: "值班工作记录",
        routekey: "MainLayout/WorkNotes/DutyRecord"
      },
      {
        title: "交接班记录",
        routekey: "MainLayout/WorkNotes/ChangeShift"
      },
      {
        title: "收费员离岗记录",
        routekey: "MainLayout/WorkNotes/LeaveRecord"
      },
      {
        title: "收费员违纪记录",
        routekey: "MainLayout/WorkNotes/TollDiscipline"
      },
      {
        title: "收费员当班记录",
        routekey: "MainLayout/WorkNotes/TollerLane"
      }
    ]
  },
  {
    title: "车辆记录",
    hasChild: true,
    routekey: "MainLayout/Vehicle",
    iconClass: "el-icon-printer",
    child: [
      {
        title: "非正常车辆记录",
        hasChild: true,
        routekey: "MainLayout/Vehicle/AbnormalCar",
        iconClass: "el-icon-printer",
        child: [
          {
            title: "纠正车型",
            hasChild: false,
            routekey: "MainLayout/Vehicle/AbnormalCar",
            iconClass: "el-icon-printer"
          }
        ]
      },
      {
        title: "大件车辆记录",
        hasChild: false,
        iconClass: "el-icon-printer",
        routekey: "MainLayout/Vehicle/BulkyCar"
      },
      {
        title: "免费车辆记录",
        hasChild: false,
        iconClass: "el-icon-printer",
        routekey: "MainLayout/Vehicle/FreeCar"
      }
    ]
  },
  {
    title: "报表打印",
    hasChild: true,
    routekey: "MainLayout/Report",
    iconClass: "el-icon-setting",
    child: [
      {
        title: "值班日志报表",
        routekey: "MainLayout/Report/DutyRecordReport"
      },
      {
        title: "稽查收费日报表",
        routekey: "MainLayout/Report/CheckChargeReport"
      },
      {
        title: "稽查车辆信息日报表",
        routekey: "MainLayout/Report/VehicleDetailsReport"
      },
      {
        title: "稽查纠正车型日报表",
        routekey: "MainLayout/Report/CorrectVehicleReport"
      },
      {
        title: "纠正车型治理汇总报表",
        routekey: "MainLayout/Report/CorrectVehicleTotalReport"
      },
      {
        title: "大件车辆报表",
        routekey: "MainLayout/Report/BulkyCarReport"
      },
      {
        title: "非正常车辆报表",
        routekey: "MainLayout/Report/AbnormalCarReport"
      },
      {
        title: "免费车辆日报表",
        routekey: "MainLayout/Report/FreeCarReport"
      },
      {
        title: "离岗记录报表",
        routekey: "MainLayout/Report/LeaveRecordReport"
      },
      {
        title: "交接班报表",
        routekey: "MainLayout/Report/ChangeShiftReport"
      },
      {
        title: "巡查异常报表",
        routekey: "MainLayout/Report/PotralNotesReport"
      },
      {
        title: "录像抽调报表",
        routekey: "MainLayout/Report/VideoTranrecReport"
      },
      {
        title: "投诉处理报表",
        routekey: "MainLayout/Report/ComplaintReport"
      }
    ]
  }
];
const centerMenu = [
  {
    title: "工作记录",
    hasChild: true,
    routekey: "MainLayout/WorkNotes",
    iconClass: "el-icon-document",
    child: [
      {
        title: "值班工作记录",
        routekey: "MainLayout/WorkNotes/DutyRecord"
      },
      {
        title: "交接班记录",
        routekey: "MainLayout/WorkNotes/ChangeShift"
      },
      {
        title: "施工养护记录",
        routekey: "MainLayout/WorkNotes/ConstructionMaintenance"
      },
      {
        title: "录像抽调记录",
        routekey: "MainLayout/WorkNotes/VideoDraftRecord"
      },
      {
        title: "投诉处理记录",
        routekey: "MainLayout/WorkNotes/Complaint"
      },
      {
        title: "巡查异常记录",
        routekey: "MainLayout/WorkNotes/PatrolNotes"
      }
    ]
  },
  {
    title: "报表打印",
    hasChild: true,
    routekey: "MainLayout/Report",
    iconClass: "el-icon-setting",
    child: [
      {
        title: "值班日志报表",
        routekey: "MainLayout/Report/DutyRecordReport"
      },
      {
        title: "稽查收费日报表",
        routekey: "MainLayout/Report/CheckChargeReport"
      },
      {
        title: "稽查车辆信息日报表",
        routekey: "MainLayout/Report/VehicleDetailsReport"
      },
      {
        title: "稽查纠正车型日报表",
        routekey: "MainLayout/Report/CorrectVehicleReport"
      },
      {
        title: "纠正车型治理汇总报表",
        routekey: "MainLayout/Report/CorrectVehicleTotalReport"
      },
      {
        title: "大件车辆报表",
        routekey: "MainLayout/Report/BulkyCarReport"
      },
      {
        title: "非正常车辆报表",
        routekey: "MainLayout/Report/AbnormalCarReport"
      },
      {
        title: "免费车辆日报表",
        routekey: "MainLayout/Report/FreeCarReport"
      },
      {
        title: "离岗记录报表",
        routekey: "MainLayout/Report/LeaveRecordReport"
      },
      {
        title: "交接班报表",
        routekey: "MainLayout/Report/ChangeShiftReport"
      },
      {
        title: "巡查异常报表",
        routekey: "MainLayout/Report/PotralNotesReport"
      },
      {
        title: "录像抽调报表",
        routekey: "MainLayout/Report/VideoTranrecReport"
      },
      {
        title: "投诉处理报表",
        routekey: "MainLayout/Report/ComplaintReport"
      }
    ]
  },
  {
    title: "系统设置",
    hasChild: true,
    routekey: "MainLayout/Settings",
    iconClass: "el-icon-setting",
    child: [
      {
        title: "用户管理",
        routekey: "MainLayout/Settings/UserManagement"
      }
    ]
  }
];
export { stationMenu, centerMenu };
