import Cookies from 'js-cookie'
export default function ({ $axios, app }, inject) {
    const api = $axios.create({
      baseURL:process.env.apiUrl,
    })
    api.interceptors.request.use(
        (config) => {
          const token = Cookies.get("token")
          if (token) {
            config.headers.Authorization = `Bearer ${token}`
          } 
          return config
        }
    )
    inject('api', api)
  }