import Vue from "vue";
import Vuex from "vuex";
import GlobalState from "./modules/global";

import DutyRecord from "./modules/worknotes/dutyrecord";
import ChangeShift from "./modules/worknotes/changeshift";
import ConstructionMaintenance from "./modules/worknotes/constructionMaintenance";
import videoDraftRecord from "./modules/worknotes/videodraftrecord";
import Complaint from "./modules/worknotes/complaint";
import TollerLane from "./modules/worknotes/tollerlane";
import LeaveRecord from "./modules/worknotes/leaverecord";
import PatrolNotes from "./modules/worknotes/patrolnotes";
import TollDiscipline from "./modules/worknotes/tolldiscipline";

import AbnormalCar from "./modules/vechile/abnormalcar";
import Tabs from "./modules/vechile/abnormalcar/index";
import BulkyCar from "./modules/vechile/bulkycar";
import FreeCar from "./modules/vechile/freecar";
import UserManagement from "./modules/settings/usermanagement";

import AbnormalCarReport from "./modules/report/abnormalcarreport";
import BulkyCarReport from "./modules/report/bulkycarreport";
import CheckChargeReport from "./modules/report/checkchargereport";
import ComplaintReport from "./modules/report/complaintreport";
import ChangeShiftsReport from "./modules/report/changeshiftsreport";
import CorrectVehicleReport from "./modules/report/correctvehiclereport";
import CorrectVehicleTotalReport from "./modules/report/correctvehicletotalreport";
import DutyReport from "./modules/report/dutyreport";
import FreeCarReport from "./modules/report/freecarreport";
import LeaveRecordReport from "./modules/report/leaverecordreport";
import PotralNotesReport from "./modules/report/potralnotesreport";
import VehicleDetailsReport from "./modules/report/vehicledetailsreport";
import VideoTranrecReport from "./modules/report/videotranrecreport";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    GlobalState,
    DutyRecord,
    ChangeShift,
    ConstructionMaintenance,
    videoDraftRecord,
    Complaint,
    TollerLane,
    LeaveRecord,
    PatrolNotes,
    TollDiscipline,
    AbnormalCar,
    BulkyCar,
    FreeCar,
    UserManagement,
    AbnormalCarReport,
    BulkyCarReport,
    CheckChargeReport,
    ComplaintReport,
    ChangeShiftsReport,
    CorrectVehicleReport,
    CorrectVehicleTotalReport,
    DutyReport,
    FreeCarReport,
    LeaveRecordReport,
    PotralNotesReport,
    VehicleDetailsReport,
    VideoTranrecReport,
    Tabs: Tabs.tabs
  }
});
