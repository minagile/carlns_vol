import Vue from 'vue'
import Router from 'vue-router'
import Basic from '@/components/Client/Basic'
import HomePage from '@/components/Client/HomePage'
import PolicyAd from '@/components/Client/PolicyAd'
import Amortized from '@/components/Client/Amortized'
import Decision from '@/components/Client/Decision'
import Setting from '@/components/Client/Setting'
import Login from '@/components/Client/Login'

import DebitNote from '@/components/Client/Policy/DebitNote'
import Quotation from '@/components/Client/Policy/Quotation'
import FirstPeriod from '@/components/Client/Policy/FirstPeriod'
import PaymentSchedule from '@/components/Client/Policy/PaymentSchedule'
import InsuranceCancel from '@/components/Client/Policy/InsuranceCancel'

import StageList from '@/components/Client/Amortized/StageList'
import ReimbursementDetail from '@/components/Client/Amortized/ReimbursementDetail'
import PolicyAndInvoice from '@/components/Client/Amortized/PolicyAndInvoice'

// 后台
import VolBasic from '@/components/Vol/VolBasic'
import VolHomePage from '@/components/Vol/VolHomePage'
import VolOrderApply from '@/components/Vol/VolOrderApply'
import VolPolicyAd from '@/components/Vol/VolPolicyAd'
import VolAmortized from '@/components/Vol/VolAmortized'
import VolDecision from '@/components/Vol/VolDecision'
import VolBlackList from '@/components/Vol/VolBlackList'
import VolSetting from '@/components/Vol/VolSetting'
import MLogin from '@/components/Vol/MLogin'

import VolDebitNote from '@/components/Vol/Policy/VolDebitNote'
import VolQuotation from '@/components/Vol/Policy/VolQuotation'
import VolFirstPeriod from '@/components/Vol/Policy/VolFirstPeriod'
import VolPaymentSchedule from '@/components/Vol/Policy/VolPaymentSchedule'
import VolInsuranceCancel from '@/components/Vol/Policy/VolInsuranceCancel'

import VolStageList from '@/components/Vol/Amortized/VolStageList'
import VolReimbursementDetail from '@/components/Vol/Amortized/VolReimbursementDetail'
import VolPolicyAndInvoice from '@/components/Vol/Amortized/VolPolicyAndInvoice'

import Calculater from '@/components/Vol/Decision/Calculater'
import Chart from '@/components/Vol/Decision/Chart'

import QuotationOrder from '@/components/Vol/Order/QuotationOrder'
import MakePayment from '@/components/Vol/Order/MakePayment'
import AddByPerson from '@/components/Vol/Order/AddByPerson'

import BlackList from '@/components/Vol/Black/BlackList'

