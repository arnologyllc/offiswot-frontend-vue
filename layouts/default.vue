<template>
  <div class="default-layout">
    <Sidebar />
    <div class="default-body">
      <Header />
      <div class="default-layout__pages">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
import cookies from 'js-cookie'
import Header from '@/components/global/default/Header'
import Sidebar from '@/components/global/default/Sidebar'
import auth from '~/middleware/auth'
import firstLogin from '~/middleware/firstLogin'
import login from '~/middleware/login'
await login()
if (!cookies.get('token')) auth()
firstLogin()
</script>

<style lang="scss">
.default-layout {
  width: 100%;
  overflow: hidden;
  background-color: $ov-gray-bg;
  display: flex;

  &__pages {
    padding-top: 8px;
    object-fit: cover;
  }
  .main {
    display: flex;
    position: relative;

    &__form {
      &--title {
        font-size: 20px;
        font-weight: 600;
        color: $ov-text--title;
        margin-bottom: 4px;
      }

      &--subtitle {
        font-size: 14px;
        color: $ov-text--subtitle;
        margin-bottom: 40px;
      }

      &--box {
        &__input {
          height: 48px;
          .el-input__inner {
            height: 48px;
            border-radius: 6px;
            border-color: $ov-border--light;

            &:focus,
            &:hover {
              border-color: $ov-primary;
            }

            &::placeholder {
              color: $ov-placeholder;
            }
          }

          .el-input__prefix,
          .el-input__suffix {
            display: grid;
            align-items: center;
            position: absolute;
          }

          .el-input__prefix {
            width: 48px;
            left: 8px;
          }
          .el-input__suffix {
            cursor: pointer;
            right: 0;
            .el-input__suffix-inner {
              display: flex;
            }
          }
        }
      }
    }
  }
  .go-back {
    position: absolute;
    bottom: 100px;
    .el-button span {
      display: flex;
      align-items: center;
      gap: 12.5px;
    }
    &__text {
      color: $ov-primary--light;
      transition: 0.2s;
      font-size: 17px;
      font-weight: 500;
      &:hover {
        color: $ov-primary;
      }
    }
    &__icon {
      width: 9.5px;
    }
  }
}
.default-body {
  width: 100%;
}
</style>
