import axios from '@/api/common.js'

// 商品分类
export const getCategoriesGoodsList = (type) => {
  return axios({
    url: 'categories',
    params: { type }

  })
}
