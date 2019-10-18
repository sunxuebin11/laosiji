<template>
  <div>
    <!--内容卡片区-->
    <el-card class="box-card">
      <!--数据列表展示区域-->
      <el-table
        :data="rightsInfos"
        style="width: 100%"
        ref="multipleTable"
        border
      >
        <el-table-column type="index" :index="indexMeth" label="序号" width="60"></el-table-column>
        <!-- <el-table-column type="index" :index="indexMeth" label="序号" width="60"></el-table-column> -->
        <el-table-column prop="avatar" label="微信头像">
          <template slot-scope="scope">
               <img :src="scope.row.avatar" alt class="imgs">
          </template>
        </el-table-column>
        <el-table-column prop="nickname" label="微信昵称" width="160"></el-table-column>
        <el-table-column prop="name" label="投票用户" width="180"></el-table-column>
        <el-table-column prop="vote_num" label="投票数量" width="180"></el-table-column>
        <el-table-column prop="ctime" label="投票日期" width="260"></el-table-column>
        <el-table-column label="操作" width="260">
          <template slot-scope="scope">

          <el-button @click="delUser(scope.row.id)" :id="scope.row.type == 1?jinzhile :jinzhi" :disabled="scope.row.type == 1?true:false">禁止投票</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px" class="ding-w">
        <!--数据分页展示区域-->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryParams.pagenum"
          :page-sizes="[3, 5, 10, 20]"
          :page-size="queryParams.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="queryParams.total"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import Qs from 'qs'
export default {
  // 生命周期函数
  created() {
    this.getRightsInfo()
  },
  methods: {
    // 序号问题
    indexMeth(index) {
      return (index + 1) + (this.queryParams.pagenum - 1) * this.queryParams.pagesize
    },
    // 删除用户
    async delUser(Id) {
      var that = this
      this.$confirm('是否禁止此用户投票, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(async() => {
        var reqData = {
          id: Id
        }
        var data = Qs.stringify(reqData)
        const { data: res } = await this.$http.post('/admin/user/banVisitor', data, {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'})
        console.log(res)
        that.getRightsInfo()
        this.$message({
          type: 'success',
          message: '成功!'
        })
      }).catch(() => {
        that.getRightsInfo()
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    // 获取用于显示的权限列表信息
    async getRightsInfo() {
      var data = Qs.stringify(this.queryParams)
      const { data: res } = await this.$http.post('/admin/user/visitor', data, {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'})
      this.rightsInfos = res.list
      this.queryParams.total = res.count
      console.log(res)
    },
    // 每页信息条数变化回调函数处理
    handleSizeChange(val) {
      this.queryParams.pagesize = val
      this.getRightsInfo()
    },
    // 当前页码变化回调处理
    handleCurrentChange(val) {
      this.queryParams.pagenum = val
      this.getRightsInfo()
    }
  },
  data() {
    return {
      // 权限列表变量
      rightsInfos: [
      ],
      // 定义获取用户数据时用到的查询条件参数
      queryParams: {
        pagenum: 1, // 当前页码
        pagesize: 3, // 每页显示条数
        total: 0 // 记录总条数
      },
      multipleSelection: [],
      jinzhi: 'shanChu',
      jinzhile: 'shanChu1'
    }
  }
}
</script>

<style lang="less" scoped>

.imgs {
  height: 58px;
  width: 60px;
}
.ding-w {
  position: relative;
}
#shanChu {
  height: 30px;
  width: 156px;
  background-color:#1E90FF;
  line-height: 5px;
  color: #fff;
  border: #ccc;
}
#shanChu1 {
  height: 30px;
  width: 156px;
  background-color:#ccc;
  line-height: 5px;
  color: #fff;
  border: #ccc;
}
</style>
<style>
</style>
