<template>
  <div class="">
    <el-input readonly v-model="vv"></el-input>
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
      vv: ""
    };
  },
  components: {},
  watch: {
    value: {
      handler: function(val) {
        this.vv = val;
      },
      immediate: true,
      deep: true
    }
  }
};
</script>

<style scoped></style>
