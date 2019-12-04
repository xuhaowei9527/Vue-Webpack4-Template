const menus = [
  {
    title: "测试页面",
    hasChild: true,
    routekey: "MainLayout/TestLayout",
    iconClass: "el-icon-menu",
    child: [
      {
        title: "3D测试",
        hasChild: false,
        routekey: "MainLayout/TestLayout/TestPage",
        iconClass: "el-icon-s-grid"
      }
    ]
  }
];
export default menus;
