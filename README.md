# vue-iview
模仿iview原理实现的UI框架

## 有关webpack，[参考链接]（https://juejin.im/book/5a6abad5518825733c144469/section/5a6abad5518825732e2f8546）
  以下是我在学习过程中，觉得一些重要的点

  1. webpack的配置其实是一个Nodejs的脚本

  2. webpack默认从作为入口的.js文件进行构建（更多是基于SPA去考虑），但通常一个前端项目都是从一个页面（即html）出发。我们会在里面使用`script`标签直接引用构建好的js文件。如果希望文件名或路径每次编译不一致，对好讲HTML饮用路径和我们构建的结果关联起来，使用`html-webpack-plugin`

  3. webpack4.0不再支持`extract-text-webpack-plugin`，建议通过[mini-css-extract-plugin](https://www.npmjs.com/package/mini-css-extract-plugin)来代替

  4. webpack可以通过添加对应Less/Sass等css预处理器，来支持这些预处理器

  5. 虽然css-loader会解析样式中用`url()`引用的文件路径，但是图片对应的jpg/png/gif等文件格式，webpack处理不了，需要添加处理图片的loader配置：file-loader

  6. Babel 是一个让我们能够使用 ES 新特性的 JS 编译工具，我们可以在 webpack 中配置 Babel，以便使用 ES6、ES7 标准来编写 JS 代码。

  7. 模块解析规则
    * 解析相对路径 
      1. 查找相对当前模块的路径下是否有对应文件或文件夹
      2. 是文件则直接加载
      3. 是文件夹则继续查找文件夹下的 package.json 文件
      4. 有 package.json 文件则按照文件中 main 字段的文件名来查找文件
      5. 无 package.json 或者无 main 字段则查找 index.js 文件
    * 解析模块名
      查找当前文件目录下，父级目录及以上目录下的 node_modules 文件夹，看是否有对应名称的模块
    * 解析绝对路径（不建议使用）

  8. 使用[ProvidePlugin](https://webpack.docschina.org/plugins/provide-plugin/)自动加载模块，而不必到处import活着require

  9. 使用[IgnorePlugin](https://webpack.docschina.org/plugins/ignore-plugin/#src/components/Sidebar/Sidebar.jsx)用于忽略某些特定的模块，让webpack不把制定的模块打包进去

  10. 使用DefinePlugin可以创建一些在编译时可以配置的全局变量，这些常量我们可以在webpack的配置中去指定

  11. copy-webpack-plugin可以用来复制文件

  12. [如何给wepack配置不同的环境](https://webpack.docschina.org/configuration/configuration-types/)

  13. 可以在webpack.config.js 中使用 before 和 after在webpack-dev-server定义额外的中间件

  14. [sourceMap的原理与应用](https://www.jianshu.com/p/ebf0ca8febb2)

  15. HMR 全称是 Hot Module Replacement，即模块热替换。在这个概念出来之前，我们使用过 Hot Reloading，当代码变更时通知浏览器刷新页面，以避免频繁手动刷新浏览器页面。HMR 可以理解为增强版的 Hot Reloading，但不用整个页面刷新，而是局部替换掉部分模块代码并且使其生效，可以看到代码变更后的效果。所以，HMR 既避免了频繁手动刷新页面，也减少了页面刷新时的等待，可以极大地提高前端页面开发效率。

  16. 优化前端资源加载
  我们中希望浏览器在加载页面时用的时间越短越好，所以构建出来的文件应该越少越小越好，一来减少浏览器需要发起请求的数量，二来减少下载静态资源的时间
  其实，webpack把多个代码文件打包成几个必须的静态资源，已经很大程度减少了静态资源请求数量了
  * 图片加载优化和代码压缩（CSS Sprites/ 图片压缩 image-webpack-loader/使用DataURL/代码压缩）
  * [分离代码文件](https://webpack.docschina.org/guides/code-splitting/)。为何要把css文件分离出来，而不是直接一起打包在JS中，最主要的原因是我们希望更好的利用缓存。