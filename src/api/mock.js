import Mock from 'mockjs'
import homeApi from './mockServeData/home'
import permissionApi from './mockServeData/permission'

// 拦截器
Mock.mock('/home/getData', homeApi.getStatisticalDara)
Mock.mock(/permission\/getMenu/, 'post', permissionApi.getMenu)