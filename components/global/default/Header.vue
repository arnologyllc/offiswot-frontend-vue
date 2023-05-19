<template>
  <nav class="main">
    <div class="main__inner">
      <div class="main__left">
        <div v-if="$route.path.includes('/workspace')" class="main__button-group">
          <el-button-group>
            <el-button
              :class="{ active: $route.path.includes('/staff') }"
              @click="navigateTo(`/workspace/staff/${selectedWorkspaceId}`)"
            >
              <span> Staff </span>
            </el-button>
            <el-button
              :class="{ active: $route.path.includes('/projects') }"
              @click="navigateTo(`/workspace/projects/${selectedWorkspaceId}`)"
            >
              <span> Projects </span>
            </el-button>
            <el-button
              :class="{ active: $route.path.includes('/tasks') }"
              @click="navigateTo(`/workspace/tasks/${selectedWorkspaceId}`)"
            >
              <span> Tasks </span>
            </el-button>
          </el-button-group>
        </div>
      </div>
      <div class="main__right">
        <el-button class="main__actions">
          <el-icon><Bell /></el-icon>
        </el-button>
        <el-button v-if="!$route.path.includes('/pin')" class="main__actions" @click="navigateTo('/')">
          <el-icon><Setting /></el-icon>
        </el-button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { onMounted, watch, ref, onUpdated } from 'vue'
import { useRoute } from 'vue-router'
import $cookies from 'js-cookie'
import { storeToRefs } from 'pinia'
import { Bell, Setting } from '@element-plus/icons-vue'
import useProfileStore from '@/stores/profile'

const profileStore = useProfileStore()
const { workspacesSuccessData } = storeToRefs(profileStore)

const workSpaces = ref(null)
const $route = useRoute()
const selectedWorkspaceId = ref(+$route.params.id)

watch(workspacesSuccessData, (v) => {
  workSpaces.value = v
})

watch(selectedWorkspaceId, () => {
  navigateTo(`/workspace/staff/${selectedWorkspaceId.value}`)
})

onMounted(async () => {
  if ($cookies.get('login_pin_token')) {
    if (!workspacesSuccessData.value) {
      await profileStore.getWorkSpaces()
    } else {
      workSpaces.value = workspacesSuccessData.value
    }
  }
})

onUpdated(() => {
  if ($route.params.id) selectedWorkspaceId.value = +$route.params.id
})
</script>

<style scoped lang="scss">
.main {
  width: 100%;
  height: 42px;
  padding: 0 24px;
  background: white;
  display: flex;
  align-items: center;

  position: fixed;
  z-index: 10;
  background: #f5f7fb;
  box-shadow: 0px 2px 13px rgba(0, 0, 0, 0.16);
  border-radius: 0px 0px 0px 20px !important;
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
      height: 40px;
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
      width: 24px;
      height: 24px;
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
        background-color: inherit;
        color: #1d1d1d;
        font-weight: 500;
        font-size: 14px;
        &:not(.el-button:last-child) {
          margin-right: 12px;
        }

        &.active {
          background-image: linear-gradient(180deg, #2c3a9f 0%, #2994a0 100%);
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
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
    background-color: inherit;
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
