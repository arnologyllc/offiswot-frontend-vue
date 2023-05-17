<template>
  <nav class="main">
    <div v-if="accounts" class="main__top">
      <el-dropdown
        v-for="item in accounts"
        :key="item.ID"
        class="main__user-actions"
      >
        <div
          class="main__user-actions--user"
          :class="currentUser(item.ID)"
          @click="changeAccount(item.ID)"
        >
          <img
            :src="item.avatarUrl ? item.avatarUrl : defaultAvatar"
            alt="Avatar"
            class="main__user-actions--avatar"
          />
          <i class="el-icon-caret-bottom"></i>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              class="main__user-actions--add_element"
              @click="onLogout(item.ID)"
            >
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
              <span
                :class="isHovered"
                @click="addAccount"
                @mouseover="hoveringStart"
                @mouseout="hoveringEnd"
              >
                Add account
              </span>
            </el-dropdown-item>
            <el-dropdown-item class="main__user-actions--add_element">
              <span
                :class="isHovered"
                @mouseover="hoveringStart"
                @mouseout="hoveringEnd"
              >
                Add workspace
              </span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </nav>
</template>

<script setup>
import { onMounted, watch, ref } from 'vue'
import { useRouter } from 'vue-router'
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
const {
  profileSuccessData,
  profileFailureData,
  editProfileData,
  editFailureData,
} = storeToRefs(profileStore)
const { $myFetch } = useNuxtApp()
const config = useRuntimeConfig()
const avatarUrl = ref(defaultAvatar)

const profile = ref(null)
const $router = useRouter()
const isHovered = ref(false)
const accounts = ref(false)

const getAvatar = (v) => {
  const currentAccountID = $cookies.get('currentAccountID')

  profile.value = v
  if (v?.user.avatar) {
    accounts.value[
      currentAccountID
    ].avatarUrl = `${config.public.env.serverUrl}${v.avatarPath}/${v.user.avatar}`
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
    accounts.value[
      currentAccountID
    ].avatarUrl = `${config.public.env.serverUrl}${v.avatarPath}/${v.user.avatar}`
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
    accounts.value[
      currentAccountID
    ].avatarUrl = `${v.avatarPath}/${v.user.avatar}`
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
  if (!userID) return
  profileStore.$reset()
  pinStore.$reset()
  authStore.$reset()
  workspaceStore.$reset()

  if (
    (Date.parse(accounts.value[userID].token_expires) - Date.now()) / 86400000 <
    0
  ) {
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
    expires:
      (Date.parse(accounts.value[userID].token_expires) - Date.now()) /
      86400000,
  })

  $cookies.set('first_login', accounts.value[userID].first_login)
  if (accounts.value[userID].settings_pin_token)
    $cookies.set(
      'settings_pin_token',
      accounts.value[userID].settings_pin_token
    )
  if (accounts.value[userID].login_pin_token)
    $cookies.set('login_pin_token', accounts.value[userID].login_pin_token, {
      expires:
        (Date.parse(accounts.value[userID].login_pin_token_expires) -
          new Date()) /
        86400000,
    })
  accounts.value.sort((a, b) => {
    if (a.ID === userID) {
      return -1
    } else if (b.ID === userID) {
      return 1
    }
    return 0
  })
  accounts.value.forEach((elem, index) => (elem.ID = index))
  if (process.client) {
    localStorage.setItem('accounts', JSON.stringify(accounts.value))
  }

  $cookies.set('currentAccountID', 0)

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
    $cookies.set('token', initAccountValue[0].token, {
      expires:
        (Date.parse(initAccountValue[0].token_expires) - Date.now()) / 86400000,
    })
    if (initAccountValue[0].first_login === true)
      $cookies.set('first_login', initAccountValue[0].first_login)
    if (initAccountValue[0].settings_pin_token)
      $cookies.set('settings_pin_token', initAccountValue[0].settings_pin_token)
    if (initAccountValue[0].login_pin_token)
      $cookies.set('login_pin_token', initAccountValue[0].login_pin_token, {
        expires:
          (Date.parse(initAccountValue[0].login_pin_token_expires) -
            new Date()) /
          86400000,
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
  return id === +$cookies.get('currentAccountID') ? 'currentUser' : false
}
</script>

<style scoped lang="scss">
.main {
  position: fixed !important;
  background: inherit;
  left: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 68px;
  padding: 17px 14px;
  float: left;
  border-radius: 0 !important;
  &__user {
    &-actions {
      padding: 14px;
      &--user {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 46px;
        height: 46px;
        background: linear-gradient(
          51.28deg,
          rgba(48, 110, 154, 0.5) -1.56%,
          #94cef9 118.35%
        );
        border-radius: 26px;
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

.main__user-actions--add_element {
  .hovered {
    color: #d0c9d6 !important;
  }
}
</style>
