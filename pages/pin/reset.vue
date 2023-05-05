<template>
  <div class="main">
    <div class="main__form">
      <div class="main__form--title">Reset PIN</div>
      <div class="main__form--subtitle">
        Enter a new PIN below to change your PIN.
      </div>
      <el-form
        ref="resetForm"
        class="main__form--box"
        hide-required-asterisk
        :model="payload"
        :rules="rules"
        @submit.prevent="onSubmit"
      >
        <div v-if="errors.global.value" class="el-form-item__global-error">
          <img src="@/assets/images/icons/error.svg" alt="" />
          <span>{{ errors.global.value }}</span>
        </div>
        <el-form-item prop="pin" class="password-form-item">
          <el-input
            id="pin"
            ref="pin"
            v-model="payload.pin"
            :type="showPIN ? 'text' : 'password'"
            class="main__form--box__input"
            placeholder="Enter PIN"
            @change="validateField('pin')"
          >
            <template #suffix>
              <div
                v-if="payload.pin"
                style="position: relative"
                @click="focusElement('pin')"
              >
                <span for="pin" class="pin_placeholder"> PIN </span>
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
                @mouseover="showError('pin')"
                @mouseout="hideError('pin')"
                @click="showErrorClick('pin')"
              />
            </template>
          </el-input>

          <template #error>
            <div
              v-if="errors.pin.isShow && isWeb()"
              class="el-form-item__error"
            >
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
              <div
                v-if="payload.pin_confirmation"
                style="position: relative"
                @click="focusElement('pin_confirmation')"
              >
                <span for="password" class="repeat-placeholder">
                  PIN Confirmation
                </span>
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
                @mouseover="showError('pin_confirmation')"
                @mouseout="hideError('pin_confirmation')"
                @click="showErrorClick('pin_confirmation')"
              />
            </template>
          </el-input>

          <template #error>
            <div
              v-if="errors.pin_confirmation.isShow && isWeb()"
              class="el-form-item__error"
            >
              <span v-html="errors.pin_confirmation.value"></span>
            </div>
            <div></div>
          </template>
        </el-form-item>
        <el-button
          class="submit-button"
          native-type="submit"
          :loading="isLoadingSubmit"
        >
          <span class="submit-button__text">{{
            isLoadingSubmit ? '' : 'Save'
          }}</span>
        </el-button>

        <error-massage
          v-if="errors.pin.isShow && !isWeb()"
          :dialogVisible="errors.pin.isShow && !isWeb()"
          :error-text="errors.pin.value"
          @visible="errors.pin.isShow = false"
        ></error-massage>

        <error-massage
          v-if="errors.pin_confirmation.isShow && !isWeb()"
          :dialogVisible="errors.pin_confirmation.isShow && !isWeb()"
          :error-text="errors.pin_confirmation.value"
          @visible="errors.pin_confirmation.isShow = false"
        ></error-massage>
      </el-form>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'default' })
import ErrorMassage from '~/components/auth/ErrorMassageModal.vue'
import { getCurrentInstance, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import usePINStore from '~/stores/pin'
import { storeToRefs } from 'pinia'
import showEyeIcon from '@/assets/images/icons/eye-open-icon.svg'
import hideEyeIcon from '@/assets/images/icons/eye-close-icon.svg'
import auth from '~/middleware/auth'

const pinStore = usePINStore()
const { changePinData, changePinFailureData, isLoadingSubmit } =
  storeToRefs(pinStore)

const instance = getCurrentInstance()
const $route = useRoute()
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

const hideError = (fieldName) => {
  if (isWeb()) {
    errors.value[fieldName].isShow = false
  }
}

const showErrorClick = (fieldName) => {
  errors.value[fieldName].isShow = true
}

const showError = (fieldName) => {
  if (isWeb()) {
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
  height: 100%;
  padding: 100px 0 150px 170px;
  width: 100%;

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

    &--box {
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
          cursor: pointer;
          &-inner {
            display: grid;
          }
        }
      }
    }
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

.repeat-placeholder {
  position: relative;
  top: 0;
  font-size: 12px;
  font-weight: 400;
  color: #717a7f;
  animation: showRepeatPlaceholder 0.3s;
  animation-fill-mode: forwards;
}

@media (min-width: 375px) {
  @keyframes showPINPlaceholder {
    to {
      top: -34px;
      left: -330px;
    }
  }

  @keyframes showRepeatPlaceholder {
    to {
      top: -34px;
      left: -249px;
    }
  }

  .pin_placeholder {
    left: -310px;
  }

  .repeat-placeholder {
    left: -220px;
  }
}

@media (max-width: 407px) {
  @keyframes showPINPlaceholder {
    to {
      top: -34px;
      left: -241px;
    }
  }

  @keyframes showRepeatPlaceholder {
    to {
      top: -34px;
      left: -157px;
    }
  }

  .pin_placeholder {
    left: -210px;
  }

  .repeat-placeholder {
    left: -130px;
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
  line-height: 20px;
  font-weight: 400;
  top: 0;
  left: 105%;
  padding: 14px;
  color: #e60022;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 212px;
  height: max-content;
  min-height: 48px;
  border-radius: 13px;
  background-color: white;
  box-shadow: 0px 3px 16px rgba(0, 0, 0, 0.2);
}
.error_info {
  color: #717a7f;
  font-style: italic;
  font-weight: 400;
}

.error_info > li {
  margin-left: 15px;
}

.error_info > li::marker {
  font-size: 0.5em;
}
.el-form-item__error:after,
.el-form-item__error:before {
  position: absolute;
  content: '';
  width: 0;
  height: 0;
  top: 25px;
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

.eye_icon {
  position: relative;
  right: 32px;
}

.weak {
  color: #e60022;
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
.el-form-item__global-error {
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
  justify-content: flex-start;
  padding: 7px 12px;
  align-items: center;
  color: #e60022;
  gap: 16px;
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
  margin-top: 270px;
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

@media (max-width: 990px) {
  .main {
    margin: 100px auto 150px;
    padding: 0;
    justify-content: center;
  }
}

@media (max-width: 450px) {
  .main {
    margin: 100px auto 150px;
    padding: 0;
    justify-content: center;
  }
  .main__form {
    &--box {
      text-align: center;
    }
  }
}

@media (max-width: 407px) {
  .main {
    margin: 100px auto 150px;
    padding: 0;
    width: 300px;
    justify-content: center;
  }
  .main__form {
    &--box {
      text-align: center;
    }
  }
}
</style>
