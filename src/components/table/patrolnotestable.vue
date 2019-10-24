<template>
  <div class="" style="display: block">
    <el-table :data="list" :height="height" border stripe style="width: 100%">
      <el-table-column fixed type="index" label="序号" width="70">
      </el-table-column>
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="值班人员" style="display: block;">
              <div>{{ props.row.patroluserid.join(";") }}</div>
            </el-form-item>
            <el-form-item label="巡查异常项目">
              <div>
                <ul
                  @click="previewImg(item)"
                  v-for="(item, index) in props.row.patrolitems"
                  :key="index"
                >
                  <li>
                    <strong>
                      <p style="margin: 0px;padding: 0px;">
                        {{ item.patrolitemid }}、{{ item.rpdesc }}。
                      </p>
                    </strong>
                    <div>
                      <b>是否良好</b>--{{
                        item.patrolstate === "0" ? "否" : "是"
                      }}。 <b>故障现象</b>--{{ item.faultdesc }}。
                      <b>备注</b>--{{ item.remark }}。
                    </div>
                  </li>
                </ul>
              </div>
            </el-form-item>
          </el-form>
        </template>
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
        return 100;
      }
    }
  },
  data() {
    return {};
  },
  components: {},
  methods: {
    handleEdit(e) {
      this.$emit("handleEdit", e);
    },
    handleDelete(e) {
      this.$emit("handleDelete", e);
    }
  }
};
</script>

<style scoped>
ul,
li {
  padding: 0;
  margin: 0;
  list-style: none;
}
</style>
