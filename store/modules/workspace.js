const state = {
    isLoadingIndustries: false,
    isLoadingSubmit: false,
    industriesList: {
        industries: []
    },
    industriesError: null,
    createWorkspaceSuccess: null,
    createWorkspaceError: null,
}

const getters = {
    isLoadingIndustries: (state) => state.isLoadingIndustries,
    industriesList: (state) => state.industriesList,
    industriesError: (state) => state.industriesError,
    isLoadingSubmit: (state) => state.isLoadingSubmit,
    createWorkspaceSuccess: (state) => state.createWorkspaceSuccess,
    createWorkspaceError: (state) => state.createWorkspaceError
}

const mutations = {
    GET_INDUSTRIES_PROCESS: (state, data) => {
        state.isLoadingIndustries = data
    },
    GET_INDUSTRIES_SUCCESS: (state, data) => {
        state.industriesList = data
        state.isLoadingIndustries = false;
    },
    GET_INDUSTRIES_FAILURE: (state, data) => {
        state.industriesError = null;
        state.industriesError = data;
        state.isLoadingIndustries = false;
    },
    CREATE_WORKSPACE_PROCESS: (state, data) => {
        state.isLoadingSubmit = data;
    },
    CREATE_WORKSPACE_SUCCESS: (state, data) => {
        state.createWorkspaceSuccess = data;
        state.isLoadingSubmit = false;
    },
    CREATE_WORKSPACE_FAILURE: (state, data) => {
        state.createWorkspaceError = data
        state.isLoadingSubmit = false;
    }
}

const actions = {
    getIndustries({ commit }) {
        commit("GET_INDUSTRIES_PROCESS", true)
        this.$api.get('industry').then(({ data }) => {
            commit("GET_INDUSTRIES_SUCCESS", data)
            return data
        }).catch(e => {
            commit("GET_INDUSTRIES_FAILURE", e.response.data)
        })
    },
    createWorkspace({ commit }, payload) {
        commit("CREATE_WORKSPACE_PROCESS", true)
        this.$api.post('workspace/create', payload).then(({ data }) => {
            commit("CREATE_WORKSPACE_SUCCESS", data)
        }).catch((e) => {
            try {
                JSON.parse(e.response.data)
            } catch {
                commit("CREATE_WORKSPACE_FAILURE", e.response.data)
                return;
            }
            commit("CREATE_WORKSPACE_FAILURE", JSON.parse(e.response.data))
        })
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}