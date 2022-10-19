import routes from '@r/routes'

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

export { parseEmailOrPhone, getRoute }
