<template>
  <div class="main">
    <div class="main__form">
      <div class="main__form--title">Forgot password</div>
      <div class="main__form--subtitle">
        Please fill the forms to get a reset password email.
      </div>
      <el-form
        ref="forgotForm"
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
            v-model="payload.email"
            class="main__form--box__input"
            placeholder="E-mail"
            @blur="validateField('email')"
          >
            <template #prefix>
              <img src="@/assets/images/icons/email-icon.svg" alt="user_icon" />
            </template>

            <template #suffix>
              <div
                v-if="payload.email"
                style="position: relative"
                @click="focusElement('email')"
              >
                <span for="email" class="placeholder"> Email</span>
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
            <div
              v-if="errors.email.isShow && isWeb()"
              class="el-form-item__error"
            >
              <span>{{ errors.email.value }}</span>
            </div>
            <div></div>
          </template>
        </el-form-item>
        <login-buttons
          login-title="Next"
          :login-loading="forgotLoading"
          :show-social="false"
        ></login-buttons>
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
definePageMeta({ layout: 'auth' })

const instance = getCurrentInstance()
const authStore = useAuthStore()
const { forgotSuccessData, forgotErrorData, forgotLoading } =
  storeToRefs(authStore)
const payload = ref({
  email: null,
})
const rules = {
  email: [
    { required: true, message: 'Email is required', trigger: 'blur' },
    {
      type: 'email',
      message: 'Please input correct email address',
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
  width: 100%;
  display: flex;
  position: relative;

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
      margin-bottom: 47px;
    }

    &--box {
      &__input {
        .el-input__inner {
          height: 48px;
          padding: 0 45px;
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
          cursor: pointer;
          &-inner {
            display: grid;
          }
        }
      }
    }
    .forgot-password {
      display: flex;
      justify-content: flex-end;
      .el-button {
        font-size: 12px;
        font-weight: 500;
        color: $ov-primary--light;
        &:hover {
          color: $ov-primary;
        }
      }
    }
  }
}

.placeholder {
  position: relative;
  top: 0;
  left: -750%;
  animation: showPlaceholder 0.3s;
  animation-fill-mode: forwards;
}

@keyframes showPlaceholder {
  to {
    top: -80%;
    left: -820%;
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
  font-weight: 400;
  top: 0;
  left: 105%;
  padding: 10px;
  color: #e60022;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: max-content;
  height: 45px;
  border-radius: 13px;
  background-color: white;
  box-shadow: 0px 3px 16px rgba(0, 0, 0, 0.2);
}
.el-form-item__error:after,
.el-form-item__error:before {
  position: absolute;
  content: '';
  width: 0;
  height: 0;
  top: 50%;
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
  top: 12px;
  right: 7px;
}

.el-input__suffix {
  display: flex !important;
}
.el-input__suffix-inner {
  display: flex !important;
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
</style>
