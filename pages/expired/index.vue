<template>
  <div class="main">
    <img src="@/assets/images/expired/massage.svg" alt="" />
    <div class="main__container">
      <span class="main__text">Go to</span>
      <el-button plain class="main__button" @click="$router.push('/login')">
        HOME PAGE
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExpiredPage',
  layout: 'auth',
}
</script>

<style scoped lang="scss">
.main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 34px;
  margin-top: 200px;
  margin-bottom: 130px;
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
    ::v-deep span {
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
