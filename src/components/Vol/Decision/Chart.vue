<template>
  <div class="chart animated flipInY">
    <selector :all="true" :vol="true"  @giveParams="allTime" :channelList="channelList" :sortTable="false" :double="false"></selector>
    <div class="con">
      <div class="btn">
        <button
          v-for="(btn, index) in btnList"
          :key="index"
          :class="{active : num == index}"
          @click="getData(btn.url, index, btn.table)"
        >
          {{btn.name}}
        </button>
      </div>
      <div class="change">
        <button :class="{active : num1 === 0}" @click="changeChart(0)"><span class="iconfont">&#xe698;</span></button>
        <button :class="{active : num1 === 1}" @click="changeChart(1)"><span class="iconfont">&#xe637;</span></button>
      </div>
      <div id="main" style="width: 100%;height:432px;background: #fff;margin: 0 auto;" v-show="num1 === 0 && this.url !== 'CoverageOf' && this.url !== 'ChannelRepaymentAmountTrend'"></div>
      <div id="main1"  style="width: 100%;height:432px;background: #fff;margin: 0 auto;" v-show="num1 === 0 && this.url === 'CoverageOf'"></div>
      <div id="main2" v-show="num1 === 0 && url === 'ChannelRepaymentAmountTrend'" style="width: 100%;height:432px;background: #fff;margin: 0 auto;"></div>

      <el-table
        :data="chartData"
        height="250"
        border
        style="width: 60.38%;margin: 100px auto 0 auto;"
        v-show="num1 === 1 && this.url !== 'ChannelRepaymentAmountTrend'"
        :span-method="objectSpanMethod">
        <el-table-column prop="channelName" label="渠道"></el-table-column>
        <el-table-column prop="commercial" label="商业险" v-if="url === 'CoverageOf' || url === 'TotalAmountInStages' || url === 'ChannelsOf'"></el-table-column>
        <el-table-column prop="carrtaffic" label="交强险" v-if="url === 'CoverageOf' || url === 'TotalAmountInStages' || url === 'ChannelsOf'"></el-table-column>
        <el-table-column prop="overdue" label="未还" v-if="url === 'OverdueRate'"></el-table-column>
        <el-table-column prop="HasBeenPayment" label="已还" v-if="url === 'OverdueRate'"></el-table-column>
        <el-table-column prop="price" label="逾期率" v-if="url === 'OverdueRate'"></el-table-column>
        <el-table-column prop="price" label="还款率" v-if="url === 'RepaymentRate'"></el-table-column>
        <el-table-column prop="price" label="总计" v-if="url !== 'CoverageOf' && url !=='SurrenderRate' && url !== 'OverdueRate' && url !== 'RepaymentRate'"></el-table-column>
        <el-table-column prop="total" label="合计" v-if="url === 'CoverageOf'"></el-table-column>
        <el-table-column prop="carCount" label="退保车辆个数" v-if="url === 'SurrenderRate'"></el-table-column>
        <el-table-column prop="surrender" label="总车辆数" v-if="url === 'SurrenderRate'"></el-table-column>
        <el-table-column prop="surrenderRate" label="比率" v-if="url === 'SurrenderRate'"></el-table-column>
      </el-table>

      <p v-show="url === 'ChannelRepaymentAmountTrend' && num1 === 1">暂无数据</p>
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
require('echarts/lib/component/dataZoom')
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
          url: 'ChannelsOf',
          table: 'ChannelsOfPie'
        },
        {
          name: '还款率',
          url: 'RepaymentRate',
          table: 'RepaymentRatePie'
        },
        {
          name: '逾期率',
          url: 'OverdueRate',
          table: 'OverdueRatePie'
        },
        {
          name: '退保率',
          url: 'SurrenderRate',
          table: 'SurrenderRatePie'
        },
        {
          name: '险种占比',
          url: 'CoverageOf',
          table: 'CoverageOfPie'
        },
        {
          name: '还款总金额趋势图',
          url: 'ChannelRepaymentAmountTrend'
        }
      ],
      num: 0,
      num1: 0,
      selectData: {
        channelName: 0
      }, // 参数
      chartData: [], // 图表数据
      channelList: [], // 渠道列表
      url: '',
      chartX: [],
      chartY: [],
      chartYY: [],
      tablePie: [],
      table: '',
      name: '分期总金额'
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
    getData (data, index, table) { // 选择按钮，触发父组件改变图标数据
      this.url = data
      this.num = index
      this.table = ''
      this.table = table
      this.name = this.btnList[index].name
      // let sum = 0
      this.$post(`/admin/report/${data}`, this.selectData).then(res => {
        if (res.code === 0) {
          this.chartData = res.data
          if (data === 'CoverageOf') {
            this.getEchartDb()
          } else if (data === 'ChannelRepaymentAmountTrend') {
            this.getEchartZhe(res.data)
          } else if (data === 'ChannelsOf' || data === 'RepaymentRate' || data === 'OverdueRate' || data === 'SurrenderRate') {
            this.getEchartPie()
          } else {
            this.getEchart()
          }
        } else {
          this.$message({
            type: 'info',
            message: res.msg
          })
        }
      })
      if (table) {
        this.$post(`/admin/report/${table}`, this.selectData).then(res => {
          if (res.code === 0) {
            this.tablePie = res.data
            this.getEchartPie()
          } else {
            this.$message({
              type: 'info',
              message: res.msg
            })
          }
        })
      }
    },
    allTime (data) { // 处理子组件数据
      if (data.report === '' && data.startTime !== '') {
        this.selectData = {
          startTime: data.startTime,
          endTime: data.endTime
        }
      } else if (data.startTime === '' && data.report !== '') {
        this.selectData = {
          channelName: data.report
        }
      } else if (data.startTime && data.report !== '') {
        this.selectData = {
          startTime: data.startTime,
          endTime: data.endTime,
          channelName: data.report
        }
      } else {
        this.selectData = {}
      }
      this.getData(this.url, this.num, this.table)
    },
    getChannelList () { // 获取渠道列表
      this.$fetch('/admin/report/getChilds', {
        channelId: 0
      }).then(res => {
        const aa = [{
          channelId: 0,
          channelName: '全部渠道'
        }]
        this.channelList = aa.concat(res)
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
        color: ['#3398DB', '#D53A35'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: '{a}<br/>{b}: {c}'
        },
        legend: {
          show: false
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            show: true,
            type: 'category',
            data: chartX,
            axisTick: {
              alignWithLabel: true,
              interval: 0
            },
            axisLabel: {
              show: true,
              interval: 0
            }
          }
        ],
        yAxis: [
          {
            show: true,
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
            name: this.name,
            type: 'bar',
            barWidth: '30%',
            data: chartY
            // itemStyle: {
            //   normal: {
            //     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            //       offset: 0,
            //       color: 'rgba(17, 168,171, 1)'
            //     }, {
            //       offset: 1,
            //       color: 'rgba(17, 168,171, 0.1)'
            //     }]),
            //     shadowColor: 'rgba(0, 0, 0, 0.1)',
            //     shadowBlur: 10
            //   }
            // }
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
        chartY.push(v.carrtafficRate.toFixed(2))
        chartYY.push(v.commercialRate.toFixed(2))
      })
      const label = {
        show: true,
        // rotate: 90,
        position: 'insideTop',
        offset: [0, -20]
      }
      let myChart1 = echarts.init(document.getElementById('main1'))
      myChart1.setOption({
        color: ['#3398DB', '#D53A35'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: '{a0}: {c0}%<br/>{a1}: {c1}%'
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
              alignWithLabel: true,
              interval: 0
            },
            axisLabel: {
              show: true,
              interval: 0
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
            label: label
            // barWidth: 30,
          },
          {
            name: '商业险占比',
            type: 'bar',
            barWidth: '30%',
            data: chartYY,
            label: label
            // barWidth: 30,
          }
        ]
      })
    },
    getEchartZhe (data) {
      // console.log(data)
      var dateArr = data[0]
      var seriesData = []
      var name = ''
      let legend = []
      data[2].forEach((m, n) => {
        name = m.channelName
        legend.push(name)
        seriesData.push({
          name: name,
          type: 'line',
          stack: name,
          data: [],
          symbol: 'circle',
          symbolSize: '4'
          // smooth: true,
          // itemStyle: {
          //   borderWidth: 2,
          //   borderColor: '#fff',
          //   shadowColor: 'rgba(0, 0, 0, 0.3)',
          //   shadowBlur: 4
          // }
          // lineStyle: {
          //   width: 4
          // }
        })
        data[1].forEach((v, k) => {
          seriesData[n].data.push(v.value[name])
        })
      })
      var myChart6 = echarts.init(document.getElementById('main2'))
      myChart6.setOption({
        color: ['#FF7CBD', '#87CEFA', '#D970D5', '#32CD32', '#6394EB', '#FE69B3'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            animation: false
          }
        },
        legend: {
          type: 'plain',
          data: legend
        },
        grid: {
          top: '20%',
          left: '18%',
          height: '60%',
          width: '64%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        dataZoom: [
          {
            type: 'slider',
            start: 10
            // bottom: 50
          }
        ],
        xAxis: {
          show: true,
          name: '时间',
          type: 'category',
          boundaryGap: false,
          splitLine: {
            show: true
          },
          data: dateArr,
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          show: true,
          name: '金额(￥)',
          type: 'value',
          splitLine: {
            show: true
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        series: seriesData
      }, true)
    },
    getEchartPie () {
      let name = []
      this.tablePie.forEach(v => {
        name.push(v.name)
      })
      let myChart = echarts.init(document.getElementById('main'))
      myChart.setOption({
        color: ['#FF7CBD', '#87CEFA', '#D970D5', '#32CD32', '#6394EB', '#FE69B3'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          show: true,
          orient: 'vertical',
          x: 'left',
          data: name
        },
        xAxis: [
          {
            show: false
          }
        ],
        yAxis: [
          {
            show: false
          }
        ],
        series: [
          {
            name: this.name,
            type: 'pie',
            // radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            // color: ['#b6a2de', '#5ab1ef', '#ffb980', '#d87a80', '#2ec7c9', '#7092be'],
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: this.tablePie
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
      width:7.26%;
      height:44px;
      background:rgba(255,255,255,1);
      border:1px solid black;
      border-radius:4px;
      color: black;
      margin-right: 45px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
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
    text-align: right;
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
