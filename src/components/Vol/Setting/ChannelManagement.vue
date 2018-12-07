<template>
  <!-- 渠道管理 -->
  <div class="ChannelManagement">
    <el-button class="add" @click="centerDialogVisible = true">+ 新增渠道</el-button>

    <!-- table -->
    <table>
      <tr v-for="(item, index) in list" :key="index" class="tabletr">
        <td><div class="index">{{ index + 1 }}</div></td>
        <td>公司名称：{{ item.name }}</td>
        <td>地址：{{ item.adress }}</td>
        <td>负责人：{{ item.people }}</td>
        <td>联系方式：{{ item.phone }}</td>
        <td>账号：{{ item.cont }}</td>
        <td><el-button type="text" @click="childDialogVisible = true">添加子公司</el-button></td>
        <td><el-button type="text">编辑</el-button></td>
        <td>
          <div class="zhankai" v-if="!item.expand" @click="expand(item, index)">展开 <span></span></div>
          <div class="shouqi" v-if="item.expand" @click="expand(item, index)">收起 <span></span></div>
        </td>
      </tr>
    </table>

    <!-- 添加子公司 -->
    <el-dialog :visible.sync="childDialogVisible" width="770px">
      <div class="dialog-header">添加子公司</div>
      <el-form :model="form">
        <el-form-item label="公司名称：" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" placeholder="请输入公司名称"></el-input>
        </el-form-item>
        <el-form-item label="地址：" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" placeholder="请输入公司地址"></el-input>
        </el-form-item>
        <el-form-item label="负责人：" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" placeholder="请输入负责人"></el-input>
        </el-form-item>
        <el-form-item label="联系方式：" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" placeholder="请输入联系方式"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="cancel" @click="childDialogVisible = false">取 消</el-button>
        <el-button class="submit" type="primary" @click="childDialogVisible = false">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 新增渠道弹窗 -->
    <el-dialog :visible.sync="centerDialogVisible" width="770px">
      <div class="dialog-header">新增渠道</div>
      <el-form :model="form">
        <el-form-item label="公司名称：" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" placeholder="请输入公司名称"></el-input>
        </el-form-item>
        <el-form-item label="地址：" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" placeholder="请输入公司地址"></el-input>
        </el-form-item>
        <el-form-item label="负责人：" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" placeholder="请输入负责人"></el-input>
        </el-form-item>
        <el-form-item label="联系方式：" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" placeholder="请输入联系方式"></el-input>
        </el-form-item>
        <el-form-item label="账号：" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码：" :label-width="formLabelWidth">
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
import $ from 'jquery'
export default {
  name: 'ChannelManagement',
  data () {
    return {
      list: [
        {
          name: '锦上有限公司',
          adress: '津滨大道',
          people: '忘而',
          phone: '1234566',
          cont: '1234566',
          expand: false
        },
        {
          name: '锦上有限公司',
          adress: '津滨大道',
          people: '忘而',
          phone: '1234566',
          cont: '1234566',
          expand: false
        }
      ],
      childlist: [
        {
          name: 'xxx公司',
          adress: '津滨大道',
          people: '忘而',
          phone: '1234566',
          expand: false
        },
        {
          name: 'xxx公司',
          adress: '津滨大道',
          people: '忘而',
          phone: '1234566',
          expand: false
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
      formLabelWidth: '209px',
      num: 0
    }
  },
  mounted () {
  },
  methods: {
    expand (item, index) {
      // this.num = index
      var tr = $('.tabletr')
      console.log(tr[index])
      var element = `<tr class="childrenTr${index}">
        <td></td>
        <td>公司名称：</td>
        <td>地址：</td>
        <td>负责人：</td>
        <td>联系方式：</td>
        <td>账号：</td>
        <td><el-button type="text">删除</el-button></td>
        <td><el-button type="text">编辑</el-button></td>
      </tr>`
      if (item.expand === false) {
        item.expand = true
        tr[index].classList.add('tractive' + index)
        $('.tractive' + index).after(element)
      } else {
        tr[index].classList.remove('tractive')
        item.expand = false
        $('.childrenTr').remove()
      }
      // tr[0].addclass
      // console.log($('.qwe'))
      // console.log(tr[0])
      // $('.tractive').after('<b>Hello</b>')
    }
  }
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
  table {
    width: 100%;
    border-collapse: collapse;
    // font-size: 17px;
    // text-align: center;
    tr {
      border-bottom: 4px solid #f2f2f2;
      height: 70px;
      line-height: 70px;
      color: #000000;
      td:first-of-type {
        width: 84px;
      }
      .shouqi {
        cursor: pointer;
        font-size: 14px;
        color: #FFC107;
        span {
          display: inline-block;
          border-top: 11px solid #FFC107;
          border-left: 8px solid #FFC10700;
          border-right: 8px solid #FFC10700;
          border-radius: 4px;
        }
      }
      .zhankai {
        cursor: pointer;
        font-size: 14px;
        span {
          display: inline-block;
          border-top: 8px solid #FFC10700;
          border-bottom: 8px solid #FFC10700;
          border-left: 11px solid #000000;
          border-right: 11px solid #00000000;
          border-radius: 4px;
        }
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
}
</style>
