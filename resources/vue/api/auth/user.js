import { base } from '@v/api/axios'

const register = (
  email,
  name,
  password,
  password_confirmation,
  phone
) => {
  return base.post(`/register/`, {
    email: email,
    name: name,
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

export { register, login }
