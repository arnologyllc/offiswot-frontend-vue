import { defineStore } from 'pinia'

const usePinStore = defineStore('pin', {
  state: () => {
    return {
      isLoadingSubmit: false,

      setPinData: null,
      setPinFailureData: null,

      resetPinData: null,
      resetPinFailureData: null,

      forgotPinData: null,
      forgotPinFailureData: null,

      changePinData: null,
      changePinFailureData: null,

      checkPinData: null,
      checkPinFailureData: null,
    }
  },
  actions: {
    setPin(payload) {
      const { $myFetch } = useNuxtApp()
      this.isLoadingSubmit = true
      const formData = new FormData()
      for (const i in payload) {
        formData.append(i, String(payload[i]))
      }
      $myFetch('create-pin', {
        method: 'post',
        body: formData,
      })
        .then((data) => {
          this.setPinData = data
        })
        .catch((e) => {
          try {
            JSON.parse(e.response.data)
          } catch {
            this.setPinFailureData = e.response.data
          }
          this.setPinFailureData = JSON.parse(e.response.data)
        })
        .finally(() => {
          this.isLoadingSubmit = false
        })
    },

    resetPin(payload) {
      const { $myFetch } = useNuxtApp()
      this.isLoadingSubmit = true
      const formData = new FormData()
      for (const i in payload) {
        formData.append(i, String(payload[i]))
      }
      $myFetch('reset-pin', {
        method: 'post',
        body: formData,
      })
        .then((data) => {
          this.resetPinData = data
        })
        .catch((e) => {
          try {
            JSON.parse(e.data)
          } catch {
            this.resetPinFailureData = e.data
            return
          }
          this.resetPinFailureData = JSON.parse(e.data)
        })
        .finally(() => {
          this.isLoadingSubmit = false
        })
    },

    forgotPin() {
      const { $myFetch } = useNuxtApp()
      this.isLoadingSubmit = true
      $myFetch('/reset-pin-email', {
        method: 'post',
      })
        .then((data) => {
          this.forgotPinData = data
        })
        .catch((e) => {
          try {
            JSON.parse(e.response.data)
          } catch {
            this.forgotPinFailureData = e.response.data
          }
          this.forgotPinFailureData = JSON.parse(e.response.data)
        })
        .finally(() => {
          this.isLoadingSubmit = false
        })
    },

    changePin(payload) {
      const formData = new FormData()
      for (const i in payload) {
        formData.append(i, payload[i])
      }
      const { $myFetch } = useNuxtApp()
      this.isLoadingSubmit = true
      $myFetch('/change-pin', {
        method: 'post',
        body: formData,
      })
        .then((data) => {
          this.changePinData = data
        })
        .catch((e) => {
          try {
            JSON.parse(e.response.data)
          } catch {
            this.changePinFailureData = e.response.data
          }
          this.changePinFailureData = JSON.parse(e.response.data)
        })
        .finally(() => {
          this.isLoadingSubmit = false
        })
    },

    checkPin(payload) {
      const { $myFetch } = useNuxtApp()
      this.isLoadingSubmit = true
      $myFetch('/check-pin', {
        method: 'post',
        body: { pin: payload.pin },
      })
        .then((data) => {
          this.checkPinData = data
        })
        .catch((e) => {
          try {
            JSON.parse(e.data.message)
          } catch {
            this.checkPinFailureData = e.data.message
          }
          this.checkPinFailureData = JSON.parse(e.data.message)
        })
        .finally(() => {
          this.isLoadingSubmit = false
        })
    },
  },
})

export default usePinStore
