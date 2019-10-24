<template>
  <div class="login_bg">
    <div class="login_container">
      <div class="orgList_position">
        <i class="el-icon-office-building"></i>
        <el-select
          v-model="curOrgid"
          placeholder="请选择登录机构"
          style="width: 220px;"
        >
          <el-option
            v-for="item in orgList"
            :key="item.orgid"
            :label="item.orgname"
            :value="item.orgid"
          >
          </el-option>
        </el-select>
      </div>
      <div class="username_position">
        <i class="el-icon-user"></i>
        <el-input
          v-model="username"
          placeholder="请输入用户名"
          style="width: 220px;"
        ></el-input>
      </div>
      <div class="password_position">
        <i class="el-icon-unlock"></i>
        <el-input
          v-model="password"
          placeholder="请输入密码"
          show-password
          style="width: 220px;"
        ></el-input>
      </div>
      <div class="remember_position">
        <el-checkbox
          v-model="remember"
          style="color: #fff;font-size: 32px;padding-left: 30px;"
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
    return {
      curOrgid: "",
      username: "",
      password: "",
      remember: false
    };
  },
  components: {},
  mounted() {
    // 获取机构列表
    this.getOrgList();
    // 获取班次列表
    this.getWorkShiftList();
    // 获取班组列表
    this.getWorkGroupList();
    // 获取所有班组成员
    // this.getAllUserGrouptByOrgId()
    // 车型
    this.getVehicleTypeList();
    // 车种
    this.getVehicleDescList();
    // 收费站列表
    // this.getStationList()
    // 获取登录用户列表
    this.getLoginUserList();
  },
  computed: {
    // 计算属性中不能改变data中的变量，放到watch中侦听
    ...mapState({
      orgList: state => state.GlobalState.orgList,
      loginUserList: state => state.GlobalState.loginUserList
    })
  },
  methods: {
    ...mapActions({
      toLogin: "toLogin",
      getOrgList: "getOrgList",
      getWorkShiftList: "getWorkShiftList",
      getWorkGroupList: "getWorkGroupList",
      getAllUserGrouptByOrgId: "getAllUserGrouptByOrgId",
      getVehicleTypeList: "getVehicleTypeList",
      getVehicleDescList: "getVehicleDescList",
      getStationList: "getStationList",
      getLoginUserList: "getLoginUserList"
    }),
    login() {
      let params = {
        jkorgid: this.curOrgid,
        loginid: this.username,
        password: this.password
      };
      this.toLogin(params).then(res => {});
      params = null;
    }
  },
  watch: {
    orgList: function(newVal, oldVal) {
      let arr = this.orgList;
      arr.length > 0 ? (this.curOrgid = arr[0].orgid) : (this.curOrgName = "");
      arr = null;
    },
    username: function(newVal, oldVal) {
      this.loginUserList.findIndex(item => {
        if (item.loginid === newVal) {
          this.curOrgid = item.jkorgid;
        }
      });
    }
  }
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
