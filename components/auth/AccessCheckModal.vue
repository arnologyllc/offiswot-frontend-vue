<template>
  <el-dialog
    v-model="props.dialogVisible"
    :width="dialogWidth"
    :height="dialogHeight"
    :close-on-click-modal="false"
    text-align="center"
    :show-close="false"
    top="230px"
    class="access_modal"
    @close="$emit('close')"
  >
    <template #header>
      <div class="access-header">
        <h3>Access check</h3>
      </div>
    </template>

    <div class="title__image">
      <img src="@/assets/images/icons/access-check.svg" alt="" />
    </div>
    <span class="title__text"> Please enter your PIN in order to access account management section. </span>
    <el-form
      ref="pinForm"
      class="main__form--box"
      hide-required-asterisk
      :show-message="false"
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
      <el-form-item prop="pin" class="password-form-item">
        <el-input
          id="pin"
          ref="pin"
          v-model="payload.pin"
          :type="showPIN ? 'text' : 'password'"
          class="main__form--box__input"
          placeholder="Enter PIN"
          autofocus
          @input="validateField('pin')"
          @blur="validateField('pin')"
        >
          <template #suffix>
            <div v-if="payload.pin" style="position: relative" @click="focusElement('pin')">
              <span for="pin" class="custom_placeholder"> Enter PIN </span>
            </div>
            <img :src="showPIN ? hideEyeIcon : showEyeIcon" alt="eye_icon" @click="showPIN = !showPIN" />
          </template>
        </el-input>
      </el-form-item>
      <div class="forgot-password">
        <el-button style="font-size: 14px; font-weight: 400" @click="onForgot">Forgot PIN?</el-button>
      </div>
      <el-button class="submit-button" native-type="submit" :loading="isLoadingSubmit" :disabled="!payload.pin">
        <span class="submit-button__text">{{ isLoadingSubmit ? '' : 'NEXT' }}</span>
      </el-button>
    </el-form>

    <ConfirmModal
      v-if="isOpenEmailDialog"
      :email="payload.email"
      :dialog-visible="isOpenEmailDialog"
      :append-to-body="true"
      @close="isOpenEmailDialog = false"
    ></ConfirmModal>
  </el-dialog>
</template>

<script setup>
import { getCurrentInstance, ref } from 'vue'
import { storeToRefs } from 'pinia'
import $cookies from 'js-cookie'
import ConfirmModal from '@/components/shared/OvConfirmPINChangeModal.vue'
import showEyeIcon from '@/assets/images/icons/eye-open-icon.svg'
import hideEyeIcon from '@/assets/images/icons/eye-close-icon.svg'
import usePinStore from '~/stores/pin'
import useProfileStore from '~/stores/profile'
const profileStore = useProfileStore()

const dialogWidth = ref('450px')
const dialogHeight = ref('400px')
const instance = getCurrentInstance()
const pinStore = usePinStore()
const { checkPinData, checkPinFailureData, forgotPinData, forgotPinFailureData, isLoadingSubmit } =
  storeToRefs(pinStore)

const { profileSuccessData } = storeToRefs(profileStore)
const props = defineProps({
  dialogVisible: {
    type: Boolean,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
})

const payload = ref({ pin: null })

const rules = ref({
  pin: [
    {
      required: true,
      message: 'This field is required.',
      trigger: 'blur',
    },
    {
      min: 4,
      max: 6,
      message: 'PIN must be between 4 and 6 digits',
      trigger: 'blur',
    },
  ],
})

const errors = ref({
  pin: {
    value: '',
    isShow: false,
  },
  global: {
    value: null,
  },
})

const showPIN = ref(false)
const isOpenEmailDialog = ref(false)

watch(checkPinData, ({ data: v }) => {
  if (process.client) {
    const initAccountValue = JSON.parse(localStorage.getItem('accounts'))
    const userIndex = initAccountValue.findIndex((user) => user.email === payload.value.email)
    const userID = userIndex >= 0 ? userIndex : $cookies.get('currentAccountID')
    if (!$cookies.get('login_pin_token') && $cookies.get('login_pin_token') !== v.login_pin_token) {
      const loginPinTokenExpires = new Date()
      loginPinTokenExpires.setDate(loginPinTokenExpires.getDate() + 30)
      $cookies.set('login_pin_token', v.login_pin_token, {
        expires: (Date.parse(loginPinTokenExpires) - new Date()) / 86400000,
      })
      initAccountValue[userID].login_pin_token = v.login_pin_token
      initAccountValue[userID].login_pin_token_expires = loginPinTokenExpires
    }
    instance.emit('loginToken', $cookies.get('login_pin_token'))
    $cookies.set('settings_pin_token', v.settings_pin_token, 0)
    initAccountValue[userID].settings_pin_token = v.settings_pin_token

    localStorage.setItem('accounts', JSON.stringify(initAccountValue))
  }

  instance.emit('close')
})

watch(checkPinFailureData, (v) => {
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

watch(profileSuccessData, (v) => {
  if (v && checkPinData.value) {
    instance.emit('close')
  }
})

watch(forgotPinFailureData, (v) => {
  for (const i in v) {
    if (typeof v[i] !== 'string') {
      for (const j in v[i]) {
        this.errors.global.value = v[i][j]
      }
    } else {
      this.errors.global.value = v[i]
    }
  }
})

watch(forgotPinData, (v) => {
  if (v) {
    isOpenEmailDialog.value = true
  }
})

onMounted(() => {
  if (profileSuccessData.value?.user.email) {
    payload.value.email = profileSuccessData.value?.user.email
  } else if (props.email) {
    payload.value.email = props.email
  }
  if (document.documentElement.clientWidth <= 425) {
    dialogWidth.value = '315px'
  }
  window.addEventListener('resize', (e) => {
    if (e.target.innerWidth <= 425) {
      dialogWidth.value = '315px'
    } else dialogWidth.value = '450px'
  })
})

const onSubmit = () => {
  instance.refs.pinForm.validate((valid) => {
    if (valid) {
      pinStore.checkPin(payload.value)
    } else if (payload.value.pin) {
      errors.value.global.value = 'PIN must be between 4 and 6 digits'
    } else {
      errors.value.global.value = 'This field is required'
    }
  })
}

const focusElement = (elem) => {
  if (process.client) {
    instance.refs[elem].focus()
  }
}

const onForgot = () => {
  pinStore.forgotPin()
}

const clearError = () => {
  errors.value.global.value = ''
}
const validateField = (fieldName) => {
  instance.refs.pinForm.validateField(fieldName, (isValid, catchedError) => {
    if (!isValid) {
      errors.value.global.value = catchedError[fieldName][0].message
    } else {
      errors.value.global.value = ''
    }
  })
}
</script>

<style scoped lang="scss"></style>
