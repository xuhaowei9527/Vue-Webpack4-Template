<template>
  <div class="">
    <base-dialog
      :message="'是否' + commitData.label + '录像抽调记录'"
      @toggle="toggle"
      @confirm="confirm"
      :dialogVisible="dialogVisible"
    ></base-dialog>
    <div slot="header" class="clearfix">
      <span>录像抽调记录</span>
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
                v-model="videoDraftFormdata.orgid"
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
            <el-form-item label="抽调人员">
              <el-input
                v-model="videoDraftFormdata.transfername"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="所属单位/部门">
              <el-input
                v-model="videoDraftFormdata.transferdepartment"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col :span="24">
            <el-form-item label="抽调录像内容">
              <el-input
                type="textarea"
                :rows="3"
                v-model="videoDraftFormdata.transferinfo"
              >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col :span="24">
            <el-form-item label="抽调目的描述">
              <el-input
                type="textarea"
                :rows="3"
                v-model="videoDraftFormdata.transferpurdesc"
              >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col :span="24">
            <el-form-item label="编辑图片">
              <base-picture
                @uploadFile="setUploadList"
                @deleteFile="deleteFile"
                :pictureList="pictureList"
                ref="piccomponent"
              >
              </base-picture>
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
        <base-picture-table
          :propLabel="videoDraftTableHeader"
          :list="videoDraftList"
          @handleEdit="handleEdit"
          @handleDelete="handleDelete"
        >
        </base-picture-table>
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
import BasePictureTable from "../../../components/table/basepicturetable";
import BaseDialog from "../../../components/dialog/basedialog";
import BasePicture from "../../../components/picture/basepicture";
import BasePagination from "../../../components/pagination/basepagination";
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
      activeNames: [],
      orgList: [],
      dialogVisible: false,
      videoDraftFormdata: {
        id: "",
        orgid: "",
        transfername: "",
        transferdepartment: "",
        transferinfo: "",
        transferpurdesc: ""
      },
      uploadList: [],
      pictureList: [],
      remainList: []
    };
  },
  components: {
    BasePictureTable,
    BaseDialog,
    BasePagination,
    BasePicture
  },
  mounted() {
    // 获取缓存中的orglist
    this.getOrgList();
    // 设置默认选中站
    this.setOrgDefaultValue();
  },
  activated() {
    // 获取录像抽调列表
    this.getVideoDraftList();
  },
  computed: {
    ...mapState({
      height: state => state.GlobalState.height,
      videoDraftTableHeader: state =>
        state.videoDraftRecord.videoDraftTableHeader,
      videoDraftList: state => state.videoDraftRecord.videoDraftList,
      page: state => state.videoDraftRecord.page
    })
  },
  methods: {
    getOrgList() {
      this.orgList = JSON.parse(localStorage.getItem("orgList"));
    },
    setOrgDefaultValue() {
      this.videoDraftFormdata.orgid = JSON.parse(
        localStorage.getItem("loginInfo")
      ).jkorgid;
    },
    handleExpand() {},
    ...mapActions({
      getVideoDraftList: "getVideoDraftList",
      commitVideoDraftInfo: "commitVideoDraftInfo"
    }),
    changeSize(e) {
      this.$store.commit("setSize", e);
      this.getVideoDraftList();
    },
    changeCurPage(e) {
      this.$store.commit("setCurPage", e);
      this.getVideoDraftList();
    },
    setUploadList(e) {
      this.uploadList = e;
    },
    deleteFile(e) {
      this.remainList = e;
    },
    save() {
      this.dialogVisible = true;
    },
    toggle() {
      this.dialogVisible = !this.dialogVisible;
    },
    handleEdit(e) {
      this.$refs.piccomponent.resetInit();
      this.pictureList = [];
      // 删除数组最后一项,可以抽离出函数
      const arr = e.photofilename.split(";");
      arr.pop();
      arr.forEach(item =>
        this.pictureList.push({
          name: item.substring(item.lastIndexOf("/") + 1, item.length),
          url: item
        })
      );
      this.commitData.methods = "update";
      this.commitData.label = "编辑";
      Object.keys(this.videoDraftFormdata).forEach(item => {
        this.videoDraftFormdata[item] = e[item];
      });
    },
    handleDelete(e) {
      this.save();
      this.commitData.methods = "delete";
      this.commitData.label = "删除";
      this.videoDraftFormdata.id = e.id;
    },
    reset() {
      this.commitData.methods = "add";
      this.commitData.label = "添加";
      Object.keys(this.videoDraftFormdata).forEach(item => {
        if (item === "orgid") {
        } else {
          this.videoDraftFormdata[item] = "";
        }
      });
      this.$refs.piccomponent.resetInit();
    },
    confirm() {
      const formdata = new FormData();
      this.uploadList.forEach(item => {
        formdata.append(item.name, item);
      });
      const obj = JSON.parse(JSON.stringify(this.videoDraftFormdata));
      if (this.uploadList.length > 0) {
        obj.photofilename = this.uploadList.map(i => i.name).join(";");
      } else {
        obj.photofilename = "";
      }
      if (this.remainList.length > 0) {
        obj.photofilenameOld = this.remainList.map(i => i.url).join(";");
      } else {
        obj.photofilenameOld = "";
      }
      formdata.append("data", JSON.stringify(obj));
      if (this.commitData.methods === "delete") {
        this.commitData.data = {
          id: this.videoDraftFormdata.id
        };
      } else {
        this.commitData.data = formdata;
      }
      this.commitVideoDraftInfo(this.commitData).then(() => {
        this.reset();
        this.toggle();
      });
    }
  }
};
</script>

<style scoped></style>
