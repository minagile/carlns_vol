<template>
  <!-- 还款明细 -->
  <div class="ReimbursementDetail">
    <selector
      :refresh="true"
      @sort="sort"
      @page="page"
      @giveParams="giveParams"
    >
    </selector>

    <div class="Amortized-table">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="date" label="还款时间" width="180"></el-table-column>
        <el-table-column prop="name" label="还款金额" width="180"></el-table-column>
        <el-table-column prop="name" label="分期状态"></el-table-column>
        <el-table-column prop="date" label="批次"></el-table-column>
        <el-table-column prop="name" label="公司名称"></el-table-column>
        <el-table-column prop="name" label="投保时间"></el-table-column>
        <el-table-column prop="name" label="险种"></el-table-column>
        <el-table-column prop="name" label="车辆数"></el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-button type="text">待还款</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

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
  name: 'ReimbursementDetail',
  data () {
    return {
      options: [],
      currentPage4: 1,
      value: '',
      serchDate: [],
      SortValue: '1',
      NumValue: 10,
      total: 0,
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ]
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
      // this.$fetch('/user/byStages/stagingList_query', data).then(res => {
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
}
.Amortized-table {
  padding: 0 3.44% 23px 3.44%;
}
.el-pagination  {
  margin-top: 50px;
}
</style>
