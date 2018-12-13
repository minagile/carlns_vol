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
    max-height="450"
    style="width: 95%; margin: 0 auto;border: 1px solid #eee">
      <el-table-column prop="repaymentTime" label="还款时间"></el-table-column>
      <el-table-column prop="requisitionId" label="订单号"></el-table-column>
      <el-table-column prop="name" label="公司名称"></el-table-column>
      <el-table-column prop="carNumber" label="车辆数"></el-table-column>
      <el-table-column prop="forTheTime" label="投保时间"></el-table-column>
      <el-table-column prop="coverage" label="险种"></el-table-column>
      <el-table-column prop="repaymentAmount" label="本期待还"></el-table-column>
      <el-table-column prop="state" label="分期状态"></el-table-column>
      <el-table-column label="操作(可撤销)">
        <template slot-scope="scope">
          <el-button type="danger" plain v-if="scope.row.condition === 0" @click="gotopay(scope.row.condition, scope.row.stagesId)">待还款</el-button>
          <el-button type="primary" plain v-if="scope.row.condition === 1" @click="gotopay(scope.row.condition, scope.row.stagesId)">已还款</el-button>
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
      currentPage4: 1,
      options: [],
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
    gotopay (type, id) {
      let tip = ''
      if (type === 0) {
        tip = '确定'
      } else {
        tip = '撤销'
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
          console.log(res)
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
      var data = {
        // channelId: '1',
        startTime: this.serchDate.startTime,
        endTime: this.serchDate.endTime,
        corporateName: this.serchDate.selectChannel,
        order: this.SortValue,
        page: this.currentPage4,
        pageSize: this.NumValue
      }
      // console.log(data)
      // GET /admin/byStages_a/reimbursementDetail_a
      this.$fetch('/admin/byStages_a/reimbursementDetail_a', data).then(res => {
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
