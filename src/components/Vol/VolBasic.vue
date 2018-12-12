<template>
  <div class="Volbasic">
    <header>
      <div class="tab">
        <ul>
          <li v-for="(o, i) in tabList" :key="i" :class="{active: num === i}" @click="tab(i)" v-show="o.show"><a>{{ o.label }}</a></li>
        </ul>
        <div class="header-img">
          <p><img src="../../assets/img/person.png" >{{username}}</p>
          <p @click="out"><img src="../../assets/img/out.png">退出登录</p>
        </div>
      </div>
    </header>
    <router-view :key="$route.fullpath"></router-view>
  </div>
</template>

<script>
export default {
  name: 'VolBasic',
  data () {
    return {
      tabList: [
        {
          label: '首页',
          href: 'VolHomePage',
          show: true
        },
        {
          label: '订单申请',
          href: 'QuotationOrder',
          show: false
        },
        {
          label: '保单管理',
          href: 'VolDebitNote',
          show: false
        },
        {
          label: '已分期',
          href: 'VolStageList',
          show: false
        },
        {
          label: '决策支持',
          href: 'VolDecision',
          show: false
        },
        {
          label: '黑名单管理',
          href: 'BlackList',
          show: false
        },
        {
          label: '系统设置',
          href: 'ChannelManagement',
          show: false
        }
      ],
      username: '',
      num: 0
    }
  },
  mounted () {
    this.username = sessionStorage.getItem('username')
    let path = this.$router.history.current.fullPath
    this.tabList.forEach((v, k) => {
      if (path.split('/')[2] === v.href || path.split('/')[3] === v.href) {
        this.num = k
      }
      if (path.split('/')[2] === 'VolOrderApply') {
        this.num = 1
      }
      if (path.split('/')[2] === 'VolPolicyAd') {
        this.num = 2
      }
      if (path.split('/')[2] === 'VolAmortized') {
        this.num = 3
      }
      if (path.split('/')[2] === 'VolBlackList') {
        this.num = 5
      }
      if (path.split('/')[2] === 'VolSetting') {
        this.num = 6
      }
    })
    // GET /Menu/getPermission
    this.$fetch('/admin/Menu/getPermission').then(res => {
      // console.log(res.data)
      if (res.code === 0) {
        var arr = ['首页']
        res.data.forEach(v => {
          arr.push(v.menuName)
          this.tabList.forEach(m => {
            // console.log(m.label)
            if (m.label === v.menuName) {
              m.show = true
            }
          })
        })
        sessionStorage.setItem('settingList', JSON.stringify(arr))
      } else {
        this.$message(res.msg)
      }
    })
  },
  methods: {
    out () {
      sessionStorage.clear()
      this.$fetch('/login/logout')
      this.$router.push({name: 'MLogin'})
    },
    tab (i) {
      this.num = i
      this.$router.push({name: this.tabList[i].href})
    }
  }
}
</script>

<style lang="less" scoped>
.Volbasic {
  height: calc(100% - 48px);
  // background: #EAEFF3;
  background-image: linear-gradient(top,#FFC107 0%,#FFC107 42%,#EAEFF3 42%,#EAEFF3 100%);
  padding: 0 0 48px;
  overflow: auto;
  position: relative;
  header {
    height: 100px;
    // background: #FFC107;
    .tab {
      overflow: hidden;
      padding-top: 20px;
      // padding-left: 340px;
      ul {
        width: 880px;
        margin: 0 auto;
      }
      li {
        float: left;
        line-height: 50px;
        border-radius: 50px;
        margin-right: 20px;
        width: 105px;
        text-align: center;
        &.active {
          background: black;
          a {
            color: #FFC107;
          }
        }
        &:hover {
          background: black;
          a {
            color: #FFC107;
          }
        }
        a {
          color: black;
          font-size: 20px;
        }
      }
      .header-img {
        float: right;
        padding-right: 38px;
        p {
          line-height: 52px;
          display: inline-block;
          vertical-align: top;
          margin-left: 43px;
          font-size: 17px;
          cursor: pointer;
          img {
            vertical-align: middle;
            margin-right: 8px;
          }
        }
      }
    }
  }
}
</style>
