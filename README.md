### 最新版 Webpack5

- 提取 css 成为单独文件

  1. npm install mini-css-extract-plugin
  2. 取代 style-loader 为 MiniCssExtractPlugin.loader 提取 css 为单独的文件

- css 兼容性处理

  1. npm install postcss-loader postcss-preset-env

- 压缩 css 插件

  1. npm i optimize-css-assets-webpack-plugin -D

- js 语法检查 eslint

  1. npm i eslint eslint-loader -D
  2. 在 package.json 中添加 eslintConfig，设置 eslint 配置
  3. 使用 airbnb 风格的 eslint npm i eslint-config-airbnb-base eslint-plugin-import eslint -D
  4. eslint 报错 `SyntaxError: Unexpected token {` 是 eslint 包版本问题，降一下版本

- js 兼容性处理 es6/7

  1. npm i babel-loader @babel/core @babel/preset-env -D
  2. @babel/preset-env 基础的兼容
  3. corejs 按需加载需要的 js 兼容

- 压缩 js 和 html

  1. 压缩 js，把 webpack 的 mode 改为 production 就行，webpack 自动调用 uglifyJsPlugin 的插件
  2. 压缩 html 修改 htmlWebpackPlugin 的配置

- 性能优化配置
  - 开发环境优化
    1. 打包速度
       1. hmr 只打包变化的模块
    1. 优化代码调试（source map）:一种源代码到构建后代码的映射的技术，如果构建后的代码出错了，通过映射就可以追踪源代码的错误，在
  - 生产环境优化
    1. 打包速度
       1. oneOf 每一种 loader 都会匹配一边所有文件，性能不行。使用 oneOf 规定里面的 loader 只会匹配一次
       2. 不能有两个配置处理同一种类型的文件
       3. 缓存
          - babel 缓存
            - cacheDirectory: true
            - 让第二次打包构建速度更快
          - 文件资源缓存
            - hash:每次 webpack 构建时生成的唯一 hash 值
            - 使用 contenthash:根据文件内容生成 hash
            - 这样改 js/css 文件只重新打包 js/css 的，不会重新打包另外类型的文件
    2. 代码运行的性能
- tree shaking 去除在程序中没有使用到的代码
  1. 前提条件：必须使用 es6 模块化，开启 production 环境
  2. 副作用：在 package.json 配置 `"sideEffects": false` 所有代码都没有副作用，都可以进行 treeShaking，会导致把 css/@babel/polyfill 文件 shake 掉
- code splite 代码分割：把一个 chunk 分割成多个文件，减小文件体积，还可以按需加载

  1. 设置 webpack 的 optimization 中 splitChunks ，会自动分析 chunk 中公共的文件，打包成单独的 chunk
  2. 设置多入口，webpack 会对文件分别打包，不常用
  3. 用 import 语法 动态导入某个文件 也会被单独打包，不常用

- 懒加载（需要时再加载 js）和预加载

  1. 懒加载，同样使用 import 语法 ，会先分割单独的代码，然后再懒加载（资源太大不适合）
  2. 预加载,在 import 语法中添加 webpack 魔法注释 webpackPrefetch:true。 1. 会在使用之前提前加载 2. 等正常并行加载之后，浏览器空闲，再偷偷加载这个 prefetch 的资源 （兼容性有问题）

- pwa 技术
  1. workbox => workbox-webpack-plugin
- 多进程打包
  1. npm i thread-loader -D
  2. 一般是在 babel-loader 来用

todo: https://www.bilibili.com/video/BV1e7411j7T5?p=29
