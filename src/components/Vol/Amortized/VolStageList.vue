<template>
  <!-- 已分期列表 -->
  <div class="VolStageList">
    <selector
      :all="true"
      :vol="true"
      @sort="sort"
      @page="page"
      @giveParams="giveParams"
    >
    </selector>

    <div class="Amortized-table">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="date" label="还款时间" width="180"></el-table-column>
        <el-table-column prop="name" label="还款金额" width="180"></el-table-column>
        <el-table-column prop="name" label="批次"></el-table-column>
        <el-table-column prop="date" label="公司名称"></el-table-column>
        <el-table-column prop="name" label="投保时间"></el-table-column>
        <el-table-column prop="name" label="险种"></el-table-column>
        <el-table-column prop="name" label="车辆数"></el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-button type="text">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

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
  name: 'VolStageList',
  data () {
    return {
      currentPage4: 1,
      tableData: [],
      serchDate: {},
      SortValue: '1',
      NumValue: 10
    }
  },
  mounted () {
  },
  methods: {
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
.Amortized-table {
  padding: 0 3.44% 23px 3.44%;
}
.el-pagination  {
  margin-top: 50px;
}
</style>
