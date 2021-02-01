import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Login.vue";
import Layout from './components/Layout.vue';
import Home from './views/home'
import Member from './views/member'
import Supplier from './views/supplier'
import Goods from './views/goods'
import Staff from './views/staff'
Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path:'/',
      name:'layout',
      component:Layout,
      children:[
        {
          path:'/home',
          component:Home,
          meta: { title: '首页' }
        }
      ]
    },
    {
      path:'/member',
      name:'layout',
      component:Layout,
      children:[
        {
          path:'/member/',
          component:Member,
          meta: { title: '会员管理' }
        }
      ]
    },
    {
      path:'/supplier',
      name:'layout',
      component:Layout,
      children:[
        {
          path:'/supplier/',
          component:Supplier,
          meta: { title: '供应商管理' }
        }
      ]
    },
    {
      path:'/goods',
      name:'layout',
      component:Layout,
      children:[
        {
          path:'/goods/',
          component:Goods,
          meta: { title: '商品管理' }
        }
      ]
    },
    {
      path:'/staff',
      name:'layout',
      component:Layout,
      children:[
        {
          path:'/staff/',
          component:Staff,
          meta: { title: '员工管理' }

        }
      ]
    },
  ]
});
