import cookies from 'js-cookie'
import { useRoute } from 'vue-router'

export default defineNuxtRouteMiddleware((to, from) => {
  const route = useRoute()
  if (!cookies.get('login_pin_token')) {
    if (route.path === '/') return true
    return navigateTo('/')
  }
  return false
})
