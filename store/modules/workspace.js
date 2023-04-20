const state = () => ({
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
})

const getters = {
  isLoadingSubmit: (state) => state.isLoadingSubmit,
  isLoadingIndustries: (state) => state.isLoadingIndustries,

  industriesList: (state) => state.industriesList,
  industriesError: (state) => state.industriesError,

  createWorkspaceSuccess: (state) => state.createWorkspaceSuccess,
  createWorkspaceError: (state) => state.createWorkspaceError,

  getMembersSuccess: (state) => state.getMembersSuccess,
  getMembersError: (state) => state.getMembersError,

  getSeatsSuccess: (state) => state.getSeatsSuccess,
  getSeatsError: (state) => state.getSeatsError,

  setSeatsSuccess: (state) => state.setSeatsSuccess,
  setSeatsError: (state) => state.setSeatsError,
}

const mutations = {
  GET_INDUSTRIES_PROCESS: (state, data) => {
    state.isLoadingIndustries = data
  },
  GET_INDUSTRIES_SUCCESS: (state, data) => {
    state.industriesList = data
    state.isLoadingIndustries = false
  },
  GET_INDUSTRIES_FAILURE: (state, data) => {
    state.industriesError = null
    state.industriesError = data
    state.isLoadingIndustries = false
  },

  CREATE_WORKSPACE_PROCESS: (state, data) => {
    state.isLoadingSubmit = data
  },
  CREATE_WORKSPACE_SUCCESS: (state, data) => {
    state.createWorkspaceSuccess = data
    state.isLoadingSubmit = false
  },
  CREATE_WORKSPACE_FAILURE: (state, data) => {
    state.createWorkspaceError = data
    state.isLoadingSubmit = false
  },

  GET_MEMBERS_PROCESS: (state, data) => {
    state.isLoadingSubmit = data
  },
  GET_MEMBERS_SUCCESS: (state, data) => {
    state.getMembersSuccess = data
    state.isLoadingSubmit = false
  },
  GET_MEMBERS_FAILURE: (state, data) => {
    state.getMembersError = data
    state.isLoadingSubmit = false
  },

  GET_SEATS_PROCESS: (state, data) => {
    state.isLoadingSubmit = data
  },
  GET_SEATS_SUCCESS: (state, data) => {
    state.getSeatsSuccess = data
    state.isLoadingSubmit = false
  },
  GET_SEATS_FAILURE: (state, data) => {
    state.getSeatsError = data
    state.isLoadingSubmit = false
  },

  SET_SEATS_PROCESS: (state, data) => {
    state.isLoadingSubmit = data
  },
  SET_SEATS_SUCCESS: (state, data) => {
    state.setSeatsSuccess = data
    state.isLoadingSubmit = false
  },
  SET_SEATS_FAILURE: (state, data) => {
    state.setSeatsError = data
    state.isLoadingSubmit = false
  },
}

const actions = {
  getIndustries({ commit }) {
    commit('GET_INDUSTRIES_PROCESS', true)
    this.$api
      .get('industry')
      .then(({ data }) => {
        commit('GET_INDUSTRIES_SUCCESS', data)
        return data
      })
      .catch((e) => {
        commit('GET_INDUSTRIES_FAILURE', e.response.data)
      })
  },

  createWorkspace({ commit }, payload) {
    commit('CREATE_WORKSPACE_PROCESS', true)
    this.$api
      .post('workspace/create', payload)
      .then(({ data }) => {
        commit('CREATE_WORKSPACE_SUCCESS', data)
      })
      .catch((e) => {
        try {
          JSON.parse(e.response.data)
        } catch {
          commit('CREATE_WORKSPACE_FAILURE', e.response.data)
          return
        }
        commit('CREATE_WORKSPACE_FAILURE', JSON.parse(e.response.data))
      })
  },

  getMembers({ commit }, id) {
    commit('GET_MEMBERS_PROCESS', true)
    this.$api
      .get(`/workspace/${id}/members`)
      .then(({ data }) => {
        commit('GET_MEMBERS_SUCCESS', data)
      })
      .catch((e) => {
        try {
          JSON.parse(e.response.data)
        } catch {
          commit('GET_MEMBERS_FAILURE', e.response.data)
          return
        }
        commit('GET_MEMBERS_FAILURE', JSON.parse(e.response.data))
      })
      .finally(() => {
        commit('GET_MEMBERS_PROCESS', false)
      })
  },

  getSeats({ commit }, id) {
    commit('GET_SEATS_PROCESS', true)
    this.$api
      .get(`workspace/seats/${id}`)
      .then(({ data }) => {
        commit('GET_SEATS_SUCCESS', data)
      })
      .catch((e) => {
        try {
          JSON.parse(e.response.data)
        } catch {
          commit('GET_SEATS_FAILURE', e.response.data)
          return
        }
        commit('GET_SEATS_FAILURE', JSON.parse(e.response.data))
      })
      .finally(() => {
        commit('GET_SEATS_PROCESS', false)
      })
  },

  setSeats({ commit }, payload) {
    commit('SET_SEATS_PROCESS', true)
    this.$api
      .post(`workspace/seats/${payload.id}`, payload.seats)
      .then(({ data }) => {
        commit('SET_SEATS_SUCCESS', data)
      })
      .catch((e) => {
        try {
          JSON.parse(e.response.data)
        } catch {
          commit('SET_SEATS_FAILURE', e.response.data)
          return
        }
        commit('SET_SEATS_FAILURE', JSON.parse(e.response.data))
      })
      .finally(() => {
        commit('SET_SEATS_PROCESS', false)
      })
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
