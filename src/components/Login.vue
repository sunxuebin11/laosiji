<template>
  <div id="login-container">
    <div id="login-box">
      <div id="login-logo">
        <p>账户登录</p>
      </div>
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules">
        <el-form-item prop="name">
          <el-input v-model="loginForm.name">
            <i slot="prefix" class="iconfont icon-user"></i>
          </el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input type="password" v-model="loginForm.password">
            <i slot="prefix" class="iconfont icon-3702mima"></i>
          </el-input>
        </el-form-item>

        <el-row>
          <el-col :offset="20">
            <el-button type="primary" @click="login">登陆</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
// import Qs from 'qs'
export default {
  data() {
    // 定义登录表单需要使用的数据部分
    return {
      loginForm: {
        name: '',
        password: ''
      },
      // 给登录表单域设置校验规则
      loginFormRules: {
        username: [
          // required:必须填写  message:检验错误提示信息，trigger:校验触发器
          { required: true, message: '请输入用户名称', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 用户登录系统
    login() {
      // 对form表单进行校验
      // this.$refs.loginFormRef.validate(async valid => {
      //   if (valid === true) {
      //     var data = Qs.stringify(this.loginForm)
      //     const { data: res } = await this.$http.post('/admin/login/login', data, {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'})
      //     console.log(res)
      //     if (res.errcode !== 0) {
      //       alert(res.errmsg)
      //     } else {
      //       // 通过sessionStorage记录token
      //       window.sessionStorage.setItem('token', '1')
      // 进行路由跳转(重定向)，具体跳转到(/home)
      this.$router.push('/home')
      //     }
      //   }
      // })
    },
    // 重置form表单
    resetForm() {
      this.$refs.loginFormRef.resetFields()
    }
  }
}
</script>
<style lang="less" scoped>
#login-container {
  background-color: #2b4b6b;
  height: 100%;
  overflow: hidden;
  #login-box {
    width: 450px;
    height: 304px;
    background-color: #ffffff;
    border-radius: 4px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    #login-logo {
      padding: 8px;
      position: absolute;
      left: 50%;
      transform: translate(-50%, 2%);
      font-size: 30px;
      color: #2b4b6b;
    }
    .el-form {
      width: 100%;
      position: absolute;
      bottom: 0;
      padding: 20px;
      box-sizing: border-box;
    }
  }
}
</style>
