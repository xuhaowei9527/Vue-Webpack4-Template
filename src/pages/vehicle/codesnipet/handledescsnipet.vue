<template>
  <div class="">
    <el-input type="textarea" :rows="2" v-model="handledesc"> </el-input>
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
      handledesc: ""
    };
  },
  components: {},
  watch: {
    value: {
      handler: function(v) {
        this.handledesc = v;
      },
      immediate: true
    },
    handledesc: {
      handler: function(v) {
        this.$emit("setValue", v);
      },
      immediate: true
    }
  }
};
</script>

<style scoped></style>
