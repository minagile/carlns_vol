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
      max-height="500"
      style="width: 95%; margin: 0 auto;border: 1px solid #eee"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="requisitionId" label="订单号"></el-table-column>
      <el-table-column prop="channelName" label="公司名称"></el-table-column>
      <el-table-column prop="carSum" label="车辆数"></el-table-column>
      <el-table-column prop="coverageName" label="险种"></el-table-column>
      <el-table-column prop="createTime" label="投保时间"></el-table-column>
      <el-table-column label="付款计划表">
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
  name: 'VolPaymentSchedule',
  data () {
    return {
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
.VolPaymentSchedule {
  .header {
    padding-bottom: 20px;
  }
}
</style>
