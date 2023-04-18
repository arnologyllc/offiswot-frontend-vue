const checkPin = (cookies, router) => {
  if (cookies.get('first_login')) {
    router.push('/pin')
  } else if (router.history.current.path === '/pin') {
    router.push('/')
  }
}

const checkAccess = (cookies) => {
  if (cookies.get('pin')) {
    return true
  }
  return false
}

export { checkPin, checkAccess }
