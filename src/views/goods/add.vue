<template>
  <div class="add">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 步骤条 -->
    <el-steps :space="200" :active="activeName-0" finish-status="success">
      <el-step title="已完成"></el-step>
      <el-step title="进行中"></el-step>
      <el-step title="步骤 3"></el-step>
      <el-step title="步骤 4"></el-step>
      <el-step title="步骤 5"></el-step>
    </el-steps>

    <!-- 标签页 -->
    <el-tabs
      :v-model="activeName-0"
      tab-position="left"
      finish-status="success"
      style="margin-top:25px"
      @tab-click="handleClick"
    >
      <el-tab-pane label="基本用户信息" name="first">基本用户信息</el-tab-pane>
      <el-tab-pane label="产品参数" name="second">产品参数</el-tab-pane>
      <el-tab-pane label="商品属性" name="third">商品属性</el-tab-pane>
      <el-tab-pane label="商品图片" name="fourth">商品图片</el-tab-pane>
      <el-tab-pane label="商品内容" name="five">商品内容</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 0,
      activeName: 'first'
    }
  }
}
</script>

<style lang="less" scoped>
</style>
