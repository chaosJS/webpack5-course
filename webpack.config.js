const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'build.js',
    // __dirname 当前文件的目录绝对路径
    path: path.resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // 将js中的css资源（字符串）提取出来，放到style标签中，添加到head中
          'style-loader',
          // 将css文件转变成commonjs模块加载到js中，样式字符串
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.jpeg|jpg|png$/,
        // install 两个loader 一个是url-loader  一个是file-loader
        loader: 'url-loader',
        options: {
          // 图片小于10k用base64
          limit: 10 * 1024,
          // url loader 默认使用es6模块，旧版html-loader 引入图片使用commonjs
          // 报错的话，可以关闭url-loader的es6 模块化
          // esModule: false

          // 重命名
          name: '[hash:10].[ext]'
        }
      },
      {
        // html文件中的img标签路径
        test: /\.html$/,
        loader: 'html-loader'
      },
      // font loader
      {
        test: /\.(woff|svg|eot|ttf)$/,
        loader: 'url-loader'
      }
    ]
  },
  plugins: [
    // 处理html: html-webpack-plugin 默认创建html文件，引入打包输出的所有资源
    // 传入配置，可以指定template文件
    new htmlWebpackPlugin({ template: './src/index.template.html' })
  ],

  // mode: 'development|production'
  mode: 'development',

  // npm i webpack-dev-server
  // 运行webpack-dev-server
  devServer: {
    // 只在内存中打包运行
    contentBase: path.resolve(__dirname, 'build'),
    // gzip
    compress: true,
    port: 3000,
    open: true
  }
}
