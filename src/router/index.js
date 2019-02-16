import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home' // App的子组件
import Welcome from '@/components/Welcome' // home的子组件
import User from '@/components/User' // home的子组件
import Role from '@/components/Role' // home的子组件
import Right from '@/components/Right' // home的子组件

Vue.use(Router)

var router = new Router({
  routes: [
    { path: '/login', component: Login },
    {
      path: '/home',
      component: Home,
      redirect: '/welcome',
      children: [
        { path: '/welcome', component: Welcome },
        { path: '/users', component: User },
        { path: '/roles', component: Role },
        { path: '/rights', component: Right },
        { path: '/roles', component: Role },
        { path: '/roles', component: Role },
        { path: '/roles', component: Role },
        { path: '/roles', component: Role }
      ]
    }
  ]
})

// 路由导航守卫,检测token,如果不存在,就跳转到login登录组件中
router.beforeEach((to, from, next) => {
  // 访问/login就直接pass
  if (to.path === '/login') {
    return next()
  }

  // 访问非login，判断token
  var token = window.sessionStorage.getItem('token')
  if (!token) {
    return next('/login')
  }
  next()
  // token存在,继续
})

// export default new Router({
//   routes: [
//     {
//       path: '/login',
//       component: Login
//     },
//     {
//       path: '/home',
//       component: Home
//     }
//   ]
// })

export default router
