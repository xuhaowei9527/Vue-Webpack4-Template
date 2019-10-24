<template>
  <div class="">
    <business-dialog
      :centerDialogVisible="businessDialogVisible"
      @toggleCenter="toggleBusiness"
      @choice="businessChoice"
    ></business-dialog>
    <div slot="header" class="clearfix">
      <span>非正常车辆日报表</span>
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
          <el-col :span="6">
            <el-form-item label="业务类型">
              <el-input
                v-model="impropertypedesc"
                readonly
                placeholder="请输入内容"
              >
                <template slot="append">
                  <el-button
                    slot="append"
                    icon="el-icon-s-operation"
                    @click="selectImpropertype"
                  ></el-button>
                </template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <base-report-table
      :height="height - 260"
      :list="abnormalCarReportListByPage"
      :propLabel="abnormalCarReportTableHeader"
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
import BusinessDialog from "../../vehicle/codesnipet/businesstype";
export default {
  name: "",
  mixins: [orgMixins],
  data() {
    return {
      disabled: true,
      impropertypedesc: "",
      Formdata: {
        orgid: "",
        begintime: "",
        endtime: "",
        impropertypeid: ""
      },
      businessDialogVisible: false,
      abnormalCarReportListByPage: []
    };
  },
  mounted() {},
  computed: {
    ...mapState({
      height: state => state.GlobalState.height,
      abnormalCarReportList: state =>
        state.AbnormalCarReport.abnormalCarReportList,
      abnormalCarReportTableHeader: state =>
        state.AbnormalCarReport.abnormalCarReportTableHeader,
      page: state => state.AbnormalCarReport.page
    })
  },
  components: {
    BaseReportTable,
    BasePagination,
    BusinessDialog
  },
  methods: {
    ...mapActions({
      getAbnormalCarReportList: "getAbnormalCarReportList"
    }),
    listByPage() {
      const start = (this.page.currentPage - 1) * this.page.pageSize;
      const end = this.page.currentPage * this.page.pageSize;
      this.abnormalCarReportListByPage = this.abnormalCarReportList.slice(
        start,
        end
      );
    },
    selectImpropertype() {
      this.businessDialogVisible = true;
    },
    businessChoice(e) {
      this.Formdata.impropertypeid = e.id;
      this.impropertypedesc = e.label.trimRight();
    },
    toggleBusiness() {
      this.businessDialogVisible = !this.businessDialogVisible;
    },
    print() {
      const dataList = JSON.parse(JSON.stringify(this.abnormalCarReportList));
      /* eslint-disable-next-line */
      const header = ['车牌号', '车型', '车种', '实际车重', '超限比例', '入口站', '入口所属路段', '入口管理单位', '入口时间',
        "出口站",
        "出口所属路段",
        "出口管理单位",
        "出口时间",
        "应缴金额",
        "实缴金额",
        "补缴金额",
        "收费员",
        "车道号",
        "业务类型",
        "处理说明",
        "记录人员",
        "记录时间",
        "机构"
      ];
      const columns = [
        { key: "platenumber", width: 20 },
        { key: "cartrucktype", width: 15 },
        { key: "vehicletypedesc", width: 15 },
        { key: "vehicleweight", width: 15 },
        { key: "overweightratio", width: 15 },
        { key: "enterstation", width: 20 },
        { key: "enterroad", width: 20 },
        { key: "enterorgan", width: 20 },
        { key: "enterdate", width: 30 },
        { key: "exitstation", width: 20 },
        { key: "exitroad", width: 20 },
        { key: "exitorgan", width: 20 },
        { key: "exitdate", width: 30 },
        { key: "revpayment", width: 15 },
        { key: "payment", width: 15 },
        { key: "afterpayment", width: 15 },
        { key: "tollname", width: 15 },
        { key: "lanedesc", width: 15 },
        { key: "impropertypedesc", width: 15 },
        { key: "handledesc", width: 60 },
        { key: "userid", width: 15 },
        { key: "redate", width: 30 },
        { key: "orgname", width: 15 }
      ];
      toXlsx(
        "河北邢汾高速管理处非正常车报表",
        dataList,
        header,
        columns,
        "",
        50,
        "A1:W1"
      );
    },
    search() {
      this.getAbnormalCarReportList(this.Formdata).then(() => {
        this.listByPage();
      });
    },
    changeSize(e) {
      this.$store.commit("setAbnormalCarReportSize", e);
    },
    changeCurPage(e) {
      this.$store.commit("setAbnormalCarReportCurPage", e);
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
    abnormalCarReportList: {
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
