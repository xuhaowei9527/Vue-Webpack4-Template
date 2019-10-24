const orgMixins = {
  data() {
    return {
      orgList: []
    };
  },
  mounted() {
    this.getOrgList();
    // 设置默认选中站
    this.setOrgDefaultValue();
  },
  components: {},
  methods: {
    getOrgList() {
      this.orgList = JSON.parse(window.localStorage.getItem("orgList"));
    },
    setOrgDefaultValue() {
      this.Formdata.orgid = JSON.parse(
        window.localStorage.getItem("loginInfo")
      ).jkorgid;
      if (
        JSON.parse(window.localStorage.getItem("loginInfo")).orgid === "1101"
      ) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    }
  }
};

export { orgMixins };
