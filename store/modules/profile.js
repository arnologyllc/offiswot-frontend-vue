const state = () => ({
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
})

const getters = {
  profileSuccessData: (state) => state.profileSuccessData,
  profileFailureData: (state) => state.profileFailureData,
  profileLoading: (state) => state.profileLoading,

  isLoadingSubmit: (state) => state.isLoadingSubmit,
  editProfileData: (state) => state.editProfileData,
  editFailureData: (state) => state.editFailureData,

  setPinData: (state) => state.setPinData,
  setPinFailureData: (state) => state.setPinFailureData,

  deleteProfileData: (state) => state.deleteProfileData,
  deleteFailureData: (state) => state.deleteFailureData,
}

const mutations = {
  GET_PROFILE_SUCCESS: (state, data) => {
    state.profileSuccessData = data
    localStorage.setItem('timezone', data.settings.server_timezone)
  },
  GET_PROFILE_FAILURE: (state, data) => {
    state.profileFailureData = null
    state.profileFailureData = data
  },
  GET_PROFILE_PROCESS: (state, data) => {
    state.profileLoading = data
  },

  EDIT_PROFILE_PROCESS: (state, data) => {
    state.isLoadingSubmit = data
  },
  EDIT_PROFILE_SUCCESS: (state, data) => {
    state.editProfileData = data
    state.isLoadingSubmit = false
  },
  EDIT_PROFILE_FAILURE: (state, data) => {
    state.editFailureData = null
    state.editFailureData = data
    state.isLoadingSubmit = false
  },

  SET_PIN_PROCESS: (state, data) => {
    state.isLoadingSubmit = data
  },
  SET_PIN_SUCCESS: (state, data) => {
    state.setPinData = data
    state.isLoadingSubmit = false
  },
  SET_PIN_FAILURE: (state, data) => {
    state.setPinFailureData = null
    state.setPinFailureData = data
    state.isLoadingSubmit = false
  },

  DELETE_PROFILE_SUCCESS: (state, data) => {
    state.deleteProfileData = data
  },
  DELETE_PROFILE_FAILURE: (state, data) => {
    state.deleteFailureData = null
    state.deleteFailureData = data
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
        try {
          JSON.parse(e.response.data)
        } catch {
          commit('GET_PROFILE_FAILURE', e.response.data)
          commit('GET_PROFILE_PROCESS', false)
          return
        }
        commit('GET_PROFILE_FAILURE', JSON.parse(e.response.data))
      })
      .finally(() => {
        commit('GET_PROFILE_PROCESS', false)
      })
  },
  async getWorkSpaces() {
    const res = await this.$api.get('workspaces')
    return res.status === 200 ? res.data : JSON.parse(res.response.data)
  },
  editProfile({ commit }, payload) {
    if (payload.phone_number) {
      payload.phone_number = payload.phone_number
        .toString()
        .replaceAll('(', '')
        .replaceAll(')', '')
        .replaceAll(' ', '')
        .replaceAll('-', '')
    }
    commit('EDIT_PROFILE_PROCESS', true)
    const formData = new FormData()
    if (typeof payload.avatar === 'string') {
      delete payload.avatar
    }
    if (typeof payload.cv === 'string') {
      delete payload.cv
    }
    for (const i in payload) {
      if (payload[i] === null) {
        formData.append(i, '')
      } else {
        formData.append(i, payload[i])
      }
    }
    this.$api
      .post('update-profile', formData)
      .then(({ data }) => {
        commit('EDIT_PROFILE_SUCCESS', data)
      })
      .catch((e) => {
        try {
          JSON.parse(e.response.data)
        } catch {
          commit('EDIT_PROFILE_FAILURE', e.response.data)
          return
        }
        commit('EDIT_PROFILE_FAILURE', JSON.parse(e.response.data))
      })
  },

  setPin({ commit }, payload) {
    commit('SET_PIN_PROCESS', true)
    const formData = new FormData()
    for (const i in payload) {
      formData.append(i, String(payload[i]))
    }
    this.$api
      .post('create-pin', formData)
      .then(({ data }) => {
        commit('SET_PIN_SUCCESS', data)
      })
      .catch((e) => {
        try {
          JSON.parse(e.response.data)
        } catch {
          commit('SET_PIN_FAILURE', e.response.data)
          return
        }
        commit('SET_PIN_FAILURE', JSON.parse(e.response.data))
      })
  },

  deleteProfile({ commit }, payload) {
    if (payload.pin) {
      this.$api
        .delete('delete-profile', { data: payload })
        .then(({ data }) => {
          commit('DELETE_PROFILE_SUCCESS', data)
        })
        .catch((e) => {
          try {
            JSON.parse(e.response.data)
          } catch {
            commit('DELETE_PROFILE_FAILURE', e.response.data)
            return
          }
          commit('DELETE_PROFILE_FAILURE', JSON.parse(e.response.data))
        })
    }
  },
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
