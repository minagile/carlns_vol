<template>
  <!-- 生成报价单 -->
  <div class="QuotationOrder" v-loading="loading">
    <div class="header">
      <!-- <el-select v-model="value4" clearable placeholder="请选择渠道"  @visible-change="select">
        <el-option
          v-for="item in selectAllChannel"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select> -->
      <el-cascader @visible-change="select"
        :options="options2"
        @change="changechan"
        :show-all-levels="false"
        @active-item-change="handleItemChange"
        placeholder="请选择渠道"
        clearable
        :props="props"
      ></el-cascader>
      <el-date-picker
        v-model="value1"
        type="date"
        placeholder="选择日期">
      </el-date-picker>
      <!-- <el-select v-model="value4" clearable placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select> -->
      <!-- <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/">
        <el-button class="up">
          <input type="file" @change="uploadfile($event)">
          上传
        </el-button>
      </el-upload> -->
      <el-button class="up"><input type="file" @change="uploadfile($event)">上传</el-button>
      <!-- <el-button >清空</el-button> -->
      <el-button class="up" @click="downDemo">下载模板</el-button>
    </div>

    <div class="order-table" v-show="listShow">
      <div class="order-table-header">
        <span>订单号：{{ orderList.header.requisitionId }}</span>
        <span>企业名称：{{ orderList.header.channelName }}</span>
        <span>险种：{{ orderList.header.coverageName }}</span>
        <span>车辆数：{{ orderList.header.sumCar }}</span>
        <span>预收款合计：{{ orderList.header.sumMoney }}</span>
      </div>
      <table>
        <tr>
          <th>车牌号</th>
          <!-- <th>{{ orderList.header.coverageName }}</th> -->
          <th>保费总额</th>
          <th>申请金额</th>
          <th>平台费率</th>
          <th>每月还款</th>
          <th>首付款</th>
          <th>服务费</th>
        </tr>
        <tr v-for="(item, index) in orderList.middle" :key="index">
          <td><input type="text" v-model="item.carNumber"></td>
          <!-- <td><input type="text" v-model="item.ead"></td> -->
          <td><input type="text" v-model="item.premium"></td>
          <td><input type="text" v-model="item.appliedAmount"></td>
          <td><input type="text" v-model="item.platformLicensing"></td>
          <td><input type="text" v-model="item.eachPayment"></td>
          <td><input type="text" v-model="item.downPayment"></td>
          <td><input type="text" v-model="item.serviceCharge"></td>
        </tr>
        <tr>
          <td>小计(元):</td>
          <!-- <td>{{ orderList.subtotal.eadSum }}</td> -->
          <td>{{ orderList.subtotal.premiumSum }}</td>
          <td>{{ orderList.subtotal.appliedAmountSum }}</td>
          <td>{{ orderList.subtotal.platformLicensingSum }}</td>
          <td>{{ orderList.subtotal.eachPaymentSum }}</td>
          <td>{{ orderList.subtotal.downPaymentSum }}</td>
          <td>{{ orderList.subtotal.serviceChargeSum }}</td>
        </tr>
        <tr>
          <td colspan="8">合计(元):&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ orderList.sum }}</td>
        </tr>
      </table>
    </div>

    <!-- <div class="btn">
      <el-button class="cancel">取消</el-button>
      <el-button class="submit">确定</el-button>
    </div> -->
  </div>
</template>

