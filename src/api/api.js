import { get, post } from '../conf/http.js'

// 获取列表
const getList = (params) => {
	return new Promise((resolve, reject) => {
		get('/api/blog/list', params).then(listData => {
			resolve(listData)
		}).catch(err => {
			rejcet(err)
		})
	})
}

const apiUrl = {
	'login': '/api/user/login', // 登录
	'getList': '/api/blog/list', // 获取列表
	'delBlog': '/api/blog/del' // 删除博客
}
const methodStr = {
	"get": get,
	"post": post,
}
const axiosData = (method, name, params) => {
	return new Promise((resolve, reject) => {
		methodStr[method](apiUrl[name], params).then(res => {
			resolve(res)
		}).catch(err => {
			rejcet(err)
		})
	})
}
export {
	axiosData
}