<template>
  <!-- 退保保单列表 -->
  <div class="InsuranceCancel">
   <selector
      :refresh="true"
      @sort="sort"
      @page="handleSizeChange"
      @giveParams="giveParams"
      :channelList="list"
      @getData="getData"
    >
    </selector>

    <el-table
      ref="multipleTable"
      :data="tableData3"
      tooltip-effect="dark"
      max-height="450"
      border
      style="width: 95%; margin: 0 auto;border: 1px solid #eee">
      <el-table-column prop="requisitionId" label="订单号"></el-table-column>
      <el-table-column prop="channelName" label="公司名称"></el-table-column>
      <el-table-column prop="carNumber" label="车辆数"></el-table-column>
      <el-table-column prop="coverageName" label="险种"></el-table-column>
      <el-table-column prop="createTime" label="投保时间"></el-table-column>
      <el-table-column prop="remark" label="退保原因"></el-table-column>
    </el-table>

    <el-pagination  v-if="pagination.total > pagination.pageSize"
      @current-change="handleCurrentChange"
      :current-page="pagination.currentPage"
      :page-sizes="pagination.pageSizes"
      :page-size="pagination.pageSize"
      layout="prev, pager, next, total, jumper"
      :total="pagination.total">
    </el-pagination>
  </div>
</template>

<script>
import Selector from '../../common/Selector'
export default {
  name: 'InsuranceCancel',
  data () {
    return {
      options: [],
      value: '',
      currentPage4: 1,
      serchDate: [],
      SortValue: '1',
      tableData3: [],
      pagination: {
        pageSize: 10,
        pageSizes: [10, 20, 30, 40, 50],
        currentPage: 1,
        total: 0
      },
      list: [] // 渠道列表
    }
  },
  mounted () {
    this.getData()
    this.getList()
  },
  methods: {
    getList () {
      this.$post('/user/uchannel/getNextChannel').then(res => {
        this.list = res.data
      })
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
    handleSizeChange (val) { // 一页几条数据
      this.pagination.pageSize = val
      this.getData()
    },
    handleCurrentChange (val) {
      this.pagination.currentPage = val
      this.getData()
    },
    getData () {
      var data = {
        beginTime: this.serchDate.startTime,
        endTime: this.serchDate.endTime,
        channelName: this.serchDate.selectChannel,
        order: this.SortValue,
        page: this.pagination.currentPage,
        pageSize: this.pagination.pageSize
      }
      this.$fetch('/user/ucar/getSurrenderCar', data).then(res => {
        if (res.code === 0) {
          this.tableData3 = res.data.rows
          this.pagination.total = res.data.records
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
.InsuranceCancel {
  .header {
    padding-bottom: 20px;
    .el-button {
      float: right;
      width: 88px;
      height: 36px;
      background-image: url(../../../assets/img/refresh.png);
    }
  }
}
</style>
