import Cookies from 'js-cookie'
export default function ({ $axios, app }, inject) {
  const api = $axios.create({
    baseURL: process.env.apiUrl,
  })
  api.interceptors.request.use((config) => {
    const token = Cookies.get('token')
    const loginPinToken = Cookies.get('login_pin_token')
    const settingsPinToken = Cookies.get('settings_pin_token')
    if (token) config.headers.Authorization = `Bearer ${token}`
    if (loginPinToken) config.headers['Login-Pin-Token'] = `${loginPinToken}`
    if (settingsPinToken)
      config.headers['Settings-Pin-Token'] = `${settingsPinToken}`

    return config
  })
  inject('api', api)
}
