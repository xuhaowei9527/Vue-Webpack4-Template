<template>
  <div class="">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>{first}</el-breadcrumb-item>
      <el-breadcrumb-item>{second}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    first: {
      type: String,
      default: ''
    },
    second: {
      type: String,
      default: ''
    }
  },
  data () {
    return {}
  },
  components: {}
}
</script>

<style scoped>
</style>
