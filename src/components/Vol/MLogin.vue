<template>
  <div class="m_login">
    <el-card class="box-card" :body-style="{ padding: '50px 57px 0 53px' }">
      <div slot="header" class="clearfix">
        <span style="font-size: 20px;font-family:PingFang-SC-Regular;">欢迎登录</span>
      </div>
      <div class="text item">
        <p>账号</p>
        <input type="text" v-model="user">
        <p>密码</p>
        <div class="psd">
          <input type="password" v-model="psd" @keypress="enter">
          <img :src="img" @click="showPsd($event)"/>
        </div>
        <p class="remember" @click="rember">
          <img :src="rememberImg" alt="">
          记住密码
        </p>
        <button @click="login">登 录</button>
      </div>
    </el-card>
  </div>
</template>

<script>
import img1 from '../../assets/img/eye.png'
import img2 from '../../assets/img/eye1.png'
import img3 from '../../assets/img/circle.png'
import img4 from '../../assets/img/circlec.png'
import { setCookie, getCookie, delCookie } from '../../assets/js/cookie.js'
export default {
  name: 'MLogin',
  data () {
    return {
      user: '',
      psd: '',
      img: img1,
      rememberImg: img3
    }
  },
  mounted () {
    if (getCookie('adphone')) {
      this.user = getCookie('adphone')
      this.psd = getCookie('adpwd')
      // this.login()
      this.rememberImg = img4
    }
  },
  methods: {
    rember () {
      if (this.rememberImg === img3) {
        this.rememberImg = img4
      } else {
        this.rememberImg = img3
      }
    },
    // 回车键登录
    enter (e) {
      if (e.keyCode === 13) {
        this.login()
      }
    },
    // 修改密码
    changePsd () {
    },
    // 显示密码
    showPsd (ev) {
      if (ev.target.previousElementSibling.type === 'password') {
        ev.target.previousElementSibling.type = 'text'
        this.img = img2
      } else {
        ev.target.previousElementSibling.type = 'password'
        this.img = img1
      }
    },
    // 登录
    login () {
      if (this.rememberImg === img4) {
        setCookie('adphone', this.user, 1000 * 60)
        setCookie('adpwd', this.psd, 1000 * 60)
      } else {
        delCookie('adphone')
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
        this.$post('/login/loginInByAdmin', {
          phone: this.user,
          password: this.psd
        }).then((response) => {
          // console.log(response)
          if (response.code === 0) {
            // console.log('dd')
            sessionStorage.setItem('token', response.data.token)
            sessionStorage.setItem('username', response.data.data.adminName)
            this.$router.push('/vol/VolHomePage')
          } else {
            this.$message({
              type: 'error',
              message: response.msg
            })
          }
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.m_login {
  height: 100%;
  background-image: url(https://easyfq.oss-cn-beijing.aliyuncs.com/resource/background01.png);
  background-size: 100%;
  background-position: center center;
  // background-size: contain;
  position: relative;
  .el-card {
    width:452px;
    height:504px;
    background:rgba(40,40,40,1);
    opacity:0.91;
    border-radius:10px;
    box-shadow:9px 10px 13px rgba(0,0,0,0.55);
    border: 0;
    color: #fff;
    position: absolute;
    right: 13%;
    top: 50%;
    margin-top: -330px;
    // margin-left: -226px;
    p {
      line-height: 24px;
      text-indent: 24px;
      font-size: 14px;
      &.last {
        padding-top: 35px;
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
      background-color:rgba(232,232,234,0.32);
      // opacity:0.32;
      border-radius:24px;
      border: 0;
      display: block;
      outline: none;
      text-indent: 30px;
      color: #fff;
    }
    button {
      width:342px;
      // margin-top: 30px;
      height:48px;
      background:#FFC107;
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
        background: rgb(255, 192, 2);
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
  .remember {
    cursor: pointer;
    line-height: 30px;
    height: 30px;
    text-align: right;
    padding-right: 20px;
    padding-top: 10px;
    img {
      vertical-align: middle;
    }
  }
}
</style>
