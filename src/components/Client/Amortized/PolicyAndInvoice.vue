<template>
  <!-- 保单及发票管理 -->
  <div class="PolicyAndInvoice">
    <selector
      :refresh="true"
      @sort="sort"
      @page="page"
      @giveParams="giveParams"
      @reload="reload"
      @getData="getData"
    >
    </selector>

    <el-table
    :data="tableData"
    tooltip-effect="light"
    border
    max-height="450"
    style="width: 95%; margin: 0 auto;border: 1px solid #eee"
    v-loading="loading">
      <!-- <el-table-column type="selection" width="55"></el-table-column> -->
      <el-table-column prop="requisitionId" label="订单号" min-width="150"></el-table-column>
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
            <el-button slot="reference" type="text" style="width: 50px;">{{ scope.row.carNumber }}</el-button>
          </el-popover>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="batch" label="批次"></el-table-column> -->
      <el-table-column prop="name" label="公司名称" min-width="300"></el-table-column>
      <el-table-column prop="time" label="投保时间" width="120"></el-table-column>
      <el-table-column prop="policy" label="保单" width="120">
        <template slot-scope="scope">
          <!-- <img src="../../../assets/img/img.png" alt=""> -->
          <el-button type="text" @click="lookDetail(scope.row, 1)" :style="{color: scope.row.policy ? '#409EFF' : '#ccc'}">下载</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="invoice" label="发票" width="120">
        <template slot-scope="scope">
          <!-- <img src="../../../assets/img/img.png" alt=""> -->
          <el-button type="text" @click="lookDetail(scope.row, 2)" :style="{color: scope.row.invoice ? '#409EFF' : '#ccc'}">下载</el-button>
        </template>
      </el-table-column>
      <!-- <el-table-column width="220">
        <template slot-scope="scope">
          <el-button type="text" @click="lookDetail(scope.row)">下载保单及发票</el-button>
        </template>
      </el-table-column> -->
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
  name: 'PolicyAndInvoice',
  data () {
    return {
      gridData: [],
      options: [],
      value: '',
      currentPage4: 1,
      serchDate: [],
      SortValue: '1',
      NumValue: 10,
      total: 0,
      tableData: [],
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
    reload () {
      this.getData()
    },
    lookDetail (id, i) {
      if (i === 1) {
        if (!id.policy) {
          this.$message('没有文件')
        } else {
          window.open(id.policy)
        }
      }
      if (i === 2) {
        if (!id.invoice) {
          this.$message('没有文件')
        } else {
          window.open(id.invoice)
        }
      }
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
      // GET /user/byStages/insuranceInvoice
      this.$fetch('/user/byStages/insuranceInvoice', data).then(res => {
        // console.log(res)
        this.loading = false
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
    carType (val) {
      if (val === -1) return '已退保'
    }
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
  // button {
  //   width:88px;
  //   height:35px;
  //   background:rgba(255,255,255,1);
  //   border:1px solid rgba(232,232,232,1);
  //   border-radius:4px;
  //   float: right;
  //   color: #4977FC;
  // }
}
.Amortized-table {
  padding: 0 3.44% 23px 3.44%;
}
.el-pagination  {
  margin-top: 50px;
}
</style>
