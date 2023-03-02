import Vue from 'vue'
import Vuex, { Store } from 'vuex'

import auth from './modules/auth'
import profile from './modules/profile'
import workspace from './modules/workspace'

Vue.use(Vuex)

const createStore = () => {
  return new Store({
    modules: {
      auth,
      profile,
      workspace,
    },
  })
}
export default createStore
