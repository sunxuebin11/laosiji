<template>
  <div>
    <!-- 搜索框 和 添加按钮-->
    <el-row :gutter="20">
      <el-col :span="8">
        <el-input
          placeholder="搜索用户名"
          v-model="queryParams.keyword"
          style="height:80px;"
          id="shuru"
          @keyup.enter.native="getUserInfoss"
        >
        </el-input>
        <span class="el-icon-search sou-s"></span>
        <el-button @click="getUserInfoss">搜索</el-button>
      </el-col>
    </el-row>
    <!--内容卡片区-->
    <el-card class="box-card">
      <!--数据列表表格展示区域-->
      <el-table :data="userInfos" style="width: 100%" border >
        <el-table-column type="index" :index="indexMeth" label="序号" width="60"></el-table-column>
        <el-table-column prop="avatar" label="头像">
          <template slot-scope="scope">
            <img :src="scope.row.avatar" alt class="imgs">
          </template>
        </el-table-column>
        <el-table-column prop="name" label="用户名" width="140"></el-table-column>
        <el-table-column prop="mobile" label="手机号码" width="230"></el-table-column>
        <el-table-column prop="nickname" label="微信昵称" width="150"></el-table-column>
        <el-table-column prop="region" label="赛区" width="130"></el-table-column>
        <el-table-column prop="college" label="学校" width="200">
        </el-table-column>

        <el-table-column label="操作" width="230">
          <template slot-scope="scope">
          <span class="cha-k" @click="chaKan(scope.$index,scope.row,scope.row.openid)">点击查看作品</span>
          </template>
        </el-table-column>
      </el-table>

      <!--数据分页展示区域-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryParams.pagenum"
        :page-sizes="[3, 5, 10, 20]"
        :page-size="queryParams.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="queryParams.total"
        :pager-count="5"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
import Qs from 'qs'
export default {
  // 生命周期函数
  created() {
    this.getUserInfos()
  },
  methods: {
    // 序号问题
    indexMeth(index) {
      return (index + 1) + (this.queryParams.pagenum - 1) * this.queryParams.pagesize
    },
    // 查看作品
    chaKan(index, row, id) {
      this.$router.push({path: '/roles', query: {restaurant_id: id}})
      console.log(id, '2e2')
    },
    // 每页信息条数变化回调函数处理
    handleSizeChange(val) {
      this.queryParams.pagesize = val
      this.getUserInfos()
    },
    // 当前页码变化回调处理
    handleCurrentChange(val) {
      this.queryParams.pagenum = val
      this.getUserInfos()
    },
    // 获得首屏用户数据
    async getUserInfos() {
      var reqData = {
        keyword: this.queryParams.keyword,
        pagesize: this.queryParams.pagesize

      }
      console.log(reqData)
      var data = Qs.stringify(this.queryParams)
      const { data: res } = await this.$http.post('/admin/user/worker', data, {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'})
      this.userInfos = res.list
      console.log(res.list, 111)
      this.queryParams.total = res.count
    },
    async getUserInfoss() {
      var reqData = {
        keyword: this.queryParams.keyword,
        pagesize: this.queryParams.pagesize,
        pagenum: 1,
        total: 0

      }
      console.log(reqData)
      var data = Qs.stringify(reqData)
      const { data: res } = await this.$http.post('/admin/user/worker', data, {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'})
      this.userInfos = res.list
      console.log(res.list, 111)
      this.queryParams.total = res.count
    }
  },
  data() {
    return {
      // 接收用户数据
      userInfos: [
      ],
      // 定义获取用户数据时用到的查询条件参数
      queryParams: {
        keyword: '', // 用户关键字搜索使用
        pagenum: 1, // 当前页码
        pagesize: 3, // 每页显示条数
        total: 0 // 记录总条数
      }
    }
  }
}
</script>

<style lang="less" scoped>

.cha-k {
  color: #000 !important;
}
.imgs {
  height: 62px;
  width: 60px;
}
.sou-s {
  position: absolute;
  top: 11px;
  left: 20px;
  color: #000;
}

.el-button {
  position: absolute;
  top: 0px;
  left: 324px;
  color: #fff;
  background-color: #1E90FF;
}
</style>
<style>
#shuru {
  width: 300px;
  padding-left: 30px;
  outline:none !important;
  box-sizing: border-box;
}
#shuru::-webkit-input-placeholder {
  color: #ccc;
}
</style>
