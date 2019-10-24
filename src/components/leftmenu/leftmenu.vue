<template>
  <div class="left_menu_section" :style="'height:' + height + 'px'">
    <el-menu
      :default-active="onRoutes"
      class="el-menu-vertical-demo"
      background-color="#313131"
      text-color="#fff"
      active-text-color="#c0c0c0"
      :collapse="isCollapse"
      @open="handleOpen"
      @close="handleClose"
      @select="handleMenuItemClick"
      unique-opened
    >
      <template v-for="menuItem in menus">
        <template v-if="menuItem.hasChild == false">
          <el-menu-item
            v-bind:index="menuItem.routekey"
            :key="menuItem.routekey"
          >
            <i v-bind:class="[menuItem.iconClass]"></i>
            <span slot="title"> {{ menuItem.title }}</span>
          </el-menu-item>
        </template>
        <template v-else>
          <el-submenu v-bind:index="menuItem.routekey" :key="menuItem.routekey">
            <template slot="title">
              <i v-bind:class="[menuItem.iconClass]"></i>
              <span>{{ menuItem.title }}</span>
            </template>
            <template v-for="subItem in menuItem.child">
              <el-menu-item
                v-bind:index="subItem.routekey"
                :key="subItem.routekey"
                >{{ subItem.title }}</el-menu-item
              >
            </template>
          </el-submenu>
        </template>
      </template>
    </el-menu>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "",
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    },
    menus: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {};
  },
  components: {},
  mounted() {
    this.$store.dispatch("getMenus");
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace("/", "");
    },
    ...mapState({
      height: state => state.GlobalState.height
    })
  },
  methods: {
    ...mapActions({}),
    handleOpen(key, keyPath) {},
    handleClose(key, keyPath) {},
    handleMenuItemClick(key, keyPath) {
      this.$router.push("/" + key);
    }
  }
};
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
.left_menu_section {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #303133;
}
.left_menu_section ul {
  border-right: 1px;
}
</style>
