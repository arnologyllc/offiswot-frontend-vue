<template>
  <div v-loading.fullscreen.lock="profileLoading" class="main">
    <el-form
      v-if="profileSuccessData"
      ref="editForm"
      class="main__form"
      hide-required-asterisk
      label-position="top"
      :model="payload"
      @submit.prevent="onSubmit"
    >
      <el-row>
        <el-col :span="24">
          <div :span="24" class="main__title">
            <div class="main__title__div">
              <img
                src="@/assets/images/icons/chevron-dark-icon.svg"
                class="go-back__icon"
                alt=""
                @click="$router.push('/profile')"
              />
              <span class="main__title__span" @click="$router.push('/profile')">
                Edit your profile
              </span>
            </div>
            <span class="main__subtitle__span">
              You can manage different accounts from one place
            </span>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="70">
        <el-col
          :xs="{ span: 24 }"
          :sm="{ span: 12 }"
          :md="{ span: 8 }"
          class="main__form--picture"
        >
          <img :src="avatarUrl" alt="avatar" />
          <el-form-item prop="avatar">
            <el-upload
              v-model="payload.avatar"
              :show-file-list="false"
              class="main__form--upload"
              action="#"
              accept="image/*"
              :on-success="onAvatarUpload"
            >
              <el-button>Upload picture</el-button>
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :xs="{ span: 24 }" :sm="{ span: 12 }" :md="{ span: 8 }">
          <el-form-item prop="date_of_birth">
            <el-date-picker
              v-model="payload.date_of_birth"
              class="main__form--input date-picker"
              type="date"
              value-format="YYYY-MM-DD"
              placeholder="Date of birth"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item prop="gender">
            <el-radio-group
              v-model="payload.gender"
              class="main__form--radio-group"
            >
              <el-radio label="male">Male</el-radio>
              <el-radio label="female">Female</el-radio>
              <el-radio label="other">Other</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :xs="{ span: 24 }" :sm="{ span: 12 }" :md="{ span: 8 }">
          <el-form-item prop="languages">
            <el-select
              v-model="payload.languages"
              multiple
              class="main__form--input select"
              placeholder="Languages"
            >
              <el-option
                v-for="(item, index) in languagesList"
                :key="`lang_${index}`"
                :value="item.id"
                :label="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="experience">
            <el-input
              v-model="payload.experience"
              type="number"
              class="main__form--input"
              placeholder="Experience"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="70">
        <el-col :xs="{ span: 24 }" :sm="{ span: 12 }" :md="{ span: 8 }">
          <el-form-item prop="name">
            <el-input
              v-model="payload.name"
              class="main__form--input"
              placeholder="Name"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="{ span: 24 }" :sm="{ span: 12 }" :md="{ span: 8 }">
          <el-form-item prop="phone_number">
            <MazPhoneNumberInput
              v-model="payload.phone_number"
              class="main__form--phone-number"
              default-country-code="AM"
              no-example
              no-validation
              :no-country-selector="isCountrySelector"
              countries-height="48"
              border-radius="0"
              width="320px"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="70">
        <el-col :xs="{ span: 24 }" :sm="{ span: 12 }" :md="{ span: 8 }">
          <el-form-item prop="surname">
            <el-input
              v-model="payload.surname"
              class="main__form--input"
              placeholder="Surname"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="{ span: 24 }" :sm="{ span: 12 }" :md="{ span: 8 }">
          <el-form-item prop="speciality_id">
            <el-select
              v-model="payload.speciality_id"
              class="main__form--input select"
              :filterable="true"
              placeholder="Speciality"
            >
              <el-option
                v-for="(item, index) in profileSuccessData.specialties"
                :key="`spec_${index}`"
                :value="item.id"
                :label="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="70">
        <el-col :xs="{ span: 24 }" :sm="{ span: 12 }" :md="{ span: 8 }">
          <el-form-item prop="lastname">
            <el-input
              v-model="payload.lastname"
              class="main__form--input"
              placeholder="Last Name"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="{ span: 24 }" :sm="{ span: 12 }" :md="{ span: 8 }">
          <el-form-item prop="timezone">
            <el-select
              v-model="payload.timezone"
              class="main__form--input select"
              placeholder="Timezone"
            >
              <el-option
                v-for="zone in timeZonesList"
                :key="`time_${zone.value}`"
                :value="zone.name"
                >{{ 'UTC(' + zone.value + ')' }}</el-option
              >
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="{ span: 24 }" :sm="{ span: 12 }" :md="{ span: 8 }">
          <el-form-item prop="cv" class="main__form--cv-item" label="CV">
            <div class="main__form--upload__cv-box">
              <el-upload
                v-model="payload.cv"
                class="main__form--upload"
                action="https://offiswot-api.arnologyapps.com/api/update-profile"
              >
                <el-button>
                  <div class="main__form--upload__cv">
                    <img
                      src="@/assets/images/icons/download-icon.svg"
                      alt="d"
                    />
                    <span class="text-primary">Upload CV</span>
                    <span class="hint">(.pdf)</span>
                  </div>
                </el-button>
              </el-upload>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="main__form--actions">
        <el-col :span="24" class="submit-button__box">
          <el-button
            class="submit-button"
            native-type="submit"
            :loading="isLoadingSubmit"
          >
            <span class="submit-button__text">{{
              isLoadingSubmit ? '' : 'Save'
            }}</span>
          </el-button>
        </el-col>
      </el-row>
    </el-form>
    <check-modal
      v-if="isOpenPINDialog"
      :dialog-visible="isOpenPINDialog"
      @close="isOpenPINDialog = false"
    ></check-modal>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { getCurrentInstance, onMounted } from 'vue'
