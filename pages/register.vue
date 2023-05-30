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
        <div v-if="errors.global.value" class="el-form-item__global-error-container">
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
            placeholder="Email"
            @input="validateField('email')"
            @blur="validateField('email')"
          >
            <template #prefix>
              <img src="@/assets/images/icons/email-icon.svg" alt="email_icon" />
            </template>
            <template #suffix>
              <div v-if="payload.email" style="position: relative" @click="focusElement('email')">
                <span for="email" class="custom_placeholder"> Email </span>
              </div>
              <img
                v-if="errors.email.value"
                class="error_icon"
                src="@/assets/images/icons/error.svg"
                alt=""
                @mouseover="showError('email', 'mouseover')"
                @mouseout="showError('email', 'mouseout')"
                @click="showError('email', 'click')"
              />
            </template>
          </el-input>

          <template #error>
            <div v-if="errors.email.isShow && isWeb()" class="el-form-item__error">
              <span>{{ errors.email.value }}</span>
            </div>
            <div></div>
          </template>
        </el-form-item>
        <el-form-item prop="full_name" class="form-item">
          <el-input
            ref="full_name"
            v-model="payload.full_name"
            class="main__form--box__input"
            placeholder="Full Name"
            maxlength="30"
            @input="validateField('full_name')"
            @blur="validateField('full_name')"
          >
            <template #prefix>
              <img src="@/assets/images/icons/user-icon.svg" alt="user_icon" />
            </template>

            <template #suffix>
              <div v-if="payload.full_name" style="position: relative" @click="focusElement('full_name')">
                <span for="full_name" class="custom_placeholder" :class="payload.full_name ? 'active' : ''">
                  Full Name
                </span>
              </div>
              <template v-if="errors.full_name.value || errors.full_name.status">
                <div
                  class="error_icon"
                  @mouseover="showError('full_name', 'mouseover')"
                  @mouseout="showError('full_name', 'mouseout')"
                  @click="showError('full_name', 'click')"
                >
                  <img
                    v-if="errors.full_name.status === 'Medium' && payload.full_name"
                    src="@/assets/images/icons/warning.svg"
                    alt=""
                  />
                  <img v-else-if="errors.full_name.value" src="@/assets/images/icons/error.svg" alt="" />
                </div>
              </template>
            </template>
          </el-input>

          <div
            v-if="errors.full_name.status === 'Medium' && errors.full_name.isShow && isWeb()"
            class="el-form-item__error strength warning"
          >
            <span v-html="errors.full_name.value"></span>
          </div>
          <template #error>
            <div v-if="errors.full_name.isShow && isWeb()" class="el-form-item__error">
              <span v-html="errors.full_name.value"></span>
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
              <template v-if="errors.password.value">
                <div
                  class="error_icon"
                  @mouseover="showError('password', 'mouseover')"
                  @mouseout="showError('password', 'mouseout')"
                  @click="showError('password', 'click')"
                >
                  <img
                    v-if="errors.password.status === 'Medium' && payload.password"
                    src="@/assets/images/icons/warning.svg"
                    alt=""
                  />
                  <img
                    v-else-if="errors.password.status === 'Strong' && payload.password"
                    src="@/assets/images/icons/good.svg"
                    alt=""
                  />
                  <img v-else src="@/assets/images/icons/error.svg" alt="" />
                </div>
              </template>
            </template>
          </el-input>
          <div v-if="errors.password.isShow && isWeb()" :class="getColor()" class="el-form-item__error strength">
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
              <img src="@/assets/images/icons/lock-icon.svg" alt="password_icon" />
            </template>
            <template #suffix>
              <div
                v-if="payload.password_confirmation"
                style="position: relative"
                @click="focusElement('password_confirmation')"
              >
                <span for="password_confirmation" class="custom_placeholder"> Confirm Password </span>
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
                  @mouseover="showError('password_confirmation', 'mouseover')"
                  @mouseout="showError('password_confirmation', 'mouseout')"
                  @click="showError('password_confirmation', 'click')"
                />
              </template>
            </template>
          </el-input>
          <template #error>
            <div v-if="errors.password_confirmation.isShow && isWeb()" class="el-form-item__error">
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
          :is-valid="isValid"
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
      v-if="errors.full_name.isShow && !isWeb()"
      :dialog-visible="errors.full_name.isShow && !isWeb()"
      :error-text="errors.full_name.value"
      :text-color="errors.full_name.status === 'Medium' && payload.full_name ? 'warning' : 'weak'"
      @visible="errors.full_name.isShow = false"
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
import { computed, getCurrentInstance, onMounted } from 'vue'
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
const isValid = ref(false)

const payload = ref({
  email: null,
  full_name: null,
  password: null,
  password_confirmation: null,
})

const errors = ref({
  email: {
    value: '',
    isShow: false,
  },
  full_name: {
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
  full_name: [
    {
      required: true,
      message: 'This field is required.',
      trigger: 'blur',
    },
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
  instance.refs.registerForm.validate((valid, ...props) => {
    if (valid) {
      authStore.registerUser(payload.value)
    } else {
      return false
    }
  })
}

const focusElement = (elem) => {
  instance.refs[elem].focus()
}

const validateField = (fieldName) => {
  instance.refs.registerForm.validateField(fieldName, (isValid, catchedError) => {
    if ((errors.value[fieldName].status !== 'Medium' && fieldName === 'full_name') || fieldName !== 'full_name') {
      if (!isValid) {
        errors.value[fieldName].value = catchedError[fieldName][0].message
      } else if (fieldName !== 'password') {
        errors.value[fieldName].value = ''
      }
    }
  })
  if (Object.values(payload.value).every((item) => item))
    instance.refs.registerForm.validate((res) => (isValid.value = res))
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

const updatePasswordStrength = (password) => {
  const mediumRegex =
    /^(?=.*[a-zA-Z])(?=.*[\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])[a-zA-Z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8,}$/
  const strongRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])[a-zA-Z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{12,}$/
  const identicalRegex = /^(?:(.)(?!\1{3}))*$/
  const words = ['password', 'admin', 'qwerty', 'asdfgh', 'xzcvb']

  if (
    identicalRegex.test(password) &&
    (password?.length > 15 || !words.some((elem) => password?.toLowerCase().includes(elem)))
  ) {
    if (
      strongRegex.test(password) &&
      (password?.length > 25 || !words.some((elem) => password.toLowerCase().includes(elem)))
    ) {
      return 'Strong'
    } else if (mediumRegex.test(password)) {
      return 'Medium'
    }
  }
  return 'Weak'
}

const getColor = () => {
  switch (errors.value.password.status) {
    case 'Medium':
      return 'warning'
    case 'Strong':
      return 'done'
    default:
      return ''
  }
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
