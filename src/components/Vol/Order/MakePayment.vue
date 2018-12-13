 <template>
  <!-- 制作付款计划表 -->
  <div class="MakePayment">
    <div class="header">
      <div class="select">
        <el-select v-model="channelId" size="small" clearable placeholder="请选择渠道" @visible-change="select">
          <el-option
            v-for="item in selectAllChannel"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="batch" size="small" clearable placeholder="请选择对应批次" @visible-change="selectBatch">
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="upfile">
        <img src="../../../assets/vimg/upload.png" alt="">
        <p>上传保单</p>
        <input type="file" @change="upfile($event, 1)">
      </div>
      <div class="upfile">
        <img src="../../../assets/vimg/upload.png" alt="">
        <p>上传付款计划表</p>
        <input type="file"  @change="upfile($event, 2)">
      </div>
      <div class="upfile">
        <img src="../../../assets/vimg/upload.png" alt="">
        <p>上传发票扫描件</p>
        <input type="file"  @change="upfile($event, 3)">
      </div>
      <el-button class="up" @click="uploadfile">上传</el-button>
      <el-button>清空</el-button>
      <button class="round" @click="createPlan">生成付款计划表</button>
    </div>

    <div class="inventory" v-show="showList">
      <p>致：上海锦锭科技有限公司</p>
      <p>根据我司 {{head.name}} 与贵司于 {{head.rdate}}签订的《商户合作协议书》，我司 {{head.qdate}}投保 {{head.coverage}} 的车辆业务清单如下：</p>
      <div class="order-table-header">
        <span>批次：{{head.batch}}</span>
        <span>企业名称：{{head.name}}</span>
        <span>险种：{{head.coverage}}</span>
        <span>车辆数：{{head.carNumber}}</span>
        <span>投保时间{{head.qdate}}</span>
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
          <th>{{item.ICBC}}</th>
          <th>{{item.policyNumber}}</th>
        </tr>
        <!-- <tr v-for="(item, index) in orderList" :key="index">
          <td><input type="text" v-model="item.chepaihao"></td>
          <td><input type="text" v-model="item.shangyexian"></td>
          <td><input type="text" v-model="item.baofei"></td>
          <td><input type="text" v-model="item.shenqing"></td>
        </tr> -->
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
      showList: false,
      selectAllChannel: [],
      options1: [],
      channelId: '',
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
      sum1: 0
    }
  },
  mounted () {
  },
  methods: {
    selectBatch (val) {
      if (val === true) {
        this.options1 = []
        this.$fetch('/admin/requisition/getBatchByChannelId', {channelId: this.channelId}).then(res => {
          // console.log(res)
          if (res.code === 0) {
            res.data.forEach(v => {
              this.options1.push({value: v.requisitionBatch, label: v.requisitionBatch})
            })
          } else {
            this.$message(res.msg)
          }
        })
      }
    },
    // 选择渠道
    select (val) {
      if (val === true) {
        this.selectAllChannel = []
        this.$fetch('/admin/channel/selectAllChannel').then(res => {
          // console.log(res)
          if (res.code === 0) {
            res.data.forEach(v => {
              this.selectAllChannel.push({value: v.channelId, label: v.channelName})
            })
          } else {
            this.$message(res.msg)
          }
        })
      }
    },
    upfile (e, i) {
      var file = e.target.files[0]
      if (i === 1) {
        this.file1 = file
      }
      if (i === 2) {
        this.file2 = file
      }
      if (i === 3) {
        this.file3 = file
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
        var formData = new FormData()
        formData.append('policyFile', this.file1)
        formData.append('scheduleFile', this.file2)
        formData.append('invoiceFile', this.file3)
        formData.append('channelId', this.channelId)
        formData.append('batch', this.batch)
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data',
            'token': sessionStorage.getItem('token')
          }
        }
        this.$http.post(Req + '/admin/requisition/uploadFiles', formData, config).then(res => {
          console.log(res)
          if (res.code === 0) {
            this.$message.success(res.msg)
          } else {
            this.$message(res.msg)
          }
        })
      }
    },
    createPlan () { // 生成付款计划表
      this.showList = true
      this.orderList = []
      this.orderList1 = []
      this.$fetch('/admin/stager/insertStager', {
        channelId: this.channelId,
        batch: this.batch
      }).then(res => {
        if (res.code === 0) {
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
      float: left;
      width: 220px;
      padding-top: 14px;
      margin-right: 29px;
      .el-select {
        margin-bottom: 11px;
      }
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
      margin-right: 43px;
      cursor: pointer;
      position: relative;
      img {
        margin-top: 8px;
      }
      p {
        line-height: 30px;
        font-size: 12px;
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
    .up {
      background:rgba(255,193,7,1);
      border-color:rgba(255,193,7,1);
      margin-left: 40px;
      margin-top: 37px;
    }
    .round {
      width:151px;
      height:40px;
      background:rgba(255,193,7,1);
      border-radius:4px;
      float: right;
      margin: 35px 117px 0 0;
      // line-height: 66px;
      font-size: 15px;
      text-align: center;
      // cursor: pointer;
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
</style>
