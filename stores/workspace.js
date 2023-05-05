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

      getSeatsSuccess: null,
      getSeatsError: null,

      setSeatsSuccess: null,
      setSeatsError: null,
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
            JSON.parse(e.response.data)
          } catch {
            this.industriesError = e.response.data
          }
          this.industriesError = JSON.parse(e.response.data)
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

    getMembers(id) {
      const { $myFetch } = useNuxtApp()
      this.isLoadingIndustries = true
      $myFetch(`/workspace/${id}/members`)
        .then((data) => {
          this.getMembersSuccess = data
        })
        .catch((e) => {
          try {
            JSON.parse(e.response.data)
          } catch {
            this.getMembersError = e.response.data
          }
          this.getMembersError = JSON.parse(e.response.data)
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
            JSON.parse(e.response.data)
          } catch {
            this.getSeatsError = e.response.data
          }
          this.getSeatsError = JSON.parse(e.response.data)
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
            JSON.parse(e.response.data)
          } catch {
            this.setSeatsError = e.response.data
          }
          this.setSeatsError = JSON.parse(e.response.data)
        })
        .finally(() => {
          this.isLoadingSubmit = false
        })
    },
  },
})

export default useWorkspaceStore
