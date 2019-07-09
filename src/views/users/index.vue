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
      <el-button type="primary" @click="addDialogFormVisible = true">添加用户</el-button>
    </div>

    <!-- 表格区 -->
    <el-table :data="userList" border style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>

      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column label="用户状态" width="80">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="changeUserState(scope.row.id,scope.row.mg_state)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="修改操作">
        <template slot-scope="scope">
          <el-tooltip content="编辑" placement="top">
            <el-button type="primary" icon="el-icon-edit" @click="showEditDialog(scope.row)"></el-button>
          </el-tooltip>

          <el-tooltip content="分配角色" placement="top">
            <el-button type="primary" icon="el-icon-check" @click="showGrandDialog(scope.row)"></el-button>
          </el-tooltip>

          <el-tooltip content="删除" placement="top">
            <el-button type="primary" icon="el-icon-delete" @click="deluserbyid(scope.row.id)"></el-button>
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
      <el-form :model="addForm" :label-width="'80px'" :rules="rules" ref="addForm">
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
        <el-button @click="addDialogFormVisible = true">取 消</el-button>
        <el-button type="primary" @click="addUserSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 角色分配表单 -->
    <el-dialog title="分配角色" :visible.sync="grantdialogFormVisible">
      <el-form :model="grantForm" :label-width="'120px'">
        <el-form-item label="当前的用户名称">
          <el-input v-model="grantForm.username" disabled style="width:100px" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="请选择角色" v-model="grantForm.rid">
          <el-select v-model="grantForm.rid" clearable placeholder="请选择">
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="grantdialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="grantRoleSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑用户对话框 -->
    <el-dialog title="编辑用户" :visible.sync="editDialogFormVisible">
      <el-form :model="editForm" :label-width="'120px'" :rules="rules" ref="editForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editForm.username" disabled style="width:100px" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="电话" prop="mobile">
          <el-input v-model="editForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="EdutUserSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getUsersList,
  addUsers,
  addDelete,
  grantUsersRole,
  updateUserState,
  editUsre
} from '@/api/user_api.js'
import { getAllRoleLlist } from '@/api/role_api.js'

export default {
  data () {
    return {

      value: '',
      grantdialogFormVisible: false,
      formLabelWidth: '120px',
      // 标记对话框的隐藏和显示
      addDialogFormVisible: false,
      editDialogFormVisible: false,
      // 编辑用户对话框
      editForm: {
        username: '',
        email: '',
        mobile: ''
      },
      // 添加用户数据对象
      addForm: {
        id: '',
        username: '',
        password: '',
        email: 'a@w.com',
        mobile: '13435678901'
      },
      // 添加用户角色
      grantForm: {
        username: '',
        id: '',
        rid: ''
      },
      roleList: [],

      total: 0,
      // 搜索
      query: '',
      // 当前页码
      pagenum: 1,
      // 当前每页显示页码条
      pagesize: 1,
      // 数据源
      userList: [],
      // 添加用户数据的验证表格
      rules: {
        // 用户名
        username: [
          { required: true, message: '请输入正确的用户名', trigger: 'blur' }
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
          {
            pattern: /^1[2345678]\d{9}$/,
            message: '请填写正确的手机号',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  mounted () {
    this.init()
    // 获取所有角色列表数据
    getAllRoleLlist().then(res => {
      // console.log(res)
      if (res.data.meta.status === 200) {
        this.roleList = res.data.data
      }
    })
  },
  // 分页功能
  methods: {
    // 编辑用户提交对话框的隐藏和显示
    showEditDialog (row) {
      this.editDialogFormVisible = true
      this.editForm.id = row.id
      this.editForm.username = row.username
      this.editForm.email = row.email
      this.editForm.mobile = row.mobile
      // console.log(row)
    },

    // 编辑角色用户提交接口的方法分配

    EdutUserSubmit () {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          editUsre(this.editForm).then(res => {
            if (res.data.meta.status === 200) {
              this.$message({
                type: 'success',
                message: res.data.meta.msg
              })
              this.editDialogFormVisible = false
              this.init()
            }
          })
        } else {
          this.message({
            type: 'waring',
            message: '用户输入不合法'
          })
        }
      })
    },
    // 调用接口的方法实现角色的分配
    grantRoleSubmit () {
      // 判断是否选择了角色
      if (!this.grantForm.rid) {
        this.$message({
          type: 'warning',
          message: '请选择角色'
        })
        return false
      }
      grantUsersRole(this.grantForm.id, this.grantForm.rid).then(res => {
        if (res.data.meta.status === 200) {
          this.$message({
            type: 'waring',
            message: res.data.meta.msg
          })
          this.grantdialogFormVisible = false
        }
      })
    },
    // 显示分配对话框角色
    showGrandDialog (row) {
      console.log(row)
      this.grantdialogFormVisible = true
      this.grantForm.username = row.username
      this.grantForm.id = row.id
      // 实现下拉框列表选项的默认展示
      this.grantForm.rid = row.rid
    },
    // 修改用户状态
    changeUserState (id, type) {
      updateUserState(id, type).then(res => {
        console.log(res)
        this.$message({
          type: 'success',
          message: res.data.meta.msg
        })
      })
    },
    // 删除单个用户的方法
    deluserbyid (id) {
      console.log(id)
      // 给删除用户提示
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 如果单击确定，就会执行.then
          // 正真执行删除操作
          addDelete(id)
            .then(res => {
              console.log(res)
              if (res.data.meta.status === 200) {
                this.$message({
                  type: 'success',
                  message: '删除成功'
                })
                // 判断本次删除之后，当前页还没有数据，如果没有数据，就保存页面为当前页，否则就到上一页
                this.pagenum =
                  Math.ceil((this.total - 1) / this.pagesize) < this.pagenum
                    ? --this.pagenum
                    : this.pagenum
                this.init()
              }
            })
            .catch(err1 => {
              this.$message({
                type: 'error',
                message: '删除失败'
              })
            })
        })
        .catch(() => {
          // 如果单击取消就会执行.catch
          this.$message({
            type: 'info',
            message: '以取消删除'
          })
        })
    },
    // 搜索方法
    search () {
      this.pagenum = 1
      this.init()
    },

    // 添加弹框用户数据
    addUserSubmit () {
      // 1.再次实现数据的验证
      this.$refs.addForm.validate(valid => {
        if (valid) {
          addUsers(this.addForm)
            .then(res => {
              if (res.data.meta.status === 201) {
                // 让对话框隐藏
                this.addDialogFormVisible = false
                // 重置表单元素的数据
                this.$refs.addForm.resetFields()
                // 实现数据刷新
                this.init()
              } else {
                this.$message({
                  type: 'error',
                  message: res.data.meta.msg
                })
              }
            })
            .catch(err => {
              console.log(err)
            })
        } else {
          return false
        }
      })
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
