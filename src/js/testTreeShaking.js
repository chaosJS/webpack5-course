// 测试treeshaking

export function muti(x, y) {
  console.log('xxx');
  return x * y;
}

export function test(x, y) {
  return `${x - y}sss`;
}
