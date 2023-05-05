import cookies from 'js-cookie'

export default defineNuxtRouteMiddleware((to, from) => {
  if (cookies.get('settings_pin_token')) return false
  return true
})
