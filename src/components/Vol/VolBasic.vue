<template>
  <div class="Volbasic">
    <header>
      <div class="tab">
        <ul>
          <li v-for="(o, i) in tabList" :key="i" :class="{active: num === i}" @click="tab(i)"><a>{{ o.label }}</a></li>
        </ul>
        <div class="header-img">
          <p><img src="../../assets/img/person.png" >用户名</p>
          <p><img src="../../assets/img/out.png" >退出登录</p>
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
          img: '',
          label: '首页',
          href: 'VolHomePage'
        },
        {
          img: '',
          label: '订单申请',
          href: 'QuotationOrder'
        },
        {
          img: '',
          label: '保单管理',
          href: 'VolDebitNote'
        },
        {
          img: '',
          label: '已分期',
          href: 'VolStageList'
        },
        {
          img: '',
          label: '决策支持',
          href: 'VolDecision'
        },
        {
          img: '',
          label: '黑名单管理',
          href: 'BlackList'
        },
        {
          img: '',
          label: '系统设置',
          href: 'ChannelManagement'
        }
      ],
      num: 0
    }
  },
  mounted () {
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
  },
  methods: {
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
