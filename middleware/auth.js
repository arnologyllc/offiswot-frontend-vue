export default defineNuxtRouteMiddleware((to, from) => {
  const tokenCookies = useCookie('token')

  if (process.client) {
    const accounts =
      localStorage.getItem('accounts') !== 'undefined'
        ? JSON.parse(localStorage.getItem('accounts'))?.filter((elem) => Date.parse(elem.token_expires) > new Date())
        : []
    localStorage.setItem('accounts', JSON.stringify(accounts))

    if (!tokenCookies._value) {
      const firstToken = useCookie('first_login')
      const settingsToken = useCookie('settings_pin_token')
      const loginToken = useCookie('login_pin_token')
      const accountID = useCookie('currentAccountID')
      if (accounts[0]) {
        firstToken.value = accounts[0].firstToken
        tokenCookies.value = accounts[0].token
        settingsToken.value = accounts[0].settings_pin_token
        loginToken.value = accounts[0].login_pin_token
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
