<template>
  <div class="main">
    <div class="main__form">
      <div class="main__form--title">Reset password</div>
      <div class="main__form--subtitle">
        Please fill the forms to reset password
      </div>
      <el-form
        ref="resetForm"
        class="main__form--box"
        hide-required-asterisk
        :model="payload"
        :rules="rules"
        @submit.prevent="onSubmit"
      >
        <el-form-item prop="password" class="form-item">
          <el-input
            ref="password"
            v-model="payload.password"
            class="main__form--box__input"
            placeholder="Password"
            :type="showPassword ? 'text' : 'password'"
            @input="validateField('password')"
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
              <div
                v-if="errors.password.value"
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
              <div
                v-if="payload.password && errors.password.isShow && isWeb()"
                :class="getColor()"
                class="el-form-item__error strength"
              >
                <span v-html="errors.password.value"></span>
              </div>
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
            <template #prefix>
              <img
                src="@/assets/images/icons/lock-icon.svg"
                alt="password_icon"
              />
            </template>

            <template #suffix>
              <div
                v-if="payload.password_confirmation"
                style="position: relative"
                @click="focusElement('password_confirmation')"
              >
                <span for="password_confirmation" class="custom_placeholder">
                  Confirm Password
                </span>
              </div>
              <img
                :class="errors.password_confirmation.value ? 'eye_icon' : ''"
                :src="showConfirmPassword ? hideEyeIcon : showEyeIcon"
                alt="eye_icon"
                @click="showConfirmPassword = !showConfirmPassword"
              />
              <img
                v-if="errors.password_confirmation.value"
                src="@/assets/images/icons/error.svg"
                alt=""
                class="error_icon"
                @mouseover="showError('password_confirmation')"
                @mouseout="hideError('password_confirmation')"
                @click="showErrorClick('password_confirmation')"
              />
            </template>
          </el-input>
          <template #error>
            <div
              v-if="errors.password_confirmation.isShow && isWeb()"
              class="el-form-item__error"
            >
              <span v-html="errors.password_confirmation.value"></span>
            </div>
            <div></div>
          </template>
        </el-form-item>
        <login-buttons
          login-title="Next"
          :show-social="false"
          :login-loading="resetLoading"
        ></login-buttons>
      </el-form>
    </div>
    <error-massage
      v-if="errors.password.isShow && !isWeb()"
      :dialog-visible="errors.password.isShow && !isWeb()"
      :error-text="errors.password.value"
      :text-color="
        errors.password.status === 'Medium' && payload.password
          ? 'warning'
          : errors.password.status === 'Strong' && payload.password
          ? 'done'
          : 'weak'
      "
      @visible="errors.password.isShow = false"
    >
    </error-massage>

    <error-massage
      v-if="errors.password_confirmation.isShow && !isWeb()"
      :dialog-visible="errors.password_confirmation.isShow && !isWeb()"
      :error-text="errors.password_confirmation.value"
      @visible="errors.password_confirmation.isShow = false"
    >
    </error-massage>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import $cookies from 'js-cookie'
import LoginButtons from '@/components/auth/LoginButtons.vue'
import ErrorMassage from '~/components/auth/ErrorMassageModal.vue'
import useAuthStore from '@/stores/auth'
import showEyeIcon from '@/assets/images/icons/eye-open-icon.svg'
import hideEyeIcon from '@/assets/images/icons/eye-close-icon.svg'
definePageMeta({ layout: 'auth' })

const authStore = useAuthStore()
const { resetSuccessData, resetErrorData, resetLoading } =
  storeToRefs(authStore)

const instance = getCurrentInstance()
const $route = useRoute()

const validatePass = (rule, value, callback) => {
  if (!value) {
    callback(new Error('This field is required'))
  }
  const strength = updatePasswordStrength(value)
  if (strength === 'Weak') {
    callback(new Error('Password strength: <b>Weak</b>'))
    errors.value.password.status = 'Weak'
  } else if (strength === 'Medium') {
    callback()
    errors.value.password.status = 'Medium'
    errors.value.password.value = 'Password strength: <b>Medium</b>'
  } else if (strength === 'Strong') {
    callback()
    errors.value.password.status = 'Strong'
    errors.value.password.value = 'Password strength: <b>Strong</b>'
  }
}

const validatePass2 = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('Please input the password again'))
  } else if (value !== payload.value.password) {
    callback(new Error('Password and confirm password do not match'))
  } else {
    callback()
  }
}

const payload = ref({
  password: null,
  password_confirmation: null,
  pinToken: null,
  email: null,
})

const showPassword = ref(false)
const showConfirmPassword = ref(false)

const rules = ref({
  password: [{ validator: validatePass, trigger: 'input' }],
  password_confirmation: [
    {
      required: true,
      message: 'This field is required.',
      trigger: 'blur',
    },
    { validator: validatePass2, trigger: 'blur' },
  ],
})

const errors = ref({
  password: {
    value: '',
    status: null,
    isShow: false,
  },
  password_confirmation: {
    value: '',
    isShow: false,
  },
})

onMounted(() => {
  payload.value.pinToken = $route.query.token
  payload.value.email = $route.query.email
  while ($cookies.get('token')) {
    $cookies.remove('token')
  }
  window.addEventListener('resize', handleResize)
})

const focusElement = (elem) => {
  instance.refs[elem].focus()
}

const validateField = (fieldName) => {
  instance.refs.resetForm.validateField(fieldName, (isValid, catchedError) => {
    if (!isValid) {
      errors.value[fieldName].value = catchedError[fieldName][0].message
    } else if (fieldName !== 'password') {
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

const updatePasswordStrength = (password) => {
  const mediumRegex =
    /^(?=.*[a-zA-Z])(?=.*[\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])[a-zA-Z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8,}$/
  const strongRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])[a-zA-Z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{12,}$/
  const identicalRegex = /^(?:(.)(?!\1{3}))*$/
  const words = ['password', 'admin', 'qwerty', 'asdfgh', 'xzcvb']

  if (
    identicalRegex.test(password) &&
    (password?.length > 15 ||
      !words.some((elem) => password.toLowerCase().includes(elem)))
  ) {
    if (
      strongRegex.test(password) &&
      (password?.length > 25 ||
        !words.some((elem) => password.toLowerCase().includes(elem)))
    ) {
      return 'Strong'
    } else if (mediumRegex.test(password)) {
      return 'Medium'
    }
  }
  return 'Weak'
}

const getColor = () => {
  return errors.value.password.status === 'Medium'
    ? 'warning'
    : errors.value.password.status === 'Strong'
    ? 'done'
    : ''
}

watch(resetSuccessData, (v) => {
  if (v) {
    payload.value.password = null
    payload.value.password_confirmation = null
    navigateTo('/login')
  }
})

watch(resetErrorData, (v) => {})

const onSubmit = () => {
  instance.refs.resetForm.validate((valid) => {
    if (valid) {
      authStore.resetPassword(payload._value)
    } else {
      errors.value.global.value = 'Please fill empty areas'
      return false
    }
  })
}
</script>

<style scoped lang="scss">
.main {
  width: 100%;
  display: flex;
  position: relative;

  &__form {
    width: 390px;
  }
}

.strength {
  left: 127%;
}

.el-input__suffix {
  display: flex !important;
}
.el-input__suffix-inner {
  display: flex !important;
}

.terms {
  color: #717a7f;
  font-size: 14px;
  text-align: center;
  margin-bottom: 25px;
}
</style>
