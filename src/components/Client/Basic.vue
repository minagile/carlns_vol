<template>
  <div class="basic">
    <header>
      <div class="tab">
        <li v-for="(o, i) in tabList" :key="i" :class="{active: num === i}" @click="tab(i)"><a>{{ o.label }}</a></li>
      </div>
    </header>
    <router-view></router-view>
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
          href: 'PolicyAd'
        },
        {
          img: '',
          label: '已分期',
          href: 'Amortized'
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
        margin-right: 40px;
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
    }
  }
}
</style>
