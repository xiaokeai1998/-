<template>
  <div class="roleList">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button type="primary"  @click="addRoledialogFormVisible = true">添加角色</el-button>

    <!-- 展开栏功能的展示 -->
    <el-table :data="roleList">
      <el-table-column type="expand">
        "
        <template slot-scope="scope">
          <el-row
            v-for="first in scope.row.children"
            :key="first.id"
            style="margin-bottom:10px;border-bottom:1px #ccc dashed"
            @close="delRight(scope.row,first.id)"
          >
            <el- col :span="4">
              <el-tag closable type="warning">{{first.authName}}</el-tag>
            </el->
            <el-col :span="20">
              <el-row
                v-for="second in first.children"
                :key="second.id"
                style="margin-bottom:6px"
                @close="delRight(scope.row,second.id)"
              >
                <el-col :span="4">
                  <el-tag closable type="success">{{second.authName}}</el-tag>
                </el-col>
                <el-col :span="20">
                  <el-tag
                    closable
                    type="info"
                    v-for="third in second.children"
                    :key="third.id"
                    style="margin-right:4px;margin-bottom:6px "
                    @close="delRight(scope.row,third.id)"
                  >{{third.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24" v-show="scope.row.children.length===0">没有任何数据，请去设置权限</el-col>
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
            <el-button type="primary" icon="el-icon-check" @click='showdialogForm(scope.row)'></el-button>
          </el-tooltip>

          <el-tooltip content="删除" placement="top">
            <el-button type="primary" icon="el-icon-delete" @click='delrole(scope.row.id)'></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加分配权限对话框 -->
    <el-dialog title="授权角色" :visible.sync="grantdialogFormVisible">
      <el-tree
      :data="rightList"
      show-checkbox
      node-key="id"
      :default-expand-all ='true'
      :default-checked-keys="checkedArr"
      :props="defaultProps">
    </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="grantdialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="grantRightSubim">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 添加角色对话框 -->
<el-dialog title="角色添加" :visible.sync="addRoledialogFormVisible">

  <el-form :model="addFrom" :label-width="'120px'" :rules="rules" ref="addrole">
    <el-form-item label="角色名称" >
      <el-input v-model="addFrom.roleName" autocomplete="off"></el-input>
    </el-form-item>

     <el-form-item label="角色描述" >
      <el-input v-model="addFrom.roleDesc" autocomplete="off"></el-input>
    </el-form-item>

  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="addRoledialogFormVisible = false">取 消</el-button>
    <el-button type="primary"  @click="addRole">确 定</el-button>
  </div>
</el-dialog>

  </div>
</template>
<script>
import { getAllRoleLlist, delRoleById, grantRightRole, addRightForRole, delRightForRole } from '@/api/role_api.js'
import { getAllRightList } from '@/api/right_api.js'
export default {
  data () {
    return {
      // 添加角色对话框
      addRoledialogFormVisible: false,
      grantdialogFormVisible: false,

      roleId: '',
      roleList: [],
      rules: {
        // 用户名
        roleName: [
          { required: true, message: '请输入正确的用户名', trigger: 'blur' }
        ],
        roleDesc: [
          { required: true, message: '请输入正确的用户名', trigger: 'blur' }
        ]

      },
      // 角色的添加
      addFrom:
        {
          roleName: '',
          roleDesc: ''
        },

      // 应该默认被选中的节点id数组
      checkedArr: [],
      rightList: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      }

    }
  },

  mounted () {
    // 获取树形组件的展示数据
    this.init()
  },

  methods: {

    // 删除角色
    // delrole (id) {
    //   delRightForRole(id)
    //     .then(res => {
    //       console.log(id)
    //     })
    // },
    // 添加角色对话框
    addRole () {
      addRightForRole(this.addFrom)
        .then(res => {
          console.log(res)
          if (res.data.meta.status === 201) {
            this.$message({
              type: 'success',
              message: res.data.meta.msg
            })
            this.addRoledialogFormVisible = false
            this.init()
          }
        })
    },
    // 添加授权分类对话框
    grantRightSubim () {
      // grantRightRole(this.roleId, rids)
      var arr = this.$refs.mytree.getCheckedNodes()
      // map :可以将回调函数中的函数执行的结果储存到内部所创建的临时数组中
      console.log(arr)
      var temp = arr.map((value, index) => {
        return value.id + ',' + value.pid
      })
      console.log(temp)
      // 将temp转换为字符串
      var str = temp.join(',')
      console.log(str)
      // 去重：只有数组可以去重
      var arr2 = str.split(',')
      console.log(arr2)
      // new set : 数组去重
      var finalArr = [...new Set(arr2)]
      // 可以将对象的成员展开一个一个的值
      console.log(finalArr)
      grantRightRole(this.roleId, finalArr.join(','))
        .then(res => {
          if (res.data.meta.status === 200) {
            this.$message({
              type: 'success',
              message: res.data.meta.msg
            })
            // this.grantdialogFormVisible = false
            this.init()
          }
        })
    },
    // 展示角色授权对话框
    showdialogForm (row) {
      this.grantdialogFormVisible = true
      // 储存当前角色id
      this.roleId = row.id
      getAllRightList('tree')
        .then(res => {
          this.rightList = res.data.data
        })
        // 获取这个角色所有对应的三级权限
      this.checkedArr.length = 0
      row.children.forEach((first, index) => {
        if (first.children && first.children.length > 0) {
          // 遍历二级权限
          first.children.forEach((second) => {
            if (second.children && second.children.length > 0) {
              // 遍历三级权限
              second.children.forEach(third => {
                this.checkedArr.push(third.id)
              })
            }
          })
        }
      })
    },
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
            message: '删除成功'
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
