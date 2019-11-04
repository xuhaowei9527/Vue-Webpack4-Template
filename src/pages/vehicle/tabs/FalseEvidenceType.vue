<template>
  <div class="">
    <index-form></index-form>
  </div>
</template>

<script>
export default {
  name: "FalseEvidenceType",
  data() {
    return {};
  },
  components: {
    IndexForm: () => import(/* webpackChunkName: "Vehicle" */ "../form/index")
  },
  computed: {}
};
</script>

<style scoped></style>
