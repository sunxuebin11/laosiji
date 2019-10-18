<template>
  <el-container>
    <el-header style="height: 70px;">
      <div id="logo-box">
        <img src="../assets/img/logo1.png" alt>
      </div>
       <el-tooltip effect="dark" content="消息" placement="top">
      <span class="el-icon-bell lin-d"></span>
       </el-tooltip>
      <el-dropdown id="xiala" @command="logout">
      <span class="guan-li">
        超级管理员
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="login">退出</el-dropdown-item>
      </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <el-container>
      <el-aside style="width:190px;">
        <!-- 侧边栏 -->
        <el-menu
          :default-active="hash"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :router="true"
          style="border:1px solid #545c64"
        >
          <!-- <el-menu-item index="/users">
            <span slot="title">我是创作者（用户列表）</span>
          </el-menu-item> -->
          <!-- <el-menu-item index="/rights">
            <span slot="title">我是探展人（浏览者）</span>
          </el-menu-item> -->
          <el-menu-item index="/roles">
            <span slot="title">老司机</span>
          </el-menu-item>
          <!-- <el-menu-item index="/categories">
            <span slot="title">作品统计列表</span>
          </el-menu-item> -->
          <!-- <el-menu-item index="/params">
            <span slot="title">人数统计列表</span>
          </el-menu-item> -->
          <!-- <el-menu-item index="/liuyan">
            <span slot="title">留言列表</span>
          </el-menu-item> -->
        </el-menu>
      </el-aside>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  // 生命周期函数
  created() {
  },
  watch: {
    $route: 'getHash'
  },
  data() {
    return {
      hash: ''
    }
  },
  methods: {
    // 监听路由
    getHash() {
      this.hash = this.$route.path
    },
    // 侧边栏回diao
    handleOpen(key, keyPath) {
      console.log(key, keyPath, 1111)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },

    // 退出系统
    logout() {
      // 跳转到登录页面
      this.$confirm('确认要退出系统么?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          const {data: res} = await this.$http.get('/admin/login/logout')
          console.log(res)
          this.$router.push('/login')
          // token清除
          window.sessionStorage.removeItem('token')
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="less" scoped>
.lin-d {
  font-size: 24px;
  color: #fff;
  margin-right: 225px;
}
.guan-li {
  color: #fff;
}
.tou-x {
  position: absolute;
  right: 52px;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  background-color: #fff;
}
.el-footer {
  background-color: #000 !important;
  height: 80px !important;
  color: #fff;
  line-height: 80px;
  text-align: center;
}
.el-container {
  height: 100%;
  .el-header {
    background-color: #242f42;
    height: 90px;
    padding: 0;
    padding-left: 51px;
    // 弹性布局
    display: flex;
    align-items: center;
    justify-content: space-between;
    #logo-box {
      font-size: 22px;
      color: #fff;
      display: flex;
      align-items: center;
      user-select: none;
      img {
        margin-left: 198px;
      }
    }
  }
  .el-aside {
    background-color: #545c64;
    height: 100% !important;
    border: none;
  }
  .el-main {
    background-color: #e5e5e5;
  }

  style Attribute {
    color: #000;
  }
}
#xiala {
  position: absolute;
  right: 109px;
}
</style>
