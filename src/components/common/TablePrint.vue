<template>
  <div class="tableprint">
    <div class="dialog-header">报价单</div>
    <div class="order-table">
      <div class="order-table-header">
        <span>订单号：{{ orderList.header.requisitionId }}</span>
        <span>企业名称：{{ orderList.header.channelName }}</span>
        <span>险种：{{ orderList.header.coverageName }}</span>
        <span>车辆数：{{ orderList.header.sumCar }}</span>
        <span>保费合计：{{ orderList.header.sumMoney }}</span>
      </div>
      <table>
        <tr>
          <th>车牌号</th>
          <th>保费总额</th>
          <th>申请金额</th>
          <th>平台费率</th>
          <th>每月还款</th>
          <th>首付款</th>
          <th>服务费</th>
        </tr>
        <tr v-for="(item, index) in orderList.middle" :key="index">
          <td>{{ item.carNumber }}</td>
          <td>{{ item.premium }}</td>
          <td>{{ item.appliedAmount }}</td>
          <td>{{ item.platformLicensing }}</td>
          <td>{{ item.eachPayment }}</td>
          <td>{{ item.downPayment }}</td>
          <td>{{ item.serviceCharge }}</td>
        </tr>
        <tr v-if="length">
          <td>小计(元):</td>
          <!-- <td>{{ orderList.subtotal.eadSum }}</td> -->
          <td>{{ orderList.subtotal.premiumSum }}</td>
          <td>{{ orderList.subtotal.appliedAmountSum }}</td>
          <td>{{ orderList.subtotal.platformLicensingSum }}</td>
          <td>{{ orderList.subtotal.eachPaymentSum }}</td>
          <td><span class="red">{{ orderList.subtotal.downPaymentSum }}</span></td>
          <td><span class="red">{{ orderList.subtotal.serviceChargeSum }}</span></td>
        </tr>
        <tr v-if="length">
          <td colspan="8">首期应付(元):&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="red">{{ orderList.sum }}</span></td>
        </tr>
      </table>
      <table v-for="(o, i) in orderList2" :key="i"  style="page-break-before: left;">
        <tr v-for="(item, index) in o" :key="index">
          <td>{{ item.carNumber }}</td>
          <td>{{ item.premium }}</td>
          <td>{{ item.appliedAmount }}</td>
          <td>{{ item.platformLicensing }}</td>
          <td>{{ item.eachPayment }}</td>
          <td>{{ item.downPayment }}</td>
          <td>{{ item.serviceCharge }}</td>
        </tr>
        <tr v-show="orderList2.length === i + 1">
          <td>小计(元):</td>
          <!-- <td>{{ orderList.subtotal.eadSum }}</td> -->
          <td>{{ orderList.subtotal.premiumSum }}</td>
          <td>{{ orderList.subtotal.appliedAmountSum }}</td>
          <td>{{ orderList.subtotal.platformLicensingSum }}</td>
          <td>{{ orderList.subtotal.eachPaymentSum }}</td>
          <td><span class="red">{{ orderList.subtotal.downPaymentSum }}</span></td>
          <td><span class="red">{{ orderList.subtotal.serviceChargeSum }}</span></td>
        </tr>
        <tr v-show="orderList2.length === i + 1">
          <td colspan="8">首期应付(元):&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="red">{{ orderList.sum }}</span></td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TablePrint',
  data () {
    return {
      orderList2: [],
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
      length: true,
      last: false
    }
  },
  mounted () {
    this.$fetch('/admin/requisition/quotationdetails', {
      requisitionId: this.$route.query.id,
      convarge: this.$route.query.convarge
    }).then(res => {
      if (res.data.middle.length > 23) {
        this.orderList.middle = res.data.middle.slice(0, 23)
        this.orderList.header = res.data.header
        this.orderList.subtotal = res.data.subtotal
        this.orderList.sum = res.data.sum
        this.length = false
        var j = 23
        for (var i = 0; i < (res.data.middle.length - 23) / 28; i++) {
          this.orderList2.push(res.data.middle.slice(j, j + 28))
          j += 28
        }
        console.log(res.data.middle)
        console.log(this.orderList2)
        // this.orderList.middle = res.data.middle.slice(0, 23)
      } else {
        this.orderList = res.data
      }
    })
  }
}
</script>

<style lang="less" scoped>
table {
  td {
    width: 110px;
  }
  td:first-of-type {
    width: 160px;
  }
}
.tableprint {
  width: 1000px;
  .el-pagination  {
    margin-top: 50px;
  }
  .dialog-header {
    font-size: 24px;
    line-height: 50px;
    text-align: center;
    padding-top: 30px;
  }
  .header {
    padding-bottom: 20px;
  }
  .order-table {
    margin: 20px 23px 0;
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
  .red {
    color: red;
  }
}
</style>
