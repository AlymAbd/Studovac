import { createApp } from 'vue'

import App from '@v/App.vue'
import router from '@v/router'
import SuiVue from 'semantic-ui-vue'
import axios from 'axios'
import i18n from '@v/i18n'
import 'semantic-ui-css/semantic.min.css'

const app = createApp(App)
app.config.globalProperties.$axios = axios
app.use(i18n)
app.use(router)
app.use(SuiVue)
app.mount('#app')
