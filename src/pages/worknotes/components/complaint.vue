<template>
  <div class="">
    <base-dialog
      :message="'是否保存投诉处理记录'"
      @toggle="toggle"
      @confirm="confirm"
      :dialogVisible="dialogVisible"
    ></base-dialog>
    <div slot="header" class="clearfix">
      <span>投诉处理记录</span>
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
                v-model="complaintFormdata.jkorgid"
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
            <el-form-item label="投诉人姓名">
              <el-input
                v-model="complaintFormdata.complaintname"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="联系方式">
              <el-input
                v-model="complaintFormdata.complaintphone"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="接到投诉时间">
              <el-date-picker
                v-model="complaintFormdata.complaintdate"
                type="datetime"
                placeholder="选择日期时间"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col :span="6">
            <el-form-item label="负责人">
              <el-select
                v-model="complaintFormdata.leaduserid"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in leaderList"
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
            <el-form-item label="投诉事件内容">
              <el-input
                type="textarea"
                @focus="setOneTime"
                @keyup.enter.native="complaintinfoMonitor"
                :rows="4"
                v-model="complaintFormdata.complaintinfo"
              >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col :span="24">
            <el-form-item label="处理方式及结果">
              <el-input
                type="textarea"
                @focus="setTwoTime"
                @keyup.enter.native="handlingdescMonitor"
                :rows="4"
                v-model="complaintFormdata.handlingdesc"
              >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col :span="24">
            <el-form-item label="反馈情况">
              <el-input
                type="textarea"
                @focus="setThreeTime"
                @keyup.enter.native="feedbackinfoMonitor"
                :rows="4"
                v-model="complaintFormdata.feedbackinfo"
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
          :propLabel="complaintTableHeader"
          :list="complaintListByPage"
          :parseItem="['complaintinfo', 'handlingdesc', 'feedbackinfo']"
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
import { complaintMixins } from "../mixins/complaint";
import BasePagination from "../../../components/pagination/basepagination";
import { mapState, mapActions } from "vuex";
export default {
  name: "",
  mixins: [complaintMixins],
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
      complaintFormdata: {
        id: "",
        jkorgid: "",
        complaintname: "",
        complaintphone: "",
        complaintdate: "",
        leaduserid: "",
        complaintinfo: "",
        handlingdesc: "",
        feedbackinfo: ""
      },
      complaintListByPage: []
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
  },
  activated() {
    // 获取值班负责人
    this.getLeaderList();
    // 获取投诉处理列表
    this.getComplaintList().then(() => {
      this.listByPage();
    });
  },
  computed: {
    ...mapState({
      height: state => state.GlobalState.height,
      complaintTableHeader: state => state.Complaint.complaintTableHeader,
      complaintList: state => state.Complaint.complaintList,
      curWorkGroupMember: state => state.GlobalState.curWorkGroupMember,
      leaderList: state => state.Complaint.leaderList,
      page: state => state.Complaint.page
    })
  },
  methods: {
    getOrgList() {
      this.orgList = JSON.parse(localStorage.getItem("orgList"));
    },
    setOrgDefaultValue() {
      this.complaintFormdata.jkorgid = JSON.parse(
        localStorage.getItem("loginInfo")
      ).jkorgid;
    },
    handleExpand() {},
    listByPage() {
      const start = (this.page.currentPage - 1) * this.page.pageSize;
      const end = this.page.currentPage * this.page.pageSize;
      this.complaintListByPage = this.complaintList.slice(start, end);
    },
    ...mapActions({
      getLeaderList: "getLeaderList",
      getComplaintList: "getComplaintList",
      commitComplaintInfo: "commitComplaintInfo"
    }),
    changeSize(e) {
      this.$store.commit("setSize", e);
    },
    changeCurPage(e) {
      this.$store.commit("setCurPage", e);
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
      Object.keys(this.complaintFormdata).forEach(item => {
        if (item === "jkorgid") {
          this.complaintFormdata[item] = e.orgid;
        } else {
          this.complaintFormdata[item] = e[item];
        }
      });
    },
    handleDelete(e) {
      this.save();
      this.commitData.methods = "delete";
      this.commitData.label = "删除";
      this.complaintFormdata.id = e.id;
    },
    reset() {
      this.commitData.methods = "add";
      this.commitData.label = "添加";
      Object.keys(this.complaintFormdata).forEach(item => {
        if (item === "jkorgid") {
        } else {
          this.complaintFormdata[item] = "";
        }
      });
    },
    confirm() {
      this.complaintFormdata.complaintdate = this.parseNowDateTotal(
        this.complaintFormdata.complaintdate
      );
      this.commitData.data = this.complaintFormdata;
      this.commitComplaintInfo(this.commitData).then(() => {
        this.reset();
        this.toggle();
      });
    }
  },
  watch: {
    page: {
      handler: function(e) {
        this.listByPage();
      },
      immediate: true,
      deep: true
    },
    complaintList: {
      handler: function(e) {
        this.listByPage();
      },
      immediate: true,
      deep: true
    }
  }
};
</script>

<style scoped>
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}
</style>
