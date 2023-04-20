<template>
  <div>
    <div v-loading.fullscreen.lock="profileLoading" class="main">
      <div class="main__user-container">
        <div class="user-box__title">Your Profile</div>
        <div
          :style="!(userFullName && specialty) ? 'align-items:center;' : ''"
          class="user-box__info"
        >
          <img
            class="user-box__avatar"
            width="119px"
            height="119px"
            :src="avatarUrl"
            alt="user_avatar"
          />
          <div class="user-box__user-info">
            <div class="user-box__user-fullname user-box__title">
              <span v-if="userFullName" class="user-box__user-fullname-span">
                {{ userFullName }}
              </span>
              <img
                v-if="userFullName"
                class="user-box__user-edit-icon"
                src="@/assets/images/icons/edit-icon.svg"
                alt="edit_icon"
                @click="$router.push('/profile/edit')"
              />
              <el-button
                v-else
                class="user-box__user-edit-btn"
                @click="$router.push('/profile/edit')"
              >
                <span>Edit Profile</span>
              </el-button>
            </div>
            <div v-if="specialty" class="user-box__specialty">
              {{ specialty }}
            </div>
            <div
              class="user-box__credentials"
              :style="specialty ? 'padding-top:30px' : 'padding-top:15px'"
            >
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
                  v-if="userTelNumber"
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
        <el-upload
          v-model="payload.avatar"
          :show-file-list="false"
          class="main__form--upload"
          action="#"
          accept="image/*"
          :on-success="onAvatarUpload"
        >
          <el-button type="text" class="change-picture"
            >Change picture</el-button
          >
        </el-upload>
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
                <el-button
                  class="user-workspaces__create-btn"
                  @click="openWorkspace(item.id)"
                >
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
              style="position: absolute"
              @click="createWorkSpace"
            >
              <span>Create</span>
            </el-button>
            <div class="user-workspaces__container-text">
              <span v-html="formattedText()"> </span>
            </div>
          </div>
          <div
            v-if="userInviteWorkspaces"
            class="user-workspaces__header-bottom"
          >
            <div class="user-workspaces__title">participate in workspace</div>
          </div>
        </div>
      </div>
    </div>
    <check-modal
      :model="isOpenPINDialog"
      @close="isOpenPINDialog = false"
    ></check-modal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import defaultAvatar from '@/assets/images/icons/default-user-icon.jpg'
