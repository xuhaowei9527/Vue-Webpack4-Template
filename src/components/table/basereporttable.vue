<template>
  <div class="" style="display: block">
    <el-table :data="list" :height="height" border stripe style="width: 100%">
      <el-table-column fixed type="index" label="序号" width="70">
      </el-table-column>
      <el-table-column
        v-for="(item, index) in propLabel"
        :key="index"
        :prop="item.propkey"
        :label="item.proplabel"
        :width="item.wh"
      >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    list: {
      type: Array,
      default: function() {
        return [];
      }
    },
    propLabel: {
      type: Array,
      default: function() {
        return {};
      }
    },
    height: {
      type: Number,
      default: function() {
        return 50;
      }
    }
  },
  data() {
    return {};
  },
  components: {},
  methods: {}
};
</script>

<style scoped></style>
