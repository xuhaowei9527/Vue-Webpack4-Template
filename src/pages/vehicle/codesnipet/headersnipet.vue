<template>
  <div class="">
    <div slot="header" class="header_btn">
      <el-button
        @click="summitClick"
        style="float: right; padding: 3px 0"
        type="text"
        >{{ btnLabel }}按钮</el-button
      >
      <el-button
        @click="resetClick"
        style="float: right; padding: 3px 10px"
        type="text"
        >重置按钮</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  },
  props: {
    btnLabel: {
      type: String,
      default: function() {
        return "添加";
      }
    }
  },
  components: {},
  methods: {
    summitClick() {
      this.$emit("summit");
    },
    resetClick() {
      this.$emit("reset");
    }
  }
};
</script>

<style scoped>
.header_btn {
  display: inline-block;
  width: 100%;
  height: 20px;
}
</style>
