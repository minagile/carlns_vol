<template>
  <div class="Selector">
    <div class="Selector-main">
      <button class="all" :class="{isVol : vol == 1}" v-if="all" @click="clearTime(0)">全部时间</button>
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
    </div>

    <div class="Selector-main">
      <button @click="clearTime(1)" class="all" v-if="all" :class="{isVol : vol == 1}">全部渠道</button>

      <el-select v-model="selectChannel" placeholder="选择渠道">
        <el-option
          v-for="item in channelList"
          :key="item.channelId"
          :label="item.channelName"
          :value="item.channelId">
        </el-option>
      </el-select>
      <button class="search" @click="giveParams" :class="{isVolS : vol == 1}">查询</button>
    </div>

    <div class="Amortized-sort" v-if="sortTable">
      <span>排序</span>
      <el-select v-model="SortValue" placeholder="请选择正反序" @change="sortchange">
        <el-option
          v-for="item in SortOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <span>显示</span>
      <el-select v-model="NumValue" placeholder="请选择" @change="numchange" style="width: 70px;">
        <el-option
          v-for="item in numOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          >
        </el-option>
      </el-select>
      <span>条</span>
      <el-button v-if="refresh" @click="refurbish"></el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Selector',
  data () {
    return {
      startTime: '',
      endTime: '',
      selectChannel: '',
      SortOptions: [
        {
          value: 1,
          label: '序号正序'
        },
        {
          value: 2,
          label: '序号反序'
        }
      ],
      numOptions: [
        {value: 5},
        {value: 10},
        {value: 15},
        {value: 25}
      ],
      SortValue: 1,
      NumValue: 10
    }
  },
  mounted () {
  },
  methods: {
    clearTime (val) {
      if (val === 0) {
        this.startTime = ''
        this.endTime = ''
      } else {
        this.selectChannel = ''
      }
      this.giveParams()
    },
    sortchange (data) {
      this.$emit('sort', this.SortValue)
    },
    numchange () {
      this.$emit('page', this.NumValue)
    },
    giveParams () { // 传递数据
      let selectData = {
        startTime: this.startTime,
        endTime: this.endTime,
        selectChannel: this.selectChannel
      }
      this.$emit('giveParams', selectData)
    },
    refurbish () {
      this.$emit('getData')
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
    },
    sortTable: {
      type: Boolean,
      default: true
    },
    refresh: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="less" scoped>
@bgcolor: #FFC107;
.Selector {
  padding: 25px 3.44% 23px 3.44%;
  position: relative;
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
      position: absolute;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: #fff;
      line-height: 60px;
      text-align: center;
      top: 40px;
      left: 52%;
      cursor: pointer;
      border:1px solid rgba(217,217,217,1);
      &:hover {
        background: rgba(73,119,252,1);
        border-color: rgba(73,119,252,1);
        color: #fff;
      }
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
    // button:hover {
    //   opacity: 0.5;
    // }
    // button:active {
    //   opacity: 1;
    // }
    .isVol {
      background: @bgcolor;
      color: black;
    }
    .isVolS {
      border: 1px solid #282828;
      color: #282828;
      &:hover {
        background: @bgcolor;
        border-color: @bgcolor;
        color: black;
      }
    }
  }
}
.Amortized-sort {
  // padding: 25px 3.44% 23px 3.44%;
  .el-select:nth-of-type(1) {
    width: 138px;
    margin-left: 10px;
    margin-right: 40px;
  }
  .el-select:nth-of-type(2) {
    width: 138px;
    margin: 0 10px;
  }
  button {
    width:88px;
    height:35px;
    background:rgba(255,255,255,1);
    border:1px solid rgba(232,232,232,1);
    border-radius:4px;
    float: right;
    color: #4977FC;
  }
  .el-button {
    float: right;
    width: 88px;
    height: 36px;
    background-image: url(../../assets/img/refresh.png);
  }
}
</style>
