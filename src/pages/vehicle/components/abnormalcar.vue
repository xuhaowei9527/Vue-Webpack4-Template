<template>
  <div class="dutyrecord_page">
    <platenumber-dialog
      :centerDialogVisible="centerDialogVisible"
      @toggleCenter="toggleCenter"
      @choice="choice"
    ></platenumber-dialog>
    <business-dialog
      :centerDialogVisible="businessDialogVisible"
      @toggleCenter="toggleBusiness"
      @choice="businessChoice"
    ></business-dialog>
    <base-dialog
      :message="'是否' + commitData.label + '非正常车信息记录'"
      @toggle="toggle"
      @confirm="confirm"
      :dialogVisible="dialogVisible"
    ></base-dialog>
    <div slot="header" class="header_btn">
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
                v-model="abnormalCarFormdata.jkorgid"
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
                v-model="abnormalCarFormdata.platenumber"
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
                v-model="abnormalCarFormdata.vehicletypeid"
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
                v-model="abnormalCarFormdata.vehicledescid"
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
            <el-form-item label="实际车重">
              <el-input
                v-model="abnormalCarFormdata.vehicleweight"
                placeholder="请输入内容"
              >
                <template slot="append">
                  KG
                </template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="超限比例">
              <el-input
                v-model="abnormalCarFormdata.overweightratio"
                placeholder="请输入内容"
              >
                <template slot="append">
                  %
                </template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="收费员">
              <el-select
                v-model="abnormalCarFormdata.tollid"
                placeholder="请选择"
              >
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
              <el-select
                v-model="abnormalCarFormdata.laneid"
                placeholder="请选择"
              >
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
                v-model="abnormalCarFormdata.enterstation"
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
                v-model="abnormalCarFormdata.enterdate"
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
                v-model="abnormalCarFormdata.exitstation"
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
                v-model="abnormalCarFormdata.exitdate"
                type="datetime"
                placeholder="选择日期时间"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col :span="6">
            <el-form-item label="应缴金额">
              <el-input
                v-model="abnormalCarFormdata.revpayment"
                placeholder="请输入内容"
              >
                <template slot="append">
                  元
                </template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="实缴金额">
              <el-input
                v-model="abnormalCarFormdata.payment"
                placeholder="请输入内容"
              >
                <template slot="append">
                  元
                </template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="补缴金额">
              <el-input
                v-model="abnormalCarFormdata.afterpayment"
                placeholder="请输入内容"
              >
                <template slot="append">
                  元
                </template>
              </el-input>
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
        <el-row :gutter="15">
          <el-col :span="6">
            <el-form-item label="入口车道">
              <el-input
                :disabled="disabled"
                v-model="abnormalCarFormdata.enterlaneid"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="卡号">
              <el-input
                :disabled="disabled"
                v-model="abnormalCarFormdata.cardnumber"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="是否稽查数据">
              <el-select
                v-model="abnormalCarFormdata.jcflag"
                placeholder="请选择"
              >
                <el-option :label="'是'" :value="'1'"></el-option>
                <el-option :label="'否'" :value="'0'"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="处理说明模板">
              <el-select
                v-model="templateHandledesc"
                clearable
                placeholder="请选择"
              >
                <el-option
                  v-for="(item, index) in tmlist"
                  :key="index"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col :span="24">
            <el-form-item label="处理说明">
              <el-input
                type="textarea"
                :rows="2"
                v-model="abnormalCarFormdata.handledesc"
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
          :propLabel="abnormalCarTableHeader"
          :list="abnormalCarList"
          :filterItem="['jcflag']"
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
import PlatenumberDialog from "../../../components/dialog/platenumberdialog";
import { vehicleMixins } from "../mixins/index";
import BasePagination from "../../../components/pagination/basepagination";
import BusinessDialog from "../codesnipet/businesstype";
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
      tmlist: [
        "车型不符 二改一     上道",
        "拖车     上道    收  元",
        "被拖车     上道    收  元",
        "集装箱车辆     上道    优惠  %",
        "无卡     经核实为  上道    收  元",
        "人为损卡车     经核实入口信息与实际车辆一致    收  元",
        "人为损卡车     经核实入口信息与实际车辆不一致    收  元",
        "换卡车    收  元",
        "伪卡车    收  元",
        "军车      上道    免  元",
        "高速巡警     上道    免  元",
        "单位公车     上道    免  元",
        "路政公车     上道    免  元",
        "班车     上道    免  元",
        "   养护车辆     上道    免  元",
        "   公车(系统内公车按实际填写)",
        "统缴证 证号: ",
        "U转小于30分钟",
        "U转超时(记录下理由及证据)",
        "U转超时(无正当理由及证据)    收  元",
        "超时(记录下理由及证据)   收  元",
        "超时(无正当理由及证据)    收  元",
        "已读卡 免  元  经核实从  上道  按无卡  收费  元",
        "丢轴  ①  轴, 元, %   ②  轴, 元, %    上道",
        "复称  ①  轴, 元, kg, %   ②  轴, 元, kg, %    上道"
      ],
      activeNames: [],
      orgList: [],
      vehicleTypeList: [],
      vehicleDescList: [],
      enterFilterStationList: [],
      exitFilterStationList: [],
      stationList: [],
      // 入口站对象
      enterStation: {},
      // 出口站对象
      exitStation: {},
      templateHandledesc: "",
      // 业务类型
      impropertypedesc: "",
      abnormalCarFormdata: {
        id: "",
        jkorgid: "",
        platenumber: "",
        vehicletypeid: "11",
        vehicledescid: "2",
        vehicleweight: "",
        overweightratio: "",
        tollid: "",
        laneid: "",
        enterstation: "",
        enterdate: "",
        exitstation: "",
        exitdate: "",
        revpayment: "",
        payment: "",
        afterpayment: "",
        impropertypeid: "",
        enterlaneid: "",
        cardnumber: "",
        handledesc: "",
        jcflag: "1"
      },
      disabled: true,
      dialogVisible: false,
      centerDialogVisible: false,
      businessDialogVisible: false
    };
  },
  components: {
    BaseTable,
    BaseDialog,
    BasePagination,
    PlatenumberDialog,
    BusinessDialog
  },
  mounted() {
    this.getAbnormalCarList();
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
    this.getAbnormalCarList();
    // 从缓存中去除stationList
    this.getStationList();
  },
  computed: {
    ...mapState({
      height: state => state.GlobalState.height,
      abnormalCarTableHeader: state => state.AbnormalCar.abnormalCarTableHeader,
      abnormalCarList: state => state.AbnormalCar.abnormalCarList,
      page: state => state.AbnormalCar.page,
      tollLaneList: state => state.TollerLane.tollLaneList
    })
  },
  methods: {
    init() {
      this.abnormalCarFormdata.exitstation = this.DefaultOrgname;
      this.findItem(this.abnormalCarFormdata.exitstation);
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
      this.abnormalCarFormdata.jkorgid = JSON.parse(
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
      this.getAbnormalCarList();
    },
    changeCurPage(e) {
      this.setCurPage(e);
      this.getAbnormalCarList();
    },
    ...mapActions({
      getAbnormalCarList: "getAbnormalCarList",
      getTollLaneList: "getTollLaneList",
      commitAbnormalCarInfo: "commitAbnormalCarInfo"
    }),
    ...mapMutations(["setCurPage", "setSize"]),
    showPlatenumberPanel() {
      this.centerDialogVisible = true;
    },
    choice(e) {
      this.abnormalCarFormdata.platenumber = e.trimRight();
    },
    toggleCenter() {
      this.centerDialogVisible = !this.centerDialogVisible;
    },
    selectImpropertype() {
      this.businessDialogVisible = true;
    },
    businessChoice(e) {
      this.abnormalCarFormdata.impropertypeid = e.id;
      this.impropertypedesc = e.label.trimRight();
      if (this.impropertypedesc === "纠正车型") {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },
    toggleBusiness() {
      this.businessDialogVisible = !this.businessDialogVisible;
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
      Object.keys(this.abnormalCarFormdata).forEach(item => {
        if (item === "jkorgid") {
          this.abnormalCarFormdata[item] = e.orgid;
        } else {
          this.abnormalCarFormdata[item] = e[item];
        }
      });
    },
    handleDelete(e) {
      this.save();
      this.commitData.methods = "delete";
      this.commitData.label = "删除";
      this.abnormalCarFormdata.id = e.id;
    },
    reset() {
      this.commitData.methods = "add";
      this.commitData.label = "添加";
      Object.keys(this.abnormalCarFormdata).forEach(item => {
        if (item === "jkorgid") {
        } else {
          this.abnormalCarFormdata[item] = "";
        }
      });
      this.enterStation = {};
      this.exitStation = {};
      this.impropertypedesc = "";
      this.abnormalCarFormdata.vehicletypeid = "11";
      this.abnormalCarFormdata.vehicledescid = "2";
      this.abnormalCarFormdata.jcflag = "1";
      this.init();
    },
    confirm() {
      this.abnormalCarFormdata.enterroad = this.enterStation.roadname;
      this.abnormalCarFormdata.exitroad = this.exitStation.roadname;
      this.abnormalCarFormdata.enterorgan = this.enterStation.company;
      this.abnormalCarFormdata.exitorgan = this.exitStation.company;

      this.commitData.data = this.abnormalCarFormdata;
      this.commitAbnormalCarInfo(this.commitData).then(() => {
        this.reset();
        this.toggle();
      });
    }
  },
  watch: {
    "abnormalCarFormdata.tollid": {
      handler: function(val) {
        if (val) {
          this.tollLaneList.forEach(item => {
            if (item.tollid === val) {
              this.abnormalCarFormdata.laneid = item.laneid;
            }
          });
        }
      },
      immediate: true,
      deep: true
    },
    "abnormalCarFormdata.laneid": {
      handler: function(val) {
        if (val) {
          this.tollLaneList.forEach(item => {
            if (item.laneid === val) {
              this.abnormalCarFormdata.tollid = item.tollid;
            }
          });
        }
      },
      immediate: true,
      deep: true
    },
    "abnormalCarFormdata.enterstation": {
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
    "abnormalCarFormdata.exitstation": {
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
    },
    templateHandledesc: {
      handler: function(val) {
        this.abnormalCarFormdata.handledesc = val;
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
.header_btn {
  display: inline-block;
  width: 100%;
  height: 20px;
}
</style>
