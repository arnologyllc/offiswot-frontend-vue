<template>
  <div class="main">
    <div class="main__form">
      <div class="main__form--title">Set PIN</div>
      <div class="main__form--subtitle">Fill in the fields to set your PIN.</div>
      <el-form
        ref="pinForm"
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
        </div>
        <el-form-item prop="pin" class="password-form-item">
          <el-input
            id="pin"
            ref="pin"
            v-model="payload.pin"
            :type="showPIN ? 'text' : 'password'"
            class="main__form--box__input"
            placeholder="Enter PIN"
            @input="validateField('pin')"
            @blur="validateField('pin')"
          >
            <template #suffix>
              <div v-if="payload.pin" style="position: relative" @click="focusElement('pin')">
                <span for="pin" class="custom_placeholder"> PIN </span>
              </div>
              <img
                :class="errors.pin.value ? 'eye_icon' : ''"
                :src="showPIN ? hideEyeIcon : showEyeIcon"
                alt="eye_icon"
                @click="showPIN = !showPIN"
              />
              <img
                v-if="errors.pin.value"
                src="@/assets/images/icons/error.svg"
                alt=""
                class="error_icon"
                @mouseover="showError('pin', 'mouseover')"
                @mouseout="showError('pin', 'mouseout')"
                @click="showError('pin', 'click')"
              />
            </template>
          </el-input>

          <template #error>
            <div v-if="errors.pin.isShow && isWeb()" class="el-form-item__error">
              <span v-html="errors.pin.value"></span>
            </div>
            <div></div>
          </template>
        </el-form-item>
        <el-form-item prop="pin_confirmation" class="password-form-item">
          <el-input
            id="pin_confirmation"
            ref="pin_confirmation"
            v-model="payload.pin_confirmation"
            :type="showPINConfirmation ? 'text' : 'password'"
            class="main__form--box__input"
            placeholder="Repeat PIN"
            @input="validateField('pin_confirmation')"
            @blur="validateField('pin_confirmation')"
          >
            <template #suffix>
              <div v-if="payload.pin_confirmation" style="position: relative" @click="focusElement('pin_confirmation')">
                <span for="password" class="custom_placeholder"> PIN Confirmation </span>
              </div>
              <img
                :class="errors.pin_confirmation.value ? 'eye_icon' : ''"
                :src="showPINConfirmation ? hideEyeIcon : showEyeIcon"
                alt="eye_icon"
                @click="showPINConfirmation = !showPINConfirmation"
              />
              <img
                v-if="errors.pin_confirmation.value"
                src="@/assets/images/icons/error.svg"
                alt=""
                class="error_icon"
                @mouseover="showError('pin_confirmation', 'mouseover')"
                @mouseout="showError('pin_confirmation', 'mouseout')"
                @click="showError('pin_confirmation', 'click')"
              />
            </template>
          </el-input>

          <template #error>
            <div v-if="errors.pin_confirmation.isShow && isWeb()" class="el-form-item__error">
              <span v-html="errors.pin_confirmation.value"></span>
            </div>
            <div></div>
          </template>
        </el-form-item>
        <el-button class="submit-button" native-type="submit" :loading="isLoadingSubmit" :disabled="!isValid">
          <span class="submit-button__text">Save</span>
        </el-button>

        <error-massage
          v-if="errors.pin.isShow && !isWeb()"
          :dialog-visible="errors.pin.isShow && !isWeb()"
          :error-text="errors.pin.value"
          @visible="errors.pin.isShow = false"
        ></error-massage>
        <error-massage
          v-if="errors.pin_confirmation.isShow && !isWeb()"
          :dialog-visible="errors.pin_confirmation.isShow && !isWeb()"
          :error-text="errors.pin_confirmation.value"
          @visible="errors.pin_confirmation.isShow = false"
        ></error-massage>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { getCurrentInstance, watch } from 'vue'
import { storeToRefs } from 'pinia'
import $cookies from 'js-cookie'
import usePINStore from '~/stores/pin'
import useProfileStore from '~/stores/profile'
import ErrorMassage from '~/components/auth/ErrorMassageModal.vue'
import showEyeIcon from '@/assets/images/icons/eye-open-icon.svg'
import hideEyeIcon from '@/assets/images/icons/eye-close-icon.svg'
import auth from '~/middleware/auth'
definePageMeta({ layout: 'default' })
const accounts = ref(false)

const pinStore = usePINStore()
const profileStore = useProfileStore()
const { setPinData, setPinFailureData, isLoadingSubmit } = storeToRefs(pinStore)
const isValid = ref(false)

const instance = getCurrentInstance()

const validateRepeatPIN = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('Please input the PIN again'))
  } else if (value !== payload.value.pin) {
    callback(new Error('PIN and repeat PIN do not match.'))
  } else {
    callback()
  }
}
const validatePIN = (rule, value, callback) => {
  const regex = /^\d{4,6}$/
  if (!regex.test(value)) {
    callback(
      new Error(
        `<span>PIN is improperly formatted.<br></span>
            <ul class="error_info">
              <li>4-6 characters long.</li>
              <li>Should include only numbers.</li>
            </ul>`
      )
    )
  } else {
    callback()
  }
}

