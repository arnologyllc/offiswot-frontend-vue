<template>
  <el-dialog
    v-model="props.dialogVisible"
    width="80%"
    height="500px"
    :close-on-click-modal="false"
    text-align="center"
    :show-close="false"
    top="150px"
    class="accept__modal"
    @close="$emit('close')"
  >
    <template #header>
      <div class="main__form--title" style="margin-bottom: 20px">
        Fill in the required information to join the workspace.
      </div>
    </template>

    <el-form
      ref="editForm"
      class="main__form"
      hide-required-asterisk
      label-position="top"
      style="width: inherit !important"
      :model="payload"
    >
      <el-row>
        <el-col :xs="{ span: 24 }" :sm="{ span: 12 }" :md="{ span: 8 }" class="main__form--picture">
          <el-form-item prop="avatar">
            <img :src="avatarUrl" alt="avatar" class="avatar" widht="138" height="138" />

            <el-dropdown class="el-upload--text">
              <img src="~/assets/images/icons/edit-button.svg" alt="edit" class="avatar-edit_button" />

              <template #dropdown>
                <el-dropdown-menu class="avatar-edit_actions">
                  <el-upload
                    v-model="payload.avatar"
                    :show-file-list="false"
                    class="main__form--upload"
                    action="#"
                    accept="image/*"
                    :on-success="onAvatarUpload"
                  >
                    <el-dropdown-item
                      class="avatar-edit_actions-element"
                      @mouseover="hoveringStart"
                      @mouseout="hoveringEnd"
                    >
                      <span :class="isHovered"> Edit </span>
                    </el-dropdown-item>
                  </el-upload>
                  <el-dropdown-item
                    class="avatar-edit_actions-element"
                    @mouseover="hoveringStart"
                    @mouseout="hoveringEnd"
                  >
                    <span :class="isHovered" @click="handleDeleteAvatar"> Delete </span>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </el-form-item>
          <div class="main__form--info">
            <span v-if="payload.full_name || payload.display_name" class="main__form--info__title">{{
              payload.display_name ? payload.display_name : payload.full_name
            }}</span>
            <span v-if="payload.email" class="main__form--info__subtitle">{{ payload.email }}</span>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="70">
        <el-col :xs="{ span: 24 }" :sm="{ span: 12 }" :md="{ span: 8 }">
          <el-form-item prop="name">
            <el-input ref="full_name" v-model="payload.full_name" class="main__form--input" placeholder="Full Name">
              <template #suffix>
                <div v-if="payload.full_name" style="position: relative" @click="focusElement('full_name')">
                  <span for="full_name" class="custom_placeholder"> Full Name </span>
                </div>
              </template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="{ span: 24 }" :sm="{ span: 12 }" :md="{ span: 8 }">
          <el-form-item prop="phone_number">
            <MazPhoneNumberInput
              ref="phoneNumber"
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
            <span v-if="requiredFields.phone_number" class="requiredField">*</span>
          </el-form-item>
        </el-col>
        <el-col :xs="{ span: 24 }" :sm="{ span: 12 }" :md="{ span: 8 }">
          <el-form-item prop="experience">
            <el-input
              ref="experience"
              v-model="payload.experience"
              type="number"
              class="main__form--input"
              placeholder="Years of experience"
            >
              <template #suffix>
                <div v-if="payload.experience" style="position: relative" @click="focusElement('experience')">
                  <span for="experience" class="custom_placeholder"> Years of experience </span>
                </div>
              </template>
            </el-input>
            <span v-if="requiredFields.experience" class="requiredField">*</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="70">
        <el-col :xs="{ span: 24 }" :sm="{ span: 12 }" :md="{ span: 8 }">
          <el-form-item prop="display_name">
            <el-input
              ref="display_name"
              v-model="payload.display_name"
              class="main__form--input"
              placeholder="Display Name"
            >
              <template #suffix>
                <div v-if="payload.display_name" style="position: relative" @click="focusElement('display_name')">
                  <span for="display_name" class="custom_placeholder"> Display Name </span>
                </div>
              </template>
            </el-input>
            <span v-if="requiredFields.display_name" class="requiredField">*</span>
          </el-form-item>
        </el-col>
        <el-col :xs="{ span: 24 }" :sm="{ span: 12 }" :md="{ span: 8 }">
          <el-form-item prop="languagesList">
            <el-select
              ref="languagesList"
              v-model="payload.languages"
              multiple
              class="main__form--input select"
              placeholder="Languages"
              :filterable="true"
            >
              <el-option
                v-for="(item, index) in languages"
                :key="`lang_${index}`"
                :value="item.id"
                :label="item.name"
              ></el-option>
            </el-select>
            <span v-if="requiredFields.languages" class="requiredField">*</span>
          </el-form-item>
        </el-col>
        <el-col :xs="{ span: 24 }" :sm="{ span: 12 }" :md="{ span: 8 }">
          <el-form-item prop="cv" class="main__form--cv-item">
            <div class="main__form--upload__cv-box">
              <el-upload
                v-model="payload.cv"
                :show-file-list="false"
                class="main__form--upload"
                action="#"
                :on-success="onCVUpload"
              >
                <span> </span>
                <el-button class="main__form--upload__cv">
                  <div>
                    <div>
                      <span class="text-primary">{{ payload.cv ? payload.cv : '' }}</span>
                    </div>
                    <div>
                      <img src="@/assets/images/icons/download-icon.svg" alt="d" />

                      <span class="text-primary">Upload CV</span>
                      <span class="hint">(.pdf)</span>
                    </div>
                  </div>
                </el-button>
              </el-upload>
            </div>
            <span v-if="requiredFields.cv" class="requiredField">*</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="70">
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
            <span v-if="requiredFields.date_of_birth" class="requiredField">*</span>
          </el-form-item>
        </el-col>
        <el-col :xs="{ span: 24 }" :sm="{ span: 12 }" :md="{ span: 8 }">
          <el-form-item prop="timezone">
            <el-select
              v-model="payload.timezone"
              class="main__form--input select"
              placeholder="Timezone"
              :filterable="true"
            >
              <el-option
                v-for="zone in timeZonesList"
                :key="`time_${zone.VALUE}`"
                :value="zone.NAME.replace(', ', '/')"
              >
                {{ 'GMT' + (zone.VALUE === '0' ? '+' : '') + zone.VALUE + ' (' + zone.NAME + ')' }}
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="70">
        <el-col
          :xs="{ span: 24 }"
          :sm="{ span: 12 }"
          :md="{ span: 8 }"
          style="display: flex; align-items: center; justify-content: center"
        >
          <el-form-item prop="gender">
            <el-radio-group v-model="payload.gender" class="main__form--radio-group">
              <el-radio label="male">Male</el-radio>
              <el-radio label="female">Female</el-radio>
              <el-radio label="other">Other</el-radio>
            </el-radio-group>
            <span v-if="requiredFields.gender" class="requiredField">*</span>
          </el-form-item>
        </el-col>
        <el-col :xs="{ span: 24 }" :sm="{ span: 12 }" :md="{ span: 8 }">
          <el-form-item prop="speciality_id">
            <el-select
              v-model="payload.speciality"
              class="main__form--input select"
              :filterable="true"
              placeholder="Speciality"
            >
              <el-option
                v-for="(item, index) in profileSuccessData?.specialities"
                :key="`spec_${index}`"
                :value="item.id"
                :label="item.name"
              ></el-option>
            </el-select>
            <span v-if="requiredFields.speciality" class="requiredField">*</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" class="edit-alert">
          <span class="edit-alert--title">
            You will need to fill in the mandatory information within 24 hours to comply with workspace rules.
          </span>
          <span class="edit-alert--subtitle">If you fail to do so you will be suspended.</span>
        </el-col>
      </el-row>
      <el-row class="main__form--actions">
        <el-col :span="12" class="submit-button__box">
          <el-button class="submit-button" :loading="isLoadingSubmit" @click="submitEdit">
            <span class="submit-button__text">{{ isLoadingSubmit ? '' : 'Save' }}</span>
          </el-button>
        </el-col>

        <el-col :span="12" class="skip-button__box">
          <el-button class="skip-button" :loading="isLoadingSubmit" @click="skipEdit">
            <span class="skip-button__text"
              >SKIP <span style="display: inline-block; transform: scale(0.9, 2)">></span></span
            >
          </el-button>
        </el-col>
      </el-row>
    </el-form>
  </el-dialog>
