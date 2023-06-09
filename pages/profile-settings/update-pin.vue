<template>
  <div class="main">
    <div class="main__form">
      <div class="main__form--title">
        <img src="@/assets/images/icons/chevron-left.svg" alt="chevron-left" @click="$router.go(-1)" />
        <span>Reset PIN</span>
      </div>
      <div class="main__form--subtitle">Fill in the fields to change your PIN.</div>

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
          <span class="clear-error" @click="clearError">X</span>
        </div>
        <el-form-item prop="previous" class="password-form-item">
          <el-input
            id="previous"
            ref="previous"
            v-model="payload.previous"
            :type="showPrevious ? 'text' : 'password'"
            class="main__form--box__input"
            placeholder="Old PIN"
            @input="validateField('previous')"
            @blur="validateField('previous')"
          >
            <template #suffix>
              <div v-if="payload.previous" style="position: relative" @click="focusElement('previous')">
                <span for="previous" class="custom_placeholder"> Old PIN </span>
              </div>
              <img
                :class="errors.previous.value ? 'eye_icon' : ''"
                :src="showPrevious ? hideEyeIcon : showEyeIcon"
                alt="eye_icon"
                @click="showPrevious = !showPrevious"
              />
              <img
                v-if="errors.previous.value"
                src="@/assets/images/icons/error.svg"
                alt=""
                class="error_icon"
                @mouseover="showError('previous', 'mouseover')"
                @mouseout="showError('previous', 'mouseout')"
                @click="showError('previous', 'click')"
              />
            </template>
          </el-input>

          <template #error>
            <div v-if="errors.previous.isShow && isWeb()" class="el-form-item__error">
              <span v-html="errors.previous.value"></span>
            </div>
            <div></div>
          </template>
        </el-form-item>
        <el-form-item prop="pin" class="password-form-item">
          <el-input
            id="pin"
            ref="pin"
            v-model="payload.pin"
            :type="showPIN ? 'text' : 'password'"
            class="main__form--box__input"
            placeholder="New PIN"
            @input="validateField('pin')"
            @blur="validateField('pin')"
          >
            <template #suffix>
              <div v-if="payload.pin" style="position: relative" @click="focusElement('pin')">
                <span for="pin" class="custom_placeholder"> New PIN </span>
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
                <span for="password" class="custom_placeholder"> Repeat PIN </span>
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
            <div v-if="!errors.pin_confirmation.isShow && isWeb()" class="el-form-item__error">
              <span v-html="errors.pin_confirmation.value"></span>
            </div>
            <div></div>
          </template>
        </el-form-item>
        <div class="forgot-password">
          <el-button style="font-size: 14px; font-weight: 400" @click="onForgot">Forgot PIN?</el-button>
        </div>
        <el-button class="submit-button" native-type="submit" :loading="isLoadingSubmit" :disabled="!isValid">
          <span class="submit-button__text">{{ isLoadingSubmit ? '' : 'Save' }}</span>
        </el-button>

        <error-massage
          v-if="errors.previous.isShow && !isWeb()"
          :dialog-visible="errors.previous.isShow && !isWeb()"
          :error-text="errors.previous.value"
          @visible="errors.previous.isShow = false"
        ></error-massage>

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

    <ConfirmModal
      v-if="isOpenEmailDialog"
      :email="payload.email"
      :dialog-visible="isOpenEmailDialog"
      @close="isOpenEmailDialog = false"
    ></ConfirmModal>

    <check-modal
      v-if="isOpenPINDialog"
      :dialog-visible="isOpenPINDialog"
      @close="isOpenPINDialog = false"
    ></check-modal>
  </div>
</template>

<script setup>
import { getCurrentInstance, watch } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import usePINStore from '~/stores/pin'
import useProfileStore from '~/stores/profile'

import ErrorMassage from '~/components/auth/ErrorMassageModal.vue'
import ConfirmModal from '@/components/shared/OvConfirmPINChangeModal.vue'
import CheckModal from '@/components/auth/AccessCheckModal.vue'
import showEyeIcon from '@/assets/images/icons/eye-open-icon.svg'
import hideEyeIcon from '@/assets/images/icons/eye-close-icon.svg'
import settingsToken from '~/middleware/settingsToken'
import loginToken from '~/middleware/loginToken'
import auth from '~/middleware/auth'
definePageMeta({ layout: 'default' })

const pinStore = usePINStore()
const profileStore = useProfileStore()
const { resetPinFailureData, resetPinData, forgotPinFailureData, forgotPinData, isLoadingSubmit } =
  storeToRefs(pinStore)
const { profileSuccessData } = storeToRefs(profileStore)

const instance = getCurrentInstance()
const $router = useRouter()

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
  previous: null,
  pin: null,
  pin_confirmation: null,
})
const showPrevious = ref(false)
const showPIN = ref(false)
const showPINConfirmation = ref(false)
const isOpenEmailDialog = ref(false)
const isOpenPINDialog = ref(false)
const isValid = ref(false)

const errors = ref({
  previous: {
    value: '',
    isShow: false,
  },
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
  previous: [
    {
      required: true,
      message: 'This field is required.',
      trigger: 'blur',
    },
  ],
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

watch(resetPinFailureData, (v) => {
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

watch(resetPinData, (v) => {
  if (v) navigateTo('/')
})

watch(forgotPinFailureData, (v) => {
  if (!isOpenEmailDialog.value) {
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

watch(forgotPinData, (v) => {
  if (v) {
    isOpenEmailDialog.value = true
  }
})
onMounted(() => {
  auth()
  isOpenPINDialog.value = loginToken()
  isOpenPINDialog.value = settingsToken()
  if (profileSuccessData.value?.user.email) {
    payload.value.email = profileSuccessData.value?.user.email
  }
  window.addEventListener('resize', handleResize(instance))
})

const onSubmit = () => {
  pinStore.resetPin(payload.value)
}

const onForgot = () => {
  payload.value.email = profileSuccessData.value?.user.email
  pinStore.forgotPin()
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

const clearError = () => {
  errors.value.global.value = ''
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
  background-color: $ov-background;
  width: 100%;
  border-radius: 20px 0 0 20px;
  padding: 37px 0 82px 50px;

  &__form {
    width: 390px;
    &--title {
      font-style: normal;
      font-weight: 600;
      font-size: 24px;
      line-height: 29px;
      margin-bottom: 17px;
      display: flex;
      align-items: center;
      cursor: pointer;
      gap: 16px;
      color: #0d1c2e;
    }

    &--subtitle {
      font-size: 14px;
      color: $ov-text--subtitle;
      margin-bottom: 70px;
    }

    .forgot-password {
      margin-top: 24px;
      display: flex;
      justify-content: space-between;
      text-decoration: underline #6979f8;
      font-size: 14px;
      text-align: left;
      .el-button {
        font-size: 12px;
        font-weight: 500;
        border: none;
        background-color: inherit;
        padding: 0;
        color: #6979f8;
        &:hover {
          color: $ov-primary;
          border: none;
          background-color: inherit;
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
  margin-top: 157px;
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
