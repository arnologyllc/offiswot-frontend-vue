export default defineNuxtPlugin((app) => {
  const config = useRuntimeConfig()
  const myFetch = $fetch.create({
    baseURL: config.public.env.apiUrl,
    onRequest({ request, options }) {
      options.headers = {
        'Login-Pin-Token': useCookie('login_pin_token').value ? useCookie('login_pin_token').value : '',
        'Settings-Pin-Token': useCookie('settings_pin_token').value ? useCookie('settings_pin_token').value : '',
        authorization: useCookie('token').value ? `Bearer ${useCookie('token').value}` : '',
      }
    },
  })

  app.provide('myFetch', myFetch)
})
