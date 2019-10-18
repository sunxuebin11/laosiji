import Vue from 'vue'
import App from './App'
// 引入css样式全局控制
import './assets/css/global.css'
// 引入element-ui
import ElementUI from 'element-ui'
// 引入“图标库”css样式文件
import './assets/fonts/iconfont.css'

import router from './router'
// 引入axios
import axios from 'axios'

// 给当前项目引入 tree型的table表格
// import ZkTable from 'vue-table-with-tree-grid'

// 把tree型table注册给vue
// Vue.use(ZkTable)

// 给axios做配置(访问根地址、Vue之$http成员)
// axios.defaults.baseURL = 'https://app.testing.iddi-inc.com'
// 给axios配置"拦截器"，在其中绑定token
axios.interceptors.request.use(
  function(config) {
    var token = window.sessionStorage.getItem('token')
    config.headers.Authorization = token
    return config
  },
  function(error) {
    return Promise.reject(error)
  }
)
Vue.prototype.$http = axios

// 给Vue注册全部的element-ui的标签组件 和 事件方法组件
Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
