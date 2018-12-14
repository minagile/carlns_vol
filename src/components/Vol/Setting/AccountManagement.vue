<template>
  <!-- 帐号管理 -->
  <div class="AccountManagement">
    <el-button class="add" @click="open('添加账号')">+ 添加账号</el-button>

    <!-- table -->
    <table>
      <tr v-for="(item, index) in list" :key="index">
        <td><div class="index">{{ index + 1 }}</div></td>
        <td>用户名：{{ item.adminName }}</td>
        <td>账号：{{ item.adminPhone }}</td>
        <td>密码：{{ item.reversiblePassword }}</td>
        <td><el-button type="text" @click="qudao(item.adminId)">设置渠道</el-button></td>
        <td><el-button type="text" @click="set(item.adminId, item.adminName)">设置权限</el-button></td>
        <td><el-button type="text" @click="open('修改密码', item.adminId)">修改密码</el-button></td>
        <td><el-button type="text" @click="delte(item.adminId)">删除</el-button></td>
      </tr>
    </table>

    <!-- 分页 -->
    <el-pagination
      v-if="total > NumValue"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="NumValue"
      layout="prev, pager, next, total, jumper"
      :total="total">
    </el-pagination>

    <!-- 设置渠道 -->
    <el-dialog :visible.sync="childDialogVisiblequdao" width="700px">
      <div class="dialog-header">设置渠道</div>
      <el-form :model="form">
        <el-form-item label="选择渠道" label-width="150px">
          <el-select v-model="form.channelId"
            @visible-change="getAllCar"
            filterable
            remote
            default-first-option
            clearable
            multiple
            placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="cancel" @click="childDialogVisiblequdao = false">取 消</el-button>
        <el-button class="submit" type="primary" @click="surechangchannel">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 权限设置 -->
    <el-dialog :visible.sync="childDialogVisible" width="1000px">
      <div class="dialog-header">权限设置</div>
      <div class="top">
        <span>账号：{{name}}</span>
        <el-button class="setBtn" size="small"  @click="childDialogVisible = false">返回</el-button>
        <el-button class="setBtn" size="small" @click="sureUpdate">确定</el-button>
      </div>
      <el-table :data="tableData5" style="width: 100%" max-height="500">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-table :data="props.row.object" style="width: 100%" :show-header="false">
              <el-table-column label="名称" prop="name" width=160></el-table-column>
              <el-table-column align="center">
                <template slot-scope="scope">
                  <el-checkbox v-if="scope.row.fp[0]" v-model="scope.row.fp[0][0].status"  @change="boxchecked($event, scope, 6, props.row)"></el-checkbox>
                  <el-checkbox v-if="!scope.row.fp[0]" disabled></el-checkbox>
                </template>
              </el-table-column>
              <el-table-column align="center">
              <template slot-scope="scope">
                <el-checkbox v-if="scope.row.fp[1]" v-model="scope.row.fp[1][0].status"  @change="boxchecked($event, scope, 7, props.row)"></el-checkbox>
                <el-checkbox v-if="!scope.row.fp[1]" disabled></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column align="center">
              <template slot-scope="scope">
                <el-checkbox v-if="scope.row.fp[2]" v-model="scope.row.fp[2][0].status"  @change="boxchecked($event, scope, 8, props.row)"></el-checkbox>
                <el-checkbox v-if="!scope.row.fp[2]" disabled></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column align="center">
              <template slot-scope="scope">
                <el-checkbox v-if="scope.row.fp[3]" v-model="scope.row.fp[3][0].status"  @change="boxchecked($event, scope, 9, props.row)"></el-checkbox>
                <el-checkbox v-if="!scope.row.fp[3]" disabled></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column align="center">
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.all"  @change="boxchecked($event, scope, 10, props.row)"></el-checkbox>
              </template>
            </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column label="名称" prop="name"></el-table-column>
        <el-table-column label="查看" align="center">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.look" @change="boxchecked($event, scope, 0)"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column label="添加" align="center">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.add" @change="boxchecked($event, scope, 1)"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column label="编辑" align="center">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.del" @change="boxchecked($event, scope, 2)"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column label="删除" align="center">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.adit" @change="boxchecked($event, scope, 3)"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column label="全选" align="center">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.all" @change="boxchecked($event, scope, 5)"></el-checkbox>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <!-- 添加账号 -->
    <el-dialog :visible.sync="centerDialogVisible" width="683px">
      <div class="dialog-header">{{title}}</div>
      <el-form :model="form">
        <el-form-item label="账号：" label-width="150px" v-if="title === '添加账号'">
          <el-input
            v-model="form.phone"
            autocomplete="off"
            placeholder="请输入手机号">
            </el-input>
        </el-form-item>
        <el-form-item label="用户名：" label-width="150px" v-if="title === '添加账号'">
          <el-input v-model="form.username" autocomplete="off" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码：" label-width="150px">
          <el-input v-model="form.password" autocomplete="off" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="新密码：" label-width="150px" v-if="title === '修改密码'">
          <el-input v-model="form.newPass" autocomplete="off" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="选择渠道" label-width="150px">
          <el-select v-model="form.channelId"
            @visible-change="getAllCar"
            filterable
            remote
            default-first-option
            clearable
            multiple
            placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
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
      childDialogVisiblequdao: false,
      checked: false,
      tableData5: [],
      list: [],
      childDialogVisible: false,
      centerDialogVisible: false,
      form: {
        phone: '',
        username: '',
        password: '',
        newPass: '',
        channelId: []
      },
      formLabelWidth: '209px',
      NumValue: 10,
      currentPage4: 1,
      total: 0,
      id: '',
      title: '添加账号',
      name: '',
      options: [],
      channelIdchange: ''
    }
  },
  mounted () {
    this.getDataList()
  },
  methods: {
    surechangchannel () {
      var channel = ''
      this.form.channelId.forEach(v => {
        channel += v + ','
      })
      this.$post('/admin/account/insertAdminChannel', {
        adminId: this.channelIdchange,
        channelId: channel
      }).then(res => {
        // console.log(res)
        if (res.code === 0) {
          this.childDialogVisiblequdao = false
          this.getDataList()
        } else {
          this.$message(res.msg)
        }
      })
    },
    qudao (id) {
      this.form.channelId = []
      this.channelIdchange = id
      this.childDialogVisiblequdao = true
    },
    getAllCar (val) {
      if (val === true) {
        this.options = []
        this.$fetch('/admin/channel/getOneChannel').then(res => {
          // console.log(res)
          if (res.code === 0) {
            res.data.forEach(v => {
              this.options.push({value: v.channelId, label: v.channelName})
            })
          } else {
            this.$message(res.msg)
          }
        })
      }
    },
    set (id, name) {
      this.name = name
      this.id = id
      this.$post('/admin/Menu/findByAdminId', {
        adminId: id
      }).then(res => {
        if (res.code === 0) {
          this.childDialogVisible = true
          res.data.forEach((a, pa) => {
            a.look = false
            a.add = false
            a.del = false
            a.adit = false
            a.all = false
          })
          this.tableData5 = res.data
        } else {
          this.$message(res.msg)
        }
      })
    },
    adduser () {
      // console.log(this.form)
      var channel = ''
      this.form.channelId.forEach(v => {
        channel += v + ','
      })
      if (this.title === '添加账号') {
        this.$post('/admin/account/insertAdmin', {
          phone: this.form.phone,
          username: this.form.username,
          password: this.form.password,
          channelId: channel
        }).then(res => {
          // console.log(res)
          if (res.code === 0) {
            this.centerDialogVisible = false
            this.$message(res.msg)
            this.getDataList()
            this.form = {
              phone: '',
              username: '',
              password: '',
              channelId: []
            }
          } else {
            this.$message(res.msg)
          }
        })
      } else {
        this.$post('/admin/account/updateAdminIndex', {
          nextPassword: this.form.newPass,
          password: this.form.password,
          adminId: this.id
        }).then(res => {
          if (res.code === 0) {
            this.$message({
              type: 'success',
              message: '修改成功'
            })
            this.centerDialogVisible = false
          } else if (res.code === 1) {
            this.$message({
              type: 'info',
              message: res.message
            })
          }
        })
      }
    },
    open (msg, id) {
      // console.log(id)
      this.form = {}
      this.id = id
      this.centerDialogVisible = true
      this.title = msg
    },
    // 删除帐户
    delte (id) {
      this.$confirm('是否删除这个账号？', '删除账号', {
        distinguishCancelAndClose: true,
        confirmButtonText: '删除',
        cancelButtonText: '取消'
      }).then(() => {
        this.$post('/admin/account/deleteAdmin', {
          adminId: id
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
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.currentPage4 = val
      this.getDataList()
    },
    getDataList () {
      this.$fetch('/admin/account/findAll', {
        page: this.currentPage4,
        pageSize: this.NumValue
      }).then(res => {
        if (res.code === 0) {
          this.list = res.data.rows
          this.total = res.data.records
        } else {
          this.$message(res.msg)
        }
      })
    },
    boxchecked (event, scope, which, father) {
      if (which === 5) {
        if (event === true) {
          scope.row.look = true
          scope.row.add = true
          scope.row.del = true
          scope.row.adit = true
          scope.row.object.forEach(v => {
            v.fp.forEach(m => {
              if (m) {
                m[0].status = true
              }
            })
            v.all = true
          })
        } else {
          scope.row.look = false
          scope.row.add = false
          scope.row.del = false
          scope.row.adit = false
          scope.row.object.forEach(v => {
            v.fp.forEach(m => {
              if (m) {
                m[0].status = false
              }
            })
            v.all = false
          })
        }
      } else if (which <= 3 && which >= 0) {
        if (event === true) {
          scope.row.object.forEach(v => {
            if (v.fp[which]) {
              v.fp[which][0].status = true
            }
          })
        } else {
          scope.row.all = false
          scope.row.object.forEach(v => {
            v.all = false
            if (v.fp[which]) {
              v.fp[which][0].status = false
            }
          })
        }
      } else if (which <= 9 && which >= 6) {
        if (event === false) {
          scope.row.all = false
          father.all = false
          if (which === 6) {
            father.look = false
          }
          if (which === 7) {
            father.add = false
          }
          if (which === 8) {
            father.del = false
          }
          if (which === 9) {
            father.adit = false
          }
        }
      } else if (which === 10) {
        if (event === false) {
          father.look = false
          father.add = false
          father.del = false
          father.adit = false
          father.all = false
          scope.row.fp.forEach(v => {
            if (v) {
              v[0].status = false
            }
          })
        } else {
          scope.row.fp.forEach(v => {
            if (v) {
              v[0].status = true
            }
          })
        }
      }
    },
    sureUpdate () { // 确定权限
      let arr = []
      this.tableData5.forEach(v => {
        v.object.forEach(m => {
          m.fp.forEach(n => {
            if (n) {
              if (n[0].status === true) {
                arr.push(n[0].id)
              }
            }
          })
        })
      })
      if (arr.length <= 0) {
        this.$message({
          message: '您还没有选择任何权限',
          type: 'error'
        })
      } else {
        this.$post('/admin/Menu/updatePermission', {
          adminId: this.id,
          fundIds: JSON.stringify(arr).split('[')[1].split(']')[0]
        }).then(res => {
          if (res.code === 0) {
            this.childDialogVisible = false
            this.$message({
              message: res.msg,
              type: 'success'
            })
          } else if (res.code === 1) {
            this.$message({
              message: res.msg,
              type: 'error'
            })
          }
        })
      }
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
