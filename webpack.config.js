const path = require('path')
const UglifyPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

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
      /* js解析 */
      {
        test: /\.jsx?/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        use:'babel-loader'
      },
      /* 引入loader来解析和处理css文件 */
      {
        test: /\.css/,
        include: [
          path.resolve(__dirname, 'src'),
        ],
        use: [
          MiniCssExtractPlugin.loader,
          // 'style-loader',
          'css-loader'
        ]
        /**
         * css-loader 负责解析css代码，主要是为了处理css的依赖，例如： `@import`和`url（）`等引用外部的声明
         * style-loader 会将css-loader解析的结果转变成JS代码，运行时动态插入`style`标签来让css代码生效
         * 因此，上面操作会讲css代码转化成JS代码，和index.js一起打包了。如果单独把css文件分离出来，我们需要使用`extract-text-webpack-plugin`插件
         * 由于这个webpack4.0不再支持，因此建议使用[mini-css-extract-plugin](https://www.npmjs.com/package/mini-css-extract-plugin)来代替
         */
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
    new HtmlWebpackPlugin({
      filename: 'index.html', // 配置输出文件名和路径
      template: 'assets/index.html', //配置文件模板
    }),
    /**
     * 构建时`html-webpack-plugin`会为我们创建一个HTML文件，其中会引用构建出来的js文件
     * 实际项目中，默认创建的HTML文件并没有什么用，我们需要自己来写HTML文件
     * 可以通过`html-webpack-pulgin`的配置，传递一个写好的HTML模板
     * 
     * 如果需要添加多个页面关联，那么实例化多个html-webpack-plugin,并将它们都放到plugins字段就OK
     */
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ]
  
}