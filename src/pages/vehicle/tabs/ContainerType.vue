<template>
  <div class="">
    <index-form></index-form>
  </div>
</template>

<script>
export default {
  name: "ContainerType",
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
