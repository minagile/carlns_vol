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
      <el-button size="small" @click="centerDialogVisible = true">+ 新增退保</el-button>
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
      <div class="top">
        <el-select v-model="value" placeholder="请输入公司名称">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="value" placeholder="请输入车牌号">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button class="check">查询</el-button>
        <el-button>清空</el-button>
      </div>
      <table>
        <tr>
          <th>车牌号</th>
          <th>公司</th>
          <th>险种</th>
          <th>投保时间</th>
          <th>操作</th>
        </tr>
        <tr>
          <td>沪A00000</td>
          <td>xxxx股份有限公司</td>
          <td>商业险</td>
          <td>2018-12-03</td>
          <td><el-button size="small" @click="innerVisible = true">退保</el-button></td>
        </tr>
      </table>
      <el-dialog
        width="420px"
        :visible.sync="innerVisible"
        append-to-body
        :show-close="false"
        top="400px">
        <el-input type="textarea" placeholder="请输入退保原因" style="margin:-50px 20px 0;width: 380px;"></el-input>
        <div class="btn">
          <el-button class="sure" size="small">确定</el-button>
          <el-button class="back" size="small" @click="innerVisible = false">返回</el-button>
        </div>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import Selector from '../../common/Selector'
export default {
  name: 'VolInsuranceCancel',
  data () {
    return {
      centerDialogVisible: false,
      currentPage4: 1,
      tableData3: [{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      options: [],
      value: '',
      innerVisible: false
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
  // margin-top: 50px;
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
      &:hover {
        color: #333;
      }
      &:focus {
        color: #333;
      }
    }
  }
  .el-dialog {
    .top {
      height: 60px;
      border-bottom: 10px solid #F6F6F6;
      padding-left: 20px;
      .el-select {
        margin-right: 35px;
      }
      .el-select .el-input {
        width: 251px;
      }
      .check {
        border:1px solid rgba(40,40,40,1);
        color:rgba(40,40,40,1);
      }
      .el-button:hover, .el-button:focus {
        background: #fff;
        color:rgba(40,40,40,1);
        border-color:rgba(40,40,40,1);
      }
    }
    table {
      border-collapse: collapse;
      width: 100%;
      height: 500px;
      th {
        height: 60px;
      }
      tr {
        text-align: center;
      }
    }
  }
}
.btn {
  text-align: right;
  margin-top: 20px;
  margin-right: 20px;
  .el-button:hover {
    color: #333;
    background: #fff;
  }
  .sure {
    background: #FFC107;
    color: #333;
    &:hover {
      background: #FFC107;
    }
  }
}
</style>
