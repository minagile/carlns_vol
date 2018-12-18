<template>
  <!-- 付款计划表列表 -->
  <div class="PaymentSchedule">
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
      max-height="450"
      style="width: 95%; margin: 0 auto;border: 1px solid #eee"
      v-loadinh="loading">
      <el-table-column prop="requisitionId" label="订单号" min-width="180"></el-table-column>
      <el-table-column prop="channelName" label="公司名称"></el-table-column>
      <el-table-column label="车辆数" min-width="80">
        <template slot-scope="scope">
          <el-popover
            placement="right"
            @show="showCarList(scope.row.requisitionId)"
            @hide="hide"
            trigger="click">
            <el-table :data="gridData" max-height="300" :show-header="false">
              <el-table-column property="carNumber"></el-table-column>
            </el-table>
            <el-button slot="reference" type="text" style="width: 50px;">{{ scope.row.carSum }}</el-button>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="coverageName" label="险种" min-width="70"></el-table-column>
      <el-table-column label="投保时间" min-width="120">
        <template slot-scope="scope">
          {{ scope.row.createTime | timeChange }}
        </template>
      </el-table-column>
      <el-table-column label="付款计划表">
        <template slot-scope="scope">
          <img src="../../../assets/img/img.png" width="50" alt="">
          <el-button type="text" @click="watchPrice(scope.row.requisitionId)">点击查看付款计划表</el-button>
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
      width="770px"
      custom-class="dialog">
      <div class="dialog-header1">付款计划表</div>
      <div class="inventory schadule">
        <table>
          <tr>
            <th>期数</th>
            <th>付款日期</th>
            <th>还款金额</th>
            <!-- <th>是否付款</th> -->
          </tr>
          <tr v-for="(i, index) in orderList" :key="index">
            <td>{{i.periods}}</td>
            <td>{{i.date}}</td>
            <td>{{i.money}}</td>
            <!-- <td>{{i.stagesState | payed}}</td> -->
          </tr>
          <tr>
            <td colspan="3">
              <!-- <p>合计：{{sum}}</p> -->
              <p>（注：付款日期遇如遇法定节假日，需提前至工作日完成支付）</p>
            </td>
          </tr>
        </table>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Selector from '../../common/Selector'
export default {
  name: 'PaymentSchedule',
  data () {
    return {
      gridData: [],
      options: [],
      value: '',
      currentPage4: 1,
      serchDate: [],
      SortValue: '1',
      // NumValue: 10,
      tableData3: [],
      pagination: {
        pageSize: 10,
        pageSizes: [10, 20, 30, 40, 50],
        currentPage: 1,
        total: 0
      },
      list: [], // 渠道列表
      dialogVisible: false,
      orderList: [],
      loading: true
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
      this.$fetch('/user/urequisition/getPaymentScheduleList', data).then(res => {
        this.loading = false
        if (res.code === 0) {
          this.tableData3 = res.data.rows
          this.pagination.total = res.data.records
        }
      })
    },
    watchPrice (id) {
      this.dialogVisible = true
      this.$fetch('/user/byStages/stagingList_particulars', {
        requisitionId: id
      }).then(res => {
        this.orderList = res.data.trailVo1
        if (res.data.trailVo1) {
          this.orderList = res.data.trailVo1
        } else {
          this.orderList = res.data.trailVo2
        }
      })
    }
  },
  components: {
    Selector
  },
  filters: {
    payed (val) {
      if (val === 2) return '已逾期'
      if (val === 1) return '已付款'
      if (val === 0) return '未付款'
    },
    timeChange (data) {
      let date = new Date(data)
      return date.getFullYear() + '-' + zero(date.getMonth() + 1) + '-' + zero(date.getDate())
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
.PaymentSchedule {
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
  .schadule {
    border: 0;
    height: 600px;
    overflow: auto;
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
  .inventory {
    // margin: 20px 23px 0;
    padding: 0 15px;
    // border-bottom: 13px solid #f2f2f2;
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
</style>