import {
  checkFirstLogin,
  checkLoginToken,
  checkSettingsToken,
} from '~/middleware/helpers'
import CheckModal from '@/components/auth/AccessCheckModal.vue'
export default {
  name: 'ProfilePage',
  components: {
    CheckModal,
  },
  data() {
    return {
      responseWorkspaces: null,
      text: '',
      payload: {
        avatar: null,
      },
      avatar: null,
      avatarSrc: null,
      isOpenPINDialog: false,
    }
  },
  head() {
    return {
      title: 'Profile',
    }
  },
  computed: {
    ...mapGetters('profile', [
      'profileLoading',
      'profileSuccessData',
      'profileFailureData',
      'editProfileData',
    ]),
    avatarUrl() {
      if (this.editProfileData) {
        return `${process.env.serverUrl}${this.profileSuccessData.avatarPath}/${this.editProfileData.user.avatar}`
      } else if (this.profileSuccessData) {
        if (this.profileSuccessData.user.avatar) {
          return `${process.env.serverUrl}${this.profileSuccessData.avatarPath}/${this.profileSuccessData.user.avatar}`
        }
      }
      return defaultAvatar
    },
    userFullName() {
      if (this.profileSuccessData) {
        const [name, lastname, surname] = [
          this.profileSuccessData.user.name
            ? this.profileSuccessData.user.name
            : '',
          this.profileSuccessData.user.lastname
            ? this.profileSuccessData.user.lastname
            : '',
          this.profileSuccessData.user.surname
            ? this.profileSuccessData.user.surname
            : '',
        ]
        if (name || lastname || surname) {
          return `${name} ${lastname} ${surname}`
        } else return false
      } else return false
    },
    userTelNumber() {
      if (this.profileSuccessData) {
        return this.profileSuccessData.user.phone_number
      } else return null
    },
    userInviteWorkspaces() {
      if (this.profileSuccessData) {
        return this.profileSuccessData.user.invite_workspaces.length
      } else return null
    },
    specialty() {
      if (this.profileSuccessData) {
        return this.profileSuccessData.specialties.find(
          (el) => el.id === this.profileSuccessData.user.speciality_id
        )?.name
      } else return false
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
    editProfileData(v) {
      if (v) {
        this.$message.success('Success!')
      }
    },
  },
  async created() {
    try {
      checkFirstLogin(this.$cookies, this.$router)
      checkLoginToken(this.$cookies, this.$router)
      if (!checkSettingsToken(this.$cookies)) {
        this.isOpenPINDialog = true
      }

      this.getProfile()
      this.responseWorkspaces = await this.getWorkSpaces()
    } catch {
      this.$router.push('/login')
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize)
  },

  methods: {
    ...mapActions('profile', ['getWorkSpaces', 'getProfile', 'editProfile']),
    createWorkSpace() {
      this.$router.push('/create-workspace')
    },
    openWorkspace(id) {
      this.$router.push(`/workspace/staff/${id}`)
    },
    handleResize() {
      this.$forceUpdate()
    },
    formattedText() {
      if (window.innerWidth > 861) {
        return `Thanks for joining Offiswot!<br /><br />
            Create a workspace for your team or company using our productivity platform.<br/>Enjoy collaborating with each other easily and managing yourteam members and the projects effectively.`
      } else if (window.innerWidth <= 861 && window.innerWidth > 567) {
        return `Thanks for joining Offiswot!<br /><br />
            Create a workspace for your team or company using our productivity platform. Enjoy collaborating with each other easily and managing yourteam members and the projects effectively.`
      } else {
        return `Thanks for<br /> joining Offiswot!<br /><br />
            Create a workspace for your team or company using our productivity platform. Enjoy collaborating with each other easily and managing yourteam members and the projects effectively.`
      }
    },

    onAvatarUpload(e, file) {
      this.payload.avatar = file.raw
      this.avatarSrc = URL.createObjectURL(file.raw)
      this.editProfile(this.payload)
    },
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
    width: 100%;
  }
}
.user-box {
  &__title {
    padding-left: 84px;
    color: $ov-text--title;
    font-size: 24px;
    font-weight: 600;
    line-height: 14px;
  }
  &__user-fullname-span {
    margin-right: 15px;
    line-height: 40px;
  }
  &__user-edit-icon {
    margin-bottom: -3px;
    cursor: pointer;
  }
  &__user-edit-btn {
    min-width: 137px;
    height: 40px;
    border-radius: 6px;
    color: $ov-primary;
    font-size: 16px;
    font-weight: 600;
    background: linear-gradient(90.32deg, #0cb1b9 0.28%, #4156f6 99.75%);
    color: #fbfbfb;
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
  margin: 5px 0 27px 77px;
  padding: 0;
  font-size: 14px;
  color: $ov-text--aqua;
  line-height: 20px;
  text-decoration: underline;
  font-weight: 400;
}
.user-workspaces {
  position: relative;
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
    font-size: 16px;
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
    width: 100%;
    font-size: 16px;
    color: #fff;
    font-weight: 600;
    line-height: 22px;
    text-align: justify;
  }
  &__buttons {
    display: flex;
    align-items: center;
  }
  &__create-btn {
    top: 82px;
    right: 103px;
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
      top: 65px;
      right: 50px;
    }
    &__container {
      display: block;
    }
  }
}

@media (max-width: 768px) {
  .user-workspaces {
    &__create-btn {
      right: 92px;
    }
  }
}

@media (max-width: 475px) {
  .user-workspaces {
    &__create-btn {
      top: 65px;
      right: 85px;
    }
  }
}
</style>
