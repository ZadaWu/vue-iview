const path = require('path')
const UglifyPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  /**
   * 可以写多个入口
   * {
   *     foo: './src/page-foo.js',
   *     bar: './src/page-bar.js',
   *  }
   *  */ 
  entry: './src/index.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        use:'babel-loader'
      },
    ],
  },
  
  //代码模块路径解析的配置
  resolve: {
    modules: [
      "node_modules",
      path.resolve(__dirname, 'src')
    ],
    extensions: [".wasm", ".mjs", ".js", ".json", ".jsx"]
  },

  plugins: [
    new UglifyPlugin(),
    // 使用uglify-webpack-plugin 来压缩js代码
    // 如果在命令中的 --mode production，默认已经使用了JS代码压缩插件的
  ]
  
}