<template>
  <div class="home_page">

    <div class="company">
      <el-row class="home-header">
        <div class="el-col" v-for="(o, i) in companyList" :key="i">
          <div class="grid-content total" :class="{companyactive: companyNum === i}" @click="companyTab(i)">
            <p>{{ o.name }}</p>
            <p>{{o.number}}<span>辆</span></p>
            <p v-if="i === 0">查看全部</p>
          </div>
        </div>
      </el-row>

      <div class="body">
        <el-row class="home-body">
          <el-col :span="12">
            <div class="home-body-title">
              <img src="../../assets/img/shouqi.png" alt="">
              首期应付款
            </div>
            <el-table
                :data="tableData"
                style="width: 98%; margin: 0 auto">
                <!-- <el-table-column
                  type="selection"
                  width="55">
                </el-table-column> -->
                <el-table-column
                  prop="requisitionId"
                  label="订单号">
                </el-table-column>
                <el-table-column
                  prop="time"
                  label="时间">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="公司">
                </el-table-column>
                <el-table-column
                  prop="carNumber"
                  label="车辆数">
                </el-table-column>
                <el-table-column
                  prop="coverage"
                  label="险种">
                </el-table-column>
                <el-table-column
                  prop="money"
                  label="金额">
                </el-table-column>
              </el-table>
          </el-col>

          <el-col :span="12">
            <div class="home-body-title">
              <img src="../../assets/img/thisweek.png" alt="">
              本周待还
            </div>
            <el-table
                :data="tableData1"
                style="width: 98%; margin: 0 auto">
                <!-- <el-table-column
                  type="selection"
                  width="55">
                </el-table-column> -->
                <el-table-column
                  prop="requisitionId"
                  label="订单号">
                </el-table-column>
                <el-table-column
                  prop="time"
                  label="时间">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="公司">
                </el-table-column>
                <el-table-column
                  prop="carNumber"
                  label="车辆数">
                </el-table-column>
                <el-table-column
                  prop="coverage"
                  label="险种">
                </el-table-column>
                <el-table-column
                  prop="money"
                  label="金额">
                </el-table-column>
              </el-table>
          </el-col>
        </el-row>
        <el-row class="home-body">
          <el-col :span="12">
            <div class="home-body-title">
              <img src="../../assets/img/warning.png" alt="">
              逾期警告
            </div>
            <el-table
                :data="tableData2"
                style="width: 98%; margin: 0 auto">
                <!-- <el-table-column
                  type="selection"
                  width="55">
                </el-table-column> -->
                <el-table-column
                  prop="requisitionId"
                  label="订单号">
                </el-table-column>
                <el-table-column
                  prop="time"
                  label="时间">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="公司">
                </el-table-column>
                <el-table-column
                  prop="carNumber"
                  label="车辆数">
                </el-table-column>
                <el-table-column
                  prop="coverage"
                  label="险种">
                </el-table-column>
                <el-table-column
                  prop="money"
                  label="金额">
                </el-table-column>
                <el-table-column
                  prop="daysOverdue"
                  label="逾期天数"
                  class-name="yuqi">
                </el-table-column>
              </el-table>
          </el-col>

          <el-col :span="12">
            <div class="home-body-title">
              <img src="../../assets/img/calender.png" alt="">
              还款日历
            </div>
            <el-card class="box-card" :body-style="{ padding: '0px' }">
              <vue-event-calendar :events="demoEvents"  @month-changed="changedMonth($event)">
              <template slot-scope="props">
                <div v-for="(event, index) in props.showEvents" :key="index" class="event-item" @click="$router.push({name: 'ReimbursementDetail'})">
                  <div class="calendar-events">
                    <div class="wrapper">
                      <h3 class="title">{{ event.title }}</h3>
                      <p class="time">{{ event.period }}</p>
                      <p class="desc">{{event.desc}}</p>
                      <p class="desc">{{event.date}}</p>
                    </div>
                  </div>
                </div>
              </template>
            </vue-event-calendar>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data () {
    return {
      companyList: [''],
      // header: ['批次', '时间', '公司', '车辆数', '险种', '金额'],
      tableData: [],
      tableData1: [],
      tableData2: [],
      channel: '1',
      demoEvents: [],
      companyNum: 0
    }
  },
  mounted () {
    this.getHomePage()
    // console.log(sessionStorage.getItem('token'))
  },
  methods: {
    companyTab (i) {
      this.companyNum = i
    },
    changedMonth (e) {
    },
    getHomePage () {
      this.$fetch('/user/homePage_c/accountPayable', {
        // 'channelId': this.channel
      }).then(res => {
        this.tableData = res.data
      })
      this.$fetch('/user/homePage_c/thisWeek', {
        // 'channelId': this.channel
      }).then(res => {
        this.tableData1 = res.data
      })
      this.$fetch('/user/homePage_c/overdue', {
        // 'channelId': this.channel
      }).then(res => {
        this.tableData2 = res.data
      })
      this.$fetch('/user/homePage_c/vehicle', {
        // 'channelId': this.channel
      }).then(res => {
        this.companyList = res.data
        // console.log(this.tableData2)
      })
      // GET /user/homePage_c/calendar
      this.$fetch('/user/homePage_c/calendar').then(res => {
        console.log(res)
        if (res.code === 0) {
          this.demoEvents = res.data
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.home-header {
  margin-bottom: 37px;
  overflow: auto;
  height: 150px;
  width: calc(100% - 40px);
  margin-left: 20px;
  white-space: nowrap;
  margin-right: 20px;
  &:last-child {
    margin-bottom: 0;
  }
  .el-col {
    border-radius: 4px;
    width: 19.14%;
    box-shadow:0px 12px 36px 0px rgba(211,215,221,0.4);
    border-radius:5px;
    margin-right: 10px;
    display: inline-block;
    border:1px solid rgba(216,226,240,1);
  }
  .total {
    background-image: url(../../assets/img/com.png);
    cursor: pointer;
    transition: 1s;
  }
  .companyactive {
    background-image: url(../../assets/img/combg.png);
    cursor: pointer;
    transition: 1s;
    color: #fff;
  }
}
.event-item {
  cursor: pointer;
  &:hover {
    // background: #ecf2ff70;
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
  p:nth-of-type(1) {
    padding-top: 20px;
    font-size: 16px;
    text-indent: 30px;
  }
  p:nth-of-type(2) {
    font-size: 16px;
    text-indent: 30px;
    font-size: 45px;
    span {
      font-size: 16px;
    }
  }
  p:nth-of-type(3) {
    float: right;
    padding-right: 10px;
  }
}
.home_page {
  background: #fff;
  min-height: calc(100% - 100px);
  border-radius: 16px;
  margin: 0 34px;
  padding-top: 58px;
}
.body {
  .el-row {
    display: flex;
    justify-content: space-between;
    margin-left: 20px;
    margin-right: 20px;
  }
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
      font-size:18px;
      font-family:MicrosoftYaHei;
      font-weight:400;
      color:rgba(3,0,0,1);
      border-bottom: 4px solid #F1F1F1;
      img {
        vertical-align: middle;
        width: 22px;
      }
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
.home_page .events-wrapper {
  background-color: #4977FC!important;
}
.el-card__body{
  height: 395px;
  overflow: auto;
}
.yuqi {
  color: red;
}
</style>
