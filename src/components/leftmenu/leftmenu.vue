<template>
  <div class="left_menu_section">
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
      <template v-for="level_1 in menus">
        <template v-if="level_1.hasChild == false">
          <el-menu-item v-bind:index="level_1.routekey" :key="level_1.routekey">
            <i v-bind:class="[level_1.iconClass]"></i>
            <span slot="title"> {{ level_1.title }}</span>
          </el-menu-item>
        </template>
        <template v-else>
          <el-submenu v-bind:index="level_1.routekey" :key="level_1.routekey">
            <template slot="title">
              <i v-bind:class="[level_1.iconClass]"></i>
              <span>{{ level_1.title }}</span>
            </template>
            <template v-for="level_2 in level_1.child">
              <template v-if="level_2.hasChild == false">
                <el-menu-item
                  v-bind:index="level_2.routekey"
                  :key="level_2.routekey"
                >
                  <i v-bind:class="[level_2.iconClass]"></i>
                  <span slot="title"> {{ level_2.title }}</span>
                </el-menu-item>
              </template>
              <template v-else>
                <el-submenu
                  v-bind:index="level_2.routekey"
                  :key="level_2.routekey"
                >
                  <template slot="title">
                    <i v-bind:class="[level_2.iconClass]"></i>
                    <span>{{ level_2.title }}</span>
                  </template>
                  <template v-for="level_3 in level_2.child">
                    <template v-if="level_3.hasChild == false">
                      <el-menu-item
                        v-bind:index="level_3.routekey"
                        :key="level_3.routekey"
                      >
                        <i v-bind:class="[level_3.iconClass]"></i>
                        <span slot="title"> {{ level_3.title }}</span>
                      </el-menu-item>
                    </template>
                  </template>
                </el-submenu>
              </template>
            </template>
          </el-submenu>
        </template>
      </template>
    </el-menu>
  </div>
</template>
<script>
import { mapActions } from "vuex";
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
  mounted() {},
  computed: {
    onRoutes() {
      return this.$route.path.replace("/", "");
    }
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
  width: 250px;
}
.left_menu_section {
  position: relative;
  width: 100%;
  height: calc(100vh - 72px);
  background-color: #303133;
}
.left_menu_section ul {
  border-right: 1px;
}
</style>
