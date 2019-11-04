<template>
  <div class="">
    <el-select v-model="laneid" placeholder="请选择">
      <el-option
        v-for="item in tollLaneList"
        :key="item.laneid"
        :label="item.lanedesc"
        :value="item.laneid"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
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
      laneid: ""
    };
  },
  mounted() {
    this.getTollLaneList();
  },
  components: {},
  computed: {
    ...mapState({
      tollLaneList: state => state.TollerLane.tollLaneList
    })
  },
  methods: {
    ...mapActions({
      getTollLaneList: "getTollLaneList"
    })
  },
  watch: {
    value: {
      handler: function(val) {
        this.laneid = "";
        this.tollLaneList.forEach(item => {
          if (item.tollid === val) {
            this.laneid = item.laneid;
          }
        });
      },
      immediate: true,
      deep: true
    },
    laneid: {
      handler: function(val) {
        this.$emit("setValue", val);
      },
      immediate: true
      // deep: true
    }
  }
};
</script>

<style scoped></style>
