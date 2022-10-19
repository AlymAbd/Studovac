import routes from '@r/routes'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

const parseEmailOrPhone = (emailOrPhone) => {
  let result = {
    email: null,
    phone: null,
  }
  let parsed = String(emailOrPhone)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    )
  if (parsed === null) {
    result.phone = emailOrPhone
  } else {
    result.email = emailOrPhone
  }
  return result
}

const getRoute = (pathname) => {
  const currentRoute = routes.find((route) => {
    return route.props.path === pathname
  })
  return currentRoute ? currentRoute.props : false
}

const getLanguage = () => {
  return cookies.get('lang') || 'en'
}

const setLanguage = (language) => {
  cookies.set('lang', language)
  return language
}

export { parseEmailOrPhone, getRoute, getLanguage, setLanguage }
