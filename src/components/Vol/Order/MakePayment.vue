 <template>
  <!-- 制作付款计划表 -->
  <div class="MakePayment">
    <div class="header">
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
    </div>
  </div>
</template>

<script>
export default {
  name: 'MakePayment',
  data () {
    return {

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
  }
}
</style>
