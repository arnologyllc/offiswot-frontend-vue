<template>
  <nav class="main">
    <div class="users">
      <div v-if="accounts" class="main__top">
        <el-dropdown v-for="item in accounts" :key="item.ID" class="main__user-actions" :class="currentUser(item.ID)">
          <div class="main__user-actions--user" @click="changeAccount(item.ID)">
            <div class="current__user-selector"></div>
            <img
              :src="item.avatarUrl ? item.avatarUrl : defaultAvatar"
              alt="Avatar"
              class="main__user-actions--avatar"
            />
            <i class="el-icon-caret-bottom"></i>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item class="main__user-actions--add_element" @click="onLogout(item.ID)">
                <span>Logout</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div class="main__bottom">
        <el-dropdown class="main__user-actions-add">
          <div class="main__user-actions--add_button">
            <span>+</span>
          </div>
          <template #dropdown>
            <el-dropdown-menu class="main__user-actions--add_actions">
              <el-dropdown-item class="main__user-actions--add_element">
                <span :class="isHovered" @click="addAccount" @mouseover="hoveringStart" @mouseout="hoveringEnd">
                  Add account
                </span>
              </el-dropdown-item>
              <el-dropdown-item class="main__user-actions--add_element">
                <span :class="isHovered" @mouseover="hoveringStart" @mouseout="hoveringEnd"> Add workspace </span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <div class="chats" :class="isOpen ? 'large' : 'small'">
      <el-button class="chats-button" @click="open">></el-button>
    </div>
  </nav>
</template>

