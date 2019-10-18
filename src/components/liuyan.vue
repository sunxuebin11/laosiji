<template>
  <div>
            <div class="block">
              <el-date-picker
                v-model="value1"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
                @click="DataQi"
              ></el-date-picker>
              <el-button @click="DataQi">查看</el-button>
            </div>
    <!--内容卡片区-->
    <el-card class="box-card">

      <!--数据列表表格展示区域-->
      <el-table :data="userInfos" style="width: 100%">
        <el-table-column type="index" label="序号" width="60"></el-table-column>
        <el-table-column prop="nickname" label="昵称" width="130"></el-table-column>
        <el-table-column prop="ctime" label="日期" width="200">
        </el-table-column>
        <el-table-column prop="content" label="文本" >
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
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
import Qs from 'qs'
export default {
  // 生命周期函数
  created() {
    this.getCatInfos()
  },
  methods: {
    // 时间选择
    DataQi() {
      this.getCatInfos()
    },

    // 每页信息条数变化回调函数处理
    handleSizeChange(val) {
      this.queryParams.pagesize = val
      this.getCatInfos()
    },
    // 当前页码变化回调处理
    handleCurrentChange(val) {
      this.queryParams.pagenum = val
      this.getCatInfos()
    },
    // 获取用于显示的分类信息
    async getCatInfos() {
      this.start = this.value1[0]
      this.end = this.value1[1]
      console.log(this.start, this.end)
      var reqData = {
        start: this.start,
        end: this.end,
        pagenum: this.queryParams.pagenum, // 当前页码
        pagesize: this.queryParams.pagesize, // 每页显示条数
        total: 0 // 记录总条数
      }
      var data = Qs.stringify(reqData)
      const { data: res } = await this.$http.post('admin/message/lists', data, { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' })
      this.userInfos = res.list
      this.queryParams.total = res.count
    }
  },
  data() {
    return {
      value1: '',
      start: '',
      end: '',
      // 接收获得回来的分类列表信息
      userInfos: [],
      queryParams: {
        pagenum: 1, // 当前页码
        pagesize: 3, // 每页显示条数
        total: 0 // 记录总条数
      }
    }
  }
}
</script>

<style lang="less" scoped>
.zk-table {
  margin-top: 15px;
}
.block {
  margin-bottom: 20px;
}
</style>
