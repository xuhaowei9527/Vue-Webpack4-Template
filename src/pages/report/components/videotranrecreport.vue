<template>
  <div class="">
    <div slot="header" class="clearfix">
      <span>录像抽调报表</span>
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
    <base-picture-table
      :height="height - 260"
      :propLabel="videoTranrecReportTableHeader"
      :list="videoTranrecReportList"
    >
    </base-picture-table>
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
import BasePictureTable from "../../../components/table/basepicturereporttable";
import BasePagination from "../../../components/pagination/basepagination";
import toXlsx from "../printmethods/videotranc";
import { mapState, mapActions } from "vuex";
import { orgMixins } from "../mixins/orgmixins";
// const { toXlsx } = require('../printmethods/videotranc')
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
      videoTranrecReportListByPage: []
    };
  },
  mounted() {},
  computed: {
    ...mapState({
      height: state => state.GlobalState.height,
      videoTranrecReportList: state =>
        state.VideoTranrecReport.videoTranrecReportList,
      videoTranrecReportTableHeader: state =>
        state.VideoTranrecReport.videoTranrecReportTableHeader,
      page: state => state.VideoTranrecReport.page
    })
  },
  components: {
    BasePictureTable,
    BasePagination
  },
  methods: {
    listByPage() {
      const start = (this.page.currentPage - 1) * this.page.pageSize;
      const end = this.page.currentPage * this.page.pageSize;
      this.videoTranrecReportListByPage = this.videoTranrecReportList.slice(
        start,
        end
      );
    },
    ...mapActions({
      getVideoTranrecReportList: "getVideoTranrecReportList"
    }),
    print() {
      const dataList = JSON.parse(JSON.stringify(this.videoTranrecReportList));
      const header = [
        "抽调人员",
        "所属单位/部门",
        "抽调录像内容",
        "抽调目的描述",
        "记录人员",
        "记录时间",
        "机构"
      ];
      const columns = [
        { key: "transfername", width: 30 },
        { key: "transferdepartment", width: 30 },
        { key: "transferinfo", width: 30 },
        { key: "transferpurdesc", width: 15 },
        { key: "username", width: 15 },
        { key: "redate", width: 30 },
        { key: "orgname", width: 20 }
      ];
      toXlsx(
        "河北邢汾高速管理处值录像抽调报表",
        dataList,
        header,
        columns,
        "",
        100,
        "A1:G1"
      );
    },
    search() {
      this.getVideoTranrecReportList(this.Formdata).then(() => {
        this.listByPage();
      });
    },
    changeSize(e) {
      this.$store.commit("setVideoTranrecReportSize", e);
    },
    changeCurPage(e) {
      this.$store.commit("setVideoTranrecReportCurPage", e);
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
    videoTranrecReportList: {
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
