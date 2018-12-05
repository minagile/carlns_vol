import Vue from 'vue'
import Router from 'vue-router'
import Basic from '@/components/Client/Basic'
import HomePage from '@/components/Client/HomePage'
import PolicyAd from '@/components/Client/PolicyAd'
import Amortized from '@/components/Client/Amortized'
import Decision from '@/components/Client/Decision'
import Setting from '@/components/Client/Setting'

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

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Basic',
      component: Basic,
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
      path: '/vol',
      name: 'VolBasic',
      component: VolBasic,
      children: [
        {
          path: '/vol/VolHomePage',
          name: 'VolHomePage',
          component: VolHomePage
        },
        {
          path: '/vol/VolOrderApply',
          name: 'VolOrderApply',
          component: VolOrderApply
        },
        {
          path: '/vol/VolPolicyAd',
          name: 'VolPolicyAd',
          component: VolPolicyAd
        },
        {
          path: '/vol/VolAmortized',
          name: 'VolAmortized',
          component: VolAmortized
        },
        {
          path: '/vol/VolDecision',
          name: 'VolDecision',
          component: VolDecision
        },
        {
          path: '/vol/VolBlackList',
          name: 'VolBlackList',
          component: VolBlackList
        },
        {
          path: '/vol/VolSetting',
          name: 'VolSetting',
          component: VolSetting
        }
      ]
    }
  ]
})
