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
          href: 'DebitNote'
        },
        {
          img: '',
          label: '报价单列表',
          href: 'Quotation'
        },
        {
          img: '',
          label: '保单首期支付结果列表',
          href: 'FirstPeriod'
        },
        {
          img: '',
          label: '付款计划表列表',
          href: 'PaymentSchedule'
        },
        {
          img: '',
          label: '退保保单列表',
          href: 'InsuranceCancel'
        }
      ],
      stagingList: [
        {
          img: '',
          label: '已分期列表',
          href: 'StageList'
        },
        {
          img: '',
          label: '还款明细',
          href: 'ReimbursementDetail'
        },
        {
          img: '',
          label: '保单及发票管理',
          href: 'PolicyAndInvoice'
        }
      ],
      num: 0
    }
  },
  mounted () {
    if (this.stage === true) {
      this.tabList = this.stagingList
    }
    let path = this.$router.history.current.fullPath
    this.tabList.forEach((v, k) => {
      if (path.split('/')[2] === v.href) {
        this.num = k
      }
    })
  },
  methods: {
    tab (i) {
      this.num = i
      this.$router.push({name: this.tabList[i].href})
    }
  },
  props: {
    stage: {
      type: Boolean,
      default () {
        return false
      }
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
