<template>
  <!-- 决策支持 -->
  <div class="Decision">
    <!-- <selector :all="true" @giveParams="allTime" :channelList="channelList" :sortTable="false" :double="false"></selector> -->
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
      selectData: {
        channelName: 0
      },
      chartData: [],
      channelList: []
    }
  },
  created () {
    // this.getChartData('TotalAmountInStages', this.selectData)
    // this.getChannelList()
  },
  methods: {
    allTime (data) {
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
      this.getChartData(this.url)
    },
    getChartData (data) {
      this.url = data
      this.$post(`/user/report/${data}`, this.selectData).then(res => {
        if (res.code === 0) {
          this.chartData = res.data
          this.$message(res.msg)
        } else {
          this.$message(res.msg)
        }
      })
    },
    getChannelList () {
      this.$fetch('/user/report/getChilds').then(res => {
        var aa = [{
          channelId: 0,
          channelName: '全部渠道'
        }]
        this.channelList = aa.concat(res)
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
  // background: #fff;
  min-height: calc(100% - 100px);
  border-radius: 16px;
  margin: 0 34px;
  box-sizing: border-box;
  overflow: hidden;
  // .Selector {
  //   border-bottom: 20px solid #F2F2F2;
  // }
}
</style>
