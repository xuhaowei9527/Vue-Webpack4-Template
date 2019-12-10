const path = require("path");
const utils = require("./utils");
const config = require("../config");
// 文件路径处理,处理为绝对路径
function resolve(dir) {
  return path.join(__dirname, "..", dir);
}
// 开发生产环境为路由添加设置
// //
// if (process.env.NODE_ENV !== "development") {
//   baseConfig = Object.assign(baseConfig, {
//     mode: "history"
//     // base: "/PaperLess/"
//   });
// }

module.exports = {
  context: path.resolve(__dirname, "../"), // 获取基础路径 d:\TrafficOa
  entry: {
    // 分离应用程序app,及相应第三方类库 webpack4使用 optimization.splitChunks 选项搭配使用
    app: "./src/main.js"
    // vendor: ["vue", "element-ui", "exceljs", "vue-router"]
  },
  output: {
    path: config.build.assetsRoot,
    filename: "[name].js",
    publicPath:
      process.env.NODE_ENV === "production"
        ? config.build.assetsPublicPath
        : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: [".js", ".vue", ".json"], // 扩展名解析顺序
    alias: {
      vue$: "vue/dist/vue.esm.js",
      "@": resolve("src") // 别名
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/, // 处理vue文件
        use: "vue-loader"
        // options: vueLoaderConfig
      },
      {
        test: /\.html$/, // 处理html中img src中的图片
        use: "html-withimg-loader"
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)(\?.*)?$/, // 处理各种类型文件 可以处理 webp
        use: [
          {
            loader: "file-loader",
            options: {
              quality: 85,
              limit: 1024,
              name: utils.assetsPath("images/[hash:7]" + ".[ext]")
            }
          },
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
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
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: utils.assetsPath("media/[name].[hash:7].[ext]")
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf|gltf|glb)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: utils.assetsPath("css/fonts/[name].[hash:7].[ext]")
        }
      },
      {
        test: /\.(js|vue)$/, // eslint校验js
        loader: "eslint-loader",
        options: {
          formatter: require("eslint-friendly-formatter"),
          fix: true
        },
        // },
        exclude: /node_modules/,
        enforce: "pre" // 普通loader之前执行
      },
      {
        test: /\.js$/, // 使用babel解析js
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
      }
    ]
  },
  node: {
    // 这些选项可以配置是否 polyfill 或 mock 某些 Node.js 全局变量和模块。这可以使最初为 Node.js 环境编写的代码，在其他环境（如浏览器）中运行
    setImmediate: false,
    dgram: "empty",
    fs: "empty",
    net: "empty",
    tls: "empty",
    child_process: "empty"
  },
  plugins: [],
  performance: {
    hints:
      process.env.NODE_ENV === "production"
        ? config.build.hints
        : config.dev.hints, // 在生产环境构建时，我们推荐使用 hints: "error"，有助于防止把体积巨大的 bundle 部署到生产环境，从而影响网页的性能
    maxEntrypointSize: 5000000, // 入口起点的最大体积
    maxAssetSize: 5000000, // 生成文件的最大体积
    assetFilter: function(assetFilename) {
      return assetFilename.endsWith(".js"); // 只给出 js 文件的性能提示
    }
  }
};
