<template>
  <div class="main">
    <div class="main__form">
      <div class="main__form--title">Reset PIN</div>
      <div class="main__form--subtitle">
        Enter a new PIN below to change your PIN.
      </div>
      <el-form
        ref="resetForm"
        class="main__form--box"
        hide-required-asterisk
        :model="payload"
        :rules="rules"
        @submit.native.prevent="onSubmit"
      >
        <div v-if="errors.global.value" class="el-form-item__global-error">
          <img src="@/assets/images/icons/error.svg" alt="" />
          <span>{{ errors.global.value }}</span>
        </div>
        <el-form-item prop="pin" class="password-form-item">
          <el-input
            id="pin"
            ref="pin"
            v-model="payload.pin"
            :type="showPIN ? 'text' : 'password'"
            class="main__form--box__input"
            placeholder="Enter PIN"
            @change="validateField('pin')"
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
                @click="showErrorClick('pin')"
              />
            </template>
          </el-input>

          <template slot="error">
            <div
              v-if="errors.pin.isShow && isWeb()"
              class="el-form-item__error"
            >
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
                @click="showErrorClick('pin_confirmation')"
              />
            </template>
          </el-input>

          <template slot="error">
            <div
              v-if="errors.pin_confirmation.isShow && isWeb()"
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
          <span class="submit-button__text">{{
            isLoadingSubmit ? '' : 'Save'
          }}</span>
        </el-button>
        <error-massage
          v-show="errors.pin.isShow && !isWeb()"
          :error-text="errors.pin.value"
          class="dialog"
          @visible="errors.pin.isShow = false"
        >
        </error-massage>
        <error-massage
          v-show="errors.pin_confirmation.isShow && !isWeb()"
          :error-text="errors.pin_confirmation.value"
          class="dialog"
          @visible="errors.pin_confirmation.isShow = false"
        >
        </error-massage>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ErrorMassage from '~/components/auth/ErrorMassageModal.vue'
export default {
  name: 'PINReset',
  components: {
    ErrorMassage,
  },
  layout: 'default',
  data() {
    //  Custom Validations
    const validateRepeatPIN = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the PIN again'))
      } else if (value !== this.payload.pin) {
        callback(new Error('PIN and repeat PIN do not match.'))
      } else {
        callback()
      }
    }
    const validatePIN = (rule, value, callback) => {
      const regex = /^\d{4,6}$/
      if (!regex.test(value)) {
        callback(
          new Error(
            `<span>PIN is improperly formatted.<br></span>
            <ul class="error_info">
              <li>4-6 characters long.</li>
              <li>Should include only numbers.</li>
            </ul>`
          )
        )
      } else {
        callback()
      }
    }
    return {
      //  Request Body
      payload: {
        pin: null,
        pin_confirmation: null,
        pinToken: null,
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
        global: {
          value: '',
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
          { validator: validatePIN, trigger: 'change' },
        ],
        pin_confirmation: [
          {
            required: true,
            message: 'This field is required.',
            trigger: 'blur',
          },
          { validator: validateRepeatPIN, trigger: 'blur' },
        ],
      },
    }
  },
  head() {
    return {
      title: 'Reset PIN',
    }
  },
  computed: {
    ...mapGetters('pin', [
      'changePinData',
      'changePinFailureData',
      'isLoadingSubmit',
    ]),
  },

  watch: {
    changePinData(v) {
      if (v) {
        this.payload.pin = null
        this.payload.pin_confirmation = null
        this.$notify.success({
          title: 'Success',
          message: v.data,
        })
        this.$router.push('/')
      }
    },

    changePinFailureData(v) {
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

  mounted() {
    this.payload.email = this.$route.query.email
    this.payload.pinToken = this.$route.query.token
    window.addEventListener('resize', this.handleResize)
  },

  methods: {
    ...mapActions('pin', ['changePin']),
    onSubmit() {
      this.$refs.resetForm.validate((valid) => {
        if (valid) {
          this.changePin(this.payload)
        } else {
          this.errors.global.value = 'Please fill empty areas'
          return false
        }
      })
    },
    focusElement(elem) {
      this.$refs[elem].focus()
    },

    validateField(fieldName) {
      this.$refs.resetForm.validateField(fieldName, (errorMessage) => {
        this.errors[fieldName].value = errorMessage
      })
    },
    showErrorClick(fieldName) {
      this.errors[fieldName].isShow = true
    },
    showError(fieldName) {
      if (this.isWeb()) {
        this.errors[fieldName].isShow = true
      }
    },
    hideError(fieldName) {
      if (this.isWeb()) {
        this.errors[fieldName].isShow = false
      }
    },
    handleResize() {
      this.$forceUpdate()
    },

    isWeb() {
      if (typeof window !== 'undefined') {
        return window.innerWidth > 990
      }
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
  padding: 100px 0 150px 170px;
  width: 100%;

  &__form {
    width: 390px;
    &--title {
      font-size: 20px;
      font-weight: 600;
      color: $ov-text--title;
      margin-bottom: 10px;
    }

    &--subtitle {
      font-size: 14px;
      color: $ov-text--subtitle;
      margin-bottom: 30px;
    }

    &--box {
      &__input {
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

@media (max-width: 407px) {
  @keyframes showPINPlaceholder {
    to {
      top: -34px;
      left: -241px;
    }
  }

  @keyframes showRepeatPlaceholder {
    to {
      top: -34px;
      left: -157px;
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

  .weak {
    color: #e60022;
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
  .el-form-item__global-error {
    width: 100%;
    border-color: #e60022;
    background: #fbe4e8;
    box-shadow: 0px 7px 64px rgb(0 0 0 / 7%);
    border-radius: 6px;
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 20px;
    display: flex;
    justify-content: flex-start;
    padding: 7px 12px;
    align-items: center;
    color: #e60022;
    gap: 16px;
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
.dialog {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background: rgba(0, 0, 0, 0.66);
}

@media (max-width: 990px) {
  .main {
    margin: 100px auto 150px;
    padding: 0;
    justify-content: center;
  }
}

@media (max-width: 450px) {
  .main {
    margin: 100px auto 150px;
    padding: 0;
    justify-content: center;
  }
  ::v-deep .main__form {
    &--box {
      text-align: center;
    }
  }
}

@media (max-width: 407px) {
  .main {
    margin: 100px auto 150px;
    padding: 0;
    width: 300px;
    justify-content: center;
  }
  ::v-deep .main__form {
    &--box {
      text-align: center;
    }
  }
}
</style>
