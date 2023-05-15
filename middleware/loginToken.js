import cookies from 'js-cookie'

export default defineNuxtRouteMiddleware((to, from) => {
  if (cookies.get('login_pin_token')) return false
  return true
})
