<template>
  <div class="add">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 步骤条 -->
    <el-steps :active="activeName - 0" finish-status="success">
      <el-step title="步骤 1"></el-step>
      <el-step title="步骤 2"></el-step>
      <el-step title="步骤 3"></el-step>
      <el-step title="步骤 4"></el-step>
      <el-step title="步骤 5"></el-step>
    </el-steps>

    <!-- 标签页 -->
    <el-form ref="addFrom" :label-width="'100px'">
      <el-tabs v-model="activeName" tab-position="left">
        <el-tab-pane label="基本信息" name="0">
          <el-form-item label="商品名称">
            <el-input v-model="addFrom.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input v-model="addFrom.goods_price"></el-input>
          </el-form-item>

          <el-form-item label="商品重量">
            <el-input v-model="addFrom.goods_weight"></el-input>
          </el-form-item>

          <el-form-item label="商品数量">
            <el-input v-model="addFrom.goods_number"></el-input>
          </el-form-item>

          <el-form-item label="商品分类">
            <el-cascader
              :options="goodsCateList"
              :props="cascaderProps"
              clearable
              @change="getCate"
              v-model="addFrom.goods_cat"
            ></el-cascader>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="商品参数" name="1">商品属性</el-tab-pane>
        <el-tab-pane label="商品属性" name="2">商品属性</el-tab-pane>
        <el-tab-pane label="商品图片" name="3">
          <el-upload
            class="upload-demo"
            action='http://localhost:8888/api/private/v1/upload'
            :headers="gteToken()"
            :on-remove="handleRemove"
            :on-success='handSuccess'
            :file-list="fileList"
            list-type="picture"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-tab-pane>
        <el-tab-pane label="商品内容" name="4">商品内容</el-tab-pane>
      </el-tabs>
      <el-button type="primary" plain class="btn" @click="addGoods">添加商品</el-button>
    </el-form>
  </div>
</template>

<script>
import { getCategoriesGoodsList } from '@/api/categories_api.js'
export default {
  data () {
    return {
      fileList: [],
      cascaderProps: {
        checkStrictly: true,
        label: 'cat_name',
        value: 'cat_id',
        children: 'children'
      },
      goodsCateList: [],
      addFrom: {
        goods_name: '',
        goods_price: '',
        goods_number: '',
        goods_weight: '',
        goods_cat: '',
        // 用户图片数据，它是一个数组，里面的每一个键和值是一个对象
        pics: []
      },
      active: 0,
      activeName: '0'
    }
  },
  mounted () {
    getCategoriesGoodsList(3).then(res => {
      if (res.data.meta.status === 200) {
        this.goodsCateList = res.data.data
        // console.log(this.goodsCateList)
      }
    })
  },
  methods: {

    // 添加商品
    addGoods () {
      console.log(this.addFrom.pics)
    },
    // 文件上传成功字后的钩子
    handSuccess (response) {
      console.log(response)
      // 将当前成功上传的文件添加到数据对象中
      this.addFrom.pics.push({ pic: response.data.tmp_path })
    },
    // 图片移除是的触发
    handleRemove (file, fileList) {
      console.log(file)
      console.log(fileList)
    },
    // 移除图片是触发的时间
    gteToken () {
      var token = localStorage.getItem('our_per_token')
      return { Authorization: token }
    },

    getCate (value) {
      console.log(value)
      console.log(this.addFrom.goods_cat)
    }
  }
}
</script>

<style lang="less" scoped>
.btn {
  float: right;
  margin-top: 40px;
}
</style>
