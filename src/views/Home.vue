<template>
  <div class="home">
    <el-container>
      <el-aside width="200px">
        <div class=".el-menu-admin">
          <!-- logo -->
          <img src="../assets/logo.png" alt class="logo" />
        </div>

        <!-- 导航栏 -->
        <el-menu
          :router="true"
          default-active="2-2"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <!-- 用户信息 -->
            <el-submenu :index="first.id+''" v-for='first in menuList' :key='first.id'>
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{first.authName}}</span>
            </template>
            <el-menu-item :index="'/home/'+second.path" v-for='second in first.children' :key='second.id'>
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{second.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <span class="toggle-btn myicon myicon-menu"></span>
          <h1 class="system-title">电商后台管理系统</h1>
          <a href="javascript:;" class="welcome">退出</a>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { getLeftMenuList } from '@/api/right_api.js'
export default {
  data () {
    return {
      menuList: []
    }
  },
  mounted () {
    getLeftMenuList()
      .then(res => {
        console.log(res)
        if (res.data.meta.status === 200) {
          this.menuList = res.data.data
        }
      })
  }
}
</script>

<style lang="less" scoped>
.home {
  height: 100%;
  .el-menu-admin:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-container {
    height: 100%;
  }
  .el-aside {
    background-color: #c0454582;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #c0454582;
  }
  .logo {
    height: 60px;
    background: url(../assets/logo.png);
    background-size: cover;
    background-color: #fff;
  }
  .toggle-btn {
    padding: 0 15px;
    margin-left: -20px;
    font-size: 36px;
    color: #666666;
    cursor: pointer;
    line-height: 60px;
    &:hover {
      background-color: #4292cf;
    }
  }
  .system-title {
    font-size: 28px;
    color: #000;
  }
  .welcome {
    color: #000;
  }
}
</style>
