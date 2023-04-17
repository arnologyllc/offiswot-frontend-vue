<template>
  <div class="main">
    <div class="main__form">
      <div class="main__form--title">
        <img
          src="@/assets/images/icons/chevron-left.svg"
          alt="chevron-left"
          @click="$router.go(-1)"
        />
        <span>Reset PIN</span>
      </div>
      <div class="main__form--subtitle">
        Fill in the fields to change your PIN.
      </div>

      <el-form
        ref="pinForm"
        class="main__form--box"
        hide-required-asterisk
        :model="payload"
        :rules="rules"
        @submit.native.prevent="onSubmit"
      >
        <div
          v-if="errors.global.value"
          class="el-form-item__global-error-container"
        >
          <div class="el-form-item__global-error">
            <img src="@/assets/images/icons/error.svg" alt="" />
            <span>{{ errors.global.value }}</span>
          </div>
          <span class="clear-error" @click="clearError">X</span>
        </div>
        <el-form-item prop="previous" class="password-form-item">
          <el-input
            id="previous"
            ref="previous"
            v-model="payload.previous"
            :type="showPrevious ? 'text' : 'password'"
            class="main__form--box__input"
            placeholder="Old PIN"
            @blur="validateField('previous')"
          >
            <div
              v-if="payload.previous"
              slot="suffix"
              style="position: relative"
              @click="focusElement('previous')"
            >
              <span for="previous" class="previous_placeholder"> Old PIN </span>
            </div>
            <template slot="suffix">
              <img
                :class="errors.previous.value ? 'eye_icon' : ''"
                :src="
                  require(`@/assets/images/icons/eye-${
                    showPrevious ? 'close' : 'open'
                  }-icon.svg`)
                "
                alt="eye_icon"
                @click="showPrevious = !showPrevious"
              />
            </template>

            <template v-if="errors.previous.value" slot="suffix">
              <img
                src="@/assets/images/icons/error.svg"
                alt=""
                class="error_icon"
                @mouseover="showError('previous')"
                @mouseout="hideError('previous')"
                @click="showErrorClick('previous')"
              />
            </template>
          </el-input>

          <template slot="error">
            <div
              v-if="errors.previous.isShow && isWeb()"
              class="el-form-item__error"
            >
              <span v-html="errors.previous.value"></span>
            </div>
            <div></div>
          </template>
        </el-form-item>
        <el-form-item prop="pin" class="password-form-item">
          <el-input
            id="pin"
            ref="pin"
            v-model="payload.pin"
            :type="showPIN ? 'text' : 'password'"
            class="main__form--box__input"
            placeholder="New PIN"
            @blur="validateField('pin')"
          >
            <div
              v-if="payload.pin"
              slot="suffix"
              style="position: relative"
              @click="focusElement('pin')"
            >
              <span for="pin" class="pin_placeholder"> New PIN </span>
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
                Repeat PIN
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
        <div class="forgot-password">
          <el-button
            type="text"
            style="font-size: 14px; font-weight: 400"
            @click="onForgot"
            >Forgot PIN?</el-button
          >
        </div>
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
          v-show="errors.previous.isShow && !isWeb()"
          :error-text="errors.previous.value"
          class="dialog"
          @visible="errors.previous.isShow = false"
        >
        </error-massage>
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
    <ConfirmModal
      :email="payload.email"
      :model="isOpenEmailDialog"
      @close="isOpenEmailDialog = false"
    ></ConfirmModal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ErrorMassage from '~/components/auth/ErrorMassageModal.vue'
import { checkPin } from '~/middleware/helpers'
import ConfirmModal from '@/components/shared/OvConfirmPINChangeModal.vue'

