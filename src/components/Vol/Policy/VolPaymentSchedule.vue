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
      max-height="450"
      style="width: 95%; margin: 0 auto;border: 1px solid #eee"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="requisitionId" label="订单号"></el-table-column>
      <el-table-column prop="channelName" label="公司名称"></el-table-column>
      <el-table-column prop="carSum" label="车辆数"></el-table-column>
      <el-table-column prop="coverageName" label="险种"></el-table-column>
      <el-table-column label="投保时间">
        <template slot-scope="scope">
          {{ scope.row.createTime | timeChange }}
        </template>
      </el-table-column>
      <el-table-column label="付款计划表">
        <template slot-scope="scope">
          <img src="../../../assets/img/img.png" alt="">
          <el-button type="text"  @click="watchPrice(scope.row.requisitionId)">点击查看付款计划表</el-button>
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

    <el-dialog
      :visible.sync="dialogVisible"
      width="770px">
      <div class="dialog-header">付款计划表</div>
      <div class="inventory schadule">
        <table>
          <tr>
            <th>期数</th>
            <th>付款日期</th>
            <th>还款金额</th>
            <th>是否付款</th>
          </tr>
          <tr v-for="(i, index) in orderList" :key="index">
            <td>{{i.stagesPeriods}}</td>
            <td>{{i.stagesRepaymentTime}}</td>
            <td>{{i.stagesRepaymentAmount}}</td>
            <td>{{i.stagesState | payed}}</td>
          </tr>
          <tr>
            <td colspan="4">
              <p>合计：{{sum}}</p>
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
  name: 'VolPaymentSchedule',
  data () {
    return {
      currentPage4: 1,
      tableData3: [],
      serchDate: [],
      SortValue: '1',
      NumValue: 10,
      value: '',
      total: 0,
      dialogVisible: false,
      orderList: [],
      sum: 0
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
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
      var data = {
        beginTime: this.serchDate.startTime,
        endTime: this.serchDate.endTime,
        channelName: this.serchDate.selectChannel,
        order: this.SortValue,
        page: this.currentPage4,
        pageSize: this.NumValue
      }
      // console.log(data)
      this.$fetch('/admin/requisition/getPaymentScheduleList', data).then(res => {
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
      this.dialogVisible = true
      this.sum = 0
      this.$fetch('/admin/requisition/stagingList_particulars', {
        requisitionId: id
      }).then(res => {
        this.orderList = res.data
        this.orderList.forEach(v => {
          this.sum += v.stagesRepaymentAmount
        })
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
}
</style>
