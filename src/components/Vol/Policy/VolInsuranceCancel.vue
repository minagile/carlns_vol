<template>
  <!-- 退保保单列表 -->
  <div class="VolInsuranceCancel">
    <Selector :vol="true"/>

    <div class="header">
      <span>排序</span>
      <el-select v-model="value" size="small" placeholder="序号正序">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <span style="margin-left: 40px;margin-right: 20px;">显示</span>
      <el-select v-model="value" size="small">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <span>条</span>
      <el-button size="small">+ 新增退保</el-button>
    </div>

    <el-table
      ref="multipleTable"
      :data="tableData3"
      tooltip-effect="dark"
      border
      style="width: 95%; margin: 0 auto;border: 1px solid #eee"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="date" label="订单号" width="180"></el-table-column>
      <el-table-column prop="name" label="车牌" width="180"></el-table-column>
      <el-table-column prop="name" label="公司"></el-table-column>
      <el-table-column prop="date" label="险种"></el-table-column>
      <el-table-column prop="name" label="投保时间"></el-table-column>
      <el-table-column prop="name" label="退保原因"></el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="10"
      layout="prev, pager, next, total, jumper"
      :total="400">
    </el-pagination>

    <!-- 新增退保 -->
    <el-dialog :visible.sync="centerDialogVisible" width="760px">
      <div class="dialog-header">新增退保</div>
    </el-dialog>
  </div>
</template>

<script>
import Selector from '../../common/Selector'
export default {
  name: 'VolInsuranceCancel',
  data () {
    return {
      centerDialogVisible: true,
      currentPage4: 1,
      tableData3: [{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      options: [],
      value: ''
    }
  },
  mounted () {
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
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
.VolInsuranceCancel {
  .header {
    padding: 10px 0 30px 2.5%;
    .el-button {
      float: right;
      margin-right: 2.5%;
      background:rgba(255,193,7,1);
      border-color:rgba(255,193,7,1);
      border-radius:4px;
    }
  }
}
</style>