export default {
  name: 'PINPage',
  components: {
    ErrorMassage,
    ConfirmModal,
  },
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
        previous: null,
        pin: null,
        pin_confirmation: null,
      },

      //  Show Password/Not Show Password
      showPrevious: false,
      showPIN: false,
      showPINConfirmation: false,

      errors: {
        previous: {
          value: '',
          isShow: false,
        },
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
        previous: [
          {
            required: true,
            message: 'This field is required.',
            trigger: 'blur',
          },
        ],
        pin: [
          {
            required: true,
            message: 'This field is required.',
            trigger: 'blur',
          },
          {
            min: 4,
            max: 6,
            message: 'PIN must be between 4 and 6 digits',
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
      isOpenEmailDialog: false,
    }
  },
  head() {
    return {
      title: 'resetPIN',
    }
  },
  computed: {
    ...mapGetters('pin', [
      'isLoadingSubmit',
      'resetPinData',
      'resetPinFailureData',
      'forgotFailureData',
    ]),
  },
  watch: {
    resetPinFailureData(v) {
      for (const i in v) {
        if (typeof v[i] !== 'string') {
          for (const j in v[i]) {
            this.errors.global.value = v[i][j]
          }
        } else {
          this.errors.global.value = v[i]
        }
      }
    },
    resetPinData(v) {
      if (v) {
        this.$message.success('Success!')
        this.$router.push('/')
      }
    },
    forgotPinFailureData(v) {
      for (const i in v) {
        if (typeof v[i] !== 'string') {
          for (const j in v[i]) {
            this.errors.global.value = v[i][j]
          }
        } else {
          this.errors.global.value = v[i]
        }
      }
    },
    forgotPinData(v) {
      if (v) {
        this.isOpenEmailDialog = true
      }
    },
  },
  mounted() {
    checkPin(this.$cookies, this.$router)
    if (this.$route.query.email) {
      this.payload.email = this.$route.query.email
    }
    window.addEventListener('resize', this.handleResize)
  },
  methods: {
    ...mapActions('pin', ['resetPin', 'forgotPin']),
    onSubmit() {
      this.resetPin(this.payload)
    },
    onForgot() {
      this.isOpenEmailDialog = true
      this.forgotPin()
    },
    focusElement(elem) {
      this.$refs[elem].focus()
    },

    validateField(fieldName) {
      this.$refs.pinForm.validateField(fieldName, (errorMessage) => {
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
    clearError() {
      this.errors.global.value = ''
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
      font-style: normal;
      font-weight: 600;
      font-size: 24px;
      line-height: 29px;
      margin-bottom: 17px;
      display: flex;
      align-items: center;
      cursor: pointer;
      gap: 16px;
      color: #0d1c2e;
    }

    &--subtitle {
      font-size: 14px;
      color: $ov-text--subtitle;
      margin-bottom: 70px;
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
    .forgot-password {
      margin-top: 24px;
      display: flex;
      color: #6979f8;
      justify-content: space-between;
      text-decoration: underline;
      ::v-deep .el-button {
        font-size: 12px;
        font-weight: 500;
        &:hover {
          color: $ov-primary;
        }
      }
    }
    .forgot-password {
      font-size: 14px;
    }
  }
  .el-form-item__global-error-container {
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
    justify-content: space-between;
    padding: 7px 12px;
    align-items: center;
    color: #e60022;
    gap: 16px;
    margin-bottom: 27px;
  }
  .el-form-item__global-error {
    font-family: 'Montserrat';
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 16px;
  }

  .clear-error {
    cursor: pointer;
  }
}

.previous_placeholder {
  position: relative;
  top: 0;
  width: 50px;
  font-size: 12px;
  font-weight: 400;
  color: #717a7f;
  animation: showPreviousPlaceholder 0.3s;
  animation-fill-mode: forwards;
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

@media (min-width: 407px) {
  ::v-deep .main {
    justify-content: flex-start;
    &__form {
      padding-left: 65px;
      border-left: 1px solid #d0c9d6;
    }
  }
  @keyframes showPreviousPlaceholder {
    to {
      top: -34px;
      left: -240px;
    }
  }
  @keyframes showPINPlaceholder {
    to {
      top: -34px;
      left: -235px;
    }
  }

  @keyframes showRepeatPlaceholder {
    to {
      top: -34px;
      left: -218px;
    }
  }
  .previous_placeholder {
    left: -230px;
  }
  .pin_placeholder {
    left: -225px;
  }

  .repeat-placeholder {
    left: -210px;
  }
}

@media (max-width: 407px) {
  @keyframes showPreviousPlaceholder {
    to {
      top: -34px;
      left: -215px;
    }
  }
  @keyframes showPINPlaceholder {
    to {
      top: -34px;
      left: -210px;
    }
  }

  @keyframes showRepeatPlaceholder {
    to {
      top: -34px;
      left: -194px;
    }
  }
  .previous_placeholder {
    left: -200px;
  }
  .pin_placeholder {
    left: -195px;
  }

  .repeat-placeholder {
    left: -180px;
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
  margin-top: 157px;
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
