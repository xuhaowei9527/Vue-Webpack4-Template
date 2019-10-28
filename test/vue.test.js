// 导入 Vue.js 和组件，进行测试
import { mount } from "@vue/test-utils";
import Component from "../src/test/vue.demo.vue";

describe("Component", () => {
  test("is a Vue instance", () => {
    const wrapper = mount(Component);
    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
