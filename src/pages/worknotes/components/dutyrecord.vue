<template>
  <div class="dutyrecord_page">
    <base-dialog
      :message="'是否保存当前值班记录'"
      @toggle="toggle"
      @confirm="confirm"
      :dialogVisible="dialogVisible"
    ></base-dialog>
    <div slot="header" class="clearfix">
      <span>值班工作记录</span>
      <el-button @click="save" style="float: right; padding: 3px 0" type="text"
        >保存按钮</el-button
      >
    </div>
    <div>
      <el-form>
        <el-row :gutter="15">
          <el-col :span="6">
            <el-form-item label="机构">
              <el-select
                v-model="dutyFormdata.jkorgid"
                disabled
                placeholder="请选择"
              >
                <el-option
                  v-for="item in orgList"
                  :key="item.orgid"
                  :label="item.orgname"
                  :value="item.orgid"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="天气">
              <el-select
                v-model="dutyFormdata.dutyweather"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in weatherLabel"
                  :key="item"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="班次">
              <el-select v-model="dutyFormdata.jkshiftid" placeholder="请选择">
                <el-option
                  v-for="item in workShiftList"
                  :key="item.workshiftid"
                  :label="item.workshiftdesc + item.shifttime"
                  :value="item.workshiftid"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="班组">
              <el-select
                v-model="dutyFormdata.jkworkgroupid"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in workGroupList"
                  :key="item.workgroupid"
                  :label="item.workgroupdesc"
                  :value="item.workgroupid"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col :span="6">
            <el-form-item label="班长">
              <el-select
                v-model="dutyFormdata.jkmonitorid"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in classMonitorList"
                  :key="item.userid"
                  :label="item.username"
                  :value="item.userid"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="班组成员">
              <el-select
                v-model="workGroupMember"
                multiple
                placeholder="请选择"
              >
                <el-option
                  v-for="item in curWorkGroupMember"
                  :key="item.userid"
                  :label="item.username"
                  :value="item.username"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col :span="24">
            <el-form-item label="值班记录">
              <el-input
                type="textarea"
                @focus="setInitTime"
                @keyup.enter.native="textareaMonitor"
                :rows="15"
                v-model="dutyFormdata.dutyrecord"
              >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-collapse v-model="activeNames" @change="handleExpand">
      <el-collapse-item name="1">
        <template slot="title">
          <div style="font-size: 16px;">数据列表</div>
        </template>
        <base-table
          :propLabel="dutyTableLabel"
          :list="dutyRecordList"
          :parseItem="['dutyrecord']"
        >
        </base-table>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import BaseTable from "../../../components/table/baseshifttable";
