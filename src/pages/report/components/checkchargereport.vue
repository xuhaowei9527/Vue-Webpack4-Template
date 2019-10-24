<template>
  <div class="">
    <div slot="header" class="clearfix">
      <span>收费稽查日报表</span>
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
    <check-charge-table
      :height="height - 260"
      :list="checkChargeReportListByPage"
    >
    </check-charge-table>
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
import CheckChargeTable from "../table/checkchargetable.vue";
import BasePagination from "../../../components/pagination/basepagination";
import toXlsx from "../printmethods/checkcharge";
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
      checkChargeReportListByPage: []
    };
  },
  mounted() {},
  computed: {
    ...mapState({
      height: state => state.GlobalState.height,
      checkChargeReportList: state =>
        state.CheckChargeReport.checkChargeReportList,
      page: state => state.CheckChargeReport.page
    })
  },
  components: {
    CheckChargeTable,
    BasePagination
  },
  methods: {
    listByPage() {
      const start = (this.page.currentPage - 1) * this.page.pageSize;
      const end = this.page.currentPage * this.page.pageSize;
      this.checkChargeReportListByPage = this.checkChargeReportList.slice(
        start,
        end
      );
    },
    ...mapActions({
      getCheckChargeReportList: "getCheckChargeReportList"
    }),
    search() {
      this.getCheckChargeReportList(this.Formdata).then(() => {
        this.listByPage();
      });
    },
    print() {
      const dataList = JSON.parse(JSON.stringify(this.checkChargeReportList));
      /* eslint-disable-next-line */
      const header1 = ['单位', '年', '月', '日', '换卡车', ,'伪卡车', ,'出口闯关车', ,'计重设备逃费', ,'绿通治理', ,'假证', ,'超时车', ,'假冒集装箱车', ,'ETC逃费', ,'J转', ,'倒货', ,'纠正车型', ,'其他', ,'汇总',]
      /* eslint-disable-next-line */
      const header2 = [,,,,, '辆次', '金额', '辆次', '金额', '辆次', '金额', '辆次', '金额', '辆次', '金额', '辆次', '金额', '辆次', '金额', '辆次', '金额', '辆次', '金额', '辆次', '金额', '辆次', '金额', '辆次', '金额', '辆次', '金额', '辆次', '金额']
      const columns = [
        { key: "orgname", width: 30 },
        { key: "year", width: 15 },
        { key: "month", width: 10 },
        { key: "day", width: 10 },
        { key: "vehicles1", width: 10 },
        { key: "payment1", width: 10 },
        { key: "vehicles2", width: 10 },
        { key: "payment2", width: 10 },
        { key: "vehicles3", width: 10 },
        { key: "payment3", width: 10 },
        { key: "vehicles4", width: 10 },
        { key: "payment4", width: 10 },
        { key: "vehicles5", width: 10 },
        { key: "payment5", width: 10 },
        { key: "vehicles6", width: 10 },
        { key: "payment6", width: 10 },
        { key: "vehicles7", width: 10 },
        { key: "payment7", width: 10 },
        { key: "vehicles8", width: 10 },
        { key: "payment8", width: 10 },
        { key: "vehicles9", width: 10 },
        { key: "payment9", width: 10 },
        { key: "vehicles10", width: 10 },
        { key: "payment10", width: 10 },
        { key: "vehicles11", width: 10 },
        { key: "payment11", width: 10 },
        { key: "vehicles12", width: 10 },
        { key: "payment12", width: 10 },
        { key: "vehicles13", width: 10 },
        { key: "payment13", width: 10 },
        { key: "vehiclesall", width: 10 },
        { key: "paymentall", width: 10 }
      ];
      toXlsx(
        "河北邢汾高速管理处收费稽查日报表",
        dataList,
        header1,
        header2,
        columns
      );
    },
    changeSize(e) {
      this.$store.commit("setCheckChargeReportSize", e);
    },
    changeCurPage(e) {
      this.$store.commit("setCheckChargeReportCurPage", e);
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
    checkChargeReportList: {
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
