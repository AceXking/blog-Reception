/**
 * http配置
 */
import axios from 'axios'
import {Loading, Message } from 'element-ui'

//相应超时时间
axios.defaults.timeout = 10000;
//http请求拦截器
var loadinginstace
axios.interceptors.request.use(config => {
  // element ui Loading方法
  loadinginstace = Loading.service({ fullscreen: true })
  return config
}, error => {
  loadinginstace.close()
  Message.error({
    message: '加载超时'
  })
  return Promise.reject(error)
})
// http响应拦截器
axios.interceptors.response.use(data => {// 响应成功关闭loading
  loadinginstace.close()
  return data
}, error => {
  loadinginstace.close()
  Message.error({
    message: '加载失败'
  })
  return Promise.reject(error)
})

function get(url, params) {
	const promise = new Promise((resolve, reject) => {
		axios.get(url, {
			params:params||{}
		}).then(res => {
			resolve(res)
		}).catch(err => {
			reject(err)
		})
	})
	return promise
}

function post(url, params) {
	const promise = new Promise((resolve, reject) => {
		axios({
			method: 'POST',
			url: url,
			data: JSON.stringify(params) || {},
			headers: { 'Content-type': 'application/json' }
		}).then(res => {
			resolve(res)
		}).catch(err => {
			reject(err)
		})
	})
	return promise
}

export {
	get,
	post
}
