<template>
  <div class="">
    <el-select v-model="vehicledescid" placeholder="请选择">
      <el-option
        v-for="item in vehicleDescList"
        :key="item.vehicledescid"
        :label="item.cartrucktype"
        :value="item.vehicledescid"
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
      vehicledescid: "",
      vehicleDescList: []
    };
  },
  mounted() {
    this.getVehicle();
  },
  components: {},
  methods: {
    getVehicle() {
      this.vehicleDescList = JSON.parse(
        localStorage.getItem("vehicleDescList")
      );
    }
  },
  watch: {
    value: {
      handler: function(val) {
        this.vehicledescid = val;
      },
      immediate: true
    },
    vehicledescid: {
      handler: function(val) {
        this.$emit("setVehicledescid", val);
      },
      immediate: true
    }
  }
};
</script>

<style scoped></style>
