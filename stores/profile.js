import { defineStore } from 'pinia'

const useProfileStore = defineStore('profile', {
  state: () => {
    return {
      profileSuccessData: null,
      profileFailureData: null,
      profileLoading: true,
      isLoadingSubmit: false,
      editProfileData: null,
      editFailureData: null,
      setPinData: null,
      setPinFailureData: null,
      deleteProfileData: null,
      deleteFailureData: null,
      deactivateProfileData: null,
      deactivateFailureData: null,
      workspacesSuccessData: null,
      workspacesFailureData: null,
    }
  },
  actions: {
    getProfile() {
      const { $myFetch } = useNuxtApp()
      this.profileLoading = true
      $myFetch('user-profile')
        .then((data) => {
          this.profileSuccessData = data
        })
        .catch((e) => {
          try {
            JSON.parse(e.response.data)
          } catch {
            this.profileFailureData = e.response.data
          }
          this.profileFailureData = JSON.parse(e.response.data)
        })
        .finally(() => {
          this.profileLoading = false
        })
    },

    getWorkSpaces() {
      const { $myFetch } = useNuxtApp()
      $myFetch('workspaces')
        .then((data) => {
          this.workspacesSuccessData = data
        })
        .catch((e) => {
          try {
            JSON.parse(e.response.data)
          } catch {
            return e.response.data
          }
          return JSON.parse(e.response.data)
        })
    },

    editProfile(payload) {
      if (payload.phone_number) {
        payload.phone_number = payload.phone_number
          .toString()
          .replaceAll('(', '')
          .replaceAll(')', '')
          .replaceAll(' ', '')
          .replaceAll('-', '')
      }
      const formData = new FormData()
      if (typeof payload.avatar === 'string') {
        delete payload.avatar
      }
      if (typeof payload.cv === 'string') {
        delete payload.cv
      }
      for (const i in payload) {
        if (payload[i] === null || payload[i] === undefined) {
          formData.append(i, '')
        } else {
          formData.append(i, payload[i])
        }
      }
      for (const value of formData.entries()) {
        console.log(value)
      }
      const { $myFetch } = useNuxtApp()
      this.isLoadingSubmit = true

      $myFetch('update-profile', {
        method: 'post',
        body: formData,
      })
        .then((data) => {
          this.editProfileData = data
        })
        .catch((e) => {
          try {
            JSON.parse(e.response.data)
          } catch {
            this.editFailureData = e.response.data
            this.isLoadingSubmit = false
            return
          }
          this.editFailureData = JSON.parse(e.response.data)
        })
        .finally(() => {
          this.isLoadingSubmit = false
        })
    },

    deleteProfile(payload) {
      const { $myFetch } = useNuxtApp()
      if (payload.pin) {
        this.isLoadingSubmit = true
        $myFetch('delete-profile', {
          method: 'delete',
          body: { data: payload },
        })
          .then((data) => {
            this.deleteProfileData = data
          })
          .catch((e) => {
            try {
              JSON.parse(e.response.data)
            } catch {
              this.deleteFailureData = e.response.data
              this.isLoadingSubmit = false
              return
            }
            this.deleteFailureData = JSON.parse(e.response.data)
          })
          .finally(() => {
            this.isLoadingSubmit = false
          })
      }
    },

    deactivateProfile(payload) {
      const { $myFetch } = useNuxtApp()
      if (payload.pin) {
        this.isLoadingSubmit = true
        $myFetch('deactivate-profile', {
          method: 'post',
          body: { data: payload },
        })
          .then((data) => {
            this.deactivateProfileData = data
          })
          .catch((e) => {
            try {
              JSON.parse(e.response.data)
            } catch {
              this.deactivateFailureData = e.response.data
              this.isLoadingSubmit = false
              return
            }
            this.deactivateFailureData = JSON.parse(e.response.data)
          })
          .finally(() => {
            this.isLoadingSubmit = false
          })
      }
    },
  },
})

export default useProfileStore
