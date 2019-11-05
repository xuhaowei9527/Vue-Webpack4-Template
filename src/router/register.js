// 值班记录
const WorkNotesLayoutPage = () =>
  import(
    /* webpackChunkName: "WorkNotes1" */ "@/pages/worknotes/worknoteslayout.vue"
  );
const DutyRecordPage = () =>
  import(
    /* webpackChunkName: "WorkNotes1" */ "@/pages/worknotes/components/dutyrecord.vue"
  );
const ChangeShiftPage = () =>
  import(
    /* webpackChunkName: "WorkNotes1" */ "@/pages/worknotes/components/changeshift.vue"
  );
const ConstructionMaintenancePage = () =>
  import(
    /* webpackChunkName: "WorkNotes1" */ "@/pages/worknotes/components/constructionmaintenance.vue"
  );
const LeaveRecordPage = () =>
  import(
    /* webpackChunkName: "WorkNotes1" */ "@/pages/worknotes/components/leaverecord.vue"
  );
const ComplaintPage = () =>
  import(
    /* webpackChunkName: "WorkNotes2" */ "@/pages/worknotes/components/complaint.vue"
  );
const VideoDraftRecordPage = () =>
  import(
    /* webpackChunkName: "WorkNotes2" */ "@/pages/worknotes/components/videodraftrecord.vue"
  );
const PatrolNotesPage = () =>
  import(
    /* webpackChunkName: "WorkNotes2" */ "@/pages/worknotes/components/patrolnotes.vue"
  );
const TollDisciplinePage = () =>
  import(
    /* webpackChunkName: "WorkNotes2" */ "@/pages/worknotes/components/tolldiscipline.vue"
  );
const TollerLanePage = () =>
  import(
    /* webpackChunkName: "WorkNotes2" */ "@/pages/worknotes/components/tollerlane.vue"
  );

// 车辆记录
const VehicleLayoutPage = () =>
  import(/* webpackChunkName: "Vehicle" */ "@/pages/vehicle/vehiclelayout.vue");
const AbnoramlCarPage = () =>
  import(
    /* webpackChunkName: "Vehicle" */ "@/pages/vehicle/components/abnormalcar.vue"
  );

const FreeCarPage = () =>
  import(
    /* webpackChunkName: "Vehicle" */ "@/pages/vehicle/components/freecar.vue"
  );
const BulkyCarPage = () =>
  import(
    /* webpackChunkName: "Vehicle" */ "@/pages/vehicle/components/bulkycar.vue"
  );
const AbnormalCarLayer = () =>
  import(
    /* webpackChunkName: "Vehicle" */ "@/pages/vehicle/layer/abnormalcarlayer.vue"
  );

// 报表打印
const ReportLayoutPage = () =>
  import(/* webpackChunkName: "Report1" */ "@/pages/report/reportlayout.vue");
const AbnormalCarReport = () =>
  import(
    /* webpackChunkName: "Report1" */ "@/pages/report/components/abnormalcarreport.vue"
  );
const BulkyCarReport = () =>
  import(
    /* webpackChunkName: "Report1" */ "@/pages/report/components/bulkycarreport.vue"
  );
const ChangeShiftReport = () =>
  import(
    /* webpackChunkName: "Report1" */ "@/pages/report/components/changeshiftreport.vue"
  );
const CheckChargeReport = () =>
  import(
    /* webpackChunkName: "Report1" */ "@/pages/report/components/checkchargereport.vue"
  );
const ComplaintReport = () =>
  import(
    /* webpackChunkName: "Report1" */ "@/pages/report/components/complaintreport.vue"
  );
const DutyRecordReport = () =>
  import(
    /* webpackChunkName: "Report1" */ "@/pages/report/components/dutyrecordreport.vue"
  );
const FreeCarReport = () =>
  import(
    /* webpackChunkName: "Report1" */ "@/pages/report/components/freecarreport.vue"
  );
const LeaveRecordReport = () =>
  import(
    /* webpackChunkName: "Report2" */ "@/pages/report/components/leaverecordreport.vue"
  );
const PotralNotesReport = () =>
  import(
    /* webpackChunkName: "Report2" */ "@/pages/report/components/patrolnotesreport.vue"
  );
const VehicleDetailsReport = () =>
  import(
    /* webpackChunkName: "Report2" */ "@/pages/report/components/vehicledetailsreport.vue"
  );
const VideoTranrecReport = () =>
  import(
    /* webpackChunkName: "Report2" */ "@/pages/report/components/videotranrecreport.vue"
  );
const CorrectVehicleReport = () =>
  import(
    /* webpackChunkName: "Report2" */ "@/pages/report/components/correctvehiclereport.vue"
  );
const CorrectVehicleTotalReport = () =>
  import(
    /* webpackChunkName: "Report2" */ "@/pages/report/components/correctvehicletotalreport.vue"
  );
const LoginPage = () =>
  import(/* webpackChunkName: "Login" */ "@/pages/login/login.vue");
const MainLayoutPage = () =>
  import(/* webpackChunkName: "MainLayout" */ "@/pages/layout/layout.vue");
// 用户管理页面
const SettingsLayoutPage = () =>
  import(
    /* webpackChunkName: "Settings" */ "@/pages/settings/settingslayout.vue"
  );
const UserManagementPage = () =>
  import(
    /* webpackChunkName: "Settings" */ "@/pages/settings/components/usermanagement.vue"
  );
export default {
  LoginPage,
  MainLayoutPage,
  SettingsLayoutPage,
  UserManagementPage,
  WorkNotesLayoutPage,
  DutyRecordPage,
  ChangeShiftPage,
  ConstructionMaintenancePage,
  ComplaintPage,
  LeaveRecordPage,
  VideoDraftRecordPage,
  PatrolNotesPage,
  TollDisciplinePage,
  TollerLanePage,
  VehicleLayoutPage,
  AbnormalCarLayer,
  AbnoramlCarPage,
  FreeCarPage,
  BulkyCarPage,
  ReportLayoutPage,
  AbnormalCarReport,
  BulkyCarReport,
  ChangeShiftReport,
  CheckChargeReport,
  ComplaintReport,
  DutyRecordReport,
  FreeCarReport,
  LeaveRecordReport,
  PotralNotesReport,
  VehicleDetailsReport,
  VideoTranrecReport,
  CorrectVehicleReport,
  CorrectVehicleTotalReport
};
