<template>
  <div class="">
    <el-input v-model="vv">
      <template slot="append" v-if="hasicon">{{ icon }}</template>
    </el-input>
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
    },
    icon: {
      type: String,
      function() {
        return "";
      }
    },
    hasicon: {
      type: Boolean,
      function() {
        return false;
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
    },
    vv: {
      handler: function(val) {
        this.$emit("setValue", val);
      }
    }
  }
};
</script>

<style scoped></style>
