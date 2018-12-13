<template>
  <div class="chart animated flipInY">
    <selector :all="true" :vol="true"  @giveParams="allTime" :channelList="channelList" :sortTable="false"></selector>
    <div class="con">
      <div class="btn">
        <button
          v-for="(btn, index) in btnList"
          :key="index"
          :class="{active : num == index}"
          @click="getData(btn.url, index)"
        >
          {{btn.name}}
        </button>
      </div>
      <div class="change">
        <button :class="{active : num1 === 0}" @click="changeChart(0)"><span class="iconfont">&#xe698;</span></button>
        <button :class="{active : num1 === 1}" @click="changeChart(1)"><span class="iconfont">&#xe637;</span></button>
      </div>
      <div id="main" style="width: 59.55%;height:432px;background: #fff;margin: 0 auto;" v-show="num1 === 0 && this.url !== 'CoverageOf'"></div>
      <div id="main1"  style="width: 59.55%;height:432px;background: #fff;margin: 0 auto;" v-show="num1 === 0 && this.url === 'CoverageOf'"></div>
      <div id="main2" v-show="this.url === 'xqj'" style="width: 59.55%;height:432px;background: #fff;margin: 0 auto;"></div>

      <el-table
        :data="chartData"
        height="250"
        border
        style="width: 60.38%;margin: 100px auto 0 auto;"
        v-show="num1 === 1"
        :span-method="objectSpanMethod">
        <el-table-column prop="channelName" label="渠道"></el-table-column>
        <el-table-column prop="commercial" label="商业险" v-if="url === 'CoverageOf' || url === 'TotalAmountInStages' || url === 'ChannelsOf'"></el-table-column>
        <el-table-column prop="carrtaffic" label="交强险" v-if="url === 'CoverageOf' || url === 'TotalAmountInStages' || url === 'ChannelsOf'"></el-table-column>
        <el-table-column prop="price" label="总计" v-if="url !== 'CoverageOf'"></el-table-column>
        <el-table-column prop="total" label="合计" v-if="url === 'CoverageOf'"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import Selector from '../../common/Selector'
