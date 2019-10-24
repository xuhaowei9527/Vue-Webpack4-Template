const path = require("path");
const config = require("../config");
const webpack = require("webpack");
module.exports = {
  entry: {
    lib: ["vue", "vuex", "vue-resource", "vue-router"]
  },
  output: {
    path: path.resolve(__dirname, "../dist", "dll"),
    filename: "[name].js",
    publicPath:
      process.env.NODE_ENV === "production"
        ? config.build.assetsPublicPath
        : config.dev.assetsPublicPath,
    library: "[name]_library"
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": '"production"'
    }),
    /**
     * path: manifest.json输出文件路径
     * name: dll对象名，跟output.library保持一致
     */
    new webpack.DllPlugin({
      context: __dirname,
      path: path.resolve(__dirname, "../dist/dll", "lib.manifest.json"),
      name: "[name]_library"
    })
  ]
};
