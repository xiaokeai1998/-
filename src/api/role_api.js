// 专门处理role角色管理
import axios from '@/api/common.js'
export const getAllRoleLlist = () => {
  return axios({
    url: 'roles'
  })
}

// 删除角色接口
export const delRoleById = (roleId, rightId) => {
  return axios({
    url: `roles/${roleId}/rights/${rightId}`,
    method: 'delete'
  })
}

// 角色授权接口
export const grantRightRole = (roleId, rids) => {
  return axios({
    url: `roles/${roleId}/rights`,
    data: rids,
    method: 'post'
  })
}
// 添加角色
export const addRightForRole = (data) => {
  return axios({
    url: 'roles',
    data: data,
    method: 'post'
  })
}

// 删除角色
export const delRightForRole = (id) => {
  return axios({
    url: `roles/${id}`,
    method: 'delete'
  })
}
