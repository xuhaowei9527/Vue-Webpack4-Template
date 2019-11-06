<template>
  <div class="dutyrecord_page">
    <platenumber-dialog
      :centerDialogVisible="centerDialogVisible"
      @toggleCenter="toggleCenter"
      @choice="choice"
    ></platenumber-dialog>
    <free-dialog
      :centerDialogVisible="freeDialogVisible"
      @toggleCenter="toggleFree"
      @choice="freeChoice"
    ></free-dialog>
    <base-dialog
      :message="'是否' + commitData.label + '免费车信息记录'"
      @toggle="toggle"
      @confirm="confirm"
      :dialogVisible="dialogVisible"
    ></base-dialog>
    <div slot="header" class="clearfix">
      <span>免费车信息记录</span>
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
                v-model="freeCarFormdata.jkorgid"
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
                v-model="freeCarFormdata.platenumber"
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
                v-model="freeCarFormdata.vehicletypeid"
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
                v-model="freeCarFormdata.vehicledescid"
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
            <el-form-item label="入口站">
              <el-select
                filterable
                :filter-method="enterStationFilter"
                v-model="freeCarFormdata.enterstation"
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
            <el-form-item label="出口站">
              <el-select
                filterable
                :filter-method="exitStationFilter"
                v-model="freeCarFormdata.exitstation"
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
            <el-form-item label="出口时间">
              <el-date-picker
                v-model="freeCarFormdata.exitdate"
                type="datetime"
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
        <el-row :gutter="15">
          <el-col :span="6">
            <el-form-item label="收费员">
              <el-select v-model="freeCarFormdata.tollid" placeholder="请选择">
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
              <el-select v-model="freeCarFormdata.laneid" placeholder="请选择">
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
          <el-col :span="6">
            <el-form-item label="免费金额">
              <el-input
                v-model="freeCarFormdata.freemoney"
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
          <el-col :span="24">
            <el-form-item label="处理说明">
              <el-input
                type="textarea"
                :rows="12"
                v-model="freeCarFormdata.handledesc"
              >
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
          :propLabel="freeCarTableHeader"
          :list="freeCarList"
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
import FreeDialog from "../codesnipet/freetype";
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
      activeNames: [],
      orgList: [],
      freetypedesc: "",
      vehicleTypeList: [],
      vehicleDescList: [],
      enterFilterStationList: [],
      exitFilterStationList: [],
      stationList: [],
      // 入口站对象
      enterStation: {},
      // 出口站对象
      exitStation: {},
      freeCarFormdata: {
        id: "",
        jkorgid: "",
        platenumber: "",
        vehicletypeid: "11",
        vehicledescid: "2",
        tollid: "",
        laneid: "",
        enterstation: "",
        exitstation: "",
        exitdate: "",
        freetypeid: "",
        freemoney: "",
        handledesc: ""
      },
      dialogVisible: false,
      freeDialogVisible: false,
      centerDialogVisible: false
    };
  },
  components: {
    BaseTable,
    BaseDialog,
    BasePagination,
    FreeDialog,
    PlatenumberDialog
  },
  mounted() {
    this.getFreeCarList();
    // 获取缓存中的orglist
    this.getOrgList();
    // 设置默认选中站
    this.setOrgDefaultValue();
    // 车型车种
    this.getVehicle();
    // 车道收费员信息
    this.getTollLaneList();
    this.getStationList();
    this.DefaultOrgname = JSON.parse(
      localStorage.getItem("loginInfo")
    ).jkorgname;
    this.init();
  },
  activated() {
    this.$store.commit("resetPage");
    this.getFreeCarList();
    // 从缓存中去除stationList
    this.getStationList();
  },
  computed: {
    ...mapState({
      height: state => state.GlobalState.height,
      freeCarTableHeader: state => state.FreeCar.freeCarTableHeader,
      freeCarList: state => state.FreeCar.freeCarList,
      page: state => state.FreeCar.page,
      tollLaneList: state => state.TollerLane.tollLaneList
    })
  },
  methods: {
    init() {
      this.freeCarFormdata.exitstation = this.DefaultOrgname;
      this.findItem(this.freeCarFormdata.exitstation);
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
      this.freeCarFormdata.jkorgid = JSON.parse(
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
    changeSize(e) {
      this.setSize(e);
      this.getFreeCarList();
    },
    changeCurPage(e) {
      this.setCurPage(e);
      this.getFreeCarList();
    },
    ...mapActions({
      getFreeCarList: "getFreeCarList",
      getTollLaneList: "getTollLaneList",
      commitFreeCarInfo: "commitFreeCarInfo"
    }),
    ...mapMutations(["setCurPage", "setSize"]),
    showPlatenumberPanel() {
      this.centerDialogVisible = true;
    },
    choice(e) {
      this.freeCarFormdata.platenumber = e.trimRight();
    },
    toggleCenter() {
      this.centerDialogVisible = !this.centerDialogVisible;
    },
    selectFreetype() {
      this.freeDialogVisible = true;
    },
    freeChoice(e) {
      this.freeCarFormdata.freetypeid = e.id;
      this.freetypedesc = e.label.trimRight();
    },
    toggleFree() {
      this.freeDialogVisible = !this.freeDialogVisible;
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
      Object.keys(this.freeCarFormdata).forEach(item => {
        if (item === "jkorgid") {
          this.freeCarFormdata[item] = e.orgid;
        } else {
          this.freeCarFormdata[item] = e[item];
        }
      });
    },
    handleDelete(e) {
      this.save();
      this.commitData.methods = "delete";
      this.commitData.label = "删除";
      this.freeCarFormdata.id = e.id;
    },
    reset() {
      this.commitData.methods = "add";
      this.commitData.label = "添加";
      Object.keys(this.freeCarFormdata).forEach(item => {
        if (item === "jkorgid") {
        } else {
          this.freeCarFormdata[item] = "";
        }
      });
      this.enterStation = {};
      this.exitStation = {};
      this.freetypedesc = "";
      this.freeCarFormdata.vehicletypeid = "11";
      this.freeCarFormdata.vehicledescid = "2";
      this.init();
    },
    confirm() {
      this.commitData.data = this.freeCarFormdata;
      this.commitFreeCarInfo(this.commitData).then(() => {
        this.reset();
        this.toggle();
      });
    }
  },
  watch: {
    "freeCarFormdata.tollid": {
      handler: function(val) {
        if (val) {
          this.tollLaneList.forEach(item => {
            if (item.tollid === val) {
              this.freeCarFormdata.laneid = item.laneid;
            }
          });
        }
      },
      immediate: true,
      deep: true
    },
    "freeCarFormdata.laneid": {
      handler: function(val) {
        if (val) {
          this.tollLaneList.forEach(item => {
            if (item.laneid === val) {
              this.freeCarFormdata.tollid = item.tollid;
            }
          });
        }
      },
      immediate: true,
      deep: true
    },
    "freeCarFormdata.enterstation": {
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
    "freeCarFormdata.exitstation": {
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
