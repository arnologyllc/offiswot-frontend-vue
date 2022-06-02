<template>
  <div>
    <Nuxt />
  </div>
</template>

<script>
import auth from '@/middleware/auth'
export default {
  name: 'DefaultLayout',
  middleware: [auth]
}
</script>

<style scoped lang="scss">
</style>