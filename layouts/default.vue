<template>
  <div>
    <Header />
      <Nuxt />
    <Footer />
  </div>
</template>

<script>
import auth from '@/middleware/auth'
import Header from '@/components/global/Header.vue'
import Footer from '@/components/global/Footer.vue'
export default {
  name: 'DefaultLayout',
  components: {
    Header,
    Footer,
  },
  middleware: [auth],
}
</script>

<style scoped lang="scss">
</style>