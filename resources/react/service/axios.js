import axios from 'axios'
import { ACCESS_TOKEN, CSRF_HEADER_NAME, CSRF_COOKIE_NAME, APP_URL } from './config'

axios.defaults.baseURL = APP_URL

const base = axios.create({
  xsrfCookieName: CSRF_COOKIE_NAME,
  xsrfHeaderName: CSRF_HEADER_NAME,
})

base.defaults.headers.common = {
  Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
  Accept: 'application/json',
  ContentType: 'application/json',
}

const session = base

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
  (response) => {
    return Promise.resolve(response)
  },
  (error) => {
    return Promise.reject(error)
  },
)

export { base, session }
