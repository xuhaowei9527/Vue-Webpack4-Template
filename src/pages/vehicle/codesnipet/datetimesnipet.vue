<template>
  <div class="">
    <el-date-picker v-model="time" type="datetime" placeholder="选择日期时间">
    </el-date-picker>
  </div>
</template>

<script>
import { parseNowDateTotal } from "../../../utils/xu-moment";
export default {
  name: "",
  props: {
    value: {
      type: String,
      default: function() {
        return "";
      }
    }
  },
  data() {
    return {
      time: ""
    };
  },
  components: {},
  watch: {
    value: {
      handler: function(val) {
        this.time = val;
      },
      immediate: true,
      deep: true
    },
    time: {
      handler: function(v) {
        if (v) {
          this.$emit("setValue", parseNowDateTotal(v));
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
