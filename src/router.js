import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

import testRouter from './router/test'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'list',
      component: () => import('./views/list.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/login.vue')
    },
    {
      path: '/list',
      name: 'list',
      component: () => import('./views/list.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('./views/Home.vue')
    },
    ...testRouter
  ]
})
