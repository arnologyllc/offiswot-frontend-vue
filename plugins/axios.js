export default function ({ $axios, app }, inject) {
    const api = $axios.create({
      headers: {
        common: {
          Authorization: `Bearer ${app.$cookies.get('token')}`
        }
      }
    })

    api.setBaseURL(process.env.apiUrl)
  
    inject('api', api)
  }