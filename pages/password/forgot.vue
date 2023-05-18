<template>
  <div class="main">
    <div class="main__form">
      <div class="main__form--title">Forgot password</div>
      <div class="main__form--subtitle">Please fill the forms to get a reset password email.</div>
      <el-form
        ref="forgotForm"
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
        <el-form-item prop="email">
          <el-input
            v-model="payload.email"
            class="main__form--box__input"
            placeholder="E-mail"
            @blur="validateField('email')"
          >
            <template #prefix>
              <img src="@/assets/images/icons/email-icon.svg" alt="user_icon" />
            </template>

            <template #suffix>
              <div v-if="payload.email" style="position: relative" @click="focusElement('email')">
                <span for="email" class="custom_placeholder"> Email</span>
              </div>
              <img
                v-if="errors.email.value"
                class="error_icon"
                src="@/assets/images/icons/error.svg"
                alt=""
                @click="showErrorClick('email')"
                @mouseover="showError('email')"
                @mouseout="hideError('email')"
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
        <login-buttons login-title="Next" :login-loading="forgotLoading" :show-social="false"></login-buttons>
      </el-form>
    </div>

    <error-massage
      v-if="errors.email.isShow && !isWeb()"
      :dialog-visible="errors.email.isShow && !isWeb()"
      :error-text="errors.email.value"
      @visible="errors.email.isShow = false"
    ></error-massage>
    <ConfirmModal
      v-if="isOpenEmailDialog"
      :email="payload.email"
      :dialog-visible="isOpenEmailDialog"
      @close="isOpenEmailDialog = false"
    ></ConfirmModal>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { onMounted, watch } from 'vue'
import LoginButtons from '@/components/auth/LoginButtons.vue'
import ConfirmModal from '@/components/shared/OvConfirmPasswordChangeModal.vue'
import ErrorMassage from '~/components/auth/ErrorMassageModal.vue'
import useAuthStore from '@/stores/auth'
import useProfileStore from '@/stores/profile'
definePageMeta({ layout: 'auth' })

const instance = getCurrentInstance()
const authStore = useAuthStore()
const profileStore = useProfileStore()
const { forgotSuccessData, forgotErrorData, forgotLoading } = storeToRefs(authStore)
const { profileSuccessData } = storeToRefs(profileStore)
const payload = ref({
  email: null,
})
const rules = {
  email: [
    { required: true, message: 'Email is required', trigger: 'blur' },
    {
      type: 'email',
      message: 'Email is not valid',
      trigger: 'blur',
    },
  ],
}
const errors = ref({
  email: {
    value: '',
    isShow: false,
  },
  global: {
    value: '',
  },
})

const isOpenEmailDialog = ref(false)

const onSubmit = () => {
  instance.refs.forgotForm.validate((valid) => {
    if (valid) {
      authStore.forgotPassword(payload.value)
    } else {
      return false
    }
  })
}

const validateField = (fieldName) => {
  instance.refs.forgotForm.validateField(fieldName, (isValid, catchedError) => {
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
watch(forgotSuccessData, (v) => {
  isOpenEmailDialog.value = true
})

watch(forgotErrorData, (v) => {
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
  window.addEventListener('resize', handleResize)
})
</script>
<style scoped lang="scss">
.main {
  .forgot-password {
    display: flex;
    justify-content: flex-end;
    color: #6979f8;
    .el-button {
      font-size: 12px;
      font-weight: 500;
      color: $ov-primary--light;
      border: none;
      background-color: inherit;
      text-align: left;
      padding: 0;
      &:hover {
        color: $ov-primary;
        border: none;
        background-color: inherit;
      }
    }
  }
}

.submit-buttons-container {
  margin-top: 40px;
}

.el-input__suffix {
  display: flex !important;
}
.el-input__suffix-inner {
  display: flex !important;
}
</style>
