import axios from '@/api/common.js'

// 商品列表展示
export const getAllGoodsList = (params) => {
  return axios({
    url: 'goods',
    params
  })
}

// 数据图表展示
export const addGoods = (data) => {
  return axios({
    url: 'goods',
    method: 'post',
    data
  })
}
