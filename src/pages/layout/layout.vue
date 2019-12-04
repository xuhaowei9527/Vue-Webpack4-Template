<template>
  <div class="">
    <div class="top_section">
      <header-nav></header-nav>
    </div>
    <el-container>
      <el-aside id="sc" width="250px">
        <i :class="i_name + ' i_position'" @click="showMenu"></i>
        <left-menu :isCollapse="isCollapse" :menus="menus"></left-menu>
      </el-aside>
      <el-main id="sc">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
import HeaderNav from "../../components/headernav/headernav.vue";
import LeftMenu from "../../components/leftmenu/leftmenu.vue";
export default {
  name: "",
  data() {
    return {
      isCollapse: false,
      i_name: "el-icon-s-fold"
    };
  },
  components: {
    HeaderNav,
    LeftMenu
  },
  mounted() {},
  methods: {
    showMenu() {
      this.isCollapse = !this.isCollapse;
      this.i_name = this.isCollapse ? "el-icon-s-unfold" : "el-icon-s-fold";
    }
  },
  computed: {
    ...mapState({
      menus: state => state.global.menus
    })
  },
  watch: {}
};
</script>

<style scoped>
.top_section {
  position: relative;
  height: 72px;
}
.i_position {
  position: absolute;
  top: -30px;
  font-size: 24px;
  color: #fff;
}
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}
#sc::-webkit-scrollbar {
  display: none;
}
#sc::-webkit-scrollbar {
  width: 0px;
}
#sc {
  overflow: -moz-scrollbars-none;
}
</style>
