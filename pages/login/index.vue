<template>
  <div class="main">
    <div class="main__form">
      <div class="main__form--title">Log In</div>
      <div class="main__form--subtitle">Please fill the forms to log in</div>
      <el-form
        ref="loginForm"
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
        <el-form-item prop="email">
          <el-input
            ref="email"
            v-model="payload.email"
            class="main__form--box__input"
            placeholder="Email or username"
            @blur="validateField('email')"
          >
            <template slot="prefix">
              <img src="@/assets/images/icons/user-icon.svg" alt="user_icon" />
            </template>

            <template v-if="errors.email.value" slot="suffix">
              <img
                class="error_icon"
                src="@/assets/images/icons/error.svg"
                alt=""
                @mouseover="showError('email')"
                @mouseout="hideError('email')"
                @click="showErrorClick('email')"
              />
            </template>
            <div
              v-if="payload.email"
              slot="suffix"
              style="position: relative"
              @click="focusElement('email')"
            >
              <span for="email" class="placeholder"> Email or username </span>
            </div>
          </el-input>

          <template slot="error">
            <div
              v-if="errors.email.isShow && isWeb()"
              class="el-form-item__error"
            >
              <span>{{ errors.email.value }}</span>
            </div>
            <div></div>
          </template>
        </el-form-item>
        <el-form-item prop="password" class="password-form-item">
          <el-input
            id="password"
            ref="password"
            v-model="payload.password"
            :type="showPassword ? 'text' : 'password'"
            class="main__form--box__input"
            placeholder="Password"
            @blur="validateField('password')"
          >
            <template slot="prefix">
              <img
                src="@/assets/images/icons/lock-icon.svg"
                alt="password_icon"
              />
            </template>

            <div
              v-if="payload.password"
              slot="suffix"
              style="position: relative"
              @click="focusElement('password')"
            >
              <span for="password" class="password-placeholder">
                Password
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
              <img
                src="@/assets/images/icons/error.svg"
                alt=""
                class="error_icon"
                @mouseover="showError('password')"
                @mouseout="hideError('password')"
                @click="showErrorClick('password')"
              />
            </template>
          </el-input>

          <div class="forgot-password">
            <el-checkbox v-model="payload.remember_me" class="remember-checkbox"
              >Remember me</el-checkbox
            >
            <el-button
              type="text"
              style="font-size: 14px; font-weight: 400"
              @click="$router.push('/password/forgot')"
              >Forgot Password?</el-button
            >
          </div>

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
        <login-buttons
          :login-loading="loginLoading"
          login-title="Log In"
          social-title="Sign in with Google"
        ></login-buttons>
      </el-form>
    </div>
    <confirm-email
      :email="payload.email"
      :model="isOpenEmailDialog"
      @close="isOpenEmailDialog = false"
    ></confirm-email>

    <error-massage
      v-show="errors.email.isShow && !isWeb()"
      :error-text="errors.email.value"
      class="dialog"
      @visible="errors.email.isShow = false"
    ></error-massage>
    <error-massage
      v-show="errors.password.isShow && !isWeb()"
      :error-text="errors.password.value"
      class="dialog"
      @visible="errors.password.isShow = false"
    ></error-massage>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import LoginButtons from '@/components/auth/LoginButtons.vue'
import ConfirmEmail from '@/components/shared/OvConfirmEmailModal.vue'
import ErrorMassage from '~/components/auth/ErrorMassageModal.vue'