</template>

<script setup>
import { getCurrentInstance, onMounted, onBeforeMount } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'

import MazPhoneNumberInput from 'maz-ui/components/MazPhoneNumberInput'

import useProfileStore from '@/stores/profile'

import timeZonesList from '@/data/timezones.json'

import defaultAvatar from '~/assets/images/icons/default-user-icon.jpg'

const props = defineProps({
  dialogVisible: {
    type: Boolean,
    required: false,
  },
  requiredFields: {
    type: Object,
    required: true,
  },
})

definePageMeta({ layout: 'auth' })

const profileStore = useProfileStore()

const { profileSuccessData } = storeToRefs(profileStore)

const instance = getCurrentInstance()
const $route = useRoute()

// Global
const payload = ref({
  full_name: null,
  display_name: null,
  lastname: null,
  date_of_birth: null,
  gender: null,
  phone_number: null,
  speciality: null,
  languages: null,
  experience: null,
  timezone: null,
  cv: null,
  avatar: null,
  workspace_id: null,
})

// Step 4

const config = useRuntimeConfig()
const isHovered = ref(false)
const isCountrySelector = ref(true)
const avatarSrc = ref(null)
const fullName = ref(null)
const avatarUrl = ref(defaultAvatar)
const requiredFields = ref({
  display_name: false,
  avatar: false,
  gender: false,
  languages: false,
  phone_number: false,
  experience: false,
  date_of_birth: false,
  speciality: false,
  cv: false,
})

