<template>
  <div class="Selector">
    <div class="Selector-main">
      <button class="all" :class="{isVol : vol == 1}" v-if="all" @click="clearTime(0, 0)">全部时间</button>
      <el-date-picker
        v-model="startTime"
        type="date"
        placeholder="选择日期"
        value-format="yyyy-MM-dd">
      </el-date-picker>
      -
      <el-date-picker
        v-model="endTime"
        type="date"
        placeholder="选择日期"
        value-format="yyyy-MM-dd">
      </el-date-picker>

      <button class="span" @click="clearTime(0)">清除</button>
    </div>

    <div class="Selector-main">
      <button @click="clearTime(1, 0)" class="all" v-if="all" :class="{isVol : vol == 1}">全部渠道</button>

      <el-select v-model="selectChannel" placeholder="选择渠道">
        <el-option
          v-for="item in channelList"
          :key="item.channelId"
          :label="item.channelName"
          :value="item.channelId">
        </el-option>
      </el-select>
      <button class="search" @click="giveParams" :class="{isVolS : vol == 1}">查询</button>
      <button class="clear" @click="clearTime(1)">清空</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Selector',
  data () {
    return {
      startTime: '',
      endTime: new Date(),
      selectChannel: ''
    }
  },
  mounted () {
  },
  methods: {
    clearTime (msg, data) {
      if (msg === 0) {
        this.startTime = ''
        this.endTime = ''
      } else {
        this.selectChannel = ''
      }
      if (data === 0) {
        this.giveParams()
      }
    },
    giveParams () { // 彭可润接口，选择全部时间时，时间字段的值不能为空，要去除时间的字段
      let selectData = {
        startTime: this.startTime,
        endTime: this.endTime,
        selectChannel: this.selectChannel
      }
      this.$emit('giveParams', selectData)
    }
  },
  props: {
    all: {
      type: Boolean,
      default: false
    },
    vol: {
      type: Boolean,
      default: false
    },
    channelList: {
      type: Array
    }
  }
}
</script>

<style lang="less" scoped>
@bgcolor: #FFC107;
.Selector {
  padding: 25px 3.44% 0 3.44%;
  .Selector-main {
    padding-bottom: 22px;
    .all {
      width:122px;
      color: white;
      height:40px;
      background:rgba(73,119,252,1);
      border-radius:4px;
      margin-right: 1.98%;
    }
    input {
      width:32.16%;
      height:40px;
      background:rgba(255,255,255,1);
      border:1px solid rgba(217,217,217,1);
      border-radius:4px;
      text-indent: 10px;
    }
    .span {
      margin-left: 10px;
      font-size:18px;
      font-family:MicrosoftYaHei;
      font-weight:400;
      color:rgba(73,119,252,1);
      border: none;
      background: none;
      // cursor:pointer;
    }
    .search {
      width:75px;
      height:40px;
      border:1px solid rgba(73,119,252,1);
      border-radius:4px;
      color: #4977FC;
      background: white;
      margin-left: 10px;
    }
    .clear {
      width:75px;
      height:40px;
      background:rgba(255,255,255,1);
      border:1px solid rgba(217,217,217,1);
      border-radius:4px;
      margin-left: 10px;
    }
    .el-select {
      width: 16.49%;
    }
    .el-date-editor {
      width: 16.49%;
    }
    button:hover {
      opacity: 0.5;
    }
    button:active {
      opacity: 1;
    }
    .isVol {
      background: @bgcolor;
      color: black;
    }
    .isVolS {
      border: 1px solid #282828;
      color: #282828;
    }
  }
}
</style>
