const moment = require("moment");
// 引入zh-cn locale文件
require("moment/locale/zh-cn");
moment.locale("zh-cn");
function parseNowDate(params) {
  return (
    moment(params).format("HH时mm分ss秒") ||
    moment(new Date()).format("HH时mm分ss秒")
  );
}
function parseNowDateTotal(params) {
  return (
    moment(params).format("YYYY-MM-DD HH:mm:ss") ||
    moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
  );
}
export { parseNowDate, parseNowDateTotal };
