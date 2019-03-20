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
  * [懒加载组件在vue中的应用](https://alexjover.com/blog/lazy-load-in-vue-using-webpack-s-code-splitting/)
  * 进一步控制JS代码
    1. 按需加载模块，遵循ES标准的动态加载语法。动态加载代码时依赖于网络，其模块内容会异步返回，所以 import 方法是返回一个 promise 来获取动态加载的模块内容。
    2. Tree shaking 依赖于ES2015模块系统中的静态结构属性，可以移除Javascript上下午呢中的未饮用代码，删掉用不着的代码，能够有效减少JS代码文件的大小
    3. 使用sideEffects来配置package.json来保证只是用暴露出去的模块

  17. 提升webpack的构建速度
  提升 webpack 构建速度本质上就是想办法让 webpack 少干点活，活少了速度自然快了，尽量避免 webpack 去做一些不必要的事情。
    * 减少resolve的解析： 如果我们可以精简resolve配置，让webpack在查询模块路径时能尽可能快速定位到需要的模块，不用做额外工作，那么构建速度也会快
    * 把 loader 应用的文件范围缩小: 我们在使用loader的时候，尽可能把loader应用的文件范围缩小，只在最少数必须的代码模块中去使用必要的loader，例如 node_modules目录下的其他依赖库文件，基本就是直接编译好可用的代码，无需再经过laoder处理了
    * 减少plugin的消耗:这里再提一下 webpack 4.x 的 mode，区分 mode 会让 webpack 的构建更加有针对性，更加高效。例如当 mode 为 development 时，webpack 会避免使用一些提高应用代码加载性能的配置项，如 UglifyJsPlugin，ExtractTextPlugin 等，这样可以更快地启动开发环境的服务，而当 mode 为 production 时，webpack 会避免使用一些便于 debug 的配置，来提升构建时的速度，例如极其消耗性能的 Source Maps 支持。（这个真的跪了跪了，我编译的时间从10s减少到1s）
    * 换种方式处理图片：我们可以直接使用 imagemin 来做图片压缩，编写简单的命令即可。然后使用 pre-commit 这个类库来配置对应的命令，使其在 git commit 的时候触发，并且将要提交的文件替换为压缩后的文件。这样提交到代码仓库的图片就已经是压缩好的了，以后在项目中再次使用到的这些图片就无需再进行压缩处理了，image-webpack-loader 也就没有必要了。

