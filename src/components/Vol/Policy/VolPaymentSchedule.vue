<template>
  <!-- 付款计划表列表 -->
  <div class="VolPaymentSchedule">
    <selector
      :all="true"
      :vol="true"
      @sort="sort"
      @page="page"
      @giveParams="giveParams"
    >
    </selector>

    <el-table
      ref="multipleTable"
      :data="tableData3"
      tooltip-effect="light"
      border
      v-loading="loading"
      max-height="450"
      style="width: 95%; margin: 0 auto;">
      <!-- <el-table-column type="selection" width="55"></el-table-column> -->
      <el-table-column prop="requisitionId" label="订单号" min-width="150"></el-table-column>
      <el-table-column prop="channelName" label="公司名称"  min-width="300"></el-table-column>
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
              <!-- <el-table-column property="delFlag">

              </el-table-column> -->
            </el-table>
            <el-button slot="reference" type="text" style="width: 50px;">{{ scope.row.carSum }}</el-button>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="coverageName" label="险种" width="80"></el-table-column>
      <el-table-column label="投保时间" min-width="120">
        <template slot-scope="scope">
          {{ scope.row.createTime | timeChange }}
        </template>
      </el-table-column>
      <el-table-column label="付款计划表" width="220">
        <template slot-scope="scope">
          <!-- <img src="../../../assets/img/img.png" width="50" alt=""> -->
          <el-button type="text"  @click="watchPrice(scope.row.requisitionId)">点击查看付款计划表</el-button>
          <el-button type="text"  @click="watchPriceopen(scope.row.requisitionId)">下载</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination v-if="total > NumValue"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="NumValue"
      layout="prev, pager, next, total, jumper"
      :total="total">
    </el-pagination>

    <el-dialog :visible.sync="centerDialogVisible" width="770px">
      <div class="dialog-header">付款计划表</div>
      <div class="dia">
        <p>致：上海锦锭科技有限公司</p>
        <p>根据我司 {{head.name}} 与贵司签订的《商户合作协议书》，我司 {{head.qdate}}投保 {{head.coverage}} 的车辆业务清单如下：</p>
        <div class="order-table-header">
          <span>订单号：{{head.batch}}</span>
          <!-- <span>企业名称：{{head.name}}</span> -->
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
            <th>{{item.plateNumber}}<br/>
            {{item.tui}}
            </th>
            <th>{{item.vin}}</th>
            <th>{{item.iCBC}}</th>
            <th>{{item.policyNumber}}</th>
          </tr>
          <!-- <tr v-for="(item, index) in orderList" :key="index">
            <td><input type="text" v-model="item.chepaihao"></td>
            <td><input type="text" v-model="item.shangyexian"></td>
            <td><input type="text" v-model="item.baofei"></td>
            <td><input type="text" v-model="item.shenqing"></td>
          </tr> -->
        </table>
        <h4 v-if="orderList.length > 0">商业险付款计划表</h4>
        <table v-if="orderList.length > 0">
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
        <h4 v-if="orderList1.length > 0">交强险付款计划表</h4>
        <table v-if="orderList1.length > 0">
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
    </el-dialog>
  </div>
</template>

<script>
import Selector from '../../common/Selector'
export default {
  name: 'VolPaymentSchedule',
  data () {
    return {
      loading: false,
      gridData: [],
      currentPage4: 1,
      tableData3: [],
      serchDate: [],
      SortValue: '1',
      NumValue: 10,
      value: '',
      total: 0,
      dialogVisible: false,
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
    watchPriceopen (id) {
      let routeData = this.$router.resolve({
        name: 'AlertSchedule',
        query: { id: id }
      })
      window.open(routeData.href, '_blank')
    },
    hide () {
      this.gridData = []
    },
    showCarList (id) {
      this.$fetch('/admin/car/getCarByRequisitionId', {
        requisitionId: id
      }).then(res => {
        if (res.code === 0) {
          this.gridData = res.data
        }
      })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    giveParams (data) {
      // console.log(data)
      this.serchDate = data
      this.getData()
    },
    // 一页几条数据
    page (data) {
      this.NumValue = data
      this.getData()
    },
    // 正序反序
    sort (data) {
      this.SortValue = data
      this.getData()
    },
    handleSizeChange (val) {
      this.NumValue = val
      this.getData()
    },
    handleCurrentChange (val) {
      this.currentPage4 = val
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
        page: this.currentPage4,
        pageSize: this.NumValue
      }
      // console.log(data)
      this.$fetch('/admin/requisition/getPaymentScheduleList', data).then(res => {
        this.loading = false
        if (res.code === 0) {
          // console.log(res.data)
          this.tableData3 = res.data.rows
          this.total = res.data.records
        } else {
          this.$message(res.msg)
        }
      })
    },
    watchPrice (id) {
      this.centerDialogVisible = true
      this.orderList = []
      this.orderList1 = []
      this.$fetch('/admin/byStages_a/stagingList_particulars_a', {
        requisitionId: id
      }).then(res => {
        // console.log(res)
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
        } else {
          this.$message.error(res.msg)
        }
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
    time (data) {
      return data.split(' ')[0].replace('-', '.').replace('-', '.')
    },
    payed (val) {
      if (val === 2) return '已逾期'
      if (val === 1) return '已付款'
      if (val === 0) return '未付款'
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
.VolPaymentSchedule {
  .header {
    padding-bottom: 20px;
  }
  .el-dialog {
    // .dialog-header {
    //   background: #4977FC;
    //   color: #fff;
    // }
    .dia {
      padding: 0 15px;
      height: 600px;
      overflow: scroll;
    }
    padding: 15px 191px 32px;
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
    border: 0;
    table {
      // margin-top: 20px;
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
}
</style>
