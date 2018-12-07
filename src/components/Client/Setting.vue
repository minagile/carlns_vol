<template>
  <!-- 系统设置 -->
  <div class="Setting">
    <h4>账号管理</h4>
    <el-table
      :data="tableData"
      :show-header="false"
      style="width: 100%">
      <el-table-column prop="date" width="180"></el-table-column>
      <el-table-column prop="name" width="180"></el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button type="text" @click="centerDialogVisible = true">更改密码</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="centerDialogVisible" width="683px">
      <div class="dialog-header">更改密码</div>
      <el-form :model="form">
        <el-form-item label="账号：" label-width="150px">
          <el-input v-model="form.name" autocomplete="off" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码：" label-width="150px">
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
  name: 'Setting',
  data () {
    return {
      tableData: [{}],
      centerDialogVisible: false,
      form: {
        name: ''
      }
    }
  },
  mounted () {
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.Setting {
  background: #fff;
  min-height: calc(100% - 100px);
  border-radius: 16px;
  margin: 0 34px;
  // padding-top: 58px;
  h4 {
    height: 125px;
    font-size: 20px;
    line-height: 125px;
    text-indent: 45px;
    border-bottom: 20px solid #f2f2f2;
  }
  .el-dialog .dialog-header {
    background: #4977FC;
    color: #fff;
  }
  .el-dialog .dialog-footer .cancel {
    color: #282828;
    background: #fff;
    border-color: #D9D9D9;
  }
  .el-dialog .dialog-footer .submit {
    background: #4977FC;
    color: #fff;
    margin-left: 166px;
    border-color:#D9D9D9;
  }
}
</style>
