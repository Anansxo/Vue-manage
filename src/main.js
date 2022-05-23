import Vue from 'vue'
import App from './App.vue'
import './assets/css/index.css' //全局公共样式
import router from './router' //路由
import store from './store'; //Vuex
import axios from 'axios';
import './api/mock';
// import {Button,Container,Aside,Header,Main,Menu,Submenu,MenuItemGroup,MenuItem,Dropdown,DropdownItem} from 'element-ui'
import ElementUI, { MessageBox } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)
// Vue.use(Button)
// Vue.use(Container)
// Vue.use(Aside)
// Vue.use(Header)
// Vue.use(Main)
// Vue.use(Menu)
// Vue.use(Submenu)
// Vue.use(MenuItem)
// Vue.use(MenuItemGroup)
// Vue.use(Dropdown)
// Vue.use(DropdownItem)

Vue.config.productionTip = false
Vue.prototype.$confirm = MessageBox.confirm
// Vue.prototype.$message = Message

// 导航守卫
router.beforeEach((to, from, next) => {
  store.commit('getToken') //防止Vuex丢失Token信息
  const token = store.state.user.token
  if(!token && to.name !== 'login'){
    next({ name: 'login' })
  }else if(token && to.name === 'login'){
    next({name: 'home'})
  } else{
    next()
  }
})


new Vue({
  router,
  store,
  render: h => h(App),
  // 全局事件总线
  beforeCreate() {
    // 将axios放到Vue的原型上，使全局可以使用
    Vue.prototype.axios = axios
  },
  created(){
  store.commit('addMenu',router)
}

}).$mount('#app')
