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
          >
            <template slot="prefix">
              <img src="@/assets/images/icons/user-icon.svg" alt="user_icon" />
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
        </el-form-item>
        <el-form-item prop="password" class="password-form-item">
          <el-input
            id="password"
            ref="password"
            v-model="payload.password"
            :type="showPassword ? 'text' : 'password'"
            class="main__form--box__input"
            placeholder="Password"
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
                :src="
                  require(`@/assets/images/icons/eye-${
                    showPassword ? 'close' : 'open'
                  }-icon.svg`)
                "
                alt="eye_icon"
                @click="showPassword = !showPassword"
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

      //  Validation Rules
      rules: {
        email: [
          { required: true, message: 'Email is required', trigger: 'blur' },
        ],
        password: [
          { required: true, message: 'Password is required', trigger: 'blur' },
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
      margin-bottom: 47px;
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
    .password-form-item {
      ::v-deep .el-form-item__error {
        top: 45%;
      }
    }
  }
}

.placeholder {
  position: relative;
  top: 0;
  left: -150%;
  animation: showPlaceholder 0.3s;
  animation-fill-mode: forwards;
}

.password-placeholder {
  position: relative;
  top: 0;
  left: -355%;
  animation: showPasswordPlaceholder 0.3s;
  animation-fill-mode: forwards;
}

@keyframes showPlaceholder {
  to {
    top: -90%;
    left: -180%;
  }
}

@keyframes showPasswordPlaceholder {
  to {
    top: -90%;
    left: -410%;
  }
}

::v-deep {
  .el-form-item.is-error {
    .el-input__inner {
      border-color: red !important;
    }
  }

  .el-form-item__content {
    margin-bottom: 20px;
  }
  .el-input__suffix-inner {
    display: flex !important;
  }
}
</style>
