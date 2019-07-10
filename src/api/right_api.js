import axios from '@/api/common.js'
// 设置权限数据管理接口
export const getAllRightList = (type) => {
  return axios({
    url: `rights/${type}`
  })
}

// 获取左侧菜单列表
export const getLeftMenuList = () => {
  return axios({
    url: 'menus'
  })
}
