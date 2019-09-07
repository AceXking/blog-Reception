import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// elementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// axios
import { axios } from './conf/axios'
// 使用element
Vue.use(ElementUI);
Vue.config.productionTip = false

// api注册到全局
Vue.prototype.$http = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
