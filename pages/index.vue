<template>
  <div class="container_account">
    <div class="account">
      <div>
        <el-input size="large" placeholder="Search in your account" :prefix-icon="Search" class="account__search" />
        <div class="account__info">
          <img class="account__picture" :src="avatarUrl" alt="user_avatar" />
          <div class="account__titles">
            <div class="account__title">My account ({{ userEmail }})</div>
            <div class="account__subtitle">Here is everything about your personal account settings and activity.</div>
          </div>
        </div>
        <div class="account__body">
          <div class="account__body--element" @click="navigateTo('/profile')">
            <el-button class="account__body--block">
              <div>
                <img src="@/assets/images/icons/profile.svg" alt="profile-icon" class="icon" />
              </div>
            </el-button>
            <div class="element__titles">
              <div class="account__body--block-title">Profile</div>
              <div class="account__body--block-subtitle">View and update your profile.</div>
            </div>
          </div>
          <div class="account__body--element">
            <el-button class="account__body--block">
              <div>
                <img src="@/assets/images/icons/credit-card.svg" alt="credit-card-icon" class="icon" />
              </div>
            </el-button>
            <div class="element__titles">
              <div class="account__body--block-title">Payments</div>
              <div class="account__body--block-subtitle">????</div>
            </div>
          </div>
          <div class="account__body--element">
            <el-button class="account__body--block">
              <div>
                <img src="@/assets/images/icons/menu-profile.svg" alt="menu-profile-icon" class="icon" />
              </div>
            </el-button>
            <div class="element__titles">
              <div class="account__body--block-title">Logs</div>
              <div class="account__body--block-subtitle">Check your account logs.</div>
            </div>
          </div>
          <div class="account__body--element">
            <el-button class="account__body--block">
              <div>
                <img src="@/assets/images/icons/bell.svg" alt="bell-icon" class="icon" />
              </div>
            </el-button>
            <div class="element__titles">
              <div class="account__body--block-title">Notifications</div>
              <div class="account__body--block-subtitle">Manage notifications sent to you.</div>
            </div>
          </div>
          <div class="account__body--element" @click="navigateTo('/profile-settings')">
            <el-button class="account__body--block">
              <div>
                <img src="@/assets/images/icons/lock.svg" alt="lock-icon" class="icon" />
              </div>
            </el-button>
            <div class="element__titles">
              <div class="account__body--block-title">Security</div>
              <div class="account__body--block-subtitle">Check your account security.</div>
            </div>
          </div>
        </div>
        <div class="user-workspaces">
          <div class="user-workspaces__header">
            <div class="user-workspaces__title">your workspaces</div>
            <el-button
              v-if="isWithWorkspaces"
              class="user-workspaces__create-btn-outline"
              @click="navigateTo('/create-workspace')"
            >
              <span>+ Create workspace</span>
            </el-button>
          </div>
          <div v-if="isWithWorkspaces" class="user-workspaces__body">
            <div
              v-for="(item, i) in responseWorkspaces?.myWorkspaces"
              :key="`workspace_${i}`"
              class="user-workspaces__container"
              @click="openWorkspace(item.id)"
            >
              <div class="user-workspaces__element">
                <img class="user-workspaces__picture" :src="avatarUrl" alt="user_avatar" />
                <div class="user-workspaces__element--title">
                  <div class="user-workspaces__workspace-name">
                    {{ item.name }}
                  </div>
                  <div class="user-workspaces__workspace-specific">
                    {{ item.name }}
                  </div>
                </div>
              </div>
              <div class="user-workspaces__buttons">
                <el-button class="user-workspaces__element-create-btn">
                  <span>Open</span>
                </el-button>
              </div>
            </div>
          </div>
          <div v-else-if="!isWithWorkspaces" class="user-workspaces__container--text">
            <el-button
              class="user-workspaces__text-create-btn"
              style="position: absolute"
              @click="navigateTo('/create-workspace')"
            >
              <span>Create</span>
            </el-button>
            <div class="user-workspaces__container-text">
              <span v-html="formattedText"> </span>
            </div>
          </div>
          <div v-if="userInviteWorkspaces" class="user-workspaces__header-bottom">
            <div class="user-workspaces__title">participate in workspace</div>
          </div>
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
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { Search } from '@element-plus/icons-vue'
import defaultAvatar from '@/assets/images/icons/default-user-icon.jpg'
import CheckModal from '@/components/auth/AccessCheckModal.vue'
import settingsToken from '~/middleware/settingsToken'
import loginToken from '~/middleware/loginToken'
import useProfileStore from '~/stores/profile'
import usePINStore from '~/stores/pin'
import auth from '~/middleware/auth'
definePageMeta({ layout: 'default' })

