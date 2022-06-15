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
            @focus="isShow.email = true"
            @blur="onInputBlur('email')"
          >
            <template slot="prefix">
              <img
                src="@/assets/images/icons/email-icon.svg"
                alt="email_icon"
              />
            </template>
          </el-input>
          <span
            class="form-item__label"
            :class="{ invisible: !isShow.email, active: isBlured('email') }"
            >E-mail</span
          >
        </el-form-item>
        <el-form-item prop="username" class="form-item">
          <el-input
            ref="username"
            v-model="payload.username"
            class="main__form--box__input"
            placeholder="Username"
            @focus="isShow.username = true"
            @blur="onInputBlur('username')"
          >
            <template slot="prefix">
              <img src="@/assets/images/icons/user-icon.svg" alt="user_icon" />
            </template>
          </el-input>
          <span
            class="form-item__label"
            :class="{
              invisible: !isShow.username,
              active: isBlured('username'),
            }"
            >Username</span
          >
        </el-form-item>
        <el-form-item prop="password" class="form-item">
          <el-input
            ref="password"
            v-model="payload.password"
            class="main__form--box__input"
            placeholder="Password"
            :type="showPassword ? 'text' : 'password'"
            @blur="onInputBlur('password')"
            @focus="isShow.password = true"
          >
            <template slot="prefix">
              <img
                src="@/assets/images/icons/lock-icon.svg"
                alt="password_icon"
              />
            </template>
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
          <span
            class="form-item__label"
            :class="{
              invisible: !isShow.password,
              active: isBlured('password'),
            }"
            >Password</span
          >
        </el-form-item>
        <el-form-item prop="password_confirmation" class="form-item">
          <el-input
            ref="password_confirmation"
            v-model="payload.password_confirmation"
            class="main__form--box__input"
            placeholder="Confirm password"
            :type="showConfirmPassword ? 'text' : 'password'"
            @blur="onInputBlur('password_confirmation')"
            @focus="isShow.password_confirmation = true"
          >
            <template slot="prefix">
              <img
                src="@/assets/images/icons/lock-icon.svg"
                alt="password_icon"
              />
            </template>
            <template slot="suffix">
              <img
                :src="
                  require(`@/assets/images/icons/eye-${
                    showConfirmPassword ? 'close' : 'open'
                  }-icon.svg`)
                "
                alt="eye_icon"
                @click="showConfirmPassword = !showConfirmPassword"
              />
            </template>
          </el-input>
          <span
            class="form-item__label"
            :class="{
              invisible: !isShow.password_confirmation,
              active: isBlured('password_confirmation'),
            }"
            >Password</span
          >
        </el-form-item>
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
import floatingInput from '@/mixins/floatingInput'
export default {
  name: 'LoginPage',
  components: {
    ConfirmEmail,
    LoginButtons,
  },
  mixins: [floatingInput],
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
        callback(new Error("Password and password confirmation doesn't match!"))
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
      isShow: {
        email: false,
        username: false,
        password: false,
        password_confirmation: false,
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
            message: 'Please input a valid email address',
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

      isOpenEmailDialog: false,
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
  },
}
</script>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
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
    .form-item {
      position: relative;
      margin-bottom: 30px;
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
      &__label {
        color: $ov-text--subtitle;
        font-size: 11px;
        position: absolute;
        z-index: 10;
        left: 0;
        top: -10px;
        left: 47px;
        top: -19px;
        background: $ov-gray-bg;
        height: 22px;
        transition: 0.25s;
        opacity: 1;
        &.invisible {
          opacity: 0;
        }
        &.active {
          color: $ov-primary;
        }
      }
    }
    & .is-error {
      ::v-deep {
        .form-item__label {
          color: red;
        }
      }
    }
  }
}
::v-deep {
  .el-form-item.is-error {
    .el-input__inner {
      border-color: red !important;
    }
  }
  .el-form-item__error {
    z-index: 1000;
  }
}
</style>
