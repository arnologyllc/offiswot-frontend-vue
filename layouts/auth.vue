<template>
  <div class="main-layout-aut__outer">
    <Header />
    <div class="main-layout-auth">
      <Nuxt />
      <div class="go-back">
        <el-button type="text" @click="$router.go(-1)">
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

<script>
import Header from '@/components/global/Header.vue'
import Footer from '@/components/global/Footer.vue'
export default {
  name: 'AuthLayout',
  components: {
    Header,
    Footer,
  },
}
</script>

<style scoped lang="scss">
.main-layout-auth {
  background: $ov-gray-bg;
  background-image: url('@/assets/images/auth-background.svg');
  background-repeat: no-repeat;
  background-position: right;
  background-attachment: fixed;
  width: 100%;
  min-height: calc(100vh - 286px);
  padding: 50px 0 150px 18%;
  overflow-y: auto;
  position: relative;

  &__outer {
    display: flex;
    flex-direction: column;
  }
  .go-back {
    position: absolute;
    bottom: 100px;
    ::v-deep {
      .el-button span {
        display: flex;
        align-items: center;
        gap: 12.5px;
      }
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
    background: #F5F7FB;
    padding: 0;
    padding-bottom: 157px;
    ::v-deep {
      .main {
        margin: 50px auto;
        width: max-content;
        .form-item__label {
          background: #F5F7FB;
        }
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
    ::v-deep {
      .main {
        width: 100% !important;
        .form-item__label {
          background: $ov-gray-bg;
        }
      }
    }
    .go-back {
      bottom: 59px;
      left: -100px;
    }
  }
}
</style>