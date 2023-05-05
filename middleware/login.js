import cookies from 'js-cookie'
import { useRoute } from 'vue-router'

export default defineNuxtRouteMiddleware((to, from) => {
  const route = useRoute()
  if (cookies.get('token')) {
    if (route.path === '/register' || route.fullPath === '/login') {
      return navigateTo('/')
    }
  } else if (cookies.get('settings_pin_token'))
    cookies.remove('settings_pin_token')
})
