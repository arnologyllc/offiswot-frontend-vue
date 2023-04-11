<template>
  <div class="main">
    <div class="main__form">
      <div class="main__form--title">Register</div>
      <div class="main__form--subtitle">Please fill the forms to register</div>
      <el-form
        ref="registerForm"
        class="main__form--box"
        hide-required-asterisk
        :model="payload"
        :rules="rules"
        @submit.native.prevent="onSubmit"
      >
        <el-form-item prop="email" class="form-item">
          <el-input
            ref="email"
            v-model="payload.email"
            class="main__form--box__input"
            placeholder="E-mail"
            @blur="validateField('email')"
          >
            <template slot="prefix">
              <img
                src="@/assets/images/icons/email-icon.svg"
                alt="email_icon"
              />
            </template>
            <div
              v-if="payload.email"
              slot="suffix"
              style="position: relative"
              @click="focusElement('email')"
            >
              <span for="email" class="placeholder placeholder__email">
                Email
              </span>
            </div>
            <template v-if="errors.email.value" slot="suffix">
              <img
                class="error_icon"
                src="@/assets/images/icons/error.svg"
                alt=""
                @mouseover="showError('email')"
                @mouseout="hideError('email')"
              />
            </template>
          </el-input>

          <template slot="error">
            <div v-if="errors.email.isShow" class="el-form-item__error">
              <span>{{ errors.email.value }}</span>
            </div>
            <div></div>
          </template>
        </el-form-item>
        <el-form-item prop="username" class="form-item">
          <el-input
            ref="username"
            v-model="payload.username"
            class="main__form--box__input"
            placeholder="Username"
            @blur="validateField('username')"
          >
            <template slot="prefix">
              <img src="@/assets/images/icons/user-icon.svg" alt="user_icon" />
            </template>
            <div
              v-if="payload.username"
              slot="suffix"
              style="position: relative"
              @click="focusElement('username')"
            >
              <span
                for="username"
                class="placeholder placeholder__username"
                :class="payload.username ? 'active' : ''"
              >
                Username
              </span>
            </div>
            <template v-if="errors.username.value" slot="suffix">
              <img
                class="error_icon"
                src="@/assets/images/icons/error.svg"
                alt=""
                @mouseover="showError('username')"
                @mouseout="hideError('username')"
              />
            </template>
          </el-input>
          <template slot="error">
            <div v-if="errors.username.isShow" class="el-form-item__error">
              <span>{{ errors.username.value }}</span>
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
              <span for="password" class="placeholder placeholder__password">
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
          <template slot="error">
            <div v-if="errors.password.isShow" class="el-form-item__error">
              <span>{{ errors.password.value }}</span>
            </div>
            <div></div>
          </template>
        </el-form-item>
        <el-form-item prop="password_confirmation" class="form-item">
          <el-input
            ref="password_confirmation"
            v-model="payload.password_confirmation"
            class="main__form--box__input"
            placeholder="Confirm password"
            :type="showConfirmPassword ? 'text' : 'password'"
            @blur="validateField('password_confirmation')"
          >
            <template slot="prefix">
              <img
                src="@/assets/images/icons/lock-icon.svg"
                alt="password_icon"
              />
            </template>
            <div
              v-if="payload.password_confirmation"
              slot="suffix"
              style="position: relative"
              @click="focusElement('password_confirmation')"
            >
              <span
                for="password_confirmation"
                class="placeholder placeholder__passwordConfirmation"
              >
                Confirm Password
              </span>
            </div>
            <template slot="suffix">
              <img
                :class="errors.password_confirmation.value ? 'eye_icon' : ''"
                :src="
                  require(`@/assets/images/icons/eye-${
                    showConfirmPassword ? 'close' : 'open'
                  }-icon.svg`)
                "
                alt="eye_icon"
                @click="showConfirmPassword = !showConfirmPassword"
              />
            </template>
            <template v-if="errors.password_confirmation.value" slot="suffix">
              <img
                src="@/assets/images/icons/error.svg"
                alt=""
                class="error_icon"
                @mouseover="showError('password_confirmation')"
                @mouseout="hideError('password_confirmation')"
              />
            </template>
          </el-input>
          <template slot="error">
            <div
              v-if="errors.password_confirmation.isShow"
              class="el-form-item__error"
            >
              <span>{{ errors.password_confirmation.value }}</span>
            </div>
            <div></div>
          </template>
        </el-form-item>
        <div class="terms">
          <span>By signing up you agree on our <u>Term and Conditions</u></span>
        </div>
        <login-buttons
          login-title="Register"
          :login-loading="registerLoading"
          social-title="Sign up with Google"
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
import ConfirmEmail from '@/components/shared/OvConfirmEmailModal.vue'
import LoginButtons from '@/components/auth/LoginButtons.vue'

