<template>
  <nav class="main">
    <div class="main__left">
      <img src="@/assets/images/ov-logo.svg" alt="" />
      <span class="main__left--title">Online Office</span>
    </div>
    <div class="main__right">
      <el-button
        plain
        class="main__right--button"
        @click="onRightButtonClick"
        >
        {{ buttonText }}
        </el-button
      >
    </div>
  </nav>
</template>

<script>
export default {
  name: 'HeaderComponent',
  computed: {
    buttonText() {
      return this.$route.path === '/login' ? 'Sign up' : 'Sign in'
    },
  },
  methods: {
    onRightButtonClick() {
      this.$route.path === '/login'
        ? this.$router.push('/register')
        : this.$router.push('/login')
    },
  },
}
</script>

<style scoped lang="scss">
.main {
  width: 100%;
  height: 80px;
  padding: 0 96px;
  align-items: center;
  background: white;
  display: flex;
  justify-content: space-between;
  position: fixed;
  z-index: 9999;

  &__left {
    display: flex;
    align-items: center;
    gap: 0 13px;

    &--title {
      font-size: 16px;
    }
  }
  &__right {
    &--button {
      color: #0d1c2e;
      border-width: 2px;
      border-color: $ov-primary--light;
      transition: 0.2s;
      width: 106px;
      height: 40px;
      padding: 10px 20px;
      border-radius: 6px;
      font-weight: normal;

      &:hover,
      &:focus {
        border-color: $ov-primary;
        color: $ov-primary;
      }
    }
  }
}

@media (max-width: 990px) {
  .main {
    padding: 0 50px;
  }
}
@media (max-width: 425px) {
  .main {
    padding: 0 24px;

    &__left img {
      width: 48px;
      height: 48px;
    }
  }
}
</style>
