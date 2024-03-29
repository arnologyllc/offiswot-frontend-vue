<template>
  <div class="main">
    <div class="main__form">
      <div class="main__form--title">
        <img src="@/assets/images/icons/chevron-left.svg" alt="chevron-left" @click="$router.go(-1)" />
        <span>Choose account to continue with</span>
      </div>
      <div class="main__form--subtitle">You can manage different accounts from one place</div>
    </div>
    <div class="main__users">
      <div v-if="accounts" class="main__top">
        <template v-for="item in activeUsers" :key="item.ID">
          <div class="main__user-actions" @click="changeAccount(item.email)">
            <img
              :src="item.avatarUrl ? item.avatarUrl : defaultAvatar"
              alt="Avatar"
              class="main__user-actions--avatar"
            />
            <div class="main__user-actions--info">
              <span class="main__user-actions--info__email">
                {{ item.email }}
              </span>
              <span class="main__user-actions--info__time">
                <img src="~/assets/images/icons/clock.svg" alt="clock" class="main__user-actions--info__clock" />
                Just now
              </span>
            </div>
          </div>
        </template>
      </div>
      <div class="main__user-actions" @click="addAccount">
        <div class="main__user-actions--add">
          <span>+</span>
          <span class="main__user-actions--add__title">Add new account</span>
        </div>
      </div>
    </div>
    <check-modal
      v-if="isOpenPINDialog"
      :dialog-visible="isOpenPINDialog"
      @close="isOpenPINDialog = false"
    ></check-modal>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import $cookies from 'js-cookie'
import settingsToken from '~/middleware/settingsToken'
import loginToken from '~/middleware/loginToken'
import auth from '~/middleware/auth'
import CheckModal from '@/components/auth/AccessCheckModal.vue'

import useProfileStore from '@/stores/profile'
definePageMeta({ layout: 'default' })
auth()

const profileStore = useProfileStore()

const accounts = ref(false)
const isOpenPINDialog = ref(false)
const currentAccountID = ref(null)
const $router = useRouter()

onMounted(() => {
  isOpenPINDialog.value = loginToken()
  isOpenPINDialog.value = settingsToken()

  if (process.client) {
    accounts.value = JSON.parse(localStorage.getItem('accounts')).filter((elem) => elem.token)
  }
})

const activeUsers = computed(() => {
  return accounts.value.reduce((acc, elem) => {
    if (elem.token) acc.push(elem)
    return acc
  }, [])
})

const addAccount = () => {
  $cookies.set('addAccount', true)
  window.open('/login', '_blank')
}

const changeAccount = async (email) => {
  currentAccountID.value = accounts.value.findIndex((user) => user.email === email)
  $cookies.set('currentAccountID', currentAccountID.value)
  if (accounts.value[currentAccountID.value].token === $cookies.get('token')) {
    navigateTo(`/create-workspace`)
    return
  }
  profileStore.$reset()

  if ((Date.parse(accounts.value[currentAccountID.value].token_expires) - Date.now()) / 86400000 < 0) {
    accounts.value.splice(currentAccountID.value, 1)

    if (process.client) {
      localStorage.setItem('accounts', JSON.stringify(accounts.value))
    }

    if (accounts.value[0]) {
      changeAccount(0)
    } else {
      Object.keys($cookies.get()).forEach(function (cookieName) {
        $cookies.remove(cookieName, neededAttributes)
      })
      $router.go()
    }
    // NOTIFY ABOUT TOKEN

    return
  }

  $cookies.set('token', accounts.value[currentAccountID.value].token, {
    expires: (Date.parse(accounts.value[currentAccountID.value].token_expires) - Date.now()) / 86400000,
  })

  $cookies.set('remember_token', accounts.value[currentAccountID.value].remember_token)
  $cookies.set('first_login', accounts.value[currentAccountID.value].first_login)
  if (accounts.value[currentAccountID.value].settings_pin_token) {
    $cookies.set('settings_pin_token', accounts.value[currentAccountID.value].settings_pin_token)
  } else {
    $cookies.remove('settings_pin_token')
  }
  if (accounts.value[currentAccountID.value].login_pin_token) {
    $cookies.set('login_pin_token', accounts.value[currentAccountID.value].login_pin_token, {
      expires: (Date.parse(accounts.value[currentAccountID.value].login_pin_token_expires) - new Date()) / 86400000,
    })
  } else {
    $cookies.remove('login_pin_token')
  }

  if (process.client) {
    localStorage.setItem('accounts', JSON.stringify(accounts.value))

    if (accounts.value[currentAccountID.value].first_login === true) {
      navigateTo('/pin')
    }
  }

  profileStore.getProfile()

  await profileStore.getWorkSpaces()

  navigateTo(`/create-workspace`)
}
</script>

<style scoped lang="scss">
.main {
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100vh;
  background-color: $ov-background;
  width: 100%;
  border-radius: 20px 0 0 0;
  padding: 37px 0 82px 50px;
  &__users {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  &__form {
    width: 390px;
    display: flex;
    flex-direction: column;
    &--title {
      display: flex;
      cursor: pointer;
    }
    &--subtitle {
      margin-left: 25px;
    }
  }
  &__top {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  &__user-actions {
    display: flex;
    align-items: center;
    padding: 8px;
    width: 364px;
    height: 64px;
    background: #ffffff;
    box-shadow: 0px 7px 64px rgba(0, 0, 0, 0.07);
    border-radius: 8px;
    gap: 12px;
    cursor: pointer;
    &--add {
      display: flex;
      align-items: center;
      gap: 28px;
      padding: 10px;
      span {
        font-size: 40px;
        color: #4f4cec;
      }
      &__title {
        font-weight: 500;
        font-size: 15px !important;
        line-height: 20px;
        letter-spacing: -0.24px;
        color: #1a051d !important;
      }
    }
    &--avatar {
      width: 48px;
      height: 48px;
      border-radius: 16px;
      object-fit: cover;
    }
    &--info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 6px;
      &__email {
        font-weight: 500;
        font-size: 15px;
        line-height: 20px;
        letter-spacing: -0.24px;
        color: #1a051d;
      }
      &__time {
        display: flex;
        gap: 4px;
        font-weight: 400;
        font-size: 11px;
        line-height: 13px;
        letter-spacing: 0.07px;
        color: #d0c9d6;
      }
    }
  }
}

@media (max-width: 485px) {
  .main {
    padding-left: 0;
    &__form {
      padding: 0 10px;
      margin: 0 auto;
      &--box {
        text-align: center;
      }
      &--title {
        font-size: 20px;
        text-align: center;
      }
      &--subtitle {
        text-align: center;
      }
    }
  }
}
</style>
