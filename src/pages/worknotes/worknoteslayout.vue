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
  props: {},
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
