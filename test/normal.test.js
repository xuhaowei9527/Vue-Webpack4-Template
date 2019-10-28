import _default from "./demo/jest.demo.js";
describe("测试方法", () => {
  test("测试sum", () => {
    expect(_default.sum(1, 2)).toBe(3);
    expect(_default.sum(1, 2, 3)).toBe(6);
  });
});

describe("测试class", () => {
  const hook = new _default.Hook();
  // 每个测试用例执行前都会还原数据，所以下面两个测试可以通过。
  beforeEach(() => {
    hook.init();
  });

  test("test hook 1", () => {
    hook.a = 2;
    hook.b = 2;
    expect(hook.sum()).toBe(4);
  });

  test("test hook 2", () => {
    expect(hook.sum()).toBe(2);
  });
});

describe("测试方法getIntArray", () => {
  test("getIntArray(3)返回的数组长度应该为3", () => {
    expect(_default.getIntArray(3)).toHaveLength(3);
  });
  test("getIntArray(3.3)应该抛出错误", () => {
    const getIntArrayWrapFn = jest.fn(() => _default.getIntArray(3.3));
    // or
    // 必须使用一个函数将将被测试的函数做一个包装，正如上面getIntArrayWrapFn所做的那样，否则会因为函数抛出导致该断言失败
    // function getIntArrayWrapFn() {
    //   _default.getIntArray(3.3);
    // }
    expect(getIntArrayWrapFn).toThrow('"getIntArray"只接受整数类型的参数');
  });
});

describe("测试异步数据", () => {
  test("fetchUser() 可以请求到一个含有name属性值为Leanne Graham的对象", () => {
    expect.assertions(1);
    return _default.fetchUser().then(data => {
      expect(data.name).toBe("Leanne Graham");
    });
  });

  // test("fetchUser() 可以请求到一个用户名字为Leanne Graham", async () => {
  //   expect.assertions(1);
  //   const data = await _default.fetchUser();
  //   expect(data.name).toBe("Leanne Graham");
  // });
});
