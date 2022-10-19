import { base, session } from './axios'
import { ACCESS_TOKEN, USER_DATA } from './config'
import { parseEmailOrPhone } from './utils'

class AuthService {
  getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN)
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem(USER_DATA))
  }

  logout() {
    localStorage.removeItem(ACCESS_TOKEN)
    localStorage.removeItem(USER_DATA)
    return true
  }

  login(emailOrPhone, password) {
    let data = parseEmailOrPhone(emailOrPhone)
    data.password = password
    return base.post('/login/', data)
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
