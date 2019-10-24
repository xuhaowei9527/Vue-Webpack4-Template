module.exports = {
  //配置sugarss打包时会出现Unnecessary curly bracket错误，不必要花括号
  //parser: 'sugarss',
  plugins: {
    //包含autoprefixer
    'postcss-preset-env': {},
    'cssnano': {}
  }
  // plugins: [
  //   require('autoprefixer')(),
  // ]
}