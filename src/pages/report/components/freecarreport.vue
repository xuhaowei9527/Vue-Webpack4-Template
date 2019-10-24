<template>
  <div class="">
    <free-dialog
      :centerDialogVisible="freeDialogVisible"
      @toggleCenter="toggleFree"
      @choice="freeChoice"
    ></free-dialog>
    <div slot="header" class="clearfix">
      <span>免费车辆日报表</span>
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
            <el-form-item label="免费类型">
              <el-input
                v-model="freetypedesc"
                readonly
                placeholder="请输入内容"
              >
                <template slot="append">
                  <el-button
                    slot="append"
                    icon="el-icon-s-operation"
                    @click="selectFreetype"
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
      :list="freeCarReportListByPage"
      :propLabel="freeCarReportTableHeader"
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
import FreeDialog from "../../vehicle/codesnipet/freetype";
export default {
  name: "",
  mixins: [orgMixins],
  data() {
    return {
      disabled: true,
      freetypedesc: "",
      Formdata: {
        orgid: "",
        begintime: "",
        endtime: "",
        freetypeid: ""
      },
      freeDialogVisible: false,
      freeCarReportListByPage: []
    };
  },
  mounted() {},
  computed: {
    ...mapState({
      height: state => state.GlobalState.height,
      freeCarReportList: state => state.FreeCarReport.freeCarReportList,
      freeCarReportTableHeader: state =>
        state.FreeCarReport.freeCarReportTableHeader,
      page: state => state.FreeCarReport.page
    })
  },
  components: {
    BaseReportTable,
    BasePagination,
    FreeDialog
  },
  methods: {
    listByPage() {
      const start = (this.page.currentPage - 1) * this.page.pageSize;
      const end = this.page.currentPage * this.page.pageSize;
      this.freeCarReportListByPage = this.freeCarReportList.slice(start, end);
    },
    ...mapActions({
      getFreeCarReportList: "getFreeCarReportList"
    }),
    selectFreetype() {
      this.freeDialogVisible = true;
    },
    freeChoice(e) {
      this.Formdata.freetypeid = e.id;
      this.freetypedesc = e.label.trimRight();
    },
    toggleFree() {
      this.freeDialogVisible = !this.freeDialogVisible;
    },
    print() {
      const dataList = JSON.parse(JSON.stringify(this.freeCarReportList));
      /* eslint-disable-next-line */
      const header = ['车牌号', '车型', '车种', '入口站',
        "出口站",
        "出口时间",
        "免费金额",
        "收费员",
        "车道号",
        "免费类型",
        "处理说明",
        "记录人员",
        "记录时间",
        "机构"
      ];
      const columns = [
        { key: "platenumber", width: 20 },
        { key: "cartrucktype", width: 15 },
        { key: "vehicletypedesc", width: 15 },
        { key: "enterstation", width: 20 },
        { key: "exitstation", width: 20 },
        { key: "exitdate", width: 30 },
        { key: "freemoney", width: 15 },
        { key: "tollname", width: 15 },
        { key: "lanedesc", width: 15 },
        { key: "freetypedesc", width: 15 },
        { key: "handledesc", width: 50 },
        { key: "username", width: 15 },
        { key: "redate", width: 30 },
        { key: "orgname", width: 15 }
      ];
      toXlsx(
        "河北邢汾高速管理处免费车报表",
        dataList,
        header,
        columns,
        "handledesc",
        100,
        "A1:N1"
      );
    },
    search() {
      this.getFreeCarReportList(this.Formdata).then(() => {
        this.listByPage();
      });
    },
    changeSize(e) {
      this.$store.commit("setFreeCarReportSize", e);
    },
    changeCurPage(e) {
      this.$store.commit("setFreeCarReportCurPage", e);
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
    freeCarReportList: {
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
