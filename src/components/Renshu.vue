<template>
  <div>
    <!-- 时间 -->
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
      <el-table :data="renInfos" style="width: 100%">
        <el-table-column type="index" label="序号" width="60"></el-table-column>
        <el-table-column prop="date" label="时间"></el-table-column>
        <el-table-column prop="worker" label="创作人数" width="140"></el-table-column>
        <el-table-column prop="visitor" label="探展人数" width="130"></el-table-column>
        <el-table-column prop="all" label="总计人数" width="150"></el-table-column>
      </el-table>
      <!-- 数据分页展示区域-->
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
  created() {
    this.getRenInfos()
  },
  methods: {
    // 时间选择
    DataQi() {
      this.getRenInfos()
    },
    // 每页信息条数变化回调函数处理
    handleSizeChange(val) {
      this.queryParams.pagesize = val
      this.getRenInfos()
    },
    // 当前页码变化回调处理
    handleCurrentChange(val) {
      this.queryParams.pagenum = val
      this.getRenInfos()
    },
    // --------------------
    // 获取数据
    async getRenInfos() {
      this.start = this.value1[0]
      this.end = this.value1[1]
      console.log(this.start, this.end)
      var reqData = {
        start: this.start,
        end: this.end,
        pagenum: 1, // 当前页码
        pagesize: this.queryParams.pagesize, // 每页显示条数
        total: 0 // 记录总条数
      }
      var data = Qs.stringify(reqData)
      const { data: res } = await this.$http.post('/admin/data/personData', data, {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'})
      this.renInfos = res
      this.queryParams.total = res.count
    }
  },
  data() {
    return {
      value1: '',
      start: '',
      end: '',
      renInfos: [],
      // ---- 分页
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
.el-row {
  margin-top: 15px;
}
.zk-table {
  margin-top: 15px;
}
.block {
  margin-bottom: 20px;
}
</style>
