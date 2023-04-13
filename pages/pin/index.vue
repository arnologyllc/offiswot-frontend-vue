<template>
  <div class="main">
    <div class="main__form">
      <div class="main__form--title">Set PIN</div>
      <div class="main__form--subtitle">
        Fill in the fields to set your PIN.
      </div>
      <el-form
        ref="pinForm"
        class="main__form--box"
        hide-required-asterisk
        :model="payload"
        :rules="rules"
        @submit.native.prevent="onSubmit"
      >
        <el-form-item prop="pin" class="password-form-item">
          <el-input
            id="pin"
            ref="pin"
            v-model="payload.pin"
            :type="showPIN ? 'text' : 'password'"
            class="main__form--box__input"
            placeholder="Enter PIN"
            @blur="validateField('pin')"
          >
            <div
              v-if="payload.pin"
              slot="suffix"
              style="position: relative"
              @click="focusElement('pin')"
            >
              <span for="pin" class="pin_placeholder"> PIN </span>
            </div>
            <template slot="suffix">
              <img
                :class="errors.pin.value ? 'eye_icon' : ''"
                :src="
                  require(`@/assets/images/icons/eye-${
                    showPIN ? 'close' : 'open'
                  }-icon.svg`)
                "
                alt="eye_icon"
                @click="showPIN = !showPIN"
              />
            </template>

            <template v-if="errors.pin.value" slot="suffix">
              <img
                src="@/assets/images/icons/error.svg"
                alt=""
                class="error_icon"
                @mouseover="showError('pin')"
                @mouseout="hideError('pin')"
              />
            </template>
          </el-input>

          <template slot="error">
            <div v-if="errors.pin.isShow" class="el-form-item__error">
              <span v-html="errors.pin.value"></span>
            </div>
            <div></div>
          </template>
        </el-form-item>
        <el-form-item prop="pin_confirmation" class="password-form-item">
          <el-input
            id="pin_confirmation"
            ref="pin_confirmation"
            v-model="payload.pin_confirmation"
            :type="showPINConfirmation ? 'text' : 'password'"
            class="main__form--box__input"
            placeholder="Repeat PIN"
            @blur="validateField('pin_confirmation')"
          >
            <div
              v-if="payload.pin_confirmation"
              slot="suffix"
              style="position: relative"
              @click="focusElement('pin_confirmation')"
            >
              <span for="password" class="repeat-placeholder">
                PIN Confirmation
              </span>
            </div>
            <template slot="suffix">
              <img
                :class="errors.pin_confirmation.value ? 'eye_icon' : ''"
                :src="
                  require(`@/assets/images/icons/eye-${
                    showPINConfirmation ? 'close' : 'open'
                  }-icon.svg`)
                "
                alt="eye_icon"
                @click="showPINConfirmation = !showPINConfirmation"
              />
            </template>

            <template v-if="errors.pin_confirmation.value" slot="suffix">
              <img
                src="@/assets/images/icons/error.svg"
                alt=""
                class="error_icon"
                @mouseover="showError('pin_confirmation')"
                @mouseout="hideError('pin_confirmation')"
              />
            </template>
          </el-input>

          <template slot="error">
            <div
              v-if="errors.pin_confirmation.isShow"
              class="el-form-item__error"
            >
              <span v-html="errors.pin_confirmation.value"></span>
            </div>
            <div></div>
          </template>
        </el-form-item>
        <el-button
          class="submit-button"
          native-type="submit"
          :loading="isLoadingSubmit"
        >
          <span class="submit-button__text">Save</span>
        </el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'PINPage',
  layout: 'default',
  data() {
    const validatePIN = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the PIN again'))
      } else if (value !== this.payload.pin) {
        callback(new Error('PIN and confirm PIN do not match'))
      } else {
        callback()
      }
    }
    return {
      //  Request Body
      payload: {
        pin: null,
        pin_confirmation: null,
      },

      //  Show Password/Not Show Password
      showPIN: false,
      showPINConfirmation: false,

      errors: {
        pin: {
          value: '',
          isShow: false,
        },
        pin_confirmation: {
          value: '',
          isShow: false,
        },
      },

      //  Validation Rules
      rules: {
        pin: [
          {
            required: true,
            message: 'This field is required.',
            trigger: 'blur',
          },
        ],
        pin_confirmation: [
          {
            required: true,
            message: 'This field is required.',
            trigger: 'blur',
          },
          { validator: validatePIN, trigger: 'blur' },
        ],
      },
    }
  },
  head() {
    return {
      title: 'setPIN',
    }
  },
  computed: {
    ...mapGetters('profile', [
      'isLoadingSubmit',
      'editProfileData',
      'editFailureData',
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
    },
    editProfileData(v) {
      if (v) {
        this.$message.success('Success!')
        this.$router.push('/')
      }
    },
  },
  mounted() {
    if (this.$route.query.email) {
      this.payload.email = this.$route.query.email
    }
  },
  methods: {
    ...mapActions('profile', ['editProfile']),
    onSubmit() {
      this.editProfile(this.payload)
    },
    focusElement(elem) {
      this.$refs[elem].focus()
    },

    validateField(fieldName) {
      this.$refs.pinForm.validateField(fieldName, (errorMessage) => {
        this.errors[fieldName].value = errorMessage
      })
    },
    showError(fieldName) {
      this.errors[fieldName].isShow = true
    },
    hideError(fieldName) {
      this.errors[fieldName].isShow = false
    },
  },
}
</script>

