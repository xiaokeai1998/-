<template>
  <div class="user">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 搜索栏 -->
    <div style="margin-top: 15px;">
      <el-input
        placeholder="请输入内容"
        class="input-with-select"
        style="width:300px; margin-right:15px"
        v-model="query"
        @keyup.enter.native="search"
      >
        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
      </el-input>
      <el-button type="primary" @click="showAddDialog">添加用户</el-button>
    </div>

    <!-- 表格区 -->
    <el-table :data="userList" border style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>

      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column label="用户状态" width="80">
        <template slot-scope="scope">
          <el-switch v-model="value" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
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

    <!-- 分页功能 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[1, 2, 3, 4]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

    <!-- 添加用户对话框 -->

    <el-dialog title="添加用户" :visible.sync="addDialogFormVisible">
      <el-form :model="addForm" :label-width="'80px'" :rules="rules">
        <!-- 用户名 -->
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 邮箱 -->
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 电话 -->
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="addForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <!-- 按钮 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogFormVisible = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getUsersList, addUser } from '@/api/user_api.js'
export default {
  data () {
    return {
      // 标记对话框的隐藏和显示
      addDialogFormVisible: true,
      // 添加用户数据对象
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },

      total: 0,
      // 搜索
      query: '',
      // 当前页码
      pagenum: 1,
      // 当前每页显示页码条
      pagesize: 1,
      value: true,
      // 数据源
      userList: [],
      // 添加用户数据的验证表格
      rules: {
        // 用户名
        username: [
          { required: true, message: '请输入正确的用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        // 密码
        password: [
          { required: true, message: '请输入正确的密码', trigger: 'blur' },
          { min: 6, max: 16, message: '数字在6到16之间', trigger: 'blur' }
        ],
        // 邮箱
        email: [
          {
            required: true,
            message: '请输入正确的邮箱',
            trigger: 'blur',
            pattern: /\w+[@]\w+[.]\w{2,3}/
          }
        ],
        // 电话号码
        mobile: [
          { required: true, message: '请输入正确的手机号', trigger: 'blur' },
          { pattern: /^1[2345678]\d{9}$/, message: '请填写正确的手机号' }
        ]
      }
    }
  },
  mounted () {
    this.init()
  },
  // 分页功能
  methods: {
    // 弹出对话框
    showAddDialog () {},
    // 搜索方法
    search () {
      this.pagenum = 1
      this.init()
    },

    // 添加弹框用户数据
    addUsers () {
      // this.$refs.addForm.validate(valid =>{
      //   if(valid){
      //     addUser(this.addForm)
      //     .then(res =>{
      //       if(res.data.meta.status === 201){
      //         // 让对话框隐藏
      //         this.addDialogFormVisible = false
      //       }else {
      //         // 重置表单元素的数据
      //         this.$refs.addForm.resetFields()
      //         // 实现刷新
      //         this.inti()
      //       }
      //     })
      //     .catch(err =>{
      //       console.log(err)
      //     })
      //   } else {
      //     return false
      //   }
      // })
    },

    // 数据初始化
    init () {
      // 获取所有的数据
      getUsersList({
        query: this.query,
        pagenum: this.pagenum,
        pagesize: this.pagesize
      })
        .then(res => {
          console.log(res)
          this.userList = res.data.data.users
          this.total = res.data.data.total
        })
        .catch(err => {
          console.log(err)
        })
    },

    handleSizeChange (val) {
      // 重置pagesize
      // 将pagesize重置，再次发起数据请求
      this.pagesize = val
      this.init()
    },
    // 切换当前页面
    handleCurrentChange (val) {
      // 将pagenum重置，再次发起数据请求
      this.pagenum = val
      this.init()
    }
  }
}
</script>

<style lang="less" scoped>
</style>