const payload = ref({
  pin: null,
  pin_confirmation: null,
})
const errors = ref({
  pin: {
    value: '',
    isShow: false,
  },
  pin_confirmation: {
    value: '',
    isShow: false,
  },
  global: {
    value: '',
  },
})

const rules = ref({
  pin: [
    {
      required: true,
      message: 'This field is required.',
      trigger: 'blur',
    },
    {
      validator: validatePIN,
      trigger: 'blur',
    },
  ],
  pin_confirmation: [
    {
      required: true,
      message: 'This field is required.',
      trigger: 'blur',
    },
    { validator: validateRepeatPIN, trigger: 'blur' },
  ],
})

const showPIN = ref(false)
const showPINConfirmation = ref(false)

watch(setPinFailureData, (v) => {
  for (const i in v) {
    if (typeof v[i] !== 'string') {
      for (const j in v[i]) {
        errors.value.global.value = v[i][j]
      }
    } else {
      errors.value.global.value = v[i]
    }
  }
  if (errors.value.global.value === 'You have already created a pin.') {
    setTimeout(() => {
      if (process.client) {
        accounts.value[0].first_login = false
        localStorage.setItem('accounts', JSON.stringify(accounts.value))
      }
      $cookies.remove('first_login')
      navigateTo('/')
    }, 2000)
  }
})

watch(setPinData, ({ data }) => {
  if (process.client) {
    const initAccountValue = JSON.parse(localStorage.getItem('accounts'))
    const userID = $cookies.get('currentAccountID') ? $cookies.get('currentAccountID') : 0
    initAccountValue[userID].first_login = null
    const loginPinTokenExpires = new Date()
    loginPinTokenExpires.setDate(loginPinTokenExpires.getDate() + 30)
    $cookies.set('login_pin_token', data.login_pin_token, {
      expires: (Date.parse(loginPinTokenExpires) - new Date()) / 86400000,
    })
    initAccountValue[userID].login_pin_token = data.login_pin_token
    initAccountValue[userID].login_pin_token_expires = loginPinTokenExpires
    $cookies.set('settings_pin_token', data.settings_pin_token, 0)
    initAccountValue[userID].settings_pin_token = data.settings_pin_token

    localStorage.setItem('accounts', JSON.stringify(initAccountValue))
  }
  $cookies.remove('first_login')
  navigateTo('/')
})

onMounted(() => {
  auth()
  if (process.client) {
    accounts.value = JSON.parse(localStorage.getItem('accounts'))
  }
  if (profileStore.profileSuccessData?.value?.user.email) {
    payload.value.email = profileSuccessData?.value?.user.email
  }
  window.addEventListener('resize', handleResize)
})
const onSubmit = () => {
  pinStore.setPin(payload.value)
}

const validateField = (fieldName) => {
  instance.refs.pinForm.validateField(fieldName, (isValid, catchedError) => {
    if (!isValid) {
      errors.value[fieldName].value = catchedError[fieldName][0].message
    } else {
      errors.value[fieldName].value = ''
    }
  })

  if (Object.values(payload.value).every((item) => item)) {
    instance.refs.pinForm.validate((res) => (isValid.value = res))
  } else {
    isValid.value = false
  }
}

const isWeb = () => {
  return window.innerWidth > 990
}

const handleResize = () => {
  instance.update()
}

const showError = (fieldName, event) => {
  const webApp = isWeb()
  if (webApp) {
    errors.value[fieldName].isShow = event === 'mouseover'
  } else if (event === 'click') {
    errors.value[fieldName].isShow = true
  }
}

const focusElement = (elem) => {
  instance.refs[elem].focus()
}
</script>

<style scoped lang="scss">
.main {
  display: flex;
  position: relative;
  height: 100vh;
  width: 100%;
  background-color: $ov-background;
  border-radius: 20px 0 0 0;
  padding: 37px 0 82px 50px;

  &__form {
    width: 390px;
  }
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
.submit-button {
  background: $ov-primary;
  color: white;
  text-transform: uppercase;
  width: 220px;
  height: 48px;
  padding: 0;
  border-radius: 6px;
  margin-top: 200px;
  span {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__text {
    width: 100%;
    display: flex;
    font-size: 17px;
    font-weight: 700;
    justify-content: center !important;
  }
  &__box {
    display: flex;
    justify-content: flex-end;
  }
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

@media (max-width: 485px) {
  .main {
    padding-left: 0;
    &__form {
      padding: 0 10px;
      margin: 0 auto;
      &--box {
        text-align: center;
      }
      &--title {
        font-size: 20px;
        text-align: center;
      }
      &--subtitle {
        text-align: center;
      }
    }
  }
}
</style>
