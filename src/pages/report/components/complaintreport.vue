<template>
  <div class="">
    <div slot="header" class="clearfix">
      <span>投诉处理报表</span>
      <el-button
        @click="search"
        style="float: right; padding: 3px 0"
        type="text"
        >查询按钮</el-button
      >
      <el-button
        @click="print"
        style="float: right; padding: 3px 10px"
        type="text"
        >打印按钮</el-button
      >
    </div>
    <div>
      <el-form>
        <el-row :gutter="15">
          <el-col :span="6">
            <el-form-item label="机构">
              <el-select
                v-model="Formdata.orgid"
                :disabled="disabled"
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
                v-model="Formdata.begintime"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择日期时间"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="结束时间">
              <el-date-picker
                v-model="Formdata.endtime"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择日期时间"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <base-report-table
      :height="height - 260"
      :list="complaintReportListByPage"
      :propLabel="complaintReportTableHeader"
    >
    </base-report-table>
    <base-pagination
      :page="page.currentPage"
      :total="page.total"
      :pageSize="page.pageSize"
      @changeSize="changeSize"
      @changeCurPage="changeCurPage"
    ></base-pagination>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { orgMixins } from "../mixins/orgmixins";
import BaseReportTable from "../../../components/table/basereporttable";
import BasePagination from "../../../components/pagination/basepagination";
import toXlsx from "../printmethods/normal";
export default {
  name: "",
  mixins: [orgMixins],
  data() {
    return {
      disabled: true,
      Formdata: {
        orgid: "",
        begintime: "",
        endtime: ""
      },
      complaintReportListByPage: []
    };
  },
  mounted() {},
  computed: {
    ...mapState({
      height: state => state.GlobalState.height,
      complaintReportList: state => state.ComplaintReport.complaintReportList,
      complaintReportTableHeader: state =>
        state.ComplaintReport.complaintReportTableHeader,
      page: state => state.ComplaintReport.page
    })
  },
  components: {
    BaseReportTable,
    BasePagination
  },
  methods: {
    listByPage() {
      const start = (this.page.currentPage - 1) * this.page.pageSize;
      const end = this.page.currentPage * this.page.pageSize;
      this.complaintReportListByPage = this.complaintReportList.slice(
        start,
        end
      );
    },
    ...mapActions({
      getComplaintReportList: "getComplaintReportList"
    }),
    print() {
      const dataList = JSON.parse(JSON.stringify(this.complaintReportList));
      const header = [
        "投诉人员姓名",
        "联系方式",
        "接到投诉时间",
        "负责人",
        "投诉事件内容",
        "处理方式及结果",
        "反馈情况",
        "记录人员",
        "记录时间",
        "机构"
      ];
      const columns = [
        { key: "complaintname", width: 20 },
        { key: "complaintphone", width: 20 },
        { key: "complaintdate", width: 30 },
        { key: "leadname", width: 15 },
        { key: "complaintinfo", width: 60 },
        { key: "handlingdesc", width: 60 },
        { key: "feedbackinfo", width: 60 },
        { key: "username", width: 15 },
        { key: "redate", width: 30 },
        { key: "orgname", width: 20 }
      ];
      toXlsx(
        "河北邢汾高速管理处投诉处理报表",
        dataList,
        header,
        columns,
        ["complaintinfo", "handlingdesc", "feedbackinfo"],
        100,
        "A1:J1"
      );
    },
    search() {
      this.getComplaintReportList(this.Formdata).then(() => {
        this.listByPage();
      });
    },
    changeSize(e) {
      this.$store.commit("setComplaintReportSize", e);
    },
    changeCurPage(e) {
      this.$store.commit("setComplaintReportCurPage", e);
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
    complaintReportList: {
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
