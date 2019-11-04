<template>
  <div class="">
    <el-select v-model="vehicletypeid" placeholder="请选择">
      <el-option
        v-for="item in vehicleTypeList"
        :key="item.vehicletypeid"
        :label="item.vehicletypedesc"
        :value="item.vehicletypeid"
      >
      </el-option>
    </el-select>
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
      vehicletypeid: "",
      vehicleTypeList: []
    };
  },
  mounted() {
    this.getVehicle();
  },
  components: {},
  methods: {
    getVehicle() {
      this.vehicleTypeList = JSON.parse(
        localStorage.getItem("vehicleTypeList")
      );
    }
  },
  watch: {
    value: {
      handler: function(val) {
        this.vehicletypeid = val;
      },
      immediate: true
    },
    vehicletypeid: {
      handler: function(val) {
        this.$emit("setVehicletypeid", val);
      },
      immediate: true
    }
  }
};
</script>

<style scoped></style>
