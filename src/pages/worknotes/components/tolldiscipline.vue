<template>
  <div class="dutyrecord_page">
    <base-dialog
      :message="'是否' + commitData.label + '收费员违纪记录'"
      @toggle="toggle"
      @confirm="confirm"
      :dialogVisible="dialogVisible"
    ></base-dialog>
    <div slot="header" class="clearfix">
      <span>收费员违纪信息记录</span>
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
                v-model="tollDisciplineFormdata.jkorgid"
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
            <el-form-item label="收费员">
              <el-select
                v-model="tollDisciplineFormdata.tollid"
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
                v-model="tollDisciplineFormdata.laneid"
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
            <el-form-item label="开始时间">
              <el-date-picker
                v-model="tollDisciplineFormdata.begintime"
                type="datetime"
                placeholder="选择日期时间"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col :span="6">
            <el-form-item label="结束时间">
              <el-date-picker
                v-model="tollDisciplineFormdata.endtime"
                type="datetime"
                placeholder="选择日期时间"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col :span="24">
            <el-form-item label="违纪内容描述">
              <el-input
                type="textarea"
                :rows="15"
                v-model="tollDisciplineFormdata.disciplinedesc"
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
          :propLabel="tollDisciplineTableHeader"
          :list="tollDisciplineList"
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
      activeNames: [],
      orgList: [],
      tollDisciplineFormdata: {
        id: "",
        jkorgid: "",
        tollid: "",
        laneid: "",
        begintime: "",
        endtime: "",
        disciplinedesc: ""
      },
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
    // 获取收费车道
    this.getLaneInfoList();
  },
  activated() {
    // 获取收费员
    this.getTollorList();
    this.getTollDisciplineList();
  },
  computed: {
    ...mapState({
      height: state => state.GlobalState.height,
      tollDisciplineTableHeader: state =>
        state.TollDiscipline.tollDisciplineTableHeader,
      tollDisciplineList: state => state.TollDiscipline.tollDisciplineList,
      page: state => state.TollDiscipline.page,
      curWorkGroupMember: state => state.GlobalState.curWorkGroupMember,
      laneInfoList: state => state.TollDiscipline.laneInfoList,
      tollorList: state => state.GlobalState.tollorList
    })
  },
  methods: {
    getOrgList() {
      this.orgList = JSON.parse(localStorage.getItem("orgList"));
    },
    setOrgDefaultValue() {
      this.tollDisciplineFormdata.jkorgid = JSON.parse(
        localStorage.getItem("loginInfo")
      ).jkorgid;
    },
    handleExpand() {},
    ...mapActions({
      getTollDisciplineList: "getTollDisciplineList",
      getAllUserGrouptByOrgId: "getAllUserGrouptByOrgId",
      commitTollDisciplineInfo: "commitTollDisciplineInfo",
      getLaneInfoList: "getLaneInfoList",
      getTollorList: "getTollorList"
    }),
    changeSize(e) {
      this.$store.commit("setSize", e);
      this.getTollDisciplineList();
    },
    changeCurPage(e) {
      this.$store.commit("setCurPage", e);
      this.getTollDisciplineList();
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
      Object.keys(this.tollDisciplineFormdata).forEach(item => {
        if (item === "jkorgid") {
          this.tollDisciplineFormdata[item] = e.orgid;
        } else {
          this.tollDisciplineFormdata[item] = e[item];
        }
      });
    },
    handleDelete(e) {
      this.save();
      this.commitData.methods = "delete";
      this.commitData.label = "删除";
      this.tollDisciplineFormdata.id = e.id;
    },
    reset() {
      this.commitData.methods = "add";
      this.commitData.label = "添加";
      Object.keys(this.tollDisciplineFormdata).forEach(item => {
        if (item === "jkorgid") {
        } else {
          this.tollDisciplineFormdata[item] = "";
        }
      });
    },
    confirm() {
      this.commitData.data = this.tollDisciplineFormdata;
      this.commitTollDisciplineInfo(this.commitData).then(() => {
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
