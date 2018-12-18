 <template>
  <!-- 制作付款计划表 -->
  <div class="MakePayment" v-loading="fullscreenLoading">
    <div class="header">
      <div class="select">
        <el-cascader @visible-change="select"
          :options="options2"
          @change="changechan"
          :show-all-levels="false"
          @active-item-change="handleItemChange"
          clearable
          :props="props"
        ></el-cascader>
        <el-select v-model="batch"
          clearable
          filterable
          remote
          default-first-option
          placeholder="请选择订单号" @visible-change="selectBatch">
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="nextHeader" style="border: none">
      <div class="upfilekuang">
        <div class="upfile">
          <img src="../../../assets/vimg/upload.png" alt="">
          <p>{{name}}</p>
          <input type="file" @change="upfile($event, 1)">
        </div>
        <div class="upfile">
          <img src="../../../assets/vimg/upload.png" alt="">
          <p>{{name1}}</p>
          <input type="file"  @change="upfile($event, 2)">
        </div>
        <div class="upfile">
          <img src="../../../assets/vimg/upload.png" alt="">
          <p>{{name2}}</p>
          <input type="file"  @change="upfile($event, 3)">
        </div>
        <el-button class="up" @click="uploadfile">上传</el-button>
      </div>

      <!-- <div class="addNumber">
        <input type="text" v-model="addbaodanhao">
        <button @click="addbaodan">添加保单号</button>
      </div> -->

      <div class="creatTable">
        <el-date-picker
          v-model="value1"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
        <button class="round" @click="createPlan">生成付款计划表</button>
      </div>
    </div>
    <div class="inventory" v-show="showList">
      <p>致：上海锦锭科技有限公司</p>
      <p>根据我司 {{head.name}} 与贵司于 {{head.rdate}}签订的《商户合作协议书》，我司 {{head.qdate}}投保 {{head.coverage}} 的车辆业务清单如下：</p>
      <div class="order-table-header">
        <span>订单号：{{head.batch}}</span>
        <span>企业名称：{{head.name}}</span>
        <span>险种：{{head.coverage}}</span>
        <span>车辆数：{{head.carNumber}}</span>
        <!-- <span>投保时间{{head.qdate}}</span> -->
      </div>
      <table>
        <tr>
          <th>车牌号</th>
          <th>车架号</th>
          <th>保险公司</th>
          <th>车险保单号</th>
        </tr>
        <tr v-for="(item, index) in middle" :key="index">
          <th>{{item.plateNumber}}</th>
          <th>{{item.vin}}</th>
          <th>{{item.iCBC}}</th>
          <th>{{item.policyNumber}}</th>
        </tr>
      </table>
    </div>

    <div class="inventory schadule" v-show="showList && orderList.length > 0">
      <h4>付款计划表</h4>
      <table>
        <tr>
          <th>期数</th>
          <th>付款日期</th>
          <th>还款金额</th>
        </tr>
        <tr v-for="(i, index) in orderList" :key="index">
          <td>{{i.periods}}</td>
          <td>{{i.date}}</td>
          <td>{{i.money}}</td>
        </tr>
        <tr>
          <td colspan="3">
            <p>合计：{{sum}}</p>
            <p>（注：付款日期遇如遇法定节假日，需提前至工作日完成支付）</p>
          </td>
        </tr>
      </table>
      <p>本业务清单及付款计划表属于《商户合作协议书》不可分割的部分，作为附件与 《商户合作协议书》主文具备同等法律效力。我司对业务清单所列之被保险车辆信息的真实性负责，并承诺按照付款计划表所列进度进行付款</p>
      <p class="t">{{head.name}}</p>
      <p class="t">{{head.qdate}}</p>
    </div>
    <div class="inventory schadule" v-show="showList && orderList1.length > 0">
      <h4>付款计划表</h4>
      <table>
        <tr>
          <th>期数</th>
          <th>付款日期</th>
          <th>还款金额</th>
        </tr>
        <tr v-for="(i, index) in orderList1" :key="index">
          <td>{{i.periods}}</td>
          <td>{{i.date}}</td>
          <td>{{i.money}}</td>
        </tr>
        <tr>
          <td colspan="3">
            <p>合计：{{sum1}}</p>
            <p>（注：付款日期遇如遇法定节假日，需提前至工作日完成支付）</p>
          </td>
        </tr>
      </table>
      <p>本业务清单及付款计划表属于《商户合作协议书》不可分割的部分，作为附件与 《商户合作协议书》主文具备同等法律效力。我司对业务清单所列之被保险车辆信息的真实性负责，并承诺按照付款计划表所列进度进行付款</p>
      <p class="t">{{head.name}}</p>
      <p class="t">{{head.qdate}}</p>
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
  name: 'MakePayment',
  data () {
    return {
      fullscreenLoading: false,
      addbaodanhao: '',
      showList: false,
      selectAllChannel: [],
      options1: [],
      batch: null,
      orderList: [],
      orderList1: [],
      head: {
        name: '',
        rdate: '',
        qdate: '',
        coverage: '',
        batch: '',
        carNumber: ''
      },
      middle: [],
      file1: {},
      file2: {},
      file3: {},
      sum: 0,
      sum1: 0,
      // 二级级联
      channelId: '',
      options2: [],
      props: {
        // value: 'label',
        label: 'label',
        value: 'value',
        children: 'cities'
      },
      name: '上传保单',
      name1: '上传付款计划表',
      name2: '上传发票扫描件',
      value1: ''
    }
  },
  mounted () {
  },
  methods: {
    addbaodan () {
      // GET /admin/stager/addPolicyNumber
      // this.$fetch('/admin/stager/addPolicyNumber', {
      //   channelId: this.channelId,
      //   requisitionId: this.batch,
      //   policyNumber: this.addbaodanhao
      // }).then(res => {
      //   if (res.code === 0) {
      //     this.$message(res.msg)
      //   } else {
      //     this.$message(res.msg)
      //   }
      // })
    },
    selectBatch (val) {
      if (val === true) {
        this.options1 = []
        this.$fetch('/admin/requisition/getBatchByChannelId', {channelId: this.channelId}).then(res => {
          // console.log(res)
          if (res.code === 0) {
            if (res.data.length > 0) {
              res.data.forEach(v => {
                this.options1.push({value: v.requisitionId, label: v.requisitionId})
              })
            } else {
              this.options1 = [{
                value: '',
                label: '暂无数据'
              }]
            }
          } else {
            this.$message(res.msg)
          }
        })
      }
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
    },
    upfile (e, i) {
      var file = e.target.files[0]
      // console.log(file)
      if (i === 1) {
        this.file1 = file
        this.name = e.target.files[0].name
      }
      if (i === 2) {
        this.file2 = file
        this.name1 = e.target.files[0].name
      }
      if (i === 3) {
        this.file3 = file
        this.name2 = e.target.files[0].name
      }
    },
    uploadfile () {
      if (this.file1 === '') {
        this.$message('请先上传保单文件')
      } else if (this.file2 === '') {
        this.$message('请先上传付款计划表')
      } else if (this.file3 === '') {
        this.$message('请先上传发票')
      } else {
        this.fullscreenLoading = true
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data',
            'token': sessionStorage.getItem('token')
          }
        }
        var formData = new FormData()
        formData.append('policyFile', this.file1)
        formData.append('scheduleFile', this.file2)
        formData.append('invoiceFile', this.file3)
        formData.append('channelId', this.channelId)
        formData.append('requisitionId', this.batch)
        this.$http.post(Req + '/admin/requisition/uploadFiles', formData, config).then(res => {
          // console.log(res)
          this.fullscreenLoading = false
          if (res.code === 0) {
            this.$message.success(res.data.msg)
          } else {
            this.$message(res.data.msg)
          }
        })
      }
    },
    createPlan () { // 生成付款计划表
      this.orderList = []
      this.orderList1 = []
      this.fullscreenLoading = true
      var date = ''
      if (this.value1 !== '') {
        date = this.value1.getFullYear() + '-' + (this.value1.getMonth() + 1) + '-' + this.value1.getDate()
      }
      this.$fetch('/admin/stager/insertStager', {
        channelId: this.channelId,
        requisitionId: this.batch,
        date: date
      }).then(res => {
        this.fullscreenLoading = false
        if (res.code === 0) {
          this.showList = true
          this.$message({
            type: 'success',
            message: res.msg
          })
          this.head = res.data.head
          this.middle = res.data.middle
          if (res.data.trailVo1) {
            this.orderList = res.data.trailVo1
            const length = this.orderList.length - 1
            this.sum = this.orderList[length].sum
          }
          if (res.data.trailVo2) {
            this.orderList1 = res.data.trailVo2
            const length1 = this.orderList1.length - 1
            this.sum1 = this.orderList1[length1].sum
          }
        } else if (res.code === 1) {
          this.$message({
            type: 'error',
            message: res.msg
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.MakePayment {
  .header {
    min-height: 107px;
    overflow: hidden;
    // padding-top: 37px;
    padding-left: 43px;
    border-bottom: 13px solid #EDEDED;
    .select {
      // float: left;
      // width: 220px;
      padding-top: 14px;
      margin-right: 29px;
      .el-select {
        margin-left: 30px;
        margin-top: 20px;
      }
    }
  }
  .inventory {
    // margin: 20px 23px 0;
    padding: 15px 191px 32px;
    border-bottom: 13px solid #f2f2f2;
    p {
      font-size: 15px;
      line-height: 30px;
    }
    .order-table-header {
      margin-top: 20px;
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
      // display: block;
      width: 100%;
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
  .schadule {
    border: 0;
    table {
      margin-top: 20px;
      margin-bottom: 35px;
      td {
        p {
          float: left;
          &:last-child {
            float: right;
          }
        }
      }
    }
    .t {
      text-align: right;
      line-height: 50px;
    }
  }
  .btn {
    text-align: center;
    padding: 70px 0 64px 0;
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
.nextHeader {
  display: flex;
  justify-content: space-around;
  padding: 0 43px;
  padding-top: 12px;
  padding-bottom: 80px;
  .upfilekuang{
    width:609px;
    height:106px;
    background:rgba(255,255,255,1);
    box-shadow:0px 1px 5px 0px rgba(181,181,181,0.3);
    border-radius:10px;
    // margin-top: 12px;
    // margin-left: 43px;
    .up {
      background:rgba(255,193,7,1);
      border-color:rgba(255,193,7,1);
      margin-left: 40px;
      margin-top: 37px;
    }
    .upfile {
      float: left;
      width:145px;
      height:75px;
      background:rgba(255,255,255,1);
      border:1px solid rgba(217,217,217,1);
      border-radius:4px;
      text-align: center;
      margin-top: 14px;
      margin-left: 15px;
      cursor: pointer;
      position: relative;
      img {
        margin-top: 8px;
      }
      p {
        line-height: 30px;
        font-size: 12px;
        width: 100%;
        overflow: hidden;
        height: 30px;
      }
      input {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        cursor: pointer;
      }
    }
  }
  .addNumber {
    width:448px;
    height:106px;
    background:rgba(255,255,255,1);
    box-shadow:0px 1px 5px 0px rgba(181,181,181,0.3);
    border-radius:10px;
    padding: 36px 16px;
    box-sizing: border-box;
    input {
      width:308px;
      height:40px;
      background:rgba(255,255,255,1);
      border:1px solid rgba(217,217,217,1);
      border-radius:4px;
    }
    button {
      width:75px;
      height:40px;
      background:rgba(255,193,7,1);
      border-radius:4px;
    }
  }
  .creatTable {
    // width:225px;
    height:106px;
    background:rgba(255,255,255,1);
    box-shadow:0px 1px 5px 0px rgba(181,181,181,0.3);
    border-radius:10px;
    padding: 32px 32px;
    box-sizing: border-box;
    .round {
      width:151px;
      height:40px;
      background:rgba(255,193,7,1);
      border-radius:4px;
      // line-height: 66px;
      font-size: 15px;
      text-align: center;
      // cursor: pointer;
    }
  }
}
</style>
