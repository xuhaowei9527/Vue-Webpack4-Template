<template>
  <div class="">
    <div slot="header" class="clearfix">
      <span>值班日志报表</span>
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
      :list="dutyRecordReportListByPage"
      :propLabel="dutyReportTableHeader"
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
      dutyRecordReportListByPage: []
    };
  },
  mounted() {},
  computed: {
    ...mapState({
      height: state => state.GlobalState.height,
      dutyRecordReportList: state => state.DutyReport.dutyRecordReportList,
      dutyReportTableHeader: state => state.DutyReport.dutyReportTableHeader,
      page: state => state.DutyReport.page
    })
  },
  components: {
    BaseReportTable,
    BasePagination
  },
  methods: {
    ...mapActions({
      getDutyRecordReportList: "getDutyRecordReportList"
    }),
    listByPage() {
      const start = (this.page.currentPage - 1) * this.page.pageSize;
      const end = this.page.currentPage * this.page.pageSize;
      this.dutyRecordReportListByPage = this.dutyRecordReportList.slice(
        start,
        end
      );
    },
    print() {
      const dataList = JSON.parse(JSON.stringify(this.dutyRecordReportList));
      const header = [
        "记录时间",
        "记录人员",
        "班次",
        "班组",
        "班组成员",
        "班长",
        "天气",
        "值班记录",
        "机构"
      ];
      const columns = [
        { key: "redate", width: 30 },
        { key: "username", width: 15 },
        { key: "workshiftdesc", width: 20 },
        { key: "workgroupdesc", width: 10 },
        { key: "jkworkgroupmember", width: 60 },
        { key: "jkmonitorname", width: 10 },
        { key: "dutyweather", width: 10 },
        { key: "dutyrecord", width: 100 },
        { key: "orgname", width: 20 }
      ];
      toXlsx(
        "河北邢汾高速管理处值班记录日报表",
        dataList,
        header,
        columns,
        "dutyrecord",
        100,
        "A1:I1"
      );
    },
    search() {
      this.getDutyRecordReportList(this.Formdata).then(() => {
        this.listByPage();
      });
    },
    changeSize(e) {
      this.$store.commit("setDutyRecordReportSize", e);
    },
    changeCurPage(e) {
      this.$store.commit("setDutyRecordReportCurPage", e);
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
    dutyRecordReportList: {
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
