// 开发环境  webpack ./src/index.js -o ./build/build.js --mode=development
// 生产环境  webpack ./src/index.js -o ./build/build.js --mode=production
import '../styles/index.css'
import '../styles/index.less'
import data from '../data.json' // font

import '../font/iconfont.css'

import print from './print'

import { muti } from './testTreeShaking'
import { testComp } from '$comp/test-comp.js'
testComp()
console.log('index.js 被加载了')

print()
// 暴力全部引入
// import '@babel/polyfill'
function add(x, y) {
  return x + y
}

const minus = function minus(a, b) {
  return a - b
}

const cb = (name) =>
  new Promise((res, rej) => {
    const num = Math.floor(Math.random() * 10)
    if (num > 5) {
      res({
        name
      })
    } else {
      rej(new Error('internel server error'))
    }
  })
cb('lc').then(
  (res) => {
    console.log(res)
  },
  (err) => {
    console.log('err::', err)
  }
)

console.log(add(1, 2))

console.log(minus(2, 1))

console.log(data)
console.log(muti(2, 3))

if (module.hot) {
  module.hot.accept('./print.js', () => {
    print()
  })
}

// 注册serviceWorker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(() => {
        console.log('serviceworker 注册成功')
      })
      .catch(() => {
        console.log('serviceworker 注册失败')
      })
  })
}
