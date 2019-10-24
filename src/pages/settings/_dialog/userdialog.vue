<template>
  <div class="">
    <el-dialog
      :title="title + '用户'"
      :visible.sync="dialogVisible"
      width="70%"
      :before-close="handleClose"
    >
      <el-form>
        <el-row :gutter="15">
          <el-col :span="8">
            <el-form-item label="用户名">
              <el-input
                v-model="userFormdata.username"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="登录名">
              <el-input
                v-model="userFormdata.loginid"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="密码">
              <el-input
                type="password"
                v-model="userFormdata.password"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col :span="8">
            <el-form-item label="性别">
              <el-select v-model="userFormdata.sexid">
                <el-option :label="'男'" :value="'男'"></el-option>
                <el-option :label="'女'" :value="'女'"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="岗位">
              <el-select v-model="userFormdata.postid" placeholder="请选择">
                <el-option
                  v-for="item in postList"
                  :key="item.postid"
                  :label="item.postdesc"
                  :value="item.postid"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="班组">
              <el-select
                v-model="userFormdata.workgroupid"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in workGroupList"
                  :key="item.workgroupid"
                  :label="item.workgroupdesc"
                  :value="item.workgroupid"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col :span="8">
            <el-form-item label="角色">
              <el-select v-model="userFormdata.roleid" placeholder="请选择">
                <el-option
                  v-for="item in roleList"
                  :key="item.roleid"
                  :label="item.rolename"
                  :value="item.roleid"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="机构">
              <el-select v-model="userFormdata.orgid" placeholder="请选择">
                <el-option
                  v-for="item in orgList"
                  :key="item.orgid"
                  :label="item.orgname"
                  :value="item.orgid"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="监控机构">
              <el-select v-model="userFormdata.jkorgid" placeholder="请选择">
                <el-option
                  v-for="item in orgList"
                  :key="item.orgid"
                  :label="item.orgname"
                  :value="item.orgid"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "",
  props: {
    title: {
      type: String,
      default: function() {
        return "";
      }
    },
    dialogVisible: {
      type: Boolean,
      default: false
    },
    rowData: {
      type: Object,
      default: function() {
        return "";
      }
    }
  },
  data() {
    return {
      userFormdata: {
        userid: "",
        username: "",
        loginid: "",
        password: "",
        postid: "",
        roleid: "",
        workgroupid: "",
        sexid: "",
        orgid: "1101",
        jkorgid: ""
      },
      orgList: []
    };
  },
  components: {},
  mounted() {
    // 获取缓存中的orglist
    this.getOrgList();
    // 设置默认选中站
    this.setOrgDefaultValue();
    this.getRoleList();
    this.getWorkGroupList();
    this.getPostList();
  },
  computed: {
    ...mapState({
      postList: state => state.UserManagement.postList,
      roleList: state => state.UserManagement.roleList,
      workGroupList: state => state.UserManagement.workGroupList
    })
  },
  methods: {
    initDialog() {
      Object.keys(this.userFormdata).forEach(i => {
        if (i !== "orgid") {
          this.userFormdata[i] = "";
        }
      });
      this.setOrgDefaultValue();
    },
    ...mapActions({
      getRoleList: "getRoleList",
      getWorkGroupList: "getWorkGroupList",
      getPostList: "getPostList"
    }),
    getOrgList() {
      this.orgList = JSON.parse(localStorage.getItem("orgList"));
    },
    setOrgDefaultValue() {
      this.userFormdata.jkorgid = JSON.parse(
        localStorage.getItem("loginInfo")
      ).orgid;
    },
    handleClose(done) {
      this.$emit("toggle");
    },
    confirm() {
      this.$emit("confirm", this.userFormdata);
    }
  },
  watch: {
    rowData: {
      handler: function(val) {
        const objV = Object.keys(val);
        const obj = Object.keys(this.userFormdata);
        if (objV.length === 0) {
          obj.forEach(i => {
            this.userFormdata[i] = "";
          });
          this.userFormdata.orgid = "1101";
          this.setOrgDefaultValue();
        } else {
          obj.forEach(i => {
            this.userFormdata[i] = val[i];
          });
        }
      },
      immediate: true,
      deep: true
    }
  }
};
</script>

<style scoped></style>
