const TestLayoutPage = () =>
  import(/* webpackChunkName: "Test" */ "@/pages/test/testlayout.vue");
const TestPage = () =>
  import(/* webpackChunkName: "Test" */ "@/pages/test/components/test.vue");

const LoginPage = () =>
  import(/* webpackChunkName: "Login" */ "@/pages/login/login.vue");
const MainLayoutPage = () =>
  import(/* webpackChunkName: "MainLayout" */ "@/pages/layout/layout.vue");

export default {
  LoginPage,
  MainLayoutPage,
  TestLayoutPage,
  TestPage
};
