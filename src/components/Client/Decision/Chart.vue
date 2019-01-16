<template>
  <div class="chart">
    <selector :all="true" @giveParams="allTime" :ziqudao="ziqudao" :isUser="false" :channelList="channelList" :sortTable="false" :double="false"></selector>

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
        <el-select v-model="channel" placeholder="请选择" v-if="url === 'getInsuranceRate' && num1 === 2" @change="changeChannel">
          <el-option
            v-for="item in channelList1"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </div>

      <div class="change">
        <button :class="{active : num1 === 0}" @click="changeChart(0)"><span class="iconfont">&#xe698;</span></button>
        <button :class="{active : num1 === 1}" @click="changeChart(1)"><span class="iconfont">&#xe637;</span></button>
        <button :class="{active : num1 === 2}" @click="changeChart(2)"><span class="iconfont">&#xe79a;</span></button>
      </div>

      <div id="main" style="width: 100%;height:432px;background: #fff;margin: 0 auto;" v-show="num1 === 0"></div>

      <div v-show="num1 === 1" class="table">
        <el-table
          :data="chartAndTable.table"
          height="250"
          border
          show-summary
          v-show="url === 'getAllPrice'"
          style="width: 80%;margin: 80px auto;">
          <el-table-column
            prop="channelName"
            label="渠道">
          </el-table-column>
          <el-table-column
            prop="repaymentAmount"
            label="商业险">
          </el-table-column>
          <el-table-column
            prop="stagePrice"
            label="交强险">
          </el-table-column>
        </el-table>

        <el-table
          :data="chartAndTable.table"
          height="250"
          border
          show-summary
          v-show="url === 'getRepaymentRate'"
          style="width: 80%;margin: 80px auto;">
          <el-table-column
            prop="channelName"
            label="渠道">
          </el-table-column>
          <el-table-column
            prop="HasBeenPayment"
            label="还款金额">
          </el-table-column>
          <el-table-column
            label="还款率(%)">
            <template slot-scope="scope">
              {{scope.row.price}}%
            </template>
          </el-table-column>
        </el-table>

        <el-table
          :data="chartAndTable.table"
          height="250"
          border
          show-summary
          v-show="url === 'getOverdueRate'"
          style="width: 80%;margin: 80px auto;">
          <el-table-column
            prop="channel_name"
            label="渠道">
          </el-table-column>
          <el-table-column
            prop="overdueNum"
            label="待还款">
          </el-table-column>
          <el-table-column
            label="逾期率(%)">
            <template slot-scope="scope">
              {{scope.row.rate}}%
            </template>
          </el-table-column>
        </el-table>
        <el-table
          :data="chartAndTable.table"
          height="250"
          border
          show-summary
          v-if="url === 'getSurrenderRate'"
          style="width: 80%;margin: 80px auto;">
          <el-table-column
            prop="channel_name"
            label="渠道">
          </el-table-column>
          <el-table-column
            prop="surrenderNum"
            label="退保车辆">
          </el-table-column>
          <el-table-column
            prop="normalNum"
            label="所有车辆">
          </el-table-column>
          <el-table-column
            label="退保率(%)">
            <template slot-scope="scope">
              {{scope.row.rate}}%
            </template>
          </el-table-column>
        </el-table>
        <el-table
          :data="chartAndTable.table"
          height="250"
          border
          show-summary
          v-if="url === 'getInsuranceRate'"
          style="width: 80%;margin: 80px auto;">
          <el-table-column
            prop="channel_name"
            label="渠道">
          </el-table-column>
          <el-table-column
            prop="to_pay_high"
            label="交强险">
          </el-table-column>
          <el-table-column
            prop="commercial"
            label="商业险">
          </el-table-column>
        </el-table>
      </div>

      <div v-show="num1 === 2" style="width: 1500px;height:432px;background: #fff;margin: 0 auto;" id="main1">
        请选择时间
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
// import 'echarts/lib/component/legendScroll'
require('echarts/lib/component/dataZoom')
export default {
  name: 'Chart',
  data () {
    return {
      btnList: [
        {
          name: '分期总金额',
          url: 'getAllPrice'
        },
        {
          name: '还款率',
          url: 'getRepaymentRate'
        },
        {
          name: '逾期率',
          url: 'getOverdueRate'
        },
        {
          name: '退保率',
          url: 'getSurrenderRate'
        },
        {
          name: '险种占比',
          url: 'getInsuranceRate'
          // url: 'CoverageOf'
        }
      ],
      num: 0,
      num1: 0,
      selectData: {
        channelName: 0
      },
      channelList: [], // 渠道列表
      url: '',
      chartX: [],
      chartY: [],
      chartYY: [],
      table: '',
      name: '分期总金额',
      yName: '金额',
      ziqudao: 0,
      chartAndTable: [],
      channel: '',
      channelList1: ''
    }
  },
  mounted () {
    this.getData('getAllPrice', 0)
    this.getChannelList()
  },
  methods: {
    changeChart (e) { // 切换图标和表格
      this.num1 = e
    },
    getChannelList () { // 获取渠道列表
      this.$fetch('/user/report/getChilds', {
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
          endTime: data.endTime,
          channelName: data.report
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
      this.chartAndTable = []
      this.$post(`/user/report/${data}`, this.selectData).then(res => {
        if (res.code === 0) {
          // console.log(res)
          this.chartAndTable = res.data
          // this.chartData = res.data
          if (res.data.line.value) {
            if (data === 'getInsuranceRate') {
              this.getEchartZhe1(res.data.line.name[0]) // 险种占比，双柱状图
              this.channelList1 = res.data.line.name // 险种占比，双柱状图
              this.channel = res.data.line.name[0]
            } else {
              this.getEchartZhe()
            }
          } else {
            // this.$message.info('暂无数据')
          }
          if (data === 'getAllPrice') {
            this.totalEchartDb() // 分期+渠道， 双柱状图
          }
          // if (data === 'getChannelProportion') {
          //   this.ChannelsEchartPie() // 渠道占比，饼图
          // }
          if (data === 'getRepaymentRate') {
            this.RepaymentEchart() // 主渠道，还款率，柱状图
            // this.RepaymentEchartPie() // 子渠道，还款率，饼图
          }
          if (data === 'getOverdueRate') {
            this.OverdueEchart() // 主渠道，逾期率，柱状图
            // this.OverduetEchartPie() // 子渠道，逾期率，饼图
          }
          if (data === 'getSurrenderRate') {
            this.SurrenderEchart() // 主渠道，退保率，柱状图
            // this.SurrenderEchartPie() // 子渠道，退保率，饼图
          }
          if (data === 'getInsuranceRate') {
            this.CoverageEchartDb() // 险种占比，双柱状图
          }
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    getEchartZhe () { // 折线图
      var seriesData = []
      this.chartAndTable.line.value.forEach((m, n) => {
        seriesData.push({
          name: m.name,
          type: 'line',
          stack: m.name,
          data: m.price || m.value,
          symbol: 'circle',
          symbolSize: '4'
        })
      })
      let selected = [this.chartAndTable.line.value[0].name, this.chartAndTable.line.value[1].name]
      let name = this.chartAndTable.line.name || this.chartAndTable.line.time
      var myChart6 = echarts.init(document.getElementById('main1'))
      myChart6.clear()
      myChart6.setOption({
        color: ['#FF7CBD', '#FF7F50', '#87CEFA', '#D970D5', '#6394EB', '#FE69B3'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            animation: false
          }
        },
        legend: {
          // type: 'scroll',
          // data:['Step Start', 'Step Middle', 'Step End'],
          orient: 'horizontal',
          align: 'left',
          height: '100px',
          selected: selected
          // left: 10,
          // top: 20,
          // bottom: 20
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
          data: name,
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          show: true,
          name: this.yName,
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
    getEchartZhe1 (nameData) { // 折线图
      let seriesData1 = []
      let name = this.chartAndTable.line.time
      // console.log(nameData)
      this.chartAndTable.line.value.forEach((m, n) => {
        if (m.name.length - 5 === nameData.length && m.name.indexOf(nameData) > -1) {
          seriesData1.push({
            name: m.name,
            type: 'line',
            stack: m.name,
            data: m.price || m.value,
            symbol: 'circle',
            symbolSize: '4'
          })
        }
      })
      // console.log(seriesData1)
      var myChart6 = echarts.init(document.getElementById('main1'))
      myChart6.clear()
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
          // data: name,
          show: true
          // orient: 'vertical'
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
          data: name,
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          show: true,
          name: this.yName,
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
        series: seriesData1
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
          formatter: '{a0}: {c0}元<br/>{a1}: {c1}元'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        legend: {
          show: true,
          orient: 'horizontal',
          // x: 'right',
          // right: '50%',
          data: name
        },
        xAxis: [
          {
            type: 'category',
            data: this.chartAndTable.doubleColumn.channelName,
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
            show: true,
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
            name: '分期总金额',
            type: 'bar',
            barWidth: '30%',
            data: this.chartAndTable.doubleColumn.value.stagePrice,
            label: label
          },
          {
            name: '还款总金额',
            type: 'bar',
            barWidth: '30%',
            data: this.chartAndTable.doubleColumn.value.repaymentAmount,
            label: label
          }
        ]
      })
      // 点击事件
      // myChart1.on('click', (params) => {
      //   const name = params.name
      //   this.channelList.forEach(v => {
      //     if (v.channelName.indexOf(name) > -1) {
      //       this.ziqudao = v.channelId
      //       this.selectData.channelName = v.channelId
      //       this.getData(this.url, this.num)
      //     }
      //   })
      // })
    },
    // ChannelsEchartPie () { // 渠道占比，饼图
    //   // let name = []
    //   let tablePie = []
    //   tablePie = this.chartAndTable.pie.map(item => {
    //     return {name: item.channelName, value: item.stagePrice}
    //   })
    //   let myChart = echarts.init(document.getElementById('main'))
    //   myChart.setOption({
    //     color: ['#FF7CBD', '#FF7F50', '#87CEFA', '#D970D5', '#6394EB', '#FE69B3'],
    //     tooltip: {
    //       trigger: 'item',
    //       formatter: '{a} <br/>{b}: {c} ({d}%)'
    //     },
    //     legend: {
    //       show: true,
    //       orient: 'vertical',
    //       x: 'left'
    //       // data: name
    //     },
    //     xAxis: [
    //       {
    //         show: false
    //       }
    //     ],
    //     yAxis: [
    //       {
    //         show: false
    //       }
    //     ],
    //     series: [
    //       {
    //         type: 'pie',
    //         avoidLabelOverlap: false,
    //         label: {
    //           normal: {
    //             show: true
    //           },
    //           emphasis: {
    //             show: true,
    //             textStyle: {
    //               fontSize: '30',
    //               fontWeight: 'bold'
    //             }
    //           }
    //         },
    //         data: tablePie
    //       }
    //     ]
    //   }, true)
    //   // 点击事件
    //   myChart.on('click', (params) => {
    //     const name = params.name
    //     this.channelList.forEach(v => {
    //       if (v.channelName.indexOf(name) > -1) {
    //         this.ziqudao = v.channelId
    //         this.selectData.channelName = v.channelId
    //         this.getData(this.url, this.num)
    //       }
    //     })
    //   })
    // },
    RepaymentEchart () { // 主渠道，还款率，柱状图
      let myChart = echarts.init(document.getElementById('main'))
      myChart.setOption({
        color: ['#FF7CBD', '#FF7F50', '#87CEFA', '#D970D5', '#6394EB', '#FE69B3'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)',
          show: false
        },
        legend: {
          show: false,
          orient: 'vertical'
          // x: 'left'
          // data: this.tablePie.name
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
                formatter: '{b}: {c}元  {per|{d}%}  ',
                // backgroundColor: '#eee',
                // borderColor: '#aaa',
                // borderWidth: 1,
                // borderRadius: 4,
                // shadowBlur:3,
                // shadowOffsetX: 2,
                // shadowOffsetY: 2,
                // shadowColor: '#999',
                // padding: [0, 7],
                rich: {
                  a: {
                    color: '#999',
                    lineHeight: 22,
                    align: 'center'
                  },
                  // abg: {
                  //     backgroundColor: '#333',
                  //     width: '100%',
                  //     align: 'right',
                  //     height: 22,
                  //     borderRadius: [4, 4, 0, 0]
                  // },
                  hr: {
                    borderColor: '#aaa',
                    width: '100%',
                    borderWidth: 0.5,
                    height: 0
                  },
                  b: {
                    fontSize: 16,
                    lineHeight: 33
                  },
                  per: {
                    // color: '#eee',
                    // backgroundColor: '#000000',
                    fontSize: 20,
                    padding: [2, 4],
                    borderRadius: 2
                  }
                }
              }
            },
            data: this.chartAndTable.pie
          }
        ]
      }, true)
    },
    OverdueEchart () { // 主渠道，逾期率，柱状图
      let myChart = echarts.init(document.getElementById('main'))
      myChart.setOption({
        color: ['#FF7CBD', '#FF7F50', '#87CEFA', '#D970D5', '#6394EB', '#FE69B3'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)',
          show: false
        },
        legend: {
          show: false,
          orient: 'vertical'
          // x: 'left'
          // data: this.tablePie.name
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
                formatter: '{b}: {c}辆  {per|{d}%}  ',
                // backgroundColor: '#eee',
                // borderColor: '#aaa',
                // borderWidth: 1,
                // borderRadius: 4,
                // shadowBlur:3,
                // shadowOffsetX: 2,
                // shadowOffsetY: 2,
                // shadowColor: '#999',
                // padding: [0, 7],
                rich: {
                  a: {
                    color: '#999',
                    lineHeight: 22,
                    align: 'center'
                  },
                  // abg: {
                  //     backgroundColor: '#333',
                  //     width: '100%',
                  //     align: 'right',
                  //     height: 22,
                  //     borderRadius: [4, 4, 0, 0]
                  // },
                  hr: {
                    borderColor: '#aaa',
                    width: '100%',
                    borderWidth: 0.5,
                    height: 0
                  },
                  b: {
                    fontSize: 16,
                    lineHeight: 33
                  },
                  per: {
                    // color: '#eee',
                    // backgroundColor: '#000000',
                    fontSize: 20,
                    padding: [2, 4],
                    borderRadius: 2
                  }
                }
              }
            },
            data: this.chartAndTable.pie
          }
        ]
      }, true)
    },
    SurrenderEchart () { // 主渠道，逾期率，柱状图
      let myChart = echarts.init(document.getElementById('main'))
      myChart.setOption({
        color: ['#FF7CBD', '#FF7F50', '#87CEFA', '#D970D5', '#6394EB', '#FE69B3'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)',
          show: false
        },
        legend: {
          show: false,
          orient: 'vertical'
          // x: 'left'
          // data: this.tablePie.name
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
                formatter: '{b}:  {per|{d}%}  ',
                // backgroundColor: '#eee',
                // borderColor: '#aaa',
                // borderWidth: 1,
                // borderRadius: 4,
                // shadowBlur:3,
                // shadowOffsetX: 2,
                // shadowOffsetY: 2,
                // shadowColor: '#999',
                // padding: [0, 7],
                rich: {
                  a: {
                    color: '#999',
                    lineHeight: 22,
                    align: 'center'
                  },
                  // abg: {
                  //     backgroundColor: '#333',
                  //     width: '100%',
                  //     align: 'right',
                  //     height: 22,
                  //     borderRadius: [4, 4, 0, 0]
                  // },
                  hr: {
                    borderColor: '#aaa',
                    width: '100%',
                    borderWidth: 0.5,
                    height: 0
                  },
                  b: {
                    fontSize: 16,
                    lineHeight: 33
                  },
                  per: {
                    // color: '#eee',
                    // backgroundColor: '#000000',
                    fontSize: 20,
                    padding: [2, 4],
                    borderRadius: 2
                  }
                }
              }
            },
            data: this.chartAndTable.pie
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
          formatter: '{a0}: {c0}辆<br/>{a1}: {c1}辆'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        legend: {
          show: true,
          orient: 'horizontal',
          // x: 'right',
          data: name
        },
        xAxis: [
          {
            type: 'category',
            data: this.chartAndTable.doubleColumn.name,
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
            data: this.chartAndTable.doubleColumn.value.commercial,
            label: label
          },
          {
            name: '商业险占比',
            type: 'bar',
            barWidth: '30%',
            data: this.chartAndTable.doubleColumn.value.to_pay_high,
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
    },
    changeChannel (item) {
      this.getEchartZhe1(item)
    }
  },
  components: {
    Selector
  },
  watch: {
    name (val) {
      if (this.name === '分期总金额' || this.name === '还款总金额') {
        this.yName = '金额'
      } else if (this.name === '退保率' || this.name === '逾期率' || this.name === '险种占比') {
        this.yName = '辆'
      } else {
        this.yName = '%'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.chart {
  // padding: 25px 3.44% 0 3.44%;
  .btn {
    margin-bottom: 45px;
    button {
      width:7.26%;
      height:44px;
      background:rgba(255,255,255,1);
      border:1px solid rgba(73,119,252,1);
      border-radius:4px;
      color: #4977FC;
      margin-right: 45px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
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
.chart {
  background: #fff;
  height: 789px;
  .Selector {
    border-bottom: 20px solid #F2F2F2;
  }
  .con {
    padding: 25px 3.44% 0 3.44%;
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
