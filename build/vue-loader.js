"use strict";
const utils = require("./utils");
const config = require("../config");
const isProduction = process.env.NODE_ENV === "production";
const sourceMapEnabled = isProduction
  ? config.build.productionSourceMap
  : config.dev.cssSourceMap;

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: sourceMapEnabled,
    MiniCssExtract: isProduction
  }),
  cssSourceMap: sourceMapEnabled,
  cacheBusting: config.dev.cacheBusting,
  transformAssetUrls: {
    video: ["src", "poster"],
    source: "src",
    img: "src",
    image: "xlink:href"
  }
};
