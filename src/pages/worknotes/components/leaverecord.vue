<template>
  <div class="dutyrecord_page">
    <base-dialog
      :message="'是否' + commitData.label + '离岗信息记录'"
      @toggle="toggle"
      @confirm="confirm"
      :dialogVisible="dialogVisible"
    ></base-dialog>
    <div slot="header" class="clearfix">
      <span>离岗信息记录</span>
      <el-button @click="save" style="float: right; padding: 3px 0" type="text"
        >{{ commitData.label }}按钮</el-button
      >
      <el-button
        @click="reset"
        style="float: right; padding: 3px 10px"
        type="text"
        >重置按钮</el-button
      >
    </div>
    <div>
      <el-form>
        <el-row :gutter="15">
          <el-col :span="6">
            <el-form-item label="机构">
              <el-select
                v-model="leaveRecordFormdata.jkorgid"
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
            <el-form-item label="离岗人员">
              <el-select
                v-model="leaveRecordFormdata.outworkuserid"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in tollorList"
                  :key="item.userid"
                  :label="item.username"
                  :value="item.userid"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="车道号">
              <el-select
                v-model="leaveRecordFormdata.replacelaneid"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in laneInfoList"
                  :key="item.laneid"
                  :label="item.lanedesc"
                  :value="item.laneid"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="离岗时间">
              <el-date-picker
                v-model="leaveRecordFormdata.outworkdate"
                type="datetime"
                placeholder="选择日期时间"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col :span="6">
            <el-form-item label="归岗时间">
              <el-date-picker
                v-model="leaveRecordFormdata.returnworktime"
                type="datetime"
                placeholder="选择日期时间"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="离岗时长">
              <el-input
                v-model="leaveRecordFormdata.outworkduration"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col :span="24">
            <el-form-item label="离岗原因">
              <label
                class="leave_template_label"
                v-for="(item, index) in leaveTemplate"
                :key="index"
                @click="chooseTemplate"
                >{{ item }}</label
              >
              <el-input
                type="textarea"
                :rows="15"
                v-model="leaveRecordFormdata.remark"
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
          :propLabel="leaveRecordTableHeader"
          :list="leaveRecordList"
          @handleEdit="handleEdit"
          @handleDelete="handleDelete"
        >
        </base-table>
        <base-pagination
          :page="page.currentPage"
          :total="page.total"
          :pageSize="page.pageSize"
          @changeSize="changeSize"
          @changeCurPage="changeCurPage"
        ></base-pagination>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import BaseTable from "../../../components/table/basetable";
