<template>
  <div>
    <!--搜索框 和 添加按钮-->
    <el-row :gutter="20">
      <el-col :span="8">
        <el-input
          placeholder="搜索作品编号"
          v-model="queryParams.keyword"
          @keyup.enter.native="getRoleInfoss"
          style="height:80px;"
          id="shuru"
        ></el-input>
        <span class="el-icon-search sou-s"></span>
        <el-button @click="getRoleInfoss" id="s-s">搜索</el-button>
      </el-col>
    </el-row>
    <!--内容卡片区-->
    <el-card class="box-card">
      <!-- 数据表格展示区域 -->
      <!--数据列表表格展示区域-->
      <el-table
        :data="roleInfos"
        style="width: 100%"
        border
        :default-sort="{prop: 'date', order: 'descending'}"
      >
        <el-table-column type="index" :index="indexMeth" label="序号" width="60"></el-table-column>
        <el-table-column prop="number" label="姓名"></el-table-column>
        <el-table-column prop="type_name" label="手机号码" width="140"></el-table-column>
        <el-table-column prop="ctime" label="所在省份" width="160"></el-table-column>
        <!-- <el-table-column prop="vote_num == 0?vote:vote_num" label="票数" width="160" sortable>
          <template slot-scope="scope">
            <span>{{scope.row.vote_num}}票</span>
            <i class="el-icon-edit-outline" @click="xiugai(scope.$index,scope.row,scope.row.id)"></i>
          </template>
        </el-table-column> -->
        <el-table-column prop="content" label="驾驶证图片" width="270">
          <template slot-scope="scope">
            <img
              :src="scope.row.content"
              alt
              id="shi-p"
              @click="Tanku(scope.$index,scope.row)">
          </template>
        </el-table-column>
        <el-table-column prop="content1" label="里程数图片" width="270">
          <template slot-scope="scope">
            <img
              :src="scope.row.content"
              alt
              id="shi-p"
              @click="Tanku(scope.$index,scope.row)">
          </template>
        </el-table-column>
        <el-table-column prop="status" label="审核" width="230">
          <template slot-scope="scope">
            <div v-show="scope.row.status==0?true:false">
              <span id="t-g" @click="Tg(scope.$index,scope.row,scope.row.id)">通过</span>
              <span id="j-j" @click="JJ(scope.$index,scope.row,scope.row.id)">拒绝</span>
            </div>
            <div v-show="scope.row.status==1?true:false" id="ton-ju">已通过</div>
            <div v-show="scope.row.status==2?true:false" id="ton-juju">未通过</div>
          </template>
        </el-table-column>
      </el-table>
      <!-- 弹框 -->
      <el-dialog
        title="提示"
        :visible.sync="distributeDialogVisible"
        width="60%"
        center
        @close="guanbi"
      >
      <div id="tan-tu">
            <img :src="this.selectTable.content" alt>
      </div>
      <div id="tan-tu">
            <img :src="this.selectTable.content1" alt >
      </div>
        <div id="xin-x" :model="selectTable">
          <p>作者：{{selectTable.name}}</p>
          <p>作品名称：{{selectTable.id}}</p>
          <p>类别：{{selectTable.type_name}}</p>
        </div>
        <template :model="selectTable">
          <div id="t-j" v-show="selectTable.status==0?true:false">
            <span @click="Tg(indext,nowe,idi)">通过</span>
            <span @click="JJ(indext,nowe,idi)">拒绝</span>
          </div>
          <div v-show="selectTable.status==1?true:false" id="ton-g">已通过</div>
          <div v-show="selectTable.status==2?true:false" id="ton-j">未通过</div>

          <span slot="footer" class="dialog-footer">
            <!-- <el-button class="el-icon-error guan-b" @click="distributeDialogVisible = false"></el-button> -->
            <el-button type="primary" @click="distributeDialogVisible = false" id="qw-d">确 定</el-button>
          </span>
        </template>
      </el-dialog>
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
  created() {
    // 获取角色数据
    this.getRoleInfos()
  },
  methods: {
    // 序号问题
    indexMeth(index) {
      return (
        index + 1 + (this.queryParams.pagenum - 1) * this.queryParams.pagesize
      )
    },
    // 关闭弹框
    guanbi() {
      console.log('678876')
      this.$refs.audio.map(item => {
        item.pause()
      })
    },
    // 作品弹框
    Tanku(index, row, Id) {
      this.selectTable = row
      this.u = this.selectTable.content.length
      console.log(this.u)
      this.distributeDialogVisible = true
      this.nowe = row
      this.indext = index
      this.idi = Id
    },
    // 修改票数
    xiugai(index, row, Id) {
      this.$prompt('输入票数', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(async value => {
          this.selectTable = row
          this.selectTable.vote_num = value
          var reqData = {
            id: Id,
            vote_num: value
          }
          var data = Qs.stringify(reqData)
          const { data: res } = await this.$http.post(
            '/admin/works/voteEdit',
            data,
            {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            }
          )
          console.log(res)
          this.$message({
            type: 'success',
            message: '已修改'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消修改'
          })
        })
    },
    // 通过/拒绝
    async Tg(index, row, Id) {
      console.log(row.status)
      var reqData = {
        id: Id,
        status: 1
      }
      var data = Qs.stringify(reqData)
      const { data: res } = await this.$http.post('/admin/works/edit', data, {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      })
      console.log(res)
      if (res.data.errcode === 1) {
        alert(res.data.errmsg)
      } else {
        var roleinfoss = this.roleInfos
        roleinfoss[index].status = 1
        this.roleInfos = roleinfoss
        this.selectTable = row
      }
    },
    async JJ(index, row, Id) {
      var reqData = {
        id: Id,
        status: 2
      }
      var data = Qs.stringify(reqData)
      const { data: res } = await this.$http.post('/admin/works/edit', data, {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      })
      console.log(res)
      if (res.data.errcode === 1) {
        alert(res.data.errmsg)
      } else {
        var roleinfoss = this.roleInfos
        roleinfoss[index].status = 2
        this.roleInfos = roleinfoss
        this.selectTable = row
      }
    },
    // 视频弹框
    shipT() {},
    // 每页信息条数变化回调函数处理
    handleSizeChange(val) {
      this.queryParams.pagesize = val
      this.getRoleInfos()
    },
    // 当前页码变化回调处理
    handleCurrentChange(val) {
      this.queryParams.pagenum = val
      this.getRoleInfos()
    },
    // 获得 角色列表数据
    async getRoleInfos() {
      var data = Qs.stringify(this.queryParams)
      const { data: res } = await this.$http.post('/admin/works/lists', data, {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      })
      this.roleInfos = res.list
      this.queryParams.total = res.count
      this.roleInfos.map(item => {
        if (item.type !== 'G') {
          item.content = JSON.parse(item.content)
        } else if (item.vote_num === 0) {
          item.vote_num = item.vote
        } else {
          item.vote_num = item.vote_num
        }
      })
    },
    async getRoleInfoss() {
      var queryee = {
        keyword: this.queryParams.keyword, // 用户关键字搜索使用
        pagenum: 1, // 当前页码
        pagesize: this.queryParams.pagesize, // 每页显示条数
        total: 0 // 记录总条数
      }
      var data = Qs.stringify(queryee)
      const { data: res } = await this.$http.post('/admin/works/lists', data, {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      })
      this.roleInfos = res.list
      this.queryParams.total = res.count
      this.roleInfos.map(item => {
        if (item.type !== 'G') {
          item.content = JSON.parse(item.content)
        } else if (item.vote_num === 0) {
          item.vote_num = item.vote
        } else {
          item.vote_num = item.vote_num
        }
      })
    }
  },
  data() {
    return {
      u: [],
      idi: '',
      // 两个变量
      indext: '',
      nowe: '',
      // 接受的对象
      showT: '',
      lihao: {},
      // 每行数据对象
      selectTable: {},
      /** 分配权限相关1 */
      distributeDialogVisible: false, // 对话框展示开关
      // 接收角色列表数据
      roleInfos: [
        {
          number: '22222',
          type_name: '呲啦',
          ctime: '2019-10-19',
          vote_num: 0,
          content: require('../assets/img/heima.png'),
          content1: require('../assets/img/logo.png'),
          status: 0

        },
        {
          number: '22222',
          type_name: '呲啦',
          ctime: '2019-10-19',
          vote_num: 0,
          content: require('../assets/img/heima.png'),
          content1: require('../assets/img/logo.png'),
          status: 0

        },
        {
          number: '22222',
          type_name: '呲啦',
          ctime: '2019-10-19',
          vote_num: 0,
          content: require('../assets/img/heima.png'),
          content1: require('../assets/img/logo.png'),
          status: 1

        },
        {
          number: '22222',
          type_name: '呲啦',
          ctime: '2019-10-19',
          vote_num: 0,
          content: require('../assets/img/heima.png'),
          content1: require('../assets/img/logo.png'),
          status: 1

        },
        {
          number: '22222',
          type_name: '呲啦',
          ctime: '2019-10-19',
          vote_num: 0,
          content: require('../assets/img/heima.png'),
          content1: require('../assets/img/logo.png'),
          status: 0

        }
      ],
      queryParams: {
        keyword: '', // 用户关键字搜索使用
        pagenum: 1, // 当前页码
        pagesize: 3, // 每页显示条数
        total: 0, // 记录总条数
        openid: this.$route.query.restaurant_id
      },
      show3: '',
      tonG: false,
      weiG: false,
      XS: true,
      color: ''
    }
  }
}
</script>

