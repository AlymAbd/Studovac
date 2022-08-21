import { base } from '@v/api/axios'

const register = (
  email,
  name,
  surname,
  personal_uid,
  personal_uid_confirmation,
) => {
  return base.post(`/register/`, {
    email: email,
    name: name,
    surname: surname,
    personal_uid: personal_uid,
    personal_uid_confirmation: personal_uid_confirmation,
  })
}

export { register }