export default {
  name: 'RegisterPage',
  components: {
    LoginButtons,
    ConfirmEmail,
    ErrorMassage,
  },
  layout: 'auth',
  data() {
    return {
      //  Request Body
      payload: {
        email: null,
        password: null,
        remember_me: false,
      },

      //  Show Password/Not Show Password
      showPassword: false,

      errors: {
        email: {
          value: '',
          isShow: false,
        },
        password: {
          value: '',
          isShow: false,
        },
        global: {
          value: '',
        },
      },

      //  Validation Rules
      rules: {
        email: [
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
        ],
      },
      isOpenEmailDialog: false,
    }
  },
  head() {
    return {
      title: 'Login',
    }
  },
  computed: {
    ...mapGetters('auth', [
      'loginSuccessData',
      'loginErrorData',
      'loginLoading',
    ]),
  },
  watch: {
    loginSuccessData(v) {
      if (v) {
        const expirationDate = this.payload.remember_me ? 0 : '1h'
        this.$cookies.set('token', v.access_token, expirationDate)
        if (v.is_first_login) {
          this.$router.push('/pin')
          this.$cookies.set('first_login', v.is_first_login)
        } else {
          this.$router.push('/')
        }
      }
    },
    loginErrorData: {
      deep: true,
      handler(v) {
        if (
          v === 'Please visit your email to verify your account.' ||
          v.error === 'Please visit your email to verify your account.'
        ) {
          this.isOpenEmailDialog = true
        }
        if (v === 'Incorrect username or password.') {
          this.errors.global.value = v
        }
        if (typeof v !== 'string') {
          for (const i in v) {
            if (typeof v[i] !== 'string') {
              for (const j in v[i]) {
                this.errors.global.value = v[i][j]
              }
            } else {
              this.errors.global.value = v[i]
            }
          }
        }
      },
    },
  },
  mounted() {
    if (this.$route.query.email) {
      this.payload.email = this.$route.query.email
    }
    if (this.$cookies.get('token')) {
      this.$router.push('/')
    }
    window.addEventListener('resize', this.handleResize)
  },
  methods: {
    ...mapActions('auth', ['loginUser']),
    onSubmit() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loginUser(this.payload)
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
      this.$refs.loginForm.validateField(fieldName, (errorMessage) => {
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
      return window.innerWidth > 990
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
        ::v-deep {
          .el-input__inner {
            height: 48px;
            padding: 0 45px;
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
      justify-content: space-between;
      ::v-deep .el-button {
        font-size: 12px;
        font-weight: 500;
        color: $ov-text--subtitle;
        &:hover {
          color: $ov-primary;
        }
      }
      .forgot-password {
        font-size: 14px;
      }
      .remember-checkbox {
        ::v-deep {
          .el-checkbox {
            &__inner {
              width: 24px;
              height: 24px;
              border-radius: 6px;
              border-color: $ov-primary--light;
              font-size: 14px;
              z-index: auto;
              &:hover {
                border-color: $ov-primary;
              }
              &::after {
                border-width: 2px;
                height: 8px;
                left: 7px;
                top: 3.5px;
                width: 4px;
              }
            }
            &__label {
              color: $ov-text--subtitle;
              font-weight: 400;
            }
          }
        }
      }
      & .is-checked {
        ::v-deep {
          .el-checkbox {
            &__inner {
              background: $ov-primary;
            }
          }
        }
      }
    }
  }
}

.placeholder {
  position: relative;
  top: 0;
  width: 50px;
  font-size: 12px;
  font-weight: 400;
  color: #717a7f;
  animation: showPlaceholder 0.3s;
  animation-fill-mode: forwards;
}

.password-placeholder {
  position: relative;
  top: 0;
  font-size: 12px;
  font-weight: 400;
  color: #717a7f;
  animation: showPasswordPlaceholder 0.3s;
  animation-fill-mode: forwards;
}

@media (min-width: 375px) {
  @keyframes showPlaceholder {
    to {
      top: -34px;
      left: -263px;
    }
  }

  @keyframes showPasswordPlaceholder {
    to {
      top: -34px;
      left: -295px;
    }
  }

  .placeholder {
    left: -220px;
  }

  .password-placeholder {
    left: -250px;
  }
}

@media (max-width: 375px) {
  @keyframes showPlaceholder {
    to {
      top: -34px;
      left: -142px;
    }
  }

  @keyframes showPasswordPlaceholder {
    to {
      top: -34px;
      left: -175px;
    }
  }

  .placeholder {
    left: -100px;
  }

  .password-placeholder {
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
    width: max-content;
    max-width: 212px;
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
</style>
