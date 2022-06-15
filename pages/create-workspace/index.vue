<template>
  <Nuxt />
</template>

<script>
export default {
  name: 'CreateWorkspace',
  head() {
    return {
      title: 'Create Workspace',
    }
  },
  created() {
    this.$router.push('/create-workspace/step1')
  },
}
</script>

<style scoped lang="scss"></style>
