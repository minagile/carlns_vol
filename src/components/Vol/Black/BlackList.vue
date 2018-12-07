<template>
  <!-- 黑名单列表 -->
  <div class="BlackList">
    <div class="blackList-input">
      <el-select v-model="value" placeholder="按公司名称：">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <input type="text">
      <button>查询</button>
      <button>清空</button>
    </div>
    <div class="Amortized-sort">
      <span>排序</span>
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <span>显示</span>
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <span>条</span>
      <button @click="centerDialogVisible = true">+ 新增</button>
    </div>

    <div class="Amortized-table">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="date" label="序号"  width="180"></el-table-column>
        <el-table-column prop="name" label="公司名称" width="180"></el-table-column>
        <el-table-column prop="address" label="联系地址"></el-table-column>
        <el-table-column prop="address" label="联系方式"></el-table-column>
        <el-table-column prop="address" label="邮箱"></el-table-column>
        <el-table-column prop="address" label="添加时间"></el-table-column>
        <el-table-column prop="address" label="加入原因"></el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-button type="text">编辑</el-button>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 新增 -->
    <el-dialog :visible.sync="centerDialogVisible" width="770px">
      <div class="dialog-header">新增</div>
      <el-form :model="form">
        <el-form-item label="公司名称：" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" placeholder="请输入公司名称"></el-input>
        </el-form-item>
        <el-form-item label="联系地址：" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" placeholder="请输入公司地址"></el-input>
        </el-form-item>
        <el-form-item label="联系方式：" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" placeholder="请输入联系方式"></el-input>
        </el-form-item>
        <el-form-item label="邮箱：" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="添加原因：" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" placeholder="请输入密码"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="cancel" @click="centerDialogVisible = false">取 消</el-button>
        <el-button class="submit" type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'BlackList',
  data () {
    return {
      options: [],
      value: '',
      centerDialogVisible: false,
      form: {
        name: ''
      },
      formLabelWidth: '209px',
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
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
.BlackList {
  // margin: 0 34px;
  .Amortized-sort {
    padding: 25px 3.44% 23px 3.44%;
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
      width:99px;
      height:40px;
      background:rgba(255,193,7,1);
      border-radius:4px;
      float: right;
    }
  }
  .Amortized-table {
    padding: 0 3.44% 23px 3.44%;
  }
  .el-pagination  {
    margin-top: 50px;
  }
  .blackList-input{
    padding: 23px 3.44% 0 3.44%;
    input {
      width:32.16%;
      height:40px;
      background:rgba(255,255,255,1);
      border:1px solid rgba(217,217,217,1);
      border-radius:4px;
      text-indent: 10px;
    }
    button:nth-of-type(1){
      width:75px;
      height:40px;
      background:rgba(255,193,7,1);
      border-radius:4px;
    }
    button:nth-of-type(2){
      width:75px;
      height:40px;
      background:rgba(255,255,255,1);
      border:1px solid rgba(217,217,217,1);
      border-radius:4px;
    }
  }
}
</style>