const profileStore = useProfileStore()
const pinStore = usePINStore()
const { profileLoading, profileSuccessData, editProfileData, workspacesSuccessData } = storeToRefs(profileStore)
const { checkPinData } = storeToRefs(pinStore)

const instance = getCurrentInstance()
const config = useRuntimeConfig()

const responseWorkspaces = ref(null)
const payload = ref({
  avatar: null,
})

const isOpenPINDialog = ref(null)
const userInviteWorkspaces = ref(null)
const userEmail = ref(null)
const formattedText = ref(null)

const avatarUrl = ref(defaultAvatar)
const avatarSrc = ref(null)

const setProfileData = (v) => {
  if (v) {
    if (v.user.avatar) {
      avatarUrl.value = v.avatarPath.includes(config.public.env.serverUrl)
        ? `${v.avatarPath}/${v.user.avatar}`
        : `${config.public.env.serverUrl}${v.avatarPath}/${v.user.avatar}`
    } else {
      avatarUrl.value = defaultAvatar
    }

    userInviteWorkspaces.value = v.user.invite_workspaces.length
    userEmail.value = v.user.email
  }
}

const setWorkspaceData = (v) => {
  responseWorkspaces.value = v
}

watch(profileSuccessData, (v) => setProfileData(v))

watch(editProfileData, (v) => {
  if (v.user.avatar) {
    avatarUrl.value = `${v.avatarPath}/${v.user.avatar}`
  } else {
    avatarUrl.value = defaultAvatar
  }
})

watch(workspacesSuccessData, (v) => setWorkspaceData(v))
watch(checkPinData, async (v) => {
  profileStore.getProfile()
  await profileStore.getWorkSpaces()
})

onMounted(() => {
  auth()
  isOpenPINDialog.value = loginToken()
  isOpenPINDialog.value = settingsToken()
  if (editProfileData.value) {
    setProfileData(editProfileData.value)
  } else if (profileSuccessData.value) {
    setProfileData(profileSuccessData.value)
  }
  if (workspacesSuccessData.value) {
    setWorkspaceData(workspacesSuccessData.value)
  }

  window.addEventListener('resize', handleResize)
  formattedText.value = formattedTextFtn()
})

const isWithWorkspaces = computed(() => {
  return responseWorkspaces.value && responseWorkspaces.value.myWorkspaces.length
})

const openWorkspace = (id) => {
  navigateTo(`/workspace/staff/${id}`)
}

const handleResize = () => {
  formattedText.value = formattedTextFtn()
  instance.update()
}
const formattedTextFtn = () => {
  if (window.innerWidth > 935) {
    return `Thanks for joining Offiswot!<br /><br />
            Create a workspace for your team or company using our productivity platform.<br/>Enjoy collaborating with each other easily and managing yourteam members and the projects effectively.`
  } else if (window.innerWidth <= 935 && window.innerWidth > 628) {
    return `Thanks for joining Offiswot!<br /><br />
            Create a workspace for your team or company using our productivity platform. Enjoy collaborating with each other easily and managing yourteam members and the projects effectively.`
  } else {
    return `Thanks for<br /> joining Offiswot!<br /><br />
            Create a workspace for your team or company using our productivity platform. Enjoy collaborating with each other easily and managing yourteam members and the projects effectively.`
  }
}
</script>

<style scoped lang="scss">
.container_account {
  width: 100%;
  background-color: $ov-background;
  padding-bottom: 186px;
  border-radius: 20px 0 0 20px;
  padding: 37px 0 82px 0;
}
.account {
  height: max-content;
  min-height: calc(100vh - 170px);
  border-left: 1px solid #d0c9d6;
  overflow: auto;
  &__search {
    height: 36px;
    width: calc(100% - 90px);
    margin-left: 50px;
    margin-bottom: 40px;
    background: #ffffff;
    border: 1px solid #cdc7d2;
    border-radius: 6px;
    .el-input__wrapper {
      .el-input__inner::placeholder {
        font-size: 15px;
        line-height: 20px;
        color: #d0c9d6;
      }
    }
  }
  &__info {
    display: flex;
    margin-left: 50px;
    margin-bottom: 40px;
    gap: 8px;
  }
  &__picture {
    width: 45px;
    height: 45px;
    border-radius: 12px;
    object-fit: cover;
  }
  &__title {
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    margin-bottom: 4px;
    color: #0d1c2e;
  }
  &__subtitle {
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #717a7f;
  }
  &__body {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: left;
    gap: 30px;
    margin-left: 50px;
    &--element {
      display: flex;
      width: max-content;
      height: 80px;
      width: 100%;
      max-width: 340px;
      gap: 12px;
      cursor: pointer;
    }
    &--block {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 0;
      width: 80px;
      height: 80px;
      min-width: 80px;
      min-height: 80px;
      background: #ffffff;
      border: 1px solid #f6f5f6;
      box-shadow: 0px 7px 64px rgba(0, 0, 0, 0.02);
      border-radius: 12px;
      &-title {
        font-weight: 500;
        font-size: 16px;
        line-height: 20px;
        color: #2c3a9f;
      }
      &-subtitle {
        font-weight: 400;
        font-size: 12px;
        line-height: 15px;
        color: #717a7f;
      }
    }
  }
}

