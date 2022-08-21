import axios from 'axios'
import {
  ACCESS_TOKEN,
  CSRF_HEADER_NAME,
  CSRF_COOKIE_NAME,
} from '@v/config/definitions'
import { APP_URL } from '@v/config/app'

axios.defaults.baseURL = APP_URL

const base = axios.create({
  xsrfCookieName: CSRF_COOKIE_NAME,
  xsrfHeaderName: CSRF_HEADER_NAME,
})

const session = axios.create({
  xsrfCookieName: CSRF_COOKIE_NAME,
  xsrfHeaderName: CSRF_HEADER_NAME,
})

session.defaults.headers.common = {
  Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
}

session.interceptors.request.use(
  (config) => {
    config.headers['Authorization'] = `Bearer ${localStorage.getItem(
      ACCESS_TOKEN,
    )}`
    return config
  },
  (error) => {
    Promise.reject(error)
  },
)

// session.interceptors.response.use(
//   (response) => {
//     return response
//   },
//   (error) => {
//     console.log(error.response)
//   },
// )

export { base, session, APP_URL }
