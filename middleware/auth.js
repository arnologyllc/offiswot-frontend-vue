import nuxtStorage from 'nuxt-storage'
export default defineNuxtRouteMiddleware((to, from) => {
  const tokenCookies = useCookie('token')
  const accounts = nuxtStorage.localStorage.getData('accounts')
  if (!tokenCookies._value) {
    const firstToken = useCookie('first_login')
    const settingsToken = useCookie('settings_pin_token')
    const loginToken = useCookie('login_pin_token')
    const accountID = useCookie('currentAccountID')
    if (accounts !== null) {
      firstToken.value = accounts[0].firstToken
      tokenCookies.value = accounts[0].token
      settingsToken.value = accounts[0].settings_pin_token
      loginToken.value = accounts[0].login_pin_token
      accountID.value = 0
    } else {
      firstToken.value = null
      settingsToken.value = null
      loginToken.value = null
      accountID.value = null
    }
    navigateTo('/login')
  }
  if (
    nuxtStorage.localStorage
      .getData('accounts')
      ?.filter((elem) => elem.token_expires > new Date())[0]
  ) {
    nuxtStorage.localStorage.setData(
      'accounts',
      nuxtStorage.localStorage
        .getData('accounts')
        ?.filter((elem) => elem.token_expires > new Date()),
      30,
      'd'
    )
  }
})
