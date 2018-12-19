<template>
  <!-- 付款计划表 -->
  <div class="AlertSchedule">
    <div class="dialog-header">付款计划表</div>
    <div class="dia">
      <p style="margin-bottom: 45px;">致：上海锦锭科技有限公司</p>
      <p style="text-indent:50px;">根据我司<i> {{head.name}} </i>与贵司于 {{head.date | time}} 签订的《商户合作协议书》，我司 <i>{{head.qdate | time}}</i> 投保 <i> {{head.coverage}} </i> 的车辆业务清单如下：</p>
      <!-- <div class="order-table-header">
        <span>订单号：{{head.batch}}</span>
        <span>险种：{{head.coverage}}</span>
        <span>车辆数：{{head.carNumber}}</span>
      </div> -->
      <table style="margin-top: 50px;">
        <tr>
          <th>序号</th>
          <th>车牌号</th>
          <th>车架号</th>
          <th>保险公司</th>
          <th>车险保单号</th>
        </tr>
        <tr v-for="(item, index) in middle" :key="index">
          <th>{{ index + 1 }}</th>
          <th>{{item.plateNumber}}</th>
          <th>{{item.vin}}</th>
          <th>{{item.iCBC}}</th>
          <th>{{item.policyNumber}}</th>
        </tr>
      </table>
      <h4 v-if="orderList.length > 0" style="text-indent: 40px;margin-bottom: 40px;">上述车辆商业险分期付款计划如下表：</h4>
      <table v-if="orderList.length > 0" style="width:90%;margin:0 auto;">
        <tr>
          <th>期数</th>
          <th>实际付款（元）</th>
          <th>付款日期</th>
        </tr>
        <tr v-for="(i, index) in orderList" :key="index">
          <td>{{i.periods}}</td>
          <td>{{i.money}}</td>
          <td>{{i.date | timeChange}}</td>
        </tr>
        <tr>
          <td>合计</td>
          <td>{{sum}}</td>
          <td></td>
        </tr>
      </table>
      <!-- <p>（注：付款日期遇如遇法定节假日，需提前至工作日完成支付）</p> -->
      <h4 v-if="orderList1.length > 0" style="text-indent: 40px;margin-bottom: 40px;">上述车辆交强险分期付款计划如下表：</h4>
      <table v-if="orderList1.length > 0" style="width:90%;margin:0 auto;">
        <tr>
          <th>期数</th>
          <th>还款金额</th>
          <th>付款日期</th>
        </tr>
        <tr v-for="(i, index) in orderList1" :key="index">
          <td>{{i.periods}}</td>
          <td>{{i.money}}</td>
          <td>{{i.date | timeChange}}</td>
        </tr>
        <tr>
          <td>合计</td>
          <td>{{sum1}}</td>
          <td></td>
        </tr>
      </table>
      <p style="text-indent: 10px;line-height: 50px;">（注：付款日期遇如遇法定节假日，需提前至工作日完成支付）</p>
      <p style="margin-top:100px;">本业务清单及付款计划表属于《商户合作协议书》不可分割的部分，作为附件与 《商户合作协议书》主文具备同等法律效力。我司对业务清单所列之被保险车辆信息的真实性负责，并承诺按照付款计划表所列进度进行付款</p>
      <p class="t" style="margin-top:100px;"><i>{{head.name}}</i></p>
      <p class="t">{{head.qdate | time}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AlertSchedule',
  data () {
    return {
      orderList: [],
      orderList1: [],
      centerDialogVisible: false,
      sum: 0,
      sum1: 0,
      middle: [],
      head: {
        name: '',
        rdate: '',
        qdate: '',
        coverage: '',
        batch: '',
        carNumber: ''
      }
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      // console.log(this.$route.query.id)
      this.orderList = []
      this.orderList1 = []
      var url = ''
      if (this.$route.query.enter === 'font') {
        url = '/user/byStages/stagingList_particulars'
      } else {
        url = '/admin/byStages_a/stagingList_particulars_a'
      }
      this.$fetch(url, {
        requisitionId: this.$route.query.id
      }).then(res => {
        if (res.code === 0) {
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
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  },
  filters: {
    timeChange (data) {
      return data.replace('-', '/').replace('-', '/')
    },
    time (data) {
      return data.replace('-', '年').replace('-', '月') + '日'
    },
    payed (val) {
      if (val === 2) return '已逾期'
      if (val === 1) return '已付款'
      if (val === 0) return '未付款'
    }
  }
}
</script>

<style lang="less" scoped>
.AlertSchedule {
  width: 800px;
  // margin-left: 30px;
  // margin: 0 auto;
  .dialog-header {
    font-weight: bolder;
    font-size: 24px;
    text-align: center;
  }
  .dia {
    padding: 0 15px;
    // height: 600px;
    // overflow: scroll;
  }
  padding: 15px 150px 32px;
  p {
    width: 700px;
    margin: 0 auto;
    font-size: 15px;
    line-height: 50px;
    i {
      font-style: normal;
      text-decoration: underline;
    }
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
      border: 1px solid #000;
      // text-align: left;
      height: 50px;
      color: #262626;
      font-weight: normal;
      // text-indent: 13px;
    }
  }
  border: 0;
  table {
    text-align: center;
    // margin-top: 20px;
    margin-bottom: 35px;
    td {
      p {
        // float: left;
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
</style>
