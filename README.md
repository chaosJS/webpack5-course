### 最新版 Webpack5

todo: https://www.bilibili.com/video/BV1e7411j7T5?p=19

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

- 生产环境的配置

1.
