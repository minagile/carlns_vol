<template>
  <!-- 报价单列表 -->
  <div class="VolQuotation">
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
      style="width: 95%; margin: 0 auto;border: 1px solid #eee"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="requisitionId" label="订单号" width="120"></el-table-column>
      <el-table-column prop="channelName" label="公司名称" width="120"></el-table-column>
      <el-table-column prop="carSum" label="车辆数" width="120"></el-table-column>
      <el-table-column prop="coverageName" label="险种" width="120"></el-table-column>
      <el-table-column prop="createTime" label="投保时间" width="120"></el-table-column>
      <el-table-column label="报价单">
        <template slot-scope="scope">
          <img src="../../../assets/img/list1.png" alt="">
          <el-button type="text">点击查看报价单</el-button>
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
  name: 'VolQuotation',
  data () {
    return {
      currentPage4: 1,
      tableData3: [],
      value: '',
      serchDate: [],
      SortValue: '1',
      NumValue: 10,
      total: 0
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
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
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
      this.$fetch('/admin/requisition/getquotationList', data).then(res => {
        if (res.code === 0) {
          console.log(res.data)
          this.tableData3 = res.data.rows
          this.total = res.data.records
        } else {
          this.$message(res.msg)
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
.el-pagination  {
  margin-top: 50px;
}
.VolQuotation {
  .header {
    padding-bottom: 20px;
  }
}
</style>
