/*
 *用于区分生产开发环境配置项
 */
const path = require("path");

module.exports = {
  dev: {
    assetsSubDirectory: "static",
    assetsPublicPath: "/",
    proxyTable: {
      "/": {
        target: "http://localhost:8080",
        changeOrigin: true,
        secure: false
      }
    },
    host: "localhost",
    port: 7000,
    autoOpenBrowser: true,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false,
    hot: true, // 热更新, 必须有 webpack.HotModuleReplacementPlugin 才能完全启用 HMR
    compress: true, // gzip压缩
    devtool: "cheap-module-eval-source-map",
    cacheBusting: false, // 用于禁用缓存生成的 webpack 模块和 chunk，来改善构建速度
    cssSourceMap: true, // css sourcemap
    hints: "warning"
  },

  build: {
    index: path.resolve(__dirname, "../dist/index.html"),
    assetsRoot: path.resolve(__dirname, "../dist"), // 打包文件存入目录
    assetsSubDirectory: "static",
    assetsPublicPath: "/PaperLess/",
    productionSourceMap: true,
    // devtool: '#source-map', // 打包时生成sourcemap
    devtool: "",
    productionGzip: true,
    productionGzipExtensions: ["js", "css"],
    bundleAnalyzerReport: process.env.npm_config_report,
    hints: "error"
  }
};
