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
                <span for="email" class="placeholder"> Email or username </span>
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
                <span for="password" class="password-placeholder">
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
              >Remember me</el-checkbox
            >
            <el-button
              text
              style="font-size: 14px; font-weight: 400"
              @click="navigateTo('/password/forgot')"
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
  const expirationDate = payload.value.remember_me ? 0 : 1 / 24
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
        height: 48px;
        .el-input__inner {
          height: 48px;
          border-radius: 6px;
          border-color: $ov-border--light;
          padding-left: 48px;

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
          position: absolute;
        }

        .el-input__prefix {
          width: 32px;
          left: 16px;
        }
        .el-input__suffix {
          cursor: pointer;
          right: 0;
          .el-input__suffix-inner {
            display: flex;
          }
        }
      }
    }
    .forgot-password {
      width: 100%;
      margin-top: 24px;
      display: flex;
      font-size: 14px;
      justify-content: space-between;
      color: $ov-text--subtitle;
      font-weight: 400 !important;
      .el-button {
        padding: 0;
        &:hover {
          color: $ov-primary;
        }
      }
      .remember-checkbox {
        .el-checkbox__inner {
          width: 24px;
          height: 24px;
          border-radius: 6px;
          border-color: $ov-primary--light;
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
        .el-checkbox__label {
          color: $ov-text--subtitle;
        }
      }
      & .is-checked {
        .el-checkbox__inner {
          background: $ov-primary;
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
      left: -260px;
    }
  }

  @keyframes showPasswordPlaceholder {
    to {
      top: -34px;
      left: -292px;
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
      left: -157px;
    }
  }

  @keyframes showPasswordPlaceholder {
    to {
      top: -34px;
      left: -189px;
    }
  }

  .placeholder {
    left: -100px;
  }

  .password-placeholder {
    left: -130px;
  }
}

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
  top: 13px;
  right: 7px;
}

.eye_icon {
  position: relative;
  right: 24px;
}
.weak {
  color: #e60022 !important;
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
