<template>
  <!-- 还款明细 -->
  <div class="ReimbursementDetail">
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
      <el-table-column prop="requisitionId" label="订单号" width="180"></el-table-column>
      <el-table-column prop="repaymentTime" label="还款时间" width="120"></el-table-column>
      <el-table-column prop="name" label="公司名称"></el-table-column>
      <el-table-column label="车辆数" width="80">
        <template slot-scope="scope">
          <el-popover
            placement="right"
            @show="showCarList(scope.row.requisitionId)"
            @hide="hide"
            trigger="click">
            <el-table :data="gridData" :show-header="false">
              <el-table-column property="carNumber"></el-table-column>
            </el-table>
            <el-button slot="reference" type="text" style="color: #606266;width: 50px;">{{ scope.row.carNumber }}</el-button>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="forTheTime" label="投保时间" width="120"></el-table-column>
      <el-table-column prop="coverage" label="险种" width="70"></el-table-column>
      <el-table-column prop="repaymentAmount" label="本期待还"></el-table-column>
      <el-table-column prop="state" label="分期状态"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" v-if="scope.row.condition === 0" style="color: #4977FC">待还款</el-button>
          <el-button type="text" v-if="scope.row.condition === 1" style="color: #333">已还款</el-button>
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
  </div>
</template>

<script>
import Selector from '../../common/Selector'
export default {
  name: 'ReimbursementDetail',
  data () {
    return {
      gridData: [],
      options: [],
      currentPage4: 1,
      value: '',
      serchDate: [],
      SortValue: '1',
      NumValue: 10,
      total: 0,
      tableData: []
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
        // corporateName: this.serchDate.selectChannel,
        channelId: this.serchDate.selectChannel,
        requisitionId: this.serchDate.requisitionId,
        order: this.SortValue,
        page: this.currentPage4,
        pageSize: this.NumValue
      }
      // console.log(data)
      // GET /user/byStages/reimbursementDetail
      this.$fetch('/user/byStages/reimbursementDetail', data).then(res => {
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
</style>
