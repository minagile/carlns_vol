<template>
  <!-- 还款明细 -->
  <div class="ReimbursementDetail">
    <selector :all="true"></selector>

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
      <button>刷新</button>
    </div>

    <div class="Amortized-table">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import Selector from '../../common/Selector'
export default {
  name: 'ReimbursementDetail',
  data () {
    return {
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
  methods: {},
  components: {
    Selector
  }
}
</script>

<style lang="less" scoped>
.ReimbursementDetail {
}
</style>
