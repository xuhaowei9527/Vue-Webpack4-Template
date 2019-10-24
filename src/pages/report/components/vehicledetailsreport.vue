<template>
  <div class="">
    <div slot="header" class="clearfix">
      <span>车辆详细信息日报表</span>
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
      :list="vehicleDetailsReportListByPage"
      :propLabel="vehicleDetailsReportTableHeader"
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
import { mapState, mapActions } from "vuex";
import toXlsx from "../printmethods/normal";
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
      vehicleDetailsReportListByPage: []
    };
  },
  mounted() {},
  computed: {
    ...mapState({
      height: state => state.GlobalState.height,
      vehicleDetailsReportList: state =>
        state.VehicleDetailsReport.vehicleDetailsReportList,
      vehicleDetailsReportTableHeader: state =>
        state.VehicleDetailsReport.vehicleDetailsReportTableHeader,
      page: state => state.VehicleDetailsReport.page
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
      this.vehicleDetailsReportListByPage = this.vehicleDetailsReportList.slice(
        start,
        end
      );
    },
    ...mapActions({
      getVehicleDetailsReportList: "getVehicleDetailsReportList"
    }),
    print() {
      const dataList = JSON.parse(
        JSON.stringify(this.vehicleDetailsReportList)
      );
      const header = [
        "日期",
        "时间",
        "车牌",
        "入口站",
        "卡号",
        "车型",
        "车种",
        "缴费类型",
        "补缴金额(元)",
        "备注",
        "机构"
      ];
      const columns = [
        { key: "date", width: 15 },
        { key: "time", width: 15 },
        { key: "platenumber", width: 20 },
        { key: "enterstation", width: 20 },
        { key: "cardnumber", width: 20 },
        { key: "cartrucktype", width: 10 },
        { key: "vehicletypedesc", width: 10 },
        { key: "impropertypedesc", width: 20 },
        { key: "payment", width: 20 },
        { key: "remark", width: 50 },
        { key: "orgname", width: 20 }
      ];
      toXlsx(
        "河北邢汾高速管理处稽查车辆详细信息日报表",
        dataList,
        header,
        columns,
        "remark",
        100,
        "A1:K1"
      );
    },
    search() {
      this.getVehicleDetailsReportList(this.Formdata).then(() => {
        this.listByPage();
      });
    },
    changeSize(e) {
      this.$store.commit("setVehicleDetailsReportSize", e);
    },
    changeCurPage(e) {
      this.$store.commit("setVehicleDetailsReportCurPage", e);
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
    vehicleDetailsReportList: {
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
