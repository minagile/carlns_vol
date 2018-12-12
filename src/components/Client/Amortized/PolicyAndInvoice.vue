<template>
  <!-- 保单及发票管理 -->
  <div class="PolicyAndInvoice">
    <selector
      :all="true"
      :refresh="true"
      @sort="sort"
      @page="page"
      @giveParams="giveParams"
      @reload="reload"
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
      <el-table-column prop="carNumber" label="车辆数"></el-table-column>
      <el-table-column prop="batch" label="批次"></el-table-column>
      <el-table-column prop="name" label="公司名称"></el-table-column>
      <el-table-column prop="time" label="投保时间"></el-table-column>
      <el-table-column prop="policy" label="保单">
        <template slot-scope="scope">
          <img src="../../../assets/img/img.png" alt="">
        </template>
      </el-table-column>
      <el-table-column prop="invoice" label="发票">
        <template slot-scope="scope">
          <img src="../../../assets/img/img.png" alt="">
        </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button type="text" @click="lookDetail(scope.row)">下载保单及发票</el-button>
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
  name: 'PolicyAndInvoice',
  data () {
    return {
      options: [],
      value: '',
      currentPage4: 1,
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
    reload () {
      this.getData()
    },
    lookDetail (id) {
      window.open(id.invoice)
      window.open(id.policy)
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
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    getData () {
      var data = {
        startTime: this.serchDate.startTime,
        endTime: this.serchDate.endTime,
        corporateName: this.serchDate.selectChannel,
        order: this.SortValue,
        page: this.currentPage4,
        pageSize: this.NumValue
      }
      // console.log(data)
      // GET /user/byStages/insuranceInvoice
      this.$fetch('/user/byStages/insuranceInvoice', data).then(res => {
        // console.log(res)
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
