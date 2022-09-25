import { createApp } from 'vue'

import App from '@v/App.vue'
import router from '@v/router'
import store from './store'
import i18n from '@v/i18n'

import axios from 'axios'
import VueCookies from 'vue-cookies'
import BootstrapVue3 from 'bootstrap-vue-3'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import CoreuiVue from '@coreui/vue'
import CIcon from '@coreui/icons-vue'
import { freeSet as icons } from '@coreui/icons'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

const app = createApp(App)
app.config.globalProperties.$axios = axios

app.component('font-awesome-icon', FontAwesomeIcon)

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.getters['auth/isAuthenticated']) {
      next({ name: 'login' })
    } else {
      next()
    }
  } else if (to.matched.some((record) => record.meta.withoutAuth)) {
    if (store.getters['auth/isAuthenticated']) {
      next({ name: 'home' })
    } else {
      next()
    }
  } else {
    next()
  }
})

app
  .use(BootstrapVue3)
  .use(VueCookies, { expire: '3d', samesite: 'none' })
  .use(store)
  .use(router)
  .use(CoreuiVue)
  .use(i18n)

app.provide('icons', icons)
app.component('CIcon', CIcon)

app.mount('#app')

if (!$cookies.get('lang')) {
  $cookies.set('lang', 'en', '999d')
}
