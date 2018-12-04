<template>
  <div class="home_page">
    <div class="company">
      <el-row :gutter="14">
        <el-col :span="4" v-for="(o, i) in companyList" :key="i">
          <div class="grid-content">
            <p>{{ o }}</p>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data () {
    return {
      companyList: ['蓝途新能源汽车（上海）有限公司', '蓝途', '衡虎', '蓝速衡富', '蓝途零部件']
    }
  },
  mounted () {
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.el-row {
  margin-bottom: 37px;
  margin-left: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
  width: 300px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
  height: 125px;
  background:rgba(255,255,255,1);
  // border:1px solid rgba(216,226,240,1);
  box-shadow:0px 12px 36px 0px rgba(211,215,221,0.4);
  border-radius:5px;
  color: #1C1A1D;
  p {
    line-height: 50px;
    font-size: 16px;
    text-indent: 30px;
  }
}
.home_page {
  background: #fff;
  min-height: calc(100% - 100px);
  border-radius: 16px;
  margin: 0 34px;
  padding-top: 58px;
}
</style>
