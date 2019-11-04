<template>
  <div class="">
    <el-select
      filterable
      :filter-method="StationFilter"
      v-model="Station"
      placeholder="请选择"
    >
      <el-option
        v-for="item in FilterStationList"
        :key="item.id"
        :label="item.stationname + ' code: ' + item.id"
        :value="item.stationname"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    // 控制默认站显示
    switch: {
      type: Boolean,
      default: function() {
        return false;
      }
    },
    value: {
      type: String,
      default: function() {
        return "";
      }
    }
  },
  data() {
    return {
      DefaultOrgname: "",
      Station: "",
      StationList: [],
      FilterStationList: []
    };
  },
  beforeCreate() {},
  mounted() {
    this.getStationList();
    this.DefaultOrgname = JSON.parse(
      localStorage.getItem("loginInfo")
    ).jkorgname;
    this.init();
  },
  components: {},
  methods: {
    init() {
      if (this.switch) {
        this.Station = this.DefaultOrgname;
      } else {
        this.Station = "";
      }
    },
    StationFilter(e) {
      this.FilterStationList = [];
      if (!isNaN(Number(e))) {
        // 判断是数字字符串去id中比较 enterFilterStationList
        this.StationList.forEach(item => {
          if (item.id.includes(e)) {
            this.FilterStationList.push(item);
          }
        });
      } else {
        // 非数字去stationname中比较
        this.StationList.forEach(item => {
          if (item.stationname.includes(e)) {
            this.FilterStationList.push(item);
          }
        });
      }
    },
    getStationList() {
      this.StationList = JSON.parse(localStorage.getItem("stationList"));
      this.FilterStationList = this.StationList;
    }
  },
  watch: {
    // 组件加载初始化默认收费站
    DefaultOrgname: {
      handler: function(val) {
        if (this.switch) {
          this.Station = val;
        }
      },
      immediate: true,
      deep: true
    },
    // 收费站变化触发更新操作
    Station: {
      handler: function(val) {
        if (val && val.length > 0) {
          this.StationList.forEach(item => {
            if (item.stationname.includes(val)) {
              this.$emit("setStation", item);
            }
          });
        } else {
          this.$emit("setStation", {});
        }
      },
      immediate: true,
      deep: true
    },
    // 用于编辑操作
    value: {
      handler: function(val) {
        this.Station = val;
      },
      deep: true
    }
  }
};
</script>

<style scoped></style>
