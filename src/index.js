//开发环境  webpack ./src/index.js -o ./build/build.js --mode=development
//生产环境  webpack ./src/index.js -o ./build/build.js --mode=production

function add(x, y) {
  return x + y
}
import './index.css'
import './index.less'
import data from './data.json'
// font

import './font/iconfont.css'
console.log(add(1, 2))
console.log(data)
