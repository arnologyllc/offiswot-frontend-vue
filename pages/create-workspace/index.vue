<template>
  <Nuxt />
</template>

<script>
export default {
  name: 'CreateWorkspace',
  created() {
    this.$router.push('/create-workspace/step1')
  }
}
</script>

<style scoped lang="scss">
</style>