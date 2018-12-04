import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/Client/HomePage'
import Basic from '@/components/Client/Basic'

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
        }
      ]
    }
  ]
})
