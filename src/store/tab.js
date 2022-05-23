import Cookie from 'js-cookie'
export default {
	// namespaced: true,
	// 需要进行组件共享的数据
	state: {
		isCollapse: false,
		tabsList: [
			{
				path: "/",
				name: "home",
				label: "首页",
				icon: "s-home",
				url: "Home/Home",
			},
		],
		currentMenu: null,
		menu:[]
	},
	// 处理代码结果
	mutations: {
		collapseMenu(state) {
			state.isCollapse = !state.isCollapse //取反
		},
		selectMenu(state, val) {
			if (val.name !== 'home') {
				state.currentMenu = val
				// 判断item的name与传入进来的name是否一样
				// findIndex()方法返回数组中满足提供的测试函数的第一个元素的索引。若没有找到对应元素则返回-1
				const result = state.tabsList.findIndex(item => item.name === val.name)
				if (result === -1) {
					state.tabsList.push(val)
				}
			} else {
				state.currentMenu = null
			}
		},
		closeTag(state, val){
			const result = state.tabsList.findIndex(item => item.name === val.name)
			state.tabsList.splice(result, 1)
		},
		setMenu(state, val){
			state.menu = val
			Cookie.set('menu', JSON.stringify(val))
		},
		clearMene(state){
			state.menu = []
			Cookie.remove('menu')
		},
		addMenu(state, router){
			if(!Cookie.get('menu')){
				return
			}
			const menu = JSON.parse(Cookie.get('menu'))
			state.menu = menu
			const menuArray = []
			// 遍历Menu 区分一级菜单和二级菜单 
			menu.forEach(item=>{
				if(item.children){
					 item.children = item.children.map(item=>{
						 item.component = ()=> import(`../views/${item.url}`)
						 return item
					 })
					 menuArray.push(...item.children)
				}else{
					item.component = ()=> import(`../views/${item.url}`)
					menuArray.push(item)
				}
			})
			// 路由动态添加
			menuArray.forEach(item=>{
				router.addRoute('Main', item)
			})
		}
	},
}