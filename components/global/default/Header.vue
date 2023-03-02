<template>
  <nav class="main">
    <div v-if="profileSuccessData && workSpaces" class="main__inner">
      <div class="main__left">
        <el-select
          v-model="selectedWorkspaceId"
          class="main__workspaces"
          placeholder="Workspace"
          :disabled="!$route.path.includes('/workspace')"
        >
          <el-option
            v-for="(item, index) in workSpaces.myWorkspaces"
            :key="`workspace_${index}`"
            :value="item.id"
            :label="item.name"
          ></el-option>
          <template slot="prefix">
            <img :src="avatarUrl" alt="" class="main__workspaces--prefix" />
          </template>
        </el-select>

        <div class="main__button-group">
          <el-button-group>
            <el-button
              :disabled="!selectedWorkspaceId"
              :class="{ active: $route.path.includes('/staff') }"
              @click="$router.push(`/workspace/staff/${selectedWorkspaceId}`)"
              >Staff</el-button
            >
            <el-button
              :disabled="!selectedWorkspaceId"
              :class="{ active: $route.path.includes('/projects') }"
              @click="
                $router.push(`/workspace/projects/${selectedWorkspaceId}`)
              "
              >Projects</el-button
            >
            <el-button
              :disabled="!selectedWorkspaceId"
              :class="{ active: $route.path.includes('/tasks') }"
              @click="$router.push(`/workspace/tasks/${selectedWorkspaceId}`)"
              >Tasks</el-button
            >
          </el-button-group>
        </div>
      </div>
      <div class="main__right">
        <el-input
          v-model="search"
          class="main__search-input"
          placeholder="Search"
          suffix-icon="el-icon-search"
        ></el-input>
        <el-button
          type="text"
          icon="el-icon-bell"
          class="main__actions"
        ></el-button>
        <el-button
          type="text"
          icon="el-icon-setting"
          class="main__actions"
          @click="$router.push('/profile')"
        ></el-button>
        <el-dropdown class="main__user-actions">
          <div class="main__user-actions--activator">
            <img
              :src="avatarUrl"
              alt="Avatar"
              class="main__user-actions--avatar"
            />
            <i class="el-icon-caret-bottom"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="onLogout">Logout</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Cookies from 'js-cookie'

export default {
  name: 'HeaderDefaultLayoutComponent',
  data() {
    return {
      workSpaces: null,
      selectedWorkspaceId: null,
      search: null,
    }
  },
  computed: {
    ...mapGetters('profile', ['profileSuccessData']),
    buttonText() {
      return this.$route.path === '/login' ? 'Sign up' : 'Sign in'
    },
    avatarUrl() {
      if (this.profileSuccessData) {
        return `${process.env.serverUrl}${this.profileSuccessData.avatarPath}/${this.profileSuccessData.user.avatar}`
      } else return ''
    },
  },
  watch: {
    $route: {
      immediate: true,
      handler(v) {
        if (v.path.includes('/workspace')) {
          this.selectedWorkspaceId = +v.params.id
        }
      },
    },
    selectedWorkspaceId(v) {
      if (v) {
        this.$router.push({ params: { id: v } })
      }
    },
  },
  async created() {
    this.getProfile()
    this.workSpaces = await this.getWorkSpaces()
  },
  methods: {
    ...mapActions('profile', ['getWorkSpaces', 'getProfile']),
    onRightButtonClick() {
      this.$route.path === '/login'
        ? this.$router.push('/register')
        : this.$router.push('/login')
    },
    onLogout() {
      Cookies.remove('token')
      this.$api.post('logout')
      this.$router.push('/login')
    },
  },
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

  &__right {
    display: flex;
    align-items: center;
    gap: 0 8px;
  }

  &__workspaces {
    width: 234px;
    ::v-deep {
      .el-input {
        &__inner {
          font-weight: 600;
          font-size: 20px;
          color: black;
          border: none;
          border-radius: 0;
          border-bottom: 1px solid rgba(140, 140, 140, 0.5);
          padding-left: 47px;
        }
        &__suffix {
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
    ::v-deep {
      .el-button-group {
        box-shadow: 0px 7px 64px rgba(0, 0, 0, 0.07);
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
  }

  &__search-input {
    margin-right: 16px;
    ::v-deep {
      .el-input {
        &__inner {
          border: 1px solid #c8c8c8;
          border-radius: 8px;
          height: 36px;
          width: 227px;
          &::placeholder {
            color: rgba(0, 0, 0, 0.4);
          }
        }
        &__icon {
          line-height: 0;
          color: black;
          &::before {
            font-weight: 600;
            font-size: 16px;
          }
        }
      }
    }
  }

  &__actions {
    ::v-deep {
      i {
        color: black;
        &::before {
          font-size: 24px;
          font-weight: 500;
        }
      }
    }
    &:hover {
      ::v-deep {
        i {
          color: $ov-primary;
        }
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
@media (max-width: 910px) {
  .el-button-group {
    button {
      padding: 7px 0 0 0;
      text-align: left;
    }
  }
}

@media (max-width: 860px) {
  .el-input {
    padding: 0;
    width: 150px !important;
    ::v-deep &__inner {
      padding: 0;
      width: 150px !important;
    }
  }
}
</style>
