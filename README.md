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