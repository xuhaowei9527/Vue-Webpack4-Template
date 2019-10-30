<!-- eslint-disable -->
<template>
  <div>
    <base-tabs
      :activeName="activeName"
      :labelArray="labelArray"
      @handleClick="handleClick"
      ><component v-bind:is="currentId"></component
    ></base-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentId: "CorrectVehicleType",
      activeName: "CorrectVehicleType",
      labelArray: [
        { label: "纠正车型", name: "CorrectVehicleType" },
        { label: "复称", name: "RepetitionType" },
        { label: "丢轴", name: "LoseAxisType" },
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
    BaseTabs: () => import("@/components/tabs/basetabs.vue"),
    // 车型组件注册
    CorrectVehicleType: () => import("../tabs/CorrectVehicleType.vue"),
    RepetitionType: () => import("../tabs/RepetitionType.vue"),
    LoseAxisType: () => import("../tabs/LoseAxisType.vue"),
    ReadCardType: () => import("../tabs/ReadCardType.vue"),
    ContainerType: () => import("../tabs/ContainerType.vue"),
    NoCardType: () => import("../tabs/NoCardType.vue"),
    TrailerType: () => import("../tabs/TrailerType.vue"),
    OvertimeVehicle: () => import("../tabs/OvertimeVehicle.vue"),
    UType: () => import("../tabs/UType.vue"),
    FalseEvidenceType: () => import("../tabs/FalseEvidenceType.vue")
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
