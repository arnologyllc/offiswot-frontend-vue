export default defineNuxtRouteMiddleware((to, from) => {
  const tokenCookies = useCookie('token')

  if (process.client) {
    const accounts =
      localStorage.getItem('accounts') !== 'undefined' && localStorage.getItem('accounts') !== null
        ? JSON.parse(localStorage.getItem('accounts'))
            ?.map((elem) => {
              if (Date.parse(elem.token_expires) < new Date()) {
                elem.token = null
                elem.token_expires = null
                elem.settings_pin_token = null
              }
              return elem
            })
            ?.filter((elem) => {
              return (
                Date.parse(elem.login_pin_token_expires) > new Date() || Date.parse(elem.token_expires) > new Date()
              )
            })
        : []

    localStorage.setItem('accounts', JSON.stringify(accounts))

    if (!tokenCookies._value) {
      const firstToken = useCookie('first_login')
      const settingsToken = useCookie('settings_pin_token')
      const loginToken = useCookie('login_pin_token')
      const accountID = useCookie('currentAccountID')

      const newIndex = accounts.findIndex((elem) => elem.token)
      if (accounts[newIndex]) {
        firstToken.value = accounts[newIndex].firstToken
        tokenCookies.value = accounts[newIndex].token
        settingsToken.value = accounts[newIndex].settings_pin_token
        loginToken.value = accounts[newIndex].login_pin_token
        accountID.value = 0
        navigateTo('/')
      } else {
        firstToken.value = null
        settingsToken.value = null
        loginToken.value = null
        accountID.value = null
        navigateTo('/login')
      }
    }
  }
})
