<template>
  <div class="Selector">
    <div class="Selector-main">
      <button class="all" :class="{isVol : vol == 1, chooseall: alltime === true}" v-if="all" @click="clearTime(0)">全部时间</button>
      <el-date-picker
        v-model="startTime"
        type="date"
        placeholder="选择日期"
        value-format="yyyy-MM-dd">
      </el-date-picker>
      -
      <el-date-picker @change="clickaaa"
        v-model="endTime"
        type="date"
        placeholder="选择日期"
        value-format="yyyy-MM-dd">
      </el-date-picker>
    </div>

    <div class="Selector-main">
      <button @click="clearTime(1)" class="all" v-if="all" :class="{isVol : vol == 1, chooseall: allchannel === true}">全部渠道</button>

      <el-select v-model="selectChannel" placeholder="选择渠道" v-if="!double">
        <el-option
          v-for="item in channelList"
          :key="item.channelId"
          :label="item.channelName"
          :value="item.channelId">
        </el-option>
      </el-select>
      <el-cascader @visible-change="select"
        placeholder="请选择渠道"
        :options="options2"
        @change="changechan"
        :show-all-levels="false"
        @active-item-change="handleItemChange"
        clearable
        :props="props"
        v-if="double"
      ></el-cascader>
      <el-select v-model="batch"
        clearable
        filterable
        remote
        default-first-option
        placeholder="请选择订单号" @visible-change="selectBatch" v-if="double">
        <el-option
          v-for="item in options1"
          :key="item.value"
          :label="item.label"
          :value="item.value">
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
      options1: '',
      batch: '',
      allchannel: false,
      alltime: false,
      startTime: '',
      endTime: '',
      selectChannel: 0,
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
      NumValue: 10,
      options2: [],
      props: {
        // value: 'label',
        label: 'label',
        value: 'value',
        children: 'cities'
      },
      channelId: ''
    }
  },
  mounted () {
    this.handleItemChange()
  },
  methods: {
    selectBatch (val) {
      if (val === true) {
        this.options1 = []
        let url = ''
        if (this.vol) {
          url = '/admin/requisition/getBatchByChannelId'
        } else {
          url = '/user/urequisition/getBatchByChannelId'
        }
        this.$fetch(url, {channelId: this.channelId}).then(res => {
          // console.log(res)
          if (res.code === 0) {
            if (res.data.length > 0) {
              res.data.forEach(v => {
                this.options1.push({value: v.requisitionId, label: v.requisitionId})
              })
            } else {
              this.options1 = [{
                value: null,
                label: '暂无数据'
              }]
            }
          } else {
            this.$message(res.msg)
          }
        })
      }
    },
    clickaaa () {
      // console.log(234)
      this.alltime = true
    },
    changechan (val) {
      // console.log(val)
      this.channelId = val[val.length - 1]
      // console.log(this.channelId)
      this.allchannel = true
      // this.getData()
    },
    handleItemChange (val) {
      this.batch = ''
      setTimeout(_ => {
        var id = ''
        // POST /admin/channel/getNextChannel
        this.options2.forEach((v, k) => {
          if (v.value === val[0]) {
            id = v.value
            let url = ''
            if (this.vol) {
              url = '/admin/channel/getNextChannel'
            } else {
              url = '/user/uchannel/getNextChannel'
            }
            this.$post(url, {
              parentId: id
            }).then(res => {
              // console.log(res)
              if (res.code === 0) {
                v.cities = []
                if (res.data.length > 0) {
                  v.cities = [{ label: v.label, value: v.value }]
                  res.data.forEach(m => {
                    v.cities.push({ label: m.channelName, value: m.channelId })
                  })
                } else {
                  v.cities.push({ label: v.label, value: v.value })
                }
              }
            })
          }
        })
      }, 300)
    },
    // 查询所有渠道
    select (val) {
      if (val === true) {
        // this.selectAllChannel = []
        this.options2 = []
        // GET /admin/channel/getOneChannel
        let url = ''
        if (this.vol) {
          url = '/admin/channel/getOneChannel'
        } else {
          url = '/user/uchannel/getOneChannel'
        }
        this.$fetch(url).then(res => {
          // console.log(res.data)
          if (res.code === 0) {
            res.data.forEach(v => {
              this.options2.push({value: v.channelId, label: v.channelName, cities: []})
              // this.selectAllChannel.push({value: v.channelId, label: v.channelName})
            })
          } else {
            this.$message(res.msg)
          }
        })
      }
    },
    clearTime (val) {
      if (val === 0) {
        this.startTime = null
        this.endTime = null
        this.alltime = false
      } else {
        this.allchannel = false
        this.channelId = null
        this.batch = null
        this.selectChannel = 0
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
        selectChannel: this.channelId,
        report: this.selectChannel,
        requisitionId: this.batch
      }
      // console.log(selectData)
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
      type: Array || Object
    },
    sortTable: {
      type: Boolean,
      default: true
    },
    refresh: {
      type: Boolean,
      default: false
    },
    double: {
      type: Boolean,
      default: true
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
    .chooseall {
      background: #fff;
      border: 1px solid #282828;
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
    &:hover {
      background-image: url(../../assets/img/fresh.png);
    }
  }
}
</style>
