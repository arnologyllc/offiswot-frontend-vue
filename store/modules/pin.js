const state = () => ({
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
})

const getters = {
  isLoadingSubmit: (state) => state.isLoadingSubmit,

  setPinData: (state) => state.setPinData,
  setPinFailureData: (state) => state.setPinFailureData,

  resetPinData: (state) => state.resetPinData,
  resetPinFailureData: (state) => state.resetPinFailureData,

  forgotPinData: (state) => state.forgotPinData,
  forgotPinFailureData: (state) => state.forgotPinFailureData,

  changePinData: (state) => state.changePinData,
  changePinFailureData: (state) => state.changePinFailureData,

  checkPinData: (state) => state.checkPinData,
  checkPinFailureData: (state) => state.checkPinFailureData,
}

const mutations = {
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

  RESET_PIN_PROCESS: (state, data) => {
    state.isLoadingSubmit = data
  },
  RESET_PIN_SUCCESS: (state, data) => {
    state.resetPinData = data
    state.isLoadingSubmit = false
  },
  RESET_PIN_FAILURE: (state, data) => {
    state.resetPinFailureData = null
    state.resetPinFailureData = data
    state.isLoadingSubmit = false
  },

  FORGOT_PIN_PROCESS: (state, data) => {
    state.isLoadingSubmit = data
  },
  FORGOT_PIN_SUCCESS: (state, data) => {
    state.forgotPinData = data
    state.isLoadingSubmit = false
  },
  FORGOT_PIN_FAILURE: (state, data) => {
    state.forgotPinFailureData = null
    state.forgotPinFailureData = data
    state.isLoadingSubmit = false
  },

  CHANGE_PIN_PROCESS: (state, data) => {
    state.isLoadingSubmit = data
  },
  CHANGE_PIN_SUCCESS: (state, data) => {
    state.changePinData = data
    state.isLoadingSubmit = false
  },
  CHANGE_PIN_FAILURE: (state, data) => {
    state.changePinFailureData = null
    state.changePinFailureData = data
    state.isLoadingSubmit = false
  },

  CHECK_PIN_PROCESS: (state, data) => {
    state.isLoadingSubmit = data
  },
  CHECK_PIN_SUCCESS: (state, data) => {
    state.checkPinData = data
    state.isLoadingSubmit = false
  },
  CHECK_PIN_FAILURE: (state, data) => {
    state.checkPinFailureData = null
    state.checkPinFailureData = data
    state.isLoadingSubmit = false
  },
}

const actions = {
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

  resetPin({ commit }, payload) {
    commit('RESET_PIN_PROCESS', true)
    const formData = new FormData()
    for (const i in payload) {
      formData.append(i, String(payload[i]))
    }
    this.$api
      .post('reset-pin', formData)
      .then(({ data }) => {
        commit('RESET_PIN_SUCCESS', data)
      })
      .catch((e) => {
        try {
          JSON.parse(e.response.data)
        } catch {
          commit('RESET_PIN_FAILURE', e.response.data)
          return
        }
        commit('RESET_PIN_FAILURE', JSON.parse(e.response.data))
      })
  },

  forgotPin({ commit }) {
    commit('FORGOT_PIN_PROCESS', true)
    this.$api
      .$post('/reset-pin-email')
      .then((data) => {
        commit('FORGOT_PIN_SUCCESS', data)
      })
      .catch((e) => {
        try {
          JSON.parse(e.response.data)
        } catch {
          commit('FORGOT_PIN_FAILURE', e.response.data)
          commit('FORGOT_PIN_PROCESS', false)
          return
        }
        commit('FORGOT_PIN_FAILURE', JSON.parse(e.response.data))
      })
      .finally(() => {
        commit('FORGOT_PIN_PROCESS', false)
      })
  },

  changePin({ commit }, payload) {
    const formData = new FormData()
    for (const i in payload) {
      formData.append(i, payload[i])
    }
    commit('CHANGE_PIN_PROCESS', true)
    this.$api
      .$post('/change-pin', formData)
      .then((data) => {
        commit('CHANGE_PIN_SUCCESS', data)
      })
      .catch((e) => {
        try {
          JSON.parse(e.response.data)
        } catch {
          commit('CHANGE_PIN_FAILURE', e.response.data)
          commit('CHANGE_PIN_PROCESS', false)
          return
        }
        commit('CHANGE_PIN_FAILURE', JSON.parse(e.response.data))
      })
      .finally(() => {
        commit('CHANGE_PIN_PROCESS', false)
      })
  },

  checkPin({ commit }, payload) {
    commit('CHECK_PIN_PROCESS', true)
    this.$api
      .$post('/check-pin', { pin: payload.pin })
      .then((data) => {
        commit('CHECK_PIN_SUCCESS', data)
      })
      .catch((e) => {
        try {
          JSON.parse(e.response.data)
        } catch {
          commit('CHECK_PIN_FAILURE', e.response.data)
          commit('CHECK_PIN_PROCESS', false)
          return
        }
        commit('CHECK_PIN_FAILURE', JSON.parse(e.response.data))
      })
      .finally(() => {
        commit('CHECK_PIN_PROCESS', false)
      })
  },
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
