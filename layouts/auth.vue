<template>
  <div class="main-layout-aut__outer">
    <Header />
    <div
      class="main-layout-auth"
      :class="checkPage() === '/expired' ? '' : 'main-layout-auth__background'"
    >
      <slot />
      <div v-if="checkPage === '/expired'" class="go-back">
        <el-button @click="$router.go(-1)">
          <img
            src="@/assets/images/icons/chevron-dark-icon.svg"
            class="go-back__icon"
            alt=""
          />
          <span class="go-back__text">Back</span>
        </el-button>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import Header from '~/components/global/auth/Header.vue'
import Footer from '@/components/global/Footer.vue'
import { useRoute } from 'vue-router'
import login from '~/middleware/login'
const route = useRoute()
login()


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
  min-height: calc(100vh - 286px);
  overflow-y: auto;
  position: relative;
  &__background {
    background-image: url('@/assets/images/auth-background.svg');
    padding: 130px 0 150px 18%;
  }
  &__outer {
    display: flex;
    flex-direction: column;
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
    padding-bottom: 157px;
    .main {
      margin: 100px auto 0;
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
    padding: 0 44px 119px 44px;
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
