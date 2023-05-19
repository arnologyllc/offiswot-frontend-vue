<template>
  <div>
    <div v-loading.fullscreen.lock="profileLoading" class="main">
      <div class="main__user-container">
        <div class="user-box__title">Your Profile</div>
        <div :style="!(userFullName && specialty) ? 'align-items:center;' : ''" class="user-box__info">
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
                @click="navigateTo('/profile/edit')"
              />
              <el-button v-else class="user-box__user-edit-btn" @click="navigateTo('/profile/edit')">
                <span>Edit Profile</span>
              </el-button>
            </div>
            <div v-if="specialty" class="user-box__specialty">
              {{ specialty }}
            </div>
            <div class="user-box__credentials" :style="specialty ? 'padding-top:30px' : 'padding-top:15px'">
              <div class="user-box__flex-box">
                <img src="@/assets/images/icons/email1-icon.svg" alt="email_icon" />
                <div>
                  {{ userEmail }}
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
                  {{ userTelNumber }}
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
          <el-button class="change-picture">Change picture</el-button>
        </el-upload>
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
import defaultAvatar from '@/assets/images/icons/default-user-icon.jpg'
import CheckModal from '@/components/auth/AccessCheckModal.vue'
import settingsToken from '~/middleware/settingsToken'
import loginToken from '~/middleware/loginToken'
import useProfileStore from '~/stores/profile'
import auth from '~/middleware/auth'
definePageMeta({ layout: 'default' })

const profileStore = useProfileStore()
const { profileLoading, profileSuccessData, editProfileData, workspacesSuccessData } = storeToRefs(profileStore)

const instance = getCurrentInstance()
const config = useRuntimeConfig()

const responseWorkspaces = ref(null)
const payload = ref({
  avatar: null,
})

const isOpenPINDialog = ref(null)
const userFullName = ref(null)
const userTelNumber = ref(null)
const userInviteWorkspaces = ref(null)
const specialty = ref(null)
const userEmail = ref(null)
const formattedText = ref(null)

const avatarUrl = ref(defaultAvatar)
const avatarSrc = ref(null)

const setProfileData = (v) => {
  if (v) {
    if (v.user.avatar) {
      avatarUrl.value = `${config.public.env.serverUrl}${v.avatarPath}/${v.user.avatar}`
    } else {
      avatarUrl.value = defaultAvatar
    }

    const [name, lastname, surname] = [
      v.user.name ? v.user.name : '',
      v.user.lastname ? v.user.lastname : '',
      v.user.surname ? v.user.surname : '',
    ]
    if (name || lastname || surname) {
      userFullName.value = `${name} ${lastname} ${surname}`
    }

    userTelNumber.value = v.user.phone_number
    userInviteWorkspaces.value = v.user.invite_workspaces.length
    userEmail.value = v.user.email
    specialty.value = v.specialties.find((el) => el.id === v.user.speciality_id)?.name
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

onMounted(async () => {
  auth()
  isOpenPINDialog.value = loginToken()
  isOpenPINDialog.value = settingsToken()
  if (!profileSuccessData.value || editProfileData.value) {
    profileStore.getProfile()
  } else {
    setProfileData(profileSuccessData.value)
  }
  await profileStore.getWorkSpaces()

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

const onAvatarUpload = (e, file) => {
  payload.value.avatar = file.raw
  avatarSrc.value = URL.createObjectURL(file.raw)
  profileStore.editProfile(payload.value)
}
</script>

<style scoped lang="scss">
.main {
  background-color: $ov-background;
  padding-bottom: 186px;
  width: 100%;
  border-radius: 20px 0 0 20px;

  height: 100vh;
  &__user-container {
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
    width: 119px;
    height: 119px;
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
  border: none;
  background-color: inherit;
}
.user-workspaces {
  position: relative;
  padding: 30px 74px 0 74px;
  border-top: 1px solid $ov-border;
  width: 100%;
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
    width: 100%;
    max-width: 200px;
  }
  &__create-btn {
    top: 82px;
    right: 103px;
    width: 100%;
    max-width: 200px;
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
    border: none;
    background-color: inherit;
  }
}
.small {
  min-height: 88px;
  background: linear-gradient(90.09deg, #bd7ae3 2.21%, $ov-primary 98.06%);
  flex-direction: row;
  align-items: center;
}
@media (max-width: 475px) {
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
  }
}

@media (max-width: 700px) {
  .user-workspaces {
    &__create-btn {
      right: 92px;
      max-width: 130px;
    }
  }
}

@media (max-width: 535px) {
  .user-workspaces {
    &__create-btn {
      top: 65px;
      right: 85px;
    }
  }
  .user-workspaces {
    &__container {
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    &__buttons {
      justify-content: center;
      align-items: center;
    }
    &__create-btn {
      margin: 0;
    }
  }
}

@media (max-width: 475px) {
  .user-workspaces {
    &__create-btn {
      top: 55px;
      right: 40px;
      max-width: 70px;
    }
  }
}
</style>
