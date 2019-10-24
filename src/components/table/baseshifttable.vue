<template>
  <div class="" style="display: block">
    <el-table :data="list" stripe style="width: 100%">
      <el-table-column fixed type="index" label="序号" width="70">
      </el-table-column>
      <el-table-column
        v-for="(item, index) in propLabel"
        :key="index"
        :prop="item.propkey"
        :label="item.proplabel"
        :width="item.wh"
      >
        <template slot-scope="scope">
          <div v-html="reparse(item.propkey, scope.row[item.propkey])"></div>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
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
        return [];
      }
    },
    parseItem: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {};
  },
  components: {},
  methods: {
    reparse(name, value) {
      //  对于对应字段做特殊处理
      const flag = this.parseItem.includes(name);
      if (flag) {
        return `<div style='white-space: pre-wrap'>${value.trim()}</div>`;
      } else {
        return value;
      }
    }
  }
};
</script>

<style scoped></style>
