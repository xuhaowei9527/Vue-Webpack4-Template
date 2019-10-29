import Vue from "vue";
import VueRouter from "vue-router";
import Register from "./register";
// import store from '../store/index'
Vue.use(VueRouter);
const childConfig = [
  {
    path: "AbnormalCarReport",
    component: Register.AbnormalCarReport
  },
  {
    path: "BulkyCarReport",
    component: Register.BulkyCarReport
  },
  {
    path: "ChangeShiftReport",
    component: Register.ChangeShiftReport
  },
  {
    path: "CheckChargeReport",
    component: Register.CheckChargeReport
  },
  {
    path: "ComplaintReport",
    component: Register.ComplaintReport
  },
  {
    path: "DutyRecordReport",
    component: Register.DutyRecordReport
  },
  {
    path: "FreeCarReport",
    component: Register.FreeCarReport
  },
  {
    path: "LeaveRecordReport",
    component: Register.LeaveRecordReport
  },
  {
    path: "PotralNotesReport",
    component: Register.PotralNotesReport
  },
  {
    path: "VehicleDetailsReport",
    component: Register.VehicleDetailsReport
  },
  {
    path: "VideoTranrecReport",
    component: Register.VideoTranrecReport
  },
  {
    path: "CorrectVehicleReport",
    component: Register.CorrectVehicleReport
  },
  {
    path: "CorrectVehicleTotalReport",
    component: Register.CorrectVehicleTotalReport
  }
];
childConfig.forEach(i => {
  Object.assign(i, {
    beforeEnter: function(to, from, next) {
      next();
    }
  });
});

export default new VueRouter({
  mode: "history",
  // base: "/PaperLess/",
  routes: [
    {
      path: "/",
      name: "LoginPage",
      component: Register.LoginPage
    },
    {
      path: "/MainLayout",
      name: "MainLayout",
      component: Register.MainLayoutPage,
      children: [
        {
          path: "WorkNotes",
          component: Register.WorkNotesLayoutPage,
          children: [
            {
              path: "DutyRecord",
              component: Register.DutyRecordPage
            },
            {
              path: "ChangeShift",
              component: Register.ChangeShiftPage
            },
            {
              path: "ConstructionMaintenance",
              component: Register.ConstructionMaintenancePage
            },
            {
              path: "VideoDraftRecord",
              component: Register.VideoDraftRecordPage
            },
            {
              path: "Complaint",
              component: Register.ComplaintPage
            },
            {
              path: "LeaveRecord",
              component: Register.LeaveRecordPage
            },
            {
              path: "PatrolNotes",
              component: Register.PatrolNotesPage
            },
            {
              path: "TollDiscipline",
              component: Register.TollDisciplinePage
            },
            {
              path: "TollerLane",
              component: Register.TollerLanePage
            }
          ]
        },
        {
          path: "Vehicle",
          component: Register.VehicleLayoutPage,
          children: [
            {
              path: "AbnormalCar",
              component: Register.AbnoramlCarPage,
              children: [
                {
                  path: "AbnormalCar",
                  component: Register.AbnoramlCarPage
                }
              ]
            },
            {
              path: "BulkyCar",
              component: Register.BulkyCarPage
            },
            {
              path: "FreeCar",
              component: Register.FreeCarPage
            }
          ]
        },
        {
          path: "Settings",
          component: Register.SettingsLayoutPage,
          children: [
            {
              path: "UserManagement",
              component: Register.UserManagementPage,
              beforeEnter: function(to, from, next) {
                console.log(to);
                next();
              }
            }
          ]
        },
        {
          path: "Report",
          component: Register.ReportLayoutPage,
          children: childConfig
        }
      ]
    }
  ]
});
