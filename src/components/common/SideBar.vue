<template>
  <!-- 侧边栏 -->
  <div class="sidebar animated bounceInLeft">
    <div class="img"  v-if="!fromVol">
      <img src="../../assets/img/barheader.png" alt="">
    </div>
    <div class="img"  v-if="fromVol" style="height: 100px;background: #FFC107;"></div>
    <div class="list" v-if="!fromVol">
      <!-- <li v-for="(o, i) in tabList" :key="i" :class="{active: num === i}" @click="tab(i)"><span class="iconfont banner-icon" v-html="o.img"></span>{{ o.label }}</li> -->
      <li v-for="(o, i) in tabList" :key="i" :class="{active: num === i}" @click="tab(i)"><img :src="num === i ? o.aimg : o.img">{{ o.label }}</li>
    </div>
    <div class="list vol" v-if="fromVol">
      <!-- <li v-for="(o, i) in tabList" :key="i" :class="{active: num === i}" @click="tab(i)"><span class="iconfont banner-icon" v-html="o.img"></span>{{ o.label }}</li> -->
      <li v-for="(o, i) in tabList" :key="i" :class="{active: num === i}" @click="tab(i)" v-show="o.show"><img :src="num === i ? o.vaimg : o.img">{{ o.label }}</li>
    </div>
  </div>
</template>

<script>
import { list } from '../../assets/js/img.js'
export default {
  name: 'SideBar',
  data () {
    return {
      tabList: [
        {
          img: list.list1,
          aimg: list.List1,
          vaimg: list.llist1,
          label: '缴费通知单列表',
          href: 'DebitNote',
          vhref: 'VolDebitNote',
          show: false
        },
        {
          img: list.list2,
          aimg: list.List2,
          vaimg: list.llist2,
          label: '报价单列表',
          href: 'Quotation',
          vhref: 'VolQuotation',
          show: false
        },
        {
          img: list.list3,
          aimg: list.List3,
          vaimg: list.llist3,
          label: '保单首期支付结果列表',
          href: 'FirstPeriod',
          vhref: 'VolFirstPeriod',
          show: false
        },
        {
          img: list.list4,
          aimg: list.List4,
          vaimg: list.llist4,
          label: '付款计划表列表',
          href: 'PaymentSchedule',
          vhref: 'VolPaymentSchedule',
          show: false
        },
        {
          img: list.list5,
          aimg: list.List5,
          vaimg: list.llist5,
          label: '退保保单列表',
          href: 'InsuranceCancel',
          vhref: 'VolInsuranceCancel',
          show: false
        }
      ],
      stagingList: [
        {
          img: list.list1,
          aimg: list.List1,
          vaimg: list.llist1,
          label: '已分期列表',
          href: 'StageList',
          vhref: 'VolStageList',
          show: false
        },
        {
          img: list.list5,
          aimg: list.List5,
          vaimg: list.llist5,
          label: '还款明细',
          href: 'ReimbursementDetail',
          vhref: 'VolReimbursementDetail',
          show: false
        },
        {
          img: list.list2,
          aimg: list.List2,
          vaimg: list.llist2,
          label: '保单及发票管理',
          href: 'PolicyAndInvoice',
          vhref: 'VolPolicyAndInvoice',
          show: false
        }
      ],
      orderList: [
        {
          img: list.list1,
          vaimg: list.llist1,
          label: '生成报价单',
          vhref: 'QuotationOrder',
          show: false
        },
        {
          img: list.list5,
          vaimg: list.llist5,
          label: '制作付款计划表',
          vhref: 'MakePayment',
          show: false
        }
      ],
      blackList: [
        {
          img: list.list1,
          vaimg: list.llist1,
          label: '黑名单列表',
          vhref: 'BlackList',
          show: false
        }
      ],
      settingList: [
        {
          img: list.list6,
          vaimg: list.llist6,
          label: '渠道管理',
          vhref: 'ChannelManagement',
          show: false
        },
        {
          img: list.list1,
          vaimg: list.llist1,
          label: '账号管理',
          vhref: 'AccountManagement',
          show: false
        }
      ],
      num: 0
    }
  },
  mounted () {
    var setting = JSON.parse(sessionStorage.getItem('settingList'))
    // console.log(setting)
    if (setting) {
      setting.forEach(v => {
        this.tabList.forEach(m => {
          if (m.label === v) {
            m.show = true
          }
        })
        this.stagingList.forEach(m => {
          if (m.label === v) {
            m.show = true
          }
        })
        this.orderList.forEach(m => {
          if (m.label === v) {
            m.show = true
          }
        })
        this.blackList.forEach(m => {
          if (m.label === v) {
            m.show = true
          }
        })
        this.settingList.forEach(m => {
          if (m.label === v) {
            m.show = true
          }
        })
      })
    }
    // console.log(this.settingList)
    if (this.stage === 'staging') {
      this.tabList = this.stagingList
    } else if (this.stage === 'order') {
      this.tabList = this.orderList
    } else if (this.stage === 'black') {
      this.tabList = this.blackList
    } else if (this.stage === 'setting') {
      this.tabList = this.settingList
    }
    let path = this.$router.history.current.fullPath
    this.tabList.forEach((v, k) => {
      if (path.split('/')[2] === v.href || path.split('/')[3] === v.vhref) {
        this.num = k
        // console.log(k)
      }
    })
  },
  methods: {
    tab (i) {
      this.num = i
      if (this.fromVol === false) this.$router.push({name: this.tabList[i].href})
      if (this.fromVol === true) this.$router.push({name: this.tabList[i].vhref})
    }
  },
  props: {
    stage: {
      type: String,
      default () {
        return 'DebitNote'
      }
    },
    fromVol: {
      type: Boolean,
      default: false
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
      font-family: "MicrosoftYaHei";
      font-weight: 400;
      color:rgba(89,89,89,1);
      line-height: 60px;
      text-indent: 25px;
      margin: 43px 0;
      cursor: pointer;
      img {
        vertical-align: middle;
        margin-right: 28px;
        margin-top: -3px;
        width: 18px;
      }
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
  .vol {
    li {
      color: #606060;
      &.active {
        color:#000000;
        background:rgba(255,193,7,0.49);
      }
      &:hover {
        color:#000000;
        background:rgba(255,193,7,0.49);
      }
    }
  }
}
</style>
