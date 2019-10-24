<template>
  <div class="">
    <el-card class="box-card" :style="{ 'min-height': height - 40 + 'px' }">
      <transition name="fade" mode="out-in">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
    </el-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      height: state => state.GlobalState.height
    })
  },
  components: {}
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.01s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
