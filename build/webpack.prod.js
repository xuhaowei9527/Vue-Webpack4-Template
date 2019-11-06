const utils = require("./utils");
const webpack = require("webpack");
const config = require("../config");
const merge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // 打包出index.html
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin"); // 替换uglifyjs-webpack-plugin
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin"); // 用于优化或者压缩CSS资源
const VueLoaderPlugin = require("vue-loader/lib/plugin"); // vue-loader15 后配合使用
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin"); //  打包性能分析
const devMode = process.env.NODE_ENV !== "production";
const env = process.env.NODE_ENV === require("../config/prod.env");
const smp = new SpeedMeasurePlugin();

const webpackConfig = merge(baseWebpackConfig, {
  mode: "production",
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      MiniCssExtract: true,
      usePostCSS: true
    })
  },
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath("js/[name].[hash:7].js"),
    chunkFilename: utils.assetsPath("js/[name].[hash:7].js")
  },
  optimization: {
    // 优化项
    runtimeChunk: {
      name: "manifest"
    },
    minimizer: [
      // 优化js
      new TerserPlugin({
        extractComments: /exceljs/i,
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      // 优化css//需要搭配cssnano=>postcss.config.js中文件
      new OptimizeCssAssetsPlugin({})
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
      cacheGroups: {
        commons: {
          name: "commons",
          chunks: "initial",
          minChunks: 5
        },
        vue: {
          test: /vue.esm.js/,
          chunks: "initial",
          name: "vue",
          enforce: true
        },
        corejs: {
          test: /core-js/,
          chunks: "all",
          name: "corejs",
          enforce: true
        },
        xlsx: {
          test: /exceljs[\\/]dist[\\/]es5[\\/]xlsx/,
          chunks: "all",
          name: "xlsx",
          enforce: true
        },
        doc: {
          test: /exceljs[\\/]dist[\\/]es5[\\/]doc/,
          chunks: "all",
          name: "doc",
          enforce: true
        },
        eutils: {
          test: /exceljs[\\/]dist[\\/]es5[\\/]utils/,
          chunks: "all",
          name: "vuex_vuerouter",
          enforce: true
        },
        ecsv: {
          test: /exceljs[\\/]dist[\\/]es5[\\/]csv/,
          chunks: "all",
          name: "vuex_vuerouter",
          enforce: true
        },
        elementcommon: {
          test: /element-ui[\\/]lib[\\/]element-ui.common.js/,
          chunks: "initial",
          name: "elementcommon",
          enforce: true
        },
        moment: {
          test: /moment/,
          chunks: "initial",
          name: "moment",
          enforce: true
        },
        elliptic: {
          test: /elliptic/,
          chunks: "all",
          name: "elliptic",
          enforce: true
        },
        pako: {
          test: /pako/,
          chunks: "all",
          name: "pako",
          enforce: true
        },
        jszip: {
          test: /jszip/,
          chunks: "all",
          name: "jszip",
          enforce: true
        },
        vuex: {
          test: /vuex.esm.js/,
          chunks: "all",
          name: "vuex_vuerouter",
          enforce: true
        },
        vuerouter: {
          test: /vue-router.esm.js/,
          chunks: "all",
          name: "vuex_vuerouter",
          enforce: true
        },
        coo: {
          test: /element-ui.common.js/,
          chunks: "all",
          name: "coo",
          enforce: true
        },
        styles: {
          name: "styles",
          test: /\.css$/,
          chunks: "all",
          enforce: true
        }
      }
    }
  },
  plugins: [
    // 每次打包清空dist目录
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      "process.env": env
    }),
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
      favicon: "./favicon.ico"
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new MiniCssExtractPlugin({
      filename: devMode
        ? "static/css/[name].css"
        : "static/css/[name].[hash:7].css",
      chunkFilename: devMode
        ? "static/css/[id].css"
        : "static/css/[id].[hash:7].css"
    }),
    // 打包体积优化，详细分布查看插件
    new VueLoaderPlugin()
  ]
});

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require("compression-webpack-plugin");

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      filename: "[path].gz[query]",
      algorithm: "gzip",
      test: new RegExp(
        "\\.(" + config.build.productionGzipExtensions.join("|") + ")$"
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  );
}
if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
    .BundleAnalyzerPlugin;
  webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = smp.wrap(webpackConfig);
