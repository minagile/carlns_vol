<template>
  <!-- 退保保单列表 -->
  <div class="VolInsuranceCancel">
    <selector
      :all="true"
      :vol="true"
      @sort="sort"
      @page="page"
      @giveParams="giveParams"
    >
    </selector>

    <el-button size="small" class="tuibao" @click="centerDialogVisible = true">+ 新增退保</el-button>

    <el-table
      ref="multipleTable"
      :data="tableData3"
      tooltip-effect="dark"
      border
      max-height="500"
      style="width: 95%; margin: 0 auto;border: 1px solid #eee"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="requisitionId" label="订单号" width="180"></el-table-column>
      <el-table-column prop="carNumber" label="车牌" width="180"></el-table-column>
      <el-table-column prop="channelName" label="公司"></el-table-column>
      <el-table-column prop="coverageName" label="险种"></el-table-column>
      <el-table-column prop="createTime" label="投保时间"></el-table-column>
      <el-table-column prop="remark" label="退保原因"></el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination v-if="total > NumValue"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="NumValue"
      layout="prev, pager, next, total, jumper"
      :total="total">
    </el-pagination>

    <!-- 新增退保 -->
    <el-dialog :visible.sync="centerDialogVisible" width="760px">
      <div class="dialog-header">新增退保</div>
      <div class="top">
        <el-select v-model="value" placeholder="请输入公司名称" @visible-change="select">
          <el-option
            v-for="item in selectAllChannel"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="value1" placeholder="请输入车牌号" @visible-change="getAllCar">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button class="check" @click="checkAllData">查询</el-button>
        <el-button>清空</el-button>
      </div>
      <table>
        <tr>
          <th>车牌号</th>
          <th>公司</th>
          <th>险种</th>
          <th>投保时间</th>
          <th>操作</th>
        </tr>
        <tr>
          <td>沪A00000</td>
          <td>xxxx股份有限公司</td>
          <td>商业险</td>
          <td>2018-12-03</td>
          <td><el-button size="small" @click="innerVisible = true, id == 1">退保</el-button></td>
        </tr>
      </table>
      <el-dialog
        width="420px"
        :visible.sync="innerVisible"
        append-to-body
        :show-close="false"
        top="400px">
        <el-input type="textarea" v-model="reason" placeholder="请输入退保原因" style="margin:-50px 20px 0;width: 380px;"></el-input>
        <div class="btn">
          <el-button class="sure" size="small" @click="out">确定</el-button>
          <el-button class="back" size="small" @click="innerVisible = false">返回</el-button>
        </div>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import Selector from '../../common/Selector'
export default {
  name: 'VolInsuranceCancel',
  data () {
    return {
      centerDialogVisible: false,
      currentPage4: 1,
      tableData3: [],
      options: [],
      selectAllChannel: [],
      value: '',
      value1: '',
      innerVisible: false,
      serchDate: [],
      SortValue: '1',
      NumValue: 10,
      total: 0,
      reason: '',
      id: ''
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    out () {
      this.$fetch('/admin/car/dropCar', {
        carId: this.id,
        remark: this.reason
      }).then(res => {
        console.log(res)
        if (res.code === 0) {
        } else {
          this.$message(res.msg)
        }
      })
    },
    // 查询保单信息
    checkAllData () {
      this.$fetch('/admin/car/getCarByChannelIdOrCarId', {
        channelId: this.value,
        carId: this.value1
      }).then(res => {
        console.log(res)
        if (res.code === 0) {
          // res.data.forEach(v => {
          //   this.selectAllChannel.push({value: v.channelId, label: v.channelName})
          // })
        } else {
          this.$message(res.msg)
        }
      })
    },
    // 根据渠道id得到渠道下面所有有效的车辆展示接口
    getAllCar (val) {
      if (val === true) {
        this.options = []
        this.$fetch('/admin/car/getAllCarByChannelId', {channelId: this.value}).then(res => {
          console.log(res)
          if (res.code === 0) {
            res.data.forEach(v => {
              this.options.push({value: v.channelId, label: v.channelName})
            })
          } else {
            this.$message(res.msg)
          }
        })
      }
    },
    // 查询所有渠道
    select (val) {
      if (val === true) {
        this.selectAllChannel = []
        this.$fetch('/admin/channel/selectAllChannel').then(res => {
          // console.log(res)
          if (res.code === 0) {
            res.data.forEach(v => {
              this.selectAllChannel.push({value: v.channelId, label: v.channelName})
            })
          } else {
            this.$message(res.msg)
          }
        })
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    giveParams (data) {
      // console.log(data)
      this.serchDate = data
      this.getData()
    },
    // 一页几条数据
    page (data) {
      this.NumValue = data
      this.getData()
    },
    // 正序反序
    sort (data) {
      this.SortValue = data
      this.getData()
    },
    handleSizeChange (val) {
      this.NumValue = val
      this.getData()
    },
    handleCurrentChange (val) {
      this.currentPage4 = val
      this.getData()
    },
    getData () {
      var data = {
        beginTime: this.serchDate.startTime,
        endTime: this.serchDate.endTime,
        channelName: this.serchDate.selectChannel,
        order: this.SortValue,
        page: this.currentPage4,
        pageSize: this.NumValue
      }
      // console.log(data)
      this.$fetch('/admin/car/getSurrenderCar', data).then(res => {
        if (res.code === 0) {
          console.log(res.data)
          this.tableData3 = res.data.rows
          this.total = res.data.records
        } else {
          this.$message(res.msg)
        }
      })
    }
  },
  components: {
    Selector
  }
}
</script>

<style lang="less" scoped>
.el-pagination  {
  // margin-top: 50px;
}
.VolInsuranceCancel {
  .tuibao {
    float: right;
    margin-right: 2.5%;
    margin-top: -55px;
    background:rgba(255,193,7,1);
    border-color:rgba(255,193,7,1);
    border-radius:4px;
    position: relative;
    z-index: 10;
    &:hover {
      color: #333;
    }
    &:focus {
      color: #333;
    }
  }
  .header {
    padding: 10px 0 30px 2.5%;
  }
  .el-dialog {
    .top {
      height: 60px;
      border-bottom: 10px solid #F6F6F6;
      padding-left: 20px;
      .el-select {
        margin-right: 35px;
      }
      .el-select .el-input {
        width: 251px;
      }
      .check {
        border:1px solid rgba(40,40,40,1);
        color:rgba(40,40,40,1);
      }
      .el-button:hover, .el-button:focus {
        background: #fff;
        color:rgba(40,40,40,1);
        border-color:rgba(40,40,40,1);
      }
    }
    table {
      border-collapse: collapse;
      width: 100%;
      height: 500px;
      th {
        height: 60px;
      }
      tr {
        text-align: center;
      }
    }
  }
}
.btn {
  text-align: right;
  margin-top: 20px;
  margin-right: 20px;
  .el-button:hover {
    color: #333;
    background: #fff;
  }
  .sure {
    background: #FFC107;
    color: #333;
    &:hover {
      background: #FFC107;
    }
  }
}
</style>
