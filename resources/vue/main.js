import { createApp } from 'vue'

import App from '@v/App.vue'
import router from '@v/router'
import axios from 'axios'
import VueCookies from 'vue-cookies'
import i18n from '@v/i18n'
import BootstrapVue3 from 'bootstrap-vue-3'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

const app = createApp(App)
app.config.globalProperties.$axios = axios

app.component('font-awesome-icon', FontAwesomeIcon)

app.use(BootstrapVue3)
app.use(VueCookies, { expire: '3d'})
app.use(router)
app.use(i18n)
app.mount('#app')

if (!$cookies.get('lang')) {
  $cookies.set('lang', 'eng', '999d')
}
