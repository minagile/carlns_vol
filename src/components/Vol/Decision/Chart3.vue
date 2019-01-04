<template>
  <div class="chart">
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
        <button :class="{active : num1 === 2}" @click="changeChart(2)"><span class="iconfont">&#xe637;</span></button>
      </div>

      <div id="main" style="width: 100%;height:432px;background: #fff;margin: 0 auto;" v-show="num1 === 0"></div>

      <div v-show="num1 === 1">
        <p>暂无数据</p>
      </div>

      <div v-show="num1 === 2" style="width: 1500px;height:432px;background: #fff;margin: 0 auto;" id="main1">
        sdfdsd
      </div>
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
        // {
        //   name: '还款总金额',
        //   url: 'TotalAmountOfRepayment'
        // },
        {
          name: '渠道占比',
          url: 'ChannelsOfPie'
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
      num1: 0,
      selectData: {
        channelName: 0
      }, // 参数
      chartData: { // 双柱状图数据
        stagePrice: [16280.00, 1793238.63],
        repaymentAmount: [5513.48, 555641.33],
        channelName: ['南京乙丁新能源科技有限公司', '蓝途']
      },
      channelList: [], // 渠道列表
      url: '',
      chartX: [],
      chartY: [],
      chartYY: [],
      tablePie: [ // 饼图数据
        {value: 335, name: '直接访问'},
        {value: 310, name: '邮件营销'},
        {value: 234, name: '联盟广告'},
        {value: 135, name: '视频广告'},
        {value: 1548, name: '搜索引擎'}
      ],
      basic: {
        value: [120, 200, 150, 80, 70, 110, 130],
        name: ['Mon', '蓝途', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      table: '',
      name: '分期总金额',
      yName: '金额',
      ziqudao: 0,
      zheData: {
        time: ['2018-05', '2018-06', '2018-07', '2018-08', '2018-09', '2018-10', '2018-11', '2018-12'],
        value: [{
          price: [0.00, 28659.67, 75921.67, 422286.31, 664003.58, 984807.74, 1708927.58, 1809518.63],
          name: '总分期金额'
        }, {
          price: [0.00, 3248.09, 15174.86, 87857.10, 154710.01, 252045.46, 428863.48, 561154.81],
          name: '总还款金额'
        }]
      }
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
    allTime (data) { // 处理子组件数据
      this.ziqudao = data.report
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
    getData (data, index, table) { // 选择按钮，触发父组件改变图标数据
      this.url = data
      this.num = index
      this.table = ''
      this.table = table
      this.name = this.btnList[index].name
      this.$post(`/admin/report/${data}`, this.selectData).then(res => {
        if (res.code === 0) {
          // this.chartData = res.data
          this.getEchartZhe()
          if (data === 'TotalAmountInStages') {
            this.totalEchartDb() // 分期+渠道， 双柱状图
          }
          if (data === 'ChannelsOfPie') {
            this.ChannelsEchartPie() // 渠道占比，饼图
          }
          if (data === 'RepaymentRate') {
            if (this.ziqudao === 0) {
              this.RepaymentEchart() // 主渠道，还款率，柱状图
            } else {
              this.RepaymentEchartPie() // 子渠道，还款率，饼图
            }
          }
          if (data === 'OverdueRate') {
            if (this.ziqudao === 0) {
              this.OverdueEchart() // 主渠道，逾期率，柱状图
            } else {
              this.OverduetEchartPie() // 子渠道，逾期率，饼图
            }
          }
          if (data === 'SurrenderRate') {
            if (this.ziqudao === 0) {
              this.SurrenderEchart() // 主渠道，退保率，柱状图
            } else {
              this.SurrenderEchartPie() // 子渠道，退保率，饼图
            }
          }
          if (data === 'CoverageOf') {
            this.CoverageEchartDb() // 险种占比，双柱状图
          }
        }
      })
    },
    getEchartZhe () { // 折线图
      // var dateArr = data[0]
      // var seriesData = []
      // var name = ''
      // let legend = []
      // data[2].forEach((m, n) => {
      //   name = m.channelName
      //   legend.push(name)
      //   seriesData.push({
      //     name: name,
      //     type: 'line',
      //     stack: name,
      //     data: [],
      //     symbol: 'circle',
      //     symbolSize: '4'
      //   })
      //   data[1].forEach((v, k) => {
      //     seriesData[n].data.push(v.value[name])
      //   })
      // })
      var seriesData = []
      this.zheData.value.forEach((m, n) => {
        seriesData.push({
          name: m.name,
          type: 'line',
          stack: name,
          data: m.price,
          symbol: 'circle',
          symbolSize: '4'
        })
      })
      console.log(seriesData)
      var myChart6 = echarts.init(document.getElementById('main1'))
      myChart6.setOption({
        color: ['#FF7CBD', '#FF7F50', '#87CEFA', '#D970D5', '#6394EB', '#FE69B3'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            animation: false
          }
        },
        legend: {
          type: 'plain',
          data: this.zheData.name
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
          data: this.zheData.time,
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
    totalEchartDb () { // 分期+渠道， 双柱状图
      const label = {
        show: true,
        position: 'insideTop',
        offset: [0, -20]
      }
      let myChart1 = echarts.init(document.getElementById('main'))
      myChart1.setOption({
        color: ['#3398DB', '#D53A35'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: '{a0}: {c0}%<br/>{a1}: {c1}'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        legend: {
          show: true,
          orient: 'vertical',
          // x: 'right',
          data: name
        },
        xAxis: [
          {
            type: 'category',
            data: this.chartData.channelName,
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
            name: this.yName,
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
            name: '交强险',
            type: 'bar',
            barWidth: '30%',
            data: this.chartData.stagePrice,
            label: label
          },
          {
            name: '商业险',
            type: 'bar',
            barWidth: '30%',
            data: this.chartData.repaymentAmount,
            label: label
          }
        ]
      })
      // 点击事件
      myChart1.on('click', (params) => {
        const name = params.name
        this.channelList.forEach(v => {
          if (v.channelName.indexOf(name) > -1) {
            this.ziqudao = v.channelId
            this.selectData.channelName = v.channelId
            this.getData(this.url, this.num)
          }
        })
      })
    },
    ChannelsEchartPie () { // 渠道占比，饼图
      let name = []
      this.tablePie.forEach(v => {
        name.push(v.name)
      })
      let myChart = echarts.init(document.getElementById('main'))
      myChart.setOption({
        color: ['#FF7CBD', '#FF7F50', '#87CEFA', '#D970D5', '#6394EB', '#FE69B3'],
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
            type: 'pie',
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: true
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            data: this.tablePie
          }
        ]
      }, true)
      // 点击事件
      myChart.on('click', (params) => {
        const name = params.name
        this.channelList.forEach(v => {
          if (v.channelName.indexOf(name) > -1) {
            this.ziqudao = v.channelId
            this.selectData.channelName = v.channelId
            this.getData(this.url, this.num)
          }
        })
      })
    },
    RepaymentEchart () { // 主渠道，还款率，柱状图
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
            data: this.basic.name,
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
            name: this.yName,
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
            name: this.basic.name,
            type: 'bar',
            barWidth: '30%',
            data: this.basic.value
          }
        ]
      }, true)
      // 点击事件
      myChart.on('click', (params) => {
        const name = params.name
        this.channelList.forEach(v => {
          if (v.channelName.indexOf(name) > -1) {
            this.ziqudao = v.channelId
            this.selectData.channelName = v.channelId
            this.getData(this.url, this.num)
          }
        })
      })
    },
    RepaymentEchartPie () { // 子渠道，还款率，饼图
      let name = []
      this.tablePie.forEach(v => {
        name.push(v.name)
      })
      let myChart = echarts.init(document.getElementById('main'))
      myChart.setOption({
        color: ['#FF7CBD', '#FF7F50', '#87CEFA', '#D970D5', '#6394EB', '#FE69B3'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          show: true,
          orient: 'vertical',
          x: 'left',
          data: this.tablePie.name
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
            type: 'pie',
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: true
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            data: this.tablePie
          }
        ]
      }, true)
    },
    OverdueEchart () { // 主渠道，逾期率，柱状图
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
            data: this.basic.name,
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
            name: this.yName,
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
            data: this.basic.value
          }
        ]
      }, true)
      // 点击事件
      myChart.on('click', (params) => {
        const name = params.name
        this.channelList.forEach(v => {
          if (v.channelName.indexOf(name) > -1) {
            this.ziqudao = v.channelId
            this.selectData.channelName = v.channelId
            this.getData(this.url, this.num)
          }
        })
      })
    },
    OverduetEchartPie () { // 子渠道，逾期率，饼图
      let name = []
      this.tablePie.forEach(v => {
        name.push(v.name)
      })
      let myChart = echarts.init(document.getElementById('main'))
      myChart.setOption({
        color: ['#FF7CBD', '#FF7F50', '#87CEFA', '#D970D5', '#6394EB', '#FE69B3'],
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
            type: 'pie',
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: true
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            data: this.tablePie
          }
        ]
      }, true)
    },
    SurrenderEchart () { // 主渠道，逾期率，柱状图
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
            data: this.basic.name,
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
            name: this.yName,
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
            data: this.basic.value
          }
        ]
      }, true)
      // 点击事件
      myChart.on('click', (params) => {
        const name = params.name
        this.channelList.forEach(v => {
          if (v.channelName.indexOf(name) > -1) {
            this.ziqudao = v.channelId
            this.selectData.channelName = v.channelId
            this.getData(this.url, this.num)
          }
        })
      })
    },
    SurrenderEchartPie () { // 子渠道，逾期率，饼图
      let name = []
      this.tablePie.forEach(v => {
        name.push(v.name)
      })
      let myChart = echarts.init(document.getElementById('main'))
      myChart.setOption({
        color: ['#FF7CBD', '#FF7F50', '#87CEFA', '#D970D5', '#6394EB', '#FE69B3'],
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
            type: 'pie',
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: true
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            data: this.tablePie
          }
        ]
      }, true)
    },
    CoverageEchartDb () { // 险种占比， 双柱状图
      const label = {
        show: true,
        position: 'insideTop',
        offset: [0, -20]
      }
      let myChart1 = echarts.init(document.getElementById('main'))
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
        legend: {
          show: true,
          orient: 'vertical',
          // x: 'right',
          data: name
        },
        xAxis: [
          {
            type: 'category',
            data: this.chartData.xData,
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
            name: this.yName,
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
            data: this.chartData.value.value1,
            label: label
          },
          {
            name: '商业险占比',
            type: 'bar',
            barWidth: '30%',
            data: this.chartData.value.value1,
            label: label
          }
        ]
      }, true)
      // 点击事件
      myChart1.on('click', (params) => {
        const name = params.name
        this.channelList.forEach(v => {
          if (v.channelName.indexOf(name) > -1) {
            this.ziqudao = v.channelId
            this.selectData.channelName = v.channelId
            this.getData(this.url, this.num)
          }
        })
      })
    }
  },
  components: {
    Selector
  },
  watch: {
    name (val) {
      if (this.name === '分期总金额' || this.name === '还款总金额') {
        this.yName = '金额'
      } else {
        this.yName = '%'
      }
    }
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
      vertical-align: bottom;
      span {
        font-size: 26px;
      }
    }
    button:nth-of-type(2){
      // border-left: none;
      // border-radius: 0px 5px 5px 0px;
      // vertical-align: bottom;
    }
    button:nth-of-type(3){
      border-left: none;
      border-radius: 0px 5px 5px 0px;
      // vertical-align: bottom;
    }
    .active {
      background: #FF9494;
      color: white;
      border: none;
    }
  }
}
</style>
