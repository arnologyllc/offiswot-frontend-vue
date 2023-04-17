const checkPin = (cookies, router) => {
  if (cookies.get('first_login')) {
    router.push('/pin')
  } else if (router.history.current.path === '/pin') {
    router.push('/')
  }
}

export { checkPin }
