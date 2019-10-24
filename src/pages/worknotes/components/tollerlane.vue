<template>
  <div class="dutyrecord_page">
    <base-dialog
      :message="'是否' + commitData.label + '收费车道信息记录'"
      @toggle="toggle"
      @confirm="confirm"
      :dialogVisible="dialogVisible"
    ></base-dialog>
    <div slot="header" class="clearfix">
      <span>收费车道信息记录</span>
      <el-button @click="save" style="float: right; padding: 3px 0" type="text"
        >{{ commitData.label }}按钮</el-button
      >
      <el-button
        @click="reset"
        style="float: right; padding: 3px 10px"
        type="text"
        >重置按钮</el-button
      >
    </div>
    <div>
      <el-form>
        <el-row :gutter="15">
          <el-col :span="6">
            <el-form-item label="机构">
              <el-select
                v-model="tollerLaneFormdata.jkorgid"
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
            <el-form-item label="收费员">
              <el-select
                v-model="tollerLaneFormdata.tollid"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in tollorList"
                  :key="item.userid"
                  :label="item.username"
                  :value="item.userid"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="车道号">
              <el-select
                v-model="tollerLaneFormdata.laneid"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in laneInfoList"
                  :key="item.laneid"
                  :label="item.lanedesc"
                  :value="item.laneid"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-collapse v-model="activeNames" @change="handleExpand">
      <el-collapse-item name="1">
        <template slot="title">
          <div style="font-size: 16px;">数据列表</div>
        </template>
        <base-table
          :propLabel="tollerLineTableHeader"
          :list="tollLaneList"
          :height="height - 340"
          @handleEdit="handleEdit"
          @handleDelete="handleDelete"
        >
        </base-table>
        <base-pagination
          :page="page.currentPage"
          :total="page.total"
          :pageSize="page.pageSize"
          @changeSize="changeSize"
          @changeCurPage="changeCurPage"
        ></base-pagination>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
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
      activeNames: ["1"],
      orgList: [],
      tollList: [],
      tollerLaneFormdata: {
        id: "",
        jkorgid: "",
        tollid: "",
        laneid: ""
      },
      dialogVisible: false
    };
  },
  components: {
    BaseTable: () => import("@/components/table/basetable"),
    BaseDialog: () => import("@/components/dialog/basedialog"),
    BasePagination: () => import("@/components/pagination/basepagination")
  },
  mounted() {
    // 获取缓存中的orglist
    this.getOrgList();
    // 设置默认选中站
    this.setOrgDefaultValue();
    // 获取所有人员
    this.getAllUserGrouptByOrgId();
    // 获取收费车道
    this.getLaneInfoList();
  },
  activated() {
    // 获取收费员
    this.getTollorList();
    this.getTollLaneList();
  },
  computed: {
    ...mapState({
      height: state => state.GlobalState.height,
      tollerLineTableHeader: state => state.TollerLane.tollerLineTableHeader,
      tollLaneList: state => state.TollerLane.tollLaneList,
      page: state => state.TollerLane.page,
      curWorkGroupMember: state => state.GlobalState.curWorkGroupMember,
      laneInfoList: state => state.TollerLane.laneInfoList,
      tollorList: state => state.GlobalState.tollorList
    })
  },
  methods: {
    getOrgList() {
      this.orgList = JSON.parse(localStorage.getItem("orgList"));
    },
    setOrgDefaultValue() {
      this.tollerLaneFormdata.jkorgid = JSON.parse(
        localStorage.getItem("loginInfo")
      ).jkorgid;
    },
    handleExpand() {},
    ...mapActions({
      getTollLaneList: "getTollLaneList",
      getAllUserGrouptByOrgId: "getAllUserGrouptByOrgId",
      commitTollLaneInfo: "commitTollLaneInfo",
      getLaneInfoList: "getLaneInfoList",
      getTollorList: "getTollorList"
    }),
    changeSize(e) {
      this.$store.commit("setSize", e);
      this.getTollLaneList();
    },
    changeCurPage(e) {
      this.$store.commit("setCurPage", e);
      this.getTollLaneList();
    },
    save() {
      this.dialogVisible = true;
    },
    toggle() {
      this.dialogVisible = !this.dialogVisible;
    },
    handleEdit(e) {
      this.commitData.methods = "update";
      this.commitData.label = "编辑";
      Object.keys(this.tollerLaneFormdata).forEach(item => {
        if (item === "jkorgid") {
          this.tollerLaneFormdata[item] = e.orgid;
        } else {
          this.tollerLaneFormdata[item] = e[item];
        }
      });
    },
    handleDelete(e) {
      this.save();
      this.commitData.methods = "delete";
      this.commitData.label = "删除";
      this.tollerLaneFormdata.id = e.id;
    },
    reset() {
      this.commitData.methods = "add";
      this.commitData.label = "添加";
      Object.keys(this.tollerLaneFormdata).forEach(item => {
        if (item === "jkorgid") {
        } else {
          this.tollerLaneFormdata[item] = "";
        }
      });
    },
    confirm() {
      this.commitData.data = this.tollerLaneFormdata;
      this.commitTollLaneInfo(this.commitData).then(() => {
        this.reset();
        this.toggle();
      });
    }
  },
  watch: {}
};
</script>

<style scoped></style>
