<template>
  <div class="Volhome_page">

    <div class="company">
      <div class="xuanze">
        <span>选择渠道：</span>
        <!-- <el-button @click="allc" :class="{all: allchannel === true}">全部渠道</el-button> -->
        <el-cascader @visible-change="select"
          :options="options2"
          @change="changechan"
          @active-item-change="handleItemChange"
          :props="props"
          :show-all-levels="false"
          :clearable="true"
        ></el-cascader>
      </div>

      <el-row class="home-body">
        <el-col :span="12">
          <div class="home-body-title">
            <img src="../../assets/vimg/first.png" alt="">
            首期应付款
          </div>
            <el-table
              :data="tableData"
              v-loading="loading1"
              style="width: 98%; margin: 0 auto"
              @row-click="jump('VolFirstPeriod')">
              <!-- <el-table-column
                type="selection"
                width="55">
              </el-table-column> -->
              <el-table-column
                prop="requisitionId"
                label="订单号"
                width="180"
                :show-overflow-tooltip="true">
              </el-table-column>
              <el-table-column
                prop="time"
                label="时间"
                width="120"
                :show-overflow-tooltip="true">
              </el-table-column>
              <el-table-column
                prop="name"
                label="公司"
                :show-overflow-tooltip="true">
              </el-table-column>
              <el-table-column
                prop="carNumber"
                label="车辆数"
                width="70"
                :show-overflow-tooltip="true">
              </el-table-column>
              <el-table-column
                prop="coverage"
                label="险种"
                width="70"
                :show-overflow-tooltip="true">
              </el-table-column>
              <el-table-column
                prop="money"
                label="金额"
                :show-overflow-tooltip="true">
              </el-table-column>
            </el-table>
        </el-col>

        <el-col :span="12">
          <div class="home-body-title">
            <img src="../../assets/vimg/thisweek.png" alt="">
            本周待还
          </div>
            <el-table
              :data="tableData1"
              v-loading="loading2"
              style="width: 98%; margin: 0 auto"
              @row-click="jump('VolReimbursementDetail')">
              <!-- <el-table-column
                type="selection"
                width="55">
              </el-table-column> -->
              <el-table-column
                prop="requisitionId"
                label="订单号"
                width="180"
                :show-overflow-tooltip="true">
              </el-table-column>
              <el-table-column
                prop="time"
                label="时间"
                width="120"
                :show-overflow-tooltip="true">
              </el-table-column>
              <el-table-column
                prop="name"
                label="公司"
                :show-overflow-tooltip="true">
              </el-table-column>
              <el-table-column
                prop="carNumber"
                label="车辆数"
                width="70"
                :show-overflow-tooltip="true">
              </el-table-column>
              <el-table-column
                prop="coverage"
                label="险种"
                width="70"
                :show-overflow-tooltip="true">
              </el-table-column>
              <el-table-column
                prop="money"
                label="金额"
                :show-overflow-tooltip="true">
              </el-table-column>
            </el-table>
        </el-col>
      </el-row>
      <el-row class="home-body">
        <el-col :span="12">
          <div class="home-body-title">
            <img src="../../assets/vimg/danger.png" alt="">
            逾期警告
          </div>
            <el-table
              :data="tableData2"
              v-loading="loading3"
              style="width: 98%; margin: 0 auto"
              @row-click="jump('VolReimbursementDetail')">
              <!-- <el-table-column
                type="selection"
                width="55">
              </el-table-column> -->
              <el-table-column
                prop="requisitionId"
                label="订单号"
                width="180"
                :show-overflow-tooltip="true">
              </el-table-column>
              <el-table-column
                prop="time"
                label="时间"
                width="120"
                :show-overflow-tooltip="true">
              </el-table-column>
              <el-table-column
                prop="name"
                label="公司"
                :show-overflow-tooltip="true">
              </el-table-column>
              <el-table-column
                prop="carNumber"
                label="车辆数"
                width="70"
                :show-overflow-tooltip="true">
              </el-table-column>
              <el-table-column
                prop="coverage"
                label="险种"
                width="70"
                :show-overflow-tooltip="true">
              </el-table-column>
              <el-table-column
                prop="money"
                label="金额"
                :show-overflow-tooltip="true">
              </el-table-column>
              <el-table-column
                prop="daysOverdue"
                label="逾期天数"
                class-name="yuqi"
                :show-overflow-tooltip="true">
              </el-table-column>
            </el-table>
        </el-col>

        <el-col :span="12">
          <div class="home-body-title">
            <img src="../../assets/vimg/calender.png" alt="">
            还款日历
          </div>
          <el-card class="box-card" :body-style="{ padding: '0px' }">
            <vue-event-calendar :events="demoEvents"  @day-changed="changedMonth($event)">
              <template slot-scope="props">
                <div class="clock_img" v-show="!events">
                  <img src="../../assets/vimg/eventsimg.png" alt="">
                </div>
                <div v-show="events" v-for="(event, index) in props.showEvents" :key="index" class="event-item" @click="$router.push({name: 'VolReimbursementDetail'})">
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
</template>

