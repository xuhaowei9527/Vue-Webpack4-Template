<template>
  <div class="">
    <index-form></index-form>
  </div>
</template>

<script>
export default {
  name: "UType",
  data() {
    return {};
  },
  components: {
    IndexForm: () => import("../form/index")
  },
  computed: {}
};
</script>

<style scoped></style>
