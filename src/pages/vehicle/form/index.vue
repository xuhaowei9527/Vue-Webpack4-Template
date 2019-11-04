<template>
  <div class="">
    <base-dialog
      :message="'是否' + commitData.label + '纠正车型信息记录'"
      @toggle="toggle"
      @confirm="confirm"
      :dialogVisible="dialogVisible"
    ></base-dialog>
    <header-snipet @summit="summit" @reset="reset"></header-snipet>
    <layout-snipet :arr="FormArr">
      <template v-slot:jkorgid>
        <default-orgid-snipet @setValue="setOrgid"></default-orgid-snipet>
      </template>
      <template v-slot:platenumber>
        <platenumber-snipet
          :value="currentComponentsData.platenumber"
          @setValue="setPlateNumber"
        ></platenumber-snipet>
      </template>
      <template v-slot:tollid>
        <toller-snipet
          :value="currentComponentsData.laneid"
          @setValue="setTollid"
        ></toller-snipet>
      </template>
      <template v-slot:laneid>
        <lane-snipet
          :value="currentComponentsData.tollid"
          @setValue="setLaneid"
        ></lane-snipet>
      </template>
      <template v-slot:exitstation>
        <station-snipet
          ref="InitExit"
          :switch="true"
          :value="exitStation.stationname"
          @setStation="setExitStation"
        ></station-snipet>
      </template>
      <template v-slot:exitroad>
        <disable-input-snipet
          :value="exitStation.roadname"
        ></disable-input-snipet>
      </template>
      <template v-slot:exitorgan>
        <disable-input-snipet
          :value="exitStation.company"
        ></disable-input-snipet>
      </template>
      <template v-slot:exitdate>
        <datetime-snipet
          :value="currentComponentsData.exitdate"
          @setValue="setDate"
        ></datetime-snipet>
      </template>
      <template v-slot:enterstation>
        <station-snipet
          ref="InitEnter"
          :value="enterStation.stationname"
          @setStation="setEnterStation"
        ></station-snipet>
      </template>
      <template v-slot:enterroad>
        <disable-input-snipet
          :value="enterStation.roadname"
        ></disable-input-snipet>
      </template>
      <template v-slot:enterorgan>
        <disable-input-snipet
          :value="enterStation.company"
        ></disable-input-snipet>
      </template>
      <template v-slot:vehicletypeid>
        <vehicle-type-snipet
          :value="currentComponentsData.vehicletypeid"
          @setVehicletypeid="setVehicletypeid"
        ></vehicle-type-snipet>
      </template>
      <template v-slot:vehicleweight>
        <input-snipet
          :hasicon="true"
          :icon="'KG'"
          :value="currentComponentsData.vehicleweight"
          @setValue="setVehicleweight"
        ></input-snipet>
      </template>
      <template v-slot:overweightratio>
        <input-snipet
          :hasicon="true"
          :icon="'%'"
          :value="currentComponentsData.overweightratio"
          @setValue="setOverweightratio"
        ></input-snipet>
      </template>
      <template v-slot:revpayment>
        <input-snipet
          :hasicon="true"
          :icon="'元'"
          :value="currentComponentsData.revpayment"
          @setValue="setRevpayment"
        ></input-snipet>
      </template>
      <template v-slot:payment>
        <input-snipet
          :hasicon="true"
          :icon="'元'"
          :value="currentComponentsData.payment"
          @setValue="setPayment"
        ></input-snipet>
      </template>
      <template v-slot:afterpayment>
        <input-snipet
          :hasicon="true"
          :icon="'元'"
          :value="currentComponentsData.afterpayment"
          @setValue="setAfterpayment"
        ></input-snipet>
      </template>
      <template v-slot:enterlaneid>
        <input-snipet
          :value="currentComponentsData.enterlaneid"
          @setValue="setEnterLaneid"
        ></input-snipet>
      </template>
      <template v-slot:cardnumber>
        <input-snipet
          :value="currentComponentsData.cardnumber"
          @setValue="setCardnumber"
        ></input-snipet>
      </template>
      <template v-slot:jcflag>
        <flag-snipet
          :value="currentComponentsData.jcflag"
          @setValue="setJcflag"
        ></flag-snipet>
      </template>
      <template v-slot:handledesc>
        <handledesc-snipet
          :value="currentComponentsData.handledesc"
          @setValue="setHandledesc"
        ></handledesc-snipet>
      </template>
    </layout-snipet>
    <el-collapse>
      <el-collapse-item name="1">
        <template slot="title">
          <div style="font-size: 16px;">数据列表</div>
        </template>
        <base-table
          :propLabel="TableHeader"
          :list="VehicleList"
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
import { mapState } from "vuex";

