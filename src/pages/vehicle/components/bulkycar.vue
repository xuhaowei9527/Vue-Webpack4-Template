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
          <el-col :span="6">
            <el-form-item label="车型">
              <el-select
                v-model="bulkyCarFormdata.vehicletypeid"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in vehicleTypeList"
                  :key="item.vehicletypeid"
                  :label="item.vehicletypedesc"
                  :value="item.vehicletypeid"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="车种">
              <el-select
                v-model="bulkyCarFormdata.vehicledescid"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in vehicleDescList"
                  :key="item.vehicledescid"
                  :label="item.cartrucktype"
                  :value="item.vehicledescid"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col :span="6">
            <el-form-item label="申报车重">
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
          <el-col :span="6">
            <el-form-item label="实际车重">
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
          <el-col :span="6">
            <el-form-item label="收费员">
              <el-select v-model="bulkyCarFormdata.tollid" placeholder="请选择">
                <el-option
                  v-for="item in tollLaneList"
                  :key="item.tollid"
                  :label="item.tollname"
                  :value="item.tollid"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="车道号">
              <el-select v-model="bulkyCarFormdata.laneid" placeholder="请选择">
                <el-option
                  v-for="item in tollLaneList"
                  :key="item.laneid"
                  :label="item.lanedesc"
                  :value="item.laneid"
                >
                </el-option>
              </el-select>
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
          <el-col :span="6">
            <el-form-item label="入口时间">
              <el-date-picker
                v-model="bulkyCarFormdata.enterdate"
                type="datetime"
                placeholder="选择日期时间"
              >
              </el-date-picker>
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
            <el-form-item label="货物名称">
              <el-input
                v-model="bulkyCarFormdata.goodsdesc"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="运输证件号">
              <el-input
                v-model="bulkyCarFormdata.certificate"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-col>
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
        <el-row :gutter="15">
          <el-col :span="6">
            <el-form-item label="出入口类型">
              <el-select
                v-model="bulkyCarFormdata.lanetype"
                placeholder="请选择"
              >
                <el-option :label="'出口'" :value="'出口'"></el-option>
                <el-option :label="'入口'" :value="'入口'"></el-option>
              </el-select>
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
      commitData: {
        methods: "add",
        data: {},
        label: "添加"
      },
      orgList: [],
      activeNames: [],
      vehicleTypeList: [],
      vehicleDescList: [],
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
        vehicletypeid: "11",
        vehicledescid: "2",
        declareweight: "",
        vehicleweight: "",
        tollid: "",
        laneid: "",
        enterstation: "",
        enterdate: "",
        exitstation: "",
        exitdate: "",
        goodsdesc: "",
        certificate: "",
        payment: "",
        dispayment: "",
        lanetype: ""
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
    // 车型车种
    this.getVehicle();
    // 车道收费员信息
    this.getTollLaneList();
  },
  activated() {
    // 从缓存中去除stationList
    this.getStationList();
  },
  computed: {
    ...mapState({
      height: state => state.GlobalState.height,
      bulkyCarTableHeader: state => state.BulkyCar.bulkyCarTableHeader,
      bulkyCarList: state => state.BulkyCar.bulkyCarList,
      page: state => state.BulkyCar.page,
      tollLaneList: state => state.TollerLane.tollLaneList
    })
  },
  methods: {
    getOrgList() {
      this.orgList = JSON.parse(localStorage.getItem("orgList"));
    },
    setOrgDefaultValue() {
      this.bulkyCarFormdata.jkorgid = JSON.parse(
        localStorage.getItem("loginInfo")
      ).jkorgid;
    },
    handleExpand() {},
    getVehicle() {
      this.vehicleTypeList = JSON.parse(
        localStorage.getItem("vehicleTypeList")
      );
      this.vehicleDescList = JSON.parse(
        localStorage.getItem("vehicleDescList")
      );
    },
    getStationList() {
      this.stationList = JSON.parse(localStorage.getItem("stationList"));
      this.enterFilterStationList = this.stationList;
      this.exitFilterStationList = this.stationList;
    },
    ...mapActions({
      getBulkyCarList: "getBulkyCarList",
      getTollLaneList: "getTollLaneList",
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
      this.setCurrentPage(e);
      this.getBulkyCarList();
    },
    changeCurPage(e) {
      this.setPageSize(e);
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
      this.bulkyCarFormdata.vehicletypeid = "11";
      this.bulkyCarFormdata.vehicledescid = "2";
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
    "bulkyCarFormdata.tollid": {
      handler: function(val) {
        if (val) {
          this.tollLaneList.forEach(item => {
            if (item.tollid === val) {
              this.bulkyCarFormdata.laneid = item.laneid;
            }
          });
        }
      },
      immediate: true,
      deep: true
    },
    "bulkyCarFormdata.laneid": {
      handler: function(val) {
        if (val) {
          this.tollLaneList.forEach(item => {
            if (item.laneid === val) {
              this.bulkyCarFormdata.tollid = item.tollid;
            }
          });
        }
      },
      immediate: true,
      deep: true
    },
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
