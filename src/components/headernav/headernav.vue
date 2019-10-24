<template>
  <div class="header_nav_wrapper">
    <div class="header_logo"></div>
    <div class="header_content">
      <p class="zh_title">河北邢汾高速公路无纸化办公信息系统</p>
      <p class="en_title">
        Paperless Office Information System of Xingfen Expressway in Hebei
        Province
      </p>
    </div>
    <div class="header_info">
      <div class="header_info_content">
        <p>{{ info.jkorgname }}</p>
        <p>{{ info.username }}</p>
      </div>
      <div class="header_logout" @click="loginOut"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
    return {
      info: {}
    };
  },
  components: {},
  mounted() {
    // 3、从本地存储删除某个已保存的数据
    // localStorage.removeItem('Author');
    // 4、清除所有保存的数据
    // localStorage.clear();
    this.info = JSON.parse(localStorage.getItem("loginInfo"));
  },
  methods: {
    loginOut() {
      this.$router.push("/");
    }
  },
  destroyed() {
    localStorage.removeItem("loginInfo");
    localStorage.removeItem("orgList");
    localStorage.removeItem("workShiftList");
    localStorage.removeItem("workGroupList");
    localStorage.removeItem("vehicleTypeList");
    localStorage.removeItem("vehicleDescList");
    localStorage.removeItem("stationList");
  }
};
</script>

<style scoped>
.header_nav_wrapper {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  top: 0;
  left: 0;
  background-color: #00b89b;
  width: 100%;
  height: 100%;
}
.header_logo {
  position: relative;
  left: 65px;
  top: 10px;
  width: 50px;
  height: 50px;
  background-size: cover;
  background-position-x: center;
  background-position-y: center;
  background-image: url("../../../static/image/logo.png");
}
.header_content {
  position: relative;
  height: inherit;
  left: 75px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  color: #fff;
}
.header_content p {
  margin: 0;
  padding: 0;
}
.header_content .zh_title {
  font-size: 24px;
}
.header_content .en_title {
  font-size: 14px;
}

.header_info {
  position: absolute;
  width: 200px;
  height: inherit;
  right: 0px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.header_info_content p {
  margin: 0;
  padding: 0;
  font-size: 14px;
  color: #fff;
}
.header_logout {
  margin-left: 15px;
  margin-right: 25px;
  width: 30px;
  height: 30px;
  background-size: contain;
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAABGklEQVRoQ+3ZwQ6CMAwGYHgM+pbe9GS8efQpt8fQLNFEImP9B8W/STlvo187RgPj4Pwancc/BODfFYwK0FYgpfQ8KjgR6d4J1YkBAMpnXoEtNwAcXUNVWygAXbnVTaKoQM75Ok3TTRfyfBQF4H3iXUTkjiKYACV2GMEGgBGMAAjBClAjmAEqBDugifAAWEWYAIw62cUj1hNgsRLeAAVxEpHH543tETDbSt4AP8+BJ8BxDzHaUSpOrWqTZ1KBnQGrHSo7oNleMwOawZdKswJUwbMC1MEzAqDg2QBw8EyAc88XCRoA+t74Hk9xCgVgKQOK/mRL4mZzt3w8Vm2h3SKtLBQA6wxbrt/9c80yKGTtACDZshgbFbDIKrLmC+nyBkClGwgvAAAAAElFTkSuQmCC");
}
</style>