var echarts = require('echarts/lib/echarts')
// 引入柱状图
require('echarts/lib/chart/bar')
require('echarts/lib/chart/pie')
require('echarts/lib/chart/line')
// 引入提示框和标题组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/legend')
export default {
  name: 'Chart',
  data () {
    return {
      btnList: [
        {
          name: '分期总金额',
          url: 'TotalAmountInStages'
        },
        {
          name: '还款总金额',
          url: 'TotalAmountOfRepayment'
        },
        {
          name: '渠道占比',
          url: 'ChannelsOf'
        },
        {
          name: '还款率',
          url: 'RepaymentRate'
        },
        {
          name: '逾期率',
          url: 'OverdueRate'
        },
        {
          name: '退保率',
          url: 'SurrenderRate'
        },
        {
          name: '险种占比',
          url: 'CoverageOf'
        },
        {
          name: '还款总金额趋势图',
          url: 'xqj'
        }
      ],
      num: 0,
      num1: 0,
      selectData: {}, // 参数
      chartData: [], // 图表数据
      channelList: [], // 渠道列表
      url: '',
      chartX: [],
      chartY: [],
      chartYY: []
    }
  },
  mounted () {
    this.getData('TotalAmountInStages', 0)
    this.getChannelList()
  },
  methods: {
    changeChart (e) { // 切换图标和表格
      this.num1 = e
    },
    getData (data, index) { // 选择按钮，触发父组件改变图标数据
      this.url = data
      this.num = index
      this.url = data
      // let sum = 0
      this.$post(`/admin/report/${data}`, this.selectData).then(res => {
        // res
        this.chartData = res
        // this.chartData.forEach(i => {
        //   i.sum = sum
        // })
        if (data === 'CoverageOf') {
          this.getEchartDb()
        } else if (data === 'xqj') {
          this.getEchartDb()
        } else {
          this.getEchart()
        }
      })
    },
    allTime (data) { // 处理子组件数据
      if (data.selectChannel === '' && data.startTime !== '') {
        this.selectData = {
          startTime: data.startTime,
          endTime: data.endTime
        }
      } else if (data.startTime === '' && data.selectChannel !== '') {
        this.selectData = {
          channelId: data.selectChannel
        }
      } else if (data.startTime && data.selectChannel !== '') {
        this.selectData = {
          startTime: data.startTime,
          endTime: data.endTime,
          channelId: data.selectChannel
        }
      } else {
        this.selectData = {}
      }
      this.getData(this.url, this.num)
    },
    getChannelList () { // 获取渠道列表
      this.$fetch('/admin/report/getChannelName').then(res => {
        this.channelList = res
      })
    },
    objectSpanMethod ({ row, column, rowIndex, columnIndex }) {
      // if (columnIndex === 2) {
      //   return {
      //     rowIndex: 2,
      //   }
      // }
    },
    getEchart () {
      let chartX = []
      let chartY = []
      this.chartData.forEach(v => {
        chartX.push(v.channelName)
        chartY.push(v.price)
      })
      let myChart = echarts.init(document.getElementById('main'))
      myChart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: chartX,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '销售额',
            nameTextStyle: {
              color: '#666666'
            },
            nameGap: 24,
            axisLine: {
              lineStyle: {
                color: '#C6C8C9'
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: '#666666'
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dotted'
              }
            }
          }
        ],
        series: [
          {
            name: '直接访问',
            type: 'bar',
            barWidth: '30%',
            data: chartY,
            itemStyle: {
              normal: {
                color: function (params) {
                  var colorList = ['#F0788F', '#DE76CA', '#9972E7', '#6E72EA']
                  return colorList[params.dataIndex]
                }
              }
            }
          }
        ]
      })
    },
    getEchartDb () {
      let chartX = []
      let chartY = []
      let chartYY = []
      this.chartData.forEach(v => {
        chartX.push(v.channelName)
        chartY.push(v.carrtafficRate)
        chartYY.push(v.commercialRate)
      })
      const label = {
        show: true,
        rotate: 90,
        position: 'insideBottom',
        offset: [5, -50]
      }
      let myChart1 = echarts.init(document.getElementById('main1'))
      myChart1.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: chartX,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '销售额',
            nameTextStyle: {
              color: '#666666'
            },
            nameGap: 24,
            axisLine: {
              lineStyle: {
                color: '#C6C8C9'
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: '#666666'
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dotted'
              }
            }
          }
        ],
        series: [
          {
            name: '交强险占比',
            type: 'bar',
            barWidth: '30%',
            data: chartY,
            label: label,
            // barWidth: 30,
            itemStyle: {
              color: '#5F72B4'
            }
          },
          {
            name: '商业险占比',
            type: 'bar',
            barWidth: '30%',
            data: chartYY,
            label: label,
            // barWidth: 30,
            itemStyle: {
              color: '#FE6F5F'
            }
          }
        ]
      })
    }
  },
  components: {
    Selector
  }
}
</script>

<style lang="less" scoped>
.animated {
  -webkit-animation-duration: 2s;
  animation-duration: 2s;
}
.chart {
  background: #fff;
  height: 100%;
  .Selector {
    border-bottom: 20px solid #F2F2F2;
  }
  .circle {
    position: absolute;
    width: 81px;
    height: 81px;
    border-radius: 50%;
    background: #FFC107;
    line-height: 81px;
    text-align: center;
    top: 37px;
    right: 155px;
    cursor: pointer;
  }
  .con {
    padding: 25px 3.44% 0 3.44%;
  }
  .btn {
    margin-bottom: 45px;
    button {
      width:135px;
      height:44px;
      background:rgba(255,255,255,1);
      border:1px solid black;
      border-radius:4px;
      color: black;
      margin-right: 45px;
      &:hover {
        background: #FFC107;
        color: black;
        border: #FFC107;
      }
    }
    .active {
      background: #FFC107;
      color: black;
      border: #FFC107;
    }
  }
  .change {
    float: right;
    font-size: 0;
    button {
      width: 60px;
      border:1px solid rgba(219,219,219,1);
      height: 30px;
      background: none;
      color: #ACACAC;
      span {
        font-size: 19px;
      }
    }
    button:nth-of-type(1){
      border-right: none;
      border-radius: 5px 0 0 5px;
      span {
        font-size: 26px;
      }
    }
    button:nth-of-type(2){
      border-left: none;
      border-radius: 0px 5px 5px 0px;
      vertical-align: bottom;
    }
    .active {
      background: #FF9494;
      color: white;
      border: none;
    }
  }
}
</style>
