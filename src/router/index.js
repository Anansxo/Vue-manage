// 引入vue
import Vue from 'vue'
// 引入路由
import VueRouter from "vue-router";
// 引入组件
// import Home from '../views/Home.vue'

// 使用路由
Vue.use(VueRouter)

// 使用push方法跳转路由报错 重复点击路由，导致提示避免到当前位置的冗余导航 解决方法
const routerRePush = VueRouter.prototype.push
VueRouter.prototype.push = function (location) {
	return routerRePush.call(this, location).catch(error => error)
}

// 配置路由组件
const routes = [
	{
		path: '/',
		name: 'Main',
		// component: Home
		// 按需引入组件
		component: () => import('../views/Main.vue'),
		redirect: '/login',
		// 子路由
		children: [
			{
				path: '/home',
				name: 'home',
				component: () => import('../views/Home')
			},
			{
				path: '/mall',
				name: 'mall',
				component: () => import('../views/mall')
			},
			{
				path: '/user',
				name: 'user',
				component: () => import('../views/User')
			},
			{
				path: '/page1',
				name: 'page1',
				component: () => import('../views/other/pageOne.vue')
			},
			{
				path: '/page2',
				name: 'page2',
				component: () => import('../views/other/pageTwo.vue')
			}
		]
	},
	{
		path:'/login',
		name:'login',
		component: () => import('../views/Login/Login.vue')
	}
]

export default new VueRouter({
	mode: 'history', //浏览器工作模式
	routes,
})
