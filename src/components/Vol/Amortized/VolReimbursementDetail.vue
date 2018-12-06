<template>
  <!-- 还款明细 -->
  <div class="VolReimbursementDetail">
    <selector :all="true" :vol="true"></selector>

    <div class="Amortized-sort">
      <span>排序</span>
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <span>显示</span>
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <span>条</span>
      <!-- <button>刷新</button> -->
    </div>

    <div class="Amortized-table">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="date" label="订单号" width="180"></el-table-column>
        <el-table-column prop="name" label="公司名称" width="180"></el-table-column>
        <el-table-column prop="name" label="车辆数"></el-table-column>
        <el-table-column prop="date" label="投保时间"></el-table-column>
        <el-table-column prop="name" label="车投保金额"></el-table-column>
        <el-table-column prop="name" label="车险种"></el-table-column>
        <el-table-column prop="name" label="分期状态"></el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-button type="text">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

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
  </div>
</template>

<script>
import Selector from '../../common/Selector'
export default {
  name: 'VolReimbursementDetail',
  data () {
    return {
      currentPage4: 1,
      options: [],
      value: '',
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
.VolReimbursementDetail {
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
    button {
      width:88px;
      height:35px;
      background:rgba(255,255,255,1);
      border:1px solid rgba(232,232,232,1);
      border-radius:4px;
      float: right;
      color: #4977FC;
    }
  }
  .Amortized-table {
    padding: 0 3.44% 23px 3.44%;
  }
  .el-pagination  {
    margin-top: 50px;
  }
}
</style>
