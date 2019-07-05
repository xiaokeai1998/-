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
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/home/users">
                <i class="el-icon-location"></i>
                <span>用户信息</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <!-- 权限管理 -->
          <el-submenu index="3-2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">
                <i class="el-icon-location"></i>
                <span>角色列表</span>
              </el-menu-item>
              <el-menu-item index="1-2">
                <i class="el-icon-location"></i>
                <span>权限列表</span>
              </el-menu-item>
            </el-menu-item-group>
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
export default {};
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
