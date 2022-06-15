const state = () => ({
  registerSuccessData: null,
  registerFailureData: null,
  resendSuccessData: null,
  resendFailureData: null,
  loginSuccessData: null,
  loginErrorData: null,
  forgotSuccessData: null,
  forgotErrorData: null,
  resetSuccessData: null,
  resetErrorData: null,
  registerLoading: false,
  loginLoading: false,
  forgotLoading: false,
  resetLoading: false,
})

const getters = {
  registerSuccessData: (state) => state.registerSuccessData,
  registerFailureData: (state) => state.registerFailureData,
  registerLoading: (state) => state.registerLoading,
  resendSuccessData: (state) => state.resendSuccessData,
  resendFailureData: (state) => state.resendFailureData,
  loginSuccessData: (state) => state.loginSuccessData,
  loginErrorData: (state) => state.loginErrorData,
  loginLoading: (state) => state.loginLoading,
  forgotLoading: (state) => state.forgotLoading,
  forgotSuccessData: (state) => state.forgotSuccessData,
  forgotErrorData: (state) => state.forgotErrorData,
  resetLoading: (state) => state.resetLoading,
  resetSuccessData: (state) => state.resetSuccessData,
  resetErrorData: (state) => state.resetErrorData,
}

const mutations = {
  REGISTER_SUCCESS: (state, data) => {
    state.registerSuccessData = data
  },
  REGISTER_FAILURE: (state, data) => {
    state.registerFailureData = null
    state.registerFailureData = data
  },
  REGISTER_PROCESS: (state, data) => {
    state.registerLoading = data
  },
  RESEND_SUCCESS: (state, data) => {
    state.resendSuccessData = data
  },
  RESEND_FAILURE: (state, data) => {
    state.resendFailureData = null
    state.resendFailureData = data
  },
  LOGIN_PROCESS: (state, data) => {
    state.loginLoading = data
  },
  LOGIN_SUCCESS: (state, data) => {
    state.loginSuccessData = data
  },
  LOGIN_FAILURE: (state, data) => {
    state.loginErrorData = null
    state.loginErrorData = data
  },
  FORGOT_PROCESS: (state, data) => {
    state.forgotLoading = data
  },
  FORGOT_SUCCESS: (state, data) => {
    state.forgotSuccessData = data
  },
  FORGOT_FAILURE: (state, data) => {
    state.forgotErrorData = data
  },
  RESET_PROCESS: (state, data) => {
    state.resetLoading = data
  },
  RESET_SUCCESS: (state, data) => {
    state.resetSuccessData = data
  },
  RESET_FAILURE: (state, data) => {
    state.resetErrorData = null
    state.resetErrorData = data
  },
}

const actions = {
  registerUser({ commit }, payload) {
    commit('REGISTER_PROCESS', true)
    const formData = new FormData()
    for (const i in payload) {
      formData.append(i, payload[i])
    }
    formData.append('pin', 123456)
    this.$api
      .$post('register', formData)
      .then((data) => {
        commit('REGISTER_SUCCESS', data.user)
      })
      .catch((e) => {
        try {
          JSON.parse(e.response.data)
        } catch {
          commit('REGISTER_FAILURE', e.response.data)
          commit('REGISTER_PROCESS', false)
          return
        }
        commit('REGISTER_FAILURE', JSON.parse(e.response.data))
      })
      .finally(() => {
        commit('REGISTER_PROCESS', false)
      })
  },
  resendEmail({ commit }, email) {
    const formData = new FormData()
    formData.append('email', email)
    this.$api
      .$post('email/resend', formData)
      .then((data) => {
        commit('RESEND_SUCCESS', data)
      })
      .catch((e) => {
        commit('RESEND_FAILURE', e.response)
      })
  },
  loginUser({ commit }, payload) {
    commit('LOGIN_PROCESS', true)
    this.$api
      .$post('login', payload)
      .then((data) => {
        commit('LOGIN_SUCCESS', data)
      })
      .catch((e) => {
        try {
          JSON.parse(e.response.data)
        } catch {
          commit('LOGIN_FAILURE', e.response.data)
          commit('LOGIN_PROCESS', false)
          return
        }
        commit('LOGIN_FAILURE', JSON.parse(e.response.data))
      })
      .finally(() => {
        commit('LOGIN_PROCESS', false)
      })
  },
  forgotPassword({ commit }, payload) {
    const formData = new FormData()
    formData.append('email', payload.email)
    commit('FORGOT_PROCESS', true)
    this.$api
      .$post('/reset-password', formData)
      .then((data) => {
        commit('FORGOT_SUCCESS', data)
      })
      .catch((e) => {
        try {
          JSON.parse(e.response.data)
        } catch {
          commit('FORGOT_FAILURE', e.response.data)
          commit('FORGOT_FAILURE', false)
          return
        }
        commit('FORGOT_FAILURE', JSON.parse(e.response.data))
      })
      .finally(() => {
        commit('FORGOT_PROCESS', false)
      })
  },
  resetPassword({ commit }, payload) {
    const formData = new FormData()
    for (const i in payload) {
      formData.append(i, payload[i])
    }
    commit('RESET_PROCESS', true)
    this.$api
      .$post('/change-password', formData)
      .then((data) => {
        commit('RESET_SUCCESS', data)
      })
      .catch((e) => {
        try {
          JSON.parse(e.response.data)
        } catch {
          commit('RESET_FAILURE', e.response.data)
          commit('RESET_PROCESS', false)
          return
        }
        commit('RESET_FAILURE', JSON.parse(e.response.data))
      })
      .finally(() => {
        commit('RESET_PROCESS', false)
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
