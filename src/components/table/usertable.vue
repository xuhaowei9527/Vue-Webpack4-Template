<template>
  <div class="" style="display: block">
    <el-table
      :data="
        rows.filter(data =>
          search !== ''
            ? data.username.toLowerCase().includes(search.toLowerCase())
            : rows
        )
      "
      stripe
      border
      :height="height"
      style="width: 100%"
    >
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
      <el-table-column fixed="right" width="200">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            clearable
            placeholder="输入用户名搜索"
          />
          <div style="display: none">{{ scope.row }}</div>
        </template>
        <template slot-scope="scope">
          <el-button
            v-if="canmotify"
            @click="handleEdit(scope.row)"
            type="text"
            size="small"
            >编辑</el-button
          >
          <el-button
            v-if="canmotify"
            @click="handleDelete(scope.row)"
            type="text"
            size="small"
            >删除</el-button
          >
        </template>
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
    parseItem: {
      type: Array,
      default: function() {
        return [];
      }
    },
    filterItem: {
      type: Array,
      default: function() {
        return [];
      }
    },
    height: {
      type: Number,
      default: function() {
        return 100;
      }
    },
    canmotify: {
      type: Boolean,
      default: function() {
        return false;
      }
    }
  },
  data() {
    return {
      rows: [],
      search: ""
    };
  },
  components: {},
  methods: {
    handleEdit(e) {
      this.$emit("handleEdit", e);
    },
    handleDelete(e) {
      this.$emit("handleDelete", e);
    },
    reparse(name, value) {
      if (name === "password") {
        return "******";
      }
      if (this.filterItem && this.filterItem.length > 0) {
        const flagFilter = this.filterItem.includes(name);
        if (flagFilter) {
          return value === "1" ? "是" : "否";
        } else {
          //  对于对应字段做特殊处理
          const flagParse = this.parseItem.includes(name);
          if (flagParse) {
            return `<div style='white-space: pre-wrap'>${value.trim()}</div>`;
          } else {
            return value;
          }
        }
      } else {
        //  对于对应字段做特殊处理
        const flagParse = this.parseItem.includes(name);
        if (flagParse) {
          return `<div style='white-space: pre-wrap'>${value.trim()}</div>`;
        } else {
          return value;
        }
      }
    }
  },
  watch: {
    search: {
      handler: function(e) {},
      immediate: true,
      deep: true
    },
    list: {
      handler: function(e) {
        this.rows = JSON.parse(JSON.stringify(e));
      },
      immediate: true,
      deep: true
    }
  }
};
</script>

<style scoped></style>
