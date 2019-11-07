<template>
  <div class="dutyrecord_page">
    <platenumber-dialog
      :centerDialogVisible="centerDialogVisible"
      @toggleCenter="toggleCenter"
      @choice="choice"
    ></platenumber-dialog>
    <base-dialog
      :message="'是否' + commitData.label + '大件车信息记录'"
      @toggle="toggle"
      @confirm="confirm"
      :dialogVisible="dialogVisible"
    ></base-dialog>
    <div slot="header" class="clearfix">
      <span>大件车信息记录</span>
      <el-button @click="save" style="float: right; padding: 3px 0" type="text"
        >{{ commitData.label }}按钮</el-button
      >
      <el-button
        @click="reset"
        style="float: right; padding: 3px 10px"
        type="text"
        >重置按钮</el-button
      >
    </div>
    <div>
      <el-form>
        <el-row :gutter="15">
          <el-col :span="6">
            <el-form-item label="机构">
              <el-select
                v-model="bulkyCarFormdata.jkorgid"
                disabled
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
            <el-form-item label="车牌号码">
              <el-input
                v-model="bulkyCarFormdata.platenumber"
                placeholder="请输入内容"
              >
                <template slot="append">
                  <el-button
                    slot="append"
                    icon="el-icon-s-operation"
                    @click="showPlatenumberPanel"
                  ></el-button>
                </template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6"
            ><el-form-item label="申报车重">
              <el-input
                v-model="bulkyCarFormdata.declareweight"
                placeholder="请输入内容"
              >
                <template slot="append">
                  KG
                </template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6"
            ><el-form-item label="实际车重">
              <el-input
                v-model="bulkyCarFormdata.vehicleweight"
                placeholder="请输入内容"
              >
                <template slot="append">
                  KG
                </template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col :span="6">
            <el-form-item label="出口站">
              <el-select
                filterable
                :filter-method="exitStationFilter"
                v-model="bulkyCarFormdata.exitstation"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in exitFilterStationList"
                  :key="item.id"
                  :label="item.stationname + ' code: ' + item.id"
                  :value="item.stationname"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="出口站所属路段">
              <el-input
                v-model="exitStation.roadname"
                readonly
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="出口站所属单位">
              <el-input
                v-model="exitStation.company"
                readonly
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="出口时间">
              <el-date-picker
                v-model="bulkyCarFormdata.exitdate"
                type="datetime"
                placeholder="选择日期时间"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col :span="6">
            <el-form-item label="入口站">
              <el-select
                filterable
                :filter-method="enterStationFilter"
                v-model="bulkyCarFormdata.enterstation"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in enterFilterStationList"
                  :key="item.id"
                  :label="item.stationname + ' code: ' + item.id"
                  :value="item.stationname"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="入口站所属路段">
              <el-input
                v-model="enterStation.roadname"
                readonly
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="入口站所属单位">
              <el-input
                v-model="enterStation.company"
                readonly
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6"
            ><el-form-item label="运输证件号">
              <el-input
                v-model="bulkyCarFormdata.certificate"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col :span="6">
            <el-form-item label="实缴金额">
              <el-input
                v-model="bulkyCarFormdata.payment"
                placeholder="请输入内容"
              >
                <template slot="append">
                  元
                </template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="减免金额">
              <el-input
                v-model="bulkyCarFormdata.dispayment"
                placeholder="请输入内容"
              >
                <template slot="append">
                  元
                </template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-collapse v-model="activeNames" @change="handleExpand">
      <el-collapse-item name="1">
        <template slot="title">
          <div style="font-size: 16px;">数据列表</div>
        </template>
        <base-table
          :propLabel="bulkyCarTableHeader"
          :list="bulkyCarList"
          @handleEdit="handleEdit"
          @handleDelete="handleDelete"
        >
        </base-table>
        <base-pagination
          :currentPage="page.currentPage"
          :pageSize="page.pageSize"
          :total="page.total"
          @changeSize="changeSize"
          @changeCurPage="changeCurPage"
        >
        </base-pagination>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import BaseTable from "../../../components/table/basetable";
