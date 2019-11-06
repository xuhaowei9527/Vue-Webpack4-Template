<template>
  <div class="">
    <div slot="header" class="clearfix">
      <span>大件车辆日报表</span>
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
      :list="bulkyCarReportListByPage"
      :propLabel="bulkyCarReportTableHeader"
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
      bulkyCarReportListByPage: []
    };
  },
  mounted() {},
  computed: {
    ...mapState({
      height: state => state.GlobalState.height,
      bulkyCarReportList: state => state.BulkyCarReport.bulkyCarReportList,
      bulkyCarReportTableHeader: state =>
        state.BulkyCarReport.bulkyCarReportTableHeader,
      page: state => state.BulkyCarReport.page
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
      this.bulkyCarReportListByPage = this.bulkyCarReportList.slice(start, end);
    },
    ...mapActions({
      getBulkyCarReportList: "getBulkyCarReportList"
    }),
    print() {
      const dataList = JSON.parse(JSON.stringify(this.bulkyCarReportList));
      /* eslint-disable-next-line */
      const header = ['大件车运输证号', '车牌号', '入口站', '入口所属路段', '入口管理单位',
        "出口站",
        "出口所属路段",
        "出口管理单位",
        "出口时间",
        "申报重量",
        "计重吨位",
        "实收金额",
        "减免金额",
        "货物名称",
        "记录人员",
        "记录时间",
        "机构"
      ];
      const columns = [
        { key: "certificate", width: 20 },
        { key: "platenumber", width: 20 },
        { key: "enterstation", width: 20 },
        { key: "enterroad", width: 20 },
        { key: "enterorgan", width: 20 },
        { key: "exitstation", width: 20 },
        { key: "exitroad", width: 20 },
        { key: "exitorgan", width: 20 },
        { key: "exitdate", width: 30 },
        { key: "declareweight", width: 15 },
        { key: "vehicleweight", width: 15 },
        { key: "payment", width: 15 },
        { key: "dispayment", width: 15 },
        { key: "goodsdesc", width: 15 },
        { key: "username", width: 15 },
        { key: "redate", width: 30 },
        { key: "orgname", width: 15 }
      ];
      toXlsx(
        "河北邢汾高速管理处大件车报表",
        dataList,
        header,
        columns,
        "",
        50,
        "A1:Q1"
      );
    },
    search() {
      this.getBulkyCarReportList(this.Formdata).then(() => {
        this.listByPage();
      });
    },
    changeSize(e) {
      this.$store.commit("setBulkyCarReportSize", e);
    },
    changeCurPage(e) {
      this.$store.commit("setBulkyCarReportCurPage", e);
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
    bulkyCarReportList: {
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
