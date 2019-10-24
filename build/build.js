process.env.NODE_ENV = "production";
process.env.npm_config_report = false;
const ora = require("ora");
const chalk = require("chalk");
const webpack = require("webpack");
const webpackConfig = require("./webpack.prod");
const spinner = ora("生产打包...").start();
webpack(webpackConfig, (err, stats) => {
  console.log(stats);
  spinner.stop();
  if (err) throw err;
  process.stdout.write(
    stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + "\n\n"
  );

  if (stats.hasErrors()) {
    console.log(chalk.red("  Build failed with errors.\n"));
    process.exit(1);
  }

  console.log(chalk.cyan("  Build complete.\n"));
  console.log(
    chalk.yellow(
      "  Tip: built files are meant to be served over an HTTP server.\n" +
        "  Opening index.html over file:// won't work.\n"
    )
  );
});