import MazPhoneNumberInput from 'maz-ui/components/MazPhoneNumberInput'
import defaultAvatar from '~/assets/images/icons/default-user-icon.jpg'
import CheckModal from '@/components/auth/AccessCheckModal.vue'
import auth from '~/middleware/auth'
import settingsToken from '~/middleware/settingsToken'
import loginToken from '~/middleware/loginToken'
import useProfileStore from '@/stores/profile'
const instance = getCurrentInstance()

const profileStore = useProfileStore()
const {
  profileLoading,
  profileSuccessData,
  profileFailureData,
  isLoadingSubmit,
  editProfileData,
  editFailureData,
} = storeToRefs(profileStore)

auth()

const payload = ref({
  name: null,
  surname: null,
  lastname: null,
  date_of_birth: null,
  gender: null,
  phone_number: null,
  speciality_id: null,
  languages: null,
  experience: null,
  timezone: null,
  cv: null,
  avatar: null,
})

const languagesList = ref([
  { name: 'EN', id: 'en' },
  { name: 'RU', id: 'ru' },
  { name: 'HY', id: 'hy' },
])

const timeZonesList = ref([
  { value: '-12', name: 'Pacific/Kwajalein' },
  { value: '-11', name: 'Pacific/Samoa' },
  { value: '-10', name: 'Pacific/Honolulu' },
  { value: '-9', name: 'America/Juneau' },
  { value: '-8', name: 'America/Los_Angeles' },
  { value: '-7', name: 'America/Denver' },
  { value: '-6', name: 'America/Mexico_City' },
  { value: '-5', name: 'America/New_York' },
  { value: '-4', name: 'America/Caracas' },
  { value: '-3.5', name: 'America/St_Johns' },
  { value: '-3', name: 'America/Sao_Paulo' },
  { value: '-2', name: 'Atlantic/South_Georgia' },
  { value: '-1', name: 'Atlantic/Azores' },
  { value: '0', name: 'UTC' },
  { value: '+1', name: 'Europe/Paris' },
  { value: '+2', name: 'Europe/Helsinki' },
  { value: '+3', name: 'Europe/Moscow' },
  { value: '+3.5', name: 'Asia/Tehran' },
  { value: '+4', name: 'Asia/Yerevan' },
  { value: '+4.5', name: 'Asia/Kabul' },
  { value: '+5', name: 'Asia/Karachi' },
  { value: '+5.5', name: 'Asia/Calcutta' },
  { value: '+6', name: 'Asia/Dhaka' },
  { value: '+7', name: 'Asia/Bangkok' },
  { value: '+8', name: 'Asia/Hong_Kong' },
  { value: '+9', name: 'Asia/Tokyo' },
  { value: '+9.5', name: 'Australia/Adelaide' },
  { value: '+10', name: 'Australia/Sydney' },
  { value: '+11', name: 'Pacific/Noumea' },
  { value: '+12', name: 'Pacific/Auckland' },
])
const avatarSrc = ref(null)
const isOpenPINDialog = ref(null)
const avatarUrl = ref(defaultAvatar)
const config = useRuntimeConfig()

