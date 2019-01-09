<template>
  <!-- 操作日志 -->
  <div class="log">
    <div class="ower-table">
      <el-table
        ref="multipleTable"
        :data="tableData"
        style="width: 100%"
        height="580">
        <el-table-column prop="adminName" label="账号"></el-table-column>
        <el-table-column prop="logTime" label="操作时间"></el-table-column>
        <el-table-column prop="logText" label="操作项" ></el-table-column>
      </el-table>
    </div>

    <div class="ower-pages" v-if="pages.total > pages.pageSize">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pages.currentPage"
        :page-sizes="pages.pageSizes"
        :page-size="pages.pageSize"
        layout="sizes, prev, pager, next, total"
        :total="pages.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Log',
  data () {
    return {
      pages: {
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 30, 40],
        total: 10
      },
      tableData: []
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      this.pages.pageSize = val
      this.getData()
    },
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      this.pages.currentPage = val
      this.getData()
    },
    getData () {
      this.$fetch('/admin/logAd/selectAllLog', {
        page: this.pages.currentPage,
        pageSize: this.pages.pageSize
      }).then(res => {
        if (res.code === 0) {
          this.pages.total = res.data.records
          this.tableData = res.data.rows
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.log {
  padding: 50px 30px 30px 30px;
  box-sizing: border-box;
  overflow: auto;
  height: 100%;
}
.el-table::before {
  width: 0
}
</style>
