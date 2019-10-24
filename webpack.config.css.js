const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  devServer: {
    port: '3000',
    //进度条
    progress: true,
    //启动路径
    contentBase: './dist',
    //gzip压缩
    compress: true
  },
  mode:'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.resolve(__dirname,'dist')
  },
  plugins:[
    //每次打包清空dist目录
    new CleanWebpackPlugin(),
    //打包出index.html并引用bundle.js
    new HtmlWebpackPlugin({
      //模板路径
      template:'./src/index.html',
      //打包出文件名
      filename: 'index.html',
      //压缩用
      minify:{
        //删除双引号
        removeAttributeQuotes:true,
        //一行
        collapseWhitespace:true,
      },
      hash: true
    }),
    new MiniCssExtractPlugin({
      filename: 'main.css'
    })
  ],
  module:{
    //模块
    rules:[
      //规则 css-loader解析@import这种语法
      //style-loader将css插入到head的标签中
      //loader的特点 希望单一
      //loader顺序 默认是从右向左执行
      //loader还可以写成 对象方式
      { test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              insert: function insertAtTop(element) {
                //element <style>css样式</style>
                //window._lastElementInsertedByStyleLoader此时为undefined
                var parent = document.querySelector('head');
                // eslint-disable-next-line no-underscore-dangle
                var lastInsertedElement =
                  window._lastElementInsertedByStyleLoader;
                if (!lastInsertedElement) {
                  parent.insertBefore(element, parent.firstChild);
                } else if (lastInsertedElement.nextSibling) {
                  parent.insertBefore(element, lastInsertedElement.nextSibling);
                } else {
                  parent.appendChild(element);
                }

                // eslint-disable-next-line no-underscore-dangle
                window._lastElementInsertedByStyleLoader = element;
                //css样式挂载到了window._lastElementInsertedByStyleLoader上面
              },
            }
          },
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              insert: 'body',
            }
          },
          'css-loader',
          //npm i less less-loader -D less-loader需要调用less解析.less文件
          'less-loader'
        ]
      },
    ]
  }
}