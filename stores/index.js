import { createPinia } from 'pinia'

import auth from './auth'
import profile from './profile'
import workspace from './workspace'
import pin from './pin'

const pinia = createPinia()

pinia.install('auth', auth)
pinia.install('profile', profile)
pinia.install('workspace', workspace)
pinia.install('pin', pin)

export default pinia
