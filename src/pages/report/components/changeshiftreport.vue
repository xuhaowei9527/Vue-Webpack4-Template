<template>
  <div class="">
    <div slot="header" class="clearfix">
      <span>交接班报表</span>
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
      :list="changeShiftsReportListByPage"
      :propLabel="changeShiftsReportTableHeader"
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
      changeShiftsReportListByPage: []
    };
  },
  mounted() {},
  computed: {
    ...mapState({
      height: state => state.GlobalState.height,
      changeShiftsReportList: state =>
        state.ChangeShiftsReport.changeShiftsReportList,
      changeShiftsReportTableHeader: state =>
        state.ChangeShiftsReport.changeShiftsReportTableHeader,
      page: state => state.ChangeShiftsReport.page
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
      this.changeShiftsReportListByPage = this.changeShiftsReportList.slice(
        start,
        end
      );
    },
    ...mapActions({
      getChangeShiftsReportList: "getChangeShiftsReportList"
    }),
    print() {
      const dataList = JSON.parse(JSON.stringify(this.changeShiftsReportList));
      const header = [
        "交班负责人",
        "接班负责人",
        "交接班事宜",
        "当班情况记录",
        "上级机关检查情况",
        "记录人员",
        "记录时间",
        "机构"
      ];
      const columns = [
        { key: "curworkusername", width: 30 },
        { key: "nextworkusername", width: 30 },
        { key: "workdesc", width: 60 },
        { key: "curworknotes", width: 60 },
        { key: "inspectnotes", width: 60 },
        { key: "username", width: 15 },
        { key: "redate", width: 30 },
        { key: "orgname", width: 20 }
      ];
      toXlsx(
        "河北邢汾高速管理处值交接班记录报表",
        dataList,
        header,
        columns,
        ["workdesc", "curworknotes", "inspectnotes"],
        100,
        "A1:H1"
      );
    },
    search() {
      this.getChangeShiftsReportList(this.Formdata).then(() => {
        this.listByPage();
      });
    },
    changeSize(e) {
      this.$store.commit("setChangeShiftsReportSize", e);
    },
    changeCurPage(e) {
      this.$store.commit("setChangeShiftsReportCurPage", e);
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
    changeShiftsReportList: {
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
