<template>
  <div class="login">
    <el-card class="box-card" :body-style="{ padding: '50px 57px 0 53px' }" v-if="forget">
      <div slot="header" class="clearfix">
        <span style="font-size: 20px;font-family:PingFang-SC-Regular;">欢迎登录</span>
      </div>
      <div class="text item">
        <p>账号</p>
        <input type="text" v-model="user">
        <p>密码</p>
        <div class="psd">
          <input type="password" v-model="psd" @keypress="enter">
          <img src="../../assets/img/eye.png" @click="showPsd($event)"/>
        </div>
        <button @click="login">登 录</button>
        <p class="last">
          <el-checkbox v-model="remember"><span class="yes">记住密码</span></el-checkbox>
          <!-- <a @click="forget = !forget">忘记密码？</a> -->
          <!-- <a class="l" @click="$router.push({name: 'ChannelApplication'})">点我进行渠道代理申请</a> -->
        </p>
      </div>
    </el-card>
    <!-- 忘记密码 -->
    <el-card class="box-card" :body-style="{ padding: '10px 57px 0 53px' }" v-if="!forget">
      <div slot="header" class="clearfix">
        <span style="font-size: 20px;font-family:PingFang-SC-Regular;">修改密码</span>
      </div>
      <div class="text item">
        <p>账号</p>
        <input type="text" v-model="user">
        <p>验证码</p>
        <input type="text" v-model="code" style="width: 175px;float:left;">
        <button style="width: 160px;font-size: 16px;margin: 0 0 0 5px;;float:left;" @click="getCode($event)" :disabled="jump">获取验证码<span v-show="jump">{{ count }}s</span></button>
        <p>密码</p>
        <div class="psd">
          <input type="password" v-model="forgetpsd">
          <img src="../../assets/img/eye.png" @click="showPsd($event)"/>
        </div>
        <p>确认密码</p>
        <div class="psd">
          <input type="password" v-model="forgetpsdconfirm">
          <img src="../../assets/img/eye.png" @click="showPsd($event)"/>
        </div>
        <button @click="changePsd">确 定</button>
        <p class="last" style="padding-top: 20px;">
          <a class="l" @click="forget = !forget">点我返回登录</a>
        </p>
      </div>
    </el-card>
  </div>
</template>

<script>
import { setCookie, getCookie, delCookie } from '../../assets/js/cookie.js'
export default {
  name: 'Login',
  data () {
    return {
      user: '',
      psd: '',
      forget: true,
      count: 60,
      code: '',
      forgetpsd: '',
      forgetpsdconfirm: '',
      clock: '',
      jump: false,
      remember: false
    }
  },
  mounted () {
    if (getCookie('phone')) {
      this.user = getCookie('phone')
      this.psd = getCookie('pwd')
      // console.log(this.user)
      // console.log(this.psd)
      // this.login()
      this.remember = true
    }
  },
  methods: {
    // 获取验证码
    getCode (e) {
      // /login/getCode
      this.count = 60
      if (this.jump === false) {
        e.target.style.backgroundColor = '#ccc'
        this.jump = true
        this.clock = window.setInterval(() => {
          this.count--
          if (this.count < 1) {
            this.jump = false
            e.target.style.backgroundColor = '#f89b82'
            clearInterval(this.clock)
          }
        }, 1000)
        this.$fetch('/login/getCode', {
          phone: this.user
        }).then(res => {
          if (res.code === 0) {
            this.$message({type: 'success', message: res.msg})
          } else {
            this.$message(res.msg)
          }
        })
      }
    },
    // 回车键登录
    enter (e) {
      if (e.keyCode === 13) {
        if (this.forget === true) {
          this.login()
        } else {
          this.changePsd()
        }
      }
    },
    // 修改密码
    changePsd () {
      if (this.forgetpsd === this.forgetpsdconfirm) {
        this.$post('/login/changePW', {
          phone: this.user,
          code: this.code,
          password: this.forgetpsd
        }).then(res => {
          if (res.code === 0) {
            this.$message({type: 'success', message: res.msg})
            this.forget = true
          } else {
            this.$message(res.msg)
          }
        })
      } else {
        this.$message.error('两次密码输入不一致')
      }
    },
    // 显示密码
    showPsd (ev) {
      if (ev.target.previousElementSibling.type === 'password') {
        ev.target.previousElementSibling.type = 'text'
      } else {
        ev.target.previousElementSibling.type = 'password'
      }
    },
    // 登录
    login () {
      if (this.remember === true) {
        delCookie('phone')
        delCookie('pwd')
        setCookie('phone', this.user, 1000 * 60)
        setCookie('pwd', this.psd, 1000 * 60)
      } else {
        delCookie('phone')
      }
      if (this.user === '') {
        this.$message({
          type: 'error',
          message: '请输入账号'
        })
      } else if (this.psd === '') {
        this.$message({
          type: 'error',
          message: '请输入密码'
        })
      } else {
        // POST /login/loginInByUser
        this.$post('/login/loginInByUser', {
          phone: this.user,
          password: this.psd
        }).then((response) => {
          if (response.code === 0) {
            // console.log(response.data.data)
            sessionStorage.setItem('token', response.data.token)
            sessionStorage.setItem('username', response.data.data.channelName)
            // sessionStorage.setItem('type', response.data.type)
            // sessionStorage.setItem('pwd', this.psd)
            this.$router.push({name: 'HomePage'})
          } else {
            this.$message({
              type: 'error',
              message: response.msg
            })
          }
        })
      }
    }
  },
  components: {
  }
}
</script>

<style lang="less" scoped>
.login {
  height: 100%;
  background-image: url(https://easyfq.oss-cn-beijing.aliyuncs.com/resource/background02.png);
  background-size: 100% 100%;
  background-position: center center;
  // background-size: cover;
  position: relative;
  .el-card {
    width:452px;
    height:504px;
    background:rgba(67,119,227,1);
    opacity:0.91;
    border-radius:10px;
    box-shadow:9px 10px 13px rgba(0,0,0,0.55);
    border: 0;
    color: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-top: -330px;
    margin-left: -226px;
    p {
      line-height: 24px;
      text-indent: 24px;
      font-size: 14px;
      &.last {
        padding-top: 35px;
        text-indent: 0;
        a {
          float: left;
          cursor: pointer;
          &:hover {
            color: blue;
            text-decoration: underline;
          }
          &.l {
            float: right;
            margin-right: 20px;
          }
        }
      }
    }
    input {
      width:342px;
      height:48px;
      background-color:rgba(232,232,234,1);
      opacity:0.32;
      border-radius:24px;
      border: 0;
      display: block;
      outline: none;
      text-indent: 30px;
    }
    button {
      width:342px;
      margin-top: 30px;
      height:48px;
      background:rgba(248,155,130,1);
      border-radius:24px;
      border: 0;
      font-size:22px;
      font-family:PingFang-SC-Regular;
      font-weight: 500;
      color:rgba(255,255,255,1);
      transition: 1s;
      cursor: pointer;
      outline: none;
      &:hover {
        transition: 1s;
        background: rgb(255, 139, 107);
      }
    }
  }
  .psd {
    position: relative;
    img {
      position: absolute;
      top: 17px;
      right: 28px;
      cursor: pointer;
    }
  }
}
.last {
  padding-right: 10px;
  text-align: right;
  .yes {
    color: #fff;
  }
}
</style>
