import { base, session } from '@v/api/axios'

const destroyToken = () => {
  return new Promise((resolve, reject) => {
    session.post(`/logout/`)
  })
}

export { destroyToken }