<script>
export default {
  name: 'VolHomePage',
  data () {
    return {
      loading1: true,
      loading2: true,
      loading3: true,
      allchannel: true,
      selectAllChannel: [],
      value: '',
      tableData: [],
      tableData1: [],
      tableData2: [],
      events: false,
      demoEvents: [],
      channelId: null,
      options2: [{
        label: '江苏',
        cities: []
      }, {
        label: '浙江',
        cities: []
      }],
      props: {
        // value: 'label',
        label: 'label',
        value: 'value',
        children: 'cities'
      }
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    allc () {
      this.channelId = null
      this.allchannel = true
      this.getData()
    },
    changechan (val) {
      this.channelId = val[val.length - 1]
      this.allchannel = false
      this.getData()
    },
    handleItemChange (val) {
      // console.log(val)
      setTimeout(_ => {
        var id = ''
        // POST /admin/channel/getNextChannel
        this.options2.forEach((v, k) => {
          if (v.value === val[0]) {
            id = v.value
            this.$post('/admin/channel/getNextChannel', {
              parentId: id
            }).then(res => {
              // console.log(res)
              if (res.code === 0) {
                v.cities = []
                if (res.data.length > 0) {
                  v.cities = [{ label: v.label, value: v.value }]
                  res.data.forEach(m => {
                    v.cities.push({ label: m.channelName, value: m.channelId })
                  })
                } else {
                  v.cities.push({ label: v.label, value: v.value })
                }
              }
            })
          }
        })
      }, 300)
    },
    change () {
      this.getData()
    },
    // 查询所有渠道
    select (val) {
      if (val === true) {
        // this.selectAllChannel = []
        this.options2 = []
        // GET /admin/channel/getOneChannel
        this.$fetch('/admin/channel/getOneChannel').then(res => {
          // console.log(res.data)
          if (res.code === 0) {
            res.data.forEach(v => {
              this.options2.push({value: v.channelId, label: v.channelName, cities: []})
              // this.selectAllChannel.push({value: v.channelId, label: v.channelName})
            })
          } else {
            this.$message(res.msg)
          }
        })
      }
    },
    changedMonth (e) {
      this.events = true
    },
    getData () {
      this.$fetch('/admin/homePage_a/accountPayable_a', {
        channelId: this.channelId
      }).then(res => {
        this.loading1 = false
        if (res.code === 0) {
          this.tableData = res.data
        }
      })
      this.$fetch('/admin/homePage_a/overdue_a', {
        channelId: this.channelId
      }).then(res => {
        this.loading2 = false
        if (res.code === 0) {
          this.tableData2 = res.data
        }
      })
      this.$fetch('/admin/homePage_a/thisWeek_a', {
        channelId: this.channelId
      }).then(res => {
        this.loading3 = false
        if (res.code === 0) {
          this.tableData1 = res.data
        }
      })
      // GET /admin/homePage_a/calendar
      this.$fetch('/admin/homePage_a/calendar').then(res => {
        // console.log(res)
        if (res.code === 0) {
          this.demoEvents = res.data
        }
      })
    },
    // 点击跳转
    jump (name) {
      // console.log(name)
      this.$router.push({name: name})
    }
  }
}
</script>

<style lang="less" scoped>
.home_page .events-wrapper {
  position: relative;
}
.clock_img {
  position: absolute;
  background: #fff;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  img {
    display: block;
  }
}
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
  background:rgba(255,240,193,1);
  min-height: calc(100% - 100px);
  border-radius: 16px;
  margin: 0 34px;
  padding-top: 23px;
  img {
    vertical-align: middle;
  }
  .xuanze {
    width: 350px;
    height:56px;
    background:rgba(255,255,255,1);
    border-radius:28px;
    margin: 0 35px 23px 34px;
    padding: 0 12px 0 17px;
    box-sizing: border-box;
    .all {
      background: #FFC107;
    }
    span {
      line-height: 56px;
    }
    .el-select {
      // width: 227px;
    }
  }
}
.event-item {
  cursor: pointer;
  &:hover {
    background: #fff0c1;
  }
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
    box-shadow:0px 4px 7px 1px rgba(0, 0, 0, 0.08);
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
  /* width: 45px; */
}
.el-card__body{
  height: 395px;
  overflow: auto;
}
.Volhome_page .events-wrapper {
  background-color: #FFC107!important;
}
.Volhome_page .is-event {
  border-color: #FFC107!important;
}
.Volhome_page .event .date-num {
  color: #FFC107!important;
}
.Volhome_page .selected-day .date-num {
  color: #fff!important;
}
.Volhome_page .selected-day .is-event {
  background-color: #FFC107!important;
}
.Volhome_page .is-today {
  background-color: #FFC107!important;
}
.yuqi {
  color: red
}
</style>
