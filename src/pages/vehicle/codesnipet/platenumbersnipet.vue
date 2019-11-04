<template>
  <div class="">
    <el-dialog
      :visible.sync="dialogVisible"
      width="30%"
      center
      :before-close="handleClose"
    >
      <div class="plate_number-div">
        <div v-for="(item, index) in provinces" :key="index" @click="select">
          {{ item }}
        </div>
      </div>
    </el-dialog>
    <el-input v-model="platenumber" placeholder="请输入内容">
      <template slot="append">
        <el-button
          slot="append"
          icon="el-icon-s-operation"
          @click="toggleDialog"
        ></el-button>
      </template>
    </el-input>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    value: {
      type: String,
      default: function() {
        return "";
      }
    }
  },
  data() {
    return {
      platenumber: "",
      dialogVisible: false,
      provinces: [
        "京",
        "沪",
        "浙",
        "苏",
        "粤",
        "鲁",
        "晋",
        "冀",
        "豫",
        "川",
        "渝",
        "辽",
        "吉",
        "黑",
        "皖",
        "鄂",
        "津",
        "贵",
        "云",
        "桂",
        "琼",
        "青",
        "新",
        "藏",
        "蒙",
        "宁",
        "甘",
        "陕",
        "闽",
        "赣",
        "湘"
      ]
    };
  },
  components: {},
  methods: {
    select(e) {
      this.platenumber = e.target.innerHTML.trim();
      this.handleClose();
    },
    toggleDialog() {
      this.dialogVisible = !this.dialogVisible;
    },
    handleClose() {
      this.dialogVisible = false;
    }
  },
  watch: {
    value: {
      handler: function(e) {
        this.platenumber = e;
      },
      immediate: true
    },
    platenumber: {
      handler: function(e) {
        this.$emit("setValue", e);
      },
      immediate: true
    }
  }
};
</script>

<style scoped>
.plate_number-div {
  text-align: center;
}
.plate_number-div div {
  margin: 5px 5px 5px 5px;
  display: inline-block;
  font-size: 18px;
  padding: 5px 10px 5px 10px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  cursor: pointer;
}
</style>
