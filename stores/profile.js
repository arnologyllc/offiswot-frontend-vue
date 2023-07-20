import { defineStore } from 'pinia'
import $cookies from 'js-cookie'

const useProfileStore = defineStore('profile', {
  state: () => {
    return {
      profileSuccessData: null,
      profileFailureData: null,
      profileLoading: true,
      rememberProfileSuccessData: null,
      rememberProfileFailureData: null,
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
    getProfile(workspaceID) {
      if ($cookies.get('token')) {
        const { $myFetch } = useNuxtApp()
        this.profileLoading = true
        const url = workspaceID ? `user-profile?workspace_id=${workspaceID}` : 'user-profile'
        $myFetch(url, { retry: 5 })
          .then((data) => {
            this.profileSuccessData = data
          })
          .catch((e) => {
            try {
              JSON.parse(e.data)
            } catch {
              this.profileFailureData = e.data
            }
            this.profileFailureData = JSON.parse(e.data)
          })
          .finally(() => {
            this.profileLoading = false
          })
      }
    },

    async getRemember(payload) {
      const { $myFetch } = useNuxtApp()
      this.profileLoading = true
      await $myFetch(`autologin/${payload}`, { retry: 5, method: 'POST' })
        .then((data) => {
          this.rememberProfileSuccessData = data
        })
        .catch((e) => {
          try {
            JSON.parse(e.data)
          } catch {
            this.rememberProfileFailureData = e.data
          }
          this.rememberProfileFailureData = JSON.parse(e.data)
        })
        .finally(() => {
          this.profileLoading = false
        })
      return this.rememberProfileSuccessData
    },

    async getWorkSpaces() {
      if ($cookies.get('token')) {
        const { $myFetch } = useNuxtApp()
        await $myFetch('workspaces', { retry: 5 })
          .then((data) => {
            this.workspacesSuccessData = data
            return data
          })
          .catch((e) => {
            try {
              JSON.parse(e.data)
            } catch {
              return e.data
            }
            return JSON.parse(e.data)
          })
      }
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
            JSON.parse(e.data)
          } catch {
            this.editFailureData = e.data
            this.isLoadingSubmit = false
            return
          }
          this.editFailureData = JSON.parse(e.data)
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
              JSON.parse(e.data)
            } catch {
              this.deleteFailureData = e.data
              this.isLoadingSubmit = false
              return
            }
            this.deleteFailureData = JSON.parse(e.data)
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
              JSON.parse(e.data)
            } catch {
              this.deactivateFailureData = e.data
              this.isLoadingSubmit = false
              return
            }
            this.deactivateFailureData = JSON.parse(e.data)
          })
          .finally(() => {
            this.isLoadingSubmit = false
          })
      }
    },
  },
})

export default useProfileStore
