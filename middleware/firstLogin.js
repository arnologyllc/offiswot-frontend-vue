import cookies from 'js-cookie'
import { useRoute } from 'vue-router'

export default defineNuxtRouteMiddleware((to, from) => {
  const route = useRoute()
  if (cookies.get('first_login')) return navigateTo('/pin')
  else if (route.path === '/pin') return navigateTo('/')
})
