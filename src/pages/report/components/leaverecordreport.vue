<template>
  <div class="">
    <div slot="header" class="clearfix">
      <span>离岗记录报表</span>
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
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
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
      :list="leaveRecordReportListByPage"
      :propLabel="leaveRecordReportTableHeader"
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
import BaseReportTable from "../../../components/table/basereporttable";
import BasePagination from "../../../components/pagination/basepagination";
import toXlsx from "../printmethods/normal";
import { mapState, mapActions } from "vuex";
import { orgMixins } from "../mixins/orgmixins";
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
      leaveRecordReportListByPage: []
    };
  },
  mounted() {},
  computed: {
    ...mapState({
      height: state => state.GlobalState.height,
      leaveRecordReportList: state =>
        state.LeaveRecordReport.leaveRecordReportList,
      leaveRecordReportTableHeader: state =>
        state.LeaveRecordReport.leaveRecordReportTableHeader,
      page: state => state.LeaveRecordReport.page
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
      this.leaveRecordReportListByPage = this.leaveRecordReportList.slice(
        start,
        end
      );
    },
    ...mapActions({
      getLeaveRecordReportList: "getLeaveRecordReportList"
    }),
    print() {
      const dataList = JSON.parse(JSON.stringify(this.leaveRecordReportList));
      const header = [
        "离岗人员",
        "离岗时间",
        "归岗时间",
        "离岗时长",
        "离岗原因",
        "车道号",
        "记录人员",
        "记录时间",
        "机构"
      ];
      const columns = [
        { key: "outworkusername", width: 30 },
        { key: "outworkdate", width: 30 },
        { key: "returnworktime", width: 30 },
        { key: "outworkduration", width: 15 },
        { key: "remark", width: 60 },
        { key: "replacelanedesc", width: 10 },
        { key: "username", width: 15 },
        { key: "redate", width: 30 },
        { key: "orgname", width: 20 }
      ];
      toXlsx(
        "河北邢汾高速管理处值离岗记录报表",
        dataList,
        header,
        columns,
        "remark",
        50,
        "A1:I1"
      );
    },
    search() {
      this.getLeaveRecordReportList(this.Formdata).then(() => {
        this.listByPage();
      });
    },
    changeSize(e) {
      this.$store.commit("setLeaveRecordReportSize", e);
    },
    changeCurPage(e) {
      this.$store.commit("setLeaveRecordReportCurPage", e);
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
    leaveRecordReportList: {
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
