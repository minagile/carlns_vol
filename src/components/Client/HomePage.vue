<template>
  <div class="home_page">
    <div class="company">
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data () {
    return {}
  },
  mounted () {
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.el-row {
  margin-bottom: 20px;
  width: 100%;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.home_page {
  background: #fff;
  min-height: calc(100% - 100px);
  border-radius: 16px;
  margin: 0 34px;
}
</style>
