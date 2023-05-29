<template>
  <div class="main">
    <div class="main__form">
      <div class="main__form--title">Reset PIN</div>
      <div class="main__form--subtitle">Enter a new PIN below to change your PIN.</div>
      <el-form
        ref="resetForm"
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
            @blur="validateField('pin')"
            @input="validateField('pin')"
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
          <span class="submit-button__text">{{ isLoadingSubmit ? '' : 'Save' }}</span>
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
import { storeToRefs } from 'pinia'
import { getCurrentInstance, watch } from 'vue'
import { useRoute } from 'vue-router'
import usePINStore from '~/stores/pin'
import ErrorMassage from '~/components/auth/ErrorMassageModal.vue'
import showEyeIcon from '@/assets/images/icons/eye-open-icon.svg'
import hideEyeIcon from '@/assets/images/icons/eye-close-icon.svg'
import auth from '~/middleware/auth'
definePageMeta({ layout: 'default' })

const pinStore = usePINStore()
const { changePinData, changePinFailureData, isLoadingSubmit } = storeToRefs(pinStore)

const instance = getCurrentInstance()
const $route = useRoute()

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
  pinToken: null,
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
      trigger: 'input',
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
const isValid = ref(false)

watch(changePinFailureData, (v) => {
  for (const i in v) {
    if (typeof v[i] !== 'string') {
      for (const j in v[i]) {
        errors.value.global.value = v[i][j]
      }
    } else {
      errors.value.global.value = v[i]
    }
  }
})

watch(changePinData, (v) => {
  payload.value = {
    pin: null,
    pin_confirmation: null,
  }
  navigateTo('/')
})

onMounted(() => {
  auth()
  if ($route.query.email) {
    payload.value.email = $route.query.email
  }

  if ($route.query.token) {
    payload.value.pinToken = $route.query.token
  }
  window.addEventListener('resize', handleResize)
})

const onSubmit = () => {
  instance.refs.resetForm.validate((valid) => {
    if (valid) {
      pinStore.changePin(payload.value)
    } else {
      errors.value.global.value = 'Please fill empty areas'
      return false
    }
  })
}

const validateField = (fieldName) => {
  instance.refs.resetForm.validateField(fieldName, (isValid, catchedError) => {
    if (!isValid) {
      errors.value[fieldName].value = catchedError[fieldName][0].message
    } else {
      errors.value[fieldName].value = ''
    }
  })

  if (Object.values(payload.value).every((item) => item))
    instance.refs.resetForm.validate((res) => (isValid.value = res))
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
  width: 100%;
  display: flex;
  position: relative;
  height: 100vh;
  background-color: $ov-background;
  border-radius: 20px 0 0 20px;
  padding: 37px 0 82px 50px;

  &__form {
    width: 390px;
    &--title {
      font-size: 20px;
      font-weight: 600;
      color: $ov-text--title;
      margin-bottom: 10px;
    }

    &--subtitle {
      font-size: 14px;
      color: $ov-text--subtitle;
      margin-bottom: 30px;
    }
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
