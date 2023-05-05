import { useRoute } from 'vue-router'

export default defineNuxtRouteMiddleware((to, from) => {
  const $route = useRoute()
  if (!$route.params.id) {
    navigateTo('/profile')
  }
})
