<template>
  <div class="default-layout">
    <Header />
    <div class="default-layout__pages">
      <Nuxt />
    </div>
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
.default-layout {
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  background-color: $ov-gray-bg;
  &__pages {
    padding-top: 80px;
  }
}
</style>