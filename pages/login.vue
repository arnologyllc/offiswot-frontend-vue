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
        @submit.prevent="onSubmit"
      >
        <div v-if="errors.global.value" class="el-form-item__global-error-container">
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
            placeholder="Email"
            @input="validateField('email')"
            @blur="validateField('email')"
          >
            <template #prefix>
              <img src="@/assets/images/icons/user-icon.svg" alt="user_icon" />
            </template>

            <template #suffix>
              <img
                v-if="errors.email.value"
                class="error_icon"
                src="@/assets/images/icons/error.svg"
                alt=""
                @mouseover="showError('email', 'mouseover')"
                @mouseout="showError('email', 'mouseout')"
                @click="showError('email', 'click')"
              />
              <div v-if="payload.email" style="position: relative" @click="focusElement('email')">
                <span for="email" class="custom_placeholder"> Email </span>
              </div>

              <div></div>
            </template>
          </el-input>
          <template #error>
            <div v-if="errors.email.isShow && isWeb()" class="el-form-item__error">
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
            @input="validateField('password')"
            @blur="validateField('password')"
          >
            <template #prefix>
              <img src="@/assets/images/icons/lock-icon.svg" alt="password_icon" />
            </template>
            <template #suffix>
              <div v-if="payload.password" style="position: relative" @click="focusElement('password')">
                <span for="password" class="custom_placeholder"> Password </span>
              </div>
              <img
                :class="errors.password.value ? 'eye_icon' : ''"
                :src="showPassword ? hideEyeIcon : showEyeIcon"
                alt="eye_icon"
                @click="showPassword = !showPassword"
              />
              <img
                v-if="errors.password.value"
                src="@/assets/images/icons/error.svg"
                alt=""
                class="error_icon"
                @mouseover="showError('password', 'mouseover')"
                @mouseout="showError('password', 'mouseout')"
                @click="showError('password', 'click')"
              />
            </template>
          </el-input>

          <template #error>
            <div v-if="errors.password.isShow && isWeb()" class="el-form-item__error">
              <span v-html="errors.password.value"></span>
            </div>
            <div></div>
          </template>
          <div class="forgot-password">
            <el-checkbox v-model="payload.remember_me" class="remember-checkbox"
              ><span style="font-weight: 400">Remember me</span></el-checkbox
            >
            <el-button text @click="navigateTo('/password/forgot')">Forgot Password?</el-button>
          </div>
        </el-form-item>
        <login-buttons
          :login-loading="authStore.loginLoading"
          :is-valid="isValid"
          login-title="Sign in"
          social-title="Sign in with Google"
        ></login-buttons>
      </el-form>
    </div>
    <confirm-email
      v-if="isOpenEmailDialog"
      :email="payload.email"
      :dialog-visible="isOpenEmailDialog"
      @close="isOpenEmailDialog = false"
    ></confirm-email>

    <error-massage
      v-if="errors.email.isShow && !isWeb()"
      :dialog-visible="errors.email.isShow && !isWeb()"
      :error-text="errors.email.value"
      @visible="errors.email.isShow = false"
    ></error-massage>
    <error-massage
      v-if="errors.password.isShow && !isWeb()"
      :dialog-visible="errors.password.isShow && !isWeb()"
      :error-text="errors.password.value"
      @visible="errors.password.isShow = false"
    ></error-massage>
  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted } from 'vue'
import $cookies from 'js-cookie'
import { storeToRefs } from 'pinia'
import LoginButtons from '@/components/auth/LoginButtons.vue'
import ConfirmEmail from '@/components/shared/OvConfirmEmailModal.vue'
import ErrorMassage from '~/components/auth/ErrorMassageModal.vue'
import useAuthStore from '~/stores/auth'
import showEyeIcon from '@/assets/images/icons/eye-open-icon.svg'
import hideEyeIcon from '@/assets/images/icons/eye-close-icon.svg'
definePageMeta({ layout: 'auth' })

const authStore = useAuthStore()
const { loginSuccessData, loginErrorData } = storeToRefs(authStore)

const instance = getCurrentInstance()
const showPassword = ref(false)
const isOpenEmailDialog = ref(false)
const accounts = ref(false)
const isValid = ref(false)

const accountTokens = ref({
  ID: null,
  email: null,
  avatarUrl: null,
  token: null,
  token_expires: null,
  first_login: null,
  settings_pin_token: null,
  login_pin_token: null,
  login_pin_token_expires: null,
  remember_token: null,
  workspaces: null,
})

const payload = ref({
  email: null,
  password: null,
  remember_me: false,
})

const errors = ref({
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
})