import BaseDialog from "../../../components/dialog/basedialog";
import { vehicleMixins } from "../mixins/index";
import PlatenumberDialog from "../../../components/dialog/platenumberdialog";
import BasePagination from "../../../components/pagination/basepagination";
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  name: "",
  mixins: [vehicleMixins],
  data() {
    return {
      defaultOrgname: "",
      commitData: {
        methods: "add",
        data: {},
        label: "添加"
      },
      orgList: [],
      activeNames: [],
      enterFilterStationList: [],
      exitFilterStationList: [],
      stationList: [],
      // 入口站对象
      enterStation: {},
      // 出口站对象
      exitStation: {},
      bulkyCarFormdata: {
        id: "",
        jkorgid: "",
        platenumber: "",
        declareweight: "",
        vehicleweight: "",
        enterstation: "",
        exitstation: "",
        exitdate: "",
        certificate: "",
        payment: "",
        dispayment: ""
      },
      dialogVisible: false,
      centerDialogVisible: false
    };
  },
  components: {
    BaseTable,
    BaseDialog,
    BasePagination,
    PlatenumberDialog
  },
  mounted() {
    this.getBulkyCarList();
    // 获取缓存中的orglist
    this.getOrgList();
    // 设置默认选中站
    this.setOrgDefaultValue();
    this.getStationList();
    this.DefaultOrgname = JSON.parse(
      localStorage.getItem("loginInfo")
    ).jkorgname;
    this.init();
  },
  activated() {
    this.$store.commit("resetPage");
    this.getBulkyCarList();
    // 从缓存中去除stationList
    this.getStationList();
  },
  computed: {
    ...mapState({
      height: state => state.GlobalState.height,
      bulkyCarTableHeader: state => state.BulkyCar.bulkyCarTableHeader,
      bulkyCarList: state => state.BulkyCar.bulkyCarList,
      page: state => state.BulkyCar.page
    })
  },
  methods: {
    init() {
      this.bulkyCarFormdata.exitstation = this.DefaultOrgname;
      this.findItem(this.bulkyCarFormdata.exitstation);
    },
    findItem(val) {
      this.stationList.forEach(item => {
        if (item.stationname.includes(val)) {
          this.exitStation = item;
        }
      });
    },
    getOrgList() {
      this.orgList = JSON.parse(localStorage.getItem("orgList"));
    },
    setOrgDefaultValue() {
      this.bulkyCarFormdata.jkorgid = JSON.parse(
        localStorage.getItem("loginInfo")
      ).jkorgid;
    },
    handleExpand() {},
    getStationList() {
      this.stationList = JSON.parse(localStorage.getItem("stationList"));
      this.enterFilterStationList = this.stationList;
      this.exitFilterStationList = this.stationList;
    },
    ...mapActions({
      getBulkyCarList: "getBulkyCarList",
      commitBulkyCarInfo: "commitBulkyCarInfo"
    }),
    ...mapMutations(["setCurPage", "setSize"]),
    showPlatenumberPanel() {
      this.centerDialogVisible = true;
    },
    choice(e) {
      this.bulkyCarFormdata.platenumber = e.trimRight();
    },
    toggleCenter() {
      this.centerDialogVisible = !this.centerDialogVisible;
    },
    changeSize(e) {
      this.setPageSize(e);
      this.getBulkyCarList();
    },
    changeCurPage(e) {
      this.setCurrentPage(e);
      this.getBulkyCarList();
    },
    save() {
      this.dialogVisible = true;
    },
    toggle() {
      this.dialogVisible = !this.dialogVisible;
    },
    handleEdit(e) {
      this.commitData.methods = "update";
      this.commitData.label = "编辑";
      Object.keys(this.bulkyCarFormdata).forEach(item => {
        if (item === "jkorgid") {
          this.bulkyCarFormdata[item] = e.orgid;
        } else {
          this.bulkyCarFormdata[item] = e[item];
        }
      });
    },
    handleDelete(e) {
      this.save();
      this.commitData.methods = "delete";
      this.commitData.label = "删除";
      this.bulkyCarFormdata.id = e.id;
    },
    reset() {
      this.commitData.methods = "add";
      this.commitData.label = "添加";
      Object.keys(this.bulkyCarFormdata).forEach(item => {
        if (item === "jkorgid") {
        } else {
          this.bulkyCarFormdata[item] = "";
        }
      });
      this.enterStation = {};
      this.exitStation = {};
      this.init();
    },
    confirm() {
      this.bulkyCarFormdata.enterroad = this.enterStation.roadname;
      this.bulkyCarFormdata.exitroad = this.exitStation.roadname;
      this.bulkyCarFormdata.enterorgan = this.enterStation.company;
      this.bulkyCarFormdata.exitorgan = this.exitStation.company;

      this.commitData.data = this.bulkyCarFormdata;
      this.commitBulkyCarInfo(this.commitData).then(() => {
        this.reset();
        this.toggle();
      });
    }
  },
  watch: {
    "bulkyCarFormdata.enterstation": {
      handler: function(val) {
        if (val) {
          this.stationList.forEach(item => {
            if (item.stationname === val) {
              this.enterStation = item;
            }
          });
        }
      },
      immediate: true,
      deep: true
    },
    "bulkyCarFormdata.exitstation": {
      handler: function(val) {
        if (val) {
          this.stationList.forEach(item => {
            if (item.stationname === val) {
              this.exitStation = item;
            }
          });
        }
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
