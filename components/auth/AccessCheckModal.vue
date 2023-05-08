<template>
  <el-dialog
    v-model="props.dialogVisible"
    :width="dialogWidth"
    :height="dialogHeight"
    :close-on-click-modal="false"
    text-align="center"
    :show-close="false"
    top="230px"
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
    <span class="title__text">
      Please enter your PIN in order to access account management section.
    </span>
    <el-form
      ref="pinForm"
      class="main__form--box"
      hide-required-asterisk
      :show-message="false"
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
      <el-form-item prop="pin" class="password-form-item">
        <el-input
          id="pin"
          ref="pin"
          v-model="payload.pin"
          :type="showPIN ? 'text' : 'password'"
          class="main__form--box__input"
          placeholder="Enter PIN"
          @blur="validateField('pin')"
        >
          <template #suffix>
            <div
              v-if="payload.pin"
              style="position: relative"
              @click="focusElement('pin')"
            >
              <span for="pin" class="pin_placeholder"> Enter PIN </span>
            </div>
            <img
              :src="showPIN ? hideEyeIcon : showEyeIcon"
              alt="eye_icon"
              @click="showPIN = !showPIN"
            />
          </template>
        </el-input>
      </el-form-item>
      <div class="forgot-password">
        <el-button style="font-size: 14px; font-weight: 400" @click="onForgot"
          >Forgot PIN?</el-button
        >
      </div>
      <el-button
        class="submit-button"
        native-type="submit"
        :loading="isLoadingSubmit"
      >
        <span class="submit-button__text">{{
          isLoadingSubmit ? '' : 'NEXT'
        }}</span>
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
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import $cookies from 'js-cookie'
import ConfirmModal from '@/components/shared/OvConfirmPINChangeModal.vue'
import showEyeIcon from '@/assets/images/icons/eye-open-icon.svg'
import hideEyeIcon from '@/assets/images/icons/eye-close-icon.svg'
import usePinStore from '~/stores/pin'

const dialogWidth = ref('450px')
const dialogHeight = ref('400px')
const instance = getCurrentInstance()
const $route = useRoute()
const $router = useRouter()
const pinStore = usePinStore()
const {
  checkPinData,
  checkPinFailureData,
  forgotPinData,
  forgotPinFailureData,
  isLoadingSubmit,
} = storeToRefs(pinStore)
const props = defineProps({
  dialogVisible: {
    type: Boolean,
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

watch(checkPinData, (v) => {
  if (!$cookies.get('login_pin_token'))
    $cookies.set('login_pin_token', v.login_pin_token, { expires: 30 })
  instance.emit('loginToken', $cookies.get('login_pin_token'))
  $cookies.set('settings_pin_token', v.settings_pin_token, 0)
  instance.emit('close')
})

watch(checkPinFailureData, (v) => {
  for (const i in v) {
    if (typeof v[i] !== 'string') {
      for (const j in v[i]) {
        errors.value.global.value = v[i][j]
      }
    } else {
      errors.value.global.value = v
    }
  }
  if ($route.path !== '/')
    setTimeout(() => {
      $router.go(-1)
    }, 1000)
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
      pinStore.checkPin(payload._value)
    } else if (payload._value.pin) {
      errors.value.global.value = 'PIN must be between 4 and 6 digits'
    } else {
      errors.value.global.value = 'This field is required'
    }
  })
}

const focusElement = (elem) => {
  instance.refs[elem].focus()
}

const onForgot = () => {
  isOpenEmailDialog.value = true
  pinStore.forgotPin()
}

const clearError = () => {
  errors.value.global.value = ''
}
const validateField = (fieldName) => {
  instance.refs.pinForm.validateField(fieldName, (isValid, catchedError) => {
    if (!isValid) {
      errors.value[fieldName].value = catchedError[fieldName][0].message
    } else {
      errors.value[fieldName].value = ''
    }
  })
}
</script>

<style scoped lang="scss">
.main {
  width: 100%;
  display: flex;
  position: relative;
  height: 100%;
  padding: 100px 0 150px 18%;

  &__form {
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
      width: 320px;
      &__input {
        .el-input__inner {
          height: 48px;
          padding: 0 15px;
          border-radius: 6px;
          border-color: $ov-border--light;

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
        }

        .el-input__prefix {
          padding-left: 8px;
        }

        .el-input__suffix {
          padding-right: 8px;
          display: flex !important;
          cursor: pointer;
        }

        .el-input__suffix-inner {
          display: flex !important;
        }
      }
    }
  }
}
.forgot-password {
  text-align: left;
  color: #6979f8;
  text-decoration: underline;
  .el-button {
    font-size: 12px;
    font-weight: 500;

    &:hover {
      color: $ov-primary;
    }

    .el-button--text {
      padding: 0;
      margin-bottom: 40px;
    }
  }
}
.forgot-password {
  font-size: 14px;
}
.el-form-item {
  margin-bottom: 15px;
}
.el-dialog {
  border-radius: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  .el-dialog__close {
    color: black !important;
  }
  .el-dialog__footer {
    display: flex;
    justify-content: center;
  }
  .el-dialog__body {
    padding: 15px 35px 30px 35px;
    color: $ov-text--title;
    word-break: normal;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .el-dialog__header {
    display: grid;
    justify-content: center;

    width: 100%;
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;

    color: #0d1c2e;
  }
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
.dialog-footer {
  &__action {
    color: $ov-text--title;
    font-size: 14px;
    font-weight: 500;
  }
}
.title {
  text-align: center;
  display: flex;
  word-break: break-word;

  &__image {
    display: flex;
    justify-content: center;
    margin-top: 33px;
    margin-bottom: 42px;
  }
  &__text {
    display: block;
    padding: 0 60px;
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    margin-bottom: 16px;
    text-align: center;

    color: #0d1c2e;
  }
}

.submit-button {
  background: $ov-primary;
  color: white;
  text-transform: uppercase;
  width: 220px;
  height: 48px;
  padding: 0;
  border-radius: 6px;
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

.pin_placeholder {
  position: relative;
  top: 0;
  width: 50px;
  font-size: 12px;
  font-weight: 400;
  color: #717a7f;
  animation: showPINPlaceholder 0.3s;
  animation-fill-mode: forwards;
}
@media (min-width: 375px) {
  @keyframes showPINPlaceholder {
    to {
      top: -34px;
      left: -224px;
    }
  }

  .pin_placeholder {
    left: -210px;
  }
}

@media (max-width: 407px) {
  @keyframes showPINPlaceholder {
    to {
      top: -34px;
      left: -241px;
    }
  }

  .pin_placeholder {
    left: -210px;
  }
}
.access-header {
  width: 450px;
  padding-bottom: 15px;
  border-bottom: 1px solid #bbbcbd;
}
</style>