import BaseDialog from "../../../components/dialog/basedialog";
import { dutyMixins } from "../mixins/dutyrecord";
import { mapState, mapActions } from "vuex";
// const a = import("../../vehicle_parts/components/XInput.js");
export default {
  name: "",
  mixins: [dutyMixins],
  data() {
    return {
      test: "111111",
      orgList: [],
      activeNames: [],
      workShiftList: [],
      workGroupList: [],
      workGroupMember: [],
      dutyFormdata: {
        dutyid: "",
        jkorgid: "",
        dutyweather: "晴",
        jkshiftid: "",
        jkworkgroupid: "",
        jkmonitorid: "",
        jkworkgroupmember: "",
        dutyrecord: ""
      },
      dialogVisible: false
    };
  },
  components: {
    BaseTable,
    BaseDialog
  },
  mounted() {
    // 获取缓存中的orglist
    this.getOrgList();
    // 设置默认选中站
    this.setOrgDefaultValue();
    // 获取缓存中值班班次列表
    this.getWorkShiftList();
    // 获取缓存中班组列表信息
    this.getWorkGroupList();
    // 获取班长列表
    this.getClassMonitorList();
    this.getDutyRecordList();
    // 获取顺序影响watch
  },
  activated() {
    // 获取所有人员
    this.getAllUserGrouptByOrgId().then(() => {
      // 获取当前值班记录
      this.getCurDutyRecord().then(res => {
        this.initCurDutyRecord(res);
      });
    });
  },
  computed: {
    ...mapState({
      height: state => state.GlobalState.height,
      weatherLabel: state => state.DutyRecord.weatherLabel,
      dutyTableLabel: state => state.DutyRecord.dutyTableLabel,
      dutyRecordList: state => state.DutyRecord.dutyRecordList,
      classMonitorList: state => state.DutyRecord.classMonitorList,
      curDutyRecord: state => state.DutyRecord.curDutyRecord,
      curWorkGroupMember: state => state.GlobalState.curWorkGroupMember
    })
  },
  methods: {
    initCurDutyRecord(e) {
      // 初始化当前值班记录信息
      let keyArr = [
        "dutyid",
        "dutyweather",
        "jkshiftid",
        "jkworkgroupid",
        "jkmonitorid",
        "dutyrecord"
      ];
      if (e && JSON.stringify(e) !== "{}") {
        this.dutyFormdata.jkorgid = e.orgid;
        keyArr.forEach(item => {
          this.dutyFormdata[item] = e[item];
        });
        keyArr = null;
        if (e.jkworkgroupmember) {
          this.workGroupMember = e.jkworkgroupmember.split(",");
        }
      } else {
        keyArr.forEach(item => {
          this.dutyFormdata[item] = "";
        });
        this.dutyFormdata.dutyweather = "晴";
      }
    },
    getOrgList() {
      this.orgList = JSON.parse(localStorage.getItem("orgList"));
    },
    getWorkShiftList() {
      this.workShiftList = JSON.parse(localStorage.getItem("workShiftList"));
    },
    handleExpand() {},
    getWorkGroupList() {
      this.workGroupList = JSON.parse(localStorage.getItem("workGroupList"));
    },
    setOrgDefaultValue() {
      this.dutyFormdata.jkorgid = JSON.parse(
        localStorage.getItem("loginInfo")
      ).jkorgid;
    },
    switchWorkGroup(e) {
      // 设置班长
      this.classMonitorList.some(item => {
        if (e === item.workgroupid) {
          this.dutyFormdata.jkmonitorid = item.userid;
          return true;
        } else {
          this.dutyFormdata.jkmonitorid = "";
        }
      });
    },
    switchWorkGroupMember(e) {
      // 设置班组成员
      this.workGroupMember = [];
      this.curWorkGroupMember.forEach(item => {
        if (e === item.workgroupid) {
          this.workGroupMember.push(item.username);
        }
      });
    },
    ...mapActions({
      getDutyRecordList: "getDutyRecordList",
      getClassMonitorList: "getClassMonitorList",
      getCurDutyRecord: "getCurDutyRecord",
      saveDutyRecord: "saveDutyRecord",
      getAllUserGrouptByOrgId: "getAllUserGrouptByOrgId"
    }),
    save() {
      this.dialogVisible = true;
    },
    toggle() {
      this.dialogVisible = !this.dialogVisible;
    },
    confirm() {
      let str = "";
      this.workGroupMember.forEach(i => {
        this.curWorkGroupMember.forEach(j => {
          if (i === j.username) {
            str += j.userid + "," + j.username + ",";
          }
        });
      });
      this.dutyFormdata.jkworkgroupmember = str;
      Object.keys(this.dutyFormdata).forEach(i => {
        if (this.dutyFormdata[i] === undefined && i !== "jkorgid") {
          this.dutyFormdata[i] = "";
        }
      });
      this.saveDutyRecord(this.dutyFormdata);
      this.toggle();
    }
  },
  watch: {
    "dutyFormdata.jkworkgroupid": {
      handler: function(e) {
        // 班组变化时切换班组成员及班长
        this.switchWorkGroup(e);
        this.switchWorkGroupMember(e);
      }
    },
    curDutyRecord: {
      handler: function(e) {
        this.initCurDutyRecord(e);
      },
      immediate: true,
      deep: true
    }
  }
};
</script>

<style scoped></style>
