<template>
  <div class="">
    <base-dialog
      :message="'是否' + commitData.label + '施工养护记录'"
      @toggle="toggle"
      @confirm="confirm"
      :dialogVisible="dialogVisible"
    ></base-dialog>
    <div slot="header" class="clearfix">
      <span>施工养护记录</span>
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
                v-model="constructionMaintenanceFormdata.jkorgid"
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
            <el-form-item label="开始时间">
              <el-date-picker
                v-model="constructionMaintenanceFormdata.begindate"
                type="datetime"
                placeholder="选择日期时间"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="结束时间">
              <el-date-picker
                v-model="constructionMaintenanceFormdata.enddate"
                type="datetime"
                placeholder="选择日期时间"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="事件类型">
              <el-select
                v-model="constructionMaintenanceFormdata.eventtypeid"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in eventTypeList"
                  :key="item.eventtypeid"
                  :label="item.eventtypedesc"
                  :value="item.eventtypeid"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col :span="6">
            <el-form-item label="是否上报">
              <el-select
                v-model="constructionMaintenanceFormdata.isreport"
                placeholder="请选择"
              >
                <el-option value="是"></el-option>
                <el-option value="否"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="是否完成">
              <el-select
                v-model="constructionMaintenanceFormdata.iscomplete"
                placeholder="请选择"
              >
                <el-option value="是"></el-option>
                <el-option value="否"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col :span="24">
            <el-form-item label="工作情况">
              <el-input
                type="textarea"
                @focus="setInitTime"
                @keyup.enter.native="textareaMonitor"
                :rows="10"
                v-model="constructionMaintenanceFormdata.worksituation"
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
          :propLabel="constructionMaintenanceTableHeader"
          :list="constructionMaintenanceList"
          :parseItem="['worksituation']"
          @handleEdit="handleEdit"
          @handleDelete="handleDelete"
        >
        </base-table>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import BaseTable from "../../../components/table/basetable";
import BaseDialog from "../../../components/dialog/basedialog";
import { constructionmaintenanceMixins } from "../mixins/constructionmaintenance";
import { mapState, mapActions } from "vuex";

export default {
  name: "",
  mixins: [constructionmaintenanceMixins],
  data() {
    return {
      commitData: {
        methods: "add",
        data: {},
        label: "添加"
      },
      activeNames: [],
      orgList: [],
      dialogVisible: false,
      constructionMaintenanceFormdata: {
        id: "",
        jkorgid: "",
        begindate: "",
        enddate: "",
        eventtypeid: "",
        isreport: "",
        iscomplete: "",
        worksituation: ""
      }
    };
  },
  components: {
    BaseTable,
    BaseDialog
  },
  mounted() {
    /* eslint-disable-next-line */
    // 获取缓存中的orglist
    this.getOrgList();
    // 设置默认选中站
    this.setOrgDefaultValue();
  },
  activated() {
    // 获取事件类型列表
    this.getEventTypeList();
    // 获取施工养护列表信息
    this.getConstructionMaintenanceList();
  },
  computed: {
    ...mapState({
      height: state => state.GlobalState.height,
      constructionMaintenanceTableHeader: state =>
        state.ConstructionMaintenance.constructionMaintenanceTableHeader,
      eventTypeList: state => state.ConstructionMaintenance.eventTypeList,
      constructionMaintenanceList: state =>
        state.ConstructionMaintenance.constructionMaintenanceList
    })
  },
  methods: {
    getOrgList() {
      this.orgList = JSON.parse(localStorage.getItem("orgList"));
    },
    setOrgDefaultValue() {
      this.constructionMaintenanceFormdata.jkorgid = JSON.parse(
        localStorage.getItem("loginInfo")
      ).jkorgid;
    },
    handleExpand() {},
    ...mapActions({
      getEventTypeList: "getEventTypeList",
      commitConstructionMaintenanceInfo: "commitConstructionMaintenanceInfo",
      getConstructionMaintenanceList: "getConstructionMaintenanceList"
    }),
    handleEdit(e) {
      this.commitData.methods = "update";
      this.commitData.label = "编辑";
      Object.keys(this.constructionMaintenanceFormdata).forEach(item => {
        if (item === "jkorgid") {
          this.constructionMaintenanceFormdata[item] = e.orgid;
        } else {
          this.constructionMaintenanceFormdata[item] = e[item];
        }
      });
    },
    handleDelete(e) {
      this.save();
      this.commitData.methods = "delete";
      this.commitData.label = "删除";
      this.constructionMaintenanceFormdata.id = e.id;
    },
    reset() {
      this.commitData.methods = "add";
      this.commitData.label = "添加";
      Object.keys(this.constructionMaintenanceFormdata).forEach(item => {
        if (item === "jkorgid") {
        } else {
          this.constructionMaintenanceFormdata[item] = "";
        }
      });
    },
    save() {
      this.dialogVisible = true;
    },
    toggle() {
      this.dialogVisible = !this.dialogVisible;
    },
    confirm() {
      this.constructionMaintenanceFormdata.begindate = this.parseNowDateTotal(
        this.constructionMaintenanceFormdata.begindate
      );
      this.constructionMaintenanceFormdata.enddate = this.parseNowDateTotal(
        this.constructionMaintenanceFormdata.enddate
      );
      this.commitData.data = this.constructionMaintenanceFormdata;
      this.commitConstructionMaintenanceInfo(this.commitData).then(() => {
        this.reset();
        this.toggle();
      });
    }
  },
  watch: {}
};
</script>

<style scoped>
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}
</style>