import ChannelManagement from '@/components/Vol/Setting/ChannelManagement'
import AccountManagement from '@/components/Vol/Setting/AccountManagement'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/Basic',
      name: 'Basic',
      component: Basic,
      meta: {
        title: '车险客户端'
      },
      children: [
        {
          path: '/HomePage',
          name: 'HomePage',
          component: HomePage
        },
        {
          path: '/PolicyAd',
          name: 'PolicyAd',
          component: PolicyAd,
          children: [
            {
              path: '/PolicyAd/DebitNote',
              name: 'DebitNote',
              component: DebitNote
            },
            {
              path: '/PolicyAd/Quotation',
              name: 'Quotation',
              component: Quotation
            },
            {
              path: '/PolicyAd/FirstPeriod',
              name: 'FirstPeriod',
              component: FirstPeriod
            },
            {
              path: '/PolicyAd/PaymentSchedule',
              name: 'PaymentSchedule',
              component: PaymentSchedule
            },
            {
              path: '/PolicyAd/InsuranceCancel',
              name: 'InsuranceCancel',
              component: InsuranceCancel
            }
          ]
        },
        {
          path: '/Amortized',
          name: 'Amortized',
          component: Amortized,
          children: [
            {
              path: '/Amortized/StageList',
              name: 'StageList',
              component: StageList
            },
            {
              path: '/Amortized/ReimbursementDetail',
              name: 'ReimbursementDetail',
              component: ReimbursementDetail
            },
            {
              path: '/Amortized/PolicyAndInvoice',
              name: 'PolicyAndInvoice',
              component: PolicyAndInvoice
            }
          ]
        },
        {
          path: '/Decision',
          name: 'Decision',
          component: Decision
        },
        {
          path: '/Setting',
          name: 'Setting',
          component: Setting
        }
      ]
    },
    {
      path: '/MLogin',
      name: 'MLogin',
      component: MLogin,
      meta: {
        title: '登录'
      }
    },
    {
      path: '/vol',
      name: 'VolBasic',
      component: VolBasic,
      meta: {
        title: '车险后台管理'
      },
      children: [
        {
          path: '/vol/VolHomePage',
          name: 'VolHomePage',
          component: VolHomePage
        },
        {
          path: '/vol/VolOrderApply',
          name: 'VolOrderApply',
          component: VolOrderApply,
          children: [
            {
              path: '/vol/VolOrderApply/QuotationOrder',
              name: 'QuotationOrder',
              component: QuotationOrder
            },
            {
              path: '/vol/VolOrderApply/MakePayment',
              name: 'MakePayment',
              component: MakePayment
            },
            {
              path: '/vol/VolOrderApply/AddByPerson',
              name: 'AddByPerson',
              component: AddByPerson
            }
          ]
        },
        {
          path: '/vol/VolPolicyAd',
          name: 'VolPolicyAd',
          component: VolPolicyAd,
          children: [
            {
              path: '/vol/VolPolicyAd/VolDebitNote',
              name: 'VolDebitNote',
              component: VolDebitNote
            },
            {
              path: '/vol/VolPolicyAd/VolQuotation',
              name: 'VolQuotation',
              component: VolQuotation
            },
            {
              path: '/vol/VolPolicyAd/VolFirstPeriod',
              name: 'VolFirstPeriod',
              component: VolFirstPeriod
            },
            {
              path: '/vol/VolPolicyAd/VolPaymentSchedule',
              name: 'VolPaymentSchedule',
              component: VolPaymentSchedule
            },
            {
              path: '/vol/VolPolicyAd/VolInsuranceCancel',
              name: 'VolInsuranceCancel',
              component: VolInsuranceCancel
            }
          ]
        },
        {
          path: '/vol/VolAmortized',
          name: 'VolAmortized',
          component: VolAmortized,
          children: [
            {
              path: '/vol/VolAmortized/VolStageList',
              name: 'VolStageList',
              component: VolStageList
            },
            {
              path: '/vol/VolAmortized/VolReimbursementDetail',
              name: 'VolReimbursementDetail',
              component: VolReimbursementDetail
            },
            {
              path: '/vol/VolAmortized/VolPolicyAndInvoice',
              name: 'VolPolicyAndInvoice',
              component: VolPolicyAndInvoice
            }
          ]
        },
        {
          path: '/vol/VolDecision',
          name: 'VolDecision',
          component: VolDecision,
          children: [
            {
              path: '/vol/VolDecision/Calculater',
              name: 'Calculater',
              component: Calculater
            },
            {
              path: '/vol/VolDecision/Chart',
              name: 'Chart',
              component: Chart
            }
          ]
        },
        {
          path: '/vol/VolBlackList',
          name: 'VolBlackList',
          component: VolBlackList,
          children: [
            {
              path: '/vol/VolBlackList/BlackList',
              name: 'BlackList',
              component: BlackList
            }
          ]
        },
        {
          path: '/vol/VolSetting',
          name: 'VolSetting',
          component: VolSetting,
          children: [
            {
              path: '/vol/VolSetting/ChannelManagement',
              name: 'ChannelManagement',
              component: ChannelManagement
            },
            {
              path: '/vol/VolSetting/AccountManagement',
              name: 'AccountManagement',
              component: AccountManagement
            }
          ]
        }
      ]
    },
    {
      path: '/',
      name: 'Login',
      component: Login,
      meta: {
        title: '登录'
      }
    }
  ]
})
