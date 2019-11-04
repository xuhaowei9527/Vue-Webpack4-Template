<!-- eslint-disable -->
<template>
  <div>
    <base-tabs
      :activeName="activeName"
      :labelArray="labelArray"
      @handleClick="handleClick"
    ></base-tabs>
    <!-- 不要将component放入tabs中切换,要求被切换的组件有自己的名字 -->
    <keep-alive>
      <component v-bind:is="currentId"></component>
    </keep-alive>
  </div>
</template>
<script>
// 非正常车tab分页层,用于切换tab页,注册相关组件
export default {
  data() {
    return {
      currentId: "CorrectVehicleType",
      activeName: "CorrectVehicleType",
      labelArray: [
        { label: "汇总", name: "AbnormalCar" },
        { label: "纠正车型", name: "CorrectVehicleType" },
        { label: "复称", name: "RepetitionType" },
        { label: "已读卡", name: "ReadCardType" },
        { label: "集装箱", name: "ContainerType" },
        { label: "无卡", name: "NoCardType" },
        { label: "拖车/被拖车", name: "TrailerType" },
        { label: "超时车", name: "OvertimeVehicle" },
        { label: "U型车", name: "UType" },
        { label: "假证", name: "FalseEvidenceType" }
      ]
    };
  },
  mounted() {
    this.switch("CorrectVehicleType");
  },
  components: {
    BaseTabs: () =>
      import(
        /* webpackChunkName: "Vehicle" */ "@/components/tabs/basetabs.vue"
      ),
    AbnormalCar: () =>
      import(/* webpackChunkName: "Vehicle" */ "../components/abnormalcar.vue"),
    // 车型组件注册
    CorrectVehicleType: () =>
      import(
        /* webpackChunkName: "Vehicle" */ "../tabs/CorrectVehicleType.vue"
      ),
    RepetitionType: () =>
      import(/* webpackChunkName: "Vehicle" */ "../tabs/RepetitionType.vue"),
    ReadCardType: () =>
      import(/* webpackChunkName: "Vehicle" */ "../tabs/ReadCardType.vue"),
    ContainerType: () =>
      import(/* webpackChunkName: "Vehicle" */ "../tabs/ContainerType.vue"),
    NoCardType: () =>
      import(/* webpackChunkName: "Vehicle" */ "../tabs/NoCardType.vue"),
    TrailerType: () =>
      import(/* webpackChunkName: "Vehicle" */ "../tabs/TrailerType.vue"),
    OvertimeVehicle: () =>
      import(/* webpackChunkName: "Vehicle" */ "../tabs/OvertimeVehicle.vue"),
    UType: () => import(/* webpackChunkName: "Vehicle" */ "../tabs/UType.vue"),
    FalseEvidenceType: () =>
      import(/* webpackChunkName: "Vehicle" */ "../tabs/FalseEvidenceType.vue")
  },
  methods: {
    handleClick(e) {
      this.switch(e.name);
    },
    switch(e) {
      this.currentId = e;
      this.activeName = e;
    }
  }
};
</script>