<script setup>
import { onMounted, watch, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import $cookies from 'js-cookie'
import { storeToRefs } from 'pinia'
import useProfileStore from '@/stores/profile'
import usePinStore from '@/stores/pin'
import useAuthStore from '@/stores/auth'
import useWorkspaceStore from '@/stores/workspace'
import defaultAvatar from '~/assets/images/icons/default-user-icon.jpg'

const profileStore = useProfileStore()
const pinStore = usePinStore()
const authStore = useAuthStore()
const workspaceStore = useWorkspaceStore()
const { profileSuccessData, profileFailureData, editProfileData, editFailureData } = storeToRefs(profileStore)
const { $myFetch } = useNuxtApp()
const config = useRuntimeConfig()
const avatarUrl = ref(defaultAvatar)
const isOpen = ref(false)

const profile = ref(null)
const $router = useRouter()
const isHovered = ref(false)
const accounts = ref(false)
const $route = useRoute()
const currentAccountID = ref(0)

const getAvatar = (v) => {
  const currentAccountID = $cookies.get('currentAccountID')

  profile.value = v
  if (v?.user.avatar) {
    accounts.value[currentAccountID].avatarUrl = `${config.public.env.serverUrl}${v.avatarPath}/${v.user.avatar}`
  } else {
    accounts.value[currentAccountID].avatarUrl = `${defaultAvatar}`
  }
  if (process.client) {
    localStorage.setItem('accounts', JSON.stringify(accounts.value))
  }
}

watch(profileSuccessData, (v) => {
  const currentAccountID = $cookies.get('currentAccountID')
  profile.value = v
  if (v?.user.avatar) {
    accounts.value[currentAccountID].avatarUrl = `${config.public.env.serverUrl}${v.avatarPath}/${v.user.avatar}`
  } else {
    accounts.value[currentAccountID].avatarUrl = `${defaultAvatar}`
  }
  if (process.client) {
    localStorage.setItem('accounts', JSON.stringify(accounts.value))
  }
})
watch(editFailureData, (v) => {
  if (v?.error === "You don't have permission to access this resource") {
    $cookies.remove('login_pin_token')
    $cookies.remove('settings_pin_token')
    v = null
    $router.go()
  }
})

watch(profileFailureData, (v) => {
  if (v?.error === "You don't have permission to access this resource") {
    $cookies.remove('login_pin_token')
    $cookies.remove('settings_pin_token')
    v = null
    $router.go()
  }
})

watch(editProfileData, (v) => {
  const currentAccountID = $cookies.get('currentAccountID')
  if (v?.user.avatar) {
    accounts.value[currentAccountID].avatarUrl = `${v.avatarPath}/${v.user.avatar}`
  } else {
    accounts.value[currentAccountID].avatarUrl = `${defaultAvatar}`
  }
  if (process.client) {
    localStorage.setItem('accounts', JSON.stringify(accounts.value))
  }
})

onMounted(() => {
  if (process.client) {
    accounts.value = JSON.parse(localStorage.getItem('accounts'))
  }
  if ($cookies.get('login_pin_token')) {
    if (!profileSuccessData.value) {
      profileStore.getProfile()
    } else {
      getAvatar(profileSuccessData.value)
    }
  }
})

const hoveringStart = () => {
  isHovered.value = 'hovered'
}
const hoveringEnd = () => {
  isHovered.value = false
}

const changeAccount = async (userID) => {
  profileStore.$reset()
  pinStore.$reset()
  authStore.$reset()
  workspaceStore.$reset()

  if ((Date.parse(accounts.value[userID].token_expires) - Date.now()) / 86400000 < 0) {
    accounts.value.splice(userID, 1)
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

  $cookies.set('token', accounts.value[userID].token, {
    expires: (Date.parse(accounts.value[userID].token_expires) - Date.now()) / 86400000,
  })

  $cookies.set('first_login', accounts.value[userID].first_login)
  if (accounts.value[userID].settings_pin_token)
    $cookies.set('settings_pin_token', accounts.value[userID].settings_pin_token)
  if (accounts.value[userID].login_pin_token)
    $cookies.set('login_pin_token', accounts.value[userID].login_pin_token, {
      expires: (Date.parse(accounts.value[userID].login_pin_token_expires) - new Date()) / 86400000,
    })

  if (process.client) {
    localStorage.setItem('accounts', JSON.stringify(accounts.value))

    if (accounts.value[userID].first_login === true) {
      navigateTo('/pin')
    } else if ($route.path === '/pin') {
      navigateTo('/')
    }
  }

  $cookies.set('currentAccountID', userID)
  currentAccountID.value = userID

  profileStore.getProfile()
  await profileStore.getWorkSpaces()
}

const addAccount = () => {
  $cookies.set('currentAccountID', accounts.value.length)
  $cookies.set('addAccount', true)
  window.open('/login', '_blank')
}

const onLogout = async (userID) => {
  const initAccountValue = accounts.value.filter((elem) => elem.ID !== userID)

  changeAccount(userID)
  await $myFetch('logout', {
    method: 'post',
  })

  profileStore.$reset()
  pinStore.$reset()
  authStore.$reset()
  workspaceStore.$reset()

  if (initAccountValue[0]) {
    if (Date.parse(initAccountValue[0].token_expires) - Date.now() > 0) {
      $cookies.set('token', initAccountValue[0].token, {
        expires: (Date.parse(initAccountValue[0].token_expires) - Date.now()) / 86400000,
      })
      if (initAccountValue[0].first_login === true) $cookies.set('first_login', initAccountValue[0].first_login)
      if (initAccountValue[0].settings_pin_token)
        $cookies.set('settings_pin_token', initAccountValue[0].settings_pin_token)
      if (initAccountValue[0].login_pin_token)
        $cookies.set('login_pin_token', initAccountValue[0].login_pin_token, {
          expires: (Date.parse(initAccountValue[0].login_pin_token_expires) - new Date()) / 86400000,
        })
      $cookies.set('currentAccountID', 0)
      profileStore.getProfile()
      await profileStore.getWorkSpaces()
      accounts.value = initAccountValue
      if (process.client) {
        localStorage.setItem('accounts', JSON.stringify(initAccountValue))
      }
      $router.go()
    } else {
      initAccountValue.shift()
    }
  } else {
    $cookies.remove('token')
    $cookies.remove('first_login')
    $cookies.remove('settings_pin_token')
    $cookies.remove('login_pin_token')
    if (process.client) {
      localStorage.setItem('accounts', JSON.stringify(initAccountValue))
    }
    accounts.value = initAccountValue
    navigateTo('/login')
  }
}

const currentUser = (id) => {
  return id === currentAccountID.value ? 'currentUser' : false
}

const open = () => {
  isOpen.value = !isOpen.value
}
</script>

<style scoped lang="scss">
.main {
  background: linear-gradient(179.97deg, #23329d -0.86%, #1e767b 103.09%);
  left: 0;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  float: left;
  border-radius: 0 !important;
  position: sticky !important;
  top: 0;
  left: 0;
  .users {
    height: 100vh;
    width: 68px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 10px;
  }
  .chats {
    height: 100vh;
    min-width: 71px;
    max-width: 236px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
  &__user {
    &-actions {
      margin: 14px;
      border-bottom: 1px solid #f0f0f0;
      padding-bottom: 14px;
      &--user {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 46px;
        height: 46px;
        border-radius: 26px;
        background: inherit;
        padding: 10px;
      }
      &--avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
      }
      &--add {
        display: block;
        &_element {
          background-color: #ffffff;
          width: 100%;
          padding: 0 !important;
          &:hover {
            span {
              display: block;
              padding: 0;
              margin: 0;
              color: #3f3356 !important;
              background-color: #f5f7fb !important;
            }
          }
        }
        &_element > span {
          display: block;
          font-size: 15px;
          font-weight: 400;
          width: 100%;
          height: 100%;
          color: #3f3356 !important;
        }
        &_button {
          text-align: center;
          width: 16px;
          height: 16px;
          font-size: 30px !important;
          color: white !important;
          padding-bottom: 26px;
        }
      }
    }
  }
  &__bottom {
    cursor: pointer;
  }
}

.chats {
  background: linear-gradient(180.87deg, #2c3a9f 6.42%, #299ba0 97.68%);
  backdrop-filter: blur(2px);
}

.large {
  width: 236px !important;
}
.small {
  width: 71px !important;
}

.chats-button {
  position: absolute;
  top: 30px;
  right: -25px;
  border: none;
  background: none;
  color: white;
  font-weight: 900;
}

.main__user-actions--add_element {
  .hovered {
    color: #d0c9d6 !important;
  }
}

.currentUser {
  .current__user-selector {
    background: linear-gradient(270deg, #94cef9 -62.5%, rgba(48, 110, 154, 0.5) 275%);
    width: 4px;
    height: 45px;
    border-radius: 0px 2px 2px 0px;
    position: absolute;
    left: -11px;
  }
  .main__user-actions--user {
    background: linear-gradient(51.28deg, rgba(48, 110, 154, 0.5) -1.56%, #94cef9 118.35%);
  }
}
</style>
