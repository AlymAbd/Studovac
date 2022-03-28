import { createApp } from 'vue'

import App from '@v/App.vue'
import router from '@v/router'

import axios from 'axios'

const app = createApp(App)
app.config.globalProperties.$axios = axios
app.use(router)
app.mount('#app')
