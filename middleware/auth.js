export default defineNuxtRouteMiddleware((to, from) => {
  const cookies = useCookie('token')
  if (!cookies._value) {
    navigateTo('/login')
  }
})
