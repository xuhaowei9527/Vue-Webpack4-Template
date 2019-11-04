<template>
  <div class="">
    <el-select v-model="jcflag" placeholder="请选择">
      <el-option :label="'是'" :value="'1'"></el-option>
      <el-option :label="'否'" :value="'0'"></el-option>
    </el-select>
  </div>
</template>

<script>
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
      jcflag: ""
    };
  },
  components: {},
  watch: {
    value: {
      handler: function(val) {
        this.jcflag = val;
      },
      immediate: true
    },
    jcflag: {
      handler: function(val) {
        this.$emit("setValue", val);
      },
      immediate: true
    }
  }
};
</script>

<style scoped></style>
