<template>
  <div class="main">
    <img src="@/assets/images/expired/massage.svg" alt="" />
    <div class="main__container">
      <span class="main__text">Go to</span>
      <el-button plain class="main__button" @click="navigateTo('/login')"> HOME PAGE </el-button>
    </div>
  </div>
</template>

<script>
definePageMeta({ layout: 'auth' })
</script>

<style scoped lang="scss">
.main {
  display: flex;
  width: 100% !important;
  flex-direction: column;
  justify-content: center;
  gap: 34px;
  margin: 280px auto 260px !important;
  align-items: center;
  background: none;
  &__container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;
  }
  &__text {
    font-weight: 400;
    font-size: 16px;
    color: #666;
  }
  &__button {
    background: #4156f6;
    border-radius: 6px;
    color: white;
    text-transform: uppercase;
    text-align: center;
    width: 220px;
    height: 48px;
    padding: 0;
    padding-right: 8px;
    span {
      text-align: center;
      width: 100%;
    }
    &__text {
      width: 100%;
      display: flex;
      font-size: 17px;
      font-weight: 700;
      justify-content: center !important;
    }
  }
}
</style>
