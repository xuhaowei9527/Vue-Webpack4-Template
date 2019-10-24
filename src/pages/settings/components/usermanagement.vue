<template>
  <div class="">
    <base-dialog
      :message="'是否' + commitData.label + '当前人员信息'"
      @toggle="delToggle"
      @confirm="confirm"
      :dialogVisible="delDialogVisible"
    ></base-dialog>
    <user-dialog
      :dialogVisible="dialogVisible"
      ref="userDialog"
      :title="commitData.label"
      :rowData="rowData"
      @toggle="toggle"
      @confirm="confirm"
    >
    </user-dialog>
    <div slot="header" class="clearfix">
      <span>用户管理</span>
      <el-button
        v-if="canmotify"
        @click="handleAdd"
        style="float: right; padding: 3px 0"
        type="text"
        >添加用户</el-button
      >
    </div>
    <base-table
      :propLabel="userListTableHeader"
      :list="userListByPage"
      :height="height - 200"
      :canmotify="canmotify"
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
  </div>
</template>

<script>
import BaseTable from "../../../components/table/usertable";
import BaseDialog from "../../../components/dialog/basedialog";
import BasePagination from "../../../components/pagination/basepagination";
import UserDialog from "../_dialog/userdialog";
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
      rowData: {},
      delRowData: {},
      dialogVisible: false,
      delDialogVisible: false,
      orgList: [],
      userListByPage: []
    };
  },
  components: {
    BaseTable,
    BasePagination,
    UserDialog,
    BaseDialog
  },
  mounted() {
    this.getUserList().then(() => {
      this.listByPage();
    });
  },
  computed: {
    ...mapState({
      height: state => state.GlobalState.height,
      canmotify: state => state.GlobalState.canmotify,
      userListTableHeader: state => state.UserManagement.userListTableHeader,
      userList: state => state.UserManagement.userList,
      page: state => state.UserManagement.page
    })
  },
  methods: {
    listByPage() {
      const start = (this.page.currentPage - 1) * this.page.pageSize;
      const end = this.page.currentPage * this.page.pageSize;
      this.userListByPage = this.userList.slice(start, end);
    },
    ...mapActions({
      getUserList: "getUserList",
      commitUserInfo: "commitUserInfo"
    }),
    handleEdit(e) {
      this.save();
      this.commitData.methods = "update";
      this.commitData.label = "编辑";
      this.rowData = e;
    },
    handleDelete(e) {
      this.delRowData = e;
      this.delDialogVisible = true;
      this.commitData.methods = "delete";
      this.commitData.label = "删除";
    },
    handleAdd() {
      this.save();
      this.rowData = {};
      this.commitData.methods = "add";
      this.commitData.label = "添加";
    },
    changeSize(e) {
      this.$store.commit("setSize", e);
    },
    changeCurPage(e) {
      this.$store.commit("setCurPage", e);
    },
    save() {
      this.dialogVisible = true;
    },
    reset() {
      this.commitData.methods = "add";
      this.commitData.label = "添加";
      this.$refs.userDialog.initDialog();
    },
    toggle() {
      this.dialogVisible = !this.dialogVisible;
    },
    delToggle() {
      this.delDialogVisible = !this.delDialogVisible;
    },
    confirm(e) {
      if (this.commitData.methods === "delete") {
        this.commitData.data = this.delRowData;
      } else {
        this.commitData.data = e;
      }
      this.commitUserInfo(this.commitData).then(() => {
        this.reset();
        if (this.dialogVisible) {
          this.dialogVisible = false;
        }
        if (this.delDialogVisible) {
          this.delDialogVisible = false;
        }
      });
    }
  },
  watch: {
    page: {
      handler: function(e) {
        this.listByPage();
      },
      immediate: true,
      deep: true
    },
    userList: {
      handler: function(e) {
        this.listByPage();
      },
      immediate: true,
      deep: true
    }
  }
};
</script>

<style scoped>
.clearfix {
  margin: 20px auto;
}
</style>
