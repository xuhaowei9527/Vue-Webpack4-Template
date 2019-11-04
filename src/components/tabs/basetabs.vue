<template>
  <el-tabs v-model="currentActiveName" @tab-click="handleClick">
    <el-tab-pane
      v-for="(item, index) in labelArray"
      :key="index"
      :label="item.label"
      :name="item.name"
    >
    </el-tab-pane>
  </el-tabs>
</template>
<script>
// type="border-card"
export default {
  props: {
    labelArray: {
      type: Array,
      default: function() {
        return [];
      }
    },
    activeName: {
      type: String,
      default: ""
    }
  },
  mounted() {},
  data() {
    return {
      currentActiveName: ""
    };
  },
  methods: {
    handleClick(tab, event) {
      this.$emit("handleClick", tab);
    }
  },
  watch: {
    activeName: {
      handler: function(newQuestion, oldQuestion) {
        this.currentActiveName = newQuestion;
      },
      immediate: true
    }
  }
};
</script>
