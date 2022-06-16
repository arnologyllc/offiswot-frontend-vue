<template>
  <div>
    <div v-loading.fullscreen.lock="profileLoading" class="main">
      <div class="main__user-container">
        <div class="user-box__title">Your Profile</div>
        <div class="user-box__info">
          <img
            class="user-box__avatar"
            width="119px"
            height="119px"
            :src="avatarURL"
            alt="user_avatar"
          />
          <div class="user-box__user-info">
            <div class="user-box__user-fullname user-box__title">
              <span>{{ userFullName }}</span>
              <img
                class="user-box__user-edit-icon"
                src="@/assets/images/icons/edit-icon.svg"
                alt="edit_icon"
                @click="$router.push('/profile/edit')"
              />
            </div>
            <div class="user-box__specialty">{{ specialty }}</div>
            <div class="user-box__credentials">
              <div class="user-box__flex-box">
                <img
                  src="@/assets/images/icons/email1-icon.svg"
                  alt="email_icon"
                />
                <div>
                  {{ profileSuccessData ? profileSuccessData.user.email : '' }}
                </div>
              </div>
              <div class="user-box__flex-box">
                <img
                  style="margin-bottom: 3px"
                  src="@/assets/images/icons/phone-icon.svg"
                  alt="phone_icon"
                />
                <div>
                  {{
                    profileSuccessData
                      ? profileSuccessData.user.phone_number
                      : ''
                  }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <el-button type="text" class="change-picture">
          Change picture
        </el-button>
        <div class="user-workspaces">
          <div class="user-workspaces__header">
            <div class="user-workspaces__title">your workspaces</div>
            <el-button
              v-if="isWithWorkspaces"
              type="text"
              class="user-workspaces__create-btn-outline"
              @click="createWorkSpace"
            >
              <span>+ Create workspace</span>
            </el-button>
          </div>
          <div v-if="isWithWorkspaces">
            <div
              v-for="(item, i) in responseWorkspaces.myWorkspaces"
              :key="`workspace_${i}`"
              class="user-workspaces__container"
              :class="{ small: isWithWorkspaces }"
            >
              <div class="user-workspaces__workspace-name">
                {{ item.name }}
              </div>
              <div class="user-workspaces__buttons">
                <el-button class="user-workspaces__create-btn" @click="openWorkspace(item.id)">
                  <span>Open</span>
                </el-button>
                <el-button class="user-workspaces__icon-btn">
                  <img
                    src="@/assets/images/icons/edit-icon.svg"
                    alt="edit_icon"
                  />
                </el-button>
              </div>
            </div>
          </div>
          <div
            v-else-if="responseWorkspaces && !responseWorkspaces.length"
            class="user-workspaces__container"
          >
            <el-button
              class="user-workspaces__create-btn"
              @click="createWorkSpace"
            >
              <span>Create</span>
            </el-button>
            <div class="user-workspaces__container-text">
              Create a workspace for ... some more text Lorem Ipsum is simply
              dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industry's standard dummy text ever since the 1500s,
              when an unknown printer took a galley of type and scrambled it to
              make a ty
            </div>
          </div>
          <div class="user-workspaces__header-bottom">
            <div class="user-workspaces__title">participate in workspace</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'ProfilePage',
  data() {
    return {
      responseWorkspaces: null,
    }
  },
  head() {
    return {
      title: "Profile"
    }
  },
  computed: {
    ...mapGetters('profile', [
      'profileLoading',
      'profileSuccessData',
      'profileFailureData',
    ]),
    avatarURL() {
      if (this.profileSuccessData) {
        return `${process.env.serverUrl}${this.profileSuccessData.avatarPath}/${this.profileSuccessData.user.avatar}`
      } else return ''
    },
    userFullName() {
      if (this.profileSuccessData) {
        return `${this.profileSuccessData.user.name} ${this.profileSuccessData.user.lastname} ${this.profileSuccessData.user.surname}`
      } else return ''
    },
    specialty() {
      if (this.profileSuccessData) {
        return this.profileSuccessData.specialties.find(
          (el) => el.id === this.profileSuccessData.user.speciality_id
        ).name
      } else return ''
    },
    isWithWorkspaces() {
      if (
        this.responseWorkspaces &&
        this.responseWorkspaces.myWorkspaces.length
      ) {
        return true
      } else return false
    },
  },
  watch: {
    profileFailureData(v) {
      for (const i in v) {
        if (typeof v[i] !== 'string') {
          for (const j in v[i]) {
            this.$notify.error({
              title: 'Error',
              dangerouslyUseHTMLString: true,
              message: `${i}: ${v[i][j]}`,
            })
          }
        } else {
          this.$notify.error({
            title: 'Error',
            message: v[i],
          })
        }
      }
    },
  },
  async created() {
    this.getProfile()
    try {
      this.responseWorkspaces = await this.getWorkSpaces()
    } catch {}
  },
  methods: {
    ...mapActions("profile", ["getWorkSpaces", "getProfile"]),
    createWorkSpace() {
      this.$router.push('/create-workspace')
    },
    openWorkspace(id) {
      this.$router.push(`/workspace/staff/${id}`)
    }
  },
}
</script>

