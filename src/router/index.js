import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/axiosPage',
      name: 'axiosPage',
      component: resolve => require(['@/components/axios'], resolve)
    }
  ]
})
