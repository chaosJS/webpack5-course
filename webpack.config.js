const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const workboxWebpackPlugun = require('workbox-webpack-plugin')
// 切换NODE_ENV 可以看到不同的css兼容效果
// process.env.NODE_ENV = 'development'
module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'build.[contenthash:10].js',
    // __dirname 当前文件的目录绝对路径
    path: path.resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.css$/,
            use: [
              // 将js中的css资源（字符串）提取出来，放到style标签中，添加到head中
              // 'style-loader',
              // 取代 style-loader,提取css为单独的文件
              {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  // 这里可以指定一个 publicPath
                  // 默认使用 webpackOptions.output中的publicPath
                  // publicPath的配置，和plugins中设置的filename和chunkFilename的名字有关
                  // 如果打包后，background属性中的图片显示不出来，请检查publicPath的配置是否有误
                  publicPath: '/'
                  // publicPath: devMode ? './' : '../',   // 根据不同环境指定不同的publicPath
                  // 仅dev环境启用HMR功能
                  // hmr: devMode
                }
              },
              // 将css文件转变成commonjs模块加载到js中，样式字符串
              'css-loader',
              // css-loader 之前添加postcss-loader
              {
                loader: 'postcss-loader',
                options: {
                  ident: 'postcss',
                  plugins: () => [
                    // 帮助postcss找到package.json中 browserslist 的配置，通过这个配置，加载指定的css兼容性样式
                    require('postcss-preset-env')()
                  ]
                }
              }
            ]
          },
          {
            test: /\.less$/,
            // test: /\.(css|less)$/,
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  // 这里可以指定一个 publicPath
                  // 默认使用 webpackOptions.output中的publicPath
                  // publicPath的配置，和plugins中设置的filename和chunkFilename的名字有关
                  // 如果打包后，background属性中的图片显示不出来，请检查publicPath的配置是否有误
                  publicPath: '/'
                  // publicPath: devMode ? './' : '../',   // 根据不同环境指定不同的publicPath
                  // 仅dev环境启用HMR功能
                  // hmr: devMode
                }
              },
              'css-loader',
              //
              // {
              //   loader: 'postcss-loader'
              // },
              'less-loader'
            ]
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
              name: '[hash:10].[ext]',
              outputPath: 'images'
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
            loader: 'url-loader',
            options: {
              outputPath: 'fonts'
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              // 预设 指示babel做什么样的兼容性处理
              presets: [
                // 基本的js兼容性处理 promise 之类的就不能转化了
                // '@babel/preset-env',
                // @babel/polyfill  全部js兼容处理 直接在文件中引入
                // 按需加载兼容
                [
                  '@babel/preset-env',
                  {
                    // 按需加载
                    useBuiltIns: 'usage',
                    // 指定corejs 版本
                    corejs: {
                      version: 3
                    },
                    // 指定兼容到哪个版本的浏览器
                    targets: {
                      chrome: '60',
                      firefox: '60',
                      ie: '9',
                      safari: '10',
                      edge: '17'
                    }
                  }
                ]
              ]
            }
          },
          // 此处注意⚠️两个loader的顺序：一定要放在最后，也就是先检查修复，再babel/corejs兼容
          {
            // eslint
            loader: 'eslint-loader',
            // 自动修复不符合规范的js代码
            options: {
              fix: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // 处理html: html-webpack-plugin 默认创建html文件，引入打包输出的所有资源
    // 传入配置，可以指定template文件
    new htmlWebpackPlugin({
      template: './src/index.template.html',
      // 默认压缩
      // minify: 'auto',
      // 自定义压缩
      minify: {
        collapseWhitespace: true,
        removeComments: true
      }
    }),

    new MiniCssExtractPlugin({
      // 对输出对文件重新命名，默认为main.css
      filename: 'css/built.[contenthash:10].css'
    }),
    new OptimizeCssAssetsPlugin(),
    new workboxWebpackPlugun.GenerateSW({
      // 帮助serviceworker快读启动
      // 删除旧的serviceworker
      // 最终生成一个serviceworker的配置文件
      // 然后在入口文件中做注册serviceworker
      // 需要在eslint 中配置 支持browser 为true
      // servicework文件必须运行在服务器上
      clientsClaim: true,
      skipWaiting: true
    })
  ],

  // mode: 'development|production'
  mode: 'production',
  // 优化， code split
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },

  // npm i webpack-dev-server
  // 运行webpack-dev-server
  devServer: {
    // 只在内存中打包运行
    contentBase: path.resolve(__dirname, 'build'),
    // gzip
    compress: true,
    port: 3000,
    // hmr
    hot: true,
    open: true
  },
  // 开启source-map ,值有 inline-source-map|hidden-source-map|eval-source-map 了解这几个值的大概意思
  // react和vue的脚手架的开发环境基本都是用eval-source-map
  devtool: 'source-map'
}
