<template>
  <!-- 黑名单列表 -->
  <div class="BlackList">
    <div class="blackList-input">
      <input type="text" placeholder="请输入公司名称">
      <button>查询</button>
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

    <div class="Amortized-table">
      <el-table
        :data="tableData"
        border
        height="550"
        style="width: 100%;">
        <el-table-column type="selection" width="55"></el-table-column>
        <!-- <el-table-column prop="date" label="序号"  width="180"></el-table-column> -->
        <el-table-column prop="channelName" label="公司名称" width="180"></el-table-column>
        <el-table-column prop="address" label="联系地址"></el-table-column>
        <el-table-column prop="channelPhone" label="联系方式"></el-table-column>
        <el-table-column prop="channelEmail" label="邮箱"></el-table-column>
        <el-table-column prop="createTime" label="添加时间"></el-table-column>
        <el-table-column prop="remark" label="加入原因"></el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-button type="text" @click="openDialog('编辑', scope.row.id)">编辑</el-button>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

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
          <el-input v-model="form.email" autocomplete="off" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="添加原因：" :label-width="formLabelWidth">
          <el-input v-model="form.reason" autocomplete="off" placeholder="请输入密码"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="cancel" @click="cancel">取 消</el-button>
        <el-button class="submit" type="primary" @click="addBlackList">确 定</el-button>
      </div>
    </el-dialog>

    <el-pagination
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
      pagination: {
        currentPage: 1,
        pageSizes: [10, 20, 30, 40, 50],
        pageSize: 10,
        total: 0
      },
      channelName: '1'
    }
  },
  mounted () {
    this.getBlackList()
  },
  methods: {
    openDialog (title, id) {
      this.centerDialogVisible = true
      this.title = title
      this.form.channelId = id
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleSizeChange (val) {
      this.pagination.pageSize = val
      this.getBlackList()
    },
    handleCurrentChange (val) {
      this.pagination.currentPage = val
      this.getBlackList()
    },
    getBlackList () {
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
    addBlackList () {
      if (this.title === '新增') {
        this.$post('/admin/channel/addBlacklist', {
          'channelName': this.form.channelName,
          'address': this.form.address,
          'tel': this.form.tel,
          'email': this.form.email,
          'reason': this.form.reason
        }).then(res => {
          if (res.code === 0) {
            this.centerDialogVisible = false
            this.$message({
              message: res.msg,
              type: 'success'
            })
            this.getBlackList()
            this.cancel()
          } else {
            this.$message({
              message: res.message,
              type: 'error'
            })
          }
        })
      } else {
        this.$post('/admin/channel/editBlacklist', {
          'channelName': this.form.channelName,
          'address': this.form.address,
          'tel': this.form.tel,
          'email': this.form.email,
          'reason': this.form.reason,
          'channelId': this.form.channelId
        }).then(res => {
          if (res.code === 0) {
            this.centerDialogVisible = false
            this.$message({
              message: res.msg,
              type: 'success'
            })
            this.getBlackList()
            this.cancel()
          } else {
            this.$message({
              message: res.message,
              type: 'error'
            })
          }
        })
      }
    },
    cancel () {
      this.centerDialogVisible = false
      this.from = {
        channelName: '',
        address: '',
        tel: '',
        email: '',
        reason: '',
        channelId: ''
      }
    }
  },
  watch: {
    sort (val) {
      this.getBlackList()
    }
  }
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
