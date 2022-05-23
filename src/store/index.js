import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import tab from './tab'
import user from './user'
export default new Vuex.Store({
	// 模块化Vuex
	modules:{
		tab,user
	}
})