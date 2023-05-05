<template>
  <nav class="main">
    <div class="main__left">
      <img
        src="@/assets/images/icons/logo.svg"
        alt=""
        class="main__left--logo"
      />
      <div class="main__left--title">
        <span class="main__left--titleStart">ffi</span>
        <span class="main__left--titleEnd">swot</span>
      </div>
    </div>
    <div class="main__right">
      <el-button plain class="main__right--button" @click="onRightButtonClick">
        {{ buttonText }}
      </el-button>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'

const route = useRoute()

const buttonText = computed(() =>
  route.path === '/login' ? 'Sign up' : 'Sign in'
)

const onRightButtonClick = () => {
  route.path === '/login' ? navigateTo('/register') : navigateTo('/login')
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
    align-items: flex-end;
    gap: 5px;
    &--title {
      display: flex;
    }
    &--titleStart {
      font-size: 25px;
      color: #4156f6;
    }
    &--titleEnd {
      font-size: 25px;
      color: #1ac1c9;
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
@media (max-width: 450px) {
  .main {
    padding: 0 24px;

    &__left img {
      width: 48px;
      height: 48px;
    }
  }
}
</style>
