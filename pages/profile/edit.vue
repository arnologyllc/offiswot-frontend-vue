<template>
  <div v-loading.fullscreen.lock="profileLoading" class="main">
    <el-form
      v-if="profileSuccessData"
      ref="editForm"
      class="main__form"
      hide-required-asterisk
      :model="payload"
    >
      <el-row>
        <el-col :span="24" class="main__title">Complete your profile</el-col>
      </el-row>
      <el-row :gutter="70">
        <el-col :span="8" class="main__form--picture">
          <img
            :src="`${profileSuccessData.avatarPath}/${profileSuccessData.user.avatar}`"
            alt="avatar"
          />
          <el-upload class="main__form--upload">
            <el-button size="small" type="text">Upload picture</el-button>
          </el-upload>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="date_of_birth">
            <el-date-picker
              v-model="payload.date_of_birth"
              class="main__form--input date-picker"
              type="date"
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
        <el-col :span="8">
          <el-form-item prop="languages">
            <el-select
              v-model="payload.languages"
              multiple
              class="main__form--input select"
              placeholder="Languages"
            ></el-select>
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
        <el-col :span="8">
          <el-form-item prop="name">
            <el-input
              v-model="payload.name"
              class="main__form--input"
              placeholder="Name"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
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
        <el-col :span="8">
          <el-form-item prop="surname">
            <el-input
              v-model="payload.surname"
              class="main__form--input"
              placeholder="Surname"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="speciality_id">
            <el-select
              v-model="payload.speciality_id"
              multiple
              class="main__form--input select"
              placeholder="Speciality"
            ></el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="70">
        <el-col :span="8">
          <el-form-item prop="lastname">
            <el-input
              v-model="payload.lastname"
              class="main__form--input"
              placeholder="Last Name"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="timezone">
            <el-select
              v-model="payload.timezone"
              multiple
              class="main__form--input select"
              placeholder="Timezone"
            ></el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
        <el-upload class="main__form--upload">
          <el-button type="text">
              <div class="main__form--upload__cv">
                <img src="@/assets/images/icons/download-icon.svg" alt="d">
                <span class="text-primary">Upload CV</span>
                <span class="hint">(.pdf)</span>
              </div>
          </el-button>
        </el-upload>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import VuePhoneNumberInput from 'vue-phone-number-input'
import 'vue-phone-number-input/dist/vue-phone-number-input.css'

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
      },
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
    ]),
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
  created() {
    this.getProfile()
  },
  methods: {
    ...mapActions('profile', ['getProfile']),
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
  }
  &__form {
    min-height: calc(100vh - 286px);
    display: flex;
    flex-direction: column;
    width: 100%;
    border-left: 1px solid #d0c9d6;
    padding: 0 45px 21px 45px;

    &--picture {
      margin-bottom: 32px;
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
    }
    &--radio-group {
      display: flex;
      justify-content: space-between;
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
  }
  .hint {
      font-size: 12px;
      color: $ov-text--subtitle;
  }
}
</style>
