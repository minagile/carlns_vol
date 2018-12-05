<template>
  <div class="basic">
    <header>
      <div class="tab">
        <li v-for="(o, i) in tabList" :key="i" :class="{active: num === i}" @click="tab(i)"><a>{{ o.label }}</a></li>
        <div class="header-img">
          <div class="img">
            <img src="../../assets/logo.png" alt="">
          </div>
          <p>蓝途boss</p>
        </div>
      </div>
    </header>
    <router-view :key="$route.fullpath"></router-view>
  </div>
</template>

<script>
export default {
  name: 'Basic',
  data () {
    return {
      tabList: [
        {
          img: '',
          label: '首页',
          href: 'HomePage'
        },
        {
          img: '',
          label: '保单管理',
          href: 'DebitNote'
        },
        {
          img: '',
          label: '已分期',
          href: 'StageList'
        },
        {
          img: '',
          label: '决策支持',
          href: 'Decision'
        },
        {
          img: '',
          label: '系统设置',
          href: 'Setting'
        }
      ],
      num: 0
    }
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
.basic {
  height: calc(100% - 48px);
  // background: #EAEFF3;
  background: #4977FC;
  padding: 0 0 48px;
  overflow: auto;
  header {
    height: 100px;
    background: #4977FC;
    .tab {
      overflow: hidden;
      padding-top: 20px;
      padding-left: 340px;
      li {
        float: left;
        line-height: 50px;
        border-radius: 50px;
        margin-right: 20px;
        &.active {
          background: #C9D6FE50;
        }
        &:hover {
          background: #C9D6FE50;
        }
        a {
          padding: 0 40px;
          color: #fff;
          font-size: 20px;
        }
      }
      .header-img {
        float: right;
        padding-right: 49px;
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
      }
    }
  }
}
</style>