export default {
  name: 'LoginPage',
  components: {
    ConfirmEmail,
    LoginButtons,
  },
  layout: 'auth',
  data() {
    //  Custom Validations
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password'))
      } else {
        if (this.payload.password_confirmation !== '') {
          this.$refs.registerForm.validateField('password_confirmation')
        }
        callback()
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
    const validatePassSymbols = (rule, value, callback) => {
      const regex = /^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$/
      if (regex.test(value)) {
        callback(
          new Error(
            'Password must include at least 1 lowercase, uppercase, 1 number and 1 special character'
          )
        )
      } else {
        callback()
      }
    }
    return {
      //  Request Body
      payload: {
        email: null,
        username: null,
        password: null,
        password_confirmation: null,
      },
      //  Show Password/Not Show Password
      showPassword: false,
      showConfirmPassword: false,
      //  Validation Rules
      rules: {
        email: [
          {
            required: true,
            message: 'Please enter Email address',
            trigger: 'blur',
          },
          {
            type: 'email',
            message: 'Email is not valid.',
            trigger: 'blur',
          },
        ],
        username: [
          { required: true, message: 'Please enter username', trigger: 'blur' },
          {
            min: 3,
            max: 25,
            message:
              'Username must include minimum 3 and maximum 25 characters',
            trigger: 'blur',
          },
        ],
        password: [
          { required: true, message: 'Password is required', trigger: 'blur' },
          {
            min: 8,
            message: 'Password length should me more than 8 chars',
            trigger: 'blur',
          },
          { validator: validatePass, trigger: 'blur' },
          { validator: validatePassSymbols, trigger: 'blur' },
        ],
        password_confirmation: [
          {
            required: true,
            message: 'Please enter the password again',
            trigger: 'blur',
          },
          {
            min: 8,
            message: 'Password length should me more than 8 characters',
            trigger: 'blur',
          },
          { validator: validatePass2, trigger: 'blur' },
        ],
      },

      errors: {
        email: {
          value: '',
          isShow: false,
        },
        username: {
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
      },
      isOpenEmailDialog: false,
    }
  },
  head() {
    return {
      title: 'Register',
    }
  },
  computed: {
    ...mapGetters('auth', [
      'registerFailureData',
      'registerSuccessData',
      'registerLoading',
    ]),
  },
  watch: {
    registerSuccessData(v) {
      if (v) {
        this.isOpenEmailDialog = true
      }
    },
    registerFailureData: {
      deep: true,
      handler(v) {
        if (v === 'Account exists, please login.') {
          this.$router.push(`/login?email=${this.payload.email}`)
        }
        if (v === 'Email already exists but is not verified.') {
          this.isOpenEmailDialog = true
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
        } else {
          this.$notify.error({
            title: 'Error',
            message: v,
          })
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
  },
  methods: {
    ...mapActions('auth', ['registerUser']),
    onSubmit() {
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          this.registerUser(this.payload)
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
      this.$refs.registerForm.validateField(fieldName, (errorMessage) => {
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
  position: relative;
  display: flex;

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
              display: flex;
            }
          }
        }
      }
    }
    .form-item {
      position: relative;
      margin-bottom: 27px;
      ::v-deep input {
        &::placeholder {
          transition: 0.25s;
        }
        &:focus {
          &::placeholder {
            opacity: 0;
          }
        }
      }
    }
  }
}

.placeholder {
  position: relative;
  top: 0;
  font-size: 12px;
  font-weight: 400;
  color: #717a7f;
  &__email {
    left: -300px;
    animation: showEmailPlaceholder 0.3s;
    animation-fill-mode: forwards;
  }
  &__username {
    left: -270px;
    animation: showUsernamePlaceholder 0.3s;
    animation-fill-mode: forwards;
  }
  &__password {
    left: -250px;
    animation: showPasswordPlaceholder 0.3s;
    animation-fill-mode: forwards;
  }
  &__passwordConfirmation {
    left: -200px;
    animation: showPasswordConfirmationPlaceholder 0.3s;
    animation-fill-mode: forwards;
  }
}

@keyframes showEmailPlaceholder {
  to {
    top: -32px;
    left: -343px;
  }
}

@keyframes showUsernamePlaceholder {
  to {
    top: -32px;
    left: -315px;
  }
}

@keyframes showPasswordPlaceholder {
  to {
    top: -32px;
    left: -295px;
  }
}

@keyframes showPasswordConfirmationPlaceholder {
  to {
    top: -32px;
    left: -243px;
  }
}

::v-deep {
  .el-form-item.is-error {
    .el-input__inner {
      border-color: red !important;
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
    max-width: 300px;
    height: 45px;
    border-radius: 13px;
    background-color: white;
    box-shadow: 0 0 10px gray;
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
    border-right: 8px solid #fff;
  }
  .el-input__suffix {
    display: flex !important;
  }
  .el-input__suffix-inner {
    display: flex !important;
  }
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

.terms {
  color: #717a7f;
  font-size: 14px;
  text-align: center;
  margin-bottom: 25px;
}
</style>
