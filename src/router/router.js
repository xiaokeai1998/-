import Vue from 'vue'
import VueRouter from 'vue-router'

// 首页
import Home from '@/views/Home.vue'
// 引入路由所对应的组件
// @符号相当于Src目录
// 用户
import Login from '@/views/Login.vue'
import Users from '@/views/users/index.vue'
import Wel from '@/views/welcome.vue'
import Role from '@/views/right/RoleList.vue'
import Right from '@/views/right/RightList.vue'
// 用户管理

Vue.use(VueRouter)
// 创建路由对象
var router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: { name: 'home' }
    },
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'home',
      path: '/home',
      component: Home,
      // 嵌套路由》》 对应着Home组件中的router-view
      children: [
        {
          path: '/home',
          redirect: { name: 'Wel' }
        },
        {
          name: 'Wel',
          path: 'wel',
          component: Wel
        },
        {
          name: 'users',
          path: 'users',
          component: Users
        },
        {
          name: 'Role',
          path: 'roles',
          component: Role
        },
        {
          name: 'Right',
          path: 'rights',
          component: Right
        }
      ]
    }
  ]
})

export default router
