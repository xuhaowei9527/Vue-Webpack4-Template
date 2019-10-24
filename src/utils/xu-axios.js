const axios = require("axios");
const root = "/NoPaper";
// 自定义判断元素类型JS
function toType(obj) {
  return {}.toString
    .call(obj)
    .match(/\s([a-zA-Z]+)/)[1]
    .toLowerCase();
}
// 参数过滤函数
function filterNull(o) {
  for (var key in o) {
    if (o[key] === null) {
      delete o[key];
    }
    if (toType(o[key]) === "string") {
      o[key] = o[key].trim();
    } else if (toType(o[key]) === "object") {
      o[key] = filterNull(o[key]);
    } else if (toType(o[key]) === "array") {
      o[key] = filterNull(o[key]);
    }
  }
  return o;
}
function apiAxios(method, url, params, success, failure) {
  if (params) {
    params = filterNull(params);
  }
  axios({
    method: method,
    url: url,
    data: method === "POST" || method === "PUT" ? params : null,
    params: method === "GET" || method === "DELETE" ? params : null,
    baseURL: root,
    withCredentials: false
  })
    .then(function(res) {
      if (res.data != null && res.data.resultCode === "100") {
        success(res.data);
      } else {
        if (failure) {
          failure(res.data);
        } else {
          console.log("error: " + JSON.stringify(res.data));
        }
      }
    })
    .catch(function(err) {
      const res = err.response;
      if (err) {
        if (res.status === 302) {
          // _this.$router.push('/')
        }
      }
    });
}

// 返回在vue模板中的调用接口
export default {
  get: function(url, params, success, failure) {
    return apiAxios("GET", url, params, success, failure);
  },
  post: function(url, params, success, failure) {
    return apiAxios("POST", url, params, success, failure);
  },
  put: function(url, params, success, failure) {
    return apiAxios("PUT", url, params, success, failure);
  },
  delete: function(url, params, success, failure) {
    return apiAxios("DELETE", url, params, success, failure);
  },
  postFile: function(url, params, config, success, failure) {
    return apiAxios("POST", url, params, config, success, failure);
  }
};
