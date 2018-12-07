<template>
  <!-- 帐号管理 -->
  <div class="AccountManagement">
    <el-button class="add" @click="centerDialogVisible = true">+ 添加账号</el-button>

    <!-- table -->
    <table>
      <tr v-for="(item, index) in list" :key="index">
        <td><div class="index">{{ index + 1 }}</div></td>
        <td>账号：{{ item.cont }}</td>
        <td><el-button type="text" @click="childDialogVisible = true">设置权限</el-button></td>
        <td><el-button type="text">删除</el-button></td>
      </tr>
    </table>

    <!-- 权限设置 -->
    <el-dialog :visible.sync="childDialogVisible" width="1000px">
      <div class="dialog-header">权限设置</div>
      <div class="top">
        <span>账号：123</span>
        <el-button class="setBtn" size="small"  @click="childDialogVisible = false">返回</el-button>
        <el-button class="setBtn" size="small">确定</el-button>
      </div>
      <el-table :data="tableData5" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-table :data="tableData5" style="width: 100%" :show-header="false">
              <el-table-column>
                <template slot-scope="scope">
                  全部渠道
                </template>
              </el-table-column>
              <el-table-column label="查看">
                <template slot-scope="scope">
                  <el-checkbox v-model="checked"></el-checkbox>
                </template>
              </el-table-column>
              <el-table-column label="添加">
                <template slot-scope="scope">
                  <el-checkbox v-model="checked"></el-checkbox>
                </template>
              </el-table-column>
              <el-table-column label="编辑">
                <template slot-scope="scope">
                  <el-checkbox v-model="checked"></el-checkbox>
                </template>
              </el-table-column>
              <el-table-column label="删除">
                <template slot-scope="scope">
                  <el-checkbox v-model="checked"></el-checkbox>
                </template>
              </el-table-column>
              <el-table-column label="全选">
                <template slot-scope="scope">
                  <el-checkbox v-model="checked"></el-checkbox>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            全部渠道
          </template>
        </el-table-column>
        <el-table-column label="查看">
          <template slot-scope="scope">
            <el-checkbox v-model="checked"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column label="添加">
          <template slot-scope="scope">
            <el-checkbox v-model="checked"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column label="编辑">
          <template slot-scope="scope">
            <el-checkbox v-model="checked"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column label="删除">
          <template slot-scope="scope">
            <el-checkbox v-model="checked"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column label="全选">
          <template slot-scope="scope">
            <el-checkbox v-model="checked"></el-checkbox>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <!-- 添加账号 -->
    <el-dialog :visible.sync="centerDialogVisible" width="683px">
      <div class="dialog-header">添加账号</div>
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
  name: 'AccountManagement',
  data () {
    return {
      checked: false,
      tableData5: [
        {
          id: '12987122'
        },
        {
          id: '12987122'
        },
        {
          id: '12987122'
        },
        {
          id: '12987122'
        }
      ],
      list: [
        {
          cont: '1234566'
        },
        {
          cont: '1234566'
        }
      ],
      childDialogVisible: false,
      centerDialogVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '209px'
    }
  },
  mounted () {
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.AccountManagement {
  .add {
    background:rgba(255,193,7,1);
    border-color:rgba(255,193,7,1);
    margin: 27px 0 0 31px;
    &:hover {
      color: #282828;
    }
  }
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 17px;
    // text-align: center;
    tr {
      border-bottom: 4px solid #f2f2f2;
      height: 70px;
      line-height: 70px;
      color: #000000;
      // font-weight: bold;
      td:first-of-type {
        width: 84px;
      }
      td .index {
        width: 26px;
        height: 26px;
        line-height: 26px;
        border-radius: 50%;
        text-align: center;
        background: #282828;
        font-weight: normal;
        color: #fff;
        margin: 0 19px 0 31px;
      }
    }
  }
  .el-dialog {
    .top {
      overflow: hidden;
      line-height: 32px;
      padding: 0 20px;
      .setBtn {
        background: #282828;
        color: #fff;
        border-color: #282828;
        float: right;
        margin-left: 30px;
      }
    }
  }
}
</style>