const languages = ref([
  { name: 'EN', id: 'EN' },
  { name: 'RU', id: 'RU' },
  { name: 'HY', id: 'HY' },
])

// Edit profile functions
const submitEdit = () => {
  const isValid = []
  for (const i in requiredFields.value) {
    if (i === 'languages') continue
    if (requiredFields.value[i]) isValid.push(payload.value[i])
  }
  if (isValid.every((elem) => elem)) {
    const data = payload.value
    data.languagesList = data.languages
    profileStore.editProfile(data)
  }
}

const skipEdit = () => {
  navigateTo('/')
}

const setProfileData = (v) => {
  if (v?.user.email) {
    payload.value.email = v.user.email
  }
  if (v?.user.full_name) {
    fullName.value = v.user.full_name
  }
  if (v?.user.avatar) {
    avatarUrl.value = v.avatarPath.includes(config.public.env.serverUrl)
      ? `${v.avatarPath}/${v.user.avatar}`
      : `${config.public.env.serverUrl}${v.avatarPath}/${v.user.avatar}`
  } else {
    avatarUrl.value = defaultAvatar
  }
  for (const i in payload.value) {
    if (!isNaN(v?.user[i]) && v?.user[i] && i !== 'workspace_id') {
      payload.value[i] = +v?.user[i]
    } else {
      payload.value[i] = v?.user[i]
    }
  }
  if (v?.user.languages) {
    payload.value.languages = v?.user.languages.split(',')
  }
  if (payload.value.phone_number) {
    payload.value.phone_number = payload.value.phone_number.toString()
  }
}

// Global helpers
const focusElement = (elem) => {
  instance.refs[elem].focus()
}

const handleResize = () => {
  isCountrySelector.value = window.innerWidth < 400
  instance.update()
}

// Update Profile Helpers
const onAvatarUpload = (e, file) => {
  payload.value.avatar = file.raw
  avatarSrc.value = URL.createObjectURL(file.raw)
  profileStore.editProfile(payload.value)
}

const handleDeleteAvatar = () => {
  payload.value.avatar = 'default'
  avatarSrc.value = 'default'
  profileStore.editProfile(payload.value)
}

const hoveringStart = () => {
  isHovered.value = 'hovered'
}
const hoveringEnd = () => {
  isHovered.value = false
}

onBeforeMount(() => {
  setProfileData(profileSuccessData.value)
})

onMounted(() => {
  payload.value.workspace_id = $route.params.id
  for (const i in props.requiredFields) {
    requiredFields.value[i] = true
  }
  window.addEventListener('resize', handleResize)
  isCountrySelector.value = window.innerWidth < 400
})

watch(profileSuccessData, (v) => {
  if (v) {
    setProfileData(v)
  }
})
</script>

