<template>
  <div class="Volhome_page">

    <div class="company">
      <div class="xuanze">
        <span>选择渠道：</span>
        <!-- <el-select v-model="channelId" placeholder="请选择渠道"  @visible-change="select" @change="change">
          <el-option
            v-for="item in selectAllChannel"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select> -->
        <el-button @click="allc" :class="{all: allchannel === true}">全部渠道</el-button>
        <el-cascader @visible-change="select"
          :options="options2"
          @change="changechan"
          @active-item-change="handleItemChange"
          :props="props"
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
            style="width: 98%; margin: 0 auto">
            <!-- <el-table-column
              type="selection"
              width="55">
            </el-table-column> -->
            <el-table-column
              prop="batch"
              label="批次"
              width=80>
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
            <img src="../../assets/vimg/thisweek.png" alt="">
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
                prop="batch"
                label="批次"
                width=80>
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
            <img src="../../assets/vimg/danger.png" alt="">
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
                prop="batch"
                label="批次"
                width=80>
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
            <img src="../../assets/vimg/calender.png" alt="">
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
      allchannel: true,
      selectAllChannel: [],
      value: '',
      tableData: [],
      tableData1: [],
      tableData2: [],
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
      ],
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
      // console.log(val)
      // console.log(Array.reverse(val))
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
                if (res.data.length > 0) {
                  v.cities = []
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
    },
    getData () {
      this.$fetch('/admin/homePage_a/accountPayable_a', {
        channelId: this.channelId
      }).then(res => {
        if (res.code === 0) {
          this.tableData = res.data
        }
      })
      this.$fetch('/admin/homePage_a/overdue_a', {
        channelId: this.channelId
      }).then(res => {
        if (res.code === 0) {
          this.tableData2 = res.data
        }
      })
      this.$fetch('/admin/homePage_a/thisWeek_a', {
        channelId: this.channelId
      }).then(res => {
        if (res.code === 0) {
          this.tableData1 = res.data
        }
      })
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
  background:rgba(255,240,193,1);
  min-height: calc(100% - 100px);
  border-radius: 16px;
  margin: 0 34px;
  padding-top: 23px;
  img {
    vertical-align: middle;
  }
  .xuanze {
    width: 450px;
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
.yuqi {
  color: red
}
</style>
