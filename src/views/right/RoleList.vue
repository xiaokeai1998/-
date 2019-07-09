<template>
  <div class="roleList">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button type="primary">添加用户</el-button>

    <!-- 展开栏功能的展示 -->
    <el-table :data="roleList">
      <el-table-column type="expand">
        "
        <template slot-scope="scope">
          <el-row
            v-for="first in scope.row.children"
            :key="first.id"
            style="margin-bottom:10px;border-bottom:1px #ccc dashed"
             @close='delRight(scope.row,first.id)'
          >
            <el-col :span="4">
              <el-tag closable type="warning">{{first.authName}}</el-tag>
            </el-col>
            <el-col :span="20">
              <el-row v-for="second in first.children" :key="second.id" style="margin-bottom:6px"  @close='delRight(scope.row,second.id)'>
                <el-col :span="4">
                  <el-tag closable type="success">{{second.authName}}</el-tag>
                </el-col>
                <el-col :span="20" >
                  <el-tag
                    closable
                    type="info"
                    v-for="third in second.children"
                    :key="third.id" style="margin-right:4px;margin-bottom:6px " @close='delRight(scope.row,third.id)'
                  >{{third.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span='24' v-show="scope.row.children.length===0">没有任何数据，请去设置权限</el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column type="index" width="50"></el-table-column>

      <el-table-column label="角色名称" prop="roleName"></el-table-column>
      <el-table-column label="角色描述" prop="roleDesc"></el-table-column>

      <el-table-column label="修改操作">
        <template slot-scope="scope">
          <el-tooltip content="编辑" placement="top">
            <el-button type="primary" icon="el-icon-edit"></el-button>
          </el-tooltip>

          <el-tooltip content="分配角色" placement="top">
            <el-button type="primary" icon="el-icon-check"></el-button>
          </el-tooltip>

          <el-tooltip content="删除" placement="top">
            <el-button type="primary" icon="el-icon-delete"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- 数据表格的展示 -->
  </div>
</template>
<script>
import { getAllRoleLlist, delRoleById } from '@/api/role_api.js'
export default {
  data () {
    return {
      roleId: '',
      roleList: []
    }
  },

  mounted () {
    // 获取树形组件的展示数据
    this.init()
  },

  methods: {
    // 删除指定角色的权限
    // 如果是删除三级权限，那么仅仅删除三级权限，
    delRight (row, rightId) {
      // console.log(rightId)
      // console.log(row.id)
      delRoleById(row.id, rightId).then(res => {
        console.log(res)
        if (res.data.meta.status === 200) {
          this.$message({
            type: 'success',
            message: res.data.data
          })
          // 重置当前展开的数据源数组
          row.children = res.data.data
        }
      })
    },
    init () {
      getAllRoleLlist()
        .then(res => {
          if (res.data.meta.status === 200) {
          // console.log(res)
            this.roleList = res.data.data
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

}
</script>
<style lang="less" scoped>
</style>
