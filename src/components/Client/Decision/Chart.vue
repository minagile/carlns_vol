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
    <div id="main" v-show="this.url !== 'CoverageOf' && this.url !== 'ChannelRepaymentAmountTrend'" style="width: 59.55%;height:432px;background: #fff;margin: 0 auto;"></div>
    <div id="main1" v-show="this.url === 'CoverageOf'" style="width: 59.55%;height:432px;background: #fff;margin: 0 auto;"></div>
    <div id="main2" v-show="this.url === 'ChannelRepaymentAmountTrend'" style="width: 80%;height:432px;background: #fff;margin: 0 auto;"></div>
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
          url: 'ChannelsOfPie'
        },
        {
          name: '还款率',
          url: 'RepaymentRatePie'
        },
        {
          name: '逾期率',
          url: 'OverdueRatePie'
        },
        {
          name: '退保率',
          url: 'SurrenderRatePie'
        },
        {
          name: '险种占比',
          url: 'CoverageOf'
        },
        {
          name: '还款总金额趋势图',
          url: 'ChannelRepaymentAmountTrend'
        }
      ],
      num: 0,
      url: ''
    }
  },
  props: ['chartData'],
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
      } else if (this.url === 'ChannelRepaymentAmountTrend') {
        this.getEchartZhe(this.chartData)
      } else if (this.url === 'ChannelsOfPie' || this.url === 'RepaymentRatePie' || this.url === 'OverdueRatePie' || this.url === 'SurrenderRatePie') {
        this.getEchartPie()
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
      console.log(x)
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
            show: true,
            type: 'category',
            data: x,
            axisTick: {
              alignWithLabel: true
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
            show: true,
            type: 'category',
            data: x,
            axisTick: {
              alignWithLabel: true
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
            name: '交强险占比',
            type: 'bar',
            barWidth: '30%',
            data: y,
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
            data: yy,
            label: label,
            // barWidth: 30,
            itemStyle: {
              color: '#FE6F5F'
            }
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
          symbolSize: '16',
          itemStyle: {
            borderWidth: 2,
            borderColor: '#fff',
            shadowColor: 'rgba(0, 0, 0, 0.3)',
            shadowBlur: 4
          },
          lineStyle: {
            width: 4
          }
        })
        data[1].forEach((v, k) => {
          seriesData[n].data.push(v.value[name])
        })
      })
      var myChart6 = echarts.init(document.getElementById('main2'))
      myChart6.setOption({
        color: ['#87e5da', '#92a4c0', '#f4adad', '#e58cdb', '#d0efb5', '#eb7878', '#2f3e75', '#f3e595', '#eda1c1', '#fab2ac', '#bee4d2', '#d7f8f7'],
        tooltip: {
          trigger: 'item'
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
      this.chartData.forEach(v => {
        name.push(v.name)
      })
      let myChart = echarts.init(document.getElementById('main'))
      myChart.setOption({
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
            name: '渠道占比',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            color: ['#b6a2de', '#5ab1ef', '#ffb980', '#d87a80', '#2ec7c9', '#7092be'],
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
            data: this.chartData
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