<script>
import { Req } from '../../../assets/js/http.js'
export default {
  name: 'QuotationOrder',
  data () {
    return {
      options: [],
      value4: '',
      value1: '',
      listShow: false,
      orderList: {
        header: {},
        middle: [],
        subtotal: {
          appliedAmountSum: '',
          downPaymentSum: '',
          eachPaymentSum: '',
          eadSum: '',
          platformLicensingSum: '',
          premiumSum: '',
          serviceChargeSum: ''
        },
        sum: ''
      },
      selectAllChannel: [],
      channelId: '',
      options2: [],
      props: {
        // value: 'label',
        label: 'label',
        value: 'value',
        children: 'cities'
      },
      loading: false
    }
  },
  mounted () {
  },
  methods: {
    uploadfile (e) {
      this.loading = true
      if (this.channelId === '') {
        this.$message('请选择渠道')
      } else if (this.value1 === '') {
        this.$message('请选择时间')
      } else {
        var file = e.target.files[0]
        if (file.name.split('.').reverse()[0] !== 'xls' && file.name.split('.').reverse()[0] !== 'xlsx') {
          this.$message({
            type: 'info',
            message: '请上传.xls/.xlsx文件'
          })
        } else {
          var formData = new FormData()
          formData.append('file', file)
          formData.append('beginTime', this.value1.getFullYear() + '-' + (this.value1.getMonth() + 1) + '-' + this.value1.getDate())
          formData.append('ChannelId', this.channelId)
          let config = {
            headers: {
              'Content-Type': 'multipart/form-data',
              'token': sessionStorage.getItem('token')
            }
          }
          this.$http.post(Req + '/admin/requisition/excelImport', formData, config).then(res => {
            // console.log(res.data)
            this.loading = false
            if (res.data.code === 0) {
              // this.$message(res.data.msg)
              this.$fetch('/admin/requisition/showQuotationList', {channelId: this.channelId}).then(res => {
                // console.log(res)
                if (res.code === 0) {
                  this.listShow = true
                  this.orderList = res.data
                } else {
                  this.$message(res.msg)
                }
              })
              file = {}
            } else if (res.data.code === 506) {
              this.$router.push('/MLogin')
            } else {
              this.$message(res.data.msg)
            }
          })
        }
      }
    },
    // 下载模板
    downDemo () {
      location.href = `${Req}/admin/requisition/downloadFiles`
    },
    changechan (val) {
      // console.log(val)
      this.channelId = val[val.length - 1]
      // console.log(this.channelId)
      // this.getData()
    },
    handleItemChange (val) {
      // console.log(val)
      setTimeout(_ => {
        var id = ''
        // POST /admin/channel/getNextChannel
        this.options2.forEach((v, k) => {
          if (v.value === val[0]) {
            id = v.value
            this.$post('/admin/channel/getNextChannel', {
              parentId: id
            }).then(res => {
              // console.log(res)
              if (res.code === 0) {
                v.cities = []
                if (res.data.length > 0) {
                  v.cities = [{ label: v.label, value: v.value }]
                  res.data.forEach(m => {
                    v.cities.push({ label: m.channelName, value: m.channelId })
                  })
                } else {
                  v.cities.push({ label: v.label, value: v.value })
                }
              }
            })
          }
        })
      }, 300)
    },
    change () {
      this.getData()
    },
    // 查询所有渠道
    select (val) {
      if (val === true) {
        // this.selectAllChannel = []
        this.options2 = []
        // GET /admin/channel/getOneChannel
        this.$fetch('/admin/channel/getOneChannel').then(res => {
          // console.log(res.data)
          if (res.code === 0) {
            res.data.forEach(v => {
              this.options2.push({value: v.channelId, label: v.channelName, cities: []})
              // this.selectAllChannel.push({value: v.channelId, label: v.channelName})
            })
          } else {
            this.$message(res.msg)
          }
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.QuotationOrder {
  // height: 100%;
  padding-bottom: 20px;
  .header {
    height: 70px;
    padding-top: 37px;
    padding-left: 43px;
    border-bottom: 13px solid #EDEDED;
    .up {
      background:rgba(255,193,7,1);
      border-color:rgba(255,193,7,1);
      margin-left: 40px;
      position: relative;
      input {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        opacity: 0;
        cursor: pointer;
      }
    }
  }
  .order-table {
    margin: 20px 23px 30px;
    .order-table-header {
      display: flex;
      justify-content: space-between;
      padding: 21px 26px;
      font-size: 16px;
      font-weight:bold;
      background:rgba(248,248,248,1);
      height:58px;
      box-sizing: border-box;
      border: 1px solid #E5E5E5;
      border-bottom: 0;
    }
    table {
      border-collapse: collapse;
      // height: calc(100% - 58px);
      // display: block;
      width: 100%;
      // // height: 58px;
      // overflow: scroll;
      input {
        border: none;
        padding: 0 10px;
        width: 11.5%;
      }
      td, th{
        border: 1px solid #E5E5E5;
        text-align: left;
        height: 50px;
        color: #262626;
        font-weight: normal;
        text-indent: 13px;
        input {
          width: 100%;
          display: block;
          padding: 0;
          text-indent: 13px;
          height: 50px;
          line-height: 50px;
        }
      }
    }
  }
  .btn {
    text-align: center;
    padding: 90px 0 64px 0;
    margin-bottom: 34px;
    .cancel {
      color: #282828;
      background: #fff;
      border-color: #282828;
    }
    .submit {
      background: #282828;
      color: #fff;
      margin-left: 166px;
      border-color:#282828;
    }
  }
}
</style>
