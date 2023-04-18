<template>
  <div class="main">
    <div class="main__form">
      <div class="main__form--title">
        <img
          src="@/assets/images/icons/chevron-left.svg"
          alt="chevron-left"
          @click="$router.go(-1)"
        />
        <span>Reset password</span>
      </div>
      <div class="main__form--subtitle">
        Fill in the fields to change your password.
      </div>

      <el-form
        ref="passwordForm"
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
        <el-form-item prop="old_password" class="password-form-item">
          <el-input
            id="old_password"
            ref="old_password"
            v-model="payload.old_password"
            :type="showPrevious ? 'text' : 'password'"
            class="main__form--box__input"
            placeholder="Old password"
            @blur="validateField('old_password')"
          >
            <div
              v-if="payload.old_password"
              slot="suffix"
              style="position: relative"
              @click="focusElement('old_password')"
            >
              <span for="old_password" class="old_password_placeholder">
                Old Password
              </span>
            </div>
            <template slot="suffix">
              <img
                :class="errors.old_password.value ? 'eye_icon' : ''"
                :src="
                  require(`@/assets/images/icons/eye-${
                    !showPrevious ? 'close' : 'open'
                  }-icon.svg`)
                "
                alt="eye_icon"
                @click="showPrevious = !showPrevious"
              />
            </template>

            <template v-if="errors.old_password.value" slot="suffix">
              <img
                src="@/assets/images/icons/error.svg"
                alt=""
                class="error_icon"
                @mouseover="showError('old_password')"
                @mouseout="hideError('old_password')"
                @click="showErrorClick('old_password')"
              />
            </template>
          </el-input>

          <template slot="error">
            <div
              v-if="errors.old_password.isShow && isWeb()"
              class="el-form-item__error"
            >
              <span v-html="errors.old_password.value"></span>
            </div>
            <div></div>
          </template>
        </el-form-item>
        <el-form-item prop="password" class="form-item">
          <el-input
            ref="password"
            v-model="payload.password"
            class="main__form--box__input"
            placeholder="Password"
            :type="showPassword ? 'text' : 'password'"
            @input="validateField('password')"
          >
            <div
              v-if="payload.password"
              slot="suffix"
              style="position: relative"
              @click="focusElement('password')"
            >
              <span for="password" class="placeholder password_placeholder">
                New password
              </span>
            </div>
            <template slot="suffix">
              <img
                :class="errors.password.value ? 'eye_icon' : ''"
                :src="
                  require(`@/assets/images/icons/eye-${
                    !showPassword ? 'close' : 'open'
                  }-icon.svg`)
                "
                alt="eye_icon"
                @click="showPassword = !showPassword"
              />
            </template>
            <template v-if="errors.password.value" slot="suffix">
              <div
                class="error_icon"
                @mouseover="showError('password')"
                @mouseout="hideError('password')"
                @click="showErrorClick('password')"
              >
                <img
                  v-if="errors.password.status === 'Medium' && payload.password"
                  src="@/assets/images/icons/warning.svg"
                  alt=""
                />
                <img
                  v-else-if="
                    errors.password.status === 'Strong' && payload.password
                  "
                  src="@/assets/images/icons/good.svg"
                  alt=""
                />
                <img v-else src="@/assets/images/icons/error.svg" alt="" />
              </div>
            </template>

            <template slot="suffix">
              <div
                v-if="payload.password && errors.password.isShow && isWeb()"
                :class="getColor()"
                class="el-form-item__error strength"
              >
                <span v-html="errors.password.value"></span>
              </div>
              <div></div>
            </template>
          </el-input>
          <template slot="error">
            <div
              v-if="errors.password.isShow && isWeb()"
              class="el-form-item__error"
            >
              <span v-html="errors.password.value"></span>
            </div>
            <div></div>
          </template>
        </el-form-item>
        <el-form-item prop="password_confirmation" class="password-form-item">
          <el-input
            id="password_confirmation"
            ref="password_confirmation"
            v-model="payload.password_confirmation"
            :type="showPasswordConfirmation ? 'text' : 'password'"
            class="main__form--box__input"
            placeholder="Repeat password"
            @blur="validateField('password_confirmation')"
          >
            <div
              v-if="payload.password_confirmation"
              slot="suffix"
              style="position: relative"
              @click="focusElement('password_confirmation')"
            >
              <span for="password" class="repeat-placeholder">
                Repeat Password
              </span>
            </div>
            <template slot="suffix">
              <img
                :class="errors.password_confirmation.value ? 'eye_icon' : ''"
                :src="
                  require(`@/assets/images/icons/eye-${
                    !showPasswordConfirmation ? 'close' : 'open'
                  }-icon.svg`)
                "
                alt="eye_icon"
                @click="showPasswordConfirmation = !showPasswordConfirmation"
              />
            </template>

            <template v-if="errors.password_confirmation.value" slot="suffix">
              <img
                src="@/assets/images/icons/error.svg"
                alt=""
                class="error_icon"
                @mouseover="showError('password_confirmation')"
                @mouseout="hideError('password_confirmation')"
                @click="showErrorClick('password_confirmation')"
              />
            </template>
          </el-input>

          <template slot="error">
            <div
              v-if="errors.password_confirmation.isShow && isWeb()"
              class="el-form-item__error"
            >
              <span v-html="errors.password_confirmation.value"></span>
            </div>
            <div></div>
          </template>
        </el-form-item>
        <div class="forgot-password">
          <el-button
            type="text"
            style="font-size: 14px; font-weight: 400"
            @click="onForgot"
            >Forgot Password?</el-button
          >
        </div>
        <el-button
          class="submit-button"
          native-type="submit"
          :loading="resetLoading"
        >
          <span class="submit-button__text">{{
            resetLoading ? '' : 'Save'
          }}</span>
        </el-button>
        <error-massage
          v-show="errors.old_password.isShow && !isWeb()"
          :error-text="errors.old_password.value"
          class="dialog"
          @visible="errors.old_password.isShow = false"
        >
        </error-massage>
        <error-massage
          v-show="errors.password.isShow && !isWeb()"
          :error-text="errors.password.value"
          class="dialog"
          :text-color="
            errors.password.status === 'Medium' && payload.password
              ? 'warning'
              : errors.password.status === 'Strong' && payload.password
              ? 'done'
              : 'weak'
          "
          @visible="errors.password.isShow = false"
        ></error-massage>
        <error-massage
          v-show="errors.password_confirmation.isShow && !isWeb()"
          :error-text="errors.password_confirmation.value"
          class="dialog"
          @visible="errors.password_confirmation.isShow = false"
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
import ConfirmModal from '@/components/shared/OvConfirmPasswordChangeModal.vue'

