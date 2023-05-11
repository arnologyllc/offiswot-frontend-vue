<template>
  <nav class="main">
    <div class="main__inner">
      <div class="main__left">
        <el-select
          v-if="$route.path.includes('/workspace')"
          v-model="selectedWorkspaceId"
          class="main__workspaces"
          placeholder="Workspace"
        >
          <el-option
            v-for="(item, index) in workSpaces?.myWorkspaces"
            :key="`${index}_workspace_${item.name}`"
            :value="item.id"
            :label="item.name"
          >
          </el-option>
          <template #prefix>
            <img :src="avatarUrl" alt="" class="main__workspaces--prefix" />
          </template>
        </el-select>

        <div v-else class="main__logo">
          <img
            src="@/assets/images/icons/logo.svg"
            alt=""
            class="main__logo--logo"
          />
          <div class="main__logo--title">
            <span class="main__logo--titleStart">ffi</span>
            <span class="main__logo--titleEnd">swot</span>
          </div>
        </div>

        <div
          v-if="$route.path.includes('/workspace')"
          class="main__button-group"
        >
          <el-button-group>
            <el-button
              :disabled="!selectedWorkspaceId"
              :class="{ active: $route.path.includes('/staff') }"
              @click="navigateTo(`/workspace/staff/${selectedWorkspaceId}`)"
              >Staff</el-button
            >
            <el-button
              :disabled="!selectedWorkspaceId"
              :class="{ active: $route.path.includes('/projects') }"
              @click="navigateTo(`/workspace/projects/${selectedWorkspaceId}`)"
              >Projects</el-button
            >
            <el-button
              :disabled="!selectedWorkspaceId"
              :class="{ active: $route.path.includes('/tasks') }"
              @click="navigateTo(`/workspace/tasks/${selectedWorkspaceId}`)"
              >Tasks</el-button
            >
          </el-button-group>
        </div>
      </div>
      <div class="main__right">
        <el-button class="main__actions">
          <el-icon><Bell /></el-icon>
        </el-button>
        <el-button
          v-if="!$route.path.includes('/pin')"
          class="main__actions"
          @click="navigateTo('/')"
        >
          <el-icon><Setting /></el-icon>
        </el-button>
        <el-dropdown class="main__user-actions">
          <div class="main__user-actions--activator">
            <img
              :src="avatarUrl"
              alt="Avatar"
              class="main__user-actions--avatar"
            />
            <i class="el-icon-caret-bottom"></i>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="onLogout">Logout</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { onMounted, watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import $cookies from 'js-cookie'
import { storeToRefs } from 'pinia'
import { Bell, Setting } from '@element-plus/icons-vue'
import useProfileStore from '@/stores/profile'
import defaultAvatar from '~/assets/images/icons/default-user-icon.jpg'

const profileStore = useProfileStore()
const { profileSuccessData, editProfileData, workspacesSuccessData } =
  storeToRefs(profileStore)
const { $myFetch } = useNuxtApp()
const config = useRuntimeConfig()

const workSpaces = ref(null)
const profile = ref(null)
const selectedWorkspaceId = ref(null)
const $route = useRoute()
const avatarUrl = ref(defaultAvatar)

const getAvatar = (v) => {
  profile.value = v
  if (v.user.avatar) {
    avatarUrl.value = `${config.public.env.serverUrl}${v.avatarPath}/${v.user.avatar}`
  }
}

watch(profileSuccessData, (v) => {
  profile.value = v
  if (v.user.avatar) {
    avatarUrl.value = `${config.public.env.serverUrl}${v.avatarPath}/${v.user.avatar}`
  }
})

watch(editProfileData, (v) => {
  if (v.user.avatar) {
    avatarUrl.value = `${v.avatarPath}/${v.user.avatar}`
  }
})

watch(workspacesSuccessData, (v) => {
  workSpaces.value = v
})

watch(() => {
  if ($route.path.includes('/workspace')) {
    selectedWorkspaceId.value = +$route.params.id
  }
})

watch(selectedWorkspaceId, () => {
  navigateTo(`/workspace/staff/${selectedWorkspaceId.value}`)
})

onMounted(async () => {
  if (!profileSuccessData.value) {
    profileStore.getProfile()
  } else {
    getAvatar(profileSuccessData.value)
  }
  if (!workspacesSuccessData.value) {
    await profileStore.getWorkSpaces()
  } else {
    workSpaces.value = workspacesSuccessData.value
  }
})

const onLogout = async () => {
  await $myFetch('logout', {
    method: 'post',
  })
  $cookies.remove('token')
  $cookies.remove('first_login')
  $cookies.remove('settings_pin_token')
  navigateTo('/login')
}
</script>

<style scoped lang="scss">
.main {
  width: 100%;
  height: 80px;
  padding: 0 24px;
  background: white;
  display: flex;
  align-items: center;

  position: fixed;
  z-index: 10;

  &__inner {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__left {
    display: flex;
    gap: 0 74px;
    align-items: center;
  }

  &__logo {
    display: flex;
    align-items: flex-end;
    gap: 5px;
    &--title {
      display: flex;
    }
    &--titleStart {
      font-size: 25px;
      color: #4156f6;
    }
    &--titleEnd {
      font-size: 25px;
      color: #1ac1c9;
    }
  }

  &__right {
    display: flex;
    align-items: center;
    gap: 0 8px;
    .el-button {
      border: none;
      width: 24px;
      height: 24px;
    }
  }

  &__workspaces {
    width: 234px;
    .el-input__wrapper {
      box-shadow: none !important;
    }
    .el-input__inner {
      font-weight: 600;
      font-size: 20px;
      color: black;
      border: none;
      border-radius: 0;
      border-bottom: 1px solid rgba(140, 140, 140, 0.5);
      padding-left: 47px;
    }
    .el-input__suffix {
      padding-right: 0px;
      transform: rotate(-90deg);
      cursor: pointer;
      i {
        color: black;
        &::before {
          content: '\e78f';
        }
        &.is-reverse {
          transform: rotate(270deg) !important;
        }
      }
    }
    &--prefix {
      width: 30px;
      height: 30px;
      margin-top: 5px;
      border-radius: 12px;
      object-fit: cover;
    }
  }

  &__button-group {
    .el-button-group {
      border-radius: 6px;

      .el-button {
        border: none;
        width: 112px;
        border-radius: 6px;
        text-transform: uppercase;
        color: black;
        font-weight: 500;
        &:not(.el-button:last-child) {
          margin-right: 12px;
        }

        &.active {
          background: linear-gradient(225deg, #4156f6 0%, #0cb1b9 100%);
          color: white;
          font-weight: 600;
        }
      }
    }
  }

  &__search-input {
    margin-right: 16px;
    .el-input__inner {
      border: 1px solid #c8c8c8;
      border-radius: 8px;
      height: 36px;
      width: 227px;
      &::placeholder {
        color: rgba(0, 0, 0, 0.4);
      }
    }
    .el-input__icon {
      line-height: 0;
      color: black;
      &::before {
        font-weight: 600;
        font-size: 16px;
      }
    }
  }

  &__actions {
    width: 24px;
    height: 24px;
    i {
      color: black;
      width: 24px;
      height: 24px;
      svg {
        width: 24px;
        height: 24px;
      }
      &::before {
        font-size: 24px;
        font-weight: 500;
      }
    }
    &:hover {
      background-color: inherit;
      i {
        color: $ov-primary;
      }
    }
  }
  &__user-actions {
    cursor: pointer;
    &--activator {
      display: flex;
      align-items: center;
      gap: 0 4px;

      i {
        color: black;
      }
    }
    &--avatar {
      margin-left: 8px;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      object-fit: cover;
    }
  }
}
</style>
