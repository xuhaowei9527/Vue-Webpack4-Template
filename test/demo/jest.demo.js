// import axios from "axios";
// 接受参数返回相加结果
function sum(...array) {
  let index = -1;
  let sum = 0;
  const length = array == null ? 0 : array.length;

  while (++index < length) {
    sum = sum + array[index];
  }
  return sum;
}

class Hook {
  constructor() {
    this.init();
  }

  init() {
    this.a = 1;
    this.b = 1;
  }

  sum() {
    return this.a + this.b;
  }
}

function every(array, predicate) {
  let index = -1;
  const length = array == null ? 0 : array.length;

  while (++index < length) {
    if (!predicate(array[index], index, array)) {
      return false;
    }
  }
  return true;
}

function foreach(arr, fn) {
  for (let i = 0, len = arr.length; i < len; i++) {
    fn(arr[i]);
  }
}

function getIntArray(num) {
  if (!Number.isInteger(num)) {
    throw Error('"getIntArray"只接受整数类型的参数');
  }

  const result = [];
  for (let i = 0, len = num; i < len; i++) {
    result.push(i);
  }

  return result;
}

function fetchUser() {
  // return axios
  //   .get("http://jsonplaceholder.typicode.com/users/1")
  //   .then(res => {
  //     console.log(res);
  //     return res.data;
  //   })
  //   .catch(error => console.log(error));
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        id: 1,
        name: "Leanne Graham",
        username: "Bret",
        email: "Sincere@april.biz",
        address: {
          street: "Kulas Light",
          suite: "Apt. 556",
          city: "Gwenborough",
          zipcode: "92998-3874",
          geo: {
            lat: "-37.3159",
            lng: "81.1496"
          }
        },
        phone: "1-770-736-8031 x56442",
        website: "hildegard.org",
        company: {
          name: "Romaguera-Crona",
          catchPhrase: "Multi-layered client-server neural-net",
          bs: "harness real-time e-markets"
        }
      });
    }, 500);
  });
}

export default {
  sum,
  Hook,
  every,
  foreach,
  getIntArray,
  fetchUser
};
// export default导出匿名对象,引用方式import a from ‘地址’ a.**

// node模块导出方式, 引用方式 import a from ‘地址’ a
// module.exports = sum;