const setProfileData = (v) => {
  console.log(v)
  if (v?.user.avatar) {
    avatarUrl.value = `${config.public.env.serverUrl}${v.avatarPath}/${v.user.avatar}`
  } else {
    avatarUrl.value = defaultAvatar
  }
  for (const i in payload.value) {
    payload.value[i] = v?.user[i]
  }
  if (payload.value.phone_number) {
    payload.value.phone_number = payload.value.phone_number.toString()
  }
}

const isCountrySelector = ref(true)

const handleResize = () => {
  isCountrySelector.value = window.innerWidth < 400
  instance.update()
}

watch(editProfileData, (v) => {
  setProfileData(v)
  if (v.user.avatar) {
    avatarUrl.value = `${v.avatarPath}/${v.user.avatar}`
  } else {
    avatarUrl.value = defaultAvatar
  }
})

watch(profileFailureData, (v) => {})
watch(editFailureData, (v) => {})
watch(profileSuccessData, (v) => setProfileData(v))

onMounted(() => {
  if (!profileSuccessData.value) {
    profileStore.getProfile()
  } else {
    setProfileData(profileSuccessData.value)
  }
  isOpenPINDialog.value = loginToken()
  isOpenPINDialog.value = settingsToken()

  window.addEventListener('resize', handleResize)

  isCountrySelector.value = window.innerWidth < 400
})

const onAvatarUpload = (e, file) => {
  payload.value.avatar = file.raw
  avatarSrc.value = URL.createObjectURL(file.raw)
  profileStore.editProfile(payload.value)
}
const onSubmit = () => {
  profileStore.editProfile(payload.value)
}
</script>

