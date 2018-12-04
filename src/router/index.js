import Vue from 'vue'
import Router from 'vue-router'
import Basic from '@/components/Client/Basic'
import HomePage from '@/components/Client/HomePage'
import PolicyAd from '@/components/Client/PolicyAd'
import Amortized from '@/components/Client/Amortized'
import Decision from '@/components/Client/Decision'
import Setting from '@/components/Client/Setting'

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
          component: PolicyAd
        },
        {
          path: '/Amortized',
          name: 'Amortized',
          component: Amortized
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
    }
  ]
})
