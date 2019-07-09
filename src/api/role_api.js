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
