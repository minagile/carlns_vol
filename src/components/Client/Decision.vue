<template>
  <!-- 决策支持 -->
  <div class="Decision">
    <selector :all="true"></selector>
    <chart></chart>
  </div>
</template>

<script>
import Selector from '../common/Selector'
import Chart from './Decision/Chart'
export default {
  name: 'Decision',
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {},
  components: {
    Selector,
    Chart
  }
}
</script>

<style lang="less" scoped>
.Decision {
  background: #fff;
  min-height: calc(100% - 100px);
  border-radius: 16px;
  margin: 0 34px;
  box-sizing: border-box;
  .Selector {
    border-bottom: 20px solid #F2F2F2;
  }
}
</style>