<style scoped lang="scss">
.main {
  background-color: $ov-background;
  padding-top: 67px;
  padding-bottom: 186px;
  &__user-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 37px 0 82px 0;
  }
}
.user-box {
  &__title {
    padding-left: 84px;
    color: $ov-text--title;
    font-size: 24px;
    font-weight: 600;
    line-height: 29px;
  }
  &__user-edit-icon {
    margin-left: 15px;
    margin-bottom: -3px;
    cursor: pointer;
  }
  &__info {
    padding: 36px 75px 0 75px;
    display: flex;
  }
  &__avatar {
    border-radius: 50%;
    object-fit: cover;
  }
  &__user-info {
    padding-left: 39px;
  }
  &__user-fullname {
    padding-left: 0;
  }
  &__specialty {
    font-size: 16px;
    color: $ov-text--grey;
    line-height: 19.5px;
    padding-top: 7px;
  }
  &__credentials {
    display: flex;
    padding-top: 30px;
    div {
      font-size: 14px;
      color: $ov-text--title;
      line-height: 17px;
    }
  }
  &__flex-box {
    display: flex;
    align-items: center;
    img {
      margin-right: 5px;
    }
  }
  &__flex-box:last-child {
    margin-left: 15px;
  }
}
.change-picture {
  margin: 5px 0 27px 89px;
  padding: 0;
  font-size: 14px;
  color: $ov-text--aqua;
  line-height: 20px;
  text-decoration: underline;
  font-weight: 400;
}
.user-workspaces {
  padding: 30px 74px 0 74px;
  border-top: 1px solid $ov-border;
  &__header {
    display: flex;
    justify-content: space-between;
  }
  &__header-bottom {
    margin-top: 40px;
  }
  &__title {
    font-size: 14px;
    color: $ov-text--subtitle;
    font-weight: 600;
    line-height: 17px;
    text-transform: uppercase;
  }
  &__container {
    width: 100%;
    min-height: 194px;
    margin-top: 11px;
    padding: 24px 31px 24px 29px;
    display: flex;
    flex-direction: row-reverse;
    gap: 20px;
    justify-content: space-between;
    background-image: url('@/assets/images/workspace-background.svg');
    background-size: cover;
    background-position: top;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
    border-radius: 16px;
  }
  &__workspace-name {
    font-size: 18px;
    color: #fff;
    font-weight: 700;
    line-height: 22px;
  }
  &__container-text {
    font-size: 16px;
    color: #fff;
    font-weight: 600;
    line-height: 22px;
  }
  &__buttons {
    display: flex;
    align-items: center;
  }
  &__create-btn {
    min-width: 137px;
    height: 40px;
    border-radius: 6px;
    color: $ov-primary;
    font-size: 16px;
    font-weight: 600;
    background-color: #fff;
  }
  &__icon-btn {
    width: 48px;
    height: 40px;
    border-radius: 6px;
    background-color: #fff;
    margin-left: 25px;
    padding: 0;
  }
  &__create-btn-outline {
    font-size: 14px;
    color: $ov-primary;
    font-weight: 600;
    padding: 0;
  }
}
.small {
  min-height: 88px;
  background: linear-gradient(90.09deg, #bd7ae3 2.21%, $ov-primary 98.06%);
  flex-direction: row;
  align-items: center;
}
@media (max-width: 425px) {
  .user-box {
    &__title {
      padding-left: 34px;
    }
    &__info {
      padding: 20px 38px 0 38px;
    }
    &__avatar {
      width: 44px;
      height: 44px;
    }
    &__user-info {
      padding-left: 15px;
    }
    &__user-fullname {
      font-size: 18px;
      padding-left: 0 !important;
    }
    &__specialty {
      font-size: 14px;
      padding-top: 3px;
    }
    &__credentials {
      padding-top: 13px;
      display: block;
    }
    &__flex-box:last-child {
      margin-left: 0;
      margin-top: 7px;
    }
    &__user-edit-icon {
      margin-left: 5px;
    }
  }
  .change-picture {
    margin-left: 97px;
    margin-bottom: 18px;
  }
  .user-workspaces {
    padding: 18px 32px 0 32px;
    &__create-btn {
      min-width: 110px;
      height: 37px;
      float: right;
      margin-bottom: 20px;
      margin-left: 8px;
    }
    &__container {
      display: block;
    }
  }
}
</style>
