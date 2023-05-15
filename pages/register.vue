<template>
  <div class="main">
    <div class="main__form">
      <div class="main__form--title">Register</div>
      <div class="main__form--subtitle">Please fill the forms to register</div>
      <el-form
        ref="registerForm"
        class="main__form--box"
        hide-required-asterisk
        autocomplate="new-password"
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
        <el-form-item prop="email" class="form-item">
          <el-input
            ref="email"
            v-model="payload.email"
            class="main__form--box__input"
            placeholder="E-mail"
            @input="validateField('email')"
            @blur="validateField('email')"
          >
            <template #prefix>
              <img
                src="@/assets/images/icons/email-icon.svg"
                alt="email_icon"
              />
            </template>
            <template #suffix>
              <div
                v-if="payload.email"
                style="position: relative"
                @click="focusElement('email')"
              >
                <span for="email" class="custom_placeholder"> Email </span>
              </div>
              <img
                v-if="errors.email.value"
                class="error_icon"
                src="@/assets/images/icons/error.svg"
                alt=""
                @mouseover="showError('email')"
                @mouseout="hideError('email')"
                @click="showErrorClick('email')"
              />
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
        <el-form-item prop="username" class="form-item">
          <el-input
            ref="username"
            v-model="payload.username"
            class="main__form--box__input"
            placeholder="Username"
            maxlength="30"
            @input="validateField('username')"
            @blur="validateField('username')"
          >
            <template #prefix>
              <img src="@/assets/images/icons/user-icon.svg" alt="user_icon" />
            </template>

            <template #suffix>
              <div
                v-if="payload.username"
                style="position: relative"
                @click="focusElement('username')"
              >
                <span
                  for="username"
                  class="custom_placeholder"
                  :class="payload.username ? 'active' : ''"
                >
                  Username
                </span>
              </div>
              <template v-if="errors.username.value || errors.username.status">
                <div
                  class="error_icon"
                  @mouseover="showError('username')"
                  @mouseout="hideError('username')"
                  @click="showErrorClick('username')"
                >
                  <img
                    v-if="
                      errors.username.status === 'Medium' && payload.username
                    "
                    src="@/assets/images/icons/warning.svg"
                    alt=""
                  />
                  <img
                    v-else-if="errors.username.value"
                    src="@/assets/images/icons/error.svg"
                    alt=""
                  />
                </div>
              </template>
              <div
                v-if="
                  errors.username.status === 'Medium' &&
                  errors.username.isShow &&
                  isWeb()
                "
                class="el-form-item__error strength warning"
              >
                <span v-html="errors.username.value"></span>
              </div>
              <div></div>
            </template>
          </el-input>
          <template #error>
            <div
              v-if="errors.username.isShow && isWeb()"
              class="el-form-item__error"
            >
              <span v-html="errors.username.value"></span>
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
              <template v-if="errors.password.value">
                <div
                  class="error_icon"
                  @mouseover="showError('password')"
                  @mouseout="hideError('password')"
                  @click="showErrorClick('password')"
                >
                  <img
                    v-if="
                      errors.password.status === 'Medium' && payload.password
                    "
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
            </template>
          </el-input>
          <div
            v-if="errors.password.isShow && isWeb()"
            :class="getColor()"
            class="el-form-item__error strength"
          >
            <span v-html="errors.password.value"></span>
          </div>
          <template #error>
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

              <template v-if="errors.password_confirmation.value">
                <img
                  src="@/assets/images/icons/error.svg"
                  alt=""
                  class="error_icon"
                  @mouseover="showError('password_confirmation')"
                  @mouseout="hideError('password_confirmation')"
                  @click="showErrorClick('password_confirmation')"
                />
              </template>
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
        <div class="terms">
          <span>By signing up you agree on our <u>Term and Conditions</u></span>
        </div>
        <login-buttons
          login-title="Register"
          :login-loading="authStore.registerLoading"
          social-title="Sign up with Google"
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
      v-if="errors.username.isShow && !isWeb()"
      :dialog-visible="errors.username.isShow && !isWeb()"
      :error-text="errors.username.value"
      :text-color="
        errors.username.status === 'Medium' && payload.username
          ? 'warning'
          : 'weak'
      "
      @visible="errors.username.isShow = false"
    ></error-massage>

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
    ></error-massage>

    <error-massage
      v-if="errors.password_confirmation.isShow && !isWeb()"
      :dialog-visible="errors.password_confirmation.isShow && !isWeb()"
      :error-text="errors.password_confirmation.value"
      @visible="errors.password_confirmation.isShow = false"
    ></error-massage>
  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import LoginButtons from '@/components/auth/LoginButtons.vue'
