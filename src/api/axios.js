import axios from 'axios'
import config from './config'

// 判断当前开发 环境
const baseUrl = process.env.NODE_ENV === 'development'
	? config.baseUrl.dev
	: config.baseUrl.pro

class HttpRequest {
	constructor(baseUrl) {
		this.baseUrl = baseUrl
	}
	getInsideConfig() {
		const config = {
			baseUrl: this.baseUrl,
			header: {}
		}
		return config
	}
	// 拦截器
	interceptors(instance) {
		// 添加请求拦截器
		instance.interceptors.request.use(config => {
			// 在发送请求之前做些什么
			return config;
		}, error => {
			// 对请求错误做些什么
			return Promise.reject(error);
		});

		// 添加响应拦截器
		instance.interceptors.response.use(response => {
			// 在响应之前做些什么
			// console.log(response, 'response');
			return response;
		}, error => {
			// 对响应错误做些什么
			// console.log(error, 'error');
			return Promise.reject(error);
		});
	}
	// 接口请求时调用
	request(options) {
		const instance = axios.create()
		options = { ...this.getInsideConfig(), ...options }
		// 调用拦截器，将创建的instance传入
		this.interceptors(instance)
		return instance(options)
	}
}

export default new HttpRequest(baseUrl)