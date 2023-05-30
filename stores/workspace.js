import { defineStore } from 'pinia'

const useWorkspaceStore = defineStore('workspace', {
  state: () => {
    return {
      isLoadingIndustries: false,
      isLoadingSubmit: false,

      industriesList: {
        industries: [],
      },
      industriesError: null,

      createWorkspaceSuccess: null,
      createWorkspaceError: null,

      getMembersSuccess: null,
      getMembersError: null,

      getUsersListSuccess: null,
      getUsersListError: null,

      getSeatsSuccess: null,
      getSeatsError: null,

      setSeatsSuccess: null,
      setSeatsError: null,

      inviteUsersSuccess: null,
      inviteUsersError: null,
    }
  },
  actions: {
    getIndustries() {
      const { $myFetch } = useNuxtApp()
      this.isLoadingIndustries = true
      $myFetch('industry')
        .then((data) => {
          this.industriesList = data
        })
        .catch((e) => {
          try {
            JSON.parse(e.data)
          } catch {
            this.industriesError = e.data
          }
          this.industriesError = JSON.parse(e.data)
        })
        .finally(() => {
          this.isLoadingIndustries = false
        })
    },

    createWorkspace(payload) {
      const { $myFetch } = useNuxtApp()
      this.isLoadingSubmit = true
      $myFetch('workspace/create', {
        method: 'post',
        body: payload,
      })
        .then((data) => {
          this.createWorkspaceSuccess = data
        })
        .catch((e) => {
          try {
            JSON.parse(e.data)
          } catch {
            this.createWorkspaceError = e.data.error
            return
          }
          this.createWorkspaceError = JSON.parse(e.data)
        })
        .finally(() => {
          this.isLoadingSubmit = false
        })
    },

    getUsersList(id) {
      const { $myFetch } = useNuxtApp()
      this.isLoadingIndustries = true
      $myFetch(`/workspace/${id}/emails-list`)
        .then((data) => {
          this.getUsersListSuccess = data
        })
        .catch((e) => {
          try {
            JSON.parse(e.data)
          } catch {
            this.getUsersListError = e.data
          }
          this.getUsersListError = JSON.parse(e.data)
        })
        .finally(() => {
          this.isLoadingIndustries = false
        })
    },

    getMembers(id) {
      const { $myFetch } = useNuxtApp()
      this.isLoadingIndustries = true
      $myFetch(`/workspace/${id}/members`)
        .then((data) => {
          this.getMembersSuccess = data
        })
        .catch((e) => {
          try {
            JSON.parse(e.data)
          } catch {
            this.getMembersError = e.data
          }
          this.getMembersError = JSON.parse(e.data)
        })
        .finally(() => {
          this.isLoadingIndustries = false
        })
    },

    getSeats(id) {
      const { $myFetch } = useNuxtApp()
      this.isLoadingIndustries = true
      $myFetch(`workspace/seats/${id}`)
        .then((data) => {
          this.getSeatsSuccess = data
        })
        .catch((e) => {
          try {
            JSON.parse(e.data)
          } catch {
            this.getSeatsError = e.data
          }
          this.getSeatsError = JSON.parse(e.data)
        })
        .finally(() => {
          this.isLoadingIndustries = false
        })
    },

    setSeats(payload) {
      const { $myFetch } = useNuxtApp()
      this.isLoadingSubmit = true
      $myFetch(`workspace/seats/${payload.id}`, {
        method: 'post',
        body: payload.seats,
      })
        .then((data) => {
          this.setSeatsSuccess = data
        })
        .catch((e) => {
          try {
            JSON.parse(e.data)
          } catch {
            this.setSeatsError = e.data
          }
          this.setSeatsError = JSON.parse(e.data)
        })
        .finally(() => {
          this.isLoadingSubmit = false
        })
    },

    inviteUsers(payload) {
      console.log(payload)
      const { $myFetch } = useNuxtApp()
      this.isLoadingSubmit = true
      $myFetch(`/invite`, {
        method: 'post',
        body: payload,
      })
        .then((data) => {
          this.inviteUsersSuccess = data
        })
        .catch((e) => {
          try {
            JSON.parse(e.data)
          } catch {
            this.inviteUsersError = e.data
          }
          this.inviteUsersError = JSON.parse(e.data)
        })
        .finally(() => {
          this.isLoadingSubmit = false
        })
    },
  },
})

export default useWorkspaceStore
