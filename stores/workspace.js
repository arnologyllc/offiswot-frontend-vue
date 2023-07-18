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

      inviteAcceptSuccess: null,
      inviteAcceptError: null,

      inviteDeclineSuccess: null,
      inviteDeclineError: null,

      revokeInviteSuccess: null,
      revokeInviteError: null,

      deleteInviteSuccess: null,
      deleteInviteError: null,
    }
  },
  actions: {
    getIndustries() {
      const { $myFetch } = useNuxtApp()
      this.isLoadingIndustries = true
      $myFetch('industry', { retry: 5 })
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

    getUsersList(id, query) {
      const { $myFetch } = useNuxtApp()
      this.isLoadingIndustries = true
      $myFetch(`/workspace/${id}/emails-list?s=${query}`, {
        method: 'GET',
        retry: 5,
      })
        .then((data) => {
          this.getUsersListSuccess = data
          return data
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
      $myFetch(`/workspace/${id}/members`, { retry: 5 })
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
      $myFetch(`workspace/seats/${id}`, { retry: 5 })
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

    setSeats(payload, workspaceID) {
      const { $myFetch } = useNuxtApp()
      this.isLoadingSubmit = true
      $myFetch(`workspace/seats/${workspaceID}`, {
        method: 'post',
        body: payload,
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

    acceptInvite(payload) {
      const { $myFetch } = useNuxtApp()
      this.isLoadingSubmit = true
      $myFetch(`/invite/accept`, {
        method: 'post',
        body: payload,
      })
        .then((data) => {
          this.inviteAcceptSuccess = data
        })
        .catch((e) => {
          try {
            JSON.parse(e.data)
          } catch {
            this.inviteAcceptError = e.data
          }
          this.inviteAcceptError = JSON.parse(e.data)
        })
        .finally(() => {
          this.isLoadingSubmit = false
        })
    },

    declineInvite(payload) {
      const { $myFetch } = useNuxtApp()
      this.isLoadingSubmit = true
      $myFetch(`/invite/decline`, {
        method: 'post',
        body: payload,
      })
        .then((data) => {
          this.inviteDeclineSuccess = data
        })
        .catch((e) => {
          try {
            JSON.parse(e.data)
          } catch {
            this.inviteDeclineError = e.data
          }
          this.inviteDeclineError = JSON.parse(e.data)
        })
        .finally(() => {
          this.isLoadingSubmit = false
        })
    },

    deleteInvite(payload) {
      const { $myFetch } = useNuxtApp()
      this.isLoadingSubmit = true
      $myFetch(`/invite/${payload.id}`, {
        method: 'delete',
      })
        .then((data) => {
          this.deleteInviteSuccess = data
        })
        .catch((e) => {
          try {
            JSON.parse(e.data)
          } catch {
            this.deleteInviteError = e.data
          }
          this.deleteInviteError = JSON.parse(e.data)
        })
        .finally(() => {
          this.isLoadingSubmit = false
        })
    },

    revokeInvite(payload) {
      const { $myFetch } = useNuxtApp()
      this.isLoadingSubmit = true
      $myFetch(`/invite/revoke/${payload.id}`, {
        method: 'post',
      })
        .then((data) => {
          this.revokeInviteSuccess = data
        })
        .catch((e) => {
          try {
            JSON.parse(e.data)
          } catch {
            this.revokeInviteError = e.data
          }
          this.revokeInviteError = JSON.parse(e.data)
        })
        .finally(() => {
          this.isLoadingSubmit = false
        })
    },
  },
})

export default useWorkspaceStore
