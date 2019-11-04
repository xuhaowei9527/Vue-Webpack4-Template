<template>
  <div class="">
    <el-select v-model="tollid" placeholder="请选择">
      <el-option
        v-for="item in tollLaneList"
        :key="item.tollid"
        :label="item.tollname"
        :value="item.tollid"
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
      tollid: ""
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
        this.tollid = "";
        this.tollLaneList.forEach(item => {
          if (item.laneid === val) {
            this.tollid = item.tollid;
          }
        });
      },
      immediate: true,
      deep: true
    },
    tollid: {
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
