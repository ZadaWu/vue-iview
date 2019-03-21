import Vue from 'vue';
import App from './App.vue';
import router from './router/index.js';

// 声明当前不是开发环境
Vue.config.productionTip = false;

// 实例化vue
new Vue({
  el: "#app",
  router,
  components: {
    App
  },
  render (h) {
    return h('App');
  }
  // 避免使用以下的方式，不让会对编译有要求 
  // 可以参考这个链接：https://medium.com/@stefanledin/solve-the-you-are-using-the-runtime-only-build-of-vue-error-e675031f2c50
  // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
  // template: "<App/>"
});