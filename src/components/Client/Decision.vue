<template>
  <!-- 决策支持 -->
  <div class="Decision">
    <selector :all="true" @giveParams="allTime" :channelList="channelList" :sortTable="false"></selector>
    <chart @getChartData="getChartData" :chartData="chartData"></chart>
  </div>
</template>

<script>
import Selector from '../common/Selector'
import Chart from './Decision/Chart'
export default {
  name: 'Decision',
  data () {
    return {
      selectData: {},
      chartData: [],
      channelList: []
    }
  },
  created () {
    this.getChartData('TotalAmountInStages', this.selectData)
    this.getChannelList()
  },
  methods: {
    allTime (data) {
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
      this.getChartData(this.url)
    },
    getChartData (data) {
      this.url = data
      this.$post(`/user/report/${data}`, this.selectData).then(res => {
        this.chartData = res
        console.log(res)
      })
    },
    getChannelList () {
      this.$fetch('/user/report/getChannelName').then(res => {
        this.channelList = res
      })
    }
  },
  components: {
    Selector,
    Chart
  }
}
</script>

<style lang="less" scoped>
.Decision {
  background: #fff;
  min-height: calc(100% - 100px);
  border-radius: 16px;
  margin: 0 34px;
  box-sizing: border-box;
  .Selector {
    border-bottom: 20px solid #F2F2F2;
  }
}
</style>
