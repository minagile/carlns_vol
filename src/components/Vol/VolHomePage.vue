<template>
  <div class="Volhome_page">

    <div class="company">
      <el-row class="home-header">
        <el-col :span="4" v-for="(o, i) in companyList" :key="i">
          <div class="grid-content">
            <p>{{ o }}</p>
          </div>
        </el-col>
      </el-row>

      <el-row class="home-body">
        <el-col :span="12">
          <div class="home-body-title">
            首期应付
          </div>
           <el-table
              :data="tableData"
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
        </el-col>

        <el-col :span="12">
          <div class="home-body-title">
            本周代还
          </div>
           <el-table
              :data="tableData"
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
        </el-col>
      </el-row>
      <el-row class="home-body">
        <el-col :span="12">
          <div class="home-body-title">
            逾期警告
          </div>
           <el-table
              :data="tableData"
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
        </el-col>

        <el-col :span="12">
          <div class="home-body-title">
            还款日历
          </div>
          <el-card class="box-card" :body-style="{ padding: '0px' }">
            <vue-event-calendar :events="demoEvents" @month-changed="changedMonth($event)"></vue-event-calendar>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VolHomePage',
  data () {
    return {
      companyList: ['蓝途新能源汽车（上海）有限公司', '蓝途', '衡虎', '蓝速衡富', '蓝途零部件'],
      // header: ['批次', '时间', '公司', '车辆数', '险种', '金额'],
      tableData: [],
      demoEvents: [
        {
          date: '2018/12/15',
          title: 'eat',
          desc: 'longlonglong description'
        },
        {
          date: '2018/12/12',
          title: 'this is a title'
        }
      ]
    }
  },
  mounted () {
  },
  methods: {
    changedMonth (e) {
    }
  }
}
</script>

<style lang="less" scoped>
.home-header {
  margin-bottom: 37px;
  &:last-child {
    margin-bottom: 0;
  }
  .el-col {
    border-radius: 4px;
    width: 19.14%;
    box-shadow:0px 12px 36px 0px rgba(211,215,221,0.4);
    border-radius:5px;
  }
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
.Volhome_page {
  background: #fff;
  min-height: calc(100% - 100px);
  border-radius: 16px;
  margin: 0 34px;
  padding-top: 58px;
}
.el-row {
  display: flex;
  justify-content: space-between;
  margin-left: 20px;
  margin-right: 20px;
}
.home-body {
  // .el-col:nth-of-type(1) {
  //   margin-right: 24px;
  // }
  .el-col {
    background:rgba(255,255,255,1);
    box-shadow:0px 4px 8px 0px rgba(0, 0, 0, 0.35);
    border-radius:10px;
    margin-bottom: 29px;
    height: 450px;
    box-sizing: border-box;
    width: 48.39%;
    .home-body-title {
      padding: 9px 18px;
      font-size:24px;
      font-family:MicrosoftYaHei;
      font-weight:400;
      color:rgba(3,0,0,1);
      border-bottom: 4px solid #F1F1F1;
    }
    .el-table {
      overflow: auto;
      height: 390px;
    }
  }
}
.el-table::before {
  display: none;
}
.cal-wrapper {
  height: 358px;
}
</style>

<style>
.item {
  height: 45px;
}
.events-wrapper {
  background-color: #4977FC!important;
}
.el-card__body{
  height: 395px;
  overflow: auto;
}
</style>
