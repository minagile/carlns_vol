<template>
  <!-- 帐号管理 -->
  <div class="AccountManagement">
    <el-button class="add" @click="centerDialogVisible = true">+ 添加账号</el-button>

    <!-- table -->
    <table>
      <tr v-for="(item, index) in list" :key="index">
        <td><div class="index">{{ index + 1 }}</div></td>
        <td>账号：{{ item.adminName }}</td>
        <td><el-button type="text" @click="set(item.adminId)">设置权限</el-button></td>
        <td><el-button type="text" @click="delte(item.adminId)">删除</el-button></td>
      </tr>
    </table>

    <!-- 分页 -->
    <el-pagination v-if="total > NumValue"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="NumValue"
      layout="prev, pager, next, total, jumper"
      :total="total">
    </el-pagination>

    <!-- 权限设置 -->
    <el-dialog :visible.sync="childDialogVisible" width="1000px">
      <div class="dialog-header">权限设置</div>
      <div class="top">
        <span>账号：123</span>
        <el-button class="setBtn" size="small"  @click="childDialogVisible = false">返回</el-button>
        <el-button class="setBtn" size="small">确定</el-button>
      </div>
      <el-table :data="tableData5" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-table :data="tableData5" style="width: 100%" :show-header="false">
              <el-table-column>
                <template slot-scope="scope">
                  全部渠道
                </template>
              </el-table-column>
              <el-table-column label="查看">
                <template slot-scope="scope">
                  <el-checkbox v-model="checked"></el-checkbox>
                </template>
              </el-table-column>
              <el-table-column label="添加">
                <template slot-scope="scope">
                  <el-checkbox v-model="checked"></el-checkbox>
                </template>
              </el-table-column>
              <el-table-column label="编辑">
                <template slot-scope="scope">
                  <el-checkbox v-model="checked"></el-checkbox>
                </template>
              </el-table-column>
              <el-table-column label="删除">
                <template slot-scope="scope">
                  <el-checkbox v-model="checked"></el-checkbox>
                </template>
              </el-table-column>
              <el-table-column label="全选">
                <template slot-scope="scope">
                  <el-checkbox v-model="checked"></el-checkbox>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column label="查看">
          <template slot-scope="scope">
            <el-checkbox v-model="checked"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column label="添加">
          <template slot-scope="scope">
            <el-checkbox v-model="checked"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column label="编辑">
          <template slot-scope="scope">
            <el-checkbox v-model="checked"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column label="删除">
          <template slot-scope="scope">
            <el-checkbox v-model="checked"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column label="全选">
          <template slot-scope="scope">
            <el-checkbox v-model="checked"></el-checkbox>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <!-- 添加账号 -->
    <el-dialog :visible.sync="centerDialogVisible" width="683px">
      <div class="dialog-header">添加账号</div>
      <el-form :model="form">
        <el-form-item label="手机号：" label-width="150px">
          <el-input v-model="form.phone" autocomplete="off" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="账号：" label-width="150px">
          <el-input v-model="form.username" autocomplete="off" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码：" label-width="150px">
          <el-input v-model="form.password" autocomplete="off" placeholder="请输入密码"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="cancel" @click="centerDialogVisible = false">取 消</el-button>
        <el-button class="submit" type="primary" @click="adduser">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: 'AccountManagement',
  data () {
    return {
      checked: false,
      tableData5: [],
      list: [],
      childDialogVisible: false,
      centerDialogVisible: false,
      form: {
        phone: '',
        username: '',
        password: ''
      },
      formLabelWidth: '209px',
      NumValue: 10,
      currentPage4: 1,
      total: 0
    }
  },
  mounted () {
    this.getDataList()
  },
  methods: {
    set (id) {
      this.$post('/Menu/findByAdminId', {
        adminId: id
      }).then(res => {
        if (res.code === 0) {
          console.log(res)
          this.childDialogVisible = true
          this.tableData5 = res.data
        } else {
          this.$message(res.msg)
        }
      })
    },
    adduser () {
      this.$post('/admin/account/insertAdmin', {
        phone: this.form.phone,
        username: this.form.username,
        password: this.form.password
      }).then(res => {
        // console.log(res)
        if (res.code === 0) {
          this.centerDialogVisible = false
          this.$message(res.msg)
          this.getDataList()
          this.form = {
            phone: '',
            username: '',
            password: ''
          }
        } else {
          this.$message(res.msg)
        }
      })
    },
    // 删除帐户
    delte (id) {
      this.$confirm('是否删除这个账号？', '删除账号', {
        distinguishCancelAndClose: true,
        confirmButtonText: '删除',
        cancelButtonText: '取消'
      }).then(() => {
        this.$post('/admin/account/deleteAdmin', {
          id: id
        }).then(res => {
          // console.log(res)
          if (res.code === 0) {
            this.$message({
              type: 'success',
              message: '已删除成功'
            })
            this.getDataList()
          } else {
            this.$message({
              type: 'info',
              message: res.message
            })
          }
        })
      }).catch(action => {
        this.$message({
          type: 'info',
          message: '取消删除'
        })
      })
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    getDataList () {
      this.$fetch('/admin/account/findAll', {
        page: this.currentPage4,
        pageSize: this.NumValue
      }).then(res => {
        console.log(res)
        if (res.code === 0) {
          this.list = res.data.rows
          this.total = res.data.records
        } else {
          this.$message(res.msg)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.AccountManagement {
  .add {
    background:rgba(255,193,7,1);
    border-color:rgba(255,193,7,1);
    margin: 27px 0 0 31px;
    &:hover {
      color: #282828;
    }
  }
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 17px;
    // text-align: center;
    tr {
      border-bottom: 4px solid #f2f2f2;
      height: 70px;
      line-height: 70px;
      color: #000000;
      // font-weight: bold;
      td:first-of-type {
        width: 84px;
      }
      td .index {
        width: 26px;
        height: 26px;
        line-height: 26px;
        border-radius: 50%;
        text-align: center;
        background: #282828;
        font-weight: normal;
        color: #fff;
        margin: 0 19px 0 31px;
      }
    }
  }
  .el-dialog {
    .top {
      overflow: hidden;
      line-height: 32px;
      padding: 0 20px;
      .setBtn {
        background: #282828;
        color: #fff;
        border-color: #282828;
        float: right;
        margin-left: 30px;
      }
    }
  }
}
</style>
