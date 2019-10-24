<template>
  <div class="">
    <div slot="header" class="clearfix">
      <span>收费站纠正车型汇总报表</span>
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
    <correct-vehicle-report-table
      :height="height - 260"
      @parseList="setParseList"
      :list="correctVehicleTotalReportListByPage"
    >
    </correct-vehicle-report-table>
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
import CorrectVehicleReportTable from "../table/correctVehicleReportTable";
import BasePagination from "../../../components/pagination/basepagination";
import toXlsx from "../printmethods/correctVehicle.js";
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
      parseList: [],
      correctVehicleTotalReportListByPage: []
    };
  },
  mounted() {},
  computed: {
    ...mapState({
      height: state => state.GlobalState.height,
      correctVehicleTotalReportList: state =>
        state.CorrectVehicleTotalReport.correctVehicleTotalReportList,
      page: state => state.CorrectVehicleTotalReport.page
    })
  },
  components: {
    CorrectVehicleReportTable,
    BasePagination
  },
  methods: {
    listByPage() {
      const start = (this.page.currentPage - 1) * this.page.pageSize;
      const end = this.page.currentPage * this.page.pageSize;
      this.correctVehicleTotalReportListByPage = this.correctVehicleTotalReportList.slice(
        start,
        end
      );
    },
    setParseList(e) {
      this.parseList = e;
    },
    ...mapActions({
      getCorrectVehicleTotalReportList: "getCorrectVehicleTotalReportList"
    }),
    print() {
      toXlsx(
        "河北省高速公路邢汾管理处各收费站纠正车型治理情况汇总表",
        this.parseList
      );
    },
    search() {
      this.getCorrectVehicleTotalReportList(this.Formdata).then(() => {
        this.listByPage();
      });
    },
    changeSize(e) {
      this.$store.commit("setCorrectVehicleTotalReportSize", e);
    },
    changeCurPage(e) {
      this.$store.commit("setCorrectVehicleTotalReportCurPage", e);
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
    correctVehicleTotalReportList: {
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
