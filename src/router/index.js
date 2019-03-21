// 1.引入vue，vue-loader
import Vue from 'vue';
import Router from 'vue-router';
import Home from '../home/index.vue';

// 2.通过vue.use()明确地安装路由功能
Vue.use(Router);

export default new Router({
  routes: [{
    path: '/',
    name: 'home',
    component: Home
  }]
});