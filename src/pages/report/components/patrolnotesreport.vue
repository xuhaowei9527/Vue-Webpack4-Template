<template>
  <div class="">
    <div slot="header" class="clearfix">
      <span>巡查异常报表</span>
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
    <partol-notes-table
      :height="height - 260"
      :list="patrolNotesReportListByPage"
      :propLabel="potralNotesReportTableHeader"
    >
    </partol-notes-table>
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
import PartolNotesTable from "../../../components/table/patrolnotestable";
import BasePagination from "../../../components/pagination/basepagination";
import toXlsx from "../printmethods/patrolnotes";
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
      patrolNotesReportListByPage: []
    };
  },
  mounted() {},
  computed: {
    ...mapState({
      height: state => state.GlobalState.height,
      potralNotesReportList: state =>
        state.PotralNotesReport.potralNotesReportList,
      potralNotesReportTableHeader: state =>
        state.PotralNotesReport.potralNotesReportTableHeader,
      page: state => state.PotralNotesReport.page
    })
  },
  components: {
    PartolNotesTable,
    BasePagination
  },
  methods: {
    listByPage() {
      const start = (this.page.currentPage - 1) * this.page.pageSize;
      const end = this.page.currentPage * this.page.pageSize;
      this.patrolNotesReportListByPage = this.potralNotesReportList.slice(
        start,
        end
      );
    },
    ...mapActions({
      getPotralNotesReportList: "getPotralNotesReportList"
    }),
    print() {
      const dataList = JSON.parse(JSON.stringify(this.potralNotesReportList));
      toXlsx("河北邢汾高速管理处巡查异常报表", dataList);
    },
    search() {
      this.getPotralNotesReportList(this.Formdata).then(() => {
        this.listByPage();
      });
    },
    changeSize(e) {
      this.$store.commit("setPotralNotesReportSize", e);
    },
    changeCurPage(e) {
      this.$store.commit("setPotralNotesReportCurPage", e);
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
    potralNotesReportList: {
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