export default {
  name: "CorrectVehicleType",
  data() {
    return {
      commitData: {
        methods: "add",
        data: {},
        label: "添加"
      },
      dialogVisible: false,
      enterStation: {},
      exitStation: {},
      // 当前tab页表单录入数据
      currentComponentsData: {
        id: "",
        jkorgid: "",
        platenumber: "",
        vehicletypeid: "",
        laneid: "",
        tollid: "",
        vehicleweight: "",
        overweightratio: "",
        revpayment: "",
        payment: "",
        afterpayment: "",
        enterlaneid: "",
        cardnumber: "",
        enterstation: "",
        exitstation: "",
        exitdate: "",
        impropertypeid: "",
        handledesc: "",
        jcflag: ""
      }
    };
  },
  activated() {
    this.initOnce();
    this.getVehicleList();
  },
  mounted() {
    // 首次加载初始化默认配置项
    this.initOnce();
    this.getVehicleList();
  },
  computed: {
    // 根据命名空间获取vuex中state变量
    FormArr: function() {
      return this.$store.state.Tabs[this.$options.parent.$options._componentTag]
        .FormArr;
    },
    defaultVehicleValue: function() {
      return this.$store.state.Tabs[this.$options.parent.$options._componentTag]
        .defaultVehicleValue;
    },
    VehicleData: function() {
      return this.$store.state.Tabs[this.$options.parent.$options._componentTag]
        .VehicleData;
    },
    TransferName: function() {
      return this.$store.state.Tabs[this.$options.parent.$options._componentTag]
        .TransferName;
    },
    page: function() {
      return this.$store.state.Tabs[this.$options.parent.$options._componentTag]
        .page;
    },
    TableHeader: function() {
      return this.$store.state.Tabs[this.$options.parent.$options._componentTag]
        .TableHeader;
    },
    VehicleList: function() {
      return this.$store.state.Tabs[this.$options.parent.$options._componentTag]
        .VehicleList;
    },
    ...mapState({
      height: state => state.GlobalState.height
    })
  },
  components: {
    BaseTable: () =>
      import(
        /* webpackChunkName: "Vehicle" */ "../../../components/table/basetable"
      ),
    BaseDialog: () =>
      import(
        /* webpackChunkName: "Vehicle" */ "../../../components/dialog/basedialog"
      ),
    BasePagination: () =>
      import(
        /* webpackChunkName: "Vehicle" */ "../../../components/pagination/basepagination"
      ),
    HeaderSnipet: () =>
      import(
        /* webpackChunkName: "Vehicle" */ "../codesnipet/headersnipet.vue"
      ),
    LayoutSnipet: () =>
      import(/* webpackChunkName: "Vehicle" */ "../codesnipet/layoutsnipet"),
    DisableInputSnipet: () =>
      import(
        /* webpackChunkName: "Vehicle" */ "../codesnipet/disableinputsnipet"
      ),
    InputSnipet: () =>
      import(/* webpackChunkName: "Vehicle" */ "../codesnipet/inputsnipet"),
    DefaultOrgidSnipet: () =>
      import(
        /* webpackChunkName: "Vehicle" */ "../codesnipet/defaultorgidsnipet"
      ),
    PlatenumberSnipet: () =>
      import(
        /* webpackChunkName: "Vehicle" */ "../codesnipet/platenumbersnipet"
      ),
    TollerSnipet: () =>
      import(/* webpackChunkName: "Vehicle" */ "../codesnipet/tollersnipet"),
    LaneSnipet: () =>
      import(/* webpackChunkName: "Vehicle" */ "../codesnipet/lanesnipet"),
    StationSnipet: () =>
      import(/* webpackChunkName: "Vehicle" */ "../codesnipet/stationsnipet"),
    DatetimeSnipet: () =>
      import(/* webpackChunkName: "Vehicle" */ "../codesnipet/datetimesnipet"),
    VehicleTypeSnipet: () =>
      import(
        /* webpackChunkName: "Vehicle" */ "../codesnipet/vehicletypesnipet"
      ),
    FlagSnipet: () =>
      import(/* webpackChunkName: "Vehicle" */ "../codesnipet/flagsnipet"),
    HandledescSnipet: () =>
      import(/* webpackChunkName: "Vehicle" */ "../codesnipet/handledescsnipet")
  },
  methods: {
    // -------------------------------切换tabs时初始化页面数据----------------------------
    initOnce() {
      Object.assign(this.currentComponentsData, this.defaultVehicleValue);
    },
    init() {
      // Object.assign(this.currentComponentsData, this.VehicleData);
    },
    // -------------------------------vuex相关接口----------------------------
    // 根据tab标签名调用vuex接口actions
    getVehicleList() {
      return this.$store.dispatch(
        "Tabs/" +
          this.$options.parent.$options._componentTag +
          "/getVehicleList"
      );
    },
    // 根据tab标签名调用vuex接口
    commitVehicleInfo(e) {
      return this.$store.dispatch(
        "Tabs/" +
          this.$options.parent.$options._componentTag +
          "/commitVehicleInfo",
        e
      );
    },
    // 设置当前页
    setVehiclePage(e) {
      return this.this.$store.commit(
        "Tabs/" +
          this.$options.parent.$options._componentTag +
          "/setVehiclePage",
        e
      );
    },
    // 设置当前页码
    setVehicleSize(e) {
      return this.this.$store.commit(
        "Tabs/" +
          this.$options.parent.$options._componentTag +
          "/setVehicleSize",
        e
      );
    },
    // -------------------------------分页方法----------------------------
    changeSize(e) {
      this.setVehicleSize(e);
      this.getVehicleList();
    },
    changeCurPage(e) {
      this.setVehiclePage(e);
      this.getVehicleList();
    },
    // -------------------------------修改页面编辑页面数据----------------------------
    // 列表编辑
    handleEdit(e) {
      this.commitData.methods = "update";
      this.commitData.label = "编辑";
      Object.keys(this.currentComponentsData).forEach(item => {
        if (item === "jkorgid") {
          this.currentComponentsData[item] = e.orgid;
        } else {
          this.currentComponentsData[item] = e[item];
        }
      });
      this.enterStation.stationname = e.enterstation;
      this.exitStation.stationname = e.exitstation;
    },
    handleDelete(e) {
      this.summit();
      this.commitData.methods = "delete";
      this.commitData.label = "删除";
      this.currentComponentsData.id = e.id;
    },
    // -------------------------------控制表单数据----------------------------
    // 设置当前机构
    setOrgid(e) {
      this.currentComponentsData.jkorgid = e;
    },
    // 设置车牌
    setPlateNumber(e) {
      this.currentComponentsData.platenumber = e;
    },
    // 收费员车道号关联
    setTollid(e) {
      this.currentComponentsData.tollid = e;
    },
    setLaneid(e) {
      this.currentComponentsData.laneid = e;
    },
    // 设置出口收费站
    setExitStation(e) {
      this.exitStation = e;
      this.currentComponentsData.exitstation = e.stationname;
      this.currentComponentsData.exitroad = e.roadname;
      this.currentComponentsData.exitorgan = e.company;
    },
    // 设置入口收费站
    setEnterStation(e) {
      this.enterStation = e;
      this.currentComponentsData.enterstation = e.stationname;
      this.currentComponentsData.enterroad = e.roadname;
      this.currentComponentsData.enterorgan = e.company;
    },
    // 设置出口时间
    setDate(e) {
      this.currentComponentsData.exitdate = e;
    },
    // 设置车型
    setVehicletypeid(e) {
      this.currentComponentsData.vehicletypeid = e;
    },
    // 设置实际车重
    setVehicleweight(e) {
      this.currentComponentsData.vehicleweight = e;
    },
    // 设置超限比例
    setOverweightratio(e) {
      this.currentComponentsData.overweightratio = e;
    },
    // 设置应缴金额
    setRevpayment(e) {
      this.currentComponentsData.revpayment = e;
    },
    // 设置实缴金额
    setPayment(e) {
      this.currentComponentsData.payment = e;
    },
    // 设置补缴金额
    setAfterpayment(e) {
      this.currentComponentsData.afterpayment = e;
    },
    // 设置入口车道
    setEnterLaneid(e) {
      this.currentComponentsData.enterlaneid = e;
    },
    // 设置卡号
    setCardnumber(e) {
      this.currentComponentsData.cardnumber = e;
    },
    // 设置是否稽查数据
    setJcflag(e) {
      this.currentComponentsData.jcflag = e;
    },
    // 设置处理说明
    setHandledesc(e) {
      this.currentComponentsData.handledesc = e;
    },
    // -------------------------------提交相关操作----------------------------
    // 提交,显示dialog
    summit() {
      this.dialogVisible = true;
    },
    // 切换dialog显示
    toggle() {
      this.dialogVisible = !this.dialogVisible;
    },
    // 重置数据
    reset() {
      this.commitData.methods = "add";
      this.commitData.label = "添加";
      // 清空当前组件数据
      Object.keys(this.currentComponentsData).map(
        i => (this.currentComponentsData[i] = "")
      );
      // 初始化收费站
      this.$refs.InitExit.init();
      this.$refs.InitEnter.init();
      // 初始化默认的数据
      this.initOnce();
    },
    // 确认提交,以及刷新数据
    confirm() {
      // 设置id,用于更新和删除
      this.VehicleData.impropertypeid = this.defaultVehicleValue.impropertypeid;
      this.VehicleData.id = this.currentComponentsData.id;
      this.commitData.data = this.VehicleData;
      this.commitVehicleInfo(this.commitData).then(() => {
        this.reset();
        this.toggle();
      });
    }
  },
  watch: {
    // 当前页面数据
    currentComponentsData: {
      handler: function(val) {
        this.$store.commit(
          "Tabs/" +
            this.$options.parent.$options._componentTag +
            "/setVehicleData",
          val
        );
      },
      immediate: true,
      deep: true
    }
  }
};
</script>

<style scoped></style>
