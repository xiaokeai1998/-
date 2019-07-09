// 用来管理数据接口管理的
// 引入
import axios from 'axios'
// 设置基准路径
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
// 添加拦截器
axios.interceptors.request.use(
  function (config) {
    // 1.获取token
    var token = localStorage.getItem('our_per_token')
    if (token) {
      // 2.必须在请求头中使用，Authorization 字段提供token令牌
      config.headers['Authorization'] = token
      // console.log(config)
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }

)
export default axios
