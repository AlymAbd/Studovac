import { base, session } from '@v/api/axios'

const register = (
  email,
  name,
  password,
  password_confirmation,
  phone
) => {
  return base.post(`/register/`, {
    email: email,
    title: name,
    password: password,
    password_confirmation: password_confirmation,
    phone: phone
  })
}

const login = (
  email,
  phone,
  password
) => {
  return base.post('/login/', {
    email: email,
    phone: phone,
    password: password
  })
}

const verifyEmail = (hash) => {
  return base.post('user/pin-code/verify', {
    hash: hash,
  })
}

const resendVerification = (email, phone) => {
  return session.post('user/pin-code/resend', {
    email: email,
    phone: phone
  })
}

export { register, login, verifyEmail, resendVerification }