<style scoped lang="scss">
.main {
  padding: 0;
  padding-top: 20px;
  padding-bottom: 50px;
  border-radius: 20px 0 0 0;
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
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0 45px 21px 45px;
    &--actions {
      justify-content: space-between;
      align-items: center;
    }
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
      img {
        width: 119px;
        height: 119px;
        border-radius: 20px;
        object-fit: cover;
        background-color: #999;
      }
    }
    &--info {
      padding-left: 16px;
      display: flex;
      flex-direction: column;
      text-align: left;
      &__title {
        font-weight: 500;
        font-size: 16px;
        line-height: 20px;
        color: #2c3a9f;
      }
      &__subtitle {
        font-weight: 400;
        font-size: 12px;
        line-height: 15px;
        color: #717a7f;
      }
    }
    &--upload {
      display: flex;
      width: 100%;

      button {
        color: $ov-text--aqua;
        border: none;
        background-color: inherit;
        padding: 0;
        width: 100%;
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
        width: 100%;
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

.avatar-edit_button {
  background: #ffffff !important;
  width: 22px !important;
  height: 22px !important;
}

.el-upload--text {
  position: absolute !important;
  cursor: pointer !important;
  bottom: -6px !important;
  right: -6px !important;
  width: 33px !important;
  height: 33px !important;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #e5e7fa !important;
  background: #ffffff !important;
  border-radius: 50% !important;
}

.avatar-edit {
  &_actions {
    .main__form--upload {
      .el-upload--text {
        width: 100%;
      }
    }
    &-element {
      background-color: #ffffff;
      width: 116px;
      padding: 0 !important;
      &:hover {
        width: 100%;
        span {
          display: block;
          padding: 0;
          margin: 0;
          color: #3f3356 !important;
        }
      }
    }
    &-element > span {
      text-align: center;
      display: block;
      font-size: 15px;
      font-weight: 400;
      width: 80px;
      color: #3f3356 !important;
    }
  }
}
.avatar-edit_actions-element {
  .hovered {
    color: #d0c9d6 !important;
  }
}

.el-popper__arrow {
  display: none !important;
}

.main {
  &__form {
    .el-row {
      min-width: 100% !important;
    }
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
    &--upload {
      &__cv {
        border: none;
        background-color: inherit;
      }
    }
    &--phone-number {
      width: 100%;
    }
    &--input {
      &.select {
        width: 100%;
      }
    }
    &--info {
      padding-left: 16px;
      display: flex;
      flex-direction: column;
      &__title {
        font-weight: 500;
        font-size: 16px;
        line-height: 20px;
        color: #2c3a9f;
      }
      &__subtitle {
        font-weight: 400;
        font-size: 12px;
        line-height: 15px;
        color: #717a7f;
      }
    }
    &--picture {
      display: flex;
      img {
        width: 119px;
        height: 119px;
        border-radius: 20px;
        object-fit: cover;
        background-color: #999;
      }
    }
    &--actions {
      display: flex;
      align-items: center;
      gap: 20px;
    }
  }
}

.avatar {
  & > .el-form-item__content {
    align-items: left !important;
  }
}

.submit-button__box {
  flex: none;
  & .submit-button {
    margin-top: 0;
  }
}

.skip-button {
  border: none;
  background-color: inherit;
  &__text {
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    color: #717a7f;
  }
}

.avatar-edit_button {
  background: #ffffff !important;
  width: 22px !important;
  height: 22px !important;
}
.avatar-edit {
  &_actions {
    .main__form--upload {
      .el-upload--text {
        width: 100%;
      }
    }
    &-element {
      background-color: #ffffff;
      width: 116px;
      padding: 0 !important;
      &:hover {
        width: 100%;
        span {
          display: block;
          padding: 0;
          margin: 0;
          color: #3f3356 !important;
        }
      }
    }
    &-element > span {
      text-align: center;
      display: block;
      font-size: 15px;
      font-weight: 400;
      width: 80px;
      color: #3f3356 !important;
    }
  }
}
.avatar-edit_actions-element {
  .hovered {
    color: #d0c9d6 !important;
  }
}

.el-upload--text {
  position: absolute !important;
  cursor: pointer !important;
  bottom: -6px !important;
  right: -6px !important;
  width: 33px !important;
  height: 33px !important;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #e5e7fa !important;
  background: #ffffff !important;
  border-radius: 50% !important;
}

.edit-alert {
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  gap: 6px;
  margin-bottom: 40px;
  &--title {
    color: #ff647c;
    font-size: 14px;
    font-weight: 500;
    line-height: 17px;
  }
  &--subtitle {
    color: #6d7075;
    font-size: 12px;
    font-weight: 500;
    line-height: 14px;
  }
}
.requiredField {
  position: absolute;
  color: red;
  top: -18px;
  z-index: 99999;
  right: 0;
}
</style>
