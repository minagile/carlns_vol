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
      style="width: 95%; margin: 0 auto;border: 1px solid #eee"
      v-loading="loading">
      <el-table-column prop="requisitionId" label="订单号" min-width="150"></el-table-column>
      <el-table-column prop="carNumber" label="车牌" min-width="100"></el-table-column>
      <el-table-column prop="channelName" label="公司"  min-width="300"></el-table-column>
      <el-table-column prop="coverageName" label="险种" width="70"></el-table-column>
      <el-table-column label="投保时间" width="120">
        <template slot-scope="scope">
          {{ scope.row.createTime | timeChange }}
        </template>
      </el-table-column>
      <el-table-column label="退保时间" width="120">
        <template slot-scope="scope">
          {{ scope.row.updateTime | timeChange }}
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="退保原因" width="220"></el-table-column>
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
      gridData: [],
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
      list: [], // 渠道列表
      loading: true
    }
  },
  mounted () {
    this.getData()
    // this.getList()
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
      this.loading = true
      var data = {
        // channelId: '',
        startTime: this.serchDate.startTime,
        endTime: this.serchDate.endTime,
        // corporateName: this.serchDate.selectChannel,
        channelId: this.serchDate.selectChannel,
        requisitionId: this.serchDate.requisitionId,
        order: this.SortValue,
        page: this.pagination.currentPage,
        pageSize: this.pagination.pageSize
      }
      this.$fetch('/user/ucar/getSurrenderCar', data).then(res => {
        this.loading = false
        if (res.code === 0) {
          this.tableData3 = res.data.rows
          this.pagination.total = res.data.records
        }
      })
    }
  },
  components: {
    Selector
  },
  filters: {
    timeChange (data) {
      let date = new Date(data)
      return date.getFullYear() + '-' + zero(date.getMonth() + 1) + '-' + zero(date.getDate())
    },
    carType (val) {
      if (val === -1) return '已退保'
    }
  }
}
function zero (data) {
  if (data < 10) return '0' + data
  return data
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
