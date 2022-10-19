import 'react-app-polyfill/stable'
import 'core-js'
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './app'
import reportWebVitals from './service/report_web_vitals'
import { Provider } from 'react-redux'
import store from './store'
import Cookies from 'universal-cookie'
import * as ServiceWorker from './service/worker'

const cookies = new Cookies()
if (!cookies.get('lang')) {
  let userLang = navigator.language || navigator.userLanguage
  cookies.set('lang', userLang || 'en', { path: '/' })
}

import './i18n'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

ServiceWorker.unregister()
