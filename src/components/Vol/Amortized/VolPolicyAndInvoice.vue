<template>
  <!-- 保单及发票管理 -->
  <div class="VolPolicyAndInvoice">
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
      style="width: 95%; margin: 0 auto;">
        <el-table-column prop="requisitionId" label="订单号" min-width="180"></el-table-column>
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
              <el-button slot="reference" type="text" style="width: 50px;">{{ scope.row.carNumber }}</el-button>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="公司名称"></el-table-column>
        <el-table-column prop="time" label="投保时间" min-width="120"></el-table-column>
        <el-table-column prop="policy" label="保单" min-width="70">
          <template slot-scope="scope">
            <img src="../../../assets/img/img.png" alt="">
          </template>
        </el-table-column>
        <el-table-column prop="invoice" label="发票" min-width="70">
          <template slot-scope="scope">
            <img src="../../../assets/img/img.png" alt="">
          </template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-button type="text" @click="lookDetail(scope.row)" v-if="scope.row.invoice !== '' && scope.row.policy !== ''">下载保单及发票</el-button>
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
  name: 'VolPolicyAndInvoice',
  data () {
    return {
      gridData: [],
      options: [],
      value: '',
      serchDate: [],
      SortValue: '1',
      NumValue: 10,
      currentPage4: 1,
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
    lookDetail (id) {
      if (id.invoice) {
        window.open(id.invoice)
      } else if (id.policy) {
        window.open(id.policy)
      } else {
        this.$message('没有文件')
      }
    },
    // 查询按钮
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
      this.$fetch('/admin/byStages_a/insuranceInvoice_a', data).then(res => {
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
  }
}
</script>

<style lang="less" scoped>
img {
  height: 30px;
  display: block;
  cursor: pointer;
}
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
</style>
