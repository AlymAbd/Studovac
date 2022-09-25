import axios from 'axios'
import {
  ACCESS_TOKEN,
  CSRF_HEADER_NAME,
  CSRF_COOKIE_NAME,
} from '@v/config/definitions'
import { APP_URL } from '@v/config/app'
import store from '@v/store'
import router from '@v/router'

axios.defaults.baseURL = APP_URL

const base = axios.create({
  xsrfCookieName: CSRF_COOKIE_NAME,
  xsrfHeaderName: CSRF_HEADER_NAME,
})

const session = base

session.defaults.headers.common = {
  Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
  Accept: 'application/json',
  ContentType: 'application/json'
}

session.interceptors.request.use(
  (config) => {
    config.headers['Authorization'] = `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
    return config
  },
  (error) => {
    Promise.reject(error)
  },
)

session.interceptors.response.use(
  response => { return Promise.resolve(response) },
  error => {
    if (error.response.status === 401 && error.response.statusText == 'Unauthorized') {
      console.log('unauthorizing user')
      store.dispatch('auth/removeUserInfo')
      router.go({ name: 'home' })
    }
    return Promise.reject(error)
  },
)

export { base, session, APP_URL }
