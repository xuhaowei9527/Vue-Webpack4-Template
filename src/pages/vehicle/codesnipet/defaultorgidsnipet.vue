<template>
  <div class="">
    <el-select v-model="jkorgid" disabled placeholder="请选择">
      <el-option
        v-for="item in orgList"
        :key="item.orgid"
        :label="item.orgname"
        :value="item.orgid"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      orgList: [],
      jkorgid: ""
    };
  },
  mounted() {
    // 获取缓存中的orglist
    this.getOrgList();
    // 设置默认选中站
    this.setOrgDefaultValue();
  },
  components: {},
  methods: {
    getOrgList() {
      this.orgList = JSON.parse(localStorage.getItem("orgList"));
    },
    setOrgDefaultValue() {
      this.jkorgid = JSON.parse(localStorage.getItem("loginInfo")).jkorgid;
    }
  },
  watch: {
    handler: function(val) {
      this.$emit("setValue", val);
    },
    immediate: true
  }
};
</script>

<style scoped></style>
