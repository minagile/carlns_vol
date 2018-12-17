 <template>
  <!-- 制作付款计划表 -->
  <div class="AddByPerson">
    <div class="header">
      <div class="select">
        <el-cascader @visible-change="select"
          :options="options2"
          @change="changechan"
          :show-all-levels="false"
          @active-item-change="handleItemChange"
          clearable
          :props="props"
        ></el-cascader>
        <el-select v-model="batch"
          clearable
          filterable
          remote
          default-first-option
          placeholder="请选择订单号" @visible-change="selectBatch">
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button @click="carList">查询车辆</el-button>
      </div>
    </div>
    <div class="inventory" v-show="showList">
      <table>
        <tr>
          <th>序号</th>
          <th>车牌号</th>
          <th>保单号</th>
        </tr>
        <tr v-for="(item, index) in list" :key="index">
          <th>{{ index + 1 }}</th>
          <th>{{ item.carNumber }}</th>
          <th><input type="text" v-model="item.baodan"></th>
        </tr>
      </table>
    </div>

    <div class="btn" v-show="showList">
      <el-button class="cancel">取消</el-button>
      <el-button class="submit" @click="addbaodan">确定</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddByPerson',
  data () {
    return {
      addbaodanhao: '',
      showList: false,
      list: [],
      selectAllChannel: [],
      options1: [],
      batch: null,
      // 二级级联
      channelId: '',
      options2: [],
      props: {
        // value: 'label',
        label: 'label',
        value: 'value',
        children: 'cities'
      }
    }
  },
  mounted () {
  },
  methods: {
    carList () {
      this.$fetch('/admin/stager/selectcarName', {
        channelId: this.channelId,
        requisitionId: this.batch
      }).then(res => {
        // console.log(res.data)
        if (res.code === 0) {
          this.list = res.data
          this.showList = true
        } else {
          this.$message(res.msg)
        }
      })
    },
    addbaodan () {
      // console.log(this.list)
      var carId = ''
      var policyNumber = ''
      this.list.forEach(v => {
        carId += v.carId + ','
        policyNumber += v.baodan + ','
      })
      // GET /admin/stager/addPolicyNumber
      this.$fetch('/admin/stager/addPolicyNumber', {
        channelId: this.channelId,
        requisitionId: this.batch,
        carId: carId,
        policyNumber: policyNumber
      }).then(res => {
        if (res.code === 0) {
          this.$message(res.msg)
        } else {
          this.$message(res.msg)
        }
      })
    },
    selectBatch (val) {
      if (val === true) {
        this.options1 = []
        this.$fetch('/admin/requisition/getBatchByChannelId', {channelId: this.channelId}).then(res => {
          // console.log(res)
          if (res.code === 0) {
            res.data.forEach(v => {
              this.options1.push({value: v.requisitionId, label: v.requisitionId})
            })
          } else {
            this.$message(res.msg)
          }
        })
      }
    },
    changechan (val) {
      // console.log(val)
      this.channelId = val[val.length - 1]
      // console.log(this.channelId)
      // this.getData()
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
    }
  }
}
</script>

<style lang="less" scoped>
.AddByPerson {
  .header {
    min-height: 107px;
    overflow: hidden;
    // padding-top: 37px;
    padding-left: 43px;
    border-bottom: 13px solid #EDEDED;
    .select {
      // float: left;
      // width: 220px;
      padding-top: 14px;
      margin-right: 29px;
      .el-select {
        margin-left: 30px;
        margin-top: 20px;
      }
    }
  }
  .inventory {
    // margin: 20px 23px 0;
    padding: 15px 23px 32px;
    // border-bottom: 13px solid #f2f2f2;
    p {
      font-size: 15px;
      line-height: 30px;
    }
    .order-table-header {
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
      padding: 21px 26px;
      font-size: 16px;
      font-weight:bold;
      background:rgba(248,248,248,1);
      height:58px;
      box-sizing: border-box;
      border: 1px solid #E5E5E5;
      border-bottom: 0;
    }
    table {
      border-collapse: collapse;
      // display: block;
      width: 100%;
      input {
        border: none;
        padding: 0 10px;
        width: 11.5%;
      }
      td, th{
        border: 1px solid #E5E5E5;
        text-align: left;
        height: 50px;
        color: #262626;
        font-weight: normal;
        text-indent: 13px;
        input {
          width: 100%;
          display: block;
          padding: 0;
          text-indent: 13px;
          height: 50px;
          line-height: 50px;
        }
      }
    }
  }
  .schadule {
    border: 0;
    table {
      margin-top: 20px;
      margin-bottom: 35px;
      td {
        p {
          float: left;
          &:last-child {
            float: right;
          }
        }
      }
    }
    .t {
      text-align: right;
      line-height: 50px;
    }
  }
  .btn {
    text-align: center;
    padding: 70px 0 64px 0;
    margin-bottom: 34px;
    .cancel {
      color: #282828;
      background: #fff;
      border-color: #282828;
    }
    .submit {
      background: #282828;
      color: #fff;
      margin-left: 166px;
      border-color:#282828;
    }
  }
}
.nextHeader {
  display: flex;
  justify-content: space-around;
  padding: 0 43px;
  padding-top: 12px;
  padding-bottom: 80px;
  .upfilekuang{
    width:609px;
    height:106px;
    background:rgba(255,255,255,1);
    box-shadow:0px 1px 5px 0px rgba(181,181,181,0.3);
    border-radius:10px;
    // margin-top: 12px;
    // margin-left: 43px;
    .up {
      background:rgba(255,193,7,1);
      border-color:rgba(255,193,7,1);
      margin-left: 40px;
      margin-top: 37px;
    }
    .upfile {
      float: left;
      width:145px;
      height:75px;
      background:rgba(255,255,255,1);
      border:1px solid rgba(217,217,217,1);
      border-radius:4px;
      text-align: center;
      margin-top: 14px;
      margin-left: 15px;
      cursor: pointer;
      position: relative;
      img {
        margin-top: 8px;
      }
      p {
        line-height: 30px;
        font-size: 12px;
      }
      input {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        cursor: pointer;
      }
    }
  }
  .addNumber {
    width:448px;
    height:106px;
    background:rgba(255,255,255,1);
    box-shadow:0px 1px 5px 0px rgba(181,181,181,0.3);
    border-radius:10px;
    padding: 36px 16px;
    box-sizing: border-box;
    input {
      width:308px;
      height:40px;
      background:rgba(255,255,255,1);
      border:1px solid rgba(217,217,217,1);
      border-radius:4px;
    }
    button {
      width:75px;
      height:40px;
      background:rgba(255,193,7,1);
      border-radius:4px;
    }
  }
  .creatTable {
    width:225px;
    height:106px;
    background:rgba(255,255,255,1);
    box-shadow:0px 1px 5px 0px rgba(181,181,181,0.3);
    border-radius:10px;
    padding: 32px 32px;
    box-sizing: border-box;
    .round {
      width:151px;
      height:40px;
      background:rgba(255,193,7,1);
      border-radius:4px;
      // line-height: 66px;
      font-size: 15px;
      text-align: center;
      // cursor: pointer;
    }
  }
}
</style>
