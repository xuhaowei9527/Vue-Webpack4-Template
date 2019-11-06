const webpack = require("webpack");
const config = require("../config");
const utils = require("./utils");
const merge = require("webpack-merge");
const path = require("path");
const baseWebpackConfig = require("./webpack.base.js");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // 打包出index.html
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin"); // 友好错误提示
const VueLoaderPlugin = require("vue-loader/lib/plugin"); // vue-loader15 后配合使用
const portfinder = require("portfinder");

// const devMode = process.env.NODE_ENV !== "production";

const HOST = process.env.HOST;
const PORT = process.env.PORT && Number(process.env.PORT);
console.log(path.posix.join(config.dev.assetsPublicPath, "./src/index.html"));
const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.dev.cssSourceMap,
      MiniCssExtract: false,
      usePostCSS: true
    })
  },
  devtool: config.dev.devtool, // development环境下的sourcemap
  devServer: {
    clientLogLevel: "warning",
    historyApiFallback: {
      // 当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html。devServer.historyApiFallback 默认禁用
      rewrites: [
        {
          from: /.*/,
          to: path.posix.join(config.dev.assetsPublicPath, "./src/index.html")
        }
      ]
    },
    hot: true,
    contentBase: false,
    compress: false,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // FriendlyErrorsPlugin必备
    watchOptions: {
      poll: config.dev.poll // 禁用轮询监测文件改动
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      // 设定node环境变量
      "process.env": require("../config/dev.env")
    }),
    // new webpack.HotModuleReplacementPlugin(), // 热更新模块插件
    // new webpack.NamedModulesPlugin(), // 热更新直接返回更新文件名称,而不是ID
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
      chunksSortMode: "none",
      hash: true,
      favicon: "./favicon.ico",
      inject: true
    }),
    // new MiniCssExtractPlugin({
    //   filename: devMode ? "[name].css" : "[name].[hash:7].css",
    //   chunkFilename: devMode ? "[id].css" : "[id].[hash:7].css"
    // }),
    new VueLoaderPlugin()
  ]
});
module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port;
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err);
    } else {
      process.env.PORT = port;
      devWebpackConfig.devServer.port = port;
      devWebpackConfig.plugins.push(
        new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            messages: [
              `当前应用运行在: http://${devWebpackConfig.devServer.host}:${port}`
            ]
          },
          onErrors: config.dev.notifyOnErrors
            ? utils.createNotifierCallback()
            : undefined
        })
      );
      resolve(devWebpackConfig);
    }
  });
});
