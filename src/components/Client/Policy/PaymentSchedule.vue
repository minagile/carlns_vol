<template>
  <!-- 付款计划表列表 -->
  <div class="PaymentSchedule">
     <Selector />

    <div class="header" style="width: 95%; margin: 0 auto">
      <span>排序</span>
      <el-select v-model="value" size="small" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <span>显示</span>
      <el-select v-model="value" size="small" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <span>条</span>
      <el-button size="small">刷新</el-button>
    </div>

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
      <el-table-column prop="date" label="险种" width="120"></el-table-column>
      <el-table-column prop="name" label="投保时间" width="120"></el-table-column>
      <el-table-column label="付款计划表">
        <template slot-scope="scope">
          <img src="../../../assets/img/list1.png" alt="">
          <el-button type="text">点击查看报价单</el-button>
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
  name: 'PaymentSchedule',
  data () {
    return {
      currentPage4: 1,
      tableData3: [{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-08',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-06',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-07',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
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
.PaymentSchedule {
  .header {
    padding-bottom: 20px;
  }
}
</style>
