<template>
  <div class="default-layout">
    <Header />
    <div class="default-layout__pages">
      <slot />
    </div>
    <Footer v-if="!$route.path.includes('workspace')" />
  </div>
</template>

<script setup>
import Header from '@/components/global/default/Header'
import Footer from '@/components/global/Footer'
import auth from '~/middleware/auth'
import firstLogin from '~/middleware/firstLogin'
import cookies from 'js-cookie'
if (!cookies.get('token')) auth()
firstLogin()
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
