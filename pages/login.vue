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
            <template #prefix>
              <img src="@/assets/images/icons/user-icon.svg" alt="user_icon" />
            </template>

            <template #suffix>
              <img
                v-if="errors.email.value"
                class="error_icon"
                src="@/assets/images/icons/error.svg"
                alt=""
                @mouseover="showError('email')"
                @mouseout="hideError('email')"
                @click="showErrorClick('email')"
              />
              <div
                v-if="payload.email"
                style="position: relative"
                @click="focusElement('email')"
              >
                <span for="email" class="custom_placeholder">
                  Email or username
                </span>
              </div>

              <div></div>
            </template>
          </el-input>
          <template #error>
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
            <template #prefix>
              <img
                src="@/assets/images/icons/lock-icon.svg"
                alt="password_icon"
              />
            </template>
            <template #suffix>
              <div
                v-if="payload.password"
                style="position: relative"
                @click="focusElement('password')"
              >
                <span for="password" class="custom_placeholder">
                  Password
                </span>
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
                @mouseover="showError('password')"
                @mouseout="hideError('password')"
                @click="showErrorClick('password')"
              />
            </template>
          </el-input>

          <template #error>
            <div
              v-if="errors.password.isShow && isWeb()"
              class="el-form-item__error"
            >
              <span v-html="errors.password.value"></span>
            </div>
            <div></div>
          </template>
          <div class="forgot-password">
            <el-checkbox v-model="payload.remember_me" class="remember-checkbox"
              ><span style="font-weight: 400">Remember me</span></el-checkbox
            >
            <el-button text @click="navigateTo('/password/forgot')"
              >Forgot Password?</el-button
            >
          </div>
        </el-form-item>
        <login-buttons
          :login-loading="authStore.loginLoading"
          login-title="Log In"
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
import { useRoute } from 'vue-router'
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
const $route = useRoute()
const showPassword = ref(false)
const isOpenEmailDialog = ref(false)

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
  const [accessToken, isFirstLogin] = [v.access_token, v.is_first_login]
  const expirationDate = payload.value.remember_me ? null : 1 / 24
  $cookies.set('token', accessToken, { expires: expirationDate })
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
    isOpenEmailDialog.value = true
  }
  if (v === 'Incorrect username or password.') {
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
  if ($route.query.email) {
    payload.email = $route.query.email
  }
  if ($cookies.get('token')) {
    navigateTo('/')
  }
  window.addEventListener('resize', handleResize)
})

const onSubmit = () => {
  instance.refs.loginForm.validate((valid) => {
    if (valid) {
      authStore.loginUser(payload.value)
    } else {
      errors.value.global.value = 'Please fill empty areas'
      return false
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
}

const showErrorClick = (fieldName) => {
  errors.value[fieldName].isShow = true
}

const showError = (fieldName) => {
  if (isWeb()) {
    errors.value[fieldName].isShow = true
  }
}

const hideError = (fieldName) => {
  if (isWeb()) {
    errors.value[fieldName].isShow = false
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
