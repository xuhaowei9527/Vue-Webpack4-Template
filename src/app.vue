<template>
  <div>
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  },
  components: {}
};
</script>

<style scoped>
.app .app-router-view {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: hidden;
  backface-visibility: hidden;
  transform: translate3d(0, 0, 0);
  transform-style: preserve-3d;
  visibility: visible;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}
.fade-enter,
.fade-leave-active,
.fade-leave-to {
  opacity: 0;
}
.jump-enter-active {
  animation: jump 0.2s;
}
.jump-leave-active {
  animation: jump 0.2s reverse;
}
@keyframes jump {
  0% {
    transform: translateY(10px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
}
.slide-fade-leave-active,
.slide-left-enter-active {
  transition: all 0.3s ease;
}
.slide-left-enter {
  transform: translateX(10px);
}
.slide-left-leave,
.slide-left-leave-to {
  transform: translateX(10px);
}
</style>
