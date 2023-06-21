// bind从何而来？
function fn1() {
  console.log(this);
}
// eslint-disable-next-line no-proto
// console.log(fn1.__proto__ === Function.prototype);
// eslint-disable-next-line no-extend-native
Function.prototype.bind2 = function () {
  // 将参数拆解为数组 [Arguments] { '0': { '1': 2 }, '1': 3, '2': 4, '3': 5 }
  const args = Array.prototype.slice.bind(arguments)();

  const self = this;
  return function () {
    return self.apply(args);
  };
};
fn1.bind2({ 1: 23 }, 123)();
