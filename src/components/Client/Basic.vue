<template>
  <div class="basic">
    <header>
      <div class="tab">
        <ul>
          <li v-for="(o, i) in tabList" :key="i" :class="{active: num === i}" @click="tab(i)">
            <a><img :src="o.img" alt="">{{ o.label }}</a>
          </li>
        </ul>
          <div class="header-img">
            <!-- <div class="img">
              <img src="../../assets/logo.png" alt="">
            </div> -->
            <el-dropdown>
              <p><span class="iconfont">&#xe626;</span>{{name}}</p>
              <el-dropdown-menu slot="dropdown">
                <span @click="dialogVisible = true"><el-dropdown-item>修改密码</el-dropdown-item></span>
                <span @click="logout"><el-dropdown-item>退出登录</el-dropdown-item></span>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
      </div>
    </header>
    <router-view :key="$route.fullpath"></router-view>
    <el-dialog
      :visible.sync="dialogVisible"
      width="550px">
      <div class="dialog-header1">
        修改密码
      </div>
      <div class="form">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <!-- <el-form-item label="密码">
            <el-input v-model="form.name"></el-input>
          </el-form-item> -->
          <el-form-item label="新密码" prop="pass">
            <el-input type="password" v-model="ruleForm.pass"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="changePwd">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { Topbar } from '../../assets/js/img.js'
export default {
  name: 'Basic',
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      tabList: [
        {
          img: Topbar.home,
          label: '首页',
          href: 'HomePage'
        },
        {
          img: Topbar.policy,
          label: '保单管理',
          href: 'DebitNote'
        },
        {
          img: Topbar.stage,
          label: '已分期',
          href: 'StageList'
        },
        {
          img: Topbar.decision,
          label: '决策支持',
          href: 'Decision'
        }
        // {
        //   img: Topbar.setting,
        //   label: '系统设置',
        //   href: 'Setting'
        // }
      ],
      num: 0,
      name: '',
      dialogVisible: false,
      ruleForm: {
        pass: '',
        checkPass: ''
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur', required: true }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur', required: true }
        ]
      }
    }
  },
  beforeRouteUpdate (to, from, next) {
    if (to.name === 'ReimbursementDetail') {
      this.num = 2
    }
    next()
  },
  mounted () {
    let path = this.$router.history.current.fullPath
    this.tabList.forEach((v, k) => {
      if (path.split('/')[1] === v.href) {
        this.num = k
      }
      if (path.split('/')[1] === 'PolicyAd') {
        this.num = 1
      }
      if (path.split('/')[1] === 'Amortized') {
        this.num = 2
      }
    })
    this.name = sessionStorage.getItem('username')
  },
  methods: {
    tab (i) {
      this.num = i
      this.$router.push({name: this.tabList[i].href})
    },
    logout () {
      sessionStorage.clear()
      this.$router.push('/')
      this.$fetch('/login/logout')
    },
    changePwd () {
      if (this.ruleForm.pass === this.ruleForm.checkPass && this.ruleForm.pass !== '') {
        this.$post('/user/uchannel/updatePwd', {
          pwd: this.ruleForm.pass
        }).then(res => {
          if (res.code === 0) {
            this.$message({
              type: 'success',
              message: '修改成功'
            })
            this.dialogVisible = false
            this.ruleForm.pass = ''
            this.ruleForm.checkPass = ''
          } else if (res.code === 1) {
            this.$message({
              type: 'error',
              message: res.msg
            })
          }
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.basic {
  .el-pagination .el-pager li:hover, .el-pagination button:hover {
    background: #4977FC;
    color: #fff;
  }
  height: calc(100% - 48px);
  background: #EAEFF3 url(../../../static/homebg.png) no-repeat;
  // background: #4977FC;
  padding: 0 0 48px;
  overflow: auto;
  header {
    height: 100px;
    // background: #4977FC;
    .tab {
      overflow: hidden;
      padding-top: 20px;
      // padding-left: 340px;
      ul {
        width: 720px;
        margin: 0 auto;
        // overflow: hidden;
      }
      li {
        float: left;
        line-height: 50px;
        border-radius: 50px;
        margin-right: 10px;
        &.active {
          background: #C9D6FE50;
        }
        &:hover {
          background: #C9D6FE50;
        }
        a {
          padding: 0 40px;
          color: #fff;
          font-size: 18px;
          img {
            vertical-align: middle;
            margin-right: 4px;
            margin-top: -4px;
          }
        }
      }
      .header-img {
        float: right;
        padding-right: 49px;
        .iconfont {
          font-size: 25px;
          vertical-align: middle;
        }
        .img {
          width:61px;
          height:61px;
          border-radius: 50px;
          background: white;
          overflow: hidden;
          display: inline-block;
          margin-right: 19px;
          img {
            width: 100%;
          }
        }
        p {
          line-height: 61px;
          display: inline-block;
          vertical-align: top;
          color: white;
        }
        .el-dropdown{
          vertical-align: text-bottom;
        }
      }
    }
  }
}
</style>
