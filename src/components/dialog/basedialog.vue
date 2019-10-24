<template>
  <div class="">
    <el-dialog
      title="Tips"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <h3>{{ message }}</h3>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    message: {
      type: String,
      default: ""
    }
  },
  data() {
    return {};
  },
  components: {},
  methods: {
    handleClose(done) {
      this.$emit("toggle");
    },
    confirm() {
      this.$emit("confirm");
    }
  }
};
</script>

<style scoped></style>