<style lang="less" scoped>
#tan-tu {
  width: 60%;
  margin: 0 auto;
  text-align: center;
  img {
    width: 50%;
  }
}
#ton-ju {
  height: 27px;
  width: 170px;
  line-height: 27px;
  text-align: center;
  background-color: #1e90ff;
  color: #fff;
  border-radius: 10px;
}
#ton-juju {
  height: 27px;
  width: 170px;
  line-height: 27px;
  text-align: center;
  background-color: #000;
  color: #fff;
  border-radius: 10px;
}
.transition-box {
  margin-bottom: 10px;
  width: 200px;
  height: 100px;
  border-radius: 4px;
  background-color: rgb(0, 35, 70);
  text-align: center;
  color: #fff;
  padding: 40px 20px;
  box-sizing: border-box;
  margin-right: 20px;
}
#ton-g {
  color: #fff;
  text-align: center;
  line-height: 50px;
  width: 82%;
  height: 50px;
  background-color: #1e90ff;
  border-radius: 10px;
  margin-left: 9%;
  margin-top: 119px;
}
#ton-j {
  color: #fff;
  text-align: center;
  line-height: 50px;
  margin-top: 167px;
  width: 82%;
  height: 50px;
  background-color: #000;
  border-radius: 10px;
  margin-left: 9%;
}
#t-j {
  color: #fff;
  text-align: center;
  line-height: 50px;
  margin-top: 132px;
  span:first-child {
    display: inline-block;
    width: 35%;
    height: 50px;
    background-color: #1e90ff;
    border-radius: 10px;
  }
  span:last-child {
    display: inline-block;
    width: 35%;
    height: 50px;
    background-color: #000;
    margin-left: 50px;
    border-radius: 10px;
  }
}
#xin-x {
  margin-left: 37%;
  margin-top: 70px;
}
.guan-b {
  font-size: 30px;
  border: 1px solid transparent; //自定义边框
  outline: none;
  position: absolute;
  bottom: 192px;
  left: 42%;
}
#shi-p {
  line-height: 105px;
  text-align: center;
  display: block;
  height: 105px;
  width: 184px;
  border: 1px solid #000;
}
#tan-sp {
  height: 100%;
  width: 100%;
}
#t-g {
  display: block;
  height: 27px;
  width: 80px;
  background-color: #1e90ff;
  font-size: 14px;
  text-align: center;
  line-height: 27px;
  color: #fff;
  position: absolute;
  left: 0;
  top: 45%;
  border-radius: 10px;
}
#j-j {
  border-radius: 10px;
  display: block;
  height: 27px;
  width: 80px;
  background-color: #000;
  font-size: 14px;
  text-align: center;
  line-height: 27px;
  color: #fff;
  position: absolute;
  left: 100px;
  top: 45%;
}
.el-tag {
  margin: 10px 5px;
}
.el-row {
  display: flex;
  align-items: center;
}
#s-s {
  position: absolute;
  top: 0px;
  left: 326px;
  color: #fff;
  background-color: #1e90ff;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.dialog-footer {
  height: 100px !important;
}
</style>
<style>
.dialog-footer {
  height: 100px !important;
  margin-top: 20px;
}
#shuru::-webkit-input-placeholder {
  color: #ccc;
}
#shuru {
  width: 300px;
  padding-left: 30px;
  outline: none !important;
  box-sizing: border-box;
}
.sou-s {
  position: absolute;
  top: 12px;
  left: 21px;
  color: #000;
}
#qw-d {
  /* margin-left: -28px; */
  /* width: 360px;
  text-align: center;
  height: 50px;
  border-radius: 10px;
  */
  margin-left: 0;
}
</style>
