<template>
  <!-- 生成报价单 -->
  <div class="QuotationOrder">
    <div class="header">
      <el-select v-model="value4" clearable placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="value4" clearable placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button class="up">上传</el-button>
      <el-button>清空</el-button>
    </div>

    <div class="order-table">
      <div class="order-table-header">
        <span>批次：</span>
        <span>企业名称：</span>
        <span>险种：</span>
        <span>车辆数：</span>
        <span>预收款合计：</span>
      </div>
      <table>
        <tr>
          <th>车牌号</th>
          <th>商业险</th>
          <th>保费总额</th>
          <th>申请金额</th>
          <th>平台费率</th>
          <th>每月还款</th>
          <th>首付款</th>
          <th>服务费</th>
        </tr>
        <tr v-for="(item, index) in orderList" :key="index">
          <td><input type="text" v-model="item.chepaihao"></td>
          <td><input type="text" v-model="item.shangyexian"></td>
          <td><input type="text" v-model="item.baofei"></td>
          <td><input type="text" v-model="item.shenqing"></td>
          <td><input type="text" v-model="item.pingtai"></td>
          <td><input type="text" v-model="item.meiyue"></td>
          <td><input type="text" v-model="item.shoufu"></td>
          <td><input type="text" v-model="item.fuwu"></td>
        </tr>
        <tr>
          <td>小计(元):</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td colspan="8">合计(元):</td>
        </tr>
      </table>
    </div>

    <div class="btn">
      <el-button class="cancel">取消</el-button>
      <el-button class="submit">确定</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuotationOrder',
  data () {
    return {
      options: [{
        value: '选项1',
        label: '黄金糕'
      }],
      value4: '',
      orderList: [
        {
          name: 123
        },
        {
          name: 123
        }
      ]
    }
  },
  mounted () {
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.QuotationOrder {
  // height: 100%;
  .header {
    height: 70px;
    padding-top: 37px;
    padding-left: 43px;
    border-bottom: 13px solid #EDEDED;
    .up {
      background:rgba(255,193,7,1);
      border-color:rgba(255,193,7,1);
      margin-left: 40px;
    }
  }
  .order-table {
    margin: 20px 23px 0;
    .order-table-header {
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
      // height: calc(100% - 58px);
      // display: block;
      width: 100%;
      // // height: 58px;
      // overflow: scroll;
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
  .btn {
    text-align: center;
    padding: 90px 0 64px 0;
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
</style>
