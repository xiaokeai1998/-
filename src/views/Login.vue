<template>
  <div class="login">
    <div class="container">
      <!-- 用户名 -->
      <img src="../assets/acatve1.jpg" alt class="avatar" />
      <el-form :model="loginForm" :rules="rules" ref="loginForm" class="demo-ruleForm">
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="myicon myicon-user"
            placeholder="请输入用户名"
            clearable
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            prefix-icon="myicon myicon-key"
            placeholder="请输入密码"
            clearable
            @keyup.enter.native="loginsubmit"
          ></el-input>
        </el-form-item>
        <!-- 登录框 -->
        <el-form-item>
          <el-button type="primary" @click="loginsubmit" class="login-btn">立即创建</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// 在srcipt中进行模块方法的引入
import { login } from "@/api/user_api.js";
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入正确的用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入正确的密码", trigger: "blur" },
          { min: 6, max: 16, message: "数字在6到16之间", trigger: "blur" }
        ]
      }
    };
  },

  methods: {
    loginsubmit() {
      // 再次实现用户数据的验证
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          // 调用接口方法实现用户登录
          console.log(login, "login借口");
          login(this.loginForm)
            .then(res => {
              console.log(res);
              if (res.data.meta.status === 200) {
                //  将token数据储存到本地
                console.log(res.data.data.token, "token回归给 ");
                localStorage.setItem("our_per_token", res.data.data.token);
                console.log(
                  localStorage.getItem("our_per_token"),
                  "token存好了 "
                );
                // 跳转
                this.$router.push({ name: "home" });
              } else {
                this.$message({
                  type: "warning",
                  message: res.data.meta.msg
                });
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          this.$message({
            type: "error",
            message: "数据输入错误，请重新输入"
          });
          // 一定要return false，否则不能真正的阻止
          return false;
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #c0454582;
  .container {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 0px 40px 15px 40px;
    margin: 200px auto;
    background: white;
    .avatar {
      position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -60px;
      margin-top: -60px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
