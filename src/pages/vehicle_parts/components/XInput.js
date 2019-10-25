import Vue from "vue";

const model = {
  name: "x-input",
  label: "机构",
  v: "v",
  class: "el-input__inner"
};

export default Vue.component(model.name, {
  props: {
    v: model.label
  },
  render: function(createElement) {
    var self = this;
    console.log(this);
    return createElement("input", {
      attrs: {
        class: model.class
      },
      domProps: {
        value: self.value
      },
      on: {
        input: function(event) {
          console.log(event);
          event.target.dataset[model.v] = event.target.value;
          self.$emit("input", event.target.value);
        }
      }
    });
  }
});
