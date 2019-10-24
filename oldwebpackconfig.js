// const webpack = require('webpack')
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const VueLoaderPlugin = require("vue-loader/lib/plugin");
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  optimization: {
    // 优化项
    runtimeChunk: {
      name: "manifest"
    },
    minimizer: [
      // 优化js
      // new UglifyJsPlugin({
      //   cache: true,
      //   parallel: true,
      //   sourceMap: false
      // }),
      new TerserPlugin({
        sourceMap: false
      }),
      // 优化css//需要搭配cssnano=>postcss.config.js中文件
      new OptimizeCssAssetsPlugin(
        {}
        // {
        //   assetNameRegExp: /\.optimize\.css$/g,
        //   cssProcessor: require('cssnano'),
        //   cssProcessorOptions: { safe: true, discardComments: { removeAll: true } },
        //   canPrint: true
        // }
      )
    ],
    splitChunks: {
      chunks: "all",
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 10,
      maxInitialRequests: 10,
      automaticNameDelimiter: "~",
      name: true,
      // cacheGroups: {
      //   commons: {
      //     name: 'vendors',
      //     chunks: 'initial',
      //     minChunks: 5
      //   },
      //   styles: {
      //     name: 'styles',
      //     test: /\.css$/,
      //     chunks: 'all',
      //     enforce: true
      //   }
      // }
      cacheGroups: {
        commons: {
          name: "commons",
          chunks: "initial",
          minChunks: 2
        },
        styles: {
          name: "styles",
          test: /\.css$/,
          chunks: "all",
          enforce: true
        }
        // vendors: {
        //   test: /[\\/]node_modules[\\/]/,
        //   priority: -10
        // },
        // default: {
        //   minChunks: 2,
        //   priority: -20,
        //   reuseExistingChunk: true
        // }
      }
    }
  },
  devServer: {
    proxy: {
      "/": {
        target: "http://localhost:8080",
        changeOrigin: true,
        secure: false
      }
    },
    host: "localhost",
    port: "3000",
    // 进度条
    progress: true,
    // 启动路径
    contentBase: "./dist",
    hot: true,
    // gzip压缩
    compress: true
  },
  // mode: 'production',
  mode: "development",
  entry: {
    app: path.join(__dirname, "src/main.js"),
    vendor: ["vue", "moment", "exceljs", "vue-router"] // vue单独打包
  },
  // 源码映射
  // 会单独生成一个sourcemap 文件 出错了会标识当前报错的列和行,大和全
  // devtool: 'source-map',
  // 实时打包
  // watch: true,
  // watchOptions: { // 监控选项
  //   poll: 1000, // 每秒 询问1000次
  //   aggregateTimeout: 500, // 防抖，
  //   ignored: /node_modules/
  // },
  // 不会单独生成文件,但是可以显示行和列
  // devtool: 'eval-source-map',
  // 不会产生列，但是是一个单独的map文件,产生后可以保存起来用于调试，跟源码没有关联
  // devtool: 'cheap-module-source-map',
  // 不会产生文件,集成在打包后的文件中,不会产生列
  // devtool: '#eval-source-map',
  output: {
    filename: "static/js/[name].[hash:7].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "./",
    chunkFilename: "static/js/[name].[hash:7].js"
    // 统一加前缀
    // publicPath: ''
  },
  resolve: {
    extensions: [".js", ".vue", ".json"],
    alias: {
      vue$: "vue/dist/vue.esm.js"
    }
  },
  node: {
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: "empty",
    fs: "empty",
    net: "empty",
    tls: "empty",
    child_process: "empty"
  },
  plugins: [
    // 每次打包清空dist目录
    new CleanWebpackPlugin(),
    // 打包出index.html并引用bundle.js
    new HtmlWebpackPlugin({
      // 模板路径
      template: "./src/index.html",
      // 打包出文件名
      filename: "index.html",
      // 压缩用
      minify: {
        // 删除双引号
        removeAttributeQuotes: true,
        // 一行
        collapseWhitespace: true
      },
      hash: true,
      favicon: "./favicon.ico"
    }),
    new MiniCssExtractPlugin({
      filename: "static/css/[name].[hash:7].css",
      chunkFilename: "static/css/[name].[hash:7].css"
    }),
    new CompressionWebpackPlugin({
      filename: "[path].gz[query]",
      algorithm: "gzip",
      test: new RegExp("\\.(" + ["js", "css"].join("|") + ")$"),
      threshold: 10240,
      minRatio: 0.8
    }),
    // 全局挂载jquery
    // new webpack.ProvidePlugin({
    //   $: 'jquery',
    //   jQuery: 'jquery'
    // }),
    // 打包体积优化，详细分布查看插件
    // new BundleAnalyzerPlugin(),
    new VueLoaderPlugin()
  ],
  module: {
    // 模块
    rules: [
      // {
      //   test: require.resolve('jquery'),
      //   use: [{
      //     loader: 'expose-loader',
      //     options: 'jQuery'
      //   }, {
      //     loader: 'expose-loader',
      //     options: '$'
      //   }]
      // },
      {
        test: /\.vue$/,
        use: "vue-loader"
      },
      // 处理html中img src中的图片
      {
        test: /\.html$/,
        use: "html-withimg-loader"
      },
      // 加载图片文件
      {
        test: /\.(png|jpe?g|gif|svg|webp)(\?.*)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              quality: 85,
              // fallback: require.resolve('responsive-loader'),
              publicPath: "./image/",
              limit: 1024,
              name: "[hash:7]" + ".[ext]",
              outputPath: "static/css/image/"
              // 单独为图片加cdn域名用
              // publicPath: 'CDN'
            }
          },
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4
              },
              gifsicle: {
                interlaced: false
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75
              }
            }
          }
        ]
        // use: {
        //   loader: 'url-loader',
        //   options: {
        //     quality: 85,
        //     fallback: 'responsive-loader',
        //     publicPath: './image/',
        //     limit: 1024,
        //     name: '[contenthash]'.slice(0, 15) + '.[ext]',
        //     outputPath: 'static/css/image/'
        //     // 单独为图片加cdn域名用
        //     // publicPath: 'CDN'
        //   }
        // }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "media/[name].[hash:7].[ext]"
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "url-loader",
        options: {
          publicPath: "../../",
          limit: 10000,
          name: "static/css/fonts/[name].[hash:7].[ext]"
        }
      },
      // eslint校验js
      {
        test: /\.(js|vue)$/,
        use: {
          loader: "eslint-loader",
          options: {
            formatter: require("eslint-friendly-formatter")
          }
        },
        exclude: /node_modules/,
        enforce: "pre" // 普通loader之前执行
      },
      // 使用babel解析js
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              // 预设
              "@babel/preset-env"
            ],
            plugins: [
              // 提案中语法 装饰器 解析
              // eslint-disable-next-line quote-props
              ["@babel/plugin-proposal-decorators", { legacy: true }],
              // 提案中语法 类属性 解析
              // eslint-disable-next-line quote-props
              ["@babel/plugin-proposal-class-properties", { loose: true }],
              "@babel/plugin-transform-runtime"
            ]
          }
        },
        include: path.resolve(__dirname, "src"),
        exclude: /node_modules/
      },
      // 规则 css-loader解析@import这种语法
      // style-loader将css插入到head的标签中
      // loader的特点 希望单一
      // loader顺序 默认是从右向左执行
      // loader还可以写成 对象方式

      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          "css-loader",
          {
            loader: "postcss-loader"
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader"
          },
          // npm i less less-loader -D less-loader需要调用less解析.less文件
          "less-loader"
        ]
      }
    ]
  },
  performance: {
    hints: "error", // 在生产环境构建时，我们推荐使用 hints: "error"，有助于防止把体积巨大的 bundle 部署到生产环境，从而影响网页的性能
    maxEntrypointSize: 250000, // 入口起点的最大体积
    maxAssetSize: 250000, // 生成文件的最大体积
    assetFilter: function(assetFilename) {
      return assetFilename.endsWith(".js"); // 只给出 js 文件的性能提示
    }
  }
};
