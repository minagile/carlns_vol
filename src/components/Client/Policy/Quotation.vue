<template>
  <!-- 报价单列表 -->
  <div class="Quotation">
    <selector
      :refresh="true"
      @sort="sort"
      @page="handleSizeChange"
      @giveParams="giveParams"
      :channelList="list"
      @getData="getData"
    >
    </selector>

    <el-table
      ref="multipleTable"
      :data="tableData3"
      tooltip-effect="light"
      border
      v-loading="loading"
      max-height="450"
      style="width: 95%; margin: 0 auto;border: 1px solid #eee">
      <el-table-column prop="requisitionId" label="订单号" min-width="150"></el-table-column>
      <el-table-column prop="channelName" label="公司名称" min-width="300"></el-table-column>
      <el-table-column label="车辆数" width="80">
        <template slot-scope="scope">
          <el-popover
            placement="right"
            @show="showCarList(scope.row.requisitionId)"
            @hide="hide"
            trigger="click">
            <el-table :data="gridData" max-height="300" :show-header="false">
              <el-table-column>
                <template slot-scope="scope">
                  {{ scope.row.carNumber }}
                  <span v-if="scope.row.delFlag === -1" style="color: red">
                    {{ scope.row.delFlag | carType }}
                  </span>
                </template>
              </el-table-column>
            </el-table>
            <el-button slot="reference" type="text" style="width: 50px;">{{ scope.row.carSum }}</el-button>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="coverageName" label="险种" width="70"></el-table-column>
      <el-table-column label="订单生成时间" width="120">
        <template slot-scope="scope">
          {{ scope.row.createTime | timeChange }}
        </template>
      </el-table-column>
      <el-table-column label="报价单" width="220">
        <template slot-scope="scope">
          <img src="../../../assets/img/img.png" width="50" alt="">
          <el-button type="text" @click="watchPrice(scope.row.requisitionId, scope.row.coverageName)">点击查看报价单</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination  v-if="pagination.total > pagination.pageSize"
      @current-change="handleCurrentChange"
      :current-page="pagination.currentPage"
      :page-sizes="pagination.pageSizes"
      :page-size="pagination.pageSize"
      layout="prev, pager, next, total, jumper"
      :total="pagination.total">
    </el-pagination>

    <el-dialog
      :visible.sync="dialogVisible"
      width="1200px"
      custom-class="dialog">
      <div class="dialog-header1">报价单</div>
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
            <!-- <th>商业险</th> -->
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
            <td><span class="red"> {{orderList.subtotal.downPaymentSum }}</span></td>
            <td><span class="red">{{ orderList.subtotal.serviceChargeSum }}</span></td>
          </tr>
          <tr>
            <td colspan="8">合计(元):<span class="red">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ orderList.sum }}</span></td>
          </tr>
        </table>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Selector from '../../common/Selector'
export default {
  name: 'Quotation',
  data () {
    return {
      gridData: [],
      options: [],
      value: '',
      pagination: {
        pageSize: 10,
        pageSizes: [10, 20, 30, 40, 50],
        currentPage: 1,
        total: 0
      },
      loading: true,
      serchDate: [],
      SortValue: '1',
      // NumValue: 10,
      tableData3: [],
      list: [], // 渠道列表
      dialogVisible: false,
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
      }
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    hide () {
      this.gridData = []
    },
    showCarList (id) {
      this.$fetch('/user/ucar/getCarByRequisitionId', {
        requisitionId: id
      }).then(res => {
        if (res.code === 0) {
          this.gridData = res.data
        }
      })
    },
    getList () {
      this.$post('/user/uchannel/getNextChannel').then(res => {
        this.list = res.data
      })
    },
    giveParams (data) {
      // console.log(data)
      this.serchDate = data
      this.getData()
    },
    // 一页几条数据
    // page (data) {
    //   this.NumValue = data
    //   this.getData()
    // },
    // 正序反序
    sort (data) {
      this.SortValue = data
      this.getData()
    },
    handleSizeChange (val) { // 一页几条数据
      this.pagination.pageSize = val
      this.getData()
    },
    handleCurrentChange (val) {
      this.pagination.currentPage = val
      this.getData()
    },
    getData () {
      this.loading = true
      var data = {
        // channelId: '',
        startTime: this.serchDate.startTime,
        endTime: this.serchDate.endTime,
        // corporateName: this.serchDate.selectChannel,
        channelId: this.serchDate.selectChannel,
        requisitionId: this.serchDate.requisitionId,
        order: this.SortValue,
        page: this.pagination.currentPage,
        pageSize: this.pagination.pageSize
      }
      this.$fetch('/user/urequisition/getquotationList', data).then(res => {
        this.loading = false
        if (res.code === 0) {
          this.tableData3 = res.data.rows
          this.pagination.total = res.data.records
        }
      })
    },
    watchPrice (id, convarge) {
      this.dialogVisible = true
      this.$fetch('/user/urequisition/quotationdetails', {
        requisitionId: id,
        convarge: convarge
      }).then(res => {
        this.orderList = res.data
      })
    }
  },
  components: {
    Selector
  },
  filters: {
    timeChange (data) {
      let date = new Date(data)
      return date.getFullYear() + '-' + zero(date.getMonth() + 1) + '-' + zero(date.getDate())
    },
    carType (val) {
      if (val === -1) return '已退保'
    }
  }
}
function zero (data) {
  if (data < 10) return '0' + data
  return data
}
</script>

<style lang="less" scoped>
.el-pagination  {
  margin-top: 50px;
}
.Quotation {
  .header {
    padding-bottom: 20px;
    .el-button {
      float: right;
      width: 88px;
      height: 36px;
      background-image: url(../../../assets/img/downfile.png);
      background-repeat: no-repeat;
      background-position: center;
    }
  }
}
.dialog {
  .order-table {
    margin: 20px 23px 0;
    .order-table-header {
      display: flex;
      justify-content: space-between;
      // padding: 21px 26px;
      line-height: 58px;
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
}
.red {
  color: red;
}
</style>
