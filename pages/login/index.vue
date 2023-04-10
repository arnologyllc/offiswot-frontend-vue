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
            <div v-if="errors.email.isShow" class="el-form-item__error">
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
                    showPassword ? 'close' : 'open'
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
              />
            </template>
          </el-input>

          <div class="forgot-password">
            <el-checkbox v-model="payload.remember_me" class="remember-checkbox"
              >Remember me</el-checkbox
            >
            <el-button type="text" @click="$router.push('/password/forgot')"
              >Forgot Password?</el-button
            >
          </div>

          <template slot="error">
            <div v-if="errors.password.isShow" class="el-form-item__error">
              <span>{{ errors.password.value }}</span>
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
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import LoginButtons from '@/components/auth/LoginButtons.vue'
import ConfirmEmail from '@/components/shared/OvConfirmEmailModal.vue'

export default {
  name: 'RegisterPage',
  components: {
    LoginButtons,
    ConfirmEmail,
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
          {
            min: 8,
            message: 'Password length should me more than 8 chars',
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
        this.$cookies.set('token', v.access_token, {
          options: {
            expires: this.payload.remember_me
              ? 9999
              : Math.round(v.expires_in / 60 / 24),
          },
        })
        if (v.user.name) {
          this.$router.push('/')
        } else {
          this.$router.push('/profile')
        }
      }
    },
    loginErrorData: {
      deep: true,
      handler(v) {
        if (v === 'Please Verify Email' || v.error === 'Please Verify Email') {
          this.isOpenEmailDialog = true
        }
        if (v === 'Email Or username not found') {
          this.$router.push(`/register?email=${this.payload.email}`)
        }
        if (typeof v !== 'string') {
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
        }
      },
    },
  },
  mounted() {
    if (this.$route.query.email) {
      this.payload.email = this.$route.query.email
    }
  },
  methods: {
    ...mapActions('auth', ['loginUser']),
    onSubmit() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loginUser(this.payload)
        } else {
          this.$message.error('Wrong!')
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
      .remember-checkbox {
        ::v-deep {
          .el-checkbox {
            &__inner {
              width: 24px;
              height: 24px;
              border-radius: 6px;
              border-color: $ov-primary--light;
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
  left: -220px;
  font-size: 12px;
  font-weight: 400;
  color: #717a7f;
  animation: showPlaceholder 0.3s;
  animation-fill-mode: forwards;
}

.password-placeholder {
  position: relative;
  top: 0;
  left: -250px;
  font-size: 12px;
  font-weight: 400;
  color: #717a7f;
  animation: showPasswordPlaceholder 0.3s;
  animation-fill-mode: forwards;
}

@keyframes showPlaceholder {
  to {
    top: -32px;
    left: -263px;
  }
}

@keyframes showPasswordPlaceholder {
  to {
    top: -32px;
    left: -295px;
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
    font-weight: 400;
    top: 0;
    left: 105%;
    padding: 10px;
    color: #e60022;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: max-content;
    height: 45px;
    border-radius: 13px;
    background-color: white;
    box-shadow: 0px 3px 16px rgba(0, 0, 0, 0.2);
  }
  .el-form-item__error:after,
  .el-form-item__error:before {
    position: absolute;
    content: '';
    width: 0;
    height: 0;
    top: 50%;
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
</style>
