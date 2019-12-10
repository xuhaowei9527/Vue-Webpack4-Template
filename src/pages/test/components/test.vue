<template>
  <div>
    <div>{{ isPlay }}</div>

    <el-button @click="onoff">开关动画</el-button>
    <div ref="three">
      <!-- <v-three :gltf="'model3D/traffic_light__animation/scene.gltf'"></v-three> -->
    </div>
  </div>
</template>

<script>
import { testmixins } from "../mixins/index.js";
import { mapState, mapActions } from "vuex";

export default {
  name: "",
  mixins: [testmixins],
  data() {
    return {};
  },
  components: {},
  mounted() {
    this.$refs.three.appendChild(window.three);
  },
  activated() {},
  computed: {
    ...mapState({
      isPlay: state => state.global.isPlay
    })
  },
  methods: {
    onoff() {
      console.log(this.$store);
      this.$store.commit("global/setIsPlay", !this.isPlay);
    },
    ...mapActions({})
  },
  watch: {
    isPlay: {
      handler: function(val) {
        if (val) {
          window.th.play();
        } else {
          window.th.pause();
        }
      }
    }
  }
};
</script>

<style scoped></style>
