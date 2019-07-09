// 专门出来user用户管理的
// 引入
import axios from 'axios'

// 设置基准路径
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

// 添加拦截器
axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么，手动传递token
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
// 实现用户登录
export const login = (data) => {
  return axios({
    method: 'post',
    url: 'login',
    data
  })
}

// 获取用户列表用户数据
export const getUsersList = (pa) => {
  return axios({
    url: 'users',
    params: pa
  })
}

// 添加用户数据
export const addUsers = (data) => {
  return axios({
    url: 'users',
    method: 'post',
    data
  })
}

// 根据用户id删除添加（post） 删除（delete）修改（put） 查（get）
export const addDelete = (id) => {
  return axios({
    url: `users/${id}`,
    method: 'delete'
  })
}

// 修改用户状态
export const updateUserState = (uid, type) => {
  return axios({
    url: `users/${uid}/state/${type}`,
    method: 'put'
  })
}

// 分配用户角色
export const grantUsersRole = (id, rid) => {
  return axios({
    url: `users/${id}/role`,
    method: 'put',
    data: { rid }
  })
}

// 编辑用户
export const editUsre = (data) => {
  return axios({
    url: `users/${data.id}`,
    method: 'put',
    data: { email: data.email, mobile: data.mobile }
  })
}
