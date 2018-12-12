<template>
  <!-- 已分期列表 -->
  <div class="StageList">
    <selector
      :all="true"
      :refresh="true"
      @sort="sort"
      @page="page"
      @giveParams="giveParams"
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
      <el-table-column prop="requisitionId" label="订单号"></el-table-column>
      <el-table-column prop="name" label="公司名称"></el-table-column>
      <el-table-column prop="carNumber" label="车辆数"></el-table-column>
      <el-table-column prop="time" label="投保时间"></el-table-column>
      <el-table-column prop="money" label="投保金额"></el-table-column>
      <el-table-column prop="coverage" label="险种"></el-table-column>
      <el-table-column prop="state" label="分期状态"></el-table-column>
      <!-- <el-table-column>
        <template slot-scope="scope">
          <el-button type="text">查看详情</el-button>
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
  name: 'StageList',
  data () {
    return {
      options: [],
      currentPage4: 1,
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
        // channelId: '',
        startTime: this.serchDate.startTime,
        endTime: this.serchDate.endTime,
        corporateName: this.serchDate.selectChannel,
        order: this.SortValue,
        page: this.currentPage4,
        pageSize: this.NumValue
      }
      // console.log(data)
      // GET /user/byStages/stagingList_query
      this.$fetch('/user/byStages/stagingList_query', data).then(res => {
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
  }
}
</script>

<style lang="less" scoped>
.StageList {
  .Amortized-table {
    padding: 0 3.44% 23px 3.44%;
  }
}
</style>

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
.Amortized-table {
    padding: 0 3.44% 23px 3.44%;
  }
</style>
