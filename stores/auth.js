import { defineStore } from 'pinia'

const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      registerSuccessData: null,
      registerFailureData: null,
      resendSuccessData: null,
      resendFailureData: null,
      loginSuccessData: null,
      loginErrorData: null,
      forgotSuccessData: null,
      forgotErrorData: null,
      resetSuccessData: null,
      resetErrorData: null,
      registerLoading: false,
      loginLoading: false,
      forgotLoading: false,
      resetLoading: false,
    }
  },
  actions: {
    loginUser(payload) {
      const { $myFetch } = useNuxtApp()
      this.loginLoading = true
      $myFetch('login', {
        method: 'post',
        body: JSON.stringify(payload),
      })
        .then((data) => {
          this.loginSuccessData = data
        })
        .catch((e) => {
          try {
            console.dir(e)
            JSON.parse(e.data)
          } catch {
            this.loginErrorData = e.data
            this.loginLoading = false
            return
          }
          this.loginErrorData = JSON.parse(e.data)
        })
        .finally(() => {
          this.loginLoading = false
        })
    },

    registerUser(payload) {
      const { $myFetch } = useNuxtApp()
      this.registerLoading = true
      const formData = new FormData()
      for (const i in payload) {
        formData.append(i, payload[i])
      }
      $myFetch('register', {
        method: 'post',
        body: formData,
      })
        .then((data) => {
          this.registerSuccessData = data.user
        })
        .catch((e) => {
          try {
            JSON.parse(e.data)
          } catch {
            this.registerFailureData = e.data
            this.registerLoading = false
            return
          }
          this.registerFailureData = JSON.parse(e.data)
        })
        .finally(() => {
          this.registerLoading = false
        })
    },

    resendEmail(email) {
      this.resendSuccessData = null
      const { $myFetch } = useNuxtApp()
      const formData = new FormData()
      formData.append('email', email)
      $myFetch('email/resend', {
        method: 'post',
        body: formData,
      })
        .then((data) => {
          this.resendSuccessData = data
        })
        .catch((e) => {
          try {
            JSON.parse(e.response.data)
          } catch {
            this.resendFailureData = e.response.data
            return
          }
          this.resendFailureData = JSON.parse(e.response.data)
        })
    },

    forgotPassword(payload) {
      this.forgotSuccessData = null
      const { $myFetch } = useNuxtApp()
      this.forgotLoading = true
      $myFetch('/reset-password', {
        method: 'post',
        body: { email: payload.email },
      })
        .then((data) => {
          this.forgotSuccessData = data
        })
        .catch((e) => {
          try {
            console.dir(e)
            console.log(e)
            JSON.parse(e.data)
          } catch {
            this.forgotErrorData = e.data
            this.forgotLoading = false
            return
          }
          this.forgotErrorData = JSON.parse(e.data)
        })
        .finally(() => {
          this.forgotLoading = false
        })
    },

    forgotPasswordWithMail() {
      this.forgotSuccessData = null
      const { $myFetch } = useNuxtApp()
      this.forgotLoading = true
      $myFetch('/settings/forget-password')
        .then((data) => {
          this.forgotSuccessData = data
        })
        .catch((e) => {
          try {
            JSON.parse(e.response.data)
          } catch {
            this.forgotErrorData = e.response.data
            this.forgotLoading = false
            return
          }
          this.forgotErrorData = JSON.parse(e.response.data)
        })
        .finally(() => {
          this.forgotLoading = false
        })
    },

    resetPassword(payload) {
      this.resetSuccessData = null
      const formData = new FormData()
      for (const i in payload) {
        formData.append(i, payload[i])
      }
      const { $myFetch } = useNuxtApp()
      this.resetLoading = true
      $myFetch('/change-password', {
        method: 'post',
        body: formData,
      })
        .then((data) => {
          this.resetSuccessData = data
        })
        .catch((e) => {
          try {
            JSON.parse(e.response.data)
          } catch {
            this.resetErrorData = e.response.data
            this.resetLoading = false
            return
          }
          this.resetErrorData = JSON.parse(e.response.data)
        })
        .finally(() => {
          this.resetLoading = false
        })
    },

    resetPasswordWithSettings(payload) {
      this.resetSuccessData = null
      const { $myFetch } = useNuxtApp()
      this.resetLoading = true
      $myFetch('/settings/reset-password', {
        method: 'post',
        body: payload,
      })
        .then((data) => {
          this.resetSuccessData = data
        })
        .catch((e) => {
          try {
            JSON.parse(e.data)
          } catch {
            this.resetErrorData = e.data
            this.resetLoading = false
            return
          }
          this.resetErrorData = JSON.parse(e.data)
        })
        .finally(() => {
          this.resetLoading = false
        })
    },
  },
})

export default useAuthStore
