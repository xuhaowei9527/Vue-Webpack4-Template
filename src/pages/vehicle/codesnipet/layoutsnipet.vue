<template>
  <div class="">
    <el-form>
      <el-row :gutter="15" v-for="(i, idx) in innerarr" :key="idx">
        <el-col :span="24 / i.length" v-for="(j, jdx) in i.arr" :key="jdx">
          <el-form-item :label="j !== undefined ? j.label : ''"
            ><slot :name="j !== undefined ? j.name : ''"></slot
          ></el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      innerarr: []
    };
  },
  props: {
    arr: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  mounted() {},
  components: {},
  watch: {
    arr: {
      handler: function(val) {
        if (val && val.length > 0) {
          this.innerarr = val;
        }
      },
      immediate: true,
      deep: true
    }
  }
};
</script>

<style scoped></style>
