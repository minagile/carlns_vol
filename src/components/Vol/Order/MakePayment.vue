 <template>
  <!-- 制作付款计划表 -->
  <div class="MakePayment">
    <div class="header">
      <div class="select">
        <el-select v-model="value4" size="small" clearable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="value4" size="small" clearable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="upfile">
        <img src="../../../assets/vimg/upload.png" alt="">
        <p>上传保单</p>
        <input type="file">
      </div>
      <div class="upfile">
        <img src="../../../assets/vimg/upload.png" alt="">
        <p>上传付款计划表</p>
        <input type="file">
      </div>
      <div class="upfile">
        <img src="../../../assets/vimg/upload.png" alt="">
        <p>上传发票扫描件</p>
        <input type="file">
      </div>
      <el-button class="up">上传</el-button>
      <el-button>清空</el-button>
      <div class="round">手动输入</div>
    </div>

    <div class="inventory">
      <p>致：上海锦锭科技有限公司</p>
      <p>根据我司 蓝途新能源汽车（上海）有限公司 与贵司于 2018 年 11 月 1日签订的《商户合作协议书》，我司 2018 年 11 月 14 日投保 商业险 的车辆业务清单如下：</p>
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
          <th>车架号</th>
          <th>保险公司</th>
          <th>车险保单号</th>
        </tr>
        <tr v-for="(item, index) in orderList" :key="index">
          <td><input type="text" v-model="item.chepaihao"></td>
          <td><input type="text" v-model="item.shangyexian"></td>
          <td><input type="text" v-model="item.baofei"></td>
          <td><input type="text" v-model="item.shenqing"></td>
        </tr>
      </table>
    </div>

    <div class="inventory schadule">
      <h4>付款计划表</h4>
      <table>
        <tr>
          <th>期数</th>
          <th>付款日期</th>
          <th>还款金额</th>
        </tr>
        <tr v-for="(item, index) in orderList" :key="index">
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td colspan="3">
            <p>合计：6,0000</p>
            <p>（注：付款日期遇如遇法定节假日，需提前至工作日完成支付）</p>
          </td>
        </tr>
      </table>
      <p>本业务清单及付款计划表属于《商户合作协议书》不可分割的部分，作为附件与 《商户合作协议书》主文具备同等法律效力。我司对业务清单所列之被保险车辆信息的真实性负责，并承诺按照付款计划表所列进度进行付款</p>
      <p class="t">蓝途新能源汽车（上海）有限公司</p>
      <p class="t">2018年11月14日</p>
    </div>

    <div class="btn">
      <el-button class="cancel">取消</el-button>
      <el-button class="submit">确定</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MakePayment',
  data () {
    return {
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        }
      ],
      value4: '',
      orderList: [
        {
          name: 123
        },
        {
          name: 123
        },
        {
          name: 123
        },
        {
          name: 123
        },
        {
          name: 123
        },
        {
          name: 123
        },
        {
          name: 123
        },
        {
          name: 123
        },
        {
          name: 123
        },
        {
          name: 123
        },
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
.MakePayment {
  .header {
    height: 107px;
    // padding-top: 37px;
    padding-left: 43px;
    border-bottom: 13px solid #EDEDED;
    .select {
      float: left;
      width: 220px;
      padding-top: 14px;
      margin-right: 29px;
      .el-select {
        margin-bottom: 11px;
      }
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
      margin-right: 43px;
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
    .up {
      background:rgba(255,193,7,1);
      border-color:rgba(255,193,7,1);
      margin-left: 40px;
      margin-top: 37px;
    }
    .round {
      width:66px;
      height:66px;
      background:rgba(255,193,7,1);
      border-radius:50%;
      float: right;
      margin: 20px 117px 0 0;
      line-height: 66px;
      font-size: 15px;
      text-align: center;
      cursor: pointer;
    }
  }
  .inventory {
    // margin: 20px 23px 0;
    padding: 15px 191px 32px;
    border-bottom: 13px solid #f2f2f2;
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
</style>
