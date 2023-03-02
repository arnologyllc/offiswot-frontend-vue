<template>
  <div class="container_account">
    <div class="account">
      <div>
        <div class="account__title">My account</div>
        <div class="account__body">
          <el-button class="account__body--block">
            <div>
              <img src="@/assets/images/icons/profile.svg" alt="profile-icon" />
            </div>
            <div class="account__body--block-text">Profile</div>
          </el-button>

          <el-button class="account__body--block">
            <div>
              <img src="@/assets/images/icons/bell.svg" alt="bell-icon" />
            </div>
            <div class="account__body--block-text">Notifications</div>
          </el-button>
          <el-button
            class="account__body--block"
            @click="$router.push('/profile-settings')"
          >
            <div>
              <img src="@/assets/images/icons/lock.svg" alt="lock-icon" />
            </div>
            <div class="account__body--block-text">Security</div>
          </el-button>
          <el-button class="account__body--block">
            <div>
              <img
                src="@/assets/images/icons/credit-card.svg"
                alt="credit-card-icon"
              />
            </div>
            <div class="account__body--block-text">Payments</div>
          </el-button>
          <el-button class="account__body--block">
            <div>
              <img
                src="@/assets/images/icons/menu-profile.svg"
                alt="menu-profile-icon"
              />
            </div>
            <div class="account__body--block-text">Logs</div>
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  layout: 'default',
  head() {
    return {
      title: 'Home',
    }
  },
}
</script>
<style lang="scss">
.container_account {
  width: 100%;
  margin: 0 auto;
}
.account {
  width: 80%;
  margin: 60px auto;
  height: 500px;
  border-left: 1px solid #d0c9d6;

  &__title {
    margin: 0 0 50px 50px;
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 29px;
    color: #0d1c2e;
  }

  &__body {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: left;
    gap: 26px;
    margin-left: 13px;

    &--block {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 10px;
      margin-left: 15px;
      width: 180px;
      cursor: pointer;
      min-width: 180px;
      height: 120px;
      background: #ffffff;
      border: 1px solid #d5d7da;
      border-radius: 12px;
      box-sizing: border-box;
      &-text {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        font-family: 'Montserrat';
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 20px;

        text-align: center;

        color: #6d7075;
      }
    }
  }
}

@media (max-width: 543px) {
  .account {
    height: 790px;
    &__body {
      justify-content: center;
    }
    &__title {
      text-align: center;
    }
  }
}
</style>
