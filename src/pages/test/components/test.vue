<template>
  <div class="test_page">
    测试页面
  </div>
</template>

<script>
import { testmixins } from "../mixins/index.js";
import { mapState, mapActions } from "vuex";
export default {
  name: "",
  mixins: [testmixins],
  data() {
    return {
      test: "111111"
    };
  },
  components: {},
  mounted() {},
  activated() {},
  computed: {
    ...mapState({
      height: state => state.GlobalState.height
    })
  },
  methods: {
    ...mapActions({})
  },
  watch: {}
};
</script>

<style scoped></style>
