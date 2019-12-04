<template>
  <div class="test-layout">
    <el-card class="box-card">
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
  props: {},
  data() {
    return {};
  },
  computed: {
    ...mapState({})
  },
  components: {}
};
</script>

<style scoped>
.box-card {
  height: calc(100vh - 112px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.01s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.bounce-enter-active {
  animation: bounce-in 0.1s;
}

.bounce-leave-active {
  animation: bounce-in 0.1s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.01);
  }
  100% {
    transform: scale(1);
  }
}
</style>
