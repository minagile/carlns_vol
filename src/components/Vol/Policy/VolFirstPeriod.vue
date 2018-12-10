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
      tooltip-effect="light"
      border
      style="width: 95%; margin: 0 auto;border: 1px solid #eee"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="date" label="订单号" width="120"></el-table-column>
      <el-table-column prop="date" label="公司名称" width="120"></el-table-column>
      <el-table-column prop="date" label="车辆数" width="120"></el-table-column>
      <el-table-column prop="date" label="险种" width ="120"></el-table-column>
      <el-table-column prop="name" label="投保时间" width="120"></el-table-column>
      <el-table-column label="支付操作">
        <template slot-scope="scope">
          <el-button class="yellow" size="mini">已支付</el-button>
          <el-button size="mini">未支付</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="10"
      layout="prev, pager, next, total, jumper"
      :total="400">
    </el-pagination>
  </div>
</template>

<script>
import Selector from '../../common/Selector'
export default {
  name: 'VolFirstPeriod',
  data () {
    return {
      currentPage4: 1,
      tableData3: [],
      serchDate: [],
      SortValue: '1',
      NumValue: 10,
      value: ''
    }
  },
  mounted () {
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
        channelId: '',
        startTime: this.serchDate.startTime,
        endTime: this.serchDate.endTime,
        corporateName: this.serchDate.selectChannel,
        order: this.SortValue,
        page: this.currentPage4,
        pageSize: this.NumValue
      }
      console.log(data)
      // this.$fetch('/admin/byStages_a/reimbursementDetail_a', data).then(res => {
      //   console.log(res)
      // })
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
.VolFirstPeriod {
  .header {
    padding-bottom: 20px;
  }
}
</style>
