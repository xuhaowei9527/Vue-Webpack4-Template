<template>
  <div class="business_type_wrapper">
    <el-dialog
      :visible.sync="centerDialogVisible"
      width="30%"
      center
      :before-close="handleClose"
    >
      <div class="business_type_div">
        <div
          v-for="(item, index) in improperTypeList"
          :key="index"
          @click="choice"
          :data-id="item.impropertypeid"
        >
          {{ item.impropertypedesc }}
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "",
  props: {
    centerDialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  mounted() {
    // 获取非正常车业务类型列表
    this.getImproperTypeList();
  },
  components: {},
  computed: {
    ...mapState({
      improperTypeList: state => state.AbnormalCar.improperTypeList
    })
  },
  methods: {
    ...mapActions({
      getImproperTypeList: "getImproperTypeList"
    }),
    choice(e) {
      this.$emit("choice", {
        id: e.target.dataset.id,
        label: e.target.innerHTML.trim()
      });
      this.handleClose();
    },
    handleClose(done) {
      this.$emit("toggleCenter");
    }
  }
};
</script>

<style scoped>
.business_type_div {
  text-align: center;
}
.business_type_div div {
  margin: 5px 5px 5px 5px;
  display: inline-block;
  font-size: 16px;
  padding: 5px 10px 5px 10px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  cursor: pointer;
}
</style>
