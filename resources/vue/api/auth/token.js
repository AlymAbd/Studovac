import { base, session } from '@v/api/axios'

const destroyToken = () => {
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

export { destroyToken }
