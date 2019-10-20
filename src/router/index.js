import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home' // 是App的子组件
import User from '@/components/User' // 具体是home的子组件
import Browse from '@/components/browse' // 具体是home的子组件
import Zuoping from '@/components/Zuoping' // 具体是home的子组件
import Zptongji from '@/components/Zptongji' // 具体是home的子组件
import Renshu from '@/components/Renshu' // 具体是home的子组件
import Liuyan from '@/components/Liuyan' // 具体是home的子组件

Vue.use(Router)

var router = new Router({
  routes: [
    { path: '/login', component: Login },
    { path: '/', redirect: '/home' },
    {
      path: '/home',
      component: Home,
      redirect: '/roles',
      children: [
        { path: '/users', component: User },
        { path: '/rights', component: Browse },
        { path: '/roles', component: Zuoping },
        { path: '/categories', component: Zptongji },
        { path: '/params', component: Renshu },
        { path: '/liuyan', component: Liuyan }
      ]
    }
  ]
})
// 路由导航守卫，检测token如果不存在，就跳转到login登录组件去
// router.beforeEach((to, from, next) => {
//   // 访问/login 就直接pass
//   if (to.path === '/login') {
//     return next()
//   }

//   // 访问非login，判断token
//   var token = window.sessionStorage.getItem('token')
//   if (!token) {
//     return next('/login')
//   }
//   next() // token存在，继续....
// })

export default router
