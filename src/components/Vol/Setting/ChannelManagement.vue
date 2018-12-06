<template>
  <!-- 渠道管理 -->
  <div class="ChannelManagement">
    <el-button class="add" @click="centerDialogVisible = true">+ 新增渠道</el-button>

    <!-- 新增渠道弹窗 -->
    <el-dialog :visible.sync="centerDialogVisible" width="770px">
      <header>新增渠道</header>
      <span>需要注意的是内容是默认不居中的</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'ChannelManagement',
  data () {
    return {
      centerDialogVisible: false
    }
  },
  mounted () {
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.ChannelManagement {
  .add {
    background:rgba(255,193,7,1);
    border-color:rgba(255,193,7,1);
    margin: 27px 0 0 31px;
    &:hover {
      color: #282828;
    }
  }
}
</style>
