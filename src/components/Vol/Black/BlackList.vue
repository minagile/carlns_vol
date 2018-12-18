<template>
  <!-- 黑名单列表 -->
  <div class="BlackList">
    <div class="blackList-input">
      <input type="text" placeholder="请输入公司名称" v-model="search">
      <button @click="searchCompany">查询</button>
    </div>
    <div class="Amortized-sort">
      <span>排序</span>
      <el-select v-model="sort" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <span>显示</span>
      <el-select v-model="pagination.pageSize" placeholder="请选择" @change="handleSizeChange">
        <el-option
          v-for="item in pagination.pageSizes"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
      <span>条</span>
      <button @click="openDialog('新增')">+ 新增</button>
    </div>

    <!-- <div class="Amortized-table"> -->
      <el-table
        :data="tableData"
        border
        v-loading="loading"
        max-height="550"
        style="width: 95%; margin: 0 auto;">
        <el-table-column type="selection" width="55"></el-table-column>
        <!-- <el-table-column prop="date" label="序号"  width="180"></el-table-column> -->
        <el-table-column prop="channelName" label="公司名称"></el-table-column>
        <el-table-column prop="channelAddress" label="联系地址"></el-table-column>
        <el-table-column prop="channelPhone" label="联系方式"></el-table-column>
        <el-table-column prop="channelEmail" label="邮箱"></el-table-column>
        <el-table-column label="添加时间"  min-width="120">
          <template slot-scope="scope">
            {{ scope.row.createTime | timeChange }}
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="加入原因"></el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-button type="text" @click="openDialog('编辑', scope.row.channelId)">编辑</el-button>
            <el-button type="text" @click="deleteBlackList(scope.row.channelId)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    <!-- </div> -->

    <!-- 新增 -->
    <el-dialog :visible.sync="centerDialogVisible" width="770px">
      <div class="dialog-header">{{title}}</div>
      <el-form :model="form">
        <el-form-item label="公司名称：" :label-width="formLabelWidth">
          <el-input v-model="form.channelName" autocomplete="off" placeholder="请输入公司名称"></el-input>
        </el-form-item>
        <el-form-item label="联系地址：" :label-width="formLabelWidth">
          <el-input v-model="form.address" autocomplete="off" placeholder="请输入公司地址"></el-input>
        </el-form-item>
        <el-form-item label="联系方式：" :label-width="formLabelWidth">
          <el-input v-model="form.tel" autocomplete="off" placeholder="请输入联系方式"></el-input>
        </el-form-item>
        <el-form-item label="邮箱：" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="添加原因：" :label-width="formLabelWidth">
          <el-input v-model="form.reason" autocomplete="off" placeholder="请输入原因"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="cancel" @click="cancel">取 消</el-button>
        <el-button class="submit" type="primary" @click="addBlackList">确 定</el-button>
      </div>
    </el-dialog>

    <el-pagination
      v-if="pagination.total > pagination.pageSize"
      @current-change="handleCurrentChange"
      :current-page="pagination.currentPage"
      :page-sizes="pagination.pageSizes"
      :page-size="pagination.pageSize"
      layout="prev, pager, next, total, jumper"
      :total="pagination.total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'BlackList',
  data () {
    return {
      loading: false,
      title: '新增',
      options: [
        {
          label: '序号正序',
          value: 0
        },
        {
          label: '序号反序',
          value: 1
        }
      ],
      sort: 0,
      centerDialogVisible: false,
      form: {
        channelName: '',
        address: '',
        tel: '',
        email: '',
        reason: '',
        channelId: ''
      },
      formLabelWidth: '209px',
      tableData: [],
      search: '',
      pagination: {
        currentPage: 1,
        pageSizes: [10, 20, 30, 40, 50],
        pageSize: 10,
        total: 0
      }
    }
  },
  mounted () {
    this.getBlackList()
  },
  methods: {
    searchCompany () {
      this.$post('/admin/channel/queryBlacklist', {
        channelName: this.search
      }).then(res => {
        if (res.code === 0) {
          // console.log(res)
          this.pagination.total = res.data.records
          this.tableData = res.data.rows
          // console.log(this.tableData)
        }
      })
    },
    openDialog (title, id) { // 打开弹窗
      this.centerDialogVisible = true
      this.title = title
      if (id) {
        this.form.channelId = id
        this.$post('/admin/channel/selectByChannelId', {
          'channelId': id
        }).then(res => {
          if (res.code === 0) {
            this.form.channelName = res.data.channelName
            this.form.address = res.data.channelAddress
            this.form.tel = res.data.channelPhone
            this.form.email = res.data.channelEmail
            this.form.reason = res.data.remark
            this.form.channelId = res.data.channelId
          }
        })
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleSizeChange (val) { // 每页显示
      this.pagination.pageSize = val
      this.getBlackList()
    },
    handleCurrentChange (val) { // 分页
      this.pagination.currentPage = val
      this.getBlackList()
    },
    getBlackList () { // 获取所有黑名单
      this.$post('/admin/channel/queryBlacklist', {
        'page': this.pagination.currentPage,
        'pageNumber': this.pagination.pageSize,
        'sorting': this.sort
      }).then(res => {
        if (res.code === 0) {
          this.pagination.total = res.data.records
          this.tableData = res.data.rows
        }
      })
    },
    addBlackList () { // 新增黑名单
      this.loading = true
      if (this.title === '新增') {
        this.$post('/admin/channel/addBlacklist', {
          'channelName': this.form.channelName,
          'address': this.form.address,
          'tel': this.form.tel,
          'email': this.form.email,
          'reason': this.form.reason
        }).then(res => {
          this.loading = false
          if (res.code === 0) {
            this.centerDialogVisible = false
            this.$message({
              message: res.msg,
              type: 'success'
            })
            this.getBlackList()
            this.cancel()
          } else if (res.code === 1) {
            this.$message({
              message: res.message,
              type: 'error'
            })
          }
        })
      } else { // 编辑黑名单
        this.$post('/admin/channel/editBlacklist', {
          'channelName': this.form.channelName,
          'address': this.form.address,
          'tel': this.form.tel,
          'email': this.form.email,
          'reason': this.form.reason,
          'channelId': this.form.channelId
        }).then(res => {
          this.loading = false
          if (res.code === 0) {
            this.centerDialogVisible = false
            this.$message({
              message: res.msg,
              type: 'success'
            })
            this.getBlackList()
            this.cancel()
          } else if (res.code === 1) {
            this.$message({
              message: res.message,
              type: 'error'
            })
          }
        })
      }
    },
    cancel () { // 取消添加，清除表单数据
      this.centerDialogVisible = false
      this.from = {
        channelName: '',
        address: '',
        tel: '',
        email: '',
        reason: '',
        channelId: ''
      }
    },
    deleteBlackList (id) {
      this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$post('/admin/channel/delBlacklist', {
          'channelId': id
        }).then(res => {
          if (res.code === 0) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getBlackList()
          } else if (res.code === 1) {
            this.$message({
              type: 'error',
              message: res.msg
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  },
  watch: {
    sort (val) { // 点击排序
      this.getBlackList()
    }
  },
  filters: {
    timeChange (data) {
      let date = new Date(data)
      return date.getFullYear() + '-' + zero(date.getMonth() + 1) + '-' + zero(date.getDate())
    }
  }
}
function zero (data) {
  if (data < 10) return '0' + data
  return data
}
</script>

<style lang="less" scoped>
.BlackList {
  .Amortized-sort {
    padding: 25px 3.44% 23px 3.44%;
    .el-select:nth-of-type(1) {
      width: 138px;
      margin-left: 10px;
      margin-right: 40px;
    }
    .el-select:nth-of-type(2) {
      width: 138px;
      margin: 0 10px;
    }
    button {
      width:99px;
      height:40px;
      background:rgba(255,193,7,1);
      border-radius:4px;
      float: right;
    }
  }
  .Amortized-table {
    padding: 0 3.44% 23px 3.44%;
  }
  .el-pagination  {
    margin-top: 50px;
  }
  .blackList-input{
    padding: 23px 3.44% 0 3.44%;
    input {
      width:32.16%;
      height:40px;
      background:rgba(255,255,255,1);
      border:1px solid rgba(217,217,217,1);
      border-radius:4px;
      text-indent: 10px;
    }
    button:nth-of-type(1){
      width:75px;
      height:40px;
      background:rgba(255,193,7,1);
      border-radius:4px;
    }
    button:nth-of-type(2){
      width:75px;
      height:40px;
      background:rgba(255,255,255,1);
      border:1px solid rgba(217,217,217,1);
      border-radius:4px;
    }
  }
}
</style>
