<template>
  <div class="login_bg">
    <div class="login_container">
      <div class="username_position">
        <i class="el-icon-user"></i>
        <el-input placeholder="请输入用户名" style="width: 220px;"></el-input>
      </div>
      <div class="password_position">
        <i class="el-icon-unlock"></i>
        <el-input
          placeholder="请输入密码"
          show-password
          style="width: 220px;"
        ></el-input>
      </div>
      <div class="remember_position">
        <el-checkbox style="color: #fff;font-size: 32px;padding-left: 30px;"
          >记住用户名</el-checkbox
        >
      </div>
      <div class="summit_position">
        <el-button
          @click="login"
          size="small"
          type="primary"
          style="width: 270px;"
          >登录</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "",
  data() {
    return {};
  },
  components: {},
  mounted() {},
  computed: {
    ...mapState({})
  },
  methods: {
    ...mapActions({}),
    login() {
      this.$router.push("/MainLayout/TestLayout/TestPage");
    }
  },
  watch: {}
};
</script>

<style scoped>
.login_bg {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: #fff;
  background-size: auto;
  background-position-x: center;
  background-position-y: center;
  background-image: url("../../../static/image/loginbg.webp");
}
.login_container {
  position: relative;
  top: 31%;
  left: 62%;
  width: 300px;
  height: 260px;
  background-color: rgba(10, 10, 10, 0.5);
  border: 1px solid #575656;
  border-radius: 4px;
}
.login_container i {
  width: 30px;
  font-size: 40px;
  color: #fff;
}
.orgList_position,
.username_position,
.password_position {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  top: 0;
  left: 0;
  height: 60px;
}

.remember_position {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  top: 0;
  left: 0;
  height: 40px;
}

.summit_position {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  top: 0;
  left: 0;
  height: 40px;
}
</style>
