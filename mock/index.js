const Mock = require("mockjs");
const Info = require("./info.js");
Mock.mock("http://127.0.0.1/getuser", "get", () => {
  return Info.page1;
});
