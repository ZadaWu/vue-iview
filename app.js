const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const webpackOptions = require('./webpack.config.js');
const mock = require('./mock.js')

// 本地的开发默认环境就是使用development mode
webpackOptions.mode = 'development';

const compiler = webpack(webpackOptions);
const express = require('express');
const app = express();

app.use(middleware(compiler, {
  // webpack-dev-middleware的配置选项
}));

mock(app)
// console.log(mock)

// 其他web服务中间件
//a.use(....)
app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
});