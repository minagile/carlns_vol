<template>
  <!-- 缴费通知单列表 -->
  <div class="DebitNote">
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
      tooltip-effect="light"
      border
      max-height="450"
      style="width: 95%; margin: 0 auto;border: 1px solid #eee"
      v-loading="loading">
      <el-table-column prop="requisitionId" label="订单号" min-width="180"></el-table-column>
      <el-table-column prop="channelName" label="公司名称"></el-table-column>
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
            <el-button slot="reference" type="text" style="width: 50px;">{{ scope.row.carSum }}</el-button>
          </el-popover>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="date" label="险种"></el-table-column> -->
      <el-table-column label="投保时间" min-width="120">
        <template slot-scope="scope">
          {{ scope.row.createTime | timeChange }}
        </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button type="text" @click="watchDetail(scope.row.requisitionId)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination v-if="pagination.total > pagination.pageSize"
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
  name: 'DebitNote',
  data () {
    return {
      gridData: [],
      options: [],
      value: '',
      currentPage4: 1,
      serchDate: [],
      SortValue: '1',
      NumValue: 10,
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
    // page (data) {
    //   this.NumValue = data
    //   this.getData()
    // },
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
        page: this.currentPage4,
        pageSize: this.NumValue
      }
      this.$fetch('/user/urequisition/getRequisitionList', data).then(res => {
        this.loading = false
        if (res.code === 0) {
          this.tableData3 = res.data.rows
          this.pagination.total = res.data.records
        }
      })
    },
    watchDetail (id) {
      this.$post('/user/urequisition/getFilesAddress', {
        requisitionId: id
      }).then(res => {
        if (res.code === 0) {
          location.href = res.data
          this.$message({
            message: res.msg,
            type: 'success'
          })
        } else if (res.code === 1) {
          this.$message({
            message: res.msg,
            type: 'error'
          })
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
.DebitNote {
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
