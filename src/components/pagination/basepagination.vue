<template>
  <div class="pagination-wrapper">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="cp"
      :page-sizes="[5, 10, 50, 100]"
      :page-size="ps"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tt"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    currentPage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 5
    },
    total: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      cp: 1,
      ps: 5,
      tt: 0
    };
  },
  components: {},
  methods: {
    handleSizeChange(val) {
      this.$emit("changeSize", val);
    },
    handleCurrentChange(val) {
      this.$emit("changeCurPage", val);
    }
  },
  watch: {
    currentPage: {
      handler(val, oldval) {
        this.cp = val;
      },
      immediate: true,
      deep: true
    },
    pageSize: {
      handler(val, oldval) {
        this.ps = val;
      },
      immediate: true,
      deep: true
    },
    total: {
      handler(val, oldval) {
        this.tt = val;
      },
      immediate: true,
      deep: true
    }
  }
};
</script>

<style scoped>
.pagination-wrapper {
  margin: 20px 0px 0px 0px;
  text-align: right;
}
</style>