export default {
  name: 'PasswordPage',
  components: {
    ErrorMassage,
    ConfirmModal,
  },
  layout: 'default',
  data() {
    const validatePass = (rule, value, callback) => {
      const strength = this.updatePasswordStrength(value)
      if (strength === 'Weak') {
        this.errors.password.status = 'Weak'
        callback(new Error('Password strength: <b>Weak</b>'))
      } else if (strength === 'Medium') {
        callback()
        this.errors.password.status = 'Medium'
        this.errors.password.value = 'Password strength: <b>Medium</b>'
      } else if (strength === 'Strong') {
        callback()
        this.errors.password.status = 'Strong'
        this.errors.password.value = 'Password strength: <b>Strong</b>'
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password again'))
      } else if (value !== this.payload.password) {
        callback(new Error('Password and confirm password do not match'))
      } else {
        callback()
      }
    }
    return {
      //  Request Body
      payload: {
        old_password: null,
        password: null,
        password_confirmation: null,
      },

      //  Show Password/Not Show Password
      showPrevious: false,
      showPassword: false,
      showPasswordConfirmation: false,

      errors: {
        old_password: {
          value: '',
          isShow: false,
        },
        password: {
          value: '',
          isShow: false,
        },
        password_confirmation: {
          value: '',
          isShow: false,
        },
        global: {
          value: '',
        },
      },

      //  Validation Rules
      rules: {
        old_password: [
          {
            required: true,
            message: 'This field is required.',
            trigger: 'blur',
          },
        ],
        password: [
          {
            required: true,
            message: 'This field is required.',
            trigger: 'blur',
          },
          { validator: validatePass, trigger: 'input' },
        ],
        password_confirmation: [
          {
            required: true,
            message: 'This field is required.',
            trigger: 'blur',
          },
          { validator: validatePass2, trigger: 'blur' },
        ],
      },
      isOpenEmailDialog: false,
    }
  },
  head() {
    return {
      title: 'resetPassword',
    }
  },
  computed: {
    ...mapGetters('auth', [
      'resetSuccessData',
      'resetErrorData',
      'resetLoading',
      'forgotSuccessData',
      'forgotErrorData',
      'forgotLoading',
    ]),
  },
  watch: {
    resetErrorData(v) {
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
    resetSuccessData(v) {
      if (v) {
        this.$message.success('Success!')
        this.$router.push('/')
      }
    },
    forgotErrorData(v) {
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
    forgotSuccessData(v) {
      if (v) {
        this.isOpenEmailDialog = true
      }
    },
  },
  mounted() {
    checkPin(this.$cookies, this.$router)
    window.addEventListener('resize', this.handleResize)
  },
  methods: {
    ...mapActions('auth', [
      'resetPasswordWithSettings',
      'forgotPasswordWithMail',
    ]),
    onSubmit() {
      this.resetPasswordWithSettings(this.payload)
    },
    onForgot() {
      this.forgotPasswordWithMail(this.payload)
    },
    focusElement(elem) {
      this.$refs[elem].focus()
    },

    validateField(fieldName) {
      this.$refs.passwordForm.validateField(fieldName, (errorMessage) => {
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

    updatePasswordStrength(password) {
      const mediumRegex = /^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/
      const strongRegex =
        /^(?=.*?[a-z])((?=.*?[A-Z]))(?=.*?[0-9])(?=.*?[#?!@$%^&*-.]).{12,}$/
      if (strongRegex.test(password)) {
        return 'Strong'
      } else if (mediumRegex.test(password)) {
        return 'Medium'
      }
      return 'Weak'
    },
    getColor() {
      return this.errors.password.status === 'Medium'
        ? 'warning'
        : this.errors.password.status === 'Strong'
        ? 'done'
        : ''
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

.old_password_placeholder {
  position: relative;
  top: 0;
  width: 50px;
  font-size: 12px;
  font-weight: 400;
  color: #717a7f;
  animation: showPreviousPlaceholder 0.3s;
  animation-fill-mode: forwards;
}
.password_placeholder {
  position: relative;
  top: 0;
  width: 50px;
  font-size: 12px;
  font-weight: 400;
  color: #717a7f;
  animation: showPasswordPlaceholder 0.3s;
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
      left: -204px;
    }
  }
  @keyframes showPasswordPlaceholder {
    to {
      top: -34px;
      left: -199px;
    }
  }

  @keyframes showRepeatPlaceholder {
    to {
      top: -34px;
      left: -182px;
    }
  }
  .old_password_placeholder {
    left: -190px;
  }
  .password_placeholder {
    left: -183px;
  }

  .repeat-placeholder {
    left: -168px;
  }
}

@media (max-width: 407px) {
  @keyframes showPreviousPlaceholder {
    to {
      top: -34px;
      left: -180px;
    }
  }
  @keyframes showPasswordPlaceholder {
    to {
      top: -34px;
      left: -175px;
    }
  }

  @keyframes showRepeatPlaceholder {
    to {
      top: -34px;
      left: -158px;
    }
  }
  .old_password_placeholder {
    left: -165px;
  }
  .password_placeholder {
    left: -160px;
  }

  .repeat-placeholder {
    left: -143px;
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

  .strength {
    left: 127%;
  }
  .done {
    color: #34b53a;
  }

  .warning {
    color: #ffa26b;
  }
  .weak {
    color: #e60022;
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
