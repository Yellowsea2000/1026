
/* eslint-disable */

import Vue from 'vue'
import Router from 'vue-router'
import qrcode from '@/components/qrcode'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'qrcode',
      component: qrcode
    }
  ]
})