<style scoped lang="scss">
.main {
  min-height: calc(100vh - 286px);
  padding: 0;
  background-color: #f5f7fb !important;
  padding-top: 50px;
  padding-bottom: 50px;
  &__title {
    font-size: 20px;
    font-weight: 600;
    color: $ov-text--title;
    margin-bottom: 41px;
    &__div {
      display: flex;
      gap: 20px;
    }
    &__span {
      cursor: pointer;
    }
  }
  &__subtitle {
    &__span {
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
      color: #717a7f;
    }
  }
  &__form {
    min-height: calc(100vh - 286px);
    display: flex;
    flex-direction: column;
    width: 100%;
    border-left: 1px solid #d0c9d6;
    padding: 0 45px 21px 45px;
    .el-input__inner {
      min-width: 100% !important;
      max-width: 320px !important;
      height: 48px !important;
    }
    &-item {
      min-width: 100%;
      max-width: 320px;
      height: 48px;
      margin: 0 !important;
    }
    .el-input--suffix {
      min-width: 100%;
      max-width: 320px;
      height: 48px !important;
      margin: 0 !important;
    }
    &--picture {
      display: flex;
      margin-bottom: 32px;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img {
        width: 119px;
        height: 119px;
        border-radius: 50%;
        object-fit: cover;
      }
    }
    &--upload {
      display: flex;
      justify-content: center;
      width: 115px;
      button {
        color: $ov-text--aqua;
        border: none;
        background-color: inherit;
        &:hover {
          text-decoration: underline;
        }
      }
      &__cv {
        display: flex;
        align-items: center;
        gap: 0 4px;
      }
      &__cv-box {
        display: flex;
        justify-content: center;
      }
    }
    &--radio-group {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      &__item {
        flex-basis: 30%;
      }
      .el-radio__inner {
        width: 24px;
        height: 24px;
        border: 2px solid #a5affb !important;
      }
      .el-radio__input.is-checked .el-radio__inner {
        background-color: white;
        border: 2px solid $ov-primary--light !important;

        &::after {
          background-color: $ov-primary--light;
          width: 14px;
          height: 14px;
        }
      }
      .el-radio__label {
        font-weight: 14px;
        color: #231f20;
      }
    }
    &--input {
      position: relative;
      min-width: 100% !important;
      max-width: 320px !important;
      height: 48px !important;

      &.date-picker {
        margin-bottom: 14px;
      }
      &.el-select {
        height: 48px !important;
        .el-input__suffix {
          cursor: pointer;
          i {
            color: black;
            &::before {
              content: '\e78f';
            }
          }
          &-inner {
            margin-right: 0 !important;
          }
        }
      }
      .el-input__inner {
        padding-left: 16px;
        border-radius: 6px;
        border-color: $ov-border--light;
        padding-right: 45px;
        &:focus,
        &:hover {
          border-color: $ov-primary;
        }
        &::placeholder {
          color: $ov-placeholder;
        }
      }
      .el-input__suffix {
        padding-right: 8px;
        cursor: pointer;
      }
      .el-input__prefix {
        width: max-content;
        position: absolute;
        left: 85%;
      }
    }
    &--phone-number {
      border-radius: 0;
      min-width: 100%;
      max-width: 320px;
      input {
        border-color: $ov-border--light;
        &::placeholder {
          color: transparent;
        }
      }
      .input-tel__label,
      .country-selector__label {
        display: none;
      }
      .input-tel__input {
        padding-top: 0 !important;
      }
      .select-country-container {
        min-width: 95px;
        max-width: 95px;
      }
      .country-selector__input {
        padding-top: 0 !important;
        padding-left: 33px !important;
        font-size: 15px;
        font-family: 'Montserrat', sans-serif;
      }
      .country-selector__toggle {
        top: calc(50% - 7px);
        width: 12px;
        right: 11px;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        svg {
          display: none;
        }
      }
    }
    &--actions {
      margin-top: 30px;
    }
    &--cv-item {
      .el-form-item__label {
        display: flex;
        justify-content: center;
      }
    }
  }
  .hint {
    font-size: 12px;
    color: $ov-text--subtitle;
  }
  .go-back {
    &__box {
      display: flex;
      align-items: center;
      gap: 12.5px;
    }
    &__text {
      color: $ov-primary--light;
      transition: 0.2s;
      font-size: 17px;
      font-weight: 500;
      cursor: pointer;
      &:hover {
        color: $ov-primary;
      }
    }
    &__icon {
      width: 9.5px;
      cursor: pointer;
    }
  }
  .submit-button {
    background: $ov-primary;
    color: white;
    text-transform: uppercase;
    width: 220px;
    height: 48px;
    padding: 0;
    border-radius: 6px;
    span {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &__text {
      width: 100%;
      display: flex;
      font-size: 17px;
      font-weight: 700;
      justify-content: center !important;
    }
    &__box {
      display: flex;
      justify-content: flex-start;
    }
  }
}
.m-select {
  width: 100px !important;
  font-size: 14px !important;
}

@media (max-width: 770px) {
  .main {
    padding-left: 0;
  }
}
</style>