const rules = ref({
  email: [
    {
      required: true,
      message: 'This field is required.',
      trigger: 'blur',
    },
    {
      type: 'email',
      message: 'Email is not valid.',
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
})

watch(loginSuccessData, (v) => {
  $cookies.remove('token')
  $cookies.remove('first_login')
  $cookies.remove('settings_pin_token')
  $cookies.remove('remember_token')
  $cookies.remove('login_pin_token')
  $cookies.remove('addAccount')

  if (process.client) {
    accounts.value =
      localStorage.getItem('accounts') !== 'undefined' ? JSON.parse(localStorage.getItem('accounts')) : []
  }

  accounts.value.forEach((elem, index) => {
    if (elem.email === v.user.email) {
      accountTokens.value = elem
      accounts.value.splice(index, 1)
    }
  })

  const [accessToken, isFirstLogin] = [v.access_token, v.is_first_login]
  const expirationDate = 1 / 24

  const loginPinTokenExpires = new Date()
  loginPinTokenExpires.setHours(loginPinTokenExpires.getHours() + 1)
  Date.parse(loginPinTokenExpires)
  accountTokens.value.token_expires = loginPinTokenExpires

  $cookies.set('token', accessToken, { expires: expirationDate })
  $cookies.set('remember_token', v.remember_token)
  const loginTokenExpires = (Date.parse(accountTokens.value.login_pin_token_expires) - Date.now()) / 86400000
  if (accountTokens.value.login_pin_token) {
    $cookies.set('login_pin_token', accountTokens.value.login_pin_token, {
      expires: loginTokenExpires,
    })
  }

  accountTokens.value.email = v.user.email
  accountTokens.value.token = accessToken
  accountTokens.value.first_login = isFirstLogin
  accountTokens.value.remember_token = v.remember_token
  accounts.value.push(accountTokens.value)
  accounts.value.forEach((elem, index) => (elem.ID = index))
  $cookies.set('currentAccountID', accounts.value.length - 1)
  if (process.client) {
    localStorage.setItem('accounts', JSON.stringify(accounts.value))
  }
  if (isFirstLogin) {
    navigateTo('/pin')
    $cookies.set('first_login', isFirstLogin)
  } else {
    navigateTo('/')
  }
})

watch(loginErrorData, (v) => {
  if (
    v === 'Please visit your email to verify your account.' ||
    v?.error === 'Please visit your email to verify your account.'
  ) {
    authStore.resendEmail(payload.value.email)
    isOpenEmailDialog.value = true
    return
  }
  if (v === 'Incorrect email or password.') {
    errors.value.global.value = v
  }
  if (typeof v !== 'string') {
    for (const i in v) {
      if (typeof v[i] !== 'string') {
        for (const j in v[i]) {
          errors.value.global.value = v[i][j]
        }
      } else {
        errors.value.global.value = v[i]
      }
    }
  }
})

onMounted(() => {
  const currentDate = new Date()
  currentDate.setDate(currentDate.getDate() + 30)

  window.addEventListener('resize', handleResize)
})

const onSubmit = () => {
  instance.refs.loginForm.validate((valid) => {
    if (process.client) {
      if (valid) {
        const users =
          localStorage.getItem('accounts') !== 'undefined'
            ? JSON.parse(localStorage.getItem('accounts'))
                ?.map((elem) => {
                  if (Date.parse(elem.token_expires) < new Date()) {
                    elem.token = null
                    elem.token_expires = null
                    elem.settings_pin_token = null
                  }
                  return elem
                })
                ?.filter((elem) => Date.parse(elem.login_pin_token_expires) > new Date())
            : []
        if (users?.some((elem) => elem.email === payload.value.email && elem.token)) {
          errors.value.global.value = 'Account already logged in'
        } else {
          localStorage.setItem('accounts', JSON.stringify(users))
          authStore.loginUser(payload.value)
        }
      } else {
        errors.value.global.value = 'Please fill empty areas'
        return false
      }
    }
  })
}

const focusElement = (elem) => {
  instance.refs[elem].focus()
}

const validateField = (fieldName) => {
  instance.refs.loginForm.validateField(fieldName, (isValid, catchedError) => {
    if (!isValid) {
      errors.value[fieldName].value = catchedError[fieldName][0].message
    } else {
      errors.value[fieldName].value = ''
    }
  })

  if (
    Object.values(payload.value).every((item, index) => {
      return index === 2 || item
    })
  ) {
    instance.refs.loginForm.validate((res) => (isValid.value = res))
  } else {
    isValid.value = false
  }
}

const showError = (fieldName, event) => {
  const webApp = isWeb()
  if (webApp) {
    errors.value[fieldName].isShow = event === 'mouseover'
  } else if (event === 'click') {
    errors.value[fieldName].isShow = true
  }
}

const handleResize = () => {
  instance.update()
}

const isWeb = () => {
  return window.innerWidth > 990
}

const clearError = () => {
  errors.value.global.value = ''
}
</script>

<style scoped lang="scss">
.main {
  display: flex;
  position: relative;
  height: 100%;

  &__form {
    width: 390px;

    .forgot-password {
      width: 100%;
      margin-top: 24px;
      display: flex;
      font-size: 14px;
      justify-content: space-between;
      color: $ov-text--subtitle;
      .el-button {
        padding: 0;
        font-weight: 400 !important;
        &:hover {
          color: $ov-primary;
        }
      }
    }
  }
}

.el-input__suffix {
  display: flex !important;
}
.el-input__suffix-inner {
  display: flex !important;
  padding-right: 16px;
}
.el-form-item {
  margin-bottom: 27px;
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
