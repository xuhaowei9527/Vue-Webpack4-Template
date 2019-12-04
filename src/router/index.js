import Vue from "vue";
import VueRouter from "vue-router";
import Register from "./register";

Vue.use(VueRouter);

const baseConfig = {
  routes: [
    {
      path: "/",
      name: "LoginPage",
      component: Register.LoginPage
    },
    {
      path: "/MainLayout",
      name: "MainLayout",
      component: Register.MainLayoutPage,
      children: [
        {
          path: "TestLayout",
          component: Register.TestLayoutPage,
          children: [
            {
              path: "TestPage",
              component: Register.TestPage
            }
          ]
        }
      ]
    }
  ]
};

export default new VueRouter(baseConfig);
