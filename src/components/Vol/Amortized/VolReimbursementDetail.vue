<template>
  <!-- 还款明细 -->
  <div class="VolReimbursementDetail">
    <selector
      :all="true"
      :vol="true"
      @sort="sort"
      @page="page"
      @giveParams="giveParams"
    >
    </selector>

    <!-- <div class="Amortized-table"> -->
    <el-table
    ref="multipleTable"
    :data="tableData"
    tooltip-effect="light"
    border
    v-loading="loading"
    max-height="450"
    style="width: 95%; margin: 0 auto">
      <el-table-column prop="repaymentTime" label="还款时间"  width="120"></el-table-column>
      <el-table-column prop="requisitionId" label="订单号" width="180"></el-table-column>
      <el-table-column prop="name" label="公司名称"></el-table-column>
      <el-table-column label="车辆数" width="70">
        <template slot-scope="scope">
          <el-popover
            placement="right"
            @show="showCarList(scope.row.requisitionId)"
            @hide="hide"
            trigger="click">
            <el-table :data="gridData" :show-header="false">
              <el-table-column property="carNumber"></el-table-column>
            </el-table>
            <el-button slot="reference" type="text" style="width: 50px;">{{ scope.row.carNumber }}</el-button>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="forTheTime" label="投保时间" width="120"></el-table-column>
      <el-table-column prop="coverage" label="险种" width="70"></el-table-column>
      <el-table-column prop="repaymentAmount" label="本期待还"></el-table-column>
      <el-table-column prop="state" label="分期状态" width="80"></el-table-column>
      <el-table-column label="操作(可撤销)" width="180">
        <template slot-scope="scope">
          <el-button type="danger" plain v-if="scope.row.condition === 0" @click="gotopay(scope.row.condition, scope.row.stagesId)">待还款</el-button>
          <el-button type="primary" plain v-if="scope.row.condition === 1" @click="gotopay(scope.row.condition, scope.row.stagesId)">已还款</el-button>
          <p v-if="scope.row.condition === 2">
            <el-button type="warning" plain @click="gotopay(scope.row.condition, scope.row.stagesId)">去还款</el-button>
            <el-button type="text" style="color:red;">已逾期</el-button>
          </p>
        </template>
      </el-table-column>
    </el-table>
    <!-- </div> -->

    <!-- 分页 -->
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
  name: 'VolReimbursementDetail',
  data () {
    return {
      gridData: [],
      currentPage4: 1,
      options: [],
      value: '',
      serchDate: [],
      SortValue: '1',
      NumValue: 10,
      total: 0,
      tableData: [],
      loading: false
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
      this.$fetch('/admin/car/getCarByRequisitionId', {
        requisitionId: id
      }).then(res => {
        if (res.code === 0) {
          this.gridData = res.data
        }
      })
    },
    gotopay (type, id) {
      let tip = ''
      if (type === 1) {
        tip = '撤销'
        type = 0
      } else {
        tip = '确定'
        type = 1
      }
      this.$confirm(`是否${tip}还款`, tip, {
        distinguishCancelAndClose: true,
        confirmButtonText: tip,
        cancelButtonText: '取消'
      }).then(() => {
        // GET /admin/stager/affirm
        this.$fetch('/admin/stager/affirm', {
          stagesId: id,
          type: type
        }).then(res => {
          // console.log(res)
          if (res.code === 0) {
            this.$message({
              type: 'success',
              message: `已${tip}还款`
            })
            this.getData()
          } else {
            this.$message({
              type: 'info',
              message: res.msg
            })
          }
        })
      }).catch(action => {
        // this.$message({
        //   type: 'info',
        //   message: '取消还款'
        // })
      })
    },
    // gotopay1 (id) {
    //   this.$confirm('是否撤销还款', '撤销还款', {
    //     distinguishCancelAndClose: true,
    //     confirmButtonText: '撤销',
    //     cancelButtonText: '取消'
    //   }).then(() => {
    //     // GET /admin/stager/affirm
    //     this.$fetch('/admin/stager/affirm', {
    //       stagesId: id
    //     }).then(res => {
    //       console.log(res)
    //       // if (res.code === 0) {
    //       //   this.$message({
    //       //     type: 'success',
    //       //     message: '已撤销还款'
    //       //   })
    //       //   this.getData()
    //       // } else {
    //       //   this.$message({
    //       //     type: 'info',
    //       //     message: res.msg
    //       //   })
    //       // }
    //     })
    //   }).catch(action => {
    //     this.$message({
    //       type: 'info',
    //       message: '取消撤销'
    //     })
    //   })
    // },
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
      // GET /admin/byStages_a/reimbursementDetail_a
      this.$fetch('/admin/byStages_a/reimbursementDetail_a', data).then(res => {
        // console.log(res)
        if (res.code === 0) {
          this.loading = false
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
  },
  filters: {
    condition (val) {
      if (val === 0) return '待还款'
      if (val === 1) return '已还款'
      if (val === 3) return '已逾期'
    }
  }
}
</script>

<style lang="less" scoped>
.VolReimbursementDetail {
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
    button {
      width:88px;
      height:35px;
      background:rgba(255,255,255,1);
      border:1px solid rgba(232,232,232,1);
      border-radius:4px;
      float: right;
      color: #4977FC;
    }
  }
  .Amortized-table {
    padding: 0 3.44% 23px 3.44%;
  }
  .el-pagination  {
    margin-top: 50px;
  }
}
</style>