import BaseDialog from "../../../components/dialog/basedialog";
import BasePagination from "../../../components/pagination/basepagination";
import { mapState, mapActions } from "vuex";
export default {
  name: "",
  data() {
    return {
      commitData: {
        methods: "add",
        data: {},
        label: "添加"
      },
      orgList: [],
      activeNames: [],
      leaveRecordFormdata: {
        id: "",
        jkorgid: "",
        outworkuserid: "",
        replacelaneid: "",
        outworkdate: "",
        returnworktime: "",
        outworkduration: "",
        remark: ""
      },
      leaveTemplate: [
        "吃饭",
        "厕所",
        "开会",
        "演练",
        "打扫卫生",
        "换卡换票",
        "去办公室",
        "其他"
      ],
      dialogVisible: false
    };
  },
  components: {
    BaseTable,
    BaseDialog,
    BasePagination
  },
  mounted() {
    // 获取缓存中的orglist
    this.getOrgList();
    // 设置默认选中站
    this.setOrgDefaultValue();
    // 获取所有人员
    this.getAllUserGrouptByOrgId();
    this.getLaneInfoList();
  },
  activated() {
    // 获取收费员
    this.getTollorList();
    this.getLeaveRecordList();
  },
  computed: {
    ...mapState({
      height: state => state.GlobalState.height,
      leaveRecordTableHeader: state => state.LeaveRecord.leaveRecordTableHeader,
      leaveRecordList: state => state.LeaveRecord.leaveRecordList,
      page: state => state.LeaveRecord.page,
      curWorkGroupMember: state => state.GlobalState.curWorkGroupMember,
      laneInfoList: state => state.TollerLane.laneInfoList,
      tollorList: state => state.GlobalState.tollorList
    })
  },
  methods: {
    getOrgList() {
      this.orgList = JSON.parse(localStorage.getItem("orgList"));
    },
    setOrgDefaultValue() {
      this.leaveRecordFormdata.jkorgid = JSON.parse(
        localStorage.getItem("loginInfo")
      ).jkorgid;
    },
    handleExpand() {},
    ...mapActions({
      getLeaveRecordList: "getLeaveRecordList",
      commitLeaveRecordInfo: "commitLeaveRecordInfo",
      getAllUserGrouptByOrgId: "getAllUserGrouptByOrgId",
      getLaneInfoList: "getLaneInfoList",
      getTollorList: "getTollorList"
    }),
    changeSize(e) {
      this.$store.commit("setSize", e);
      this.getLeaveRecordList();
    },
    changeCurPage(e) {
      this.$store.commit("setCurPage", e);
      this.getLeaveRecordList();
    },
    chooseTemplate(e) {
      this.leaveRecordFormdata.remark = this.leaveRecordFormdata.remark.concat(
        e.target.innerHTML
      );
    },
    save() {
      this.dialogVisible = true;
    },
    toggle() {
      this.dialogVisible = !this.dialogVisible;
    },
    handleEdit(e) {
      this.commitData.methods = "update";
      this.commitData.label = "编辑";
      Object.keys(this.leaveRecordFormdata).forEach(item => {
        if (item === "jkorgid") {
          this.leaveRecordFormdata[item] = e.orgid;
        } else {
          this.leaveRecordFormdata[item] = e[item];
        }
      });
    },
    handleDelete(e) {
      this.save();
      this.commitData.methods = "delete";
      this.commitData.label = "删除";
      this.leaveRecordFormdata.id = e.id;
    },
    reset() {
      this.commitData.methods = "add";
      this.commitData.label = "添加";
      Object.keys(this.leaveRecordFormdata).forEach(item => {
        if (item === "jkorgid") {
        } else {
          this.leaveRecordFormdata[item] = "";
        }
      });
    },
    confirm() {
      this.leaveRecordFormdata.outworkdate = this.parseNowDateTotal(
        this.leaveRecordFormdata.outworkdate
      );
      this.leaveRecordFormdata.returnworktime = this.parseNowDateTotal(
        this.leaveRecordFormdata.returnworktime
      );
      this.commitData.data = this.leaveRecordFormdata;
      this.commitLeaveRecordInfo(this.commitData).then(() => {
        this.reset();
        this.toggle();
      });
    }
  },
  watch: {
    "leaveRecordFormdata.outworkdate": {
      handler: function(e) {
        if (e && e != null) {
          if (
            this.leaveRecordFormdata.returnworktime &&
            this.leaveRecordFormdata.returnworktime != null
          ) {
            if (
              this.leaveRecordFormdata.returnworktime.getTime() - e.getTime() >
              0
            ) {
              this.leaveRecordFormdata.outworkduration =
                parseInt(
                  (this.leaveRecordFormdata.returnworktime.getTime() -
                    e.getTime()) /
                    60000
                ) + "";
            }
          }
        }
      },
      immediate: true
    },
    "leaveRecordFormdata.returnworktime": {
      handler: function(e) {
        if (e && e != null) {
          if (
            this.leaveRecordFormdata.outworkdate &&
            this.leaveRecordFormdata.outworkdate != null
          ) {
            if (
              e.getTime() - this.leaveRecordFormdata.outworkdate.getTime() >
              0
            ) {
              this.leaveRecordFormdata.outworkduration =
                parseInt(
                  (e.getTime() -
                    this.leaveRecordFormdata.outworkdate.getTime()) /
                    60000
                ) + "";
            }
          }
        }
      },
      immediate: true
    }
  }
};
</script>

<style scoped>
.leave_template_label {
  cursor: pointer;
  width: 100px;
  line-height: 30px;
  text-align: center;
  padding: 5px 5px 5px 5px;
  margin: 5px 5px 5px 5px;
  border: 1px solid #e0e0e0;
  border-radius: 3px;
}
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}
</style>
