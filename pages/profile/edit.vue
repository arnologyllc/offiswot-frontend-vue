<template>
  <div v-loading.fullscreen.lock="profileLoading" class="main">
    <el-form
      v-if="profileSuccessData"
      ref="editForm"
      class="main__form"
      hide-required-asterisk
      label-position="top"
      :model="payload"
      @submit.native.prevent="onSubmit"
    >
      <el-row>
        <el-col :span="12">
          <el-button type="text" @click="$router.push('/profile')">
            <div class="main__title">
              <img
                src="@/assets/images/icons/chevron-dark-icon.svg"
                class="go-back__icon"
                alt=""
              />
              <span :span="24" class="main__title__span"
                >Complete your profile</span
              >
            </div>
          </el-button>
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
              :on-change="onAvatarUpload"
            >
              <el-button size="small" type="text">Upload picture</el-button>
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :xs="{ span: 24 }" :sm="{ span: 12 }" :md="{ span: 8 }">
          <el-form-item prop="date_of_birth">
            <el-date-picker
              v-model="payload.date_of_birth"
              class="main__form--input date-picker"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
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
        <el-col
          :span="8"
          :xs="{ span: 24 }"
          :sm="{ span: 12 }"
          :md="{ span: 8 }"
        >
          <el-form-item prop="name">
            <el-input
              v-model="payload.name"
              class="main__form--input"
              placeholder="Name"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col
          :span="8"
          :xs="{ span: 24 }"
          :sm="{ span: 12 }"
          :md="{ span: 8 }"
        >
          <el-form-item prop="phone_number">
            <phone
              v-model="payload.phone_number"
              color="#4156F6"
              valid-color="#007D85"
              error-color="#ff0000"
              class="main__form--phone-number"
              default-country-code="AM"
            ></phone>
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
                <el-button type="text">
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
        <el-col :span="12">
          <el-button type="text" @click="$router.push('/profile')">
            <div class="go-back__box">
              <img
                src="@/assets/images/icons/chevron-dark-icon.svg"
                class="go-back__icon"
                alt=""
              />
              <span class="go-back__text">Back</span>
            </div>
          </el-button>
        </el-col>
        <el-col :span="12" class="submit-button__box">
          <el-button
            class="submit-button"
            native-type="submit"
            :loading="isLoadingSubmit"
          >
            <span class="submit-button__text">Save</span>
          </el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import VuePhoneNumberInput from 'vue-phone-number-input'
import 'vue-phone-number-input/dist/vue-phone-number-input.css'
import defaultAvatar from '~/assets/images/icons/default-user-icon.jpg'

export default {
  name: 'EditProfile',
  components: {
    phone: VuePhoneNumberInput,
  },
  data() {
    return {
      payload: {
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
      },
      languagesList: [
        { name: 'EN', id: 'en' },
        { name: 'RU', id: 'ru' },
        { name: 'HY', id: 'hy' },
      ],
      timeZonesList: [
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
      ],
      avatarSrc: null,
    }
  },
  head() {
    return {
      title: 'Edit Profile',
    }
  },
  computed: {
    ...mapGetters('profile', [
      'profileLoading',
      'profileSuccessData',
      'profileFailureData',
      'isLoadingSubmit',
      'editProfileData',
      'editFailureData',
    ]),

    avatarUrl() {
      if (this.profileSuccessData) {
        if (this.profileSuccessData.user.avatar) {
          return `${process.env.serverUrl}${this.profileSuccessData.avatarPath}/${this.profileSuccessData.user.avatar}`
        }
      }
      return defaultAvatar
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
    editFailureData(v) {
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
    profileSuccessData() {
      for (const i in this.payload) {
        this.payload[i] = this.profileSuccessData.user[i]
      }
      if (this.payload.phone_number) {
        this.payload.phone_number = this.payload.phone_number.toString()
      }
    },
    editProfileData(v) {
      if (v) {
        this.$message.success('Success!')
      }
    },
  },
  created() {
    this.getProfile()
  },
  methods: {
    ...mapActions('profile', ['getProfile', 'editProfile']),
    onSubmit() {
      this.editProfile(this.payload)
    },
    onAvatarUpload(e) {
      this.payload.avatar = e.raw
      this.avatarSrc = URL.createObjectURL(e.raw)
    },
  },
}
</script>

<style scoped lang="scss">
.main {
  min-height: calc(100vh - 286px);
  padding: 104px 169px 87px 143px;
  &__title {
    font-size: 20px;
    font-weight: 600;
    color: $ov-text--title;
    margin-bottom: 4px;
    margin-bottom: 41px;
    display: flex;
    gap: 20px;
  }
  &__form {
    min-height: calc(100vh - 286px);
    display: flex;
    flex-direction: column;
    width: 100%;
    border-left: 1px solid #d0c9d6;
    padding: 0 45px 21px 45px;

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
      ::v-deep {
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
    }
    &--input {
      width: 100%;
      position: relative;
      box-shadow: 0px 7px 64px rgba(0, 0, 0, 0.07);

      &.date-picker {
        margin-bottom: 14px;
      }
      &.select {
        ::v-deep {
          .el-input__suffix {
            padding-right: 8px;
            cursor: pointer;
            i {
              color: black;
              &::before {
                content: '\e78f';
              }
            }
          }
        }
      }

      ::v-deep {
        .el-input__inner {
          padding-left: 16px;
          height: 48px;
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
    }
    &--phone-number {
      box-shadow: 0px 7px 64px rgba(0, 0, 0, 0.07);
      ::v-deep {
        input {
          height: 48px;
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
          background-image: url('../../assets/images/icons/arrow-down-icon.svg');
          background-size: 100% 100%;
          background-repeat: no-repeat;
          svg {
            display: none;
          }
        }
      }
    }
    &--actions {
      margin-top: 30px;
    }
    &--cv-item {
      ::v-deep {
        .el-form-item__label {
          display: flex;
          justify-content: center;
        }
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
      &:hover {
        color: $ov-primary;
      }
    }
    &__icon {
      width: 9.5px;
    }
  }
  .submit-button {
    background: $ov-primary;
    color: white;
    text-transform: uppercase;
    width: 220px;
    height: 48px;
    padding: 0;
    padding-right: 8px;
    border-radius: 6px;
    ::v-deep span {
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
      justify-content: flex-end;
    }
  }
}
</style>
