<template>
  <!-- 决策支持 -->
  <div class="calculater animated flipInY">
    <p class="title">车险计算器</p>
      <div style="display: flex;justify-content: space-between;">
    <div class="content">
      <div>
        <div class="select">
          <span>手动输入</span>
          <button class="add" @click="add">添加</button>
        </div>
      </div>
      <div style="height:99%;overflow: auto;">
        <div class="table" v-for="(item, index) in list" :key="index">
          <div class="lei">类型</div>
          <div class="radio">
            <p>
              <input type="radio" :name="index" value="1" checked @change="choose('1', item)">交强险
            </p>
            <p>
              <input type="radio" :name="index" value="2" @change="choose('2', item)">商业险
            </p>
          </div>
          <div v-if="item.type === '1'"><span>交强险：</span><input type="text" v-model="item.sali"></div>
          <div v-if="item.type === '2'"><span>商业险：</span><input type="text" v-model="item.commercials"></div>
          <div class="time">
            <span>首付时间：</span>
          </div>
            <el-date-picker
              v-model="item.time"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
              size="mini">
            </el-date-picker>
          <div class="time">
            <span>查询时间：</span>
            </div>
            <el-date-picker
              v-model="endtime"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
              size="mini">
            </el-date-picker>
        </div>
        <button class="find" @click="getData">查询</button>
        <div>
          <div class="select">
            <span>显示结果</span>
          </div>
          <div style="height:99%;overflow: auto;" v-if="datalist.length > 0">
            <div class="table qq" style="border: 1px solid black;" v-for="(tab, i) in datalist" :key="i">
              <div style="margin-left:10px;">总收入：{{tab.sf}}</div>
              <div>盈利：{{tab.yl}}</div>
              <div>本金：{{tab.bj}}</div>
              <div>我方垫付：{{tab.jf}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="width:50%;margin-left:20px;">
      <div class="content ss">
        <div class="select">
          <span>自动选择</span>
        </div>
        <div class="selectData">
          <div style="display: flex;justify-content: space-between;">
            <el-cascader @visible-change="select"
              :options="options2"
              @change="changechan"
              :show-all-levels="false"
              @active-item-change="handleItemChange"
              clearable
              :props="props"
            ></el-cascader>
            <el-select v-model="value" placeholder="请选择" style="width: 220px;">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-date-picker
              v-model="timeType"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </div>
          <div class="findbutton">
            <button class="find1" @click="search2">查询</button>
          </div>
        </div>
        <div class="xianshi">
          <table v-if="show8">
            <tr>
              <th></th>
              <th>总收入</th>
              <th>盈利</th>
              <th>本金</th>
              <th>我方垫付</th>
            </tr>
            <tr>
              <th>统计商业险</th>
              <td>{{resSoure.commercials.sfs}}</td>
              <td>{{resSoure.commercials.yls}}</td>
              <td>{{resSoure.commercials.bjs}}</td>
              <td>{{resSoure.commercials.jfs}}</td>
            </tr>
            <tr>
              <th>统计交强险</th>
              <td>{{resSoure.sali.sfc}}</td>
              <td>{{resSoure.sali.ylc}}</td>
              <td>{{resSoure.sali.bjc}}</td>
              <td>{{resSoure.sali.jfc}}</td>
            </tr>
            <tr>
              <th>合计</th>
              <td>{{resSoure.total.a}}</td>
              <td>{{resSoure.total.b}}</td>
              <td>{{resSoure.total.c}}</td>
              <td>{{resSoure.total.d}}</td>
            </tr>
          </table>
          <table v-if="!show8">
            <tr>
              <th></th>
              <th>总收入</th>
              <th>盈利</th>
              <th>本金</th>
              <th>我方垫付</th>
            </tr>
            <tr>
              <th>统计商业险</th>
              <td>{{resSoure.commercials.sfs}}</td>
              <td>{{resSoure.commercials.yls}}</td>
              <td>{{resSoure.commercials.bjs}}</td>
              <td>{{resSoure.commercials.jfs}}</td>
            </tr>
            <tr>
              <th>统计交强险</th>
              <td>{{resSoure.sali.sfc}}</td>
              <td>{{resSoure.sali.ylc}}</td>
              <td>{{resSoure.sali.bjc}}</td>
              <td>{{resSoure.sali.jfc}}</td>
            </tr>
            <tr>
              <th>合计</th>
              <td>{{resSoure.total.a}}</td>
              <td>{{resSoure.total.b}}</td>
              <td>{{resSoure.total.c}}</td>
              <td>{{resSoure.total.d}}</td>
            </tr>
          </table>
      </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import { Req } from '../../../assets/js/http.js'
export default {
  name: 'Calculater',
  data () {
    return {
      resSoure: {
        commercials: {
          sfs: 0,
          yls: 0,
          jfs: 0,
          bjs: 0
        },
        sali: {
          sfc: 0,
          ylc: 0,
          jfc: 0,
          bjc: 0
        },
        total: {
          a: 0,
          b: 0,
          c: 0,
          d: 0
        }
      },
      type: '1',
      shangye: 0,
      jiaoqiang: 0,
      chechuan: 0,
      time: '',
      qishu: 12,
      endtime: '',
      data: {},
      number: 0,
      tableList: [],
      list: [
        {
          type: '1',
          commercials: 0,
          sali: 0,
          time: '',
          endTime: ''
        }
      ],
      listNum: 0,
      es: [],
      datalist: [
        {
          sf: 0,
          yl: 0,
          bj: 0,
          jf: 0
        }
      ],
      value: '',
      options2: [],
      options: [
        {
          value: 0,
          label: '综合险'
        },
        {
          value: 1,
          label: '商业险'
        },
        {
          value: 2,
          label: '交强险'
        }
      ],
      props: {
        // value: 'label',
        label: 'label',
        value: 'value',
        children: 'cities'
      },
      channelId: '',
      timeType: '',
      show8: true,
      tableList2: {
        advances: 0,
        cAdvances: 0,
        cIncome: 0,
        cPrincipal: 0,
        cProfit: 0,
        cTrueIncome: 0,
        cTrueProfit: 0,
        income: 0,
        principal: 0,
        profit: 0,
        trueIncome: 0,
        trueProfit: 0,
        type: 0
      }
    }
  },
  methods: {
    // 添加按钮
    add () {
      var data = {
        type: '1',
        commercials: 0,
        sali: 0,
        time: '',
        endTime: ''
      }
      this.list.push(data)
    },
    choose (value, item) {
      item.type = value
    },
    getData () {
      for (let i = 0; i < this.list.length; i++) {
        this.list[i].endTime = this.endtime
      }
      let config = {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'token': sessionStorage.getItem('token')
        }
      }
      // this.$post('/interestRate/calculators', this.list, {'contentType': 'application/json; charset=UTF-8'}).then(res => {
      this.$http.post(Req + '/interestRate/calculators', JSON.stringify(this.list), config).then(res => {
        // console.log(res)
        if (res.data.code === 0) {
          this.datalist = res.data.data1
          this.resSoure = res.data.data2
          // console.log(this.resSoure.commercials.sfs)
        } else {
          this.$message(res.data.msg)
        }
      })
    },
    handleItemChange (val) {
      // console.log(val)
      setTimeout(_ => {
        var id = ''
        // POST /admin/channel/getNextChannel
        this.options2.forEach((v, k) => {
          if (v.value === val[0]) {
            id = v.value
            this.$post('/admin/channel/getNextChannel', {
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
        this.$fetch('/admin/channel/getOneChannel').then(res => {
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
    changechan (val) {
      console.log(val)
      // console.log(Array.reverse(val))
      this.channelId = val[val.length - 1]
      this.allchannel = true
      // this.getData()
    },
    search2 () {
      this.$post('/interestRate/calculator', {
        type: this.value,
        time: this.timeType,
        channelId: this.channelId
      }).then(res => {
        this.show8 = false
        this.tableList2 = res.data
      })
    }
  }
}
</script>

<style lang="less" scoped>
.animated {
  -webkit-animation-duration: 2s;
  animation-duration: 2s;
}
.calculater {
  background: #fff;
  height: 100%;
  padding: 40px;
  overflow: scroll;
  font-size: 9px;
  box-sizing: border-box;
  .title {
    font-size: 27px;
    font-weight: bold;
    padding-top: 28px;
  }
}
.content {
  display: inline-block;
  background: none;
  .select {
    font-size: 17px;
    margin-top: 20px;
    margin-bottom: 10px;
    width: 100%;
    justify-content: space-between;
    display: flex;
    font-weight: bold;
    button {
      width: 49px;
      height: 20px;
      border: none;
      background-color: white;
      border-radius: 7px;
      font-size: 10px;
    }
  }
  .table {
    height: 50px;
    overflow: hidden;
    box-shadow:0px 8px 12px 0px rgba(23,3,79,0.1);
    border-radius:10px;
    background-color: white;
    margin-bottom: 10px;
    padding: 0 10px 0 0;
    div {
      display: inline-block;
      height: 100%;
      margin:0;border:0;
      padding:15px 0;
      vertical-align: text-top;
      box-sizing: border-box;
      margin-right: 10px;
      input {
        width: 59px;
        height: 16px;
      }
    }
    .lei {
      display: inline-block;
      background: black;
      color: white;
      height: 100.1%;
      padding: 15px 10px;
    }
    .radio {
      padding: 0;
      p {
        padding: 3px 0;
      }
    }
    .el-date-editor.el-input {
      width: 139px;
    }
  }
  .find {
    float: right;
    width: 113px;
    height: 39px;
    font-size:17px;
    font-family:Adobe Heiti Std R;
    font-weight:normal;
    background: white;
    border-radius:11px;
    margin-top: 10px;
  }
}
.add {
  background-color: #FFC107 !important;
  // margin-right: 10px;
  // box-shadow:0px 5px 10px 0px rgba(23,3,79,0.1);
}
.find {
  background-color: #FFC107 !important;
  // border: 1px solid rgba(23,3,79,0.1);
  // margin-right: 10px;
  // box-shadow:0px 5px 20px 0px rgba(23,3,79,0.2);
}
.ss {
  width: 100%;
 .table {
   display: flex;
   justify-content: space-between;
 }
}
::-webkit-scrollbar {/*隐藏滚轮*/
  display: none;
  }
  .xianshi {
    width: 100%;
    border:1px solid rgba(255,255,255,1);
    border-radius:14px;
    height: 109px;
  }
  .content .table .el-date-editor.el-input[data-v-76d92dd6] {
    padding: 12px 0!important;
  }
  .xianshi {
    background: white;
    box-shadow:0px 15px 20px 0px rgba(23,3,79,0.1);
    border-radius:20px;
    margin-top: 20px;
    border: 1px solid black;
    table {
      // background: white;
      width: 100%;
      td, th {
        width: 19%;
        text-align: center;
        height: 20px;
      }
    }
  }
  .qq {
    display: flex;
    justify-content: space-between;
  }
  .findbutton {
    width: 100%;
    text-align: right;
    .find1 {
      width: 113px;
      height: 39px;
      font-size:17px;
      font-family:Adobe Heiti Std R;
      font-weight:normal;
      background: #FFC107;
      border-radius:11px;
      margin-top: 10px;
    }
  }
  .selectData {
    .el-date-picker {
      height: 40px;;
    }
  }
</style>
