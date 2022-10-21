import { base, session } from './axios'
import { ACCESS_TOKEN, USER_DATA, EXPIR_DATE } from './config'

class AuthService {
  getAccessToken() {
    if (Number(localStorage.getItem(EXPIR_DATE)) > new Date().getTime()) {
      return localStorage.getItem(ACCESS_TOKEN)
    } else {
      localStorage.removeItem(ACCESS_TOKEN)
      localStorage.removeItem(USER_DATA)
      localStorage.removeItem(EXPIR_DATE)
      return false
    }
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem(USER_DATA))
  }

  setAccessToken(token) {
    localStorage.setItem(EXPIR_DATE, new Date().getTime() + 70000000)
    localStorage.setItem(ACCESS_TOKEN, token)
    return token
  }

  setCurrentUser(data) {
    localStorage.setItem(USER_DATA, JSON.stringify(data))
  }

  logout() {
    localStorage.removeItem(ACCESS_TOKEN)
    localStorage.removeItem(USER_DATA)
    return true
  }

  login({ email, phone, password }) {
    return new Promise((resolve, reject) => {
      base
        .post('/login/', {
          email: email,
          phone: phone,
          password: password,
        })
        .then((response) => {
          this.setAccessToken(response.data.token)
          delete response.data.token
          delete response.data.id
          this.setCurrentUser(response.data)
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  register(email, name, password, password_confirmation, phone) {
    return base.post(`/register/`, {
      email: email,
      title: name,
      password: password,
      password_confirmation: password_confirmation,
      phone: phone,
    })
  }

  verifyEmail(token) {
    return session.post('user/pin-code/verify', {
      token: token,
    })
  }

  resendVerification(email, phone) {
    return session.post('user/pin-code/resend', {
      email: email,
      phone: phone,
    })
  }
}

export default new AuthService()