@media (max-width: 543px) {
  .account {
    &__body {
      justify-content: center;
    }
    &__title {
      text-align: center;
    }
  }
}

.user-workspaces {
  position: relative;
  padding-top: 30px;
  border-top: 1px solid $ov-border;
  width: 95%;
  margin: 20px auto 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  &__container--text {
    width: 100%;
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
  &__picture {
    width: 48px;
    height: 48px;
    border: 1px solid #ecebed;
    border-radius: 16px;
    object-fit: cover;
  }
  &__header {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  &__body {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
  }
  &__header-bottom {
    margin-top: 40px;
  }
  &__title {
    display: flex;
    font-size: 14px;
    color: $ov-text--subtitle;
    align-items: center;
    font-weight: 600;
    line-height: 17px;
    text-transform: uppercase;
  }
  &__container {
    max-width: 495px;
    min-width: 220px;
    width: 100%;
    height: 64px;
    flex-direction: row;
    align-items: center;
    font-size: 16px;
    margin-top: 11px;
    padding: 12px 12px 12px 8px;
    display: flex;
    gap: 20px;
    justify-content: space-between;
    background: #ffffff;
    box-shadow: 0px 7px 64px rgba(0, 0, 0, 0.07);
    border-radius: 8px;
  }
  &__element {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  &__workspace-name {
    font-size: 14px;
    line-height: 17px;
    font-weight: 600;
    color: #0d1c2e;
  }
  &__workspace-specific {
    font-weight: 400;
    font-size: 11px;
    line-height: 13px;
    letter-spacing: 0.07px;
    color: #d0c9d6;
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
    justify-content: flex-end;
    width: 100%;
    max-width: 200px;
  }
  &__text-create-btn {
    top: 75px;
    right: 20px;
    width: 100%;
    max-width: 137px;
    height: 40px;
    border-radius: 6px;
    color: $ov-primary;
    font-size: 16px;
    font-weight: 600;
    background-color: #fff;
  }
  &__element-create-btn {
    width: 100%;
    max-width: 100px;
    height: 40px;
    background: $ov-primary;
    border-radius: 6px;
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
    line-height: 22px;
    text-align: center;
    text-transform: uppercase;

    color: #ffffff;
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
    border: none;
    background-color: inherit;
  }
}

@media (max-width: 475px) {
  .user-workspaces {
    padding: 18px 32px 0 32px;
    &__text-create-btn {
      min-width: 110px;
      height: 37px;
      float: right;
      margin-bottom: 20px;
      margin-left: 8px;
      top: 65px;
      right: 10px;
    }
  }
}
@media (max-width: 1000px) {
  .account__subtitle,
  .account__body--block-subtitle {
    display: none;
  }
  .account__body--element {
    flex-direction: column;
    width: max-content;
    align-items: center;
  }
  .element__titles {
    width: max-content;
  }
  .account__body {
    margin-bottom: 100px;
    justify-content: space-between;
    margin-right: 20px;
  }
  .account__titles {
    display: flex;
    align-items: center;
  }
}

@media (max-width: 730px) {
  .user-workspaces {
    &__text-create-btn {
      right: 10px;
      max-width: 130px;
    }
  }
  .element__titles {
    display: none;
  }
  .account__body--element {
    width: max-content;
    align-items: center;
  }
  .account__body {
    margin-bottom: 20px;
    gap: 15px;
  }
  .account__title {
    font-size: 14px;
  }
}

@media (max-width: 610px) {
  .account__body--block {
    min-width: 50px;
    min-height: 50px;
    width: 50px;
    height: 50px;
  }
  .icon {
    width: 25px;
    height: 25px;
  }
  .user-workspaces {
    &__element--title {
      display: none;
    }
  }
}

@media (max-width: 535px) {
  .user-workspaces {
    &__text-container {
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    &__text-create-btn {
      margin: 0;
    }
  }
}
@media (max-width: 510px) {
  .user-workspaces {
    &__text-create-btn {
      right: calc(100% - 50%);
    }
    &__container--text {
      flex-direction: column;
      align-items: center;
    }
    &__container-text {
      text-align: center;
    }
    &__text-create-btn {
      position: static !important;
    }
  }
  .account__body--element {
    height: 100%;
  }
  .account__titles {
    display: none;
  }
  .account__info {
    justify-content: center;
    margin-left: 0;
  }
}
</style>
