<template>
  <div class="">
    <base-dialog
      :message="'是否保存巡查异常信息记录'"
      @toggle="toggle"
      @confirm="confirm"
      :dialogVisible="dialogVisible"
    ></base-dialog>
    <div slot="header" class="clearfix">
      <span>巡查异常信息记录</span>
      <el-button @click="save" style="float: right; padding: 3px 0" type="text"
        >添加按钮</el-button
      >
    </div>
    <div>
      <el-form>
        <el-row :gutter="15">
          <el-col :span="6">
            <el-form-item label="机构">
              <el-select
                v-model="patrolnotesInit.orgid"
                disabled
                placeholder="请选择"
              >
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
          <el-col :span="6">
            <el-form-item label="室温">
              <el-input
                v-model="patrolnotesInit.roomtemp"
                placeholder="请输入内容"
              >
                <template slot="append">℃</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="湿度">
              <el-input
                v-model="patrolnotesInit.roomhum"
                placeholder="请输入内容"
              >
                <template slot="append">%RH</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="记录时间">
              <el-date-picker
                v-model="patrolnotesInit.redate"
                type="datetime"
                placeholder="选择日期时间"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col :span="6">
            <el-form-item label="白班签字">
              <el-select v-model="patroluserList" multiple placeholder="请选择">
                <el-option
                  v-for="item in curWorkGroupMember"
                  :key="item.userid"
                  :label="item.username"
                  :value="item.userid"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col :span="24">
            <el-table :data="patrolnotesInit.patrolitems" style="width: 100%">
              <el-table-column fixed type="index" label="序号" width="70">
              </el-table-column>
              <el-table-column prop="rpdesc" label="巡查项目" sortable>
              </el-table-column>
              <el-table-column label="状态记录">
                <el-table-column prop="patrolstate" label="良好" width="180">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.patrolstate">
                      <el-option :label="'是'" :value="'1'"></el-option>
                      <el-option :label="'否'" :value="'0'"></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column prop="faultdesc" label="故障现象" width="180">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.faultdesc"></el-input>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column prop="remark" label="备注" sortable width="180">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.remark"></el-input>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col :span="24">
            <el-form-item label="值班记录">
              <el-input
                type="textarea"
                :rows="2"
                v-model="patrolnotesInit.remark"
              >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
import BaseDialog from "../../../components/dialog/basedialog";
import { mapState, mapActions } from "vuex";
export default {
  name: "",
  data() {
    return {
      commitData: {
        methods: "add",
        data: {},
        label: "添加"
      },
      orgList: [],
      patroluserList: [],
      patrolnotesInit: {},
      patrolnotesFormdata: {
        jkorgid: "",
        roomtemp: "",
        roomhum: "",
        redate: "",
        remark: "",
        patrolitems: [],
        patroluserid: []
      },
      dialogVisible: false
    };
  },
  components: {
    BaseDialog
  },
  mounted() {
    // 获取缓存中的orglist
    this.getOrgList();
    // 设置默认选中站
    this.setOrgDefaultValue();
    // 获取所有人员
    this.getAllUserGrouptByOrgId();
  },
  activated() {
    this.getPatrolNotes();
  },
  computed: {
    ...mapState({
      curWorkGroupMember: state => state.GlobalState.curWorkGroupMember,
      patroNotes: state => state.PatrolNotes.patroNotes
    })
  },
  methods: {
    getOrgList() {
      this.orgList = JSON.parse(localStorage.getItem("orgList"));
    },
    setOrgDefaultValue() {
      this.patrolnotesFormdata.jkorgid = JSON.parse(
        localStorage.getItem("loginInfo")
      ).jkorgid;
    },
    ...mapActions({
      getPatrolNotes: "getPatrolNotes",
      getAllUserGrouptByOrgId: "getAllUserGrouptByOrgId",
      commitPatrolNotesInfo: "commitPatrolNotesInfo"
    }),
    save() {
      this.dialogVisible = true;
    },
    toggle() {
      this.dialogVisible = !this.dialogVisible;
    },
    confirm() {
      this.patroNotes.patroluserid = [];
      this.patroluserList.forEach(item => {
        this.patroNotes.patroluserid.push({
          userid: item
        });
      });
      this.commitData.data = this.patroNotes;
      this.commitData.data.jkorgid = this.patroNotes.orgid;
      this.commitPatrolNotesInfo(this.commitData).then(() => {
        this.toggle();
      });
    }
  },
  watch: {
    patroNotes: {
      handler: function(e) {
        if (e && e !== {}) {
          this.patrolnotesInit = e;
          this.patroluserList = [];
          e.patroluserid.forEach(item => this.patroluserList.push(item.userid));
        }
      },
      // 立即执行会触发两次watch
      // immediate: true,
      deep: true
    }
  }
};
</script>

<style scoped>
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}
</style>
