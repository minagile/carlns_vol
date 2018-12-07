<template>
  <div class="chart">
    <div class="btn">
      <button
        v-for="(btn, index) in btnList"
        :key="index"
        :class="{active : num == index}"
        @click="tab(index, btn.url)"
      >
        {{btn.name}}
      </button>
    </div>
    <div id="main" v-show="this.url !== 'CoverageOf'" style="width: 59.55%;height:432px;background: #fff;margin: 0 auto;"></div>
    <div id="main1" v-show="this.url === 'CoverageOf'" style="width: 59.55%;height:432px;background: #fff;margin: 0 auto;"></div>
  </div>
</template>

<script>
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
        }
      ],
      num: 0,
      url: ''
    }
  },
  props: {
    chartData: {
      type: Array
    }
  },
  watch: {
    chartData (val) {
      let chartX = []
      let chartY = []
      let chartYY = []
      if (this.url === 'CoverageOf') {
        this.chartData.forEach(v => {
          chartX.push(v.channelName)
          chartY.push(v.carrtafficRate)
          chartYY.push(v.commercialRate)
        })
        this.getEchartDb(chartX, chartY, chartYY)
      } else {
        this.chartData.forEach(v => {
          chartX.push(v.channelName)
          chartY.push(v.price)
        })
        this.getEchart(chartX, chartY)
      }
    }
  },
  methods: {
    tab (index, url) {
      this.num = index
      this.getData(url)
    },
    getData (data) {
      this.url = data
      this.$emit('getChartData', data)
    },
    getEchart (x, y) {
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
            data: x,
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
            data: y,
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
    getEchartDb (x, y, yy) {
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
            data: x,
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
            data: y,
            label: label,
            barWidth: 30,
            itemStyle: {
              color: '#5F72B4'
            }
          },
          {
            name: '商业险占比',
            type: 'bar',
            barWidth: '30%',
            data: yy,
            label: label,
            barWidth: 30,
            itemStyle: {
              color: '#FE6F5F'
            }
          }
        ]
      })
    }
  }
}
</script>

<style lang="less" scoped>
.chart {
  padding: 25px 3.44% 0 3.44%;
  .btn {
    margin-bottom: 45px;
    button {
      width:135px;
      height:44px;
      background:rgba(255,255,255,1);
      border:1px solid rgba(73,119,252,1);
      border-radius:4px;
      color: #4977FC;
      margin-right: 45px;
      &:hover {
        background: #4977FC;
        color: white;
      }
    }
    .active {
      background: #4977FC;
      color: white;
    }
  }
}
</style>
