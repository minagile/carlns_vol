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
      v-loading="loading"
      max-height="450"
      style="width: 95%; margin: 0 auto"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="requisitionId" label="订单号" min-width="180"></el-table-column>
      <el-table-column prop="carNumber" label="车牌"></el-table-column>
      <el-table-column prop="channelName" label="公司"></el-table-column>
      <el-table-column prop="coverageName" label="险种" min-width="70"></el-table-column>
      <el-table-column label="投保时间" min-width="120">
        <template slot-scope="scope">
          {{ scope.row.createTime | timeChange }}
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="退保原因"></el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button type="text" @click="cancel(scope.row.carId)">删除</el-button>
        </template>
      </el-table-column>
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
        <!-- <el-select v-model="value" placeholder="请输入公司名称" @visible-change="select">
          <el-option
            v-for="item in selectAllChannel"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select> -->
        <el-cascader @visible-change="select"
          placeholder="请选择公司名称"
          :options="options2"
          @change="changechan"
          :show-all-levels="false"
          @active-item-change="handleItemChange"
          clearable
          :props="props"
        ></el-cascader>
        <el-select
          v-model="value1"
          placeholder="请输入车牌号"
          @visible-change="getAllCar"
          filterable
          remote
          default-first-option
          clearable
          >
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
      <div class="table">
        <table>
          <tr>
            <th>车牌号</th>
            <th>公司</th>
            <th>险种</th>
            <th>投保时间</th>
            <th>操作</th>
          </tr>
          <tr v-for="(o, i) in tableList" :key="i">
            <td>{{ o.carNumber }}</td>
            <td>{{ o.channelName }}</td>
            <td>{{ o.coverageName }}</td>
            <td>{{ o.createTime | timeChange }}</td>
            <td><el-button size="small" @click="tuibaobtn(o.carId)">退保</el-button></td>
          </tr>
        </table>
      </div>
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
      loading: false,
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
      id: '',
      tableList: [],
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
    this.getData()
  },
  methods: {
    tuibaobtn (id) {
      this.innerVisible = true
      this.id = id
    },
    out () {
      this.$post('/admin/car/dropCar', {
        carId: this.id,
        remark: this.reason
      }).then(res => {
        // console.log(res)
        if (res.code === 0) {
          this.innerVisible = false
          this.centerDialogVisible = false
          this.getData()
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
        // console.log(res)
        if (res.code === 0) {
          this.tableList = res.data
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
          // console.log(res)
          if (res.code === 0) {
            res.data.forEach(v => {
              this.options.push({value: v.carId, label: v.carNumber})
            })
          } else {
            this.$message(res.msg)
          }
        })
      }
    },
    changechan (val) {
      // console.log(val)
      this.value = val[val.length - 1]
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
    change () {
      this.getData()
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
      this.loading = true
      var data = {
        // channelId: '',
        startTime: this.serchDate.startTime,
        endTime: this.serchDate.endTime,
        // corporateName: this.serchDate.selectChannel,
        channelId: this.serchDate.selectChannel,
        requisitionId: this.serchDate.requisitionId,
        order: this.SortValue,
        page: this.currentPage4,
        pageSize: this.NumValue
      }
      // console.log(data)
      this.$fetch('/admin/car/getSurrenderCar', data).then(res => {
        this.loading = false
        if (res.code === 0) {
          // console.log(res.data)
          this.tableData3 = res.data.rows
          this.total = res.data.records
        } else {
          this.$message(res.msg)
        }
      })
    },
    cancel (id) {
      this.$confirm('此操作将永久删除信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$post('/admin/car/delete', {
          carId: id
        }).then(res => {
          if (res.code === 0) {
            this.$message.success(res.msg)
            this.getData()
          } else {
            this.$message.error(res.msg)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  },
  components: {
    Selector
  },
  filters: {
    timeChange (data) {
      let date = new Date(data)
      return date.getFullYear() + '-' + zero(date.getMonth() + 1) + '-' + zero(date.getDate())
    },
    time (data) {
      return data.split(' ')[0].replace('-', '.').replace('-', '.')
    }
  }
}
function zero (data) {
  if (data < 10) return '0' + data
  return data
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
    .table {
      height: 500px;
      overflow: scroll;
    }
    table {
      border-collapse: collapse;
      width: 100%;
      th {
        height: 60px;
      }
      tr {
        text-align: center;
        height: 50px;
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
