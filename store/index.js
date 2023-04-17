import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import VueCookies from 'vue-cookies'

import auth from './modules/auth'
import profile from './modules/profile'
import workspace from './modules/workspace'
import pin from './modules/pin'

Vue.use(Vuex)
Vue.use(VueCookies)

const createStore = () => {
  return new Store({
    modules: {
      auth,
      profile,
      workspace,
      pin,
    },
  })
}
export default createStore
