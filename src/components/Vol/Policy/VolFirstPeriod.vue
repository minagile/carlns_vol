<template>
  <!-- 保单首期支付结果列表 -->
  <div class="VolFirstPeriod">
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
      border
      v-loading="loading"
      :row-class-name="tableRowClassName"
      max-height="450"
      style="width: 95%; margin: 0 auto;">
      <!-- <el-table-column type="selection" width="55"></el-table-column> -->
      <el-table-column prop="requisitionId" label="订单号" min-width="150"></el-table-column>
      <el-table-column prop="channelName" label="公司名称"  min-width="300"></el-table-column>
      <el-table-column prop="sumMoney" label="金额" min-width="100"></el-table-column>
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
      <el-table-column prop="coverageName" label="险种" width="100"></el-table-column>
      <el-table-column label="订单生成时间" width="120">
        <template slot-scope="scope">
          {{ scope.row.createTime | timeChange }}
        </template>
      </el-table-column>
      <el-table-column label="支付操作" width="180">
        <template slot-scope="scope">
          <el-button :class="{yellow: scope.row.stagesType === '未支付'}" size="mini" @click="changeType(scope.row, '未支付')">未支付</el-button>
          <el-button :class="{yellow: scope.row.stagesType === '已支付'}" size="mini" @click="changeType(scope.row, '已支付')">已支付</el-button>
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
  name: 'VolFirstPeriod',
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
      total: 0
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    tableRowClassName ({ row, rowIndex }) {
      // console.log(row)
      if (row.stagesType === '未支付') {
        return 'success-row'
      }
      return ''
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
      this.$fetch('/admin/requisition/getFirstPaymentList', data).then(res => {
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
    changeType (id, str) {
      var type = 1
      if (str === '已支付') {
        type = 1
      } else {
        type = 0
      }
      this.$confirm('是否确认' + str + '首付', '确认' + str, {
        distinguishCancelAndClose: true,
        confirmButtonText: str,
        cancelButtonText: '取消'
      }).then(() => {
        this.$fetch('/admin/stager/updatef', {
          type: type,
          requisitionId: id.requisitionId
        }).then(res => {
          // console.log(res)
          if (res.code === 0) {
            this.$message({
              type: 'success',
              message: res.msg
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
        this.$message({
          type: 'info',
          message: '取消'
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
.VolFirstPeriod {
  .header {
    padding-bottom: 20px;
  }
  .yellow{
    // pointer-events: none;
    // cursor: default;
    opacity: 0.6;
  }
}
</style>
