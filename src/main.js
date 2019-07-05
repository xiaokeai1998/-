import Vue from 'vue'
import App from './App.vue'
import router from '@/router/router.js'
import ElementUI from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
import '@/styles/index.less'
Vue.use(ElementUI)
Vue.config.productionTip = false

// 添加路由守卫
router.beforeEach((to,from,next)=>{
  // 获取token
  var token = localStorage.getItem("our_per_token");
  // 如果没有token值，除非你去登录，否则都应该重定向到登录
  if(token || to.path == '/login'){
    // 如果有token，那么就next
    next()
    }else if (!token && to.path !== '/login'){
      next({ name: 'login'})
    }
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

