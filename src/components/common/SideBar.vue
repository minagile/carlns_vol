<template>
  <!-- 侧边栏 -->
  <div class="sidebar animated bounceInLeft">
    <div class="img" style="background: #497777;height: 100px;"></div>
    <div class="list">
      <li v-for="(o, i) in tabList" :key="i" :class="{active: num === i}" @click="tab(i)">{{ o.label }}</li>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SideBar',
  data () {
    return {
      tabList: [
        {
          img: '',
          label: '缴费通知单列表',
          href: 'HomePage'
        },
        {
          img: '',
          label: '报价单列表',
          href: 'HomePage'
        },
        {
          img: '',
          label: '保单首期支付结果列表',
          href: 'HomePage'
        },
        {
          img: '',
          label: '付款计划表列表',
          href: 'HomePage'
        },
        {
          img: '',
          label: '退保保单列表',
          href: 'HomePage'
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
    }
  }
}
</script>

<style lang="less" scoped>
.sidebar {
  height: calc(100% + 148px);
  background: #fff;
  width: 320px;
  position: absolute;
  top: -100px;
  left: 0;
  .list {
    padding-left: 16px;
    li {
      font-size: 19px;
      font-family:MicrosoftYaHei;
      font-weight:400;
      color:rgba(89,89,89,1);
      line-height: 60px;
      text-indent: 72px;
      margin: 43px 0;
      cursor: pointer;
      &.active {
        color:rgba(73,119,252,1);
        background:rgba(73,119,252,0.1);
        border-radius:26px 0px 0px 26px;
      }
      &:hover {
        color:rgba(73,119,252,1);
        background:rgba(73,119,252,0.1);
        border-radius:26px 0px 0px 26px;
      }
    }
  }
}
</style>
