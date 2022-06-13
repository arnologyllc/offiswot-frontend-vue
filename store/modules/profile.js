const state = {
    profileSuccessData: null,
    profileFailureData: null,
    profileLoading: false,
  }
  
  const getters = {
    profileSuccessData: (state) => state.profileSuccessData,
    profileFailureData: (state) => state.profileFailureData,
    profileLoading: (state) => state.profileLoading,
  }
  
  const mutations = {
    GET_PROFILE_SUCCESS: (state, data) => {
      state.profileSuccessData = data
    },
    GET_PROFILE_FAILURE: (state, data) => {
      state.profileFailureData = data
    },
    GET_PROFILE_PROCESS: (state, data) => {
      state.profileLoading = data
    },
  }
  
  const actions = {
    getProfile({ commit }) {
      commit('GET_PROFILE_PROCESS', true)
      this.$api
        .$get('user-profile')
        .then((data) => {
          commit('GET_PROFILE_SUCCESS', data)
        })
        .catch((e) => {
          commit('GET_PROFILE_FAILURE', JSON.parse(e.response.data))
        })
        .finally(() => {
          commit('GET_PROFILE_PROCESS', false)
        })
    },
    async getWorkSpaces() {
      const res = await this.$api.get('workspaces')
      return res.status === 200 ? res.data : JSON.parse(res.response.data);
    }
  }
  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
  }
  