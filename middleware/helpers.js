const checkFirstLogin = (cookies, router) => {
  if (cookies.get('first_login')) {
    router.push('/pin')
  } else if (router.history.current.path === '/pin') {
    router.push('/')
  }
}

const checkLoginToken = (cookies, router) => {
  if (!cookies.get('login_pin_token')) {
    if (router.history.current.path === '/') return false
    router.push('/')
  }
  return true
}

const checkSettingsToken = (cookies) => {
  if (cookies.get('settings_pin_token')) return true
  return false
}

export { checkFirstLogin, checkLoginToken, checkSettingsToken }
