<template>
  <div class="">
    <base-dialog
      :message="message"
      @toggle="toggle"
      @confirm="confirm"
      :dialogVisible="dialogVisible"
    ></base-dialog>
    <div slot="header" class="clearfix">
      <span>交接班记录</span>
      <el-button @click="save" style="float: right; padding: 3px 0" type="text"
        >保存按钮</el-button
      >
      <el-button
        @click="off"
        style="float: right; padding: 3px 10px"
        type="text"
        >下班按钮</el-button
      >
    </div>
    <div>
      <el-form>
        <el-row :gutter="15">
          <el-col :span="6">
            <el-form-item label="机构">
              <el-select
                v-model="changeShiftFormdata.jkorgid"
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
            <el-form-item label="交班负责人">
              <el-select v-model="curWorkUser" multiple placeholder="请选择">
                <el-option
                  v-for="item in curworkUseridList"
                  :key="item.userid"
                  :label="item.username"
                  :value="item.userid"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="接班负责人">
              <el-select v-model="nextWorkUser" multiple placeholder="请选择">
                <el-option
                  v-for="item in curWorkGroupMember"
                  :key="item.userid"
                  :label="item.username"
                  :value="item.userid"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col :span="24">
            <el-form-item label="交接班事宜">
              <el-input
                type="textarea"
                :rows="5"
                readonly
                v-model="changeShiftFormdata.workdesc"
              >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col :span="24">
            <el-form-item label="当班情况记录">
              <el-input
                type="textarea"
                :rows="5"
                v-model="changeShiftFormdata.curworknotes"
              >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col :span="24">
            <el-form-item label="上级机关检查情况">
              <el-input
                type="textarea"
                :rows="5"
                v-model="changeShiftFormdata.inspectnotes"
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
          :propLabel="changeShiftTableHeader"
          :list="changeShiftList"
          :parseItem="['workdesc']"
        >
        </base-table>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import BaseTable from "../../../components/table/baseshifttable";
import BaseDialog from "../../../components/dialog/basedialog";
import { mapState, mapActions } from "vuex";
export default {
  name: "",
  data() {
    return {
      commitData: {
        methods: "add",
        data: {},
        label: "保存"
      },
      activeNames: [],
      message: "",
      messageList: ["是否保存当前交接班记录", "是否进行下班操作"],
      orgList: [],
      curLoginInfo: {},
      dialogVisible: false,
      curWorkUser: [],
      nextWorkUser: [],
      changeShiftFormdata: {
        dutyid: "",
        jkorgid: "",
        curworkuserid: "",
        nextworkuserid: "",
        workdesc: "",
        curworknotes: "",
        inspectnotes: ""
      }
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
    this.setWorkNotes();
  },
  computed: {
    ...mapState({
      height: state => state.GlobalState.height,
      curChangeShift: state => state.ChangeShift.curChangeShift,
      changeShiftList: state => state.ChangeShift.changeShiftList,
      changeShiftTableHeader: state => state.ChangeShift.changeShiftTableHeader,
      curworkUseridList: state => state.ChangeShift.curworkUseridList,
      curWorkGroupMember: state => state.GlobalState.curWorkGroupMember,
      curDutyRecord: state => state.DutyRecord.curDutyRecord
    })
  },
  activated() {
    // 获取当前交接班信息
    this.getChangeShift();
    // 获取交接班信息列表
    this.getChangeShiftList();
    // 获取当前值班记录
    this.getCurDutyRecord();
    // 获取值班班组成员列表
    this.getAllUserGrouptByOrgId();
    this.getCurworkUseridList();
  },
  methods: {
    getOrgList() {
      this.orgList = JSON.parse(localStorage.getItem("orgList"));
    },
    setOrgDefaultValue() {
      this.curLoginInfo = JSON.parse(localStorage.getItem("loginInfo"));
      this.changeShiftFormdata.jkorgid = JSON.parse(
        localStorage.getItem("loginInfo")
      ).jkorgid;
    },
    setWorkNotes() {
      const arr = [
        "养护施工  个,\n交通管制    个,\n封路    个,\n投诉处理    个,\n当班总结 :",
        "当班总结"
      ];
      if (JSON.parse(localStorage.getItem("loginInfo")).jkorgid === "1101") {
        this.changeShiftFormdata.curworknotes = arr[0];
      } else {
        this.changeShiftFormdata.curworknotes = arr[1];
      }
    },
    handleExpand() {},
    ...mapActions({
      getChangeShift: "getChangeShift",
      getChangeShiftList: "getChangeShiftList",
      getCurDutyRecord: "getCurDutyRecord",
      getAllUserGrouptByOrgId: "getAllUserGrouptByOrgId",
      getCurworkUseridList: "getCurworkUseridList",
      commitChangeShift: "commitChangeShift",
      offChangeShifts: "offChangeShifts"
    }),
    save() {
      this.commitData.methods = "add";
      this.commitData.label = "保存";
      this.message = this.messageList[0];
      this.dialogVisible = true;
    },
    off() {
      this.commitData.methods = "off";
      this.commitData.label = "下班";
      this.message = this.messageList[1];
      this.dialogVisible = true;
    },
    toggle() {
      this.dialogVisible = !this.dialogVisible;
    },
    confirm() {
      // 交班负责人
      let curstr = "";
      this.curWorkUser.forEach(i => {
        this.curworkUseridList.forEach(j => {
          if (i === j.userid) {
            curstr += j.userid + "," + j.username + ",";
          }
        });
      });
      this.changeShiftFormdata.curworkuserid = curstr;
      // 接班负责人
      let nextstr = "";
      this.nextWorkUser.forEach(i => {
        this.curWorkGroupMember.forEach(j => {
          if (i === j.userid) {
            nextstr += j.userid + "," + j.username + ",";
          }
        });
      });
      this.changeShiftFormdata.nextworkuserid = nextstr;
      this.commitData.data = this.changeShiftFormdata;
      this.commitChangeShift(this.commitData).then(() => {
        if (this.commitData.methods === "off") {
          this.offChangeShifts(this.commitData).then(() => {
            this.toggle();
            this.commitData.methods = "add";
            this.commitData.label = "保存";
            this.$router.push("/");
          });
        } else {
          this.toggle();
        }
      });
    }
  },
  watch: {
    curDutyRecord: {
      handler: function(e) {
        // 初始化当前值班记录信息
        if (e && e !== {}) {
          this.changeShiftFormdata.dutyid = e.dutyid;
          this.changeShiftFormdata.workdesc = e.dutyrecord;
        }
      },
      immediate: true
    },
    curChangeShift: {
      handler: function(e) {
        if (e && JSON.stringify(e) !== "{}") {
          // 初始化交接班信息
          const keys = ["dutyid", "workdesc", "curworknotes", "inspectnotes"];
          keys.forEach(i => {
            this.changeShiftFormdata[i] = e[i];
          });
          this.nextWorkUser = e.nextworkuserid.split(",");
          this.curWorkUser = e.curworkuserid.split(",");
        }
      },
      deep: true
    }
  }
};
</script>

<style scoped></style>
