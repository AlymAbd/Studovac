import { base, session } from '@v/api/axios'

const obtainToken = function (email, personal_uid) {
  return base.post(`/login/`, {
    email: email,
    personal_uid: personal_uid,
  })
}

const destroyToken = function () {
  return new Promise((resolve, reject) => {
    session
      .post(`/logout/`)
      .then((response) => {
        resolve(response)
      })
      .catch((response) => {
        reject(response)
      })
  })
}

export { obtainToken, destroyToken }