import ConfirmEmail from '@/components/shared/OvConfirmEmailModal.vue'
import ErrorMassage from '~/components/auth/ErrorMassageModal.vue'
import useAuthStore from '~/stores/auth'
import showEyeIcon from '@/assets/images/icons/eye-open-icon.svg'
import hideEyeIcon from '@/assets/images/icons/eye-close-icon.svg'
definePageMeta({ layout: 'auth' })

const authStore = useAuthStore()
const { registerFailureData, registerSuccessData } = storeToRefs(authStore)

const instance = getCurrentInstance()
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const isOpenEmailDialog = ref(false)

const payload = ref({
  email: null,
  username: null,
  password: null,
  password_confirmation: null,
})

const errors = ref({
  email: {
    value: '',
    isShow: false,
  },
  username: {
    value: '',
    status: null,
    isShow: false,
  },
  password: {
    value: '',
    status: null,
    isShow: false,
  },
  password_confirmation: {
    value: '',
    isShow: false,
  },
  global: {
    value: null,
  },
})

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

const validateUsernameSymbols = (rule, value, callback) => {
  const regex = /^[A-Za-z0-9_.]*$/g
  if (!regex.test(value)) {
    callback(
      new Error(
        `<span>Username is improperly formatted.<br></span>
            <ul class="error_info">
              <li>Your handle can't exceed 30 characters. </li>
              <li>It can only contain letters, numbers, underscores and dots. </li>
              <li>It can't contain symbols or punctuation marks. </li>
              <li>It needs to be unique.</li>
            </ul>`
      )
    )
  } else {
    callback()
  }
}

const validateUsernameSymbolsCount = (rule, value, callback) => {
  if (value?.length === 30) {
    errors.value.username.value = "Your handle can't exceed 30 characters."
    errors.value.username.status = 'Medium'
    callback()
  } else if (value?.length > 0 && value?.length < 30) {
    errors.value.username.value = ''
    errors.value.username.status = null
    callback()
  } else {
    errors.value.username.value = 'This field is required'
    errors.value.username.status = null
    callback(new Error(`This field is required`))
  }
}

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
  username: [
    {
      required: true,
      message: 'This field is required.',
      trigger: 'blur',
    },
    {
      min: 3,
      message: `Username is improperly formatted.<br />
                      <span class="error_info">Your username must be at least 3 characters long.</span>
                      `,
      trigger: 'blur',
    },
    { validator: validateUsernameSymbols, trigger: 'blur' },
    { validator: validateUsernameSymbolsCount, trigger: 'change' },
  ],
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

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

const onSubmit = () => {
  instance.refs.registerForm.validate((valid) => {
    if (valid) {
      authStore.registerUser(payload.value)
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
  instance.refs.registerForm.validateField(
    fieldName,
    (isValid, catchedError) => {
      if (
        (errors.value[fieldName].status !== 'Medium' &&
          fieldName === 'username') ||
        fieldName !== 'username'
      ) {
        if (!isValid) {
          errors.value[fieldName].value = catchedError[fieldName][0].message
        } else if (fieldName !== 'password') {
          errors.value[fieldName].value = ''
        }
      }
    }
  )
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
      !words.some((elem) => password?.toLowerCase().includes(elem)))
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

watch(registerSuccessData, (v) => {
  isOpenEmailDialog.value = true
})

watch(registerFailureData, (v) => {
  if (v === 'Account exists, please login.') {
    errors.value.global.value = v
  }
  if (v === 'Email already exists but is not verified.') {
    isOpenEmailDialog.value = true
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
  } else {
    errors.value.global.value = v
  }
})
</script>

<style scoped lang="scss">
.main {
  position: relative;
  display: flex;
  margin-bottom: 60px !important;

  &__form {
    width: 390px;

    .form-item {
      position: relative;
      margin-bottom: 27px;
      input {
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

u {
  cursor: pointer;
}

.terms {
  color: #717a7f;
  font-size: 14px;
  text-align: center;
  margin-bottom: 25px;
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
