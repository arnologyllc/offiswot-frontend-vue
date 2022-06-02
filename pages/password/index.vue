<template>
  <NuxtChild />
</template>

<script>
export default {
  name: 'PasswordResetParent',
  layout: 'auth',
  created() {
      this.$router.push('/password/forgot')
  }
}
</script>