import { get, post } from './http.js'

const methodStr = {
	"get": get,
	"post": post,
}
const axios = (method, name, params) => {
	return new Promise((resolve, reject) => {
		methodStr[method](name, params).then(res => {
			resolve(res)
		}).catch(err => {
			reject(err)
		})
	})
}
export {
	axios
}