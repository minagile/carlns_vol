<template>
  <div class="chart animated flipInY">
    <selector :all="true" :vol="true"></selector>
    <div class="con">
      <div class="btn">
        <button
          v-for="(btn, index) in btnList"
          :key="index"
          :class="{active : num == index}"
          @click="tab(index)"
        >
          {{btn}}
        </button>
      </div>
      <div class="change">
        <button :class="{active : num1 === 0}" @click="changeChart(0)">ss</button>
        <button :class="{active : num1 === 1}" @click="changeChart(1)">ss</button>
      </div>
      <div id="main" style="width: 59.55%;height:432px;background: #fff;margin: 0 auto;"></div>
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
      btnList: ['分期总金额', '还款总金额', '渠道占比', '还款率', '逾期率', '退保率', '险种占比'],
      num: 0,
      num1: 0
    }
  },
  mounted () {
    this.getEchart()
  },
  methods: {
    tab (e) {
      this.num = e
    },
    changeChart (e) {
      this.num1 = e
    },
    getEchart () {
      var myChart = echarts.init(document.getElementById('main'))
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
            data: ['Mon', 'Tue', 'Wed', 'Thu'],
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
            data: [10, 52, 200, 334],
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
    }
    button:nth-of-type(1){
      border-right: none;
      border-radius: 5px 0 0 5px;
    }
    button:nth-of-type(2){
      border-left: none;
      border-radius: 0px 5px 5px 0px;
    }
    .active {
      background: #FF9494;
      color: white;
      border: none;
    }
  }
}
</style>
