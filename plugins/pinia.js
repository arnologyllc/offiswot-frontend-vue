import useAuthStore from '@/stores/auth'
import useProfileStore from '@/stores/profile'
import useWorkspaceStore from '@/stores/workspace'
import usePinStore from '@/stores/pin'

export default defineNuxtPlugin(({ $pinia }) => {
  return {
    provide: {
      store: [
        useAuthStore($pinia),
        useProfileStore($pinia),
        useWorkspaceStore($pinia),
        usePinStore($pinia),
      ],
    },
  }
})