<style scoped lang="scss">
.main {
  width: 100%;
  display: flex;
  position: relative;
  height: 100%;
  padding: 100px 0 150px 18%;
  width: 100%;

  &__form {
    width: 390px;
    &--title {
      font-size: 20px;
      font-weight: 600;
      color: $ov-text--title;
      margin-bottom: 4px;
    }

    &--subtitle {
      font-size: 14px;
      color: $ov-text--subtitle;
      margin-bottom: 40px;
    }

    &--box {
      &__input {
        box-shadow: 0px 7px 64px rgba(0, 0, 0, 0.07);
        ::v-deep {
          .el-input__inner {
            height: 48px;
            padding: 0 15px;
            border-radius: 6px;
            border-color: $ov-border--light;

            &:focus,
            &:hover {
              border-color: $ov-primary;
            }
            &::placeholder {
              color: $ov-placeholder;
            }
          }
          .el-input__prefix,
          .el-input__suffix {
            display: grid;
            align-items: center;
          }

          .el-input__prefix {
            padding-left: 8px;
          }
          .el-input__suffix {
            padding-right: 8px;
            cursor: pointer;
            &-inner {
              display: grid;
            }
          }
        }
      }
    }
  }
}

.pin_placeholder {
  position: relative;
  top: 0;
  width: 50px;
  font-size: 12px;
  font-weight: 400;
  color: #717a7f;
  animation: showPINPlaceholder 0.3s;
  animation-fill-mode: forwards;
}

.repeat-placeholder {
  position: relative;
  top: 0;
  font-size: 12px;
  font-weight: 400;
  color: #717a7f;
  animation: showRepeatPlaceholder 0.3s;
  animation-fill-mode: forwards;
}

@media (min-width: 375px) {
  @keyframes showPINPlaceholder {
    to {
      top: -34px;
      left: -330px;
    }
  }

  @keyframes showRepeatPlaceholder {
    to {
      top: -34px;
      left: -249px;
    }
  }

  .pin_placeholder {
    left: -310px;
  }

  .repeat-placeholder {
    left: -220px;
  }
}

@media (max-width: 375px) {
  @keyframes showPINPlaceholder {
    to {
      top: -34px;
      left: -227px;
    }
  }

  @keyframes showRepeatPlaceholder {
    to {
      top: -34px;
      left: -145px;
    }
  }

  .pin_placeholder {
    left: -210px;
  }

  .repeat-placeholder {
    left: -130px;
  }
}

::v-deep {
  .el-form-item.is-error {
    .el-input__inner {
      border-color: #e60022 !important;
    }
  }
  .el-form-item__error {
    position: absolute;
    font-family: 'Montserrat';
    font-size: 12px;
    line-height: 20px;
    font-weight: 400;
    top: 0;
    left: 105%;
    padding: 14px;
    color: #e60022;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 212px;
    height: max-content;
    min-height: 48px;
    border-radius: 13px;
    background-color: white;
    box-shadow: 0px 3px 16px rgba(0, 0, 0, 0.2);
  }
  .error_info {
    color: #717a7f;
    font-style: italic;
    font-weight: 400;
  }

  .error_info > li {
    margin-left: 15px;
  }

  .error_info > li::marker {
    font-size: 0.5em;
  }
  .el-form-item__error:after,
  .el-form-item__error:before {
    position: absolute;
    content: '';
    width: 0;
    height: 0;
    top: 25px;
  }
  .el-form-item__error:before {
    left: -8px;
    margin-top: -8px;
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
    border-right: 8px solid #fff;
  }
  .el-form-item__error:after {
    left: -7px;
    margin-top: -7px;
    border-top: 7px solid transparent;
    border-bottom: 7px solid transparent;
    border-right: 7px solid #fff;
  }
  .error_icon {
    position: absolute;
    top: 12px;
    right: 7px;
  }

  .eye_icon {
    position: relative;
    right: 32px;
  }

  .el-input__suffix {
    display: flex !important;
  }
  .el-input__suffix-inner {
    display: flex !important;
  }
  .el-form-item {
    margin-bottom: 27px;
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
  margin-top: 270px;
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
</style>
