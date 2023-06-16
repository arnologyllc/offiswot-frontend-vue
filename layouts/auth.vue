<template>
  <div class="main-layout-auth__outer">
    <Header />
    <div class="main-layout-auth" :class="checkPage() === '/expired' ? '' : 'main-layout-auth__background'">
      <slot />
      <div v-if="checkPage === '/expired'" class="go-back">
        <el-button @click="$router.go(-1)">
          <img src="@/assets/images/icons/chevron-dark-icon.svg" class="go-back__icon" alt="" />
          <span class="go-back__text">Back</span>
        </el-button>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import Header from '~/components/global/auth/Header.vue'
import Footer from '@/components/global/Footer.vue'
import login from '~/middleware/login'
await login()
const route = useRoute()

const checkPage = () => {
  return route.path
}
</script>

<style lang="scss">
.main-layout-auth {
  background: $ov-gray-bg;
  background-repeat: no-repeat;
  background-position: right;
  background-attachment: fixed;
  width: 100%;
  position: relative;
  &__background {
    background-image: url('@/assets/images/auth-background.svg');
  }
  &__outer {
    display: flex;
    flex-direction: column;
    overflow: auto;
    height: 100vh;
  }
  .main {
    display: flex;
    position: relative;
    height: 100%;
    margin-top: 180px;
    margin-bottom: 100px;
    margin-left: 290px;
    width: 390px;

    &__form {
      width: 390px;
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
            padding-left: 37px;

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

@media (max-width: 990px) {
  .main-layout-auth {
    background-image: none;
    background: #f5f7fb;
    padding: 0;
    .main {
      margin: 180px auto 100px;
      width: max-content;
      .form-item__label {
        background: #f5f7fb;
      }
    }
    .go-back {
      bottom: 97px;
      width: 100%;
      display: flex;
      justify-content: center;
      left: -155px;
    }
  }
}
@media (max-width: 375px) {
  .main-layout-auth {
    background: $ov-gray-bg;
    padding: 0 44px 0 44px;
    .main {
      width: 287px !important;
      .form-item__label {
        background: $ov-gray-bg;
      }
    }
    .go-back {
      bottom: 59px;
      left: -100px;
    }
  }
}
</style>
