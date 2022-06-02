<template>
  <div>
    <div v-loading.fullscreen.lock="profileLoading">
      <pre>{{ profileSuccessData }}</pre>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'ProfilePage',
  computed: {
    ...mapGetters('profile', [
      'profileLoading',
      'profileSuccessData',
      'profileFailureData',
    ]),
  },
  watch: {
    profileFailureData(v) {
      for (const i in v) {
        if (typeof v[i] !== 'string') {
          for (const j in v[i]) {
            this.$notify.error({
              title: 'Error',
              dangerouslyUseHTMLString: true,
              message: `${i}: ${v[i][j]}`,
            })
          }
        } else {
          this.$notify.error({
            title: 'Error',
            message: v[i],
          })
        }
      }
    },
  },
  created() {
    this.getUserProfile()
  },
  methods: {
    getUserProfile() {
      this.$store.dispatch('profile/getProfile')
    },
  },
}
</script>

<style scoped lang="scss">
</style>