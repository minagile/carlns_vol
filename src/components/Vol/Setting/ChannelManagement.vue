<template>
  <!-- 渠道管理 -->
  <div class="ChannelManagement">
    <el-button class="add" @click="centerDialogVisible = true, addtext === '新增渠道'">+ 新增渠道</el-button>

    <!-- table -->
    <div class="table">
      <table>
        <tr v-for="(item, index) in list" :key="index" class="tabletr">
          <td><div class="index">{{ index + 1 }}</div></td>
          <td><span>公司名称：{{ item.channelName }}</span></td>
          <td><span>地址：{{ item.channelAddress }}</span></td>
          <td>负责人：{{ item.channelPrincipal }}</td>
          <td>联系方式：{{ item.channelPhone }}</td>
          <td><span>密码：{{ item.plaintextPwd }}</span></td>
          <td><el-button type="text" @click="addchild(index, item.channelId, item)">添加子公司</el-button></td>
          <td><el-button type="text" @click="delchannel(item.channelId)">编辑</el-button></td>
          <td><el-button type="text" @click="remove(item.channelId)">删除</el-button></td>
          <td>
            <!-- <div class="zhankai" @click="expand(item, index, item.channelId)" v-show="!item.expand" >展开 <span></span></div> -->
            <!-- <div class="shouqi" @click="expand(item, index, item.channelId)" v-show="item.expand" >收起 <span></span></div> -->
            <div class="zhankai" @click="expand(item, index, item.channelId, $event)" >展开 <span></span></div>
          </td>
        </tr>
      </table>
    </div>

    <!-- 分页 -->
    <el-pagination v-if="total > NumValue"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="pageTAb"
      :page-size="NumValue"
      layout="prev, pager, next, total, sizes, jumper"
      :total="total">
    </el-pagination>

    <!-- 添加子公司 -->
    <el-dialog :visible.sync="childDialogVisible" width="770px">
      <div class="dialog-header">{{ addtext }}</div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <el-form-item label="公司名称：" prop="channelName" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.channelName" placeholder="请输入公司名称"></el-input>
        </el-form-item>
        <el-form-item label="地址：" prop="address" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.address" placeholder="请输入公司地址"></el-input>
        </el-form-item>
        <el-form-item label="负责人：" prop="principal" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.principal" placeholder="请输入负责人"></el-input>
        </el-form-item>
        <el-form-item label="联系方式：" prop="phone" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.phone" placeholder="请输入联系方式"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="cancel" @click="childDialogVisible = false">取 消</el-button>
        <el-button class="submit" type="primary" @click="addNewChannel('id')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 新增渠道弹窗 -->
    <el-dialog :visible.sync="centerDialogVisible" width="770px">
      <div class="dialog-header">{{ addtext }}</div>
      <el-form :model="ruleForm"  :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <el-form-item label="公司名称：" prop="channelName" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.channelName" placeholder="请输入公司名称"></el-input>
        </el-form-item>
        <el-form-item label="地址：" prop="address" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.address" placeholder="请输入公司地址"></el-input>
        </el-form-item>
        <el-form-item label="负责人：" prop="principal" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.principal" placeholder="请输入负责人"></el-input>
        </el-form-item>
        <el-form-item label="联系方式：" prop="phone" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.phone" placeholder="请输入联系方式"></el-input>
        </el-form-item>
        <el-form-item label="密码：" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.pwd" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="cancel" @click="centerDialogVisible = false">取 消</el-button>
        <el-button class="submit" type="primary" @click="addNewChannel">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'ChannelManagement',
  data () {
    return {
      text: '展开',
      currentPage4: 1,
      NumValue: 9,
      total: 0,
      pageTAb: ['9', '5', '15'],
      list: [],
      childlist: [],
      childDialogVisible: false,
      centerDialogVisible: false,
      ruleForm: {
        channelName: '',
        address: '',
        principal: '',
        phone: '',
        pwd: ''
      },
      rules: {
        channelName: [
          { required: true, message: '请输入公司名称', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入地址', trigger: 'blur' }
        ],
        principal: [
          { required: true, message: '请输入负责人姓名', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入联系方式', trigger: 'blur' },
          { pattern: /^[1][0-9][0-9]{9}$/, message: '请输入正确的联系方式', trigger: 'blur' }
        ]
      },
      formLabelWidth: '209px',
      id: '0',
      addtext: '新增渠道',
      childadit: false,
      channelId: '',
      clickData: [],
      whichOneExpand: []
    }
  },
  mounted () {
    this.getDataList()
  },
  methods: {
    remove (id) {
      this.$confirm('是否删除这个渠道？', '删除渠道', {
        distinguishCancelAndClose: true,
        confirmButtonText: '删除',
        cancelButtonText: '取消'
      }).then(() => {
        this.$post('/admin/channel/delChannel', {
          channelId: id
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
              message: res.msg
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
      this.NumValue = val
      this.getDataList()
    },
    handleCurrentChange (val) {
      this.currentPage4 = val
      this.getDataList()
    },
    // 编辑渠道
    delchannel (id) {
      if (this.childadit === true) {
        this.childDialogVisible = true
        this.addtext = '编辑子公司'
      } else {
        this.centerDialogVisible = true
        this.addtext = '编辑渠道'
      }
      this.channelId = id
      this.$post('/admin/channel/selectByChannelId', {channelId: id}).then(res => {
        // console.log(res)
        if (res.code === 0) {
          this.ruleForm = {
            channelName: res.data.channelName,
            address: res.data.channelAddress,
            principal: res.data.channelPrincipal,
            phone: res.data.channelPhone,
            pwd: res.data.plaintextPwd
          }
        } else {
          this.$message(res.msg)
        }
      })
    },
    // 添加子公司
    addchild (i, id, item) {
      this.childDialogVisible = true
      this.id = id
      this.addtext = '添加子公司'
      this.whichOneExpand = [i, item]
      // console.log(this.whichOneExpand)
    },
    addNewChannel (data) {
      if (this.ruleForm.channelName === '') {
        this.$message('公司名称不为空')
      } else if (this.ruleForm.address === '') {
        this.$message('地址不为空')
      } else if (this.ruleForm.principal === '') {
        this.$message('负责人不为空')
      } else if (this.ruleForm.phone === '') {
        this.$message('联系方式不为空')
      } else {
        var myreg = /^[1][0-9][0-9]{9}$/
        if (!myreg.test(this.ruleForm.phone)) {
          this.$message({
            type: 'error',
            message: '手机号输入不正确'
          })
        } else {
          if (this.addtext === '编辑渠道' || this.addtext === '编辑子公司') {
            if (this.addtext === '编辑渠道') {
              this.id = '0'
            }
            this.$post('/admin/channel/updateChannel', {
              channelId: this.channelId,
              channelName: this.ruleForm.channelName,
              address: this.ruleForm.address,
              principal: this.ruleForm.principal,
              phone: this.ruleForm.phone,
              pwd: this.ruleForm.pwd,
              parentId: this.id
            }).then(res => {
              if (res.code === 0) {
                this.$message.success(res.msg)
                if (this.childadit === true) {
                  // console.log(res.data)
                  this.childDialogVisible = false
                  // console.log(this.clickData[1])
                  $('.childrenTr' + this.clickData[1]).remove()
                  this.childListData(this.clickData[0], this.clickData[1], this.clickData[2])
                } else {
                  this.getDataList()
                  this.centerDialogVisible = false
                }
                this.ruleForm = {
                  channelName: '',
                  address: '',
                  principal: '',
                  phone: '',
                  pwd: ''
                }
              } else {
                this.$message.error(res.msg)
              }
            })
          } else {
            if (data !== 'id') {
              this.id = '0'
            }
            this.$post('/admin/channel/addChannel', {
              channelName: this.ruleForm.channelName,
              address: this.ruleForm.address,
              principal: this.ruleForm.principal,
              phone: this.ruleForm.phone,
              pwd: this.ruleForm.pwd,
              parentId: this.id
            }).then(res => {
              if (res.code === 0) {
                this.$message.success(res.msg)
                if (data !== 'id') {
                  this.centerDialogVisible = false
                  this.getDataList()
                } else {
                  this.childDialogVisible = false
                  if (this.whichOneExpand[1].expand === true) {
                    $('.childrenTr' + this.whichOneExpand[0]).remove()
                    this.childListData(this.whichOneExpand[1], this.whichOneExpand[0], this.whichOneExpand[1].channelId)
                  }
                }
                this.ruleForm = {
                  channelName: '',
                  address: '',
                  principal: '',
                  phone: '',
                  pwd: ''
                }
              } else {
                this.$message.error(res.msg)
              }
            })
          }
        }
      }
    },
    // 获取父级列表
    getDataList () {
      this.$fetch('/admin/channel/getMaxChannel', {
        page: this.currentPage4,
        pageSize: this.NumValue
      }).then(res => {
        // console.log(res.data)
        if (res.code === 0) {
          this.list = res.data.rows
          this.total = res.data.records
          if (res.data.rows.length > 0) {
            this.list.forEach(v => {
              v.expand = false
            })
          }
        } else {
          this.$message(res.msg)
        }
      })
    },
    // 展开收起
    expand (item, index, id, e) {
      // console.log(item.expand)
      if (item.expand === false) {
        item.expand = true
        e.target.className = 'shouqi'
        this.childListData(item, index, id)
      } else {
        item.expand = false
        e.target.className = 'zhankai'
        $('.childrenTr' + index).remove()
      }
    },
    childListData (item, index, id) {
      var that = this
      var tr = $('.tabletr')
      var element = ''
      this.$post('/admin/channel/getNextChannel', {
        parentId: id
      }).then(res => {
        // console.log(res.data)
        if (res.code === 0) {
          if (res.data.length > 0) {
            item.expand = true
            tr[index].classList.add('tractive' + index)
            res.data.forEach((v, k) => {
              element += `<tr class="sonList childrenTr${index}" style="height: 50px;border-bottom:2px solid #f2f2f2;color:#666;">
                <td></td>
                <td>公司名称：${v.channelName}</td>
                <td colspan="2" style="text-align:center;">负责人：${v.channelPrincipal}</td>
                <td style="text-align:center;">地址：${v.channelAddress}</td>
                <td colspan="2" >联系方式：${v.channelPhone}</td>
                <td><button class="aidt" style="background: #fff;color:#4977FC;">编辑</button></td>
                <td><button class="del" style="background: #fff;color:#4977FC;">删除</button></td>
                <td></td>
              </tr>`
            })
            $('.tractive' + index).after(element)
            $('.del').click(function () {
              var i = $('.del').index($(this))
              that.delt(item, index, id, res.data[i].channelId)
            })
            $('.aidt').click(function () {
              var i = $('.aidt').index($(this))
              // console.log(i)
              that.childadit = true
              that.clickData = [item, index, id]
              // console.log(that.clickData)
              that.id = res.data[i].parentId
              that.delchannel(res.data[i].channelId)
            })
          } else {
            this.$message('暂无数据')
          }
        } else {
          this.$message(res.msg)
        }
      })
    },
    // 删除子公司
    delt (item, index, id, cid) {
      // console.log(item, index, id)
      this.$confirm('是否删除这个子公司？', '删除子公司', {
        distinguishCancelAndClose: true,
        confirmButtonText: '删除',
        cancelButtonText: '取消'
      }).then(() => {
        this.$post('/admin/channel/delChannel', {
          channelId: cid
        }).then(res => {
          // console.log(res)
          if (res.code === 0) {
            this.$message({
              type: 'success',
              message: '已删除成功'
            })
            $('.childrenTr' + index).remove()
            this.childListData(item, index, id)
          } else {
            this.$message({
              type: 'info',
              message: res.msg
            })
          }
        })
      }).catch(action => {
        this.$message({
          type: 'info',
          message: '取消删除'
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.ChannelManagement {
  .add {
    background:rgba(255,193,7,1);
    border-color:rgba(255,193,7,1);
    margin: 27px 0 0 31px;
    &:hover {
      color: #282828;
    }
  }
  .table {
    max-height: 720px;
    // display: flex;
    overflow: hidden;
    overflow: scroll;
    margin-bottom: 100px;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    // font-size: 17px;
    // text-align: center;
    tr {
      width: 100%;
      border-bottom: 4px solid #f2f2f2;
      height: 70px;
      line-height: 70px;
      color: #000000;
      td:first-of-type {
        width: 84px;
      }
      td span {
        display: block;
        max-width: 250px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .shouqi {
        cursor: pointer;
        font-size: 14px;
        color: #FFC107;
        span {
          display: inline-block;
          border-top: 11px solid #FFC107;
          border-left: 8px solid #FFC10700;
          border-right: 8px solid #FFC10700;
          border-radius: 4px;
        }
      }
      .zhankai {
        cursor: pointer;
        font-size: 14px;
        span {
          display: inline-block;
          border-top: 8px solid #FFC10700;
          border-bottom: 8px solid #FFC10700;
          border-left: 11px solid #000000;
          border-right: 11px solid #00000000;
          border-radius: 4px;
        }
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
}
</style>
