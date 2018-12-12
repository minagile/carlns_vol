<template>
  <!-- 已分期列表 -->
  <div class="StageList">
    <selector
      :refresh="true"
      @sort="sort"
      @page="page"
      @giveParams="giveParams"
      @getData="getData"
    >
    </selector>

    <el-table
    ref="multipleTable"
    :data="tableData"
    tooltip-effect="light"
    border
    max-height="450"
    style="width: 95%; margin: 0 auto;border: 1px solid #eee">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="requisitionId" label="订单号"></el-table-column>
      <el-table-column prop="name" label="公司名称"></el-table-column>
      <el-table-column prop="carNumber" label="车辆数"></el-table-column>
      <el-table-column prop="time" label="投保时间"></el-table-column>
      <el-table-column prop="money" label="投保金额"></el-table-column>
      <el-table-column prop="coverage" label="险种"></el-table-column>
      <el-table-column prop="state" label="分期状态"></el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button type="text" @click="look(scope.row.requisitionId)">查看付款计划表</el-button>
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
              <p>合计：{{sum}}</p>
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
  name: 'StageList',
  data () {
    return {
      head: {
        name: '',
        rdate: '',
        qdate: '',
        coverage: '',
        batch: '',
        carNumber: ''
      },
      middle: [],
      options: [],
      currentPage4: 1,
      value: '',
      serchDate: [],
      SortValue: '1',
      NumValue: 10,
      total: 0,
      tableData: [],
      centerDialogVisible: false,
      orderList: [],
      orderList1: [],
      sum: 0,
      sum1: 0
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    look (id) {
      this.centerDialogVisible = true
      this.orderList = []
      this.orderList1 = []
      // GET /user/byStages/stagingList_particulars
      this.$fetch('/user/byStages/stagingList_particulars', {
        requisitionId: id
      }).then(res => {
        console.log(res)
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
      // console.log(`每页 ${val} 条`)
      this.NumValue = val
      this.getData()
    },
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      this.currentPage4 = val
      this.getData()
    },
    getData () {
      var data = {
        // channelId: '',
        startTime: this.serchDate.startTime,
        endTime: this.serchDate.endTime,
        corporateName: this.serchDate.selectChannel,
        order: this.SortValue,
        page: this.currentPage4,
        pageSize: this.NumValue
      }
      // console.log(data)
      // GET /user/byStages/stagingList_query
      this.$fetch('/user/byStages/stagingList_query', data).then(res => {
        console.log(res)
        if (res.code === 0) {
          this.tableData = res.data.rows
          this.total = res.data.records
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  },
  components: {
    Selector
  }
}
</script>

<style lang="less" scoped>
.StageList {
  .Amortized-table {
    padding: 0 3.44% 23px 3.44%;
  }
}
.dia {
  padding: 0 15px;
  height: 600px;
  overflow: scroll;
}
.el-dialog {
  .dialog-header {
    background: #4977FC;
    color: #fff;
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
</style>

<style lang="less" scoped>
.Amortized-sort {
  padding: 25px 3.44% 23px 3.44%;
  .el-select:nth-of-type(1) {
    width: 138px;
    margin-left: 10px;
    margin-right: 40px;
  }
  .el-select:nth-of-type(2) {
    width: 138px;
    margin: 0 10px;
  }
  .el-button {
    float: right;
    width: 88px;
    height: 36px;
    background-image: url(../../../assets/img/refresh.png);
  }
}
.Amortized-table {
  padding: 0 3.44% 23px 3.44%;
}
.el-pagination  {
  margin-top: 50px;
}
.Amortized-table {
    padding: 0 3.44% 23px 3.44%;
  }
</style>
