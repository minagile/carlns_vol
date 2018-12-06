<template>
  <!-- 生成报价单 -->
  <div class="QuotationOrder">
    <div class="header">
      <el-select v-model="value4" clearable placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="value4" clearable placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button class="up">上传</el-button>
      <el-button>清空</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuotationOrder',
  data () {
    return {
      options: [{
        value: '选项1',
        label: '黄金糕'
      }],
      value4: ''
    }
  },
  mounted () {
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.QuotationOrder {
  .header {
    height: 70px;
    padding-top: 37px;
    padding-left: 43px;
    border-bottom: 13px solid #EDEDED;
    .up {
      background:rgba(255,193,7,1);
      border-color:rgba(255,193,7,1);
      margin-left: 40px;
    }
  }
}
</style>
