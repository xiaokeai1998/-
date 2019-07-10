<template>
  <div class="list">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 搜索区域 -->
    <div style="margin: 15px 0;">
      <el-input
        v-model="goodsObj.query"
        placeholder="请输入内容"
        class="input-with-select"
        style="width:300px;margin-right:15px"
        @keyup.enter.native="init"
      >
        <el-button slot="append" icon="el-icon-search" @click="init"></el-button>
      </el-input>
      <el-button
        type="primary"
        @click="addDialogFormVisible = true;$router.push({name: 'Add'})"
      >添加商品</el-button>
    </div>

    <!-- 表格区域 -->

    <el-table :data="goodsList" style="width: 100%">
      <el-table-column prop="goods_name" label="商品名称" width="380"></el-table-column>
      <el-table-column prop="goods_price" label="商品价格" width="180"></el-table-column>
      <el-table-column prop="goods_state" label="商品状态"></el-table-column>
      <el-table-column prop="goods_weight" label="商品重量"></el-table-column>
      <el-table-column prop="add_time" label="创建时间"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini">编辑</el-button>
          <el-button size="mini" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页结构 -->
    <div class="block">

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="goodsObj.pagenum"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="goodsObj.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { getAllGoodsList } from '@/api/goods_api.js'
export default {
  data () {
    return {
      total: 0,
      goodsList: [],

      addDialogFormVisible: false,
      goodsObj: {
        query: '',
        pagesize: 10,
        pagenum: 1
      }
    }
  },
  methods: {
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      // 每页所显示的页码数
      this.goodsObj.pagesize = val
      this.init()
    },
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      // 获取当前页的页码
      this.goodsObj.pagenum = val
      this.init()
    },
    init () {
      getAllGoodsList(this.goodsObj).then(res => {
        console.log(res)
        this.goodsList = res.data.data.goods
        this.total = res.data.data.total
      })
    }
  },
  mounted () {
    this.init()
  }

}
</script>

<style lang="less" scoped>
</style>
