const webpack = require('webpack')
const path = require('path')
const UglifyPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const mock = require('./mock.js')

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

  devServer: {
    /** 可以使用proxy用来配置 webpack-dev-server 将特定URL的请求代理到另外一台服务器上。当你有单独的后端开发服务器用于请求API时，非常有用 
     * proxy: {
     *'/api': {
     *  target: "http://localhost:3000", // 将 URL 中带有 /api 的请求代理到本地的 3000 端口的服务上
     *  pathRewrite: { '^/api': '' }, // 把 URL 中 path 部分的 `api` 移除掉
     *},
     *}
    */
    before(app) {
      // 使用mock数据 
      mock(app)
    }
  },

  module: {
    noParse: /jquery|lodash/, // 正则表达式 匹配独立的第三方大型库类
    rules: [
      /* ESlint 编码检测 */
      {
        enforce: 'pre', // 指定为前置类型
        test: /\.jsx?/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        exclude: /node_modules/, // 不需要解析的部分
        loader: "eslint-loader",
      },
      /* js解析 */
      {
        test: /\.jsx?/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        exclude: /node_modules/, // 不需要解析的部分
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
      {
        test: /\.less$/,
        include: [
          path.resolve(__dirname, 'src'),
        ],
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
        ],
        /**
         * 这个插件需要干涉模块转换的内容，所以需要使用它对应的loader：less-loader，还要安装依赖less
         */
      },
      {
        test: /\.(png|jpg|git$)/,
        use: [
          {
            loader: 'file-loader',
            options: {},
          },
        ],
      },
    ],
  },
  
  //代码模块路径解析的配置
  resolve: {
    modules: [
      "node_modules",
      path.resolve(__dirname, 'src'),
      // 默认不用配置，但是如果有些类库是放在一些奇怪的地方的，你可以添加自定义的路径或,可以在node_modues之前配置一个确定的绝对路径
    ],
    extensions: [".wasm", ".mjs", ".js", ".json", ".jsx", '.css']
    // 这里的顺序代表匹配后缀的优先级，例如对于 index.js 和 index.jsx，会优先选择 index.js
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
      filename: "[name].css", //位每一个入口创建独立分离的文件
      chunkFilename: "[id].css"
    }),
    /* 动态加载模块，不需要在文件中import 可以直接$('#item')这样使用 */
    new webpack.ProvidePlugin({
      $: 'jquery', 
      jQuery: 'jquery'
    })
  ]
  
}