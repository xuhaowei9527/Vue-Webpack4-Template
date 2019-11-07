<template>
  <div class="">
    <div slot="header" class="clearfix">
      <span>纠正车型报表</span>
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
      :list="correctVehicleReportListByPage"
      :propLabel="correctVehicleReportTableHeader"
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
      correctVehicleReportListByPage: []
    };
  },
  mounted() {},
  computed: {
    ...mapState({
      height: state => state.GlobalState.height,
      correctVehicleReportList: state =>
        state.CorrectVehicleReport.correctVehicleReportList,
      correctVehicleReportTableHeader: state =>
        state.CorrectVehicleReport.correctVehicleReportTableHeader,
      page: state => state.CorrectVehicleReport.page
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
      this.correctVehicleReportListByPage = this.correctVehicleReportList.slice(
        start,
        end
      );
    },
    ...mapActions({
      getCorrectVehicleReportList: "getCorrectVehicleReportList"
    }),
    print() {
      const dataList = JSON.parse(
        JSON.stringify(this.correctVehicleReportList)
      );
      const header = [
        "日期",
        "车牌",
        "出口时间",
        "入口时间",
        "入口站及编码",
        "入口车道",
        "入口单位",
        "卡号",
        "车型",
        "车种",
        "逃费方式",
        "补缴金额(元)",
        "处理说明",
        "机构"
      ];
      const columns = [
        { key: "redate", width: 30 },
        { key: "platenumber", width: 20 },
        { key: "exitdate", width: 30 },
        { key: "enterdate", width: 30 },
        { key: "enterstation", width: 40 },
        { key: "enterlaneid", width: 15 },
        { key: "enterroad", width: 20 },
        { key: "cardnumber", width: 20 },
        { key: "cartrucktype", width: 20 },
        { key: "vehicletypedesc", width: 20 },
        { key: "impropertypedesc", width: 20 },
        { key: "afterpayment", width: 20 },
        { key: "handledesc", width: 60 },
        { key: "orgname", width: 20 }
      ];
      toXlsx(
        "河北邢汾高速管理处收费稽查纠正车辆详细报表",
        dataList,
        header,
        columns,
        "remark",
        50,
        "A1:N1"
      );
    },
    search() {
      this.getCorrectVehicleReportList(this.Formdata).then(() => {
        this.listByPage();
      });
    },
    changeSize(e) {
      this.$store.commit("setCorrectVehicleReportSize", e);
    },
    changeCurPage(e) {
      this.$store.commit("setCorrectVehicleReportCurPage", e);
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
    correctVehicleReportList: {
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
