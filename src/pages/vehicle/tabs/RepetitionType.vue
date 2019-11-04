<template>
  <div class="">
    <index-form></index-form>
  </div>
</template>

<script>
export default {
  name: "RepetitionType",
  data() {
    return {};
  },
  components: {
    IndexForm: () => import(/* webpackChunkName: "Vehicle" */ "../form/index")
  }
};
</script>

<style scoped></style>
