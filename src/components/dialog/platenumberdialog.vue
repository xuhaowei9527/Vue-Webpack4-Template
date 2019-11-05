<template>
  <div class="plate_number_wrapper">
    <el-dialog
      :visible.sync="centerDialogVisible"
      width="30%"
      center
      :before-close="handleClose"
    >
      <div class="plate_number-div">
        <div v-for="(item, index) in provinces" :key="index" @click="choice">
          {{ item }}
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    centerDialogVisible: {
      type: Boolean,
      default: false
    },
    businessType: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {
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
    choice(e) {
      this.$emit("choice", e.target.innerHTML.trim());
      this.handleClose();
    },
    handleClose(done) {
      this.$emit("toggleCenter");
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
