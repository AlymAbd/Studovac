import { base, session } from '@v/api/axios'

const destroyToken = () => {
  return session.post(`/logout/`)
}

const obtainToken = () => {
  return session.post('/api/token')
}

export { destroyToken, obtainToken }